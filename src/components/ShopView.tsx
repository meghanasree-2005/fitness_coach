import React, { useState } from "react";
import { Search, Heart, ShoppingCart, Star, Plus, Minus, Trash2, Check, Percent, ArrowRight, ShieldCheck, TrendingUp, Sparkles, AlertCircle } from "lucide-react";
import { shopProducts } from "../data";
import { ShopProduct } from "../types";

interface ShopViewProps {
  cart: { product: ShopProduct; quantity: number }[];
  wishlist: string[];
  onAddToCart: (p: ShopProduct) => void;
  onRemoveFromCart: (id: string) => void;
  onUpdateCartQty: (id: string, qty: number) => void;
  onToggleWishlist: (id: string) => void;
  onClearCart: () => void;
}

export default function ShopView({
  cart,
  wishlist,
  onAddToCart,
  onRemoveFromCart,
  onUpdateCartQty,
  onToggleWishlist,
  onClearCart
}: ShopViewProps) {
  // Category tabs
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Tracking simulation
  const [couponCode, setCouponCode] = useState("");
  const [activeDiscount, setActiveDiscount] = useState(0); // e.g. 0.3 for 30% off
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "Alex Rivera",
    email: "busalameghana@gmail.com",
    address: "742 Evergreen Terrace",
    city: "Springfield",
    zip: "97477"
  });

  // Track simulated items
  const [trackOrderNo, setTrackOrderNo] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<boolean>(false);

  const categories = ["All", "Accessories", "Hardware", "Beverages", "Wearables"];

  const filteredProducts = shopProducts.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cost calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmt = parseFloat((cartSubtotal * activeDiscount).toFixed(2));
  const shippingFees = cartSubtotal > 50 ? 0 : 5.99;
  const cartTotal = parseFloat((cartSubtotal - discountAmt + shippingFees).toFixed(2));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "FITNESS30") {
      setActiveDiscount(0.3);
      alert("Coupon 'FITNESS30' applied! 30% discount activated on all physical accessories.");
    } else {
      alert("Invalid Code. Try typing 'FITNESS30' to save 30%!");
    }
  };

  const handleConfirmCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutModal(false);
      setOrderComplete(false);
      setTrackOrderNo("FC-" + Math.floor(100000 + Math.random() * 900000));
      alert("Order placed successfully! Check your tracking code below.");
    }, 1500);
  };

  return (
    <div id="shop_view_root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-secondary-navy to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary-green/10 rounded-full blur-2xl -mr-20 -mt-20" />
        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="text-xs font-black tracking-widest text-primary-green uppercase">E-Commerce Marketplace</span>
            <h1 className="text-3xl font-extrabold font-display leading-none">Fitness Coach Equipment Hub</h1>
            <p className="text-gray-300 text-sm max-w-xl">
              Equip your living room or synchronize with premium sports supplements. Enter coupon <strong className="text-primary-green-light">&apos;FITNESS30&apos;</strong> to unlock 30% savings.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <Percent className="w-8 h-8 text-primary-green mx-auto mb-1 animate-pulse" />
              <p className="text-xs font-semibold">Activewear Sale Live</p>
              <p className="text-[10px] text-gray-400">Free shipping on orders over ₹4000</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* SHOP CATALOG - 8 Columns */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Category tabs */}
            <div className="flex bg-gray-105 dark:bg-slate-900 rounded-xl p-1 border inline-flex overflow-x-auto self-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`btn_shop_cat_${cat}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-secondary-navy dark:bg-primary-green text-white dark:text-dark-bg font-extrabold shadow"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search inputs */}
            <div className="relative shrink-0 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                id="input_search_shop"
                type="text"
                placeholder="Search fitness products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
              />
            </div>
          </div>

          {/* Grid list of Products */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => {
              const inWishlist = wishlist.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-150 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square bg-slate-50 border-b dark:border-slate-800">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      
                      {/* Wishlist Heart */}
                      <button
                        id={`btn_wish_toggle_${prod.id}`}
                        onClick={() => onToggleWishlist(prod.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${
                          inWishlist 
                            ? "bg-rose-50 text-rose-500 hover:bg-rose-100" 
                            : "bg-white text-gray-400 hover:text-rose-500"
                        }`}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>

                      <span className="absolute bottom-3 left-3 bg-secondary-navy text-white text-[9px] uppercase font-bold px-2 px-1 rounded">
                        {prod.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-1 text-xs text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold">{prod.rating}</span>
                        <span className="text-[10px] text-gray-400">({prod.reviewsCount} reviews)</span>
                      </div>

                      <h3 className="font-extrabold text-sm text-gray-900 dark:text-white line-clamp-1">
                        {prod.name}
                      </h3>
                      
                      <p className="text-gray-500 dark:text-gray-350 text-[11px] leading-relaxed line-clamp-2">
                        {prod.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-850">
                    <span className="text-base font-black text-gray-900 dark:text-white">
                      ₹{prod.price}
                    </span>
                    <button
                      id={`btn_catalog_add_cart_${prod.id}`}
                      onClick={() => onAddToCart(prod)}
                      className="px-3 py-1.5 bg-gradient-to-r from-primary-green to-primary-green-light text-secondary-navy font-bold text-xs rounded-lg hover:opacity-90 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-secondary-navy" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SIMULATED INBOUND TRACKER */}
          <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-secondary-navy dark:text-white font-display">
              📦 Live Order & Tracker Diagnostic
            </h3>
            <p className="text-xs text-gray-500">
              Input a created Order Number (e.g., <strong className="font-mono text-primary-green">FC-548120</strong>) to coordinate ship dates.
            </p>

            <div className="flex gap-2">
              <input
                id="input_order_track"
                type="text"
                placeholder="Enter order ID (FC-******)..."
                value={trackOrderNo}
                onChange={(e) => setTrackOrderNo(e.target.value)}
                className="flex-1 text-xs bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-3.5 focus:outline-none"
              />
              <button
                id="btn_track_run"
                onClick={() => {
                  if (trackOrderNo.trim()) {
                    setSearchedOrder(true);
                  } else {
                    alert("Please enter a simulated order ID to track.");
                  }
                }}
                className="px-4 py-2.5 bg-secondary-navy dark:bg-primary-green text-white dark:text-dark-bg font-extrabold text-xs rounded-lg cursor-pointer"
              >
                Query Depot
              </button>
            </div>

            {searchedOrder && trackOrderNo && (
              <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border border-gray-200 dark:border-slate-750 text-xs text-slate-700 dark:text-gray-200 space-y-3 animate-fade-in">
                <div className="flex justify-between font-bold border-b pb-2">
                  <span>Simulated ID: {trackOrderNo}</span>
                  <span className="text-emerald-500 uppercase tracking-widest text-[9px] font-black">● Transit to Carrier</span>
                </div>
                <div className="space-y-1.5">
                  <p>• **Origin Airport:** SF Port-Arrive (June 11, 2026)</p>
                  <p>• **Carrier Service:** FedEx Smart-Post Cargo</p>
                  <p>• **Estimated Arrival:** Within 3-5 Commercial Business Days</p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* SHOP CART SIDEBAR PANEL - 4 Columns */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
          <h2 className="text-lg font-bold text-secondary-navy dark:text-white font-display flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary-green" />
              Checkout Cart
            </span>
            <span className="text-xs bg-primary-green/10 text-primary-green font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((s, c) => s + c.quantity, 0)} items
            </span>
          </h2>

          <div className="divide-y divide-gray-100 dark:divide-slate-800 min-h-[160px] max-h-[300px] overflow-y-auto pr-1">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.product.id} className="py-3 flex justify-between gap-3 items-center">
                  <div className="flex gap-2 items-center">
                    <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded object-cover border shrink-0 bg-white" />
                    <div className="space-y-0.5">
                      <p className="font-bold text-xs text-gray-900 dark:text-white line-clamp-1">{item.product.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold">₹{item.product.price} each</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-200 dark:border-slate-800 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-850">
                      <button
                        id={`btn_cart_minus_${item.product.id}`}
                        onClick={() => onUpdateCartQty(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-150 rounded"
                      >
                        <Minus className="w-2.5 h-2.5 text-gray-600 dark:text-gray-350" />
                      </button>
                      <span className="text-xs font-semibold px-2 text-gray-900 dark:text-white">{item.quantity}</span>
                      <button
                        id={`btn_cart_plus_${item.product.id}`}
                        onClick={() => onUpdateCartQty(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-150 rounded"
                      >
                        <Plus className="w-2.5 h-2.5 text-gray-600 dark:text-gray-350" />
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      id={`btn_cart_del_${item.product.id}`}
                      onClick={() => onRemoveFromCart(item.product.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-500 text-xs transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-gray-400 space-y-2">
                <ShoppingCart className="w-8 h-8 mx-auto opacity-50" />
                <p className="text-xs">Your shopping cart is currently empty.</p>
              </div>
            )}
          </div>

          {/* Coupon Entry */}
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              id="input_coupon_code"
              type="text"
              placeholder="Promo code (FITNESS30)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-slate-850 border border-gray-205 dark:border-slate-800 p-2 text-xs rounded-lg text-gray-950 dark:text-white focus:outline-none"
            />
            <button
              id="btn_coupon_apply"
              type="submit"
              className="px-3 bg-secondary-navy hover:bg-slate-850 dark:bg-primary-green dark:text-dark-bg text-white font-bold text-xs rounded-lg cursor-pointer"
            >
              Apply
            </button>
          </form>

          {/* Checkout Breakdown */}
          <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-slate-800 text-xs leading-loose">
            <div className="flex justify-between text-gray-500">
              <span>Cart Subtotal:</span>
              <span className="font-semibold text-gray-900 dark:text-white">₹{cartSubtotal.toFixed(2)}</span>
            </div>
            
            {activeDiscount > 0 && (
              <div className="flex justify-between text-emerald-500 font-bold">
                <span>Coupon Applied (30% Discount):</span>
                <span>-₹{discountAmt.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-500">
              <span>Shipping & Logistics:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {shippingFees === 0 ? "FREE" : `₹${shippingFees.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between text-base font-black text-secondary-navy dark:text-white pt-2 border-t mt-2">
              <span>Total Price:</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            id="btn_shop_go_checkout"
            onClick={() => {
              if (cart.length === 0) {
                alert("Your cart is empty. Add elements before checkout.");
                return;
              }
              setCheckoutModal(true);
            }}
            className="w-full py-3 bg-gradient-to-r from-primary-green to-primary-green-light text-secondary-navy font-black rounded-xl hover:opacity-95 text-center text-xs tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            Go to Checkout Form
            <ArrowRight className="w-4 h-4 text-secondary-navy" />
          </button>

          <p className="text-[10px] text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-success-emerald" />
            30-day client cash-back guarantee activated.
          </p>

        </div>

      </div>

      {/* CHECKOUT MODAL WINDOW */}
      {checkoutModal && (
        <div className="fixed inset-0 bg-slate-950/70 p-4 flex items-center justify-center z-[110] animate-fade-in text-left">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-750">
            
            <div className="flex justify-between border-b pb-3 dark:border-slate-800">
              <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white">🔒 SECURE CHECKOUT OUTBOX</h3>
              <button
                id="btn_close_checkout_modal"
                onClick={() => setCheckoutModal(false)}
                className="text-gray-400 hover:text-gray-950 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmCheckout} className="space-y-4">
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-450 uppercase">Recipient Full Name</label>
                <input
                  id="checkout_fullName"
                  type="text"
                  required
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-xl text-xs text-gray-950 dark:text-white focus:outline-none focus:ring-1"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-450 uppercase">Delivery Address</label>
                <input
                  id="checkout_address"
                  type="text"
                  required
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-800 border p-2.5 rounded-xl text-xs text-gray-950 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-450 uppercase mb-1">City</label>
                  <input
                    id="checkout_city"
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border p-2 rounded-xl text-xs text-gray-950 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-450 uppercase mb-1">ZIP Code</label>
                  <input
                    id="checkout_zip"
                    type="text"
                    required
                    value={shippingAddress.zip}
                    onChange={(e) => setShippingAddress({...shippingAddress, zip: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border p-2 rounded-xl text-xs text-gray-950 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Secure simulated Card details */}
              <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border space-y-3">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">💳 DEMO VISA PAYMENT PROCESS</p>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="4000 1234 5678 9010 (Demo Card)"
                    disabled
                    className="w-full bg-slate-105 dark:bg-slate-800 border border-transparent p-2 rounded-lg text-xs"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="MM/YY" disabled className="w-full bg-slate-105 border border-transparent dark:bg-slate-800 p-2 rounded-lg text-xs" />
                    <input type="password" placeholder="CVV" disabled className="w-full bg-slate-105 border border-transparent dark:bg-slate-800 p-2 rounded-lg text-xs" />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between items-center text-xs">
                <div>
                  <p className="text-gray-400">Total Charged Amount</p>
                  <p className="text-base font-black text-secondary-navy dark:text-white">₹{cartTotal.toFixed(2)}</p>
                </div>

                <button
                  id="btn_complete_checkout_trigger"
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-primary-green to-primary-green-light text-secondary-navy font-black text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Confirm simulated order
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
