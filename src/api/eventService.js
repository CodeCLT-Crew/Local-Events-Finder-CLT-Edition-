import { fetchCharlotteEvents } from './ticketmaster';
// import { fetchEventbriteEvents, normalizeEventbriteEvent } from './eventbrite';
// import { fetchLocalEvents, normalizeLocalEvent } from './localEvents';

// Unified event service that combines multiple APIs
export class EventService {
  constructor() {
    this.sources = {
      ticketmaster: true,
      eventbrite: false, // Temporarily disabled - Coming Soon
      local: false       // Temporarily disabled - Coming Soon
    };
  }

  // Enable/disable specific event sources
  configureSources(sources) {
    this.sources = { ...this.sources, ...sources };
  }

  // Fetch events from all enabled sources
  async fetchAllEvents({ keyword = '', classificationName = '', location = 'Charlotte, NC' } = {}) {
    const promises = [];
    const results = {
      ticketmaster: [],
      eventbrite: [],
      local: [],
      errors: []
    };

    // Fetch from Ticketmaster
    if (this.sources.ticketmaster) {
      promises.push(
        fetchCharlotteEvents({ keyword, classificationName })
          .then(events => {
            results.ticketmaster = events.map(event => ({
              ...event,
              source: 'Ticketmaster'
            }));
          })
          .catch(error => {
            console.error('Ticketmaster API error:', error);
            results.errors.push({ source: 'Ticketmaster', error: error.message });
          })
      );
    }

    // Fetch from Eventbrite
    if (this.sources.eventbrite) {
      promises.push(
        fetchEventbriteEvents({ keyword, location })
          .then(events => {
            console.log('Raw Eventbrite events:', events);
            results.eventbrite = events.map(event => normalizeEventbriteEvent(event));
            console.log('Normalized Eventbrite events:', results.eventbrite);
          })
          .catch(error => {
            console.error('Eventbrite API error:', error);
            results.eventbrite = [];
            results.errors.push({ source: 'Eventbrite', error: error.message });
          })
      );
    }

    // Fetch from Local Events
    if (this.sources.local) {
      promises.push(
        fetchLocalEvents({ keyword })
          .then(events => {
            results.local = events.map(event => normalizeLocalEvent(event));
          })
          .catch(error => {
            console.error('Local Events API error:', error);
            results.errors.push({ source: 'Local Events', error: error.message });
          })
      );
    }

    // Wait for all API calls to complete
    await Promise.allSettled(promises);

    // Combine all events
    const allEvents = [
      ...results.ticketmaster,
      ...results.eventbrite,
      ...results.local
    ];

    // Remove duplicates based on name and date
    const uniqueEvents = this.removeDuplicates(allEvents);

    return {
      events: uniqueEvents,
      sources: results,
      totalCount: uniqueEvents.length,
      sourceBreakdown: {
        ticketmaster: results.ticketmaster.length,
        eventbrite: results.eventbrite.length,
        local: results.local.length
      }
    };
  }

  // Remove duplicate events
  removeDuplicates(events) {
    const seen = new Set();
    return events.filter(event => {
      const key = `${event.name.toLowerCase()}_${event.dates?.start?.localDate}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // Get events by category
  async fetchEventsByCategory(category) {
    const classificationMap = {
      'music': 'music',
      'sports': 'sports',
      'arts': 'arts,theatre',
      'comedy': 'comedy',
      'family': 'family',
      'food': 'miscellaneous',
      'technology': 'miscellaneous'
    };

    const classification = classificationMap[category.toLowerCase()] || '';
    return await this.fetchAllEvents({ classificationName: classification });
  }

  // Get free events
  async fetchFreeEvents() {
    const result = await this.fetchAllEvents();
    const freeEvents = result.events.filter(event => {
      const price = event.priceRanges?.[0];
      return !price || (price.min === 0 && price.max === 0);
    });

    return {
      ...result,
      events: freeEvents,
      totalCount: freeEvents.length
    };
  }

  // Get events happening today
  async fetchTodaysEvents() {
    const result = await this.fetchAllEvents();
    const today = new Date().toISOString().split('T')[0];
    
    const todaysEvents = result.events.filter(event => 
      event.dates?.start?.localDate === today
    );

    return {
      ...result,
      events: todaysEvents,
      totalCount: todaysEvents.length
    };
  }

  // Get events happening this weekend
  async fetchWeekendEvents() {
    const result = await this.fetchAllEvents();
    const now = new Date();
    const friday = new Date(now);
    const sunday = new Date(now);
    
    // Get next Friday
    friday.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
    // Get next Sunday
    sunday.setDate(friday.getDate() + 2);
    
    const fridayStr = friday.toISOString().split('T')[0];
    const sundayStr = sunday.toISOString().split('T')[0];
    
    const weekendEvents = result.events.filter(event => {
      const eventDate = event.dates?.start?.localDate;
      return eventDate >= fridayStr && eventDate <= sundayStr;
    });

    return {
      ...result,
      events: weekendEvents,
      totalCount: weekendEvents.length
    };
  }

  // Sort events by various criteria
  sortEvents(events, sortBy) {
    const sorted = [...events];
    
    switch (sortBy) {
      case 'date-asc':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.dates?.start?.localDate || '9999-12-31');
          const dateB = new Date(b.dates?.start?.localDate || '9999-12-31');
          return dateA - dateB;
        });
      case 'date-desc':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.dates?.start?.localDate || '1900-01-01');
          const dateB = new Date(b.dates?.start?.localDate || '1900-01-01');
          return dateB - dateA;
        });
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return sorted.sort((a, b) => {
          const priceA = a.priceRanges?.[0]?.min || 0;
          const priceB = b.priceRanges?.[0]?.min || 0;
          return priceA - priceB;
        });
      case 'price-desc':
        return sorted.sort((a, b) => {
          const priceA = a.priceRanges?.[0]?.max || 0;
          const priceB = b.priceRanges?.[0]?.max || 0;
          return priceB - priceA;
        });
      case 'source':
        return sorted.sort((a, b) => (a.source || '').localeCompare(b.source || ''));
      default:
        return sorted;
    }
  }
}

// Create a singleton instance
export const eventService = new EventService();

// Export convenience functions
export const fetchAllEvents = (params) => eventService.fetchAllEvents(params);
export const fetchEventsByCategory = (category) => eventService.fetchEventsByCategory(category);
export const fetchFreeEvents = () => eventService.fetchFreeEvents();
export const fetchTodaysEvents = () => eventService.fetchTodaysEvents();
export const fetchWeekendEvents = () => eventService.fetchWeekendEvents();
