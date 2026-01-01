# Happy New Year 2026 🎉

A festive New Year countdown application built with React, TypeScript, and Vite. Features an animated countdown timer, interactive gift box, and beautiful winter scene with fireworks.

## ✨ Features

- **Countdown Timer**: Real-time countdown to New Year with animated numbers displaying days, hours, minutes, and seconds
- **Fireworks Display**: Background video with fireworks and festive audio
- **Interactive Gift Box**: Click-to-open animated gift box that reveals a winter scene
- **Winter Scene**: Interactive SVG scene with clickable areas that zoom into different sections
- **Smooth Animations**: Powered by Framer Motion for fluid transitions and animations
- **Responsive Design**: Works across different screen sizes

## 🛠️ Tech Stack

- **React 19.2.0** - UI library
- **TypeScript** - Type safety
- **Vite 7.2.4** - Build tool and dev server
- **React Router DOM 7.11.0** - Client-side routing
- **Framer Motion 12.23.26** - Animation library
- **ESLint** - Code linting

## 📁 Project Structure

```
new-year/
├── public/
│   ├── happy-new-year.png    # New Year image
│   ├── winter-scene.svg      # Interactive winter scene SVG
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── audio/            # Fireworks audio
│   │   ├── images/           # Fireworks image
│   │   └── video/            # Fireworks video
│   ├── components/
│   │   ├── CountdownTimer/   # Countdown timer component
│   │   ├── GiftBox/          # Animated gift box
│   │   ├── Navigation/       # Navigation bar
│   │   └── WinterScene/      # Interactive winter scene
│   ├── pages/
│   │   ├── CountdownPage.tsx # Main countdown page
│   │   └── GiftScenePage.tsx # Gift opening page
│   ├── App.tsx               # Main app component with routing
│   ├── main.tsx              # App entry point
│   └── index.css             # Global styles
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd new-year
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is busy).

### Build

Create a production build:
```bash
npm run build
```

The optimized files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check for code issues:
```bash
npm run lint
```

## 🎮 Usage

### Countdown Page (`/`)

- Displays a real-time countdown to New Year 2026
- Shows animated days, hours, minutes, and seconds
- Features a background fireworks video with festive audio
- Numbers animate smoothly as they update every second

### Gift Scene Page (`/gift`)

- Click the animated gift box to open it
- The gift box lid flies away and the box moves down
- After the animation, the interactive winter scene appears
- Click on different areas of the winter scene to zoom in
- Click again to zoom back out to the full view

### Navigation

- Use the navigation bar at the top to switch between pages
- The active page is highlighted in the navigation

## 🎨 Components

### CountdownTimer
- Real-time countdown calculation
- Animated number transitions using Framer Motion
- Automatically calculates time until next New Year

### GiftBox
- Animated gift box with hat/lid
- Click interaction to trigger opening animation
- Smooth transitions with spring physics

### WinterScene
- Loads and renders interactive SVG scene
- Clickable overlay areas for zoom functionality
- CSS animations for snow, letters, and penguins
- ViewBox manipulation for smooth zooming

## 📝 Notes

- Audio autoplay may be blocked by browsers - users may need to interact with the page first
- The winter scene SVG is loaded dynamically from the public folder
- All animations use Framer Motion for smooth performance

## 🤝 Contributing

Feel free to submit issues or pull requests if you'd like to contribute to this project.

## 📄 License

This project is open source and available for personal use.

---

**Happy New Year 2026! 🎊**