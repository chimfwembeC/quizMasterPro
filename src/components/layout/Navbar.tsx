import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Bell, Settings } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { signOut } from '../../lib/auth';

export function Navbar() {
  const { user } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8" />
              <span className="text-xl font-bold">QuizMaster Pro</span>
            </Link>
          </div>

          {/* Links & User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="relative">
                  {/* Notifications Dropdown */}
                  <button
                    onClick={() => setShowNotifications((prev) => !prev)}
                    className="relative focus:outline-none"
                  >
                    <Bell className="h-6 w-6 hover:text-accent" />
                    {/* Notification Count */}
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                      3
                    </span>
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg">
                      <div className="">
                        <h3 className="font-bold text-lg px-4">Notifications</h3>
                        <ul className="mt-2">
                          <li className="py-1 px-2 border-b">Welcome to QuizMaster Pro!</li>
                          <li className="py-1 px-2 border-b">New quiz available</li>
                          <li className="py-1 px-2">Update your profile</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  {/* Settings Dropdown */}
                  <button
                    onClick={() => setShowSettings((prev) => !prev)}
                    className="relative focus:outline-none"
                  >
                    <Settings className="h-6 w-6 hover:text-accent" />
                  </button>
                  {showSettings && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
                      <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <Link to="/profile">Profile</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <Link to="/settings">Settings</Link>
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            // Call logout function
                            signOut();
                          }}
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to="/login" className="hover:text-accent">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
