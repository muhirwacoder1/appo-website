'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function AppWaitlistForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    platform: 'ios' // default to iOS
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/app-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success('Successfully joined the app waitlist!');
      setFormData({ ...formData, email: '' });
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to join waitlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          disabled={isLoading}
          placeholder="Enter your email for early access"
        />
      </div>

      <div>
        <label htmlFor="platform" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Preferred Platform
        </label>
        <select
          id="platform"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          disabled={isLoading}
        >
          <option value="ios">iOS (App Store)</option>
          <option value="android">Android (Play Store)</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 dark:ring-offset-gray-900"
      >
        {isLoading ? 'Joining...' : 'Join Waitlist'}
      </button>
    </form>
  );
} 