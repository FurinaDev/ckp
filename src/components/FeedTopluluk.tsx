import React, { useState } from 'react';
import { CommunityHub } from '../data/mockData';

interface FeedToplulukProps {
  communities: CommunityHub[];
  onOpenNewCommunity: () => void;
  onJoinCommunityToggle: (id: string) => void;
}

export const FeedTopluluk: React.FC<FeedToplulukProps> = ({
  communities,
  onOpenNewCommunity,
  onJoinCommunityToggle,
}) => {
  const [selectedTab, setSelectedTab] = useState<'my' | 'explore' | 'academies' | 'announcements'>('my');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChannelModal, setActiveChannelModal] = useState<{
    communityName: string;
    channelName: string;
    lastMessage: string;
  } | null>(null);

  const tabs = [
    { id: 'my', label: 'Topluluklarım (4)' },
    { id: 'explore', label: 'Keşfet & İnisiyatifler' },
    { id: 'academies', label: 'Akademiler & Kurumlar' },
    { id: 'announcements', label: 'Duyuru Kanalları' },
  ];

  const filteredCommunities = communities.filter(c => {
    if (selectedTab === 'my' && !c.isJoined && !c.isManaged) return false;
    if (selectedTab === 'academies' && !c.name.includes('Konservatuvar') && !c.name.includes('İKSV')) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchChannels = c.channels.some(ch => ch.name.toLowerCase().includes(q) || ch.lastMessage.toLowerCase().includes(q));
      return matchName || matchChannels;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-28 space-y-3.5 max-w-md mx-auto relative">
      {/* 1. Search Bar */}
      <section className="px-4 pt-2">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-9 bg-surface-container-low border border-surface-container-high rounded-xl text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white transition-all shadow-xs"
            placeholder="Topluluk, kolektif veya sanat inisiyatifi ara..."
            type="search"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          ) : (
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
              <span className="material-symbols-outlined text-[17px]">tune</span>
            </span>
          )}
        </div>
      </section>

      {/* 2. Horizontal Pill Tabs */}
      <section className="pl-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pr-4 py-0.5">
          {tabs.map(tab => {
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Curatorial Mini Banner */}
      <section className="px-4">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-[#2a3047] text-white p-3.5 shadow-xs border border-primary/20">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary-container text-[18px]">hub</span>
              <span className="text-xs font-bold tracking-wide text-white uppercase">Kültür-Sanat Ağları</span>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-secondary text-white uppercase tracking-wider animate-pulse">
              CANLI
            </span>
          </div>
          <p className="text-[11.5px] leading-relaxed text-surface-container-high font-normal pr-2">
            WhatsApp topluluğu mantığıyla kurumlar, orkestralar ve bağımsız sanatçılarla doğrudan iletişim.
          </p>
        </div>
      </section>

      {/* 4. Community Cards Feed */}
      <section className="px-4 flex flex-col gap-3">
        {filteredCommunities.map(community => (
          <article
            key={community.id}
            className="bg-white border border-surface-container-high rounded-2xl p-3.5 shadow-xs hover:shadow-sm transition-all flex flex-col gap-2.5"
          >
            {/* Header Row */}
            <div className="flex items-start gap-3">
              <div className="relative w-11 h-11 flex-shrink-0">
                <img
                  className="w-11 h-11 rounded-xl object-cover ring-1 ring-surface-container-high"
                  alt={community.name}
                  src={community.avatar}
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" title="Aktif"></span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-[13px] text-primary leading-tight truncate">
                    {community.name}
                  </h3>
                  {community.verified && (
                    <span className="material-symbols-outlined text-[15px] text-secondary flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-on-surface-variant mt-0.5">
                  <span className="flex items-center gap-1 font-medium text-primary">
                    <span className="material-symbols-outlined text-[13px] text-outline">groups</span>
                    {community.membersCount} Üye
                  </span>
                  <span>•</span>
                  <span className="text-emerald-700 font-medium">{community.activeStatus}</span>
                </div>
              </div>

              {community.roleBadge ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary-fixed text-on-secondary-fixed flex-shrink-0">
                  {community.roleBadge}
                </span>
              ) : community.isJoined ? (
                <button
                  onClick={() => onJoinCommunityToggle(community.id)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-surface-container text-on-surface-variant hover:bg-surface-container-high flex-shrink-0"
                >
                  Katıldın
                </button>
              ) : (
                <button
                  onClick={() => onJoinCommunityToggle(community.id)}
                  className="px-3 py-1 rounded-lg text-[11px] font-bold bg-primary text-white hover:bg-primary-container transition-colors flex-shrink-0 shadow-xs active:scale-95"
                >
                  Katıl
                </button>
              )}
            </div>

            {/* Micro Channels List */}
            <div className="bg-surface-container-low/70 rounded-xl p-1.5 flex flex-col gap-1 border border-surface-container-high/40">
              {community.channels.map(channel => (
                <div
                  key={channel.id}
                  onClick={() => setActiveChannelModal({
                    communityName: community.name,
                    channelName: channel.name,
                    lastMessage: channel.lastMessage
                  })}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/80 hover:bg-white transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">
                      {channel.icon}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-primary group-hover:text-secondary transition-colors truncate">
                        {channel.name}
                      </span>
                      <span className="text-[10px] text-on-surface-variant truncate font-normal">
                        {channel.lastMessage}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] text-outline font-medium">{channel.timeOrDate}</span>
                    {channel.unreadCount ? (
                      <span className="w-4 h-4 rounded-full bg-secondary text-white text-[9px] font-bold flex items-center justify-center">
                        {channel.unreadCount}
                      </span>
                    ) : null}
                    {channel.requiredApproval && (
                      <span className="text-[9px] font-bold text-outline px-1.5 py-0.5 rounded bg-surface-container">
                        Onay Gerekir
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-30 max-w-md mx-auto">
        <button
          onClick={onOpenNewCommunity}
          aria-label="Yeni Topluluk Başlat"
          className="h-11 px-4 rounded-full bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95 transition-all border border-white/10"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary-container">add</span>
          <span>Yeni Topluluk</span>
        </button>
      </div>

      {/* Channel Quick Chat Modal */}
      {activeChannelModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-3">
          <div className="w-full max-w-sm bg-white rounded-2xl p-4 flex flex-col gap-3 shadow-2xl border border-surface-container-high animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold text-secondary tracking-wider">
                  {activeChannelModal.communityName}
                </span>
                <h4 className="font-bold text-sm text-primary truncate">
                  {activeChannelModal.channelName}
                </h4>
              </div>
              <button
                onClick={() => setActiveChannelModal(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="bg-surface-container-low p-3 rounded-xl flex flex-col gap-2">
              <span className="text-[10px] text-outline font-bold uppercase tracking-wider">Son Paylaşım</span>
              <p className="text-xs text-on-surface leading-relaxed font-normal">
                "{activeChannelModal.lastMessage}"
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                className="flex-1 h-9 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Bu kanala mesaj yaz..."
                type="text"
              />
              <button
                onClick={() => {
                  alert('Kanal mesajı paylaşıldı!');
                  setActiveChannelModal(null);
                }}
                className="h-9 px-3.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container active:scale-95"
              >
                Gönder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
