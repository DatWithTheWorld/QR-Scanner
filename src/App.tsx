import React, { useState, useEffect } from 'react';
import { QrCode, Scan, History as HistoryIcon, Github, Heart } from 'lucide-react';
import { QRGenerator } from './components/QRGenerator';
import { QRScanner } from './components/QRScanner';
import { History } from './components/History';

interface HistoryItem {
  type: 'generated' | 'scanned';
  text: string;
  timestamp: Date;
}

function App() {
  const [activeTab, setActiveTab] = useState('generate');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('qr-master-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(parsedHistory);
      } catch (error) {
        console.error('Error loading history:', error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('qr-master-history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (item: HistoryItem) => {
    setHistory(prev => [...prev, item]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const tabs = [
    { id: 'generate', label: 'Generate', icon: QrCode },
    { id: 'scan', label: 'Scan', icon: Scan },
    { id: 'history', label: 'History', icon: HistoryIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-gray-50 to-pink-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-gray-600 bg-clip-text text-transparent">
              QR Master
            </h1>
            <p className="text-gray-600 mt-2">Beautiful QR code generator and scanner</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md transform scale-105'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                  {tab.id === 'history' && history.length > 0 && (
                    <span className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full ml-1">
                      {history.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === 'generate' && (
            <QRGenerator onHistoryAdd={addToHistory} />
          )}
          {activeTab === 'scan' && (
            <QRScanner onHistoryAdd={addToHistory} />
          )}
          {activeTab === 'history' && (
            <History history={history} onClear={clearHistory} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center text-gray-500">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <span>Made with</span>
            <Heart size={16} className="text-pink-500" />
            <span>using React & TypeScript</span>
          </div>
          <p className="text-xs mt-2">
            A beautiful PWA for generating and scanning QR codes
          </p>
        </div>
      </footer>

      {/* Install prompt for PWA */}
      <div id="install-banner" className="hidden fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800">Install QR Master</p>
            <p className="text-sm text-gray-600">Add to your home screen for quick access</p>
          </div>
          <div className="flex space-x-2">
            <button
              id="install-dismiss"
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Dismiss
            </button>
            <button
              id="install-button"
              className="px-4 py-2 bg-pink-600 text-white text-sm rounded-lg hover:bg-pink-700"
            >
              Install
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;