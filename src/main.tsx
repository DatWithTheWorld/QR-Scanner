import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// PWA functionality
let deferredPrompt: any;
let swRegistration: ServiceWorkerRegistration | null = null;

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      swRegistration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', swRegistration);
      
      // Check for updates
      swRegistration.addEventListener('updatefound', () => {
        const newWorker = swRegistration!.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show update notification
              showUpdateNotification();
            }
          });
        }
      });
      
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  });
}

// Show update notification
function showUpdateNotification() {
  const updateBanner = document.createElement('div');
  updateBanner.id = 'update-banner';
  updateBanner.className = 'fixed top-4 left-4 right-4 bg-blue-600 text-white rounded-lg shadow-lg p-4 z-50';
  updateBanner.innerHTML = `
    <div class="flex items-center justify-between">
      <div>
        <p class="font-medium">New version available!</p>
        <p class="text-sm opacity-90">Refresh to get the latest features</p>
      </div>
      <div class="flex space-x-2">
        <button id="update-dismiss" class="px-3 py-1 text-sm opacity-75 hover:opacity-100">
          Later
        </button>
        <button id="update-refresh" class="px-4 py-2 bg-white text-blue-600 text-sm rounded hover:bg-gray-100">
          Refresh
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(updateBanner);
  
  // Handle update actions
  document.getElementById('update-refresh')?.addEventListener('click', () => {
    if (swRegistration?.waiting) {
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  });
  
  document.getElementById('update-dismiss')?.addEventListener('click', () => {
    updateBanner.remove();
  });
}

// Handle install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show install banner
  const installBanner = document.getElementById('install-banner');
  if (installBanner) {
    installBanner.classList.remove('hidden');
  }
});

// Handle successful installation
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  deferredPrompt = null;
  
  // Hide install banner
  const installBanner = document.getElementById('install-banner');
  if (installBanner) {
    installBanner.classList.add('hidden');
  }
  
  // Show success message
  const successMessage = document.createElement('div');
  successMessage.className = 'fixed top-4 left-4 right-4 bg-green-600 text-white rounded-lg shadow-lg p-4 z-50';
  successMessage.innerHTML = `
    <div class="text-center">
      <p class="font-medium">QR Master installed successfully! 🎉</p>
      <p class="text-sm opacity-90 mt-1">You can now use it offline</p>
    </div>
  `;
  
  document.body.appendChild(successMessage);
  
  setTimeout(() => {
    successMessage.remove();
  }, 3000);
});

// Handle install button click
document.addEventListener('click', (e) => {
  if ((e.target as HTMLElement)?.id === 'install-button') {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        deferredPrompt = null;
      });
    }
  }
  
  if ((e.target as HTMLElement)?.id === 'install-dismiss') {
    const installBanner = document.getElementById('install-banner');
    if (installBanner) {
      installBanner.classList.add('hidden');
    }
  }
});

// Handle online/offline status
window.addEventListener('online', () => {
  console.log('App is online');
  // Trigger background sync if available
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.ready.then((registration) => {
      return registration.sync.register('qr-history-sync');
    });
  }
});

window.addEventListener('offline', () => {
  console.log('App is offline');
  // Show offline indicator
  const offlineIndicator = document.createElement('div');
  offlineIndicator.id = 'offline-indicator';
  offlineIndicator.className = 'fixed top-4 left-4 right-4 bg-yellow-600 text-white rounded-lg shadow-lg p-3 z-50';
  offlineIndicator.innerHTML = `
    <div class="text-center">
      <p class="font-medium">You're offline</p>
      <p class="text-sm opacity-90">Some features may be limited</p>
    </div>
  `;
  
  document.body.appendChild(offlineIndicator);
  
  // Remove when back online
  const removeOfflineIndicator = () => {
    const indicator = document.getElementById('offline-indicator');
    if (indicator) {
      indicator.remove();
    }
    window.removeEventListener('online', removeOfflineIndicator);
  };
  
  window.addEventListener('online', removeOfflineIndicator);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);