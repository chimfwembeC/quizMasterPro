import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';

export function Profile() {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
    console.log('user',user);
  const updateProfile = async () => {
    // Logic to update profile in Firestore
    console.log(`Updating profile name to: ${name}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        onClick={updateProfile}
        className="px-4 py-2 bg-primary text-white rounded shadow"
      >
        Save Changes
      </button>
    </div>
  );
}
