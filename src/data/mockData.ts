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
  'neon-nights': {
    id: '3',
    slug: 'neon-nights',
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
            image: 'https://picsum.photos/seed/cocktail1/400/300',
            allergens: [],
            addons: [
              { id: 'a13', name: 'Extra Rum Shot', price: 5.00 },
              { id: 'a14', name: 'Glow Stick', price: 1.00 }
            ]
          },
          {
            id: 'i2',
            name: 'Cyber Punch',
            description: 'Vodka, blue curacao, pineapple juice, and edible glitter',
            price: 18.00,
            image: 'https://picsum.photos/seed/cocktail2/400/300',
            allergens: [],
            addons: [
              { id: 'a15', name: 'Premium Garnish', price: 2.00 },
              { id: 'a16', name: 'Dry Ice Effect', price: 3.00 }
            ]
          }
        ]
      },
      {
        id: 'c2',
        name: 'VIP Packages',
        items: [
          {
            id: 'i3',
            name: 'The Mezzanine',
            description: 'Private booth for 4, 1 bottle of premium vodka, mixers',
            price: 1200.00,
            image: 'https://picsum.photos/seed/vip1/400/300',
            allergens: [],
            addons: [
              { id: 'a17', name: 'Extra Champagne Bottle', price: 350.00 },
              { id: 'a18', name: 'Dedicated Host', price: 150.00 }
            ]
          },
          {
            id: 'i4',
            name: 'Main Floor VIP',
            description: 'Front row table for 6, 2 bottles of premium spirits, mixers',
            price: 2500.00,
            image: 'https://picsum.photos/seed/vip2/400/300',
            allergens: [],
            addons: [
              { id: 'a19', name: 'Security Guard', price: 200.00 },
              { id: 'a20', name: 'Sparkler Show', price: 50.00 }
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
  },
  'nocturnal-alchemist': {
    id: '4',
    slug: 'nocturnal-alchemist',
    name: 'The Nocturnal Alchemist',
    description: 'Spirits & Mixology',
    logo: 'https://picsum.photos/seed/alchemist-logo/200/200',
    cover: 'https://picsum.photos/seed/alchemist-cover/1200/400',
    theme: 'alchemist',
    brandColor: '#fbbc00',
    featuredItem: {
      id: 'f1',
      name: 'The Gilded Alchemist',
      description: 'A rare 24-year single malt base infused with saffron-honey reduction, organic bitters, and finished with a citrus smoke cloud.',
      price: 42.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN_4653eKQyHHlw-B-ncx909pZYq4Wb3jdHIJtis0HwO4p-ES2OfV2T9kDGDWZMep95oVE8siwfUIN7hf2N1aHIxhJ7qzF_TeTjqyI3sNG9TgYzscxhvwoknQZsuG5-4PoCuWUCmL6pPExgStu-xv-tDflx1zXJnT6UNru1U6-AFfAljWkREIpLFraEdQ6_NJ0rP-0WpUVRKizDsPUCLDU6koznr2_VAbBRqPbgVIWBMYCaDgZXpbxDebZ03tdEcTzseqOPB4wFwaK',
      allergens: []
    },
    categories: [
      {
        id: 'c1',
        name: 'Signature Cocktails',
        items: [
          {
            id: 'i1',
            name: 'Midnight Orchid',
            description: 'Velvety botanical gin, butterfly pea flower tea, elderflower liqueur, and cold-pressed lime zest.',
            price: 18.00,
            image: 'https://picsum.photos/seed/orchid/400/300',
            abv: '14.2%',
            allergens: []
          },
          {
            id: 'i2',
            name: 'Obsidian Old Fashioned',
            description: 'Double-oaked bourbon, black walnut bitters, and a whisper of activated charcoal agave syrup.',
            price: 22.00,
            image: 'https://picsum.photos/seed/obsidian/400/300',
            abv: '28.5%',
            allergens: []
          },
          {
            id: 'i3',
            name: 'Botanical Mist',
            description: 'Small-batch vodka, cucumber-basil hydrosol, dry vermouth, and a saline solution spritz.',
            price: 19.00,
            image: 'https://picsum.photos/seed/mist/400/300',
            abv: '12.0%',
            allergens: []
          }
        ]
      },
      {
        id: 'c2',
        name: 'Aged Spirits',
        items: [
          {
            id: 'i4',
            name: 'Macallan M',
            description: 'Decadent notes of raisin and ginger with a long, wood-smoke finish. Aged in select sherry oak casks.',
            price: 325.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjAcj8Ce3CDKOQCNtPNv-Wm16dnAY3AYgnZrOeFdYDcDgdrJlPiMxcv65QoJgsxPs6ynoB2b_Et2LYNElud0rr71xlMCL4wrHKLmb9FFyqeGWu4OJo7Mxn1AR0Ie8y5AHuYCGdtj-1PdeYE3ITVeEL0tusegNO_EUl3kneDDgo0FAkiiF6arhwCAf47amuA3ROUAFOFdIGZBbuyekUNCRCnzgU3Q855ptmJxSKx248m5t0AafXgOMJQzu1mYWhAu96UzYZzL-mk4dt',
            abv: '45%',
            isRare: true,
            allergens: []
          },
          {
            id: 'i5',
            name: 'Clase Azul Añejo',
            description: 'Viscous and rich with notes of Mexican vanilla, cinnamon, and toasted oak.',
            price: 95.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkm3SdfKdAOa1Q-PjD9ncZMg3SeXEA6jzlOaRq6C3tfKlJ5WfwWD3Rmqt0ZkXEJKThxbeq-GprfuEnBU7lxDxZ7hBTv-4SQiKMeU2wIsoXWjUGdMufJsuwJFa9SIcYgIz7fEIWdn6Uu35rHcBSfXQrgDGArVWeycemJQ_V3TfEMbXMnUcNJe73TNp416DAWxwRpcA2-VvzEcDN-tJhqe2KJdZIQfgpuSh9J2g4DZrz6NvrOMJpTm6nUSUcBq2_wHNINKm1dfdmvvp9',
            abv: '40%',
            allergens: []
          },
          {
            id: 'i6',
            name: 'Nikka From The Barrel',
            description: 'Intense, floral and spicy Japanese blend.',
            price: 18.00,
            image: 'https://picsum.photos/seed/nikka/400/300',
            abv: '51.4%',
            allergens: []
          },
          {
            id: 'i7',
            name: 'Zacapa Centenario 23',
            description: 'Guatemalan rum aged at high altitude.',
            price: 16.00,
            image: 'https://picsum.photos/seed/zacapa/400/300',
            abv: '40.0%',
            allergens: []
          }
        ]
      },
      {
        id: 'c3',
        name: 'Light Bites',
        items: [
          {
            id: 'i8',
            name: 'Black Truffle Almonds',
            description: 'Slow-roasted Marcona almonds infused with Umbrian truffle oil and sea salt.',
            price: 12.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDesmx9Z7HOncrZXMRE3hJK9G6fn5kzMXK4KAuvg-mxdw8AOC9i1OP09UoV4mBFCWkF2Xiaz8PyQXayB4DUp1mAtH8KXYZ62XLWZvQkAtMG8Z5dActddFtkeKsR4PMqtci5rz5geHESsrbYrFNYBOYk4T9SFSeF1zjZjsBFj6bNRmYFW3I3wbcCyQYCOlbcFLaDQupAoubVu2wAYo4nnuizioXpk6ueIUKHRd7PP9pRLqoCWBN5BousV3WIE9LF9VCeHrhV9CvUQXrQ',
            allergens: []
          },
          {
            id: 'i9',
            name: 'Alchemy Cheese Plate',
            description: 'A curated trio of reserve cheeses served with honeycomb and charcoal crackers.',
            price: 28.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc9NbZUbixFLEDg4N19zE6kaYsLmHuQ3kXDiIMF4eshB8WRdNJ0P0e2D2pbkILTR5HkImOpHuNLHplYAUUTRks4F-HVIUoASzqQ_KSM9n9ok8B14LDtfm6d4tHRfKvFMRAP3BTD9K5fkgFTNdrMB3xlExH02YgOc1dNMeZGQG3vJoQoEweL7TN-aFoTB4HbFvdLK-oTZldYFZV-uuzTizQn3-GrP26oG7FkIK3ZOxlkzped8aMU8tXkfSo2AB2Nu-S9kcCqsWsAo_O',
            allergens: ['Dairy']
          }
        ]
      }
    ],
    contact: {
      address: '789 Alchemist Way, Nocturnal District',
      phone: '+1 555 999 888',
      socials: { instagram: '@nocturnalalchemist' }
    }
  }
};
