import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Booking {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    clientName: 'John Doe',
    service: 'Equipment Maintenance',
    date: '2024-03-15',
    time: '10:00',
  },
  // Add more mock bookings
];

export function Calendar() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [view, setView] = useState<'calendar' | 'reports'>('calendar');

  useEffect(() => {
    const timer = setInterval(() => {
      setView(prev => prev === 'calendar' ? 'reports' : 'calendar');
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const moveWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
      return newDate;
    });
  };

  const getDaysOfWeek = () => {
    const days = [];
    const firstDay = new Date(currentWeek);
    firstDay.setDate(firstDay.getDate() - firstDay.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDay);
      day.setDate(firstDay.getDate() + i);
      days.push(day);
    }
    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {view === 'calendar' ? 'Service Booking Calendar' : 'Weekly Reports'}
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => moveWeek('prev')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => moveWeek('next')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {view === 'calendar' ? (
        <div className="grid grid-cols-7 gap-4">
          {getDaysOfWeek().map((day, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="font-semibold mb-2">
                {day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
              {mockBookings
                .filter(booking => new Date(booking.date).toDateString() === day.toDateString())
                .map(booking => (
                  <div key={booking.id} className="bg-blue-50 p-2 rounded mb-2">
                    <div className="font-medium">{booking.clientName}</div>
                    <div className="text-sm text-gray-600">{booking.service}</div>
                    <div className="text-sm text-gray-500">{booking.time}</div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Weekly Performance Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-800 font-medium">Completed Jobs</div>
              <div className="text-2xl font-bold">24</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-yellow-800 font-medium">In Progress</div>
              <div className="text-2xl font-bold">12</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-800 font-medium">Average Efficiency</div>
              <div className="text-2xl font-bold">92%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}