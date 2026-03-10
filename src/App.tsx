import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame,
  Compass,
  Zap,
  Shield,
  Target,
  Users
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ImmunityChallenge from './components/ImmunityChallenge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'challenge'>('home');

  return (
    <div className="min-h-screen bg-[#2d1b15] text-amber-50 font-serif selection:bg-amber-700 selection:text-white relative overflow-hidden">
      {/* Wood Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,0,0,0.2) 40px, rgba(0,0,0,0.2) 80px),
                         repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(0,0,0,0.1) 100px, rgba(0,0,0,0.1) 200px)`
      }} />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#3e2723]/80 backdrop-blur-md border-b border-amber-900/20">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center text-white shadow-lg">
              <Compass size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-amber-50">Survivor Scout</span>
          </div>
          <div className="flex gap-8">
            {[
              { id: 'home', label: 'Home', icon: Flame },
              { id: 'challenge', label: 'Challenge', icon: Zap },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-all relative py-1",
                  activeTab === tab.id ? "text-amber-400" : "text-amber-50/40 hover:text-amber-50"
                )}
              >
                <tab.icon size={16} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              <section className="text-center space-y-12 max-w-3xl mx-auto py-12">
                <div className="space-y-4">
                  <h1 className="text-7xl font-bold leading-tight tracking-tighter uppercase text-amber-50">
                    The Ultimate <br />
                    <span className="text-amber-500">Immunity Challenge</span>
                  </h1>
                  <p className="text-xl text-amber-50/60 leading-relaxed max-w-xl mx-auto">
                    Outwit your rivals, outplay the competition, and outlast the other tribe to secure your safety.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button 
                    onClick={() => setActiveTab('challenge')}
                    className="group relative bg-[#3e2723] p-10 rounded-[40px] shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-amber-500 flex flex-col items-center gap-6"
                  >
                    <div className="w-16 h-16 bg-amber-700/20 rounded-3xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                      <Target size={32} />
                    </div>
                    <span className="text-2xl font-bold uppercase tracking-widest text-amber-50">Outwit</span>
                    <div className="absolute inset-0 rounded-[40px] bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <button 
                    onClick={() => setActiveTab('challenge')}
                    className="group relative bg-[#3e2723] p-10 rounded-[40px] shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-amber-500 flex flex-col items-center gap-6"
                  >
                    <div className="w-16 h-16 bg-amber-700/20 rounded-3xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                      <Zap size={32} />
                    </div>
                    <span className="text-2xl font-bold uppercase tracking-widest text-amber-50">Outplay</span>
                    <div className="absolute inset-0 rounded-[40px] bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <button 
                    onClick={() => setActiveTab('challenge')}
                    className="group relative bg-[#3e2723] p-10 rounded-[40px] shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-amber-500 flex flex-col items-center gap-6"
                  >
                    <div className="w-16 h-16 bg-amber-700/20 rounded-3xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                      <Shield size={32} />
                    </div>
                    <span className="text-2xl font-bold uppercase tracking-widest text-amber-50">Outlast</span>
                    <div className="absolute inset-0 rounded-[40px] bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-[#3e2723]/50 p-8 rounded-[32px] border border-amber-900/20 space-y-4">
                  <div className="flex items-center gap-3 text-amber-500">
                    <Users size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Tribe Warfare</h3>
                  </div>
                  <p className="text-amber-50/60 text-sm leading-relaxed">
                    Lead your tribe of 8 against the rivals. Stand over coconuts to pick them up and click to eliminate opponents.
                  </p>
                </div>
                <div className="bg-[#3e2723]/50 p-8 rounded-[32px] border border-amber-900/20 space-y-4">
                  <div className="flex items-center gap-3 text-amber-500">
                    <Shield size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm">Win Immunity</h3>
                  </div>
                  <p className="text-amber-50/60 text-sm leading-relaxed">
                    The last tribe with at least one member standing wins individual immunity and safety from tribal council.
                  </p>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'challenge' && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ImmunityChallenge />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
