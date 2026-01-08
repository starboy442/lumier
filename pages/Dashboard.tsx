
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, Heart, Settings, LogOut, User, MapPin, CreditCard, ShoppingBag, Trash2 } from 'lucide-react';
import { MOCK_ORDERS, MOCK_USER } from '../constants';
import { Product } from '../types';

export default function Dashboard({ onLogout, wishlist = [], toggleWishlist, addToCart }: { onLogout: () => void, wishlist: Product[], toggleWishlist: any, addToCart: any }) {
  const [activeTab, setActiveTab] = useState('orders');
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-40 pb-20 bg-white animate-in fade-in duration-1000">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-12">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full overflow-hidden grayscale">
                <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight">{MOCK_USER.name}</h2>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">Member since {MOCK_USER.memberSince}</p>
              </div>
            </div>

            <nav className="flex flex-col space-y-1">
              {[
                { id: 'orders', label: 'Recent Artifacts', icon: Package },
                { id: 'wishlist', label: 'Curated List', icon: Heart, badge: wishlist.length > 0 ? wishlist.length : null },
                { id: 'profile', label: 'User Identity', icon: User },
                { id: 'settings', label: 'Preferences', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-between px-6 py-4 transition-all border-l-2 ${
                    activeTab === tab.id ? 'bg-[#F8F7F4] border-[#D4AF37] text-black' : 'border-transparent text-gray-400 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <tab.icon className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className="text-[9px] font-black text-[#D4AF37]">{tab.badge}</span>
                  )}
                </button>
              ))}
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-4 px-6 py-4 text-[10px] font-black uppercase tracking-[0.4em] text-red-400 hover:text-red-600 hover:bg-red-50 transition-all border-l-2 border-transparent mt-12"
              >
                <LogOut className="w-4 h-4" />
                <span>Terminate Session</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {activeTab === 'orders' && (
              <div className="space-y-12">
                <div className="flex items-end justify-between border-b border-black/5 pb-8">
                  <h3 className="text-4xl font-black italic serif tracking-tighter">Your Orders.</h3>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">{MOCK_ORDERS.length} Artifacts Tracked</span>
                </div>

                <div className="space-y-8">
                  {MOCK_ORDERS.map((order) => (
                    <div key={order.id} className="group bg-[#F8F7F4] p-10 flex flex-col md:flex-row items-center justify-between gap-10 hover:shadow-xl transition-all">
                      <div className="flex items-center space-x-8">
                        <div className="w-24 h-32 flex-shrink-0 bg-white overflow-hidden shadow-sm">
                          <img src={order.items[0].image} alt={order.items[0].name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">{order.status}</p>
                          <h4 className="text-xl font-bold tracking-tight">{order.items[0].name}</h4>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{order.id} • {order.date}</p>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-4">
                        <p className="text-2xl font-black italic serif">${order.total}</p>
                        <button className="text-[9px] font-black uppercase tracking-[0.4em] border-b border-black pb-1 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">Protocol Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-12">
                <div className="border-b border-black/5 pb-8">
                  <h3 className="text-4xl font-black italic serif tracking-tighter">Identity.</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="p-10 border border-black/5 space-y-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <MapPin className="w-5 h-5 text-[#D4AF37]" />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">Primary Domicile</h4>
                    </div>
                    <p className="text-lg font-bold leading-relaxed">
                      Julian Vane<br />
                      Rue du Faubourg Saint-Honoré<br />
                      Paris, 75008<br />
                      France
                    </p>
                    <button className="text-[9px] font-black uppercase tracking-[0.4em] border-b border-black pb-1">Edit Logistics</button>
                  </div>

                  <div className="p-10 border border-black/5 space-y-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">Settlement Methods</h4>
                    </div>
                    <p className="text-lg font-bold">VISA • Ending in 8812</p>
                    <p className="text-[10px] text-gray-400">Expires 04/2027</p>
                    <button className="text-[9px] font-black uppercase tracking-[0.4em] border-b border-black pb-1">Update Ledger</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-12">
                <div className="flex items-end justify-between border-b border-black/5 pb-8">
                  <h3 className="text-4xl font-black italic serif tracking-tighter">Curated List.</h3>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">{wishlist.length} Artifacts Bookmarked</span>
                </div>

                {wishlist.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-40 text-center space-y-6">
                    <Heart className="w-12 h-12 text-gray-100" />
                    <h3 className="text-xl font-bold uppercase tracking-widest text-gray-300">Your curation is currently empty</h3>
                    <button onClick={() => navigate('/products')} className="text-[10px] font-black uppercase tracking-[0.4em] border-b-2 border-black pb-2">Start Exploring</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {wishlist.map((item) => (
                      <div key={item.id} className="group relative bg-[#F8F7F4] p-8 flex flex-col space-y-6 hover:shadow-xl transition-all border border-black/5">
                        <button 
                          onClick={() => toggleWishlist(item)}
                          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-red-500 hover:bg-white transition-all z-10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <Link to={`/product/${item.id}`} className="block aspect-[4/5] bg-white overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        </Link>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">{item.category}</p>
                              <h4 className="text-lg font-bold tracking-tight">{item.name}</h4>
                            </div>
                            <p className="text-xl font-black italic serif">${item.price}</p>
                          </div>
                          
                          <button 
                            onClick={() => addToCart(item, item.colors[0])}
                            className="w-full py-4 bg-black text-white text-[9px] font-black uppercase tracking-[0.4em] flex items-center justify-center space-x-3 hover:bg-[#D4AF37] transition-all"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Acquire Artifact</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {(activeTab === 'settings') && (
              <div className="space-y-12">
                 <div className="border-b border-black/5 pb-8">
                    <h3 className="text-4xl font-black italic serif tracking-tighter">Preferences.</h3>
                 </div>
                 <div className="max-w-xl space-y-10">
                    <div className="flex items-center justify-between py-6 border-b border-black/5">
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold">New Release Protocals</h4>
                            <p className="text-[10px] text-gray-400">Receive alerts for artisanal drops</p>
                        </div>
                        <div className="w-12 h-6 bg-black rounded-full relative p-1">
                            <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-6 border-b border-black/5">
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold">Monthly Journal</h4>
                            <p className="text-[10px] text-gray-400">Our curated narrative delivered to your email</p>
                        </div>
                        <div className="w-12 h-6 bg-black rounded-full relative p-1">
                            <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                        </div>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
