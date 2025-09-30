# QR Master - Generator & Scanner

A beautiful, modern Progressive Web App (PWA) for generating and scanning QR codes built with React, TypeScript, and Vite. Features offline support, responsive design, and a clean user interface.

![QR Master](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.4.2-purple) ![PWA](https://img.shields.io/badge/PWA-Ready-green)

## ✨ Features

- **QR Code Generation**: Create QR codes from text, URLs, or contact information (vCard format)
- **QR Code Scanning**: Real-time camera-based QR code scanning with automatic detection
- **History Management**: Track all generated and scanned QR codes with timestamps
- **Progressive Web App**: Installable on mobile and desktop devices
- **Offline Support**: Works without internet connection using service workers
- **Responsive Design**: Beautiful UI that works on all screen sizes
- **Modern UI**: Clean, pink-themed interface with smooth animations
- **Copy to Clipboard**: Easy copying of QR code content
- **Download QR Codes**: Save generated QR codes as PNG images
- **Contact QR Codes**: Generate vCard QR codes for contact sharing

## 🚀 Live Demo

[View Live Demo](https://your-vercel-app.vercel.app) *(Replace with your actual Vercel URL)*

## 📱 Screenshots

The app includes beautiful screenshots for PWA installation:
- Wide format: 1280x720px
- Narrow format: 750x1334px

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **QR Generation**: qrcode 1.5.4
- **QR Scanning**: qr-scanner 1.4.2
- **Icons**: Lucide React 0.344.0
- **PWA**: Service Worker with offline caching
- **Database**: Supabase (configured but not actively used)

## 📦 Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/QR-Scanner.git
   cd QR-Scanner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🏗️ Project Structure

```
QR-Scanner/
├── public/                     # Static assets
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   ├── icon-*.png            # App icons (72px to 512px)
│   └── screenshot-*.png       # PWA screenshots
├── src/
│   ├── components/            # React components
│   │   ├── QRGenerator.tsx   # QR code generation component
│   │   ├── QRScanner.tsx     # QR code scanning component
│   │   └── History.tsx       # History management component
│   ├── App.tsx               # Main application component
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles
│   └── vite-env.d.ts        # Vite type definitions
├── package.json             # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🔧 Configuration

### Vite Configuration (`vite.config.ts`)

The project uses Vite with optimized build settings:

- **Code Splitting**: Separate chunks for vendor libraries and QR-related packages
- **Service Worker Support**: Headers configured for service worker registration
- **React Plugin**: Fast refresh and HMR enabled

### Tailwind CSS (`tailwind.config.js`)

Custom styling configuration with:
- Pink color scheme (`#EC4899` primary color)
- Responsive design utilities
- Custom animations and transitions

### PWA Configuration (`public/manifest.json`)

Progressive Web App settings:
- **App Name**: "QR Master - Generator & Scanner"
- **Theme Color**: Pink (`#EC4899`)
- **Display Mode**: Standalone (app-like experience)
- **Icons**: Multiple sizes for different devices
- **Shortcuts**: Quick access to Generate and Scan features

## 💻 Code Architecture

### Main Components

#### 1. **App.tsx** - Main Application Component
- **Purpose**: Root component managing application state and navigation
- **Key Features**:
  - Tab-based navigation (Generate, Scan, History)
  - History state management with localStorage persistence
  - PWA install prompt handling
  - Responsive layout with gradient background

#### 2. **QRGenerator.tsx** - QR Code Generation
- **Purpose**: Generate QR codes from text or contact information
- **Key Features**:
  - Dual-mode input (Text/URL and Contact vCard)
  - Real-time QR code generation using `qrcode` library
  - Download functionality for generated QR codes
  - Copy to clipboard functionality
  - History integration

#### 3. **QRScanner.tsx** - QR Code Scanning
- **Purpose**: Scan QR codes using device camera
- **Key Features**:
  - Camera access and video preview
  - Real-time QR code detection using `qr-scanner` library
  - Automatic scanning with visual feedback
  - URL detection and external link opening
  - Copy scanned content to clipboard
  - Error handling for camera permissions

#### 4. **History.tsx** - History Management
- **Purpose**: Display and manage QR code history
- **Key Features**:
  - Chronological display of generated and scanned codes
  - Type-based categorization (Generated vs Scanned)
  - Text truncation for long content
  - Copy and open link functionality
  - Clear all history option

### State Management

The application uses React's built-in state management:

- **Local State**: Component-level state with `useState`
- **Persistent Storage**: `localStorage` for history persistence
- **Effect Hooks**: `useEffect` for side effects and cleanup

### Service Worker (`public/sw.js`)

Advanced offline functionality:

- **Caching Strategy**: Cache-first with network fallback
- **Static Assets**: Pre-cache essential files
- **Dynamic Caching**: Cache API responses and user-generated content
- **Background Sync**: Sync offline actions when back online
- **Push Notifications**: Support for push notifications
- **Cache Cleanup**: Automatic cleanup of old cached data

## 🚀 Deployment on Vercel

### Method 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your QR-Scanner repository

3. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Method 2: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new
   - Configure settings as needed

### Method 3: Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Install Vercel CLI and deploy**
   ```bash
   npm i -g vercel
   vercel --prod
   ```

### Vercel Configuration

Create a `vercel.json` file for custom configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        }
      ]
    }
  ]
}
```

### Environment Variables (Optional)

If you plan to use Supabase or other services:

1. **Add environment variables in Vercel dashboard**
2. **Create `.env.local` for local development**
3. **Update your code to use environment variables**

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📱 PWA Features

### Installation
- **Mobile**: Add to home screen from browser menu
- **Desktop**: Install prompt appears automatically
- **Chrome**: Install button in address bar

### Offline Support
- **Service Worker**: Caches essential files
- **Offline Mode**: App works without internet
- **Background Sync**: Syncs when connection restored

### App Shortcuts
- **Generate QR**: Quick access to generation
- **Scan QR**: Quick access to scanning

## 🎨 Customization

### Changing Colors
Update the primary color in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color-here'
      }
    }
  }
}
```

### Adding Features
1. Create new components in `src/components/`
2. Add routes in `App.tsx`
3. Update navigation tabs
4. Add to history if needed

## 🐛 Troubleshooting

### Common Issues

1. **Camera not working**
   - Ensure HTTPS is enabled (required for camera access)
   - Check browser permissions
   - Try different browsers

2. **QR codes not generating**
   - Check console for errors
   - Ensure input is not empty
   - Verify qrcode library is installed

3. **Service worker not registering**
   - Check browser console for errors
   - Ensure HTTPS in production
   - Verify sw.js is in public directory

4. **Build errors**
   - Run `npm run build` to check for TypeScript errors
   - Ensure all dependencies are installed
   - Check for missing imports

### Browser Support

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 11.3+)
- **Edge**: Full support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/QR-Scanner/issues) page
2. Create a new issue with detailed description
3. Include browser version and error messages

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [QR Code](https://www.npmjs.com/package/qrcode) - QR generation
- [QR Scanner](https://www.npmjs.com/package/qr-scanner) - QR scanning
- [Lucide React](https://lucide.dev/) - Icons

---

Made with ❤️ using React & TypeScript
