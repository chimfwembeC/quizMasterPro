import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { NotificationIcon } from './NotificationIcon';
import { useNotificationStore } from '../../store/notificationStore';
import type { Notification } from '../../types/notification';
import { cn } from '../../lib/utils';

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const removeNotification = useNotificationStore((state) => state.removeNotification);

  const bgColor = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
  }[notification.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={cn(
        'relative flex items-center p-4 mb-4 w-96 border rounded-lg shadow-lg',
        bgColor
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center">
        <NotificationIcon type={notification.type} />
      </div>
      <div className="ml-3 mr-8">
        <p className="text-sm font-medium text-gray-900">{notification.message}</p>
      </div>
      <button
        onClick={() => removeNotification(notification.id)}
        className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}