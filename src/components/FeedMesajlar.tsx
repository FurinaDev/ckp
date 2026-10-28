import React, { useState } from 'react';
import { DirectMessageThread, CommunityHub } from '../data/mockData';

interface FeedMesajlarProps {
  directMessages: DirectMessageThread[];
  communities: CommunityHub[];
  onOpenContractChat: () => void;
  onOpenNewPost: () => void;
  onOpenNewCommunity: () => void;
}

export const FeedMesajlar: React.FC<FeedMesajlarProps> = ({
  directMessages,
  communities,
  onOpenContractChat,
  onOpenNewPost,
  onOpenNewCommunity,
}) => {
  const [filter, setFilter] = useState<'all' | 'community' | 'groups' | 'direct' | 'unread'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterPills = [
    { id: 'all', label: 'Tümü', count: 14 },
    { id: 'community', label: 'Topluluklar', count: 3 },
    { id: 'groups', label: 'Gruplar', count: 2 },
    { id: 'direct', label: 'Direkt', count: 7 },
    { id: 'unread', label: 'Okunmamış', count: 4, highlight: true },
  ];

  const filteredDirect = directMessages.filter(msg => {
    if (filter === 'unread' && !msg.unreadCount && msg.contractStatus !== 'pending') return false;
    if (filter === 'groups' && !msg.isGroup) return false;
    if (filter === 'community') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return msg.name.toLowerCase().includes(q) || msg.lastMessage.toLowerCase().includes(q);
    }
    return true;
  });

  const showCommunities = filter === 'all' || filter === 'community';

  return (
    <div className="flex flex-col w-full pb-28 space-y-3.5 max-w-md mx-auto relative">
      {/* 1. Search Bar */}
      <section className="px-4 pt-2 flex flex-col gap-2">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-8 bg-white border border-surface-container-high rounded-xl text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary shadow-xs transition-all"
            placeholder="Sanatçı, topluluk veya kişi ara..."
            type="text"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
          {filterPills.map(p => {
            const isActive = filter === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setFilter(p.id as any)}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all active:scale-95 flex items-center gap-1 shadow-2xs ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white text-on-surface-variant hover:text-primary border border-surface-container-high'
                }`}
              >
                <span>{p.label}</span>
                <span
                  className={`px-1 py-0.2 rounded-full text-[9px] font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : p.highlight
                      ? 'bg-secondary-fixed text-on-secondary-fixed'
                      : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {p.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Quick Action Hub Buttons */}
      <section className="px-4 grid grid-cols-3 gap-2">
        <button
          onClick={onOpenNewCommunity}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-surface-container-high shadow-xs hover:bg-surface-container-low transition-all active:scale-95 text-center group"
        >
          <div className="w-7 h-7 rounded-lg bg-orange-100 text-secondary flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[17px]">add_circle</span>
          </div>
          <span className="text-[10px] font-bold text-on-surface leading-tight">Topluluk Kur</span>
          <span className="text-[9px] text-outline font-medium">Çatı Alan</span>
        </button>

        <button
          onClick={() => alert('Yeni grup sohbeti oluşturma paneli açılıyor...')}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-surface-container-high shadow-xs hover:bg-surface-container-low transition-all active:scale-95 text-center group"
        >
          <div className="w-7 h-7 rounded-lg bg-surface-container-high text-primary flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[17px]">group_add</span>
          </div>
          <span className="text-[10px] font-bold text-on-surface leading-tight">Yeni Grup</span>
          <span className="text-[9px] text-outline font-medium">Sohbet Odası</span>
        </button>

        <button
          onClick={() => alert('Yönetici olduğunuz 2 topluluk listelendi: İKSV Genç Sanatçılar & Moda Oda Müziği')}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-surface-container-high shadow-xs hover:bg-surface-container-low transition-all active:scale-95 text-center relative group"
        >
          <div className="absolute top-1.5 right-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>
          </div>
          <div className="w-7 h-7 rounded-lg bg-primary-container text-white flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[17px]">tune</span>
          </div>
          <span className="text-[10px] font-bold text-on-surface leading-tight">Topluluklarımı</span>
          <span className="text-[9px] text-secondary font-bold">Yönet (2)</span>
        </button>
      </section>

      {/* 3. Sanat Toplulukları Bölümü */}
      {showCommunities && (
        <section className="px-4 flex flex-col gap-2">
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary">hub</span>
              <h2 className="text-[11px] font-bold tracking-wider uppercase text-on-surface-variant">Sanat Toplulukları</h2>
            </div>
            <span className="text-[10px] text-outline font-bold">3 Aktif Ağ</span>
          </div>

          {communities.slice(0, 2).map(comm => (
            <div
              key={comm.id}
              className="bg-white rounded-xl border border-surface-container-high shadow-xs overflow-hidden p-3 space-y-2"
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-surface-container">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-white flex items-center justify-center shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">account_balance</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-xs text-primary truncate">{comm.name}</span>
                      <span className="material-symbols-outlined text-[13px] text-blue-500 shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified
                      </span>
                    </div>
                    <span className="text-[9px] text-outline uppercase tracking-wider">
                      {comm.category} • {comm.membersCount} Üye
                    </span>
                  </div>
                </div>
                {comm.roleBadge && (
                  <span className="text-[9px] font-bold text-secondary bg-orange-100 px-1.5 py-0.5 rounded">
                    {comm.roleBadge}
                  </span>
                )}
              </div>

              {/* Channels Preview */}
              <div className="space-y-1.5 pt-0.5">
                {comm.channels.slice(0, 2).map(ch => (
                  <div
                    key={ch.id}
                    onClick={onOpenContractChat}
                    className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="material-symbols-outlined text-[15px] text-secondary shrink-0">
                        {ch.icon}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-primary truncate">{ch.name}</span>
                        <p className="text-[10px] text-on-surface-variant truncate font-normal">{ch.lastMessage}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[10px] text-outline">{ch.timeOrDate}</span>
                      {ch.unreadCount && (
                        <span className="w-3.5 h-3.5 rounded-full bg-secondary text-white text-[8px] font-bold flex items-center justify-center">
                          {ch.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 4. Doğrudan Mesajlar & Gruplar */}
      <section className="px-4 flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary">chat_bubble</span>
            <h2 className="text-[11px] font-bold tracking-wider uppercase text-on-surface-variant">Doğrudan Mesajlar & Gruplar</h2>
          </div>
          <span className="text-[10px] text-outline font-medium">Son Hareketler</span>
        </div>

        <div className="flex flex-col gap-1.5">
          {filteredDirect.map(thread => {
            const isTargetContract = thread.id === 'marmara-pera-chat';

            return (
              <div
                key={thread.id}
                onClick={isTargetContract ? onOpenContractChat : onOpenContractChat}
                className="bg-white p-2.5 rounded-xl border border-surface-container-high shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center gap-2.5 active:scale-[0.99] group"
              >
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high ring-1 ring-slate-200">
                    <img className="w-full h-full object-cover" alt={thread.name} src={thread.avatar} />
                  </div>
                  {thread.isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                  )}
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-xs font-bold text-primary truncate group-hover:text-secondary transition-colors">
                        {thread.name}
                      </span>
                      {thread.isContractNotice && (
                        <span className="text-[9px] font-bold text-orange-800 bg-orange-100 px-1 py-0.2 rounded shrink-0">
                          Kaşeli İlan
                        </span>
                      )}
                      {thread.roleBadge && !thread.isContractNotice && (
                        <span className="text-[9px] text-outline px-1 rounded bg-surface-container-low shrink-0 font-medium">
                          {thread.roleBadge}
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium shrink-0 ${thread.unreadCount ? 'text-secondary font-bold' : 'text-outline'}`}>
                      {thread.time}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <p className={`text-[11px] leading-tight truncate ${thread.unreadCount ? 'text-on-surface font-semibold' : 'text-on-surface-variant'}`}>
                      {thread.lastMessage}
                    </p>
                    {thread.unreadCount ? (
                      <span className="w-4 h-4 rounded-full bg-secondary text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                        {thread.unreadCount}
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-[14px] text-blue-500 shrink-0">
                        done_all
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Escrow Security Notice Box */}
      <section className="px-4">
        <div className="p-3 bg-white rounded-xl border border-surface-container-high shadow-xs flex items-start gap-2.5">
          <div className="w-1 bg-secondary rounded-full self-stretch shrink-0"></div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 text-secondary text-[10px] uppercase font-bold tracking-wider">
              <span className="material-symbols-outlined text-[13px]">verified_user</span>
              <span>Güvenli Kaşe & Sanatçı Protokolü</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
              cagdasmuzik.com destekli güvenli havuz: Topluluk veya direkt mesajlaşmalarda onaylanan tüm sözleşmeler performans sonuna kadar dijital koruma altındadır.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-30 max-w-md mx-auto">
        <button
          onClick={onOpenNewPost}
          aria-label="Yeni Sohbet Başlat"
          className="h-11 w-11 rounded-full bg-primary text-white shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center border border-white/20"
        >
          <span className="material-symbols-outlined text-[20px]">edit_square</span>
        </button>
      </div>
    </div>
  );
};
