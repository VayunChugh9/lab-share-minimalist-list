
import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Calendar, Beaker, FlaskConical, Microscope } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Column, LabSupply } from '@/types/LabSupply';
import SupplyCard from './SupplyCard';

interface DragDropBoardProps {
  columns: Column[];
  onDragEnd: (result: DropResult) => void;
  filteredItems: (items: LabSupply[]) => LabSupply[];
}

const DragDropBoard = ({ columns, onDragEnd, filteredItems }: DragDropBoardProps) => {
  const getColumnIcon = (columnId: string) => {
    switch (columnId) {
      case 'available':
        return <Beaker className="w-5 h-5 mr-2 text-green-600" />;
      case 'reserved':
        return <Calendar className="w-5 h-5 mr-2 text-yellow-600" />;
      case 'maintenance':
        return <FlaskConical className="w-5 h-5 mr-2 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map(column => (
          <div key={column.id} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                {getColumnIcon(column.id)}
                {column.title}
              </h2>
              <Badge variant="secondary">
                {filteredItems(column.items).length}
              </Badge>
            </div>
            
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`min-h-[200px] transition-colors ${
                    snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg' : ''
                  }`}
                >
                  {filteredItems(column.items).map((supply, index) => (
                    <SupplyCard key={supply.id} supply={supply} index={index} />
                  ))}
                  {provided.placeholder}
                  {filteredItems(column.items).length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      <Microscope className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>No items in this category</p>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default DragDropBoard;
