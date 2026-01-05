
export const CATEGORIES = [
  'Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 
  'Biography', 'Fantasy', 'Mystery', 'Romance', 'Self-Help'
];

export const INITIAL_BOOKS = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    price: 15.99,
    description: 'A story of wealth, love, and the American Dream in the 1920s.',
    coverImage: 'https://picsum.photos/seed/gatsby/400/600',
    stockQuantity: 12,
    categories: ['Fiction', 'History'],
    publisher: 'Scribner',
    publicationDate: '1925-04-10',
    rating: 4.5,
    reviews: []
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-0132350884',
    price: 44.99,
    description: 'A handbook of agile software craftsmanship.',
    coverImage: 'https://picsum.photos/seed/cleancode/400/600',
    stockQuantity: 5,
    categories: ['Technology', 'Science'],
    publisher: 'Pearson',
    publicationDate: '2008-08-01',
    rating: 4.8,
    reviews: []
  },
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '978-0735211292',
    price: 18.00,
    description: 'An easy and proven way to build good habits and break bad ones.',
    coverImage: 'https://picsum.photos/seed/habits/400/600',
    stockQuantity: 25,
    categories: ['Self-Help', 'Non-Fiction'],
    publisher: 'Avery',
    publicationDate: '2018-10-16',
    rating: 4.9,
    reviews: []
  },
  {
    id: '4',
    title: 'Brief Answers to the Big Questions',
    author: 'Stephen Hawking',
    isbn: '978-1473695986',
    price: 22.50,
    description: 'The final book from the world famous cosmologist.',
    coverImage: 'https://picsum.photos/seed/hawking/400/600',
    stockQuantity: 8,
    categories: ['Science', 'Non-Fiction'],
    publisher: 'Bantam',
    publicationDate: '2018-10-16',
    rating: 4.7,
    reviews: []
  }
];
