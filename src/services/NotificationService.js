export class NotificationService {
  constructor() {
    this.PERMISSION_GRANTED = 'granted';
    this.PERMISSION_DENIED = 'denied';
    this.PERMISSION_DEFAULT = 'default';
  }

  static async init(settings) {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (settings.weeklyNotifications && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    if (settings.weeklyNotifications && Notification.permission === 'granted') {
      NotificationService.scheduleWeeklyReminder();
      return true;
    }

    return false;
  }

  static async requestPermission() {
    if (!('Notification' in window)) {
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  static scheduleWeeklyReminder() {
    // Clear any existing reminders
    NotificationService.clearReminders();

    // Schedule weekly notification (7 days from now)
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    
    setTimeout(() => {
      NotificationService.showReminder();
      // Schedule the next one
      NotificationService.scheduleWeeklyReminder();
    }, oneWeek);

    // Store the reminder time for persistence
    localStorage.setItem('shoplist_next_reminder', Date.now() + oneWeek);
  }

  static showReminder() {
    if (Notification.permission === 'granted') {
      new Notification('ShopList Reminder', {
        body: 'Time to review your shopping lists! 🛒',
        icon: '/vite.svg',
        badge: '/vite.svg',
        tag: 'weekly-reminder',
        requireInteraction: false
      });
    }
  }

  static clearReminders() {
    localStorage.removeItem('shoplist_next_reminder');
  }

  static updateSettings(settings) {
    if (settings.weeklyNotifications) {
      if (Notification.permission === 'granted') {
        NotificationService.scheduleWeeklyReminder();
      } else {
        NotificationService.requestPermission().then(granted => {
          if (granted) {
            NotificationService.scheduleWeeklyReminder();
          }
        });
      }
    } else {
      NotificationService.clearReminders();
    }
  }

  static checkMissedReminders() {
    const nextReminder = localStorage.getItem('shoplist_next_reminder');
    if (nextReminder && Date.now() > parseInt(nextReminder)) {
      // We missed a reminder, show it now and reschedule
      NotificationService.showReminder();
      NotificationService.scheduleWeeklyReminder();
    }
  }
}

// Check for missed reminders when the service loads
if (typeof window !== 'undefined') {
  NotificationService.checkMissedReminders();
}