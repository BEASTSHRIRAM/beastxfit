import React from 'react';
import { Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <Activity className="h-8 w-8 mr-2" />
        <h1 className="text-2xl font-bold">FitTrack</h1>
      </div>
    </header>
  );
};

export default Header;