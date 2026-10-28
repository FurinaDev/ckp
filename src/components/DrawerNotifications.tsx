import React, { useState } from 'react';
import { NotificationItem } from '../data/mockData';

interface DrawerNotificationsProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectContractNotice: () => void;
  onSelectListingNotice: () => void;
}

export const DrawerNotifications: React.FC<DrawerNotificationsProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectContractNotice,
  onSelectListingNotice,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'contract' | 'application' | 'call'>('all');

  if (!isOpen) return null;

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'contract' && n.category !== 'contract') return false;
    if (activeTab === 'application' && n.category !== 'application') return false;
    if (activeTab === 'call' && n.category !== 'call') return false;
    return true;
  });

  const unreadCount = notifications.filter(n => n.isUnread).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md h-full bg-background flex flex-col shadow-2xl animate-in slide-in-from-right duration-250 border-l border-surface-container-high overflow-hidden">
        {/* Header */}
        <header className="h-14 px-4 flex items-center justify-between border-b border-surface-container-high bg-white/95 backdrop-blur-md pt-safe">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Kapat"
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <h2 className="font-bold text-sm text-primary">Bildirimler</h2>
          </div>

          <button
            onClick={onMarkAllAsRead}
            className="text-[11px] font-bold text-secondary hover:text-orange-700 flex items-center gap-1 active:scale-95"
          >
            <span className="material-symbols-outlined text-[15px]">done_all</span>
            <span>Tümünü Okundu Say</span>
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5">
          {/* Status Sub-bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                {unreadCount > 0 ? `${unreadCount} Okunmamış Hareket` : 'Tüm Bildirimler Güncel'}
              </span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'all', label: 'Tümü', count: notifications.length },
              { id: 'contract', label: 'Sözleşme & Kaşe' },
              { id: 'application', label: 'Başvurular' },
              { id: 'call', label: 'Çağrılar & Sistem' },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-white text-on-surface-variant hover:text-primary border border-surface-container-high'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Notifications List */}
          <div className="space-y-2.5">
            {filteredNotifs.map(notif => {
              const isContract = notif.category === 'contract';

              return (
                <article
                  key={notif.id}
                  onClick={() => {
                    if (isContract) {
                      onClose();
                      onSelectContractNotice();
                    } else {
                      onClose();
                      onSelectListingNotice();
                    }
                  }}
                  className={`relative p-3 rounded-xl border border-surface-container-high shadow-xs transition-all cursor-pointer ${
                    notif.isUnread ? 'bg-white hover:border-secondary/40' : 'bg-surface-container-low/70 opacity-90'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[19px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {notif.icon}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-bold text-xs text-primary truncate">{notif.title}</span>
                        {notif.isUnread && (
                          <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span>
                        )}
                      </div>

                      <p className="text-[11px] text-on-surface-variant leading-relaxed line-clamp-2">
                        {notif.description}
                      </p>

                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-surface-container/60 text-[10px]">
                        <span className="text-outline">{notif.time}</span>
                        {notif.actionLabel && (
                          <span className="font-bold text-secondary flex items-center gap-0.5">
                            <span>{notif.actionLabel}</span>
                            <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Notification Preferences Card */}
          <div className="p-3 bg-white rounded-xl border border-surface-container-high shadow-xs flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-outline text-[18px]">tune</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-primary">Bildirim Tercihleri</span>
                <span className="text-[10px] text-on-surface-variant">SMS ve anlık mobil bildirimleri yönetin</span>
              </div>
            </div>
            <button
              onClick={() => alert('Bildirim tercihleri kaydedildi')}
              className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
