import React, { useState } from 'react';
import { Opportunity } from '../data/mockData';

interface FeedIlanlarProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onOpenNewPost: () => void;
  onStartChatWithCurator: () => void;
}

export const FeedIlanlar: React.FC<FeedIlanlarProps> = ({
  opportunities,
  onSelectOpportunity,
  onOpenNewPost,
  onStartChatWithCurator,
}) => {
  const [activeSegment, setActiveSegment] = useState<'all' | 'seeking' | 'services' | 'grants'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterTags, setActiveFilterTags] = useState<string[]>(['Müzik', 'Aktif']);
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const removeTag = (tag: string) => {
    setActiveFilterTags(prev => prev.filter(t => t !== tag));
  };

  const addTag = (tag: string) => {
    if (!activeFilterTags.includes(tag)) {
      setActiveFilterTags(prev => [...prev, tag]);
    }
  };

  const filteredOpps = opportunities.filter(opp => {
    if (activeSegment === 'seeking' && opp.category !== 'stage') return false;
    if (activeSegment === 'services' && opp.category !== 'service') return false;
    if (activeSegment === 'grants' && opp.category !== 'grant' && opp.category !== 'residency') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return opp.title.toLowerCase().includes(q) || opp.institution.toLowerCase().includes(q) || opp.discipline.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-28 space-y-3.5 max-w-md mx-auto">
      {/* 1. Search & Filter Header */}
      <section className="px-4 pt-2 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[19px] pointer-events-none">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 bg-white text-on-surface placeholder:text-outline text-xs rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary shadow-xs transition-all"
              placeholder="Sanatçı, ilan, burs veya kurum ara..."
              type="text"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
          <button
            onClick={() => addTag('Doğrulanmış')}
            aria-label="Filtreleme Seçenekleri"
            className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-white border border-surface-container-high text-primary shadow-xs active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-[19px]">tune</span>
          </button>
        </div>

        {/* 2. Segmented Navigation Tabs */}
        <div className="p-1 bg-surface-container rounded-xl flex items-center gap-1 shadow-inner overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSegment('all')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold whitespace-nowrap text-center transition-all ${
              activeSegment === 'all'
                ? 'bg-white text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Tümü (43)
          </button>
          <button
            onClick={() => setActiveSegment('seeking')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold whitespace-nowrap text-center transition-all ${
              activeSegment === 'seeking'
                ? 'bg-white text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Sanatçı Arayan
          </button>
          <button
            onClick={() => setActiveSegment('grants')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold whitespace-nowrap text-center transition-all ${
              activeSegment === 'grants'
                ? 'bg-white text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Burs & Fonlar
          </button>
          <button
            onClick={() => setActiveSegment('services')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold whitespace-nowrap text-center transition-all ${
              activeSegment === 'services'
                ? 'bg-white text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Hizmet Veren
          </button>
        </div>

        {/* 3. Active Filter Chips Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {activeFilterTags.map(tag => (
            <button
              key={tag}
              onClick={() => removeTag(tag)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-container text-white text-[11px] font-semibold whitespace-nowrap shadow-xs active:scale-95 transition-all"
            >
              <span>{tag}</span>
              <span className="material-symbols-outlined text-[13px]">close</span>
            </button>
          ))}
          <button
            onClick={() => addTag('İstanbul')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-medium whitespace-nowrap hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            <span>İstanbul</span>
          </button>
          <button
            onClick={() => addTag('Son Günler ⏳')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-medium whitespace-nowrap hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            <span>Son Günler</span>
          </button>
        </div>
      </section>

      {/* 4. Profile Match Notification Banner */}
      <section className="px-4">
        <div className="bg-gradient-to-r from-primary to-[#1e2746] text-white rounded-xl p-3 shadow-xs relative overflow-hidden flex items-center justify-between border border-primary/20">
          <div className="flex items-center gap-2.5 z-10 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/10 text-secondary-container">
              <span className="material-symbols-outlined text-[19px]">auto_awesome</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white flex items-center gap-1 truncate">
                <span>Profil Eşleşmesi</span>
                <span className="text-[9px] bg-secondary px-1.5 py-0.2 rounded font-bold uppercase tracking-wider text-white">YENİ</span>
              </p>
              <p className="text-[11px] text-surface-container-low font-normal truncate">
                Disiplininize uygun <strong className="text-secondary-fixed underline">12 yeni ilan</strong> bulundu.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveSegment('grants')}
            className="shrink-0 ml-2 px-2.5 py-1 bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold rounded-lg border border-white/20 transition-all flex items-center gap-0.5 active:scale-95"
          >
            <span>Göz At</span>
            <span className="material-symbols-outlined text-[13px]">chevron_right</span>
          </button>
        </div>
      </section>

      {/* 5. Listing Stream Header */}
      <div className="px-4 flex items-center justify-between">
        <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
          {filteredOpps.length} Güncel İlan Listelendi
        </p>
        <div className="flex items-center gap-0.5 text-primary text-[11px] font-semibold cursor-pointer">
          <span>Akıllı Sıralama</span>
          <span className="material-symbols-outlined text-[15px]">expand_more</span>
        </div>
      </div>

      {/* 6. Listings Stream */}
      <section className="px-4 flex flex-col gap-3">
        {/* Curated Opportunities from Data */}
        {filteredOpps.map(opp => {
          const isSaved = bookmarkedIds[opp.id];

          return (
            <article
              key={opp.id}
              onClick={() => onSelectOpportunity(opp)}
              className="relative flex flex-col rounded-xl bg-white shadow-xs hover:shadow-sm border border-surface-container-high transition-all overflow-hidden cursor-pointer group"
            >
              {/* Left Accent Spine for Grants */}
              {opp.category === 'grant' && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
              )}

              {/* Optional Hero thumbnail if it's stage or residency */}
              {opp.category === 'stage' && (
                <div className="relative w-full h-32 bg-surface-container overflow-hidden">
                  <img
                    alt={opp.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    src={opp.imageUrl}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-primary font-bold text-[10px] shadow-xs">
                      Düzenli Sahne
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-white">
                    <span className="material-symbols-outlined text-[15px] text-secondary-container">hotel</span>
                    <span className="text-xs font-semibold drop-shadow">{opp.institution}</span>
                    <span className="material-symbols-outlined text-[13px] text-sky-400" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                </div>
              )}

              <div className={`p-3.5 flex flex-col gap-2 ${opp.category === 'grant' ? 'pl-4' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-[10px] uppercase tracking-wide">
                      {opp.category === 'grant' ? 'Burs & Hibe' : opp.category === 'stage' ? 'Sahne & Dinleti' : opp.category === 'call' ? 'Açık Çağrı' : 'Rezidans'}
                    </span>
                    {opp.daysRemaining > 0 && (
                      <span className="text-[11px] font-semibold text-secondary flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px]">timer</span>
                        Son {opp.daysRemaining} Gün
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => toggleBookmark(opp.id, e)}
                    aria-label="Kaydet"
                    className="text-outline hover:text-secondary p-1 rounded-full transition-colors"
                    type="button"
                  >
                    <span
                      className={`material-symbols-outlined text-[19px] ${isSaved ? 'text-secondary' : ''}`}
                      style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {isSaved ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>

                <div>
                  <h3 className="font-bold text-[14px] text-primary leading-snug group-hover:text-secondary transition-colors">
                    {opp.title}
                  </h3>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-0.5 flex items-center gap-1">
                    <span>{opp.institution}</span>
                    <span className="text-outline-variant">•</span>
                    <span className="text-outline font-normal">{opp.location}</span>
                  </p>
                  <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
                    {opp.description}
                  </p>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap items-center gap-1 pt-0.5">
                  {opp.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Action Strip */}
                <div className="pt-2 mt-1 border-t border-surface-container flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-outline font-medium">Öngörülen Destek / Kaşe</span>
                    <span className="text-sm font-bold text-primary">
                      {opp.budgetOrFee} <span className="text-[11px] font-normal text-outline">{opp.budgetType || ''}</span>
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectOpportunity(opp);
                    }}
                    className="h-8 px-3.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all active:scale-95 shadow-xs flex items-center gap-1"
                  >
                    <span>{opp.category === 'stage' ? 'Detay & Teklif' : 'Başvur'}</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {/* Feature Curator Card (Mehmet E. Can) with Chat Link */}
        <article className="flex flex-col rounded-xl bg-white border border-surface-container-high shadow-xs p-3.5 gap-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="relative w-11 h-11 flex-shrink-0">
                <img
                  className="w-11 h-11 rounded-full object-cover ring-1 ring-surface-container-high"
                  alt="Mehmet E. Can"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwr6MhCDiF7bNPhF0uKv5AT92bP1lW_tY9uPHG_DRn1_8GahuE9LzZ7RyTO1Jad5ThVd29gpsyeAJY4_xgyKnpl1yV9IZgm9iYo3PED6FFlNghBM3RVf9hzAURUTZDZFZoVsOHsdayzClTnEmv2DaJljtd_v-0vz683NR1hx6NtZojhrchOKg559lXu3Np4Ja1BuZFFoaupRXB2V_8Z0jfbfAg3GBKQMceY9AXEtcXKABkFt-nVGe1kw"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[13px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-sm text-primary truncate">Mehmet E. Can</span>
                </div>
                <span className="text-[11px] text-on-surface-variant">Küratör & Sanat Yazarı</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Proje Bazlı
            </span>
          </div>

          <div>
            <h4 className="text-xs font-bold text-on-surface">Kıdemli Sergi Küratörü & Sergi Metni Yazarı</h4>
            <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-0.5 leading-relaxed">
              12 yıllık çağdaş sanat alanı deneyimi, 18 ulusal ve uluslararası müstakil sergi tasarımı. Bienal katalogları ve danışmanlık.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-lg bg-surface-container-low text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-on-surface font-semibold">
              <span className="material-symbols-outlined text-secondary text-[15px]">history_edu</span>
              <span>12 Yıl Deneyim</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-on-surface font-semibold">
              <span className="material-symbols-outlined text-secondary text-[15px]">gallery_thumbnail</span>
              <span>18 Sergi Portfolyosu</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-outline">Son İnceleme: 2 gün önce</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={onStartChatWithCurator}
                className="h-8 px-3 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all active:scale-95 shadow-xs flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">chat</span>
                <span>İletişime Geç</span>
              </button>
            </div>
          </div>
        </article>

        {/* Community Verification Banner */}
        <div className="p-3.5 rounded-xl bg-surface-container-high flex items-center justify-between gap-3 shadow-xs">
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-xs text-primary">Sanatçı Profilini Doğrulat</span>
            <span className="text-[11px] text-on-surface-variant leading-snug">
              Özel fonlara, sahne çağrılarına ve kurumsal kotalara öncelikli erişim sağla.
            </span>
          </div>
          <button
            onClick={() => alert('Sanatçı profili doğrulama başvurusu alındı. İKSV & Konservatuvar kayıt kontrolü başlatıldı.')}
            className="flex-shrink-0 h-8 px-3 rounded-lg bg-white text-primary text-xs font-bold shadow-xs hover:bg-surface-bright transition-colors"
          >
            Başlat
          </button>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-30 max-w-md mx-auto">
        <button
          onClick={onOpenNewPost}
          aria-label="Yeni İlan Ver"
          className="h-11 px-4 rounded-full bg-secondary text-white font-bold text-xs shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-1.5 border border-white/20"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Yeni İlan Ver</span>
        </button>
      </div>
    </div>
  );
};
