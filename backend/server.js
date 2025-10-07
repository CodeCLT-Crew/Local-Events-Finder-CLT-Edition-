const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow requests from your frontend
app.use(express.json());

const CHARLOTTE_SEARCH_URL = 'https://www.eventbrite.com/d/nc--charlotte/events/';

app.get('/api/eventbrite/events', async (req, res) => {
  const { keyword = '', size = 20 } = req.query;
  try {
    const response = await axios.get(CHARLOTTE_SEARCH_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const events = [];
    const eventElements = $('[data-testid="event-card"], .eds-event-card-content__content');

    eventElements.each((index, el) => {
      if (index >= size) return;
      try {
        const name = $(el).find('[data-testid="event-card-title"], h3 a').text().trim() || `Untitled Event ${index}`;
        const dateTime = $(el).find('[data-testid="event-card-date"], .eds-text-color--ui-600').text().trim() || '';
        const venue = $(el).find('[data-testid="event-card-venue"], .eds-text-color--ui-500').text().trim() || 'Venue TBA';
        const price = $(el).find('[data-testid="event-card-price"], .eds-text-color--ui-800').text().trim() || 'Check ticket price on event';
        const url = $(el).find('a').attr('href') || '#';
        const category = $(el).find('[data-testid="event-card-category"], .eds-l-pad-right-4').text().trim() || 'Community';

        // Parse date
        let startDate = null;
        let startTime = null;
        if (dateTime) {
          const dateMatch = dateTime.match(/([A-Za-z]{3},?\s)?(\w{3})\s(\d{1,2}),?\s(\d{4})?\s?([\d:]{2,5}\s?(AM|PM))?/) || [];
          const month = dateMatch[2];
          const day = dateMatch[3];
          const year = dateMatch[4] || new Date().getFullYear().toString();
          const time = dateMatch[5];
          const ampm = dateMatch[6];
          const monthMap = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
                             Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
          const monthNum = monthMap[month] || '10';
          startDate = `${year}-${monthNum}-${day.padStart(2, '0')}`;
          startTime = time ? `${time} ${ampm || ''}`.trim() : null;
        }

        // Filter keyword and upcoming events
        if (keyword && !name.toLowerCase().includes(keyword.toLowerCase())) return;
        const today = new Date().toISOString().split('T')[0];
        if (startDate && startDate < today) return;

        events.push({
          id: `eb_scrape_${Date.now()}_${index}`,
          name: { text: name },
          start: { local: startDate && startTime ? `${startDate}T${startTime}:00` : startDate ? `${startDate}T00:00:00` : null },
          url,
          logo: { url: `https://via.placeholder.com/400x200?text=${encodeURIComponent(name.substring(0, 10))}` },
          venue: { name, address: { city: 'Charlotte', region: 'NC', address_1: '' } },
          category: { name: category },
          ticket_availability: { minimum_ticket_price: { major_value: price.includes('Free') ? '0' : '10', currency: 'USD' } },
          description: { text: `Upcoming event in Charlotte: ${name}. Check details on Eventbrite.` }
        });
      } catch (err) {
        console.warn('Failed to parse event:', err);
      }
    });

    res.json(events);
  } catch (error) {
    console.error('Server error fetching Eventbrite:', error);
    res.json([]);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));