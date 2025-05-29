import { atom } from 'nanostores';

const CREDITS_KEY = 'daily_credits';
const MAX_CREDITS = 15;
const RESET_HOURS = 16;
const REFILL_CODE = '3636';

// Initialize credits store with default value for SSR
export const creditsStore = atom<number>(MAX_CREDITS);

// Initialize credits on client side
if (typeof window !== 'undefined') {
  creditsStore.set(getInitialCredits());
}

// Get initial credits from localStorage or set to max if not found/expired
function getInitialCredits(): number {
  if (typeof window === 'undefined') return MAX_CREDITS;
  
  const storedCredits = localStorage.getItem(CREDITS_KEY);
  if (!storedCredits) {
    return resetCredits();
  }

  try {
    const { credits, lastReset } = JSON.parse(storedCredits);
    const now = new Date();
    const lastResetDate = new Date(lastReset);
    const hoursDiff = (now.getTime() - lastResetDate.getTime()) / (1000 * 60 * 60);

    // Reset credits if RESET_HOURS have passed
    if (hoursDiff >= RESET_HOURS) {
      return resetCredits();
    }

    return credits;
  } catch {
    return resetCredits();
  }
}

// Reset credits to max and update last reset time
function resetCredits(): number {
  if (typeof window === 'undefined') return MAX_CREDITS;

  const creditsData = {
    credits: MAX_CREDITS,
    lastReset: new Date().toISOString()
  };
  localStorage.setItem(CREDITS_KEY, JSON.stringify(creditsData));
  return MAX_CREDITS;
}

// Decrement credits and return true if successful, false if no credits left
export function useCredit(): boolean {
  if (typeof window === 'undefined') return false;

  const currentCredits = creditsStore.get();
  if (currentCredits <= 0) {
    return false;
  }

  const newCredits = currentCredits - 1;
  const creditsData = {
    credits: newCredits,
    lastReset: JSON.parse(localStorage.getItem(CREDITS_KEY) || '{}').lastReset
  };
  
  localStorage.setItem(CREDITS_KEY, JSON.stringify(creditsData));
  creditsStore.set(newCredits);
  return true;
}

export function refillCredits(code: string): boolean {
  if (typeof window === 'undefined') return false;
  
  if (code !== REFILL_CODE) {
    return false;
  }

  const newCredits = MAX_CREDITS;
  const creditsData = {
    credits: newCredits,
    lastReset: new Date().toISOString()
  };

  localStorage.setItem(CREDITS_KEY, JSON.stringify(creditsData));
  creditsStore.set(newCredits);
  return true;
}
