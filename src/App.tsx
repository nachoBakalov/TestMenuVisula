import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Plus, Minus, Info, Instagram, Facebook, MapPin, Phone, X, ChevronRight, Check } from 'lucide-react';
import { Restaurant, Category, MenuItem, CartItem, ThemeKey, Addon } from './types';
import { MOCK_RESTAURANTS } from './data/mockData';

// --- Components ---

const AddonModal = ({ 
  isOpen, 
  onClose, 
  item, 
  onConfirm 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  item: MenuItem | null, 
  onConfirm: (addons: Addon[]) => void 
}) => {
  const [selected, setSelected] = useState<Addon[]>([]);

  if (!item) return null;

  const toggleAddon = (addon: Addon) => {
    setSelected(prev => 
      prev.find(a => a.id === addon.id) 
        ? prev.filter(a => a.id !== addon.id) 
        : [...prev, addon]
    );
  };

  const totalPrice = (item.promoPrice || item.price) + selected.reduce((acc, a) => acc + a.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80]"
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 bg-[var(--bg-base)] rounded-t-[32px] z-[90] p-6 md:max-w-xl md:mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Customize {item.name}</h2>
                <p className="text-sm text-[var(--text-muted)]">Select your favorite addons</p>
              </div>
              <button onClick={onClose} className="p-2 bg-white/5 rounded-full"><X size={20} /></button>
            </div>

            <div className="space-y-3 mb-8 max-h-[40vh] overflow-y-auto no-scrollbar">
              {item.addons?.map(addon => {
                const isSelected = selected.find(a => a.id === addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all
                      ${isSelected ? 'border-[var(--primary)] bg-[var(--primary)]/5' : 'border-white/5 bg-white/5'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                        ${isSelected ? 'bg-[var(--primary)] border-[var(--primary)]' : 'border-white/20'}
                      `}>
                        {isSelected && <Check size={14} className="text-white" />}
                      </div>
                      <span className="font-bold">{addon.name}</span>
                    </div>
                    <span className="font-medium text-[var(--text-muted)]">+${addon.price.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => {
                onConfirm(selected);
                setSelected([]);
                onClose();
              }}
              className="w-full bg-[var(--primary)] text-white h-14 rounded-2xl font-bold text-lg shadow-xl flex items-center justify-between px-8"
            >
              <span>Add to Cart</span>
              <span>${totalPrice.toFixed(2)}</span>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  theme: ThemeKey;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ 
  item, 
  quantity, 
  onAdd, 
  onRemove,
  theme 
}) => {
  const isNight = theme === 'night';
  const isRestaurant = theme === 'restaurant';
  const isFastFood = theme === 'fast-food';

  const hasAddons = item.addons && item.addons.length > 0;
  const quantityInCart = quantity;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative flex items-center p-4 gap-4 overflow-hidden transition-all duration-500 group
        ${isRestaurant ? 'border-b border-stone-200 hover:bg-stone-50/50' : 'rounded-[var(--radius)] bg-[var(--card-bg)] shadow-[var(--card-shadow)] hover:translate-y-[-4px]'}
        ${isNight ? 'glass hover:bg-white/10' : ''}
      `}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-bold truncate tracking-tight ${isRestaurant ? 'font-serif text-xl' : 'text-base'}`}>
            {item.name}
          </h3>
          {item.allergens.length > 0 && (
            <div className="flex gap-1">
              {item.allergens.map(a => (
                <span key={a} className="w-5 h-5 rounded-full bg-slate-100/50 backdrop-blur-sm flex items-center justify-center text-[10px] text-slate-500 font-bold" title={a}>
                  {a[0]}
                </span>
              ))}
            </div>
          )}
        </div>
        <p className="text-sm text-[var(--text-muted)] line-clamp-2 mt-1 leading-relaxed">
          {item.description}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span className={`font-black text-[var(--primary)] ${isRestaurant ? 'text-xl' : 'text-lg'}`}>
            ${item.promoPrice || item.price}
          </span>
          {item.promoPrice && (
            <span className="text-xs text-[var(--text-muted)] line-through opacity-60">
              ${item.price}
            </span>
          )}
        </div>
      </div>

      <div className="relative flex-shrink-0">
        <div className="overflow-hidden rounded-[var(--radius)]">
          <img 
            src={item.image} 
            alt={item.name}
            className={`w-28 h-28 object-cover transition-transform duration-700 group-hover:scale-110 ${isFastFood ? 'rounded-lg' : 'rounded-[var(--radius)]'}`}
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="absolute -bottom-2 -right-2">
          <AnimatePresence mode="wait">
            {quantityInCart === 0 || hasAddons ? (
              <motion.button
                key="add"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={onAdd}
                className="w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
              >
                {hasAddons && quantityInCart > 0 ? (
                  <div className="relative">
                    <Plus size={20} />
                    <span className="absolute -top-4 -right-4 bg-white text-[var(--primary)] text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[var(--primary)] font-bold">
                      {quantityInCart}
                    </span>
                  </div>
                ) : <Plus size={20} />}
              </motion.button>
            ) : (
              <motion.div
                key="stepper"
                initial={{ width: 40, opacity: 0 }}
                animate={{ width: 100, opacity: 1 }}
                exit={{ width: 40, opacity: 0 }}
                className="h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-between px-1 shadow-lg overflow-hidden"
              >
                <button onClick={onRemove} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                  <Minus size={16} />
                </button>
                <span className="font-bold text-sm">{quantityInCart}</span>
                <button onClick={onAdd} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                  <Plus size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const CartBar = ({ items, onOpen }: { items: CartItem[], onOpen: () => void }) => {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => {
    const addonsPrice = item.selectedAddons?.reduce((sum, a) => sum + a.price, 0) || 0;
    return acc + (item.promoPrice || item.price + addonsPrice) * item.quantity;
  }, 0);

  if (totalItems === 0) return null;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 left-4 right-4 z-50 md:max-w-md md:mx-auto"
    >
      <button 
        onClick={onOpen}
        className="w-full bg-[var(--primary)] text-white h-14 rounded-2xl shadow-2xl flex items-center justify-between px-6 hover:scale-[1.02] active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center font-bold">
            {totalItems}
          </div>
          <span className="font-bold">View Cart</span>
        </div>
        <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
      </button>
    </motion.div>
  );
};

const CheckoutModal = ({ 
  isOpen, 
  onClose, 
  cart,
  restaurant,
  onUpdateQuantity
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  cart: CartItem[],
  restaurant: Restaurant,
  onUpdateQuantity: (cartId: string, delta: number) => void
}) => {
  const [method, setMethod] = useState<'table' | 'delivery' | 'takeaway'>('table');
  const totalPrice = cart.reduce((acc, item) => {
    const addonsPrice = item.selectedAddons?.reduce((sum, a) => sum + a.price, 0) || 0;
    return acc + (item.promoPrice || item.price + addonsPrice) * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-[var(--bg-base)] rounded-t-[32px] z-[70] max-h-[90vh] overflow-y-auto p-6 md:max-w-2xl md:mx-auto md:rounded-3xl md:bottom-10"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Your Order</h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6 mb-8">
              {cart.map(item => (
                <div key={item.cartId} className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-[var(--primary)]">{item.quantity}x</span>
                      <span className="font-bold">{item.name}</span>
                    </div>
                    {item.selectedAddons && item.selectedAddons.length > 0 && (
                      <p className="text-xs text-[var(--text-muted)] ml-8">
                        + {item.selectedAddons.map(a => a.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold">
                      ${((item.promoPrice || item.price + (item.selectedAddons?.reduce((s, a) => s + a.price, 0) || 0)) * item.quantity).toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onUpdateQuantity(item.cartId, -1)} className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center"><Minus size={12}/></button>
                      <button onClick={() => onUpdateQuantity(item.cartId, 1)} className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center"><Plus size={12}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">Order Method</h3>
              <div className="grid grid-cols-3 gap-3">
                {(['table', 'delivery', 'takeaway'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`py-3 rounded-xl border-2 transition-all font-bold capitalize
                      ${method === m ? 'border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]' : 'border-slate-200 text-slate-400'}
                    `}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-lg">
                <span className="text-[var(--text-muted)]">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-[var(--primary)] text-white h-16 rounded-2xl font-bold text-xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-transform">
              Confirm Order
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [slug, setSlug] = useState('burger-joint');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [addonItem, setAddonItem] = useState<MenuItem | null>(null);

  const restaurant = MOCK_RESTAURANTS[slug];

  useEffect(() => {
    if (restaurant) {
      document.documentElement.setAttribute('data-theme', restaurant.theme);
      setActiveCategory(restaurant.categories[0]?.id || '');
    }
  }, [restaurant]);

  if (!restaurant) return <div>Restaurant not found</div>;

  const addToCart = (item: MenuItem, selectedAddons?: Addon[]) => {
    // If item has addons and none were provided, open modal
    if (item.addons && !selectedAddons) {
      setAddonItem(item);
      return;
    }

    const cartId = `${item.id}-${selectedAddons?.map(a => a.id).sort().join(',') || 'none'}`;

    setCart(prev => {
      const existing = prev.find(i => i.cartId === cartId);
      if (existing) {
        return prev.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, selectedAddons, cartId }];
    });
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.cartId === cartId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.cartId !== cartId);
    });
  };

  const updateQuantity = (cartId: string, delta: number) => {
    if (delta > 0) {
      const item = cart.find(i => i.cartId === cartId);
      if (item) addToCart(item, item.selectedAddons);
    } else {
      removeFromCart(cartId);
    }
  };

  const getQuantity = (itemId: string) => cart.filter(i => i.id === itemId).reduce((acc, i) => acc + i.quantity, 0);
  const getItemInCart = (itemId: string) => cart.find(i => i.id === itemId);

  return (
    <div className="min-h-screen pb-32 relative overflow-hidden">
      {/* Ultra-modern background effects for Night theme */}
      {restaurant.theme === 'night' && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full" />
        </div>
      )}

      {/* Header */}
      <div className="relative h-64 md:h-80">
        <img 
          src={restaurant.cover} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-black/20" />
        
        {/* Restaurant Selector (Demo Only) */}
        <div className="absolute top-4 right-4 flex gap-2">
          {Object.keys(MOCK_RESTAURANTS).map(s => (
            <button 
              key={s} 
              onClick={() => { setSlug(s); setCart([]); }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all
                ${slug === s ? 'bg-[var(--primary)] text-white' : 'bg-white/20 text-white backdrop-blur-md'}
              `}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-10 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-end gap-4 mb-6">
            <img 
              src={restaurant.logo} 
              alt={restaurant.name} 
              className="w-24 h-24 rounded-2xl border-4 border-[var(--bg-base)] shadow-xl object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="mb-2">
              <h1 className={`text-3xl font-bold ${restaurant.theme === 'restaurant' ? 'font-serif' : ''}`}>
                {restaurant.name}
              </h1>
              <p className="text-[var(--text-muted)] text-sm">{restaurant.description}</p>
            </div>
          </div>

          {/* Info Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-full text-xs font-medium border border-slate-100 whitespace-nowrap">
              <MapPin size={14} className="text-[var(--primary)]" />
              {restaurant.contact.address}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-full text-xs font-medium border border-slate-100 whitespace-nowrap">
              <Phone size={14} className="text-[var(--primary)]" />
              {restaurant.contact.phone}
            </div>
            {restaurant.contact.socials.instagram && (
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--card-bg)] rounded-full text-xs font-medium border border-slate-100 whitespace-nowrap">
                <Instagram size={14} className="text-[var(--primary)]" />
                Instagram
              </div>
            )}
          </div>

          {/* Categories Tabs */}
          <div className="sticky top-0 bg-[var(--bg-base)]/90 backdrop-blur-xl z-40 -mx-4 px-4 py-6 mb-8 border-b border-white/5">
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {restaurant.categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap
                    ${activeCategory === cat.id 
                      ? 'bg-[var(--primary)] text-white shadow-[0_10px_20px_rgba(var(--primary-rgb),0.3)] scale-105' 
                      : 'bg-white/5 text-[var(--text-muted)] hover:bg-white/10'}
                  `}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-12">
            {restaurant.categories.map(cat => (
              <section key={cat.id} id={cat.id} className="scroll-mt-24">
                <h2 className={`text-2xl font-bold mb-6 ${restaurant.theme === 'restaurant' ? 'font-serif' : ''}`}>
                  {cat.name}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {cat.items.map(item => {
                    const itemInCart = cart.find(i => i.id === item.id);
                    return (
                      <MenuItemCard 
                        key={item.id} 
                        item={item} 
                        theme={restaurant.theme}
                        quantity={getQuantity(item.id)}
                        onAdd={() => addToCart(item)}
                        onRemove={() => itemInCart && removeFromCart(itemInCart.cartId)}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Desktop Sidebar Cart */}
        <aside className="hidden lg:block w-80 sticky top-24 h-fit">
          <div className="bg-[var(--card-bg)] rounded-3xl p-6 shadow-[var(--card-shadow)] border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShoppingBag size={20} className="text-[var(--primary)]" />
              Your Cart
            </h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag size={24} className="text-slate-300" />
                </div>
                <p className="text-slate-400 text-sm">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto no-scrollbar">
                  {cart.map(item => {
                    const addonsPrice = item.selectedAddons?.reduce((sum, a) => sum + a.price, 0) || 0;
                    return (
                      <div key={item.cartId} className="flex items-center justify-between group">
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate">{item.name}</p>
                          {item.selectedAddons && item.selectedAddons.length > 0 && (
                            <p className="text-[10px] text-[var(--text-muted)] truncate">
                              + {item.selectedAddons.map(a => a.name).join(', ')}
                            </p>
                          )}
                          <p className="text-xs text-[var(--text-muted)]">${(item.promoPrice || item.price + addonsPrice).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button onClick={() => updateQuantity(item.cartId, -1)} className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartId, 1)} className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="border-t border-slate-100 pt-4 mb-6">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span>
                      ${cart.reduce((acc, i) => {
                        const addonsPrice = i.selectedAddons?.reduce((sum, a) => sum + a.price, 0) || 0;
                        return acc + (i.promoPrice || i.price + addonsPrice) * i.quantity;
                      }, 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-[var(--primary)] text-white h-12 rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        </aside>
      </div>

      <CartBar items={cart} onOpen={() => setIsCheckoutOpen(true)} />
      
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cart={cart}
        restaurant={restaurant}
        onUpdateQuantity={updateQuantity}
      />

      <AddonModal 
        isOpen={!!addonItem}
        onClose={() => setAddonItem(null)}
        item={addonItem}
        onConfirm={(addons) => addToCart(addonItem!, addons)}
      />
    </div>
  );
}
