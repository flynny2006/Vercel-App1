import { useStore } from '@nanostores/react';
import { creditsStore, refillCredits } from '~/lib/stores/credits';
import { useState } from 'react';

export interface CreditsDisplayProps {
  className?: string;
}

export function CreditsDisplay({ className = '' }: CreditsDisplayProps) {
  const credits = useStore(creditsStore);
  const [showRefill, setShowRefill] = useState(false);
  const [refillCode, setRefillCode] = useState('');
  const [error, setError] = useState('');
  
  const handleRefill = () => {
    if (refillCredits(refillCode)) {
      setShowRefill(false);
      setRefillCode('');
      setError('');
    } else {
      setError('Invalid refill code');
    }
  };

  return (
    <div className={`bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 rounded-lg shadow-lg min-w-[200px] ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-white text-sm font-medium">
          Credits: {credits}/15
        </p>
        <p className="text-white/80 text-xs ml-2">
        Refill code is needed.
        </p>
      </div>

      <div className="mt-3">
        {!showRefill ? (
          <button
            onClick={() => setShowRefill(true)}
            className="w-full py-1.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-md text-sm font-medium transition-all"
          >
            Refill Credits
          </button>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={refillCode}
              onChange={(e) => setRefillCode(e.target.value)}
              className="w-full px-3 py-1.5 text-sm rounded-md border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
              placeholder="Enter refill code"
              autoFocus
            />
            {error && <p className="text-red-400 text-xs font-medium">{error}</p>}
            <div className="flex gap-2">
              <button
                onClick={handleRefill}
                className="flex-1 py-1.5 px-3 bg-white/20 hover:bg-white/30 text-white rounded-md text-sm font-medium transition-all"
              >
                Refill
              </button>
              <button
                onClick={() => {
                  setShowRefill(false);
                  setError('');
                  setRefillCode('');
                }}
                className="flex-1 py-1.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-md text-sm font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
