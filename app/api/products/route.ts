import { NextResponse } from 'next/server';
import { Product } from '@/app/inventory/types';

export async function GET() {
  const products: Product[] = [
    {
      id: 1,
      name: 'Notebook',
      category: 'Eletrônicos',
      price: 4500,
      stock: 10,
      status: 'active',
      selected: false
    },
    {
      id: 2,
      name: 'Mouse',
      category: 'Acessórios',
      price: 150,
      stock: 50,
      status: 'active',
      selected: false
    }
    ,
    {
      id: 3,
      name: 'Teclado Mecânico',
      category: 'Acessórios',
      price: 250,
      stock: 30,
      status: 'active',
      selected: false
    },
    {
      id: 4,
      name: 'Monitor 24"',
      category: 'Eletrônicos',
      price: 1200,
      stock: 5,
      status: 'active',
      selected: false
    },
    {
      id: 5,
      name: 'Headset Gamer',
      category: 'Acessórios',
      price: 320,
      stock: 25,
      status: 'active',
      selected: false
    },
    {
      id: 6,
      name: 'Cabo USB-C 1m',
      category: 'Acessórios',
      price: 25,
      stock: 200,
      status: 'active',
      selected: false
    },
    {
      id: 7,
      name: 'SSD 1TB',
      category: 'Armazenamento',
      price: 900,
      stock: 15,
      status: 'active',
      selected: false
    },
    {
      id: 8,
      name: 'Gabinete ATX',
      category: 'Componentes',
      price: 400,
      stock: 8,
      status: 'active',
      selected: false
    },
    {
      id: 9,
      name: 'Fonte 650W',
      category: 'Componentes',
      price: 550,
      stock: 10,
      status: 'inactive',
      selected: false
    },
    {
      id: 10,
      name: 'Placa de Vídeo',
      category: 'Componentes',
      price: 3500,
      stock: 2,
      status: 'active',
      selected: false
    }
  ];

  return NextResponse.json(products);
}
