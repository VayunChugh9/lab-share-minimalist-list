
import React from 'react';
import { Beaker } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Beaker className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">LabShare</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              List Your Equipment
            </Button>
            <Button size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
