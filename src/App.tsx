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
            className="fixed bottom-0 left-0 right-0 bg-[#1a1919] rounded-t-[32px] z-[90] p-6 md:max-w-xl md:mx-auto border-t border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-headline font-black uppercase tracking-tighter neon-text-primary">Customize {item.name}</h2>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest">Select your favorite addons</p>
              </div>
              <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-white/50 hover:text-white transition-colors"><X size={20} /></button>
            </div>

            <div className="space-y-3 mb-8 max-h-[40vh] overflow-y-auto no-scrollbar">
              {item.addons?.map(addon => {
                const isSelected = selected.find(a => a.id === addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all
                      ${isSelected ? 'border-[var(--primary)] bg-[var(--primary)]/10' : 'border-white/5 bg-white/5 hover:bg-white/10'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all
                        ${isSelected ? 'bg-[var(--primary)] border-[var(--primary)]' : 'border-white/20'}
                      `}>
                        {isSelected && <Check size={14} className="text-black" />}
                      </div>
                      <span className={`font-bold uppercase tracking-tight ${isSelected ? 'text-[var(--primary)]' : 'text-white'}`}>{addon.name}</span>
                    </div>
                    <span className="font-headline font-bold text-[var(--tertiary)]">+${addon.price.toFixed(2)}</span>
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
              className="w-full bg-[var(--primary)] text-black h-16 rounded-md font-headline font-black uppercase tracking-[0.2em] shadow-xl flex items-center justify-between px-8 glow-primary active:scale-95 transition-all"
            >
              <span>Add to Order</span>
              <span className="text-xl neon-text-tertiary">${totalPrice.toFixed(2)}</span>
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
  const isAlchemist = theme === 'alchemist';
  const isRestaurant = theme === 'restaurant';
  const isFastFood = theme === 'fast-food';

  const hasAddons = item.addons && item.addons.length > 0;
  const quantityInCart = quantity;

  if (isAlchemist) {
    return (
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-surface-container-low p-6 rounded-xl group hover:bg-surface-container transition-all duration-300 amber-glow border border-transparent hover:border-outline-variant/10 flex flex-col"
        style={{ backgroundColor: 'var(--card-bg)' }}
      >
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-xl font-headline font-bold text-[var(--primary)] group-hover:text-[var(--primary-container)] transition-colors">
            {item.name}
          </h4>
          <span className="text-[var(--primary)] text-lg font-bold font-headline">${item.price}</span>
        </div>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 flex-1">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-[var(--outline-variant)]/20">
          <div className="flex flex-col gap-1">
            {item.abv && (
              <span className="text-[10px] uppercase tracking-widest text-[var(--secondary)] font-bold">{item.abv} ABV</span>
            )}
            <div className="flex gap-1 h-1 w-24 bg-[var(--outline-variant)]/20 rounded-full overflow-hidden">
              <div 
                className="bg-[var(--secondary)] h-full" 
                style={{ width: item.abv ? `${parseFloat(item.abv) * 2}%` : '0%' }} 
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {quantityInCart > 0 && !hasAddons && (
              <button 
                onClick={onRemove}
                className="w-8 h-8 bg-white/5 text-white flex items-center justify-center rounded-md hover:bg-white/10 transition-all"
              >
                <Minus size={14} />
              </button>
            )}
            <button 
              onClick={onAdd}
              className="w-8 h-8 bg-[var(--primary)] text-[var(--on-primary)] flex items-center justify-center rounded-md hover:opacity-90 active:scale-90 transition-all font-bold"
            >
              {hasAddons && quantityInCart > 0 ? (
                <div className="relative">
                  <Plus size={16} />
                  <span className="absolute -top-3 -right-3 bg-[var(--primary-container)] text-[var(--on-primary)] text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-[var(--on-primary)] font-bold">
                    {quantityInCart}
                  </span>
                </div>
              ) : quantityInCart > 0 && !hasAddons ? (
                <span className="text-xs">{quantityInCart}</span>
              ) : <Plus size={16} />}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (isNight) {
    return (
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group bg-[#1a1919] border border-white/10 rounded-lg p-6 hover:bg-[#201f1f] transition-all duration-300 relative flex flex-col"
      >
        <div className="relative h-64 flex items-center justify-center mb-6 overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-[var(--primary)]/5 rounded-full blur-3xl group-hover:bg-[var(--primary)]/20 transition-all" />
          <img 
            src={item.image} 
            alt={item.name}
            className="relative z-10 h-full w-full object-cover drop-shadow-[0_0_15px_rgba(151,169,255,0.3)] group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex justify-between items-start">
            <h4 className="font-headline font-extrabold text-xl tracking-tighter uppercase leading-tight neon-text-primary">
              {item.name}
            </h4>
            <button className="text-[var(--primary)]">
              <Info size={18} />
            </button>
          </div>
          <p className="text-[var(--text-muted)] text-sm font-label uppercase tracking-widest line-clamp-2">
            {item.description}
          </p>
          <div className="pt-4 flex justify-between items-center mt-auto">
            <p className="text-[var(--tertiary)] font-headline font-black text-2xl neon-text-tertiary">
              ${item.promoPrice || item.price}
            </p>
            
            <div className="flex items-center gap-2">
              {quantityInCart > 0 && !hasAddons && (
                <button 
                  onClick={onRemove}
                  className="w-10 h-10 bg-white/5 text-white flex items-center justify-center rounded-md hover:bg-white/10 transition-all"
                >
                  <Minus size={18} />
                </button>
              )}
              
              <button 
                onClick={onAdd}
                className={`w-10 h-10 flex items-center justify-center rounded-md glow-primary active:scale-90 transition-all
                  ${isNight ? 'bg-[var(--primary)] text-black' : 'bg-[var(--primary)] text-white'}
                `}
              >
                {hasAddons && quantityInCart > 0 ? (
                  <div className="relative">
                    <Plus size={20} />
                    <span className="absolute -top-4 -right-4 bg-[var(--tertiary)] text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-black font-bold">
                      {quantityInCart}
                    </span>
                  </div>
                ) : quantityInCart > 0 && !hasAddons ? (
                  <span className="font-bold">{quantityInCart}</span>
                ) : <Plus size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

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
    return acc + ((item.promoPrice || item.price) + addonsPrice) * item.quantity;
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
        className="w-full bg-[var(--tertiary)] text-black h-16 rounded-md shadow-2xl flex items-center justify-between px-6 glow-primary active:scale-95 transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="bg-black text-[var(--tertiary)] w-8 h-8 rounded-md flex items-center justify-center font-headline font-black">
            {totalItems}
          </div>
          <span className="font-headline font-black uppercase tracking-widest">View Order</span>
        </div>
        <span className="font-headline font-black text-xl neon-text-tertiary">${totalPrice.toFixed(2)}</span>
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
  const isNight = restaurant.theme === 'night';
  const totalPrice = cart.reduce((acc, item) => {
    const addonsPrice = item.selectedAddons?.reduce((sum, a) => sum + a.price, 0) || 0;
    return acc + ((item.promoPrice || item.price) + addonsPrice) * item.quantity;
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed bottom-0 left-0 right-0 rounded-t-[32px] z-[70] max-h-[90vh] overflow-y-auto p-6 md:max-w-2xl md:mx-auto md:rounded-3xl md:bottom-10 border-t border-white/10
              ${isNight ? 'bg-[#0e0e0e] text-white shadow-[0_-20px_40px_rgba(0,0,0,0.5)]' : 'bg-[var(--bg-base)] text-[var(--text-base)]'}
            `}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className={`text-2xl font-black uppercase tracking-tighter ${isNight ? 'font-headline neon-text-primary' : 'font-bold'}`}>
                Your Order
              </h2>
              <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6 mb-8">
              {cart.map(item => (
                <div key={item.cartId} className="flex items-start justify-between group">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-black text-[var(--primary)]">{item.quantity}x</span>
                      <span className="font-bold uppercase tracking-tight">{item.name}</span>
                    </div>
                    {item.selectedAddons && item.selectedAddons.length > 0 && (
                      <p className="text-[10px] text-[var(--text-muted)] ml-8 uppercase tracking-widest">
                        + {item.selectedAddons.map(a => a.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`font-bold ${isNight ? 'text-[var(--tertiary)]' : ''}`}>
                      ${(((item.promoPrice || item.price) + (item.selectedAddons?.reduce((s, a) => s + a.price, 0) || 0)) * item.quantity).toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onUpdateQuantity(item.cartId, -1)} className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"><Minus size={14}/></button>
                      <button onClick={() => onUpdateQuantity(item.cartId, 1)} className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"><Plus size={14}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">Order Method</h3>
              <div className="grid grid-cols-3 gap-3">
                {(['table', 'delivery', 'takeaway'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`py-4 rounded-xl border-2 transition-all font-black uppercase text-xs tracking-widest
                      ${method === m 
                        ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]' 
                        : 'border-white/5 bg-white/5 text-[var(--text-muted)] hover:bg-white/10'}
                    `}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-8 p-6 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--text-muted)] uppercase tracking-widest">Subtotal</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-black text-xl uppercase tracking-widest">Total</span>
                <span className={`font-black text-3xl ${isNight ? 'text-[var(--tertiary)] neon-text-tertiary' : ''}`}>
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <button className={`w-full h-16 rounded-md font-headline font-black uppercase tracking-[0.2em] text-xl transition-all active:scale-95
              ${isNight ? 'bg-[var(--primary)] text-black glow-primary' : 'bg-[var(--primary)] text-white shadow-xl'}
            `}>
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
  const [slug, setSlug] = useState(() => {
    const path = window.location.pathname.replace('/', '');
    if (path === 'electric-noir' || path === 'neon-bar') return 'neon-nights';
    return MOCK_RESTAURANTS[path] ? path : 'burger-joint';
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [addonItem, setAddonItem] = useState<MenuItem | null>(null);

  const restaurant = MOCK_RESTAURANTS[slug];

  useEffect(() => {
    const handlePopState = () => {
      let path = window.location.pathname.replace('/', '');
      if (path === 'electric-noir' || path === 'neon-bar') path = 'neon-nights';
      if (MOCK_RESTAURANTS[path]) {
        setSlug(path);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (restaurant) {
      document.documentElement.setAttribute('data-theme', restaurant.theme);
      setActiveCategory(restaurant.categories[0]?.id || '');
    }
  }, [restaurant]);

  useEffect(() => {
    const path = window.location.pathname.replace('/', '');
    if (path === 'electric-noir' || path === 'neon-bar') {
      window.history.replaceState({}, '', '/neon-nights');
    } else if (path === '' || path === '/') {
      window.history.replaceState({}, '', '/burger-joint');
    }
  }, []);

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
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[var(--primary)]/10 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[var(--secondary)]/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-[var(--tertiary)]/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
        </div>
      )}

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 h-20 transition-all duration-300
        ${restaurant.theme === 'night' ? 'bg-[#0e0e0e]/90 backdrop-blur-2xl border-b border-white/5' : 
          restaurant.theme === 'alchemist' ? 'bg-[#131313]/70 backdrop-blur-xl border-b border-[#504532]/15' : 
          'bg-[var(--bg-base)]/80 backdrop-blur-md'}
      `}>
        <div className="flex items-center gap-4">
          {restaurant.theme === 'alchemist' && (
            <button className="text-[#fbbc00] active:scale-95 transition-transform">
              <span className="material-symbols-outlined">menu</span>
            </button>
          )}
          <h1 className={`text-2xl font-black tracking-tighter uppercase
            ${restaurant.theme === 'night' ? 'neon-text-primary font-headline' : 
              restaurant.theme === 'alchemist' ? 'text-[#ffe2ab] font-headline tracking-[0.2em] text-sm' : ''}
          `}>
            {restaurant.name}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {restaurant.theme === 'alchemist' && (
            <button className="text-[#fbbc00] active:scale-95 transition-transform">
              <span className="material-symbols-outlined">search</span>
            </button>
          )}
          {/* Restaurant Selector (Demo Only) */}
          <div className="hidden md:flex gap-2">
            {Object.entries(MOCK_RESTAURANTS).map(([s, r]) => (
              <button 
                key={s} 
                onClick={() => { 
                  setSlug(s); 
                  setCart([]); 
                  window.history.pushState({}, '', `/${s}`);
                }}
                className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all
                  ${slug === s 
                    ? 'bg-[var(--primary)] text-black glow-primary' 
                    : 'bg-white/5 text-[var(--text-muted)] hover:bg-white/10 border border-white/5'}
                `}
              >
                {r.name}
              </button>
            ))}
          </div>
          <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 overflow-hidden p-0.5">
            <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-full h-full object-cover rounded-[2px]" />
          </div>
        </div>
      </header>

      <div className="pt-20">
        {/* Alchemist Theme Hero */}
        {restaurant.theme === 'alchemist' && restaurant.featuredItem && (
          <section className="mb-16 relative overflow-hidden rounded-xl h-[450px] flex items-end mx-4 mt-8">
            <img 
              alt={restaurant.featuredItem.name} 
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]" 
              src={restaurant.featuredItem.image}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/40 to-transparent"></div>
            <div className="relative p-8 md:p-12 w-full lg:w-2/3">
              <span className="text-[var(--secondary)] font-label uppercase tracking-widest text-xs font-semibold mb-3 block">Special of the Night</span>
              <h2 className="text-5xl md:text-7xl font-headline font-extrabold text-[var(--primary)] mb-6 leading-none tracking-tight">
                {restaurant.featuredItem.name}
              </h2>
              <p className="text-[var(--text-muted)] text-lg max-w-xl mb-8 leading-relaxed">
                {restaurant.featuredItem.description}
              </p>
              <div className="flex gap-6 items-center">
                <button 
                  onClick={() => restaurant.featuredItem && addToCart(restaurant.featuredItem)}
                  className="bg-[var(--primary)] text-[var(--on-primary)] px-8 py-3 rounded-md font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
                >
                  Reserve Experience
                </button>
                <span className="text-[var(--primary)] font-headline text-2xl font-bold">${restaurant.featuredItem.price.toFixed(2)}</span>
              </div>
            </div>
          </section>
        )}

        {/* Night Theme Hero */}
        {restaurant.theme === 'night' && (
          <section className="relative overflow-hidden rounded-xl bg-[#1a1919] p-8 md:p-16 mx-4 mt-8 mb-16 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[var(--primary)]/10 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[var(--secondary)]/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-[var(--tertiary)] animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--tertiary)]">Live Now: Neon Beats</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-6xl md:text-8xl font-headline font-black uppercase tracking-tighter leading-[0.85] neon-text-primary">
                    Electric<br />Noir
                  </h2>
                  <p className="text-xl text-[var(--text-muted)] font-label uppercase tracking-[0.2em] max-w-md">
                    Experience the future of dining in high-fidelity.
                  </p>
                </div>
                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-[var(--primary)] text-black font-headline font-black uppercase tracking-widest rounded-md glow-primary hover:scale-105 transition-all">
                    Book Table
                  </button>
                  <button className="px-8 py-4 bg-white/5 text-white border border-white/10 font-headline font-black uppercase tracking-widest rounded-md hover:bg-white/10 transition-all">
                    View Gallery
                  </button>
                </div>
              </div>
              <div className="hidden md:grid grid-cols-2 gap-6 items-center">
                <div className="space-y-6">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden border border-white/10 hover:border-[var(--primary)]/50 transition-colors group">
                    <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://picsum.photos/seed/vip1/400/600" alt="VIP" />
                  </div>
                  <div className="p-6 bg-[#201f1f] rounded-lg border border-white/5">
                    <p className="font-headline font-black text-2xl uppercase tracking-tighter neon-text-tertiary">VIP LOUNGE</p>
                    <p className="font-label text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em]">Exclusive Access Only</p>
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden border border-white/10 hover:border-[var(--secondary)]/50 transition-colors group">
                    <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://picsum.photos/seed/vip2/400/600" alt="VIP" />
                  </div>
                  <div className="p-6 bg-[#201f1f] rounded-lg border border-white/5">
                    <p className="font-headline font-black text-2xl uppercase tracking-tighter neon-text-secondary">MAIN FLOOR</p>
                    <p className="font-label text-[10px] text-[var(--tertiary)] uppercase tracking-[0.2em]">Starting at $2,500</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Standard Header (Cover) */}
        {restaurant.theme !== 'night' && restaurant.theme !== 'alchemist' && (
          <div className="relative h-64 md:h-80">
            <img 
              src={restaurant.cover} 
              alt={restaurant.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-black/20" />
          </div>
        )}
      </div>

      <div className={`max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row gap-8 
        ${restaurant.theme === 'alchemist' ? 'mt-0' : '-mt-12'}
      `}>
        <div className="flex-1">
          {restaurant.theme !== 'alchemist' && (
            <div className="flex items-end gap-6 mb-8">
              <div className="relative group">
                <div className={`absolute inset-0 blur-xl transition-all duration-500 ${restaurant.theme === 'night' ? 'bg-[var(--primary)]/30 group-hover:bg-[var(--primary)]/50' : ''}`} />
                <img 
                  src={restaurant.logo} 
                  alt={restaurant.name} 
                  className={`relative w-28 h-28 rounded-2xl object-cover border-4 transition-all
                    ${restaurant.theme === 'night' ? 'border-[#1a1919] shadow-2xl' : 'border-[var(--bg-base)] shadow-xl'}
                  `}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mb-2">
                <h1 className={`text-4xl font-black uppercase tracking-tighter leading-none mb-2
                  ${restaurant.theme === 'night' ? 'font-headline neon-text-primary' : restaurant.theme === 'restaurant' ? 'font-serif' : ''}
                `}>
                  {restaurant.name}
                </h1>
                <p className="text-[var(--text-muted)] text-sm font-medium uppercase tracking-widest">{restaurant.description}</p>
              </div>
            </div>
          )}

          {/* Info Pills */}
          {restaurant.theme !== 'alchemist' && (
            <div className="flex gap-3 overflow-x-auto no-scrollbar mb-12">
              <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all
                ${restaurant.theme === 'night' ? 'bg-white/5 border-white/10 text-white' : 'bg-[var(--card-bg)] border-slate-100 text-[var(--text-base)]'}
              `}>
                <MapPin size={14} className="text-[var(--primary)]" />
                {restaurant.contact.address}
              </div>
              <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all
                ${restaurant.theme === 'night' ? 'bg-white/5 border-white/10 text-white' : 'bg-[var(--card-bg)] border-slate-100 text-[var(--text-base)]'}
              `}>
                <Phone size={14} className="text-[var(--primary)]" />
                {restaurant.contact.phone}
              </div>
              {restaurant.contact.socials.instagram && (
                <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all
                  ${restaurant.theme === 'night' ? 'bg-white/5 border-white/10 text-white' : 'bg-[var(--card-bg)] border-slate-100 text-[var(--text-base)]'}
                `}>
                  <Instagram size={14} className="text-[var(--primary)]" />
                  Instagram
                </div>
              )}
            </div>
          )}

          {/* Categories Tabs */}
          <div className={`sticky top-20 z-40 -mx-4 px-4 py-8 mb-8 border-b border-white/5 transition-all
            ${restaurant.theme === 'night' ? 'bg-[#0e0e0e]/95 backdrop-blur-2xl' : 
              restaurant.theme === 'alchemist' ? 'bg-[#131313]/95 backdrop-blur-2xl border-[#504532]/15' : 
              'bg-[var(--bg-base)]/90 backdrop-blur-xl'}
          `}>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {restaurant.categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`px-8 py-3 rounded-md text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap
                    ${activeCategory === cat.id 
                      ? 'bg-[var(--primary)] text-black glow-primary' 
                      : 'bg-white/5 text-[var(--text-muted)] hover:bg-white/10 border border-white/5'}
                  `}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-12">
            {restaurant.categories.map(cat => {
              if (restaurant.theme === 'alchemist' && cat.name === 'Aged Spirits') {
                return (
                  <section key={cat.id} id={cat.id} className="scroll-mt-24 mb-20">
                    <div className="flex items-baseline justify-between mb-10 border-b border-[#504532]/15 pb-4">
                      <h3 className="text-3xl font-headline font-bold text-[var(--text-base)]">Aged <span className="text-[var(--primary-container)]">Spirits</span></h3>
                      <span className="text-[var(--text-muted)] font-label text-sm uppercase tracking-tighter">The Vault Selection</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
                      {/* Featured Spirit (Macallan M) */}
                      <div className="md:col-span-2 md:row-span-2 bg-[#201f1f] p-8 rounded-xl relative overflow-hidden flex flex-col justify-end border border-[#504532]/20 shadow-2xl">
                        <div className="absolute top-0 right-0 p-6">
                          <span className="bg-[#f6deff]/10 text-[#f6deff] border border-[#f6deff]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Rare Reserve</span>
                        </div>
                        <img 
                          alt="Rare Whiskey" 
                          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity" 
                          src={cat.items[0]?.image}
                          referrerPolicy="no-referrer"
                        />
                        <div className="relative z-10">
                          <h4 className="text-4xl font-headline font-extrabold text-[var(--primary)] mb-2">{cat.items[0]?.name}</h4>
                          <p className="text-[var(--text-muted)] text-sm mb-6 max-w-sm">{cat.items[0]?.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">{cat.items[0]?.abv} ABV / 2oz Pour</span>
                              <span className="text-2xl font-bold text-[var(--primary)]">${cat.items[0]?.price.toFixed(2)}</span>
                            </div>
                            <button 
                              onClick={() => cat.items[0] && addToCart(cat.items[0])}
                              className="bg-[var(--primary-container)] text-[var(--on-primary)] p-4 rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-lg"
                            >
                              <Plus size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Spirit 2 (Clase Azul) */}
                      <div className="md:col-span-2 bg-[#2a2a2a] p-6 rounded-xl flex gap-6 items-center border border-[#504532]/10">
                        <div className="w-24 h-24 bg-[#131313] rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            alt={cat.items[1]?.name} 
                            className="w-full h-full object-cover grayscale" 
                            src={cat.items[1]?.image}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h5 className="font-headline font-bold text-[var(--primary)]">{cat.items[1]?.name}</h5>
                            <span className="text-[var(--primary)] font-bold">${cat.items[1]?.price}</span>
                          </div>
                          <p className="text-xs text-[var(--text-muted)] mt-2">{cat.items[1]?.description}</p>
                          <div className="mt-3 h-0.5 w-full bg-[#504532]/20">
                            <div className="h-full bg-[#fbbc00] w-3/4"></div>
                          </div>
                          <button 
                            onClick={() => cat.items[1] && addToCart(cat.items[1])}
                            className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] hover:underline"
                          >
                            Add to Order
                          </button>
                        </div>
                      </div>
                      {/* Spirit 3 & 4 */}
                      {cat.items.slice(2, 4).map(item => (
                        <div key={item.id} className="md:col-span-1 bg-[#1c1b1b] p-6 rounded-xl flex flex-col justify-between border border-[#504532]/10">
                          <div>
                            <h5 className="font-headline font-bold text-[var(--text-base)]">{item.name}</h5>
                            <p className="text-[10px] text-[var(--text-muted)] mt-1">{item.description}</p>
                          </div>
                          <div className="mt-4 flex justify-between items-end">
                            <div className="flex flex-col">
                              <span className="text-[var(--primary)] font-bold">${item.price}</span>
                              <span className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-widest">{item.abv} ABV</span>
                            </div>
                            <button 
                              onClick={() => addToCart(item)}
                              className="w-8 h-8 bg-white/5 rounded-md flex items-center justify-center text-[var(--primary)] hover:bg-white/10"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              if (restaurant.theme === 'alchemist' && cat.name === 'Light Bites') {
                return (
                  <section key={cat.id} id={cat.id} className="scroll-mt-24 mb-20">
                    <div className="flex items-baseline justify-between mb-10 border-b border-[#504532]/15 pb-4">
                      <h3 className="text-3xl font-headline font-bold text-[var(--text-base)]">Light <span className="text-[var(--primary-container)]">Bites</span></h3>
                      <span className="text-[var(--text-muted)] font-label text-sm uppercase tracking-tighter">Pairing Essentials</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {cat.items.map(item => (
                        <div key={item.id} className="flex gap-6 items-center group">
                          <img 
                            alt={item.name} 
                            className="w-24 h-24 rounded-full object-cover ring-2 ring-[#504532] ring-offset-4 ring-offset-[#131313] group-hover:scale-105 transition-transform" 
                            src={item.image}
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="text-lg font-headline font-bold text-[var(--text-base)]">{item.name}</h4>
                              <span className="text-[var(--primary)] font-bold">${item.price}</span>
                            </div>
                            <p className="text-sm text-[var(--text-muted)] mb-3">{item.description}</p>
                            <button 
                              onClick={() => addToCart(item)}
                              className="text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] hover:underline"
                            >
                              Add to Order
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              return (
                <section key={cat.id} id={cat.id} className="scroll-mt-24">
                  <h2 className={`text-2xl font-bold mb-6 
                    ${restaurant.theme === 'restaurant' ? 'font-serif' : 
                      restaurant.theme === 'alchemist' ? 'font-headline border-b border-[#504532]/15 pb-4' : ''}
                  `}>
                    {restaurant.theme === 'alchemist' ? (
                      <span className="flex items-center gap-3">
                        <span className="text-[var(--primary-container)]">{cat.name.split(' ')[0]}</span> {cat.name.split(' ').slice(1).join(' ')}
                      </span>
                    ) : cat.name}
                  </h2>
                  <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-2 
                    ${restaurant.theme === 'alchemist' ? 'lg:grid-cols-3' : ''}
                  `}>
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
              );
            })}
          </div>
        </div>

        {/* Desktop Sidebar Cart */}
        <aside className="hidden lg:block w-96 sticky top-24 h-fit">
          <div className={`rounded-3xl p-8 shadow-[var(--card-shadow)] border border-white/5
            ${restaurant.theme === 'night' ? 'bg-[#1a1919]' : 
              restaurant.theme === 'alchemist' ? 'bg-[#1c1b1b]' : 'bg-[var(--card-bg)]'}
          `}>
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2 uppercase tracking-widest">
              <ShoppingBag size={20} className="text-[var(--primary)]" />
              Order Summary
            </h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag size={24} className="text-white/20" />
                </div>
                <p className="text-[var(--text-muted)] text-sm uppercase tracking-widest">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto no-scrollbar">
                  {cart.map(item => {
                    const addonsPrice = item.selectedAddons?.reduce((sum, a) => sum + a.price, 0) || 0;
                    return (
                      <div key={item.cartId} className="flex items-center justify-between group">
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate uppercase tracking-tight">{item.name}</p>
                          {item.selectedAddons && item.selectedAddons.length > 0 && (
                            <p className="text-[10px] text-[var(--text-muted)] truncate uppercase tracking-widest">
                              + {item.selectedAddons.map(a => a.name).join(', ')}
                            </p>
                          )}
                          <p className="text-xs text-[var(--text-muted)] font-medium">${((item.promoPrice || item.price) + addonsPrice).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <button onClick={() => updateQuantity(item.cartId, -1)} className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center text-[var(--text-muted)] hover:bg-white/10 transition-all">
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartId, 1)} className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center text-[var(--text-muted)] hover:bg-white/10 transition-all">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="border-t border-white/5 pt-6 mb-8 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[var(--text-muted)] uppercase tracking-widest">Subtotal</span>
                    <span className="font-bold">${cart.reduce((acc, i) => {
                      const addonsPrice = i.selectedAddons?.reduce((sum, a) => sum + a.price, 0) || 0;
                      return acc + ((i.promoPrice || i.price) + addonsPrice) * i.quantity;
                    }, 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-black text-xl uppercase tracking-widest">Total</span>
                    <span className={`font-black text-3xl 
                      ${restaurant.theme === 'night' ? 'text-[var(--tertiary)] neon-text-tertiary' : 
                        restaurant.theme === 'alchemist' ? 'text-[#f6deff]' : ''}
                    `}>
                      ${cart.reduce((acc, i) => {
                        const addonsPrice = i.selectedAddons?.reduce((sum, a) => sum + a.price, 0) || 0;
                        return acc + ((i.promoPrice || i.price) + addonsPrice) * i.quantity;
                      }, 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className={`w-full h-16 rounded-md font-headline font-black uppercase tracking-[0.2em] transition-all active:scale-95
                    ${restaurant.theme === 'night' ? 'bg-[var(--primary)] text-black glow-primary' : 
                      restaurant.theme === 'alchemist' ? 'bg-[var(--primary)] text-black' : 'bg-[var(--primary)] text-white'}
                  `}
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

      {/* Alchemist Bottom Nav */}
      {restaurant.theme === 'alchemist' && (
        <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-safe bg-[#1c1b1b]/80 backdrop-blur-lg rounded-t-xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50">
          <div className="flex flex-col items-center justify-center text-[#d4c5ab]/60 hover:text-[#fbbc00] transition-all active:translate-y-0.5 duration-200 cursor-pointer">
            <span className="material-symbols-outlined text-2xl">nightlife</span>
            <span className="font-body text-[10px] uppercase tracking-widest font-medium mt-1">Lounge</span>
          </div>
          <div className="flex flex-col items-center justify-center text-[#ffe2ab] bg-[#2a2a2a] rounded-xl px-4 py-1.5 active:translate-y-0.5 duration-200 cursor-pointer">
            <span className="material-symbols-outlined text-2xl">local_bar</span>
            <span className="font-body text-[10px] uppercase tracking-widest font-medium mt-1">Library</span>
          </div>
          <div className="flex flex-col items-center justify-center text-[#d4c5ab]/60 hover:text-[#fbbc00] transition-all active:translate-y-0.5 duration-200 cursor-pointer">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            <span className="font-body text-[10px] uppercase tracking-widest font-medium mt-1">Reserve</span>
          </div>
          <div className="flex flex-col items-center justify-center text-[#d4c5ab]/60 hover:text-[#fbbc00] transition-all active:translate-y-0.5 duration-200 cursor-pointer">
            <span className="material-symbols-outlined text-2xl">menu_book</span>
            <span className="font-body text-[10px] uppercase tracking-widest font-medium mt-1">Cellar</span>
          </div>
        </nav>
      )}
    </div>
  );
}
