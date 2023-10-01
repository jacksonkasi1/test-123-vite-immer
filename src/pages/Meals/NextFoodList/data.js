import foodImg from "@assets/Images/vegNoodles.png"
const columns = [
  { name: 'Food Image', uid: 'thumbnail'},
  { name: 'Food Name', uid: 'name', sortable: true },
  { name: 'Category', uid: 'tbl_category'},
  { name: 'Price', uid: 'price', sortable: true },
  { name: 'STATUS', uid: 'is_available', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];



const foodData = [
  {
    id: 1,
    foodName: 'Pizza',
    foodImage:foodImg,    
    category: 'Italian',
    price: '$10.99',
    status: 'Available',
  },
  {
    id: 2,
    foodImage: foodImg,
    foodName: 'Burger',
    category: 'Fast Food',
    price: '$5.99',
    status: 'Available',
  },
  {
    id: 3,
    foodImage: foodImg,
    foodName: 'Sushi',
    category: 'Japanese',
    price: '$12.99',
    status: 'Unavailable',
  },
  {
    id: 4,
    foodImage: foodImg,
    foodName: 'Pasta',
    category: 'Italian',
    price: '$9.99',
    status: 'Available',
  },
  {
    id: 5,
    foodImage: foodImg,
    foodName: 'Tacos',
    category: 'Mexican',
    price: '$7.99',
    status: 'Unavailable',
  },
  {
    id: 6,
    foodImage: foodImg,
    foodName: 'Steak',
    category: 'American',
    price: '$15.99',
    status: 'Available',
  },
  {
    id: 7,
    foodImage: foodImg,
    foodName: 'Fish and Chips',
    category: 'British',
    price: '$11.99',
    status: 'Available',
  },
  {
    id: 8,
    foodImage: foodImg,
    foodName: 'Sushi Burrito',
    category: 'Japanese',
    price: '$8.99',
    status: 'Available',
  },
  {
    id: 9,
    foodImage: foodImg,
    foodName: 'Chicken Teriyaki',
    category: 'Japanese',
    price: '$9.99',
    status: 'Available',
  },
  {
    id: 10,
    foodImage: foodImg,
    foodName: 'Spaghetti Carbonara',
    category: 'Italian',
    price: '$12.99',
    status: 'Unavailable',
  },
  {
    id: 11,
    foodImage: foodImg,
    foodName: 'Taco Salad',
    category: 'Mexican',
    price: '$6.99',
    status: 'Available',
  },
  {
    id: 12,
    foodImage: foodImg,
    foodName: 'Cheeseburger',
    category: 'Fast Food',
    price: '$4.99',
    status: 'Available',
  },
  {
    id: 13,
    foodImage: foodImg,
    foodName: 'Sushi Rolls',
    category: 'Japanese',
    price: '$7.99',
    status: 'Available',
  },
  {
    id: 14,
    foodImage: foodImg,
    foodName: 'Garlic Bread',
    category: 'Italian',
    price: '$3.99',
    status: 'Available',
  },
  {
    id: 15,
    foodImage: foodImg,
    foodName: 'Nachos',
    category: 'Mexican',
    price: '$8.99',
    status: 'Available',
  },
  {
    id: 16,
    foodImage: foodImg,
    foodName: 'Fish Tacos',
    category: 'Mexican',
    price: '$9.99',
    status: 'Available',
  },
  {
    id: 17,
    foodImage: foodImg,
    foodName: 'Miso Soup',
    category: 'Japanese',
    price: '$2.99',
    status: 'Available',
  },
  {
    id: 18,
    foodImage: foodImg,
    foodName: 'Caesar Salad',
    category: 'American',
    price: '$7.99',
    status: 'Available',
  },
  {
    id: 19,
    foodImage: foodImg,
    foodName: 'Margherita Pizza',
    category: 'Italian',
    price: '$11.99',
    status: 'Unavailable',
  },
];

export const categoryOptions = [
  { value: 'Non Veg', label: 'Non Veg' },
  { value: 'Veg', label: 'Veg' },
  { value: 'Drinks', label: 'Drinks' },
  { value: 'Biriyani', label: 'Biriyani' },
  { value: 'Hot Item', label: 'Hot Item' },
];

export const availableOptions = [
  { value: 'Available', label: 'Available' },
  { value: 'Not available', label: 'Not available' },
];

// Now you have the foodData array with the desired format.


export { columns };
