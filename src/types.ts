export type ThemeKey = 'standard' | 'fast-food' | 'restaurant' | 'night';

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo: string;
  cover: string;
  theme: ThemeKey;
  brandColor: string;
  categories: Category[];
  contact: {
    address: string;
    phone: string;
    socials: {
      instagram?: string;
      facebook?: string;
    };
  };
}

export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  promoPrice?: number;
  image: string;
  allergens: string[];
  addons?: Addon[];
}

export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedAddons?: Addon[];
  cartId: string; // Unique ID for items with different addon combinations
}
