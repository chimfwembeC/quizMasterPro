import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const querySnapshot = await getDocs(collection(db, 'notifications'));
      const fetchedNotifications = querySnapshot.docs.map((doc) => doc.data());
      setNotifications(fetchedNotifications);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index} className="mb-2">
            <span>{notif.message}</span>
            <span className="text-sm text-gray-500 ml-2">{notif.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
