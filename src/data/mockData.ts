import { Restaurant } from '../types';

export const MOCK_RESTAURANTS: Record<string, Restaurant> = {
  'burger-joint': {
    id: '1',
    slug: 'burger-joint',
    name: 'The Burger Joint',
    description: 'Gourmet burgers & craft shakes',
    logo: 'https://picsum.photos/seed/burger-logo/200/200',
    cover: 'https://picsum.photos/seed/burger-cover/1200/400',
    theme: 'fast-food',
    brandColor: '#FF4D00',
    categories: [
      {
        id: 'c1',
        name: 'Burgers',
        items: [
          {
            id: 'i1',
            name: 'Classic Cheeseburger',
            description: 'Angus beef, cheddar, lettuce, tomato, secret sauce',
            price: 12.99,
            promoPrice: 10.99,
            image: 'https://picsum.photos/seed/burger1/400/300',
            allergens: ['Gluten', 'Dairy'],
            addons: [
              { id: 'a1', name: 'Extra Bacon', price: 2.00 },
              { id: 'a2', name: 'Fried Egg', price: 1.50 },
              { id: 'a3', name: 'Extra Cheese', price: 1.00 },
              { id: 'a4', name: 'Caramelized Onions', price: 0.50 }
            ]
          },
          {
            id: 'i2',
            name: 'Bacon BBQ Burger',
            description: 'Crispy bacon, onion rings, smoky BBQ sauce',
            price: 14.50,
            image: 'https://picsum.photos/seed/burger2/400/300',
            allergens: ['Gluten'],
            addons: [
              { id: 'a5', name: 'Double Patty', price: 4.00 },
              { id: 'a6', name: 'Jalapeños', price: 0.75 },
              { id: 'a7', name: 'Avocado', price: 2.50 }
            ]
          }
        ]
      },
      {
        id: 'c2',
        name: 'Sides',
        items: [
          {
            id: 'i3',
            name: 'Truffle Fries',
            description: 'Hand-cut fries with truffle oil and parmesan',
            price: 6.50,
            image: 'https://picsum.photos/seed/fries/400/300',
            allergens: ['Dairy'],
            addons: [
              { id: 'a8', name: 'Extra Parmesan', price: 1.00 },
              { id: 'a9', name: 'Garlic Aioli', price: 0.50 },
              { id: 'a10', name: 'Cheddar Dip', price: 1.50 }
            ]
          }
        ]
      }
    ],
    contact: {
      address: '123 Burger St, Foodville',
      phone: '+1 234 567 890',
      socials: { instagram: '@burgerjoint' }
    }
  },
  'fine-dining': {
    id: '2',
    slug: 'fine-dining',
    name: 'L\'Elegance',
    description: 'Modern French cuisine',
    logo: 'https://picsum.photos/seed/fine-logo/200/200',
    cover: 'https://picsum.photos/seed/fine-cover/1200/400',
    theme: 'restaurant',
    brandColor: '#4A4A35',
    categories: [
      {
        id: 'c1',
        name: 'Starters',
        items: [
          {
            id: 'i1',
            name: 'Foie Gras',
            description: 'With fig compote and toasted brioche',
            price: 24.00,
            image: 'https://picsum.photos/seed/foie/400/300',
            allergens: ['Gluten'],
            addons: [
              { id: 'a11', name: 'Extra Brioche', price: 3.00 },
              { id: 'a12', name: 'Truffle Shavings', price: 12.00 }
            ]
          }
        ]
      }
    ],
    contact: {
      address: '456 Luxury Ave, City',
      phone: '+1 987 654 321',
      socials: { instagram: '@lelegance' }
    }
  },
  'neon-bar': {
    id: '3',
    slug: 'neon-bar',
    name: 'Neon Nights',
    description: 'Cocktails & electronic vibes',
    logo: 'https://picsum.photos/seed/bar-logo/200/200',
    cover: 'https://picsum.photos/seed/bar-cover/1200/400',
    theme: 'night',
    brandColor: '#A855F7',
    categories: [
      {
        id: 'c1',
        name: 'Cocktails',
        items: [
          {
            id: 'i1',
            name: 'Electric Mojito',
            description: 'Mint, lime, white rum, and a secret neon twist',
            price: 15.00,
            image: 'https://picsum.photos/seed/cocktail/400/300',
            allergens: [],
            addons: [
              { id: 'a13', name: 'Extra Rum Shot', price: 5.00 },
              { id: 'a14', name: 'Glow Stick', price: 1.00 },
              { id: 'a15', name: 'Premium Garnish', price: 2.00 }
            ]
          }
        ]
      }
    ],
    contact: {
      address: '789 Techno Way, Underground',
      phone: '+1 555 000 111',
      socials: { instagram: '@neonnights' }
    }
  }
};
