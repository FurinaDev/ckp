import React, { useState } from 'react';
import { Opportunity } from '../data/mockData';

interface FeedDuyurularProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onOpenNewPost: () => void;
}

export const FeedDuyurular: React.FC<FeedDuyurularProps> = ({
  opportunities,
  onSelectOpportunity,
  onOpenNewPost,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});
  const [calendarSyncActive, setCalendarSyncActive] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 2400);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedMap(prev => {
      const nextState = !prev[id];
      showToast(nextState ? 'Duyuru yer imlerine eklendi' : 'Duyuru yer imlerinden çıkarıldı');
      return { ...prev, [id]: nextState };
    });
  };

  const categories = [
    { id: 'all', label: 'Tümü', count: 32 },
    { id: 'event', label: 'Etkinlik & Sergi', count: 14 },
    { id: 'grant', label: 'Hibe & Fon', count: 8 },
    { id: 'workshop', label: 'Atölye & Seminer', count: 6 },
    { id: 'call', label: 'Açık Çağrı', count: 4 },
  ];

  const filteredItems = opportunities.filter(item => {
    if (activeCategory === 'event' && item.category !== 'stage') return false;
    if (activeCategory === 'grant' && item.category !== 'grant') return false;
    if (activeCategory === 'call' && item.category !== 'call') return false;
    if (activeCategory === 'workshop' && !item.tags.some(t => t.toLowerCase().includes('atölye') || t.toLowerCase().includes('seminer'))) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.institution.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-28 space-y-3.5 max-w-md mx-auto relative">
      {/* Search & Digest Quick Banner */}
      <section className="px-4 pt-2">
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3.5 text-outline text-[19px] pointer-events-none">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-10 bg-white text-on-surface placeholder:text-outline text-xs rounded-xl border border-surface-container-high shadow-xs focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            placeholder="Duyuru, fon veya kurum ara..."
            type="text"
          />
          <button
            onClick={() => {
              setCalendarSyncActive(!calendarSyncActive);
              showToast(calendarSyncActive ? 'Ajanda görünümü kapatıldı' : 'Kültür takvimi senkronize ediliyor...');
            }}
            aria-label="Takvim Görünümü"
            className={`absolute right-2.5 w-7 h-7 flex items-center justify-center rounded-lg transition-all active:scale-95 ${
              calendarSyncActive ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">calendar_month</span>
          </button>
        </div>
      </section>

      {/* Category Horizontal Tabs with Badge Counters */}
      <section className="pl-4">
        <div className="w-full overflow-x-auto no-scrollbar pr-4 flex items-center gap-1.5 py-0.5">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  showToast(`${cat.label} filtrelendi`);
                }}
                className={`shrink-0 h-8 px-3 rounded-full text-xs font-semibold transition-all active:scale-95 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-surface-container-highest text-on-surface-variant'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Filter Pills & Quick Context Sub-row */}
      <section className="px-4 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container text-primary text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Aktif Çağrılar
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface-variant text-[11px] font-medium">
            <span className="material-symbols-outlined text-[13px]">schedule</span>
            Son Başvuruya Göre
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface-variant text-[11px] font-medium">
            <span className="material-symbols-outlined text-[13px]">location_on</span>
            İstanbul
          </span>
        </div>
        <button
          onClick={() => {
            setActiveCategory('all');
            setSearchQuery('');
            showToast('Filtreler sıfırlandı');
          }}
          className="shrink-0 text-secondary text-[11px] font-bold hover:underline"
        >
          Sıfırla
        </button>
      </section>

      {/* Editorial Curatorial Hero Strip (Featured Call) */}
      <section className="px-4">
        <div className="relative overflow-hidden rounded-2xl bg-primary-container text-white p-4 shadow-sm border border-primary/20">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpd4UT022j5PHoT0z3EQi83v2pgKkelxJ_U_8ViPiV0QnklBESReB7Lk3Yor5b36u9oF_ap3dhJS0UVnhl45azTlzfahDypm18JHGf37EhR0HQvqXdCjHCqLEV8MCoXAStlWVAd2_Z6Zv9JU-riKMs7hB4I-VFCa2ktizMuB5sK0JjDSdgaiqBuHRK5aui9vijLNTPKNGn2g_GUZ3xKn-b5Cy7XarEj3kLevi-j2uCH34Z_TZuNVH9iQ')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-transparent"></div>

          <div className="relative z-10 flex items-center justify-between mb-2">
            <span className="px-2 py-0.5 rounded-full bg-secondary text-white text-[9px] font-bold uppercase tracking-wider">
              Haftalık Öne Çıkan Çağrı
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-secondary-fixed">
              <span className="material-symbols-outlined text-[13px]">timer</span> Son 4 Gün
            </span>
          </div>

          <div className="relative z-10 my-2">
            <h3 className="font-newsreader text-[19px] leading-snug text-white font-semibold">
              2025–2026 Bağımsız Sanatçı Üretim & Sergi Destek Fonu
            </h3>
            <p className="text-[11px] text-on-primary-container mt-1 font-normal">
              İKSV & Kültür Girişimi Ortaklığı
            </p>
          </div>

          <div className="relative z-10 pt-2 flex items-center justify-between border-t border-white/10">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[10px] text-on-primary-container uppercase font-semibold">Destek Tutarı:</span>
              <span className="text-base font-bold text-secondary-container">90.000 ₺</span>
            </div>
            <button
              onClick={() => onSelectOpportunity(opportunities[0])}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-primary text-xs font-bold active:bg-surface-container transition-all shadow-xs"
            >
              <span>Başvur & İncele</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Micro-Banner: Ajanda Uyarısı */}
      <section className="px-4">
        <div className="rounded-xl bg-orange-50 border border-orange-100 p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[17px]">notifications_active</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-on-secondary-fixed leading-tight">
              Ajanda Uyarısı: 3 çağrının son günü bu hafta!
            </p>
            <p className="text-[11px] text-on-secondary-fixed-variant truncate mt-0.5">
              Takviminize ekleyip başvuru takibinizi kaçırmayın.
            </p>
          </div>
          <button
            onClick={() => showToast('Çağrılar takviminize eklendi')}
            className="shrink-0 px-2.5 py-1 rounded-lg bg-secondary text-white text-[11px] font-bold active:opacity-90"
          >
            Ekle
          </button>
        </div>
      </section>

      {/* Announcements Stream */}
      <section className="px-4 flex flex-col gap-3">
        {filteredItems.map(item => {
          const isSaved = bookmarkedMap[item.id];

          return (
            <article
              key={item.id}
              onClick={() => onSelectOpportunity(item)}
              className="bg-white rounded-xl p-3.5 shadow-xs border border-surface-container-high relative overflow-hidden transition-all active:scale-[0.99] cursor-pointer group"
            >
              {/* Left Accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>

              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface text-[10px] font-bold">
                    {item.category === 'grant' ? 'Hibe & Destek' : item.category === 'stage' ? 'Sahne & Dinleti' : 'Açık Çağrı'}
                  </span>
                  {item.daysRemaining > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[10px] font-bold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">alarm</span>
                      Son {item.daysRemaining} Gün
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => toggleBookmark(item.id, e)}
                  aria-label="Kaydet"
                  className="text-outline hover:text-secondary p-1 rounded-full transition-transform active:scale-90"
                >
                  <span
                    className={`material-symbols-outlined text-[19px] ${isSaved ? 'text-secondary' : ''}`}
                    style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {isSaved ? 'bookmark' : 'bookmark_border'}
                  </span>
                </button>
              </div>

              <div className="flex gap-3">
                <div className="w-18 h-18 shrink-0 rounded-lg overflow-hidden bg-surface-container border border-surface-container-high">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={item.imageUrl}
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <h3 className="font-bold text-[13px] text-primary leading-snug line-clamp-2 group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-on-surface-variant truncate mt-0.5">
                    {item.institution}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-secondary text-xs font-bold">
                    <span className="material-symbols-outlined text-[15px]">payments</span>
                    <span>{item.budgetOrFee}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-3 pt-2.5 flex items-center justify-between border-t border-surface-container">
                <div className="flex items-center gap-1 text-outline text-[11px]">
                  <span className="material-symbols-outlined text-[14px]">event_available</span>
                  <span>{item.deadlineText}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectOpportunity(item);
                  }}
                  className="h-7 px-3.5 rounded-lg bg-primary text-white text-[11px] font-bold hover:bg-primary-container transition-all flex items-center gap-1 active:scale-95 shadow-xs"
                >
                  <span>İncele</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* Editorial Calendar Teaser Strip */}
      <section className="px-4">
        <div className="p-3.5 rounded-xl bg-primary text-white shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-secondary-fixed text-[20px]">calendar_today</span>
            </div>
            <div>
              <h4 className="font-bold text-xs text-white">Duyuru Takvimi</h4>
              <p className="text-[11px] text-on-primary-container">Tüm son başvuruları ajandana senkronize et</p>
            </div>
          </div>
          <button
            onClick={() => showToast('Takvim senkronizasyon ayarları açıldı')}
            aria-label="Takvime Git"
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-30 max-w-md mx-auto">
        <button
          onClick={onOpenNewPost}
          aria-label="Çağrı Paylaş"
          className="h-11 px-4 rounded-full bg-secondary text-white font-bold text-xs shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-1.5 border border-white/20"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Çağrı Paylaş</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-primary text-white px-4 py-2 rounded-full shadow-lg text-xs font-semibold flex items-center gap-1.5 transition-all animate-bounce">
          <span className="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
