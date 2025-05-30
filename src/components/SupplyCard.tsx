
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LabSupply } from '@/types/LabSupply';

interface SupplyCardProps {
  supply: LabSupply;
  index: number;
}

const SupplyCard = ({ supply, index }: SupplyCardProps) => (
  <Draggable draggableId={supply.id} index={index}>
    {(provided, snapshot) => (
      <Card
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`mb-4 cursor-move transition-all duration-200 hover:shadow-lg ${
          snapshot.isDragging ? 'shadow-xl scale-105 rotate-2' : ''
        }`}
      >
        <div className="relative">
          <img
            src={supply.image}
            alt={supply.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Badge className="absolute top-2 right-2 bg-white text-gray-800">
            {supply.category}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-gray-900 truncate">{supply.title}</h3>
            <div className="flex items-center ml-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600 ml-1">{supply.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{supply.description}</p>
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            {supply.location}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xl font-bold text-gray-900">${supply.price}</span>
              <span className="text-gray-500 text-sm">/day</span>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Reserve
            </Button>
          </div>
          <div className="text-xs text-gray-500 mt-2">Owner: {supply.owner}</div>
        </CardContent>
      </Card>
    )}
  </Draggable>
);

export default SupplyCard;
