interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-lg text-center">
        {/* Error icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-red-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          Unable to Load Data
        </h3>
        
        <p className="text-red-300 mb-6">
          {message}
        </p>

        {message.includes('API key') && (
          <div className="text-left bg-navy-800/50 rounded-xl p-4 mb-6">
            <p className="text-sm text-navy-300 mb-2">To set up your API key:</p>
            <ol className="text-sm text-navy-400 list-decimal list-inside space-y-1">
              <li>Go to Google Cloud Console</li>
              <li>Enable the Google Sheets API</li>
              <li>Create an API key</li>
              <li>Add it to <code className="text-gold-400">.env</code> as <code className="text-gold-400">VITE_GOOGLE_SHEETS_API_KEY</code></li>
            </ol>
          </div>
        )}

        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-medium rounded-xl transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

