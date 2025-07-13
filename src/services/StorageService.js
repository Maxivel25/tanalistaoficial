export class StorageService {
  static getLists() {
    const LISTS_KEY = 'shoplist_lists';
    try {
      const data = localStorage.getItem(LISTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading lists:', error);
      return [];
    }
  }

  static saveLists(lists) {
    const LISTS_KEY = 'shoplist_lists';
    try {
      localStorage.setItem(LISTS_KEY, JSON.stringify(lists));
    } catch (error) {
      console.error('Error saving lists:', error);
    }
  }

  static getHistory() {
    const HISTORY_KEY = 'shoplist_history';
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading history:', error);
      return [];
    }
  }

  static saveHistory(history) {
    const HISTORY_KEY = 'shoplist_history';
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  }

  static getSettings() {
    const SETTINGS_KEY = 'shoplist_settings';
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? JSON.parse(data) : { weeklyNotifications: true };
    } catch (error) {
      console.error('Error loading settings:', error);
      return { weeklyNotifications: true };
    }
  }

  static saveSettings(settings) {
    const SETTINGS_KEY = 'shoplist_settings';
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }

  static clearAll() {
    try {
      localStorage.removeItem('shoplist_lists');
      localStorage.removeItem('shoplist_history');
      localStorage.removeItem('shoplist_settings');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}