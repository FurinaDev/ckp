import React, { useState } from 'react';

interface ModalProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContractChat: () => void;
}

export const ModalProfile: React.FC<ModalProfileProps> = ({
  isOpen,
  onClose,
  onOpenContractChat,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'contracts' | 'portfolio'>('profile');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-3">
      <div className="w-full max-w-sm bg-white rounded-2xl p-4 flex flex-col gap-3 shadow-2xl border border-surface-container-high animate-in fade-in duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
            Sanatçı Profili
          </span>
          <button
            onClick={onClose}
            aria-label="Kapat"
            className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-primary"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Profile Identity Card */}
        <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-xl border border-surface-container">
          <div className="relative shrink-0">
            <img
              alt="Selin Ela Karaca"
              className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-xs"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPfQWP6oCDQ90Uk9sJi8ejqxEqYBVDeWxtsn9uxlLF9a2h2ClYAcSaGYL-lFPuS6NxVC6Db8Y5cRpxg3k_auq21-PcM9P42tkJC1ULDG6I8V1_Sq--6Ns_ayVKh4DeqvX_iC0YHL0-eWYO6IjNxrengq3A4pY-4OUlGmrJnScwHCPUNEQoLUDSoxZ5sPR4M9iOHYNLxJjOOiMdtVtNqIkloYfc0tPA1iN-B_GoySrWADIFNdxv6s62QA"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-primary truncate">Selin Ela Karaca</h3>
              <span className="material-symbols-outlined text-secondary text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </div>
            <p className="text-xs text-on-surface-variant font-medium">Viyolonselist & Oda Müziği İcracısı</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-primary text-white">İKSV Onaylı</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-secondary-fixed text-on-secondary-fixed">Güvenli Kaşe</span>
            </div>
          </div>
        </div>

        {/* Segment Tabs */}
        <div className="grid grid-cols-3 p-1 rounded-xl bg-surface-container gap-1 text-center">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-1 px-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'profile' ? 'bg-white text-primary shadow-xs' : 'text-on-surface-variant'
            }`}
          >
            Özet
          </button>
          <button
            onClick={() => setActiveTab('contracts')}
            className={`py-1 px-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'contracts' ? 'bg-white text-primary shadow-xs' : 'text-on-surface-variant'
            }`}
          >
            Sözleşmeler (2)
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`py-1 px-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'portfolio' ? 'bg-white text-primary shadow-xs' : 'text-on-surface-variant'
            }`}
          >
            Demolar
          </button>
        </div>

        {/* Tab 1: Profile Summary */}
        {activeTab === 'profile' && (
          <div className="space-y-2.5 text-xs text-on-surface">
            <div className="p-2.5 rounded-xl bg-surface-container-low flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase text-outline">Biyografi & Eğitim</span>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                MSGSÜ Devlet Konservatuvarı Viyolonsel ana sanat dalı mezunu. Barok ve modern neo-klasik füzyon üzerine ulusal ve uluslararası oda orkestralarında solo icra.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-surface-container-low">
                <span className="block text-xs font-bold text-primary">8 Yıl</span>
                <span className="text-[9px] text-outline">Sahne Deneyimi</span>
              </div>
              <div className="p-2 rounded-lg bg-surface-container-low">
                <span className="block text-xs font-bold text-primary">24 Resital</span>
                <span className="text-[9px] text-outline">Doğrulanmış</span>
              </div>
              <div className="p-2 rounded-lg bg-surface-container-low">
                <span className="block text-xs font-bold text-secondary">4.9 ★</span>
                <span className="text-[9px] text-outline">Kurum Puanı</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase text-outline">Enstrüman & Ekipman</span>
              <span className="text-[11px] text-on-surface-variant">
                1982 El yapımı usta işi çello, DPA 4099 enstrüman mikrofonu & kablosuz verici sistemi.
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Contracts */}
        {activeTab === 'contracts' && (
          <div className="space-y-2">
            <div
              onClick={() => {
                onClose();
                onOpenContractChat();
              }}
              className="p-2.5 rounded-xl border border-secondary/40 bg-white hover:bg-orange-50/40 transition-colors cursor-pointer flex flex-col gap-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary">The Marmara Pera Sanat</span>
                <span className="px-1.5 py-0.2 rounded bg-orange-100 text-orange-800 text-[9px] font-bold">
                  Havuz Beklemede
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant">2 Oturum Akustik Çello Dinletisi • 13.000 ₺</p>
              <span className="text-[10px] text-secondary font-bold flex items-center gap-0.5 mt-0.5">
                <span>Sözleşmeyi Aç</span>
                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl border border-surface-container bg-surface-container-low flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary">Süreyya Operası Bahar Resitali</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                  Tamamlandı ✓
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant">Oda Müziği Solist İcrası • Kaşe ödendi</p>
            </div>
          </div>
        )}

        {/* Tab 3: Audio Portfolio */}
        {activeTab === 'portfolio' && (
          <div className="space-y-2">
            <div className="p-2 rounded-xl bg-surface-container-low flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-secondary text-[18px]">graphic_eq</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-primary truncate">Akustik Çello Demo (Bach)</span>
                  <span className="text-[10px] text-outline">03:42 • Yüksek Kalite WAV</span>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenContractChat();
                }}
                className="px-2.5 py-1 rounded-lg bg-primary text-white text-[11px] font-bold active:scale-95"
              >
                Dinle
              </button>
            </div>

            <div className="p-2 rounded-xl bg-surface-container-low flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-secondary text-[18px]">graphic_eq</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-primary truncate">Modern Neo-Klasik Doğaçlama</span>
                  <span className="text-[10px] text-outline">04:15 • Canlı Prova</span>
                </div>
              </div>
              <button
                onClick={() => alert('Demo oynatılıyor...')}
                className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface text-[11px] font-semibold hover:bg-surface-container-high"
              >
                Dinle
              </button>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full h-9 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high transition-colors mt-1"
        >
          Kapat
        </button>
      </div>
    </div>
  );
};
