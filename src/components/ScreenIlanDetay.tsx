import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Opportunity, JURY_MEMBERS } from '../data/mockData';

interface ScreenIlanDetayProps {
  opportunity: Opportunity;
  onBack: () => void;
  onStartChatWithCoordinator: () => void;
}

export const ScreenIlanDetay: React.FC<ScreenIlanDetayProps> = ({
  opportunity,
  onBack,
  onStartChatWithCoordinator,
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'requirements' | 'benefits' | 'jury'>('about');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isApplyingModal, setIsApplyingModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleApply = () => {
    setIsApplyingModal(false);
    setHasApplied(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ab3425', '#080c1e', '#fc6f5a', '#ffd700']
    });
    showToast('Portfolyo başvurunuz başarıyla jüriye iletildi!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: opportunity.title,
        text: `${opportunity.institution} - ${opportunity.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      showToast('İlan bağlantısı panoya kopyalandı');
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background max-w-md mx-auto pb-24 relative select-none">
      {/* 1. Compact App Bar Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-surface-container-high pt-safe shadow-xs">
        <div className="h-12 px-3 flex items-center justify-between gap-2 max-w-md mx-auto">
          <div className="flex items-center gap-1.5 min-w-0">
            <button
              onClick={onBack}
              aria-label="Geri"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface hover:bg-surface-container active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">chevron_left</span>
            </button>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <h1 className="font-bold text-[14px] text-primary truncate">İlan Detayı</h1>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => {
                setIsBookmarked(!isBookmarked);
                showToast(isBookmarked ? 'İlan yer imlerinden çıkarıldı' : 'İlan yer imlerinize kaydedildi');
              }}
              aria-label="Kaydet"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-secondary hover:bg-surface-container active:scale-90 transition-all"
            >
              <span
                className={`material-symbols-outlined text-[19px] ${isBookmarked ? 'text-secondary' : ''}`}
                style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
              >
                {isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>
            <button
              onClick={handleShare}
              aria-label="Paylaş"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container active:scale-90 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Cover Image */}
      <section className="relative w-full bg-surface-container-high overflow-hidden">
        <div
          className="relative w-full h-36 bg-cover bg-center"
          style={{ backgroundImage: `url('${opportunity.imageUrl}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-primary/20"></div>

          {/* Badges */}
          <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/90 text-white font-bold text-[10px] tracking-wide shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                Aktif Başvuru
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/85 text-primary font-bold text-[10px]">
                {opportunity.category === 'grant' ? 'Burs & Fon' : 'Açık Çağrı'}
              </span>
            </div>
            {opportunity.daysRemaining > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-[10px] flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[12px] text-secondary">hourglass_top</span>
                Son {opportunity.daysRemaining} Gün
              </span>
            )}
          </div>

          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/80">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-secondary-container">calendar_today</span>
              Bitiş: {opportunity.deadlineText}
            </span>
            <span className="text-white/70">Ref: BKS-2025/M04</span>
          </div>
        </div>

        {/* Institution Summary & Title */}
        <div className="px-3.5 pt-3 pb-3 bg-white border-b border-surface-container">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-primary-container p-0.5 shrink-0 shadow-2xs border border-surface-container-high">
              {opportunity.institutionLogo ? (
                <img alt={opportunity.institution} className="w-full h-full object-cover rounded-[5px]" src={opportunity.institutionLogo} />
              ) : (
                <div className="w-full h-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                  {opportunity.institution[0]}
                </div>
              )}
            </div>
            <div className="flex flex-col min-w-0 flex-1 leading-tight">
              <div className="flex items-center gap-1">
                <span className="font-bold text-xs text-primary truncate">{opportunity.institution}</span>
                {opportunity.institutionVerified && (
                  <span className="material-symbols-outlined text-secondary text-[14px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                )}
              </div>
              <span className="text-[11px] text-on-surface-variant truncate">
                Kurumsal Destekçi & Hamisi • {opportunity.location}
              </span>
            </div>
            <button
              onClick={() => showToast(`${opportunity.institution} kurumsal profili inceleniyor`)}
              className="px-2 py-1 rounded-md bg-surface-container text-on-surface-variant font-bold text-[10px] tracking-wider hover:bg-surface-container-high"
            >
              PROFİL
            </button>
          </div>

          <h2 className="font-bold text-base leading-snug tracking-tight text-primary">
            {opportunity.title}
          </h2>
        </div>
      </section>

      {/* 3. 2x2 Key Metric Grid */}
      <section className="p-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-white border border-surface-container-high shadow-2xs flex items-center justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Fon Tutarı</span>
              <span className="font-bold text-[15px] text-primary tracking-tight leading-tight mt-0.5">
                {opportunity.budgetOrFee}
              </span>
              <span className="text-[10.5px] text-secondary font-semibold truncate">
                {opportunity.budgetType || 'Destek'}
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">payments</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-surface-container-high shadow-2xs flex items-center justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Kontenjan</span>
              <span className="font-bold text-[15px] text-primary tracking-tight leading-tight mt-0.5">
                {opportunity.quota || '8 Sanatçı'}
              </span>
              <span className="text-[10.5px] text-on-surface-variant truncate">Jüri seçimi</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">group</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-surface-container-high shadow-2xs flex items-center justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Disiplin</span>
              <span className="font-bold text-xs text-primary tracking-tight leading-tight mt-0.5 truncate">
                {opportunity.discipline}
              </span>
              <span className="text-[10.5px] text-on-surface-variant truncate">Ses, kompozisyon</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">graphic_eq</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-surface-container-high shadow-2xs flex items-center justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Format / Alan</span>
              <span className="font-bold text-xs text-primary tracking-tight leading-tight mt-0.5 truncate">
                {opportunity.format || 'Hibrit / İstanbul'}
              </span>
              <span className="text-[10.5px] text-on-surface-variant truncate">Stüdyo + mentor</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">podium</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Match Score Bar */}
      <section className="px-3 pb-1">
        <div className="p-2.5 rounded-xl bg-white border border-surface-container-high shadow-2xs flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-secondary-fixed text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
              </span>
              <span className="font-bold text-[11px] text-primary">Profil Uygunluk Skoru:</span>
              <span className="text-xs font-bold text-secondary">%{opportunity.matchScore || 88} Eşleşme</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[11px]">check_circle</span>
              Kriterleriniz uyuşuyor
            </span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-secondary to-secondary-container h-full rounded-full transition-all duration-500"
              style={{ width: `${opportunity.matchScore || 88}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* 5. Sticky Tabs Navigation */}
      <section className="sticky top-12 z-30 bg-white/95 backdrop-blur-md px-3 py-2 border-y border-surface-container shadow-2xs">
        <div className="grid grid-cols-4 p-1 rounded-lg bg-surface-container gap-1">
          <button
            onClick={() => setActiveTab('about')}
            className={`py-1 px-1 rounded-md text-[11px] font-bold transition-all text-center truncate ${
              activeTab === 'about'
                ? 'bg-white text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Hakkında
          </button>
          <button
            onClick={() => setActiveTab('requirements')}
            className={`py-1 px-1 rounded-md text-[11px] font-bold transition-all text-center truncate ${
              activeTab === 'requirements'
                ? 'bg-white text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Şartlar (3)
          </button>
          <button
            onClick={() => setActiveTab('benefits')}
            className={`py-1 px-1 rounded-md text-[11px] font-bold transition-all text-center truncate ${
              activeTab === 'benefits'
                ? 'bg-white text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            İmkânlar
          </button>
          <button
            onClick={() => setActiveTab('jury')}
            className={`py-1 px-1 rounded-md text-[11px] font-bold transition-all text-center truncate ${
              activeTab === 'jury'
                ? 'bg-white text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Jüri & Kurul
          </button>
        </div>
      </section>

      {/* 6. Tab Contents */}
      <section className="px-3 pt-2">
        {activeTab === 'about' && (
          <div className="bg-white p-3.5 rounded-xl border border-surface-container-high shadow-2xs flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 rounded bg-secondary"></span>
              <h3 className="font-bold text-xs text-primary uppercase tracking-wide">Hakkında ve Amaç</h3>
            </div>
            <p className="text-xs leading-relaxed text-on-surface">
              {opportunity.description}
            </p>
            <p className="text-xs leading-relaxed text-on-surface-variant">
              {opportunity.aboutDetails || 'Seçilen sanatçılara bütçe desteği ile birlikte prova alanları ve sergi imkanları tanınır.'}
            </p>
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              {opportunity.tags.map(t => (
                <span key={t} className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-bold text-[10px]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="bg-white p-3.5 rounded-xl border border-surface-container-high shadow-2xs flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-surface-container">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 rounded bg-primary"></span>
                <h3 className="font-bold text-xs text-primary uppercase tracking-wide">Başvuru Koşulları</h3>
              </div>
              <span className="text-[10px] font-bold text-secondary bg-orange-50 px-2 py-0.5 rounded-full">
                3 Zorunlu Kriter
              </span>
            </div>
            <div className="space-y-2">
              {(opportunity.requirements || [
                'Konservatuvar, GSF veya en az 2 yıl aktif icra geçmişi.',
                'Son 18 ayda icra edilmiş 2 adet canlı performans videosu gizli linki.',
                'Sanatsal Niyet Mektubu (Maks. 600 kelime).'
              ]).map((req, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-surface-container-low flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-primary text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-on-surface leading-snug mt-0.5">{req}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="bg-white p-3.5 rounded-xl border border-surface-container-high shadow-2xs flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5 pb-1 border-b border-surface-container">
              <span className="w-1.5 h-3.5 rounded bg-secondary"></span>
              <h3 className="font-bold text-xs text-primary uppercase tracking-wide">Sağlanan Kurumsal İmkânlar</h3>
            </div>
            <div className="space-y-2">
              {(opportunity.benefits || [
                {
                  title: 'Borusan Müzik Evi Stüdyo Erişimi',
                  desc: 'Akustik prova stüdyolarında ayda 30 saate kadar ücretsiz kullanım.',
                  icon: 'podium'
                },
                {
                  title: 'Dijital Albüm & Basın Tanıtımı',
                  desc: 'cagdasmuzik.com ekosistemi ve kültür basınında görünürlük.',
                  icon: 'language'
                },
                {
                  title: 'Sene Sonu Galası Canlı Sahne',
                  desc: 'Dönem sonunda canlı gala konseri ve profesyonel kayıt hakkı.',
                  icon: 'theater_comedy'
                }
              ]).map((ben, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-surface-container-low flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-orange-100 text-secondary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[15px]">{ben.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-xs text-primary">{ben.title}</span>
                    <p className="text-[11px] text-on-surface-variant leading-snug mt-0.5">{ben.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'jury' && (
          <div className="bg-white p-3.5 rounded-xl border border-surface-container-high shadow-2xs flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-surface-container">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 rounded bg-primary"></span>
                <h3 className="font-bold text-xs text-primary uppercase tracking-wide">2025 Seçici Kurulu</h3>
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant">3 Uzman Jüri</span>
            </div>
            <div className="space-y-2">
              {JURY_MEMBERS.map((juror, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                  <div className="flex items-center gap-2 min-w-0">
                    <img alt={juror.name} className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-white" src={juror.avatar} />
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-xs text-primary truncate">{juror.name}</span>
                      <span className="text-[10px] text-on-surface-variant truncate">{juror.role}</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-outline uppercase px-1.5 py-0.5 rounded bg-white">
                    {juror.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 7. Coordinator & Contact Row */}
      {opportunity.coordinator && (
        <section className="p-3 pt-2">
          <div className="p-2.5 rounded-xl bg-white border border-surface-container-high shadow-2xs flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  alt={opportunity.coordinator.name}
                  className="w-10 h-10 rounded-full object-cover shadow-2xs ring-1 ring-surface-container-highest"
                  src={opportunity.coordinator.avatar}
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1 ring-white"></span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs text-primary truncate">{opportunity.coordinator.name}</span>
                  <span className="material-symbols-outlined text-[13px] text-secondary shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
                <span className="text-[10px] text-on-surface-variant truncate">{opportunity.coordinator.role}</span>
              </div>
            </div>
            <button
              onClick={onStartChatWithCoordinator}
              className="h-8 px-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-[11px] shrink-0 flex items-center gap-1 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[15px] text-secondary">chat</span>
              <span>Soru İlet</span>
            </button>
          </div>
        </section>
      )}

      {/* 8. Fixed Bottom Sticky Action Bar */}
      <footer className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-container-high pb-safe shadow-[0_-2px_12px_rgba(30,34,53,0.05)]">
        <div className="max-w-md mx-auto px-3.5 py-2 flex items-center gap-2">
          <button
            onClick={onStartChatWithCoordinator}
            aria-label="Koordinatörle Sohbet"
            className="w-11 h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center shrink-0 active:scale-95 transition-transform"
            title="Mesaj Gönder"
          >
            <span className="material-symbols-outlined text-[20px]">chat_bubble_outline</span>
          </button>

          <button
            onClick={() => {
              if (hasApplied) {
                showToast('Bu ilana zaten kayıtlı portfolyonuzla başvurdunuz.');
              } else {
                setIsApplyingModal(true);
              }
            }}
            className={`flex-1 h-11 px-4 rounded-xl font-bold text-xs tracking-tight shadow-sm flex items-center justify-between active:scale-[0.98] transition-all ${
              hasApplied
                ? 'bg-emerald-600 text-white'
                : 'bg-primary hover:bg-primary-container text-white'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-secondary-fixed">
                {hasApplied ? 'check_circle' : 'assignment_turned_in'}
              </span>
              <span>{hasApplied ? 'Başvurunuz İletildi ✓' : 'Portfolyom İle Başvur'}</span>
            </div>
            <span className="material-symbols-outlined text-[17px]">
              {hasApplied ? 'done' : 'arrow_forward'}
            </span>
          </button>
        </div>
        <div className="text-center pb-1">
          <span className="text-[10px] text-outline font-medium tracking-wide">
            Şartname onaylı • Güvenli Başvuru & Dijital Kaşe Protokolü
          </span>
        </div>
      </footer>

      {/* Application Confirmation Modal */}
      {isApplyingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-3">
          <div className="w-full max-w-sm bg-white rounded-2xl p-4 flex flex-col gap-3 shadow-2xl border border-surface-container-high animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-1 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">assignment_turned_in</span>
                <h3 className="font-bold text-sm text-primary">Burs & Fon Başvurusu</h3>
              </div>
              <button
                onClick={() => setIsApplyingModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-primary"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-2">
              <span className="text-[11px] font-bold text-primary">{opportunity.title}</span>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                İKSV Onaylı kayıtlı sanatçı profiliniz, Süreyya Operası icra kaydınız ve ses portfolyonuz seçici jüri heyetine aktarılacaktır.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setIsApplyingModal(false)}
                className="flex-1 h-9 rounded-lg bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-high transition-colors"
              >
                Vazgeç
              </button>
              <button
                onClick={handleApply}
                className="flex-1 h-9 rounded-lg bg-primary text-white font-bold text-xs hover:bg-primary-container transition-colors shadow-xs active:scale-95"
              >
                Onayla ve Gönder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-primary text-white px-4 py-2 rounded-full shadow-lg text-xs font-semibold flex items-center gap-1.5 transition-all animate-bounce">
          <span className="material-symbols-outlined text-secondary-container text-[16px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
