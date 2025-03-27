import React from 'react';
import { Clock } from './components/Clock';
import { ServiceTracker } from './components/ServiceTracker';
import { Calendar } from './components/Calendar';

function App() {
  return (
    <div className="min-h-screen bg-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ministry of ICTPCS Help Desk Service Management Dashboard</h1>
          <Clock />
        </div>
        
        <div className="space-y-8">
          <ServiceTracker />
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default App;