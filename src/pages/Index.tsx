
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Search, Filter, Calendar, MapPin, Star, Beaker, Microscope, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LabSupply {
  id: string;
  title: string;
  category: string;
  price: number;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  available: boolean;
  description: string;
  owner: string;
}

interface Column {
  id: string;
  title: string;
  items: LabSupply[];
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const initialSupplies: LabSupply[] = [
    {
      id: '1',
      title: 'High-Performance Centrifuge',
      category: 'Equipment',
      price: 250,
      location: 'Building A, Lab 204',
      rating: 4.8,
      reviews: 12,
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop',
      available: true,
      description: 'Professional centrifuge with temperature control',
      owner: 'Dr. Smith'
    },
    {
      id: '2',
      title: 'Compound Microscope Set',
      category: 'Optics',
      price: 180,
      location: 'Building B, Lab 301',
      rating: 4.9,
      reviews: 8,
      image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&h=300&fit=crop',
      available: true,
      description: 'High-resolution microscope with multiple objectives',
      owner: 'Dr. Johnson'
    },
    {
      id: '3',
      title: 'Chemical Hood System',
      category: 'Safety',
      price: 400,
      location: 'Building C, Lab 105',
      rating: 4.7,
      reviews: 15,
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop',
      available: true,
      description: 'Fume hood with advanced filtration system',
      owner: 'Lab Manager'
    },
    {
      id: '4',
      title: 'PCR Thermal Cycler',
      category: 'Equipment',
      price: 320,
      location: 'Building A, Lab 150',
      rating: 4.6,
      reviews: 10,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      available: true,
      description: 'Precision thermal cycler for PCR applications',
      owner: 'Dr. Chen'
    },
    {
      id: '5',
      title: 'Analytical Balance',
      category: 'Measurement',
      price: 150,
      location: 'Building B, Lab 220',
      rating: 4.5,
      reviews: 6,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      available: true,
      description: 'High precision analytical balance 0.1mg',
      owner: 'Dr. Williams'
    },
    {
      id: '6',
      title: 'Spectrophotometer',
      category: 'Analysis',
      price: 280,
      location: 'Building C, Lab 302',
      rating: 4.8,
      reviews: 14,
      image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&h=300&fit=crop',
      available: true,
      description: 'UV-Vis spectrophotometer with software',
      owner: 'Dr. Davis'
    }
  ];

  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'available',
      title: 'Available Supplies',
      items: initialSupplies
    },
    {
      id: 'reserved',
      title: 'Reserved',
      items: []
    },
    {
      id: 'maintenance',
      title: 'Under Maintenance',
      items: []
    }
  ]);

  const categories = ['all', 'Equipment', 'Optics', 'Safety', 'Measurement', 'Analysis'];

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find(col => col.id === source.droppableId);
      const destColumn = columns.find(col => col.id === destination.droppableId);
      
      if (sourceColumn && destColumn) {
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        setColumns(columns.map(col => {
          if (col.id === source.droppableId) {
            return { ...col, items: sourceItems };
          }
          if (col.id === destination.droppableId) {
            return { ...col, items: destItems };
          }
          return col;
        }));
      }
    } else {
      const column = columns.find(col => col.id === source.droppableId);
      if (column) {
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);

        setColumns(columns.map(col => 
          col.id === source.droppableId 
            ? { ...col, items: copiedItems }
            : col
        ));
      }
    }
  };

  const filteredItems = (items: LabSupply[]) => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const SupplyCard = ({ supply, index }: { supply: LabSupply; index: number }) => (
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search lab equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === 'all' ? 'All Categories' : category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Drag and Drop Columns */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {columns.map(column => (
              <div key={column.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    {column.id === 'available' && <Beaker className="w-5 h-5 mr-2 text-green-600" />}
                    {column.id === 'reserved' && <Calendar className="w-5 h-5 mr-2 text-yellow-600" />}
                    {column.id === 'maintenance' && <FlaskConical className="w-5 h-5 mr-2 text-red-600" />}
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
      </div>
    </div>
  );
};

export default Index;
