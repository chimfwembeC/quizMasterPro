import React, { useState } from 'react';

export function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'My Quiz App',
    darkMode: false,
    theme: 'default', // Other options could include 'light', 'dark', etc.
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Save changes to Firestore here if needed
    // Example: updateDoc(doc(db, 'users', userId), { settings });
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6 bg-white shadow rounded-lg p-6">
        {/* Site Name */}
        <div className="flex flex-col">
          <label htmlFor="siteName" className="mb-2 font-medium">
            Site Name
          </label>
          <input
            type="text"
            id="siteName"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            className="border rounded-md p-2 text-gray-700"
            placeholder="Enter your site name"
          />
        </div>

        {/* Theme Selection */}
        <div className="flex flex-col">
          <label htmlFor="theme" className="mb-2 font-medium">
            Theme
          </label>
          <select
            id="theme"
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="border rounded-md p-2 text-gray-700"
          >
            <option value="default">Default</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center">
          <label htmlFor="darkMode" className="mr-2 text-sm font-medium">
            Enable Dark Mode
          </label>
          <input
            type="checkbox"
            id="darkMode"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
            className="rounded"
          />
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              console.log('Settings saved:', settings);
              // Save to Firestore or API
              alert('Settings saved!');
            }}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
