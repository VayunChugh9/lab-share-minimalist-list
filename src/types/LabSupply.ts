
export interface LabSupply {
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

export interface Column {
  id: string;
  title: string;
  items: LabSupply[];
}
