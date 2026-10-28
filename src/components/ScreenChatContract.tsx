import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ScreenChatContractProps {
  onBack: () => void;
  onViewListing: () => void;
}

interface Message {
  id: string;
  sender: 'can' | 'selin';
  text: string;
  time: string;
}

export const ScreenChatContract: React.FC<ScreenChatContractProps> = ({
  onBack,
  onViewListing,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [contractSigned, setContractSigned] = useState(false);
  const [counterOfferModal, setCounterOfferModal] = useState(false);
  const [counterOfferValue, setCounterOfferValue] = useState('14.500');
  const [netHonorarium, setNetHonorarium] = useState('13.000 ₺');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'can',
      text: 'Merhaba Selin Hanım, The Marmara Pera fuaye akustik serimiz için profilinizi ve Süreyya Operası resital kaydınızı heyecanla inceledik. Çarşamba ve Cuma akşamları için 2 kişilik oda müziği / akustik çello dinletisi planlıyoruz. Kaşe ve repertuar uygunluğunuz nasıldır?',
      time: '14:15'
    },
    {
      id: 'm2',
      sender: 'selin',
      text: 'Merhaba Can Bey, nazik davetiniz için çok teşekkürler! Bahsettiğiniz tarihler takvimimde müsait. Barok & modern neo-klasik füzyon repertuvarımız hazır. Dilerseniz demo dinletisini ve prova kaydını hemen iletiyorum.',
      time: '14:18'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [audioProgress, setAudioProgress] = useState(74); // 01:14 in seconds

  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress(prev => (prev >= 222 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSendMessage = () => {
    if (!inputVal.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'selin',
      text: inputVal.trim(),
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
    setInputVal('');
  };

  const handleSignContract = () => {
    setContractSigned(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ab3425', '#080c1e', '#10b981', '#fc6f5a']
    });

    const followUpMsg: Message = {
      id: Date.now().toString(),
      sender: 'selin',
      text: 'Harika bir program! Karşı teklif şartları uygun, resmi sözleşme şartnamesini dijital imza ile onayladım. Prova notalarını da birazdan ekleyeceğim. 🎻',
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, followUpMsg]);
  };

  const submitCounterOffer = () => {
    setNetHonorarium(`${counterOfferValue} ₺`);
    setCounterOfferModal(false);
    const counterMsg: Message = {
      id: Date.now().toString(),
      sender: 'selin',
      text: `Can Bey, 2 oturum ve prova süreci için karşı teklifim net ${counterOfferValue} ₺'dir. Şartname detayları uygunsa havuz onayınızı bekliyorum.`,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, counterMsg]);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background max-w-md mx-auto relative select-none">
      {/* 1. Sticky Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-surface-container-high pt-safe shadow-xs">
        <div className="h-14 px-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onBack}
              aria-label="Geri"
              className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>

            <div className="relative shrink-0">
              <img
                alt="Selin Ela Karaca"
                className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPfQWP6oCDQ90Uk9sJi8ejqxEqYBVDeWxtsn9uxlLF9a2h2ClYAcSaGYL-lFPuS6NxVC6Db8Y5cRpxg3k_auq21-PcM9P42tkJC1ULDG6I8V1_Sq--6Ns_ayVKh4DeqvX_iC0YHL0-eWYO6IjNxrengq3A4pY-4OUlGmrJnScwHCPUNEQoLUDSoxZ5sPR4M9iOHYNLxJjOOiMdtVtNqIkloYfc0tPA1iN-B_GoySrWADIFNdxv6s62QA"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </div>

            <div className="flex flex-col min-w-0 leading-tight">
              <div className="flex items-center gap-1">
                <span className="font-bold text-xs text-primary truncate">Selin Ela Karaca</span>
                <span className="material-symbols-outlined text-secondary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>
              <p className="text-[10px] text-on-surface-variant truncate">
                Viyolonselist • <span className="text-emerald-700 font-semibold">Çevrimiçi</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            <button
              onClick={() => alert('Can Berkman (Küratör & Sanat Direktörü) ile sesli arama başlatılıyor...')}
              aria-label="Sesli Ara"
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container active:scale-90"
            >
              <span className="material-symbols-outlined text-[19px]">call</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('contract-proposal-card');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="h-8 px-2.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[15px] text-secondary">gavel</span>
              <span>Sözleşme</span>
            </button>
          </div>
        </div>

        {/* Compact Reference Gig Bar */}
        <div className="px-3 pb-2 pt-0.5">
          <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-surface-container-low border border-surface-container text-xs">
            <div className="flex items-center gap-1.5 truncate pr-1">
              <span className="material-symbols-outlined text-[15px] text-secondary shrink-0">apartment</span>
              <span className="text-on-surface truncate text-[11px]">
                <strong className="font-semibold text-primary">Ref:</strong> Haftalık Akustik Performans • The Marmara Pera
              </span>
            </div>
            <button
              onClick={onViewListing}
              className="shrink-0 text-secondary hover:underline font-bold text-[11px] flex items-center gap-0.5"
            >
              <span>İlanı Gör</span>
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Scrollable Chat Stream */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3.5 pb-44" id="chatStream">
        {/* Date Divider */}
        <div className="flex justify-center items-center my-1">
          <span className="bg-surface-container text-on-surface-variant px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Bugün, 14:15
          </span>
        </div>

        {/* Dynamic & Static Messages */}
        {messages.map((m) => {
          const isSelin = m.sender === 'selin';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isSelin ? 'items-end self-end ml-auto' : 'items-start self-start mr-auto'} max-w-[88%]`}
            >
              {!isSelin && (
                <span className="text-[10px] font-bold text-on-surface-variant mb-1 ml-1 flex items-center gap-1">
                  Can Berkman <span className="font-normal text-outline text-[9px]">(Sanat Direktörü)</span>
                </span>
              )}
              <div
                className={`rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                  isSelin
                    ? 'bg-primary text-white rounded-tr-xs'
                    : 'bg-white text-on-surface border border-surface-container-high rounded-tl-xs'
                }`}
              >
                {m.text}
              </div>
              <div className="flex items-center gap-1 mt-0.5 px-1">
                <span className="text-[9px] text-outline">{m.time}</span>
                {isSelin && (
                  <span className="material-symbols-outlined text-[13px] text-secondary-container">
                    done_all
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Audio Player Demo Bubble */}
        <div className="flex flex-col items-end ml-auto max-w-[92%] w-full">
          <div className="w-full bg-primary text-white rounded-2xl rounded-tr-xs p-3 shadow-md border border-primary-container flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 min-w-0 pr-1">
                <span className="material-symbols-outlined text-secondary-container text-[17px]">graphic_eq</span>
                <span className="text-xs font-bold text-white tracking-wide truncate">
                  Akustik Çello & Piyano Demo (Bach)
                </span>
              </div>
              <span className="bg-white/10 px-1.5 py-0.5 rounded text-[9px] font-mono text-secondary-fixed shrink-0">
                WAV • Canlı
              </span>
            </div>

            {/* Interactive Player Controls & Waveform */}
            <div className="flex items-center gap-2.5 bg-black/25 rounded-xl p-2">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                aria-label={isPlayingAudio ? 'Durdur' : 'Oynat'}
                className="w-9 h-9 rounded-full bg-secondary hover:bg-secondary-container text-white flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isPlayingAudio ? 'pause' : 'play_arrow'}
                </span>
              </button>

              {/* Dynamic Waveform Bars */}
              <div className="flex items-center gap-1 flex-1 h-7 px-1">
                {[12, 20, 16, 24, 28, 20, 14, 22, 18, 26, 15, 24, 18, 12, 20, 16, 10].map((height, i) => {
                  const isActive = i < 8 || isPlayingAudio;
                  return (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-secondary-container' : 'bg-white/30'
                      }`}
                      style={{
                        height: isPlayingAudio ? `${Math.max(8, (height + Math.sin(Date.now() / 200 + i) * 8))}%` : `${height}px`,
                      }}
                    ></div>
                  );
                })}
              </div>

              <span className="text-[10px] font-mono text-white/80 tabular-nums shrink-0">
                {formatSeconds(audioProgress)}
              </span>
            </div>
          </div>
          <span className="text-[9px] text-outline mt-0.5 pr-1">14:19</span>
        </div>

        {/* 3. Official Escrow Contract Card (Core Innovation) */}
        <div id="contract-proposal-card" className="my-2 w-full">
          <div className="rounded-xl border border-secondary/40 bg-white p-3.5 shadow-md relative overflow-hidden transition-all">
            {/* Top Accent Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-secondary-container to-primary"></div>

            {/* Header & Status */}
            <div className="flex items-center justify-between pb-2 border-b border-surface-container pt-0.5">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[17px] text-secondary">verified_user</span>
                <span className="text-[10px] font-bold tracking-wider text-primary uppercase">
                  Resmi Kaşeli Sözleşme Teklifi
                </span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  contractSigned
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-secondary-fixed text-on-secondary-fixed'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    contractSigned ? 'bg-emerald-600' : 'bg-secondary animate-pulse'
                  }`}
                ></span>
                {contractSigned ? 'İmzalandı & Havuzda' : 'Onay Bekliyor'}
              </span>
            </div>

            {/* Contract Specifications */}
            <div className="py-2.5 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-outline shrink-0 mt-0.5">calendar_month</span>
                <div className="leading-tight">
                  <span className="text-on-surface-variant font-medium text-[10px] block uppercase">Tarih & Saat:</span>
                  <span className="font-semibold text-on-surface text-[12px]">28 & 30 Ekim 2025 • 20:00 - 21:30</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-outline shrink-0 mt-0.5">theater_comedy</span>
                <div className="leading-tight">
                  <span className="text-on-surface-variant font-medium text-[10px] block uppercase">Mekan & Format:</span>
                  <span className="font-semibold text-on-surface text-[12px]">The Marmara Pera Akustik Salonu (Duo Resital)</span>
                </div>
              </div>

              {/* Price Highlight Well */}
              <div className="mt-2.5 p-2.5 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-outline font-bold uppercase block">Teklif Edilen Net Kaşe</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-lg font-bold text-secondary tracking-tight">{netHonorarium}</span>
                    <span className="text-[10px] text-outline">/ 2 Oturum</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded">
                    KDV Dahil • Güvenli Havuz
                  </span>
                  <p className="text-[9px] text-on-surface-variant mt-0.5">cagdasmuzik.com Güvencesi</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setCounterOfferModal(true)}
                disabled={contractSigned}
                className="flex-1 py-2 px-3 text-xs font-bold rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container active:scale-[0.98] transition-all text-center disabled:opacity-50"
                type="button"
              >
                Karşı Teklif
              </button>
              <button
                onClick={handleSignContract}
                disabled={contractSigned}
                className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all shadow-xs flex items-center justify-center gap-1 active:scale-[0.98] ${
                  contractSigned
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-primary hover:bg-primary-container text-white'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {contractSigned ? 'check_circle' : 'draw'}
                </span>
                <span>{contractSigned ? 'Sözleşme Onaylandı ✓' : 'Kabul Et & İmzala'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Escrow Guarantee Notice Badge */}
        <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-xl text-on-surface-variant max-w-sm mx-auto border border-surface-container">
          <span className="material-symbols-outlined text-[18px] text-secondary shrink-0">shield</span>
          <p className="text-[11px] leading-tight">
            <strong className="text-on-surface font-semibold">Çağdaş Kültür Kaşe Havuzu Güvencesi:</strong>
            {' '}Bedel performans tamamlanıp onaylanana kadar blokeli emanet hesabında koruma altındadır.
          </p>
        </div>
      </div>

      {/* 4. Sticky Bottom Input Area */}
      <footer className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-container-high pb-safe shadow-lg max-w-md mx-auto">
        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto px-3 py-1.5 no-scrollbar border-b border-surface-container">
          <button
            onClick={() => setInputVal('📅 28 ve 30 Ekim takvimim uygundur, ajandama senkronize ettim.')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-[10.5px] font-semibold whitespace-nowrap hover:bg-surface-container-high active:scale-95 transition-all shrink-0"
          >
            <span>📅 Takvim Paylaş</span>
          </button>
          <button
            onClick={() => setInputVal('🎵 Yeni oda müziği solo demo kaydımı ekte iletiyorum.')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-[10.5px] font-semibold whitespace-nowrap hover:bg-surface-container-high active:scale-95 transition-all shrink-0"
          >
            <span>🎵 Demo Gönder</span>
          </button>
          <button
            onClick={() => setInputVal('📄 Sahne teknik şartnamesi ve akustik oda gereksinimleri dosyasını rica ederim.')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-[10.5px] font-semibold whitespace-nowrap hover:bg-surface-container-high active:scale-95 transition-all shrink-0"
          >
            <span>📄 Şartname İste</span>
          </button>
          <button
            onClick={() => setCounterOfferModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-[10.5px] font-semibold whitespace-nowrap hover:bg-surface-container-high active:scale-95 transition-all shrink-0"
          >
            <span>💼 Kaşe Güncelle</span>
          </button>
        </div>

        {/* Input Bar */}
        <div className="px-3 py-1.5 flex items-center gap-1.5">
          <button
            onClick={() => alert('Müzik dosyası, portfolyo PDF veya sözleşme eki yükleme menüsü açılıyor...')}
            aria-label="Dosya Ekle"
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high active:scale-95 transition-transform shrink-0"
          >
            <span className="material-symbols-outlined text-[19px]">add</span>
          </button>

          <div className="flex-1 relative flex items-center">
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full h-9 bg-surface-container-low text-on-surface placeholder:text-outline rounded-full pl-3.5 pr-8 text-xs focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary transition-all"
              placeholder="Mesajınızı veya karşı teklifinizi yazın..."
              type="text"
            />
            <button
              onClick={() => setInputVal(prev => prev + ' 🎵')}
              className="absolute right-2 text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[16px]">music_note</span>
            </button>
          </div>

          <button
            onClick={() => alert('Sesli not kaydı mikrofonu dinleniyor...')}
            aria-label="Sesli Mesaj"
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high active:scale-95 transition-transform shrink-0"
          >
            <span className="material-symbols-outlined text-[19px]">mic</span>
          </button>

          <button
            onClick={handleSendMessage}
            aria-label="Gönder"
            className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center shadow-xs hover:brightness-110 active:scale-95 transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </footer>

      {/* Counter Offer Modal */}
      {counterOfferModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-3">
          <div className="w-full max-w-sm bg-white rounded-2xl p-4 flex flex-col gap-3 shadow-2xl border border-surface-container-high animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-1 border-b border-surface-container">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[20px]">edit_note</span>
                <h3 className="font-bold text-sm text-primary">Karşı Kaşe Teklifi Ver</h3>
              </div>
              <button
                onClick={() => setCounterOfferModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-primary"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              The Marmara Pera Sanat 2 oturumluk dinleti için revize kaşe talebinizi belirtin.
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase text-outline">Talep Edilen Net Kaşe (₺)</label>
              <input
                value={counterOfferValue}
                onChange={(e) => setCounterOfferValue(e.target.value)}
                className="h-10 px-3 rounded-xl bg-surface-container-low border border-surface-container-high font-bold text-base text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                type="text"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setCounterOfferModal(false)}
                className="flex-1 h-9 rounded-xl bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-high transition-colors"
              >
                İptal
              </button>
              <button
                onClick={submitCounterOffer}
                className="flex-1 h-9 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-container transition-colors shadow-xs active:scale-95"
              >
                Teklifi İlet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
