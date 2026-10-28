import React from 'react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  unreadNotificationsCount?: number;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Çağdaş Kültür',
  subtitle = 'cagdasmuzik.com desteğiyle',
  showBack = false,
  onBack,
  onNotificationClick,
  onProfileClick,
  unreadNotificationsCount = 3,
  rightAction,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-surface-container-high pt-safe shadow-xs">
      <div className="h-14 px-4 flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          {showBack ? (
            <button
              onClick={onBack}
              aria-label="Geri Dön"
              className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center p-1.5 shadow-sm shrink-0">
              <svg className="w-full h-full text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
            </div>
          )}

          <div className="flex flex-col min-w-0 leading-none">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[15px] tracking-tight text-primary truncate">{title}</span>
              {!showBack && (
                <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 shrink-0">
                  HUB
                </span>
              )}
            </div>
            {subtitle && (
              <span className="text-[11px] text-on-surface-variant font-medium mt-0.5 truncate">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {rightAction ? (
            rightAction
          ) : (
            <>
              <button
                onClick={onNotificationClick}
                aria-label="Bildirimler"
                className="relative w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary ring-2 ring-white"></span>
                )}
              </button>

              <button
                onClick={onProfileClick}
                aria-label="Profil"
                className="w-8 h-8 ml-0.5 rounded-full ring-1 ring-slate-200 overflow-hidden shrink-0 cursor-pointer hover:ring-secondary transition-all active:scale-95"
              >
                <img
                  alt="Selin Ela Karaca"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKWR81DQsKBecXoAGvhEhSon_3jHftRyOFm4_zttmOa3u9HuCMu9gi6VF0MWoKWIA17C0Qeb9Y8ePAYHAKlpWtJlQaEX89McfOlVsyEIVneKmXZYcOQ0KEpS_0_76IiasV3LV6FeaErFyMPm9-WWe771fQMJsLNHyOtnYkFQ-YK2xyWM60xKFMTYu1jRr_b4FOmJ2SlWZ4iU9-RE-yeh2zWJjgKGFI5mOWBlwc-NyHKnIitfRHwIk8Pg"
                />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
