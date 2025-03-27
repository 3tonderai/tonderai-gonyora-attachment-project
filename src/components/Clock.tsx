import React, { useState, useEffect } from 'react';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');
  const hours = formatNumber(time.getHours());
  const minutes = formatNumber(time.getMinutes());
  const seconds = formatNumber(time.getSeconds());

  return (
    <div className="w-48 h-16 bg-black rounded-lg flex items-center justify-center">
      <div className="text-2xl font-bold text-white">
        {hours}:{minutes}:{seconds}
      </div>
    </div>
  );
}