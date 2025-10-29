# GoFast Coach Demo Dashboard

A self-contained demo dashboard for GoFast Coach that visually simulates the platform experience. This is a React-only application with no authentication or backend - perfect for presentations and demos.

## Features

- **Dashboard**: High-level metrics summary with recent athletes and upcoming events
- **Athletes**: Grid view of runners with stats, badges, and mileage
- **Events**: Manage races, training camps, and group runs
- **Sponsors**: Display sponsor partnerships with tier badges (Gold/Silver/Bronze)
- **Analytics**: Interactive charts showing weekly mileage, heart rate, and run data
- **Invite Runner**: Modal form to add new runners (local state only)

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router
- Chart.js / react-chartjs-2
- Lucide React (icons)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5175`

## Project Structure

```
src/
 ├── components/
 │    ├── Sidebar.jsx              # Navigation sidebar
 │    ├── Topbar.jsx               # Header with coach avatar
 │    ├── AthleteCard.jsx          # Athlete display card
 │    ├── EventCard.jsx            # Event display card
 │    ├── SponsorCard.jsx          # Sponsor display card
 │    └── StatCard.jsx              # Stat display card
 ├── pages/
 │    ├── Dashboard.jsx            # Main dashboard
 │    ├── Athletes.jsx             # Athletes page
 │    ├── Events.jsx               # Events page
 │    ├── Sponsors.jsx             # Sponsors page
 │    └── Analytics.jsx            # Analytics page
 ├── data/
 │    ├── athletes.json            # Mock athlete data
 │    ├── events.json              # Mock event data
 │    ├── sponsors.json            # Mock sponsor data
 │    └── analytics.json           # Mock analytics data
 ├── App.jsx                       # Main router + layout
 └── main.jsx                      # React entrypoint
```

## Design

- **Colors**: GoFast purple (`#2e004f`) + bright orange (`#ff6600`)
- **Layout**: Sidebar navigation on left, main content scrollable
- **Responsive**: Mobile-friendly with stacked cards on small screens
- **Icons**: Lucide React icons throughout

## Mock Data

All data is loaded from JSON files in `/src/data/`. You can edit these files to customize the demo content:

- `athletes.json`: Runner profiles with mileage, pace, badges
- `events.json`: Event information with dates and locations
- `sponsors.json`: Sponsor details with tier levels
- `analytics.json`: Summary stats and weekly chart data

## Features in Action

- **Invite Runner**: Click "Invite Runner" on the Athletes page to add a new athlete (local state only)
- **Add Event**: Click "Add Event" on the Events page to create a new event
- **Add Sponsor**: Click "Add Sponsor" on the Sponsors page to add a partnership

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Notes

- No authentication required - all demo functionality works immediately
- No backend/API calls - all data is local JSON files
- Changes to athletes/events/sponsors are stored in component state (lost on refresh)
- Perfect for presentations, demos, and showcasing the GoFast Coach platform

---

**Powered by GoFast**

