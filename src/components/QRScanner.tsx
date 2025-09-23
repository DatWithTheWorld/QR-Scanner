import React, { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import { Camera, CameraOff, ExternalLink, Copy, Check } from 'lucide-react';

interface QRScannerProps {
  onHistoryAdd: (item: { type: 'scanned'; text: string; timestamp: Date }) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onHistoryAdd }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const startScanning = async () => {
    if (!videoRef.current) return;

    try {
      setError('');
      const scanner = new QrScanner(
        videoRef.current,
        (result) => {
          setScannedData(result.data);
          onHistoryAdd({
            type: 'scanned',
            text: result.data,
            timestamp: new Date()
          });
          stopScanning();
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      scannerRef.current = scanner;
      await scanner.start();
      setIsScanning(true);
    } catch (err) {
      setError('Failed to start camera. Please check permissions.');
      console.error('Error starting scanner:', err);
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      scannerRef.current.destroy();
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(scannedData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const openLink = () => {
    if (scannedData.match(/^https?:\/\//)) {
      window.open(scannedData, '_blank');
    }
  };

  const isUrl = scannedData.match(/^https?:\/\//);

  return (
    <div className="space-y-6">
      {/* Camera Preview */}
      <div className="bg-gray-900 rounded-xl overflow-hidden relative">
        <video
          ref={videoRef}
          className="w-full h-64 object-cover"
          style={{ display: isScanning ? 'block' : 'none' }}
        />
        {!isScanning && (
          <div className="h-64 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500">
              <Camera size={48} className="mx-auto mb-2" />
              <p>Camera preview will appear here</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center">
        {!isScanning ? (
          <button
            onClick={startScanning}
            className="flex items-center space-x-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-all duration-200 transform hover:scale-105"
          >
            <Camera size={20} />
            <span>Start Scanning</span>
          </button>
        ) : (
          <button
            onClick={stopScanning}
            className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
          >
            <CameraOff size={20} />
            <span>Stop Scanning</span>
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Scanned Data */}
      {scannedData && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Scanned Content:</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-800 break-words">{scannedData}</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            {isUrl && (
              <button
                onClick={openLink}
                className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all duration-200 transform hover:scale-105"
              >
                <ExternalLink size={16} />
                <span>Open Link</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">How to scan:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Click "Start Scanning" to activate your camera</li>
          <li>• Point your camera at a QR code</li>
          <li>• The code will be detected automatically</li>
          <li>• Make sure the QR code is well-lit and in focus</li>
        </ul>
      </div>
    </div>
  );
};