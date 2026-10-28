import React, { useState } from 'react';
import { Opportunity, UPCOMING_EVENTS } from '../data/mockData';

interface FeedKesifProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onOpenNewPost: () => void;
  onNavigateTab: (tabKey: any) => void;
}

export const FeedKesif: React.FC<FeedKesifProps> = ({
  opportunities,
  onSelectOpportunity,
  onOpenNewPost,
  onNavigateTab,
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rsvpdEvents, setRsvpdEvents] = useState<Record<string, boolean>>({});
  const [bookmarkedEvents, setBookmarkedEvents] = useState<Record<string, boolean>>({});

  const disciplines = [
    { id: 'all', label: 'Tümü' },
    { id: 'music', label: 'Müzik & Sahne' },
    { id: 'visual', label: 'Görsel Sanatlar' },
    { id: 'grant', label: 'Burs & Hibe' },
    { id: 'residency', label: 'Rezidans & Atölye' },
    { id: 'literature', label: 'Edebiyat & Yayın' },
  ];

  const handleToggleRsvp = (eventId: string) => {
    setRsvpdEvents(prev => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  const handleToggleBookmark = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedEvents(prev => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  // Filtered opportunities
  const filteredOpps = opportunities.filter(opp => {
    if (selectedDiscipline === 'music' && !opp.discipline.includes('Müzik') && opp.category !== 'stage') return false;
    if (selectedDiscipline === 'visual' && !opp.discipline.includes('Görsel') && !opp.discipline.includes('Heykel')) return false;
    if (selectedDiscipline === 'grant' && opp.category !== 'grant') return false;
    if (selectedDiscipline === 'residency' && opp.category !== 'residency') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return opp.title.toLowerCase().includes(q) || opp.institution.toLowerCase().includes(q) || opp.discipline.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-28 space-y-4 max-w-md mx-auto">
      {/* 1. Compact Search Bar */}
      <section className="px-4 pt-2">
        <div className="relative flex items-center w-full h-10 rounded-xl bg-surface-container-low border border-surface-container-highest px-3 text-on-surface-variant focus-within:border-primary focus-within:ring-1 focus-within:ring-primary focus-within:bg-white transition-all shadow-xs">
          <span className="material-symbols-outlined text-[19px] text-outline mr-2 pointer-events-none">search</span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-0 p-0 text-xs font-normal text-on-surface placeholder:text-outline focus:outline-none focus:ring-0"
            placeholder="Açık çağrı, burs veya sergi ara..."
            type="text"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="text-outline hover:text-on-surface p-1"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          ) : (
            <span className="text-[10px] bg-surface-container-highest px-1.5 py-0.5 rounded text-on-surface-variant font-medium tracking-wide">
              ⌘K
            </span>
          )}
        </div>
      </section>

      {/* 2. Discipline Filter Pills */}
      <section className="pl-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pr-4 py-0.5">
          {disciplines.map(d => {
            const isActive = selectedDiscipline === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDiscipline(d.id)}
                className={`shrink-0 h-8 px-3.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>}
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Editorial Welcome Hero */}
      <section className="px-4">
        <div className="relative overflow-hidden bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-low rounded-2xl p-4 shadow-xs border border-surface-container-high/60">
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-gradient-to-br from-secondary/15 via-primary/5 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-0.5 rounded-full shadow-2xs text-[10px] font-bold text-on-surface uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                Küratöryel Günlük
              </span>
              <span className="text-[10px] text-outline font-medium">Baskı No. 47</span>
            </div>

            <h1 className="font-newsreader text-[21px] leading-tight text-primary font-medium tracking-tight">
              Kültür, Sanat ve Müziğin Bağımsız Buluşma Noktası
            </h1>

            <p className="text-xs text-on-surface-variant font-normal leading-relaxed">
              Sanatçılar, icracılar, araştırmacılar ve kültür meraklıları için açık çağrılar, şeffaf kaşeli sahneler ve fonlar.
            </p>

            <div className="pt-2 flex items-center justify-between border-t border-surface-container-high/60">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-outline">Platform hamisi:</span>
                <span className="text-[11px] font-bold text-secondary">cagdasmuzik.com</span>
              </div>
              <button
                onClick={() => onNavigateTab('duyurular')}
                className="h-7 px-3 rounded-lg bg-primary text-white text-[11px] font-bold hover:bg-primary-container transition-all flex items-center gap-1 active:scale-95 shadow-xs"
              >
                <span>Ajandayı Aç</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 2x2 Platform Micro-Metrics Grid */}
      <section className="px-4">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onNavigateTab('duyurular')}
            className="bg-white p-3 rounded-xl border border-surface-container-high shadow-xs hover:border-secondary/40 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-7 h-7 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[17px]">campaign</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-secondary-fixed text-secondary">
                24 İlan
              </span>
            </div>
            <p className="text-xs font-bold text-primary group-hover:text-secondary transition-colors">Açık Çağrılar</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5 font-normal">Yarışma & Atölye</p>
          </button>

          <button
            onClick={() => onNavigateTab('ilanlar')}
            className="bg-white p-3 rounded-xl border border-surface-container-high shadow-xs hover:border-primary/40 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[17px]">school</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-surface-container-highest text-primary">
                8 Aktif
              </span>
            </div>
            <p className="text-xs font-bold text-primary group-hover:text-secondary transition-colors">Sanatçı Bursları</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5 font-normal">Üretim & Hibe Fonu</p>
          </button>

          <button
            onClick={() => onNavigateTab('topluluk')}
            className="bg-white p-3 rounded-xl border border-surface-container-high shadow-xs hover:border-primary/40 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-7 h-7 rounded-lg bg-surface-container-highest text-on-surface flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[17px]">hub</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                18 Hub
              </span>
            </div>
            <p className="text-xs font-bold text-primary group-hover:text-secondary transition-colors">Topluluklar</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5 font-normal">İnisiyatif Ağları</p>
          </button>

          <button
            onClick={() => onNavigateTab('duyurular')}
            className="bg-white p-3 rounded-xl border border-surface-container-high shadow-xs hover:border-secondary/40 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-7 h-7 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[17px]">calendar_today</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-secondary-fixed text-secondary">
                12 Etkinlik
              </span>
            </div>
            <p className="text-xs font-bold text-primary group-hover:text-secondary transition-colors">Kültür Ajandası</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5 font-normal">Bu Hafta Şehirde</p>
          </button>
        </div>
      </section>

      {/* 5. 'Web Pazarı' cagdasmuzik.com Redirect Card */}
      <section className="px-4">
        <a
          href="https://cagdasmuzik.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative overflow-hidden bg-white rounded-xl p-3.5 border border-surface-container-high shadow-xs hover:border-secondary/40 transition-all active:scale-[0.99]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[22px]">storefront</span>
              </div>
              <div className="flex flex-col min-w-0 pr-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-secondary text-white uppercase tracking-wider">
                    Web Pazarı
                  </span>
                  <span className="text-[11px] font-semibold text-secondary">cagdasmuzik.com</span>
                </div>
                <h3 className="text-xs font-bold text-primary truncate leading-snug">
                  Enstrüman & Ekipman Pazarı
                </h3>
                <p className="text-[11px] text-on-surface-variant mt-0.5 line-clamp-1 font-normal">
                  Akustik piyanolar, yaylılar, stüdyo donanımları ve sahne ekipmanları.
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
              <span className="material-symbols-outlined text-[16px]">north_east</span>
            </div>
          </div>
        </a>
      </section>

      {/* 6. Öne Çıkan Çağrılar & Burslar (Horizontal Carousel) */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <h2 className="text-xs font-bold text-primary uppercase tracking-wider">Öne Çıkan Çağrılar & Burslar</h2>
          </div>
          <button
            onClick={() => onNavigateTab('ilanlar')}
            className="text-[11px] font-bold text-secondary hover:underline flex items-center gap-0.5"
          >
            <span>Tümü</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
          {filteredOpps.map((opp) => (
            <article
              key={opp.id}
              onClick={() => onSelectOpportunity(opp)}
              className="min-w-[270px] max-w-[270px] bg-white rounded-xl p-3.5 border border-surface-container-high flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold text-[10px] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">timer</span>
                    {opp.daysRemaining > 0 ? `Son ${opp.daysRemaining} Gün` : 'Aktif'}
                  </span>
                  <span className="text-[11px] font-bold text-primary">{opp.budgetOrFee}</span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-primary leading-snug line-clamp-2 group-hover:text-secondary transition-colors">
                    {opp.title}
                  </h3>
                  <p className="text-[11px] text-on-surface-variant mt-1 truncate">{opp.institution}</p>
                </div>
              </div>

              <div className="pt-3 mt-2 border-t border-surface-container-high flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-on-surface-variant truncate pr-2">
                  <span className="material-symbols-outlined text-[13px] text-outline">location_on</span>
                  <span className="truncate">{opp.location}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectOpportunity(opp);
                  }}
                  className="h-7 px-3 rounded-lg bg-primary text-white text-[11px] font-bold hover:bg-primary-container transition-colors shrink-0 active:scale-95"
                >
                  İncele
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Güncel Etkinlikler & Sahne (Editorial Event Feed) */}
      <section className="px-4 flex flex-col gap-2.5 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[18px]">event_note</span>
            <h2 className="text-xs font-bold text-primary uppercase tracking-wider">Güncel Etkinlikler & Sahne</h2>
          </div>
          <span className="text-[10px] font-semibold text-outline">Bu Hafta</span>
        </div>

        {UPCOMING_EVENTS.map((event) => {
          const isRsvpd = rsvpdEvents[event.id];
          const isSaved = bookmarkedEvents[event.id];

          return (
            <article
              key={event.id}
              className="bg-white rounded-xl overflow-hidden border border-surface-container-high shadow-xs flex flex-col"
            >
              <div className="relative w-full h-36 bg-surface-container overflow-hidden">
                <img alt={event.title} className="w-full h-full object-cover" src={event.imageUrl} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>

                <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md rounded-lg p-1.5 text-center min-w-10 shadow-xs">
                  <span className="block font-bold text-[14px] text-primary leading-none">{event.day}</span>
                  <span className="block text-[8px] font-bold text-on-surface-variant uppercase tracking-wider mt-0.5">
                    {event.month}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-primary font-bold text-[10px]">
                    {event.discipline}
                  </span>
                  <button
                    onClick={(e) => handleToggleBookmark(event.id, e)}
                    aria-label="Kaydet"
                    className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors"
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${isSaved ? 'text-secondary' : ''}`}
                      style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {isSaved ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>

                <div className="absolute bottom-2 left-3 right-3 text-white text-[11px] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary-container">schedule</span>
                  <span>{event.time}</span>
                  <span className="text-white/60">•</span>
                  <span>{event.price}</span>
                </div>
              </div>

              <div className="p-3 flex flex-col space-y-2">
                <h3 className="font-newsreader text-[16px] leading-tight text-primary font-semibold">
                  {event.title}
                </h3>
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {event.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-surface-container/60">
                  <span className="text-[11px] text-on-surface-variant truncate pr-2">
                    {event.venue}
                  </span>
                  <button
                    onClick={() => handleToggleRsvp(event.id)}
                    className={`h-8 px-3.5 rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center gap-1 shrink-0 ${
                      isRsvpd
                        ? 'bg-emerald-600 text-white'
                        : 'bg-primary text-white hover:bg-primary-container'
                    }`}
                  >
                    <span>{isRsvpd ? 'Kaydedildi ✓' : 'Kayıt Ol'}</span>
                    {!isRsvpd && <span className="material-symbols-outlined text-[14px]">arrow_forward</span>}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-30 max-w-md mx-auto">
        <button
          onClick={onOpenNewPost}
          aria-label="Yeni İlan veya Çağrı Paylaş"
          className="h-11 px-4 rounded-full bg-secondary text-white font-bold text-xs shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-1.5 border border-white/20"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Duyuru / İlan Ver</span>
        </button>
      </div>
    </div>
  );
};
