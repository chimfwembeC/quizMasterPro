import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import type { NotificationType } from '../../types/notification';

interface NotificationIconProps {
  type: NotificationType;
}

export function NotificationIcon({ type }: NotificationIconProps) {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'error':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'warning':
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    case 'info':
      return <Info className="w-5 h-5 text-blue-500" />;
  }
}