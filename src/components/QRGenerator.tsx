import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, Check } from 'lucide-react';

interface QRGeneratorProps {
  onHistoryAdd: (item: { type: 'generated'; text: string; timestamp: Date }) => void;
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({ onHistoryAdd }) => {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('text');

  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
    organization: ''
  });

  const generateQRCode = async (input: string) => {
    if (!input.trim()) {
      setQrCodeUrl('');
      return;
    }

    try {
      const url = await QRCode.toDataURL(input, {
        width: 300,
        margin: 2,
        color: {
          dark: '#374151',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(url);
      onHistoryAdd({
        type: 'generated',
        text: input,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const generateVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
TEL:${contactInfo.phone}
EMAIL:${contactInfo.email}
ORG:${contactInfo.organization}
END:VCARD`;
    return vcard;
  };

  useEffect(() => {
    if (activeTab === 'text') {
      generateQRCode(text);
    } else if (activeTab === 'contact') {
      const vcard = generateVCard();
      if (contactInfo.name || contactInfo.phone || contactInfo.email) {
        generateQRCode(vcard);
      } else {
        setQrCodeUrl('');
      }
    }
  }, [text, contactInfo, activeTab]);

  const downloadQR = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    link.click();
  };

  const copyToClipboard = async () => {
    const currentText = activeTab === 'text' ? text : generateVCard();
    try {
      await navigator.clipboard.writeText(currentText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
            activeTab === 'text'
              ? 'bg-white shadow-sm text-pink-600 font-medium'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Text/URL
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
            activeTab === 'contact'
              ? 'bg-white shadow-sm text-pink-600 font-medium'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Contact
        </button>
      </div>

      {/* Input Forms */}
      {activeTab === 'text' ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter text or URL
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your text, URL, or any content here..."
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={contactInfo.name}
              onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              placeholder="john@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization
            </label>
            <input
              type="text"
              value={contactInfo.organization}
              onChange={(e) => setContactInfo(prev => ({ ...prev, organization: e.target.value }))}
              placeholder="Company Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      )}

      {/* QR Code Display */}
      {qrCodeUrl && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="text-center">
            <img src={qrCodeUrl} alt="Generated QR Code" className="mx-auto mb-4 rounded-lg" />
            <div className="flex space-x-3 justify-center">
              <button
                onClick={downloadQR}
                className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all duration-200 transform hover:scale-105"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};