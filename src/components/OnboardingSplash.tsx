import React from 'react';

interface OnboardingSplashProps {
  onEnter: () => void;
}

export const OnboardingSplash: React.FC<OnboardingSplashProps> = ({ onEnter }) => {
  return (
    <div className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between p-6 select-none max-w-md mx-auto overflow-hidden">
      {/* Background with moody exhibition / acoustic hall image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-screen scale-105"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC4QfgTe8WgLqth5_TML-rmD12RuzTdvlFqGR4qCdZ23JB5OctK2J_5uGdvLJcm_qRmpEg3Zly1J16mcK06mdVBOEMShlFzVagJYIwYy6fFXI0yGbAznzNBU1qk2w6AEjZiDA5-Kz8wUrv5AcAC4syK28j1J_m6SmGnuKE8q1gg1gnTHCpqYZAe0sdo2To5aC_oYgfHOXG06bRRbzuSqTftTKnGoypmLWbJ7BKgMOn3-msqSc85KCJkvw')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>

      {/* Top Header Bar */}
      <header className="relative z-10 pt-safe flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="text-[11px] font-bold tracking-wider uppercase text-white/90">AĞ AKTİF • 2025</span>
        </div>

        <div className="flex items-center rounded-full bg-black/60 border border-white/10 p-0.5 text-[11px] font-bold text-white/70">
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white">TR</span>
          <span className="px-2.5 py-0.5 text-white/50">EN</span>
        </div>
      </header>

      {/* Center Hero Card */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-8">
        <div className="mb-4">
          <span className="px-4 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold uppercase tracking-widest text-amber-200 backdrop-blur-md">
            KÜLTÜR
          </span>
        </div>

        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 mb-2">
          ÇAĞDAŞ KÜLTÜR PLATFORMU
        </span>

        <h1 className="font-newsreader text-[32px] sm:text-[36px] leading-[1.15] font-normal tracking-tight text-white mb-3">
          Kültür, Sanat ve Sahnenin <br />
          <span className="italic font-normal text-amber-200">Bağımsız</span> Buluşması
        </h1>

        <p className="text-xs sm:text-sm text-white/75 font-normal max-w-xs leading-relaxed mb-6">
          Disiplinlerarası yaratıcılar, bağımsız sahneler ve şeffaf kültürel üretim için ortak zemin.
        </p>

        {/* Feature Pills */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 text-[10.5px] text-white/80 backdrop-blur-md">
          <span>Sahne & Müzik</span>
          <span className="text-white/40">•</span>
          <span>Görsel Sanatlar</span>
          <span className="text-white/40">•</span>
          <span>Fon & Güvence</span>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <footer className="relative z-10 pb-safe flex flex-col gap-2.5 w-full">
        <button
          onClick={onEnter}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
        >
          <span>Keşfe Başla</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        <button
          onClick={onEnter}
          className="w-full h-12 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 backdrop-blur-md active:scale-[0.98] transition-all"
        >
          Giriş Yap
        </button>
      </footer>
    </div>
  );
};
