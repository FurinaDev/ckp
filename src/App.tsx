import React, { useState } from 'react';
import {
  INITIAL_OPPORTUNITIES,
  INITIAL_COMMUNITIES,
  INITIAL_DIRECT_MESSAGES,
  INITIAL_NOTIFICATIONS,
  Opportunity,
  CommunityHub,
  DirectMessageThread,
  NotificationItem,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav, TabKey } from './components/BottomNav';
import { FeedKesif } from './components/FeedKesif';
import { FeedIlanlar } from './components/FeedIlanlar';
import { FeedDuyurular } from './components/FeedDuyurular';
import { FeedTopluluk } from './components/FeedTopluluk';
import { FeedMesajlar } from './components/FeedMesajlar';
import { ScreenIlanDetay } from './components/ScreenIlanDetay';
import { ScreenChatContract } from './components/ScreenChatContract';
import { DrawerNotifications } from './components/DrawerNotifications';
import { ModalProfile } from './components/ModalProfile';
import { ModalNewPost } from './components/ModalNewPost';
import { ModalNewCommunity } from './components/ModalNewCommunity';
import { OnboardingSplash } from './components/OnboardingSplash';

export default function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('kesif');
  
  // Data State
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [communities, setCommunities] = useState<CommunityHub[]>(INITIAL_COMMUNITIES);
  const [directMessages] = useState<DirectMessageThread[]>(INITIAL_DIRECT_MESSAGES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Active Screens & Modals
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isContractChatOpen, setIsContractChatOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [isNewCommunityOpen, setIsNewCommunityOpen] = useState(false);

  // Reset scroll to top on tab change or view switch
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab, selectedOpportunity, isContractChatOpen]);

  // Handlers
  const handleAddNewPost = (newOpp: Opportunity) => {
    setOpportunities(prev => [newOpp, ...prev]);
  };

  const handleAddNewCommunity = (newHub: CommunityHub) => {
    setCommunities(prev => [newHub, ...prev]);
  };

  const handleJoinCommunityToggle = (id: string) => {
    setCommunities(prev =>
      prev.map(c => {
        if (c.id === id) {
          return {
            ...c,
            isJoined: !c.isJoined,
            membersCount: c.isJoined ? c.membersCount - 1 : c.membersCount + 1,
          };
        }
        return c;
      })
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const unreadNotificationsCount = notifications.filter(n => n.isUnread).length;

  if (showSplash) {
    return (
      <div className="min-h-screen bg-black flex justify-center">
        <OnboardingSplash onEnter={() => setShowSplash(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900/5 sm:bg-slate-900/10 flex justify-center text-on-surface">
      {/* Mobile Shell Frame */}
      <div className="w-full max-w-md min-h-screen bg-[#f8f9fa] flex flex-col relative shadow-2xl border-x border-surface-container">
        {/* Render View Hierarchy */}
        {selectedOpportunity ? (
          <ScreenIlanDetay
            opportunity={selectedOpportunity}
            onBack={() => setSelectedOpportunity(null)}
            onStartChatWithCoordinator={() => {
              setSelectedOpportunity(null);
              setIsContractChatOpen(true);
            }}
          />
        ) : isContractChatOpen ? (
          <ScreenChatContract
            onBack={() => setIsContractChatOpen(false)}
            onViewListing={() => {
              setIsContractChatOpen(false);
              setSelectedOpportunity(opportunities[3] || opportunities[0]);
            }}
          />
        ) : (
          <>
            {/* Standard Header */}
            <Header
              title={
                activeTab === 'kesif'
                  ? 'Çağdaş Kültür'
                  : activeTab === 'ilanlar'
                  ? 'İlanlar & Fırsatlar'
                  : activeTab === 'duyurular'
                  ? 'Duyurular & Ajanda'
                  : activeTab === 'topluluk'
                  ? "Topluluk & Hub'lar"
                  : 'Mesajlar & Kaşe'
              }
              subtitle="cagdasmuzik.com desteğiyle"
              onNotificationClick={() => setIsNotificationsOpen(true)}
              onProfileClick={() => setIsProfileOpen(true)}
              unreadNotificationsCount={unreadNotificationsCount}
            />

            {/* Active Tab Feed */}
            <main className="flex-1 w-full">
              {activeTab === 'kesif' && (
                <FeedKesif
                  opportunities={opportunities}
                  onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
                  onOpenNewPost={() => setIsNewPostOpen(true)}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                />
              )}

              {activeTab === 'ilanlar' && (
                <FeedIlanlar
                  opportunities={opportunities}
                  onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
                  onOpenNewPost={() => setIsNewPostOpen(true)}
                  onStartChatWithCurator={() => setIsContractChatOpen(true)}
                />
              )}

              {activeTab === 'duyurular' && (
                <FeedDuyurular
                  opportunities={opportunities}
                  onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
                  onOpenNewPost={() => setIsNewPostOpen(true)}
                />
              )}

              {activeTab === 'topluluk' && (
                <FeedTopluluk
                  communities={communities}
                  onOpenNewCommunity={() => setIsNewCommunityOpen(true)}
                  onJoinCommunityToggle={handleJoinCommunityToggle}
                />
              )}

              {activeTab === 'mesajlar' && (
                <FeedMesajlar
                  directMessages={directMessages}
                  communities={communities}
                  onOpenContractChat={() => setIsContractChatOpen(true)}
                  onOpenNewPost={() => setIsNewPostOpen(true)}
                  onOpenNewCommunity={() => setIsNewCommunityOpen(true)}
                />
              )}
            </main>

            {/* Bottom Persistent Navigation */}
            <BottomNav
              activeTab={activeTab}
              onTabChange={(tab) => {
                if (tab === 'profil') {
                  setIsProfileOpen(true);
                } else {
                  setActiveTab(tab);
                }
              }}
              unreadMessagesCount={4}
            />
          </>
        )}

        {/* Global Modals & Drawers */}
        <DrawerNotifications
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllNotificationsAsRead}
          onSelectContractNotice={() => {
            setIsContractChatOpen(true);
          }}
          onSelectListingNotice={() => {
            setSelectedOpportunity(opportunities[0]);
          }}
        />

        <ModalProfile
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          onOpenContractChat={() => {
            setIsProfileOpen(false);
            setIsContractChatOpen(true);
          }}
        />

        <ModalNewPost
          isOpen={isNewPostOpen}
          onClose={() => setIsNewPostOpen(false)}
          onSubmit={handleAddNewPost}
        />

        <ModalNewCommunity
          isOpen={isNewCommunityOpen}
          onClose={() => setIsNewCommunityOpen(false)}
          onSubmit={handleAddNewCommunity}
        />
      </div>
    </div>
  );
}
