import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { NotificationItem } from './NotificationItem';
import { useNotificationStore } from '../../store/notificationStore';

export function NotificationContainer() {
  const notifications = useNotificationStore((state) => state.notifications);

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </AnimatePresence>
    </div>
  );
}