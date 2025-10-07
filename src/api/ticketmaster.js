// src/api/ticketmaster.js


const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

export async function fetchCharlotteEvents({
  keyword = "",
  page = 0,
  size = 20,
  classificationName = "",
} = {}) {
  try {
    // Check if API key is available
    if (!API_KEY) {
      throw new Error("Ticketmaster API key not found. Please check your environment variables.");
    }

    const params = new URLSearchParams({
      apikey: API_KEY,
      city: "Charlotte",
      countryCode: "US",
      page,
      size,
    });

    if (keyword) params.append("keyword", keyword);
    if (classificationName) params.append("classificationName", classificationName);

    const url = `${BASE_URL}?${params.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Ticketmaster API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    // console.log('Ticketmaster API response:', data);
    return data._embedded?.events || [];

  } catch (error) {
    console.error("Error fetching Ticketmaster events:", error);
    throw error;
  }
}
