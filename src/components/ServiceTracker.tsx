import React, { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';

interface Service {
  id: string;
  clientId: string;
  clientName: string;
  description: string;
  receivalDate: string;
  completionDate: string;
  issuanceDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  daysTaken: number;
}

const mockServices: Service[] = [
  {
    id: '1',
    clientId: 'CLT001',
    clientName: 'John Boent',
    description: 'Server maintenance and network optimization',
    receivalDate: '2024-03-24',
    completionDate: '2024-03-26',
    issuanceDate: '2024-03-26',
    status: 'completed',
    daysTaken: 2,
  },
  {
    id: '2',
    clientId: 'CLT002',
    clientName: 'Mukwati Building Home Affairs department',
    description: 'Workstation setup and configuration',
    receivalDate: '2024-03-24',
    completionDate: '2024-03-25',
    issuanceDate: '2024-03-25',
    status: 'completed',
    daysTaken: 1,
  },
  {
    id: '3',
    clientId: 'CLT003',
    clientName: 'Karigamombe Building',
    description: 'Network security audit and updates',
    receivalDate: '2024-03-24',
    completionDate: '',
    issuanceDate: '',
    status: 'in-progress',
    daysTaken: 0,
  },
  {
    id: '4',
    clientId: 'CLT004',
    clientName: 'ADM DATA Center',
    description: 'Database optimization and backup setup',
    receivalDate: '2024-03-24',
    completionDate: '',
    issuanceDate: '',
    status: 'in-progress',
    daysTaken: 0,
  },
  {
    id: '5',
    clientId: 'CLT005',
    clientName: 'ZITF Preperations',
    description: 'Cloud infrastructure deployment',
    receivalDate: '2024-03-24',
    completionDate: '',
    issuanceDate: '',
    status: 'pending',
    daysTaken: 0,
  }
];

export function ServiceTracker() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [weeklyEfficiency, setWeeklyEfficiency] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // Get the start and end dates of the current week
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
      const endOfWeek = new Date(today);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // End of week (Saturday)

      // Filter services for the current week
      const weeklyServices = services.filter(service => {
        const serviceDate = new Date(service.receivalDate);
        return serviceDate >= startOfWeek && serviceDate <= endOfWeek;
      });

      // Calculate weekly efficiency
      const completedServices = weeklyServices.filter(service => service.status === 'completed');
      const efficiency = weeklyServices.length > 0 
        ? (completedServices.length / weeklyServices.length) * 100 
        : 0;
      
      setWeeklyEfficiency(Math.round(efficiency));
    }, 40000);

    return () => clearInterval(timer);
  }, [services]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Truck className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Service Tracking</h2>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="text-blue-800 font-medium">Weekly Efficiency</div>
          <div className="text-2xl font-bold text-blue-900">{weeklyEfficiency}%</div>
          <div className="text-sm text-blue-600">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {
              new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 6))
                .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            }
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receival Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issuance Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Taken</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.clientId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.clientName}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{service.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.receivalDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.completionDate || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.issuanceDate || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${service.status === 'completed' ? 'bg-green-100 text-green-800' :
                    service.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'}`}>
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.daysTaken || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}