import React from 'react';

export type TabKey = 'kesif' | 'ilanlar' | 'duyurular' | 'topluluk' | 'mesajlar' | 'profil';

interface BottomNavProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  unreadMessagesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  unreadMessagesCount = 4,
}) => {
  const tabs = [
    { key: 'kesif' as TabKey, label: 'Keşif', icon: 'explore' },
    { key: 'ilanlar' as TabKey, label: 'İlanlar', icon: 'work_outline', activeIcon: 'work' },
    { key: 'duyurular' as TabKey, label: 'Duyurular', icon: 'campaign', hasDot: true },
    { key: 'topluluk' as TabKey, label: 'Topluluk', icon: 'forum', activeIcon: 'forum' },
    { key: 'mesajlar' as TabKey, label: 'Mesajlar', icon: 'chat_bubble_outline', activeIcon: 'chat_bubble', badge: unreadMessagesCount },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-container-high pb-safe shadow-[0_-2px_12px_rgba(30,34,53,0.04)]">
      <div className="flex items-center justify-around h-14 px-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              aria-label={tab.label}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors relative ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div className="relative">
                <span
                  className={`material-symbols-outlined text-[21px] transition-transform ${
                    isActive ? 'scale-105' : ''
                  }`}
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {isActive && tab.activeIcon ? tab.activeIcon : tab.icon}
                </span>

                {tab.badge && tab.badge > 0 && !isActive && (
                  <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-secondary text-white text-[8px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}

                {tab.hasDot && (
                  <span className="w-1 h-1 rounded-full bg-secondary absolute -bottom-0.5 left-1/2 -translate-x-1/2"></span>
                )}
              </div>
              <span className={`text-[10px] leading-tight ${isActive ? 'font-bold text-primary' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-secondary absolute bottom-1 left-1/2 -translate-x-1/2"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
