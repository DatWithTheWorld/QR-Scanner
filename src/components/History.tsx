import React from 'react';
import { Calendar, Copy, ExternalLink, Check } from 'lucide-react';

interface HistoryItem {
  type: 'generated' | 'scanned';
  text: string;
  timestamp: Date;
}

interface HistoryProps {
  history: HistoryItem[];
  onClear: () => void;
}

export const History: React.FC<HistoryProps> = ({ history, onClear }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const openLink = (text: string) => {
    if (text.match(/^https?:\/\//)) {
      window.open(text, '_blank');
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-6">
      {history.length === 0 ? (
        <div className="text-center py-12">
          <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No history yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Generated and scanned QR codes will appear here
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Activity ({history.length})
            </h3>
            <button
              onClick={onClear}
              className="text-sm text-red-600 hover:text-red-700 transition-colors duration-200"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-3">
            {history.slice().reverse().map((item, index) => {
              const isUrl = item.text.match(/^https?:\/\//);
              const actualIndex = history.length - 1 - index;
              
              return (
                <div
                  key={actualIndex}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium ${
                            item.type === 'generated'
                              ? 'bg-pink-100 text-pink-600'
                              : 'bg-blue-100 text-blue-600'
                          }`}
                        >
                          {item.type === 'generated' ? 'Generated' : 'Scanned'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(item.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-800 text-sm break-words">
                        {truncateText(item.text)}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => copyToClipboard(item.text, actualIndex)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-all duration-200"
                        title="Copy"
                      >
                        {copiedIndex === actualIndex ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                      {isUrl && (
                        <button
                          onClick={() => openLink(item.text)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-all duration-200"
                          title="Open Link"
                        >
                          <ExternalLink size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};