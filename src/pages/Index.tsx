import React, { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { Column, LabSupply } from '@/types/LabSupply';
import Header from '@/components/Header';
import SearchAndFilters from '@/components/SearchAndFilters';
import DragDropBoard from '@/components/DragDropBoard';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        <DragDropBoard
          columns={columns}
          onDragEnd={onDragEnd}
          filteredItems={filteredItems}
        />
      </div>
    </div>
  );
};

export default Index;
