// src/api/ticketmaster.js

// const API_KEY = import.meta.env.VITE_IP_TRACKER_API;
       const API_KEY ="dlEIz6xRP4L1kmlspTa3PoluOFSQYrnl"
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

export async function fetchCharlotteEvents({
  keyword = "",
  page = 0,
  size = 20,
  classificationName = "",
} = {}) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    city: "Charlotte",
    countryCode: "US",
    page,
    size,
  });
  if (keyword) params.append("keyword", keyword);
  if (classificationName)
    params.append("classificationName", classificationName);

  const url = `${BASE_URL}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();
  console.log(data);
  return data._embedded?.events || [];
}
