// Safe LocalStorage & SessionStorage wrapper for Brave Browser Shields & Private Browsing Mode
const memoryStorage = {};

export const safeLocalStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`[SafeStorage] localStorage.getItem failed for key "${key}":`, e.message);
    }
    return memoryStorage[key] || null;
  },

  setItem: (key, value) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn(`[SafeStorage] localStorage.setItem failed for key "${key}":`, e.message);
    }
    memoryStorage[key] = value;
  },

  removeItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch (e) {
      console.warn(`[SafeStorage] localStorage.removeItem failed for key "${key}":`, e.message);
    }
    delete memoryStorage[key];
  }
};
