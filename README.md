
# 🎉 CLT Events - Local Events Finder (Charlotte Edition)

A modern, professional web application for discovering events in Charlotte, NC. Built with React, Vite, and Tailwind CSS.

Originally started as a collaborative team project by Per Scholas Charlotte students, now enhanced with professional features and multiple event sources.

## 🌟 Features

### 🎯 Multi-Source Event Discovery
- **Ticketmaster Integration**: Professional concerts, sports, and major events
- **Eventbrite Integration**: Community events, workshops, and local gatherings
- **Local Charlotte Events**: Curated local events and community activities

### 🎨 Professional Design
- **Modern UI/UX**: Clean, responsive design with gradient backgrounds and smooth animations
- **Event Icons**: Category-specific icons for easy event identification
- **Event Images**: High-quality event images with fallback placeholders
- **Source Badges**: Clear indication of event sources
- **Professional Typography**: Optimized for readability and visual hierarchy

### 🔍 Advanced Search & Filtering
- **Debounced Search**: Real-time search with 500ms debounce for optimal performance
- **Category Filters**: Music, Sports, Arts, Comedy, Family, Food, Technology, Community
- **Date Range Filters**: Today, Tomorrow, This Week, Weekend, Next Week, This Month
- **Price Range Filters**: Free, Under $25, $25-$50, $50-$100, $100+
- **Source Filters**: Filter by Ticketmaster, Eventbrite, or Local events
- **Free Events Toggle**: Quick filter for free events only

### 📊 Smart Sorting
- **Date Sorting**: Earliest/Latest first
- **Alphabetical Sorting**: A-Z or Z-A
- **Price Sorting**: Low to High or High to Low
- **Relevance Sorting**: Most relevant results first

### 📱 Performance & UX
- **Pagination**: 12 events per page with smooth navigation
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Loading States**: Professional loading animations
- **Error Handling**: Graceful error messages and fallbacks
- **Event Statistics**: Real-time stats showing event sources and counts

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodeCLT-Crew/Local-Events-Finder-CLT-Edition-.git
   cd Local-Events-Finder-CLT-Edition-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit .env and add your API keys
   # VITE_TICKETMASTER_API_KEY=your_ticketmaster_key
   # VITE_EVENTBRITE_API_KEY=your_eventbrite_token
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.0
- **Styling**: Tailwind CSS 4.1.12
- **Routing**: React Router DOM 7.6.2
- **HTTP Client**: Axios 1.11.0
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript support

## 🧑‍💻 Contributors & Roles

| Name | GitHub | Role |
|------|--------|------|
| Meron Teweldebrhan | [@MeronTeweldebrhan](https://github.com/MeronTeweldebrhan) | Team Lead + Backend/API Integration |
| Person 2 | [@jcwynde](https://github.com/jcwynde) | Event List + UI Components |
| Person 3 | [@username](https://github.com/username) | Search & Filters |
| Person 4 | [@username](https://github.com/username) | Responsive Styling & UX |
| Person 5 | [@username](https://github.com/username) | Save Feature + Testing |

> Want to join? Fork, clone, and open a PR! 🎯

## 📁 Project Structure

```
src/
├── Components/           # Reusable UI components
├── api/                 # API integration modules
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── utils/               # Utility functions
├── App.jsx              # Main application component
├── index.css            # Global styles and custom CSS
└── main.jsx             # Application entry point
```

## 🎪 Event Categories

- 🎵 **Music & Concerts**: Live music, concerts, festivals
- 🏆 **Sports**: Professional and amateur sports events
- 🎭 **Arts & Theater**: Theater, dance, opera, cultural events
- 😂 **Comedy**: Stand-up comedy, comedy shows
- 👨‍👩‍👧‍👦 **Family & Kids**: Family-friendly events and activities
- 🍕 **Food & Drink**: Food festivals, tastings, culinary events
- 💻 **Technology**: Tech meetups, conferences, workshops
- 🤝 **Community**: Local community events and gatherings

## 🔧 Configuration

### API Keys Setup

1. **Copy the environment template**
   ```bash
   cp .env.example .env
   ```

2. **Get your API keys:**
   - **Ticketmaster API**: Visit [Ticketmaster Developer Portal](https://developer.ticketmaster.com/)
   - **Eventbrite API**: Visit [Eventbrite API Keys](https://www.eventbrite.com/platform/api-keys/)

3. **Add your keys to `.env`:**
   ```env
   VITE_TICKETMASTER_API_KEY=your_ticketmaster_api_key_here
   VITE_EVENTBRITE_API_KEY=your_eventbrite_api_token_here
   ```

4. **Restart the development server** after adding environment variables

### Important Notes:
- The `.env` file is automatically ignored by Git for security
- Never commit API keys to version control
- **Real API Integration**: The app now fetches actual events from Eventbrite and Ticketmaster APIs
- If API keys are missing or invalid, the app will show error messages in the console
- Check the browser console (F12) for API status and debugging information

## 🚧 Recent Improvements

✅ **Completed Enhancements:**
- Multi-source event integration (Ticketmaster, Eventbrite, Local)
- Professional UI/UX with modern design
- Advanced filtering and sorting capabilities
- Debounced search for better performance
- Pagination for large result sets
- Event icons and visual enhancements
- Responsive design improvements
- Loading states and error handling

## 🔮 Future Improvements

- Google Maps integration for event locations
- User authentication and saved favorites
- User-submitted events
- Calendar integration
- Social sharing features
- Push notifications for saved events
- Advanced analytics and recommendations

## 📄 License

MIT License © 2025 CodeCLT-Crew

Built with ❤️ by Per Scholas Charlotte Students and enhanced for the Charlotte community!
