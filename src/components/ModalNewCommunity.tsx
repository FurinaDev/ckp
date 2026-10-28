import React, { useState } from 'react';
import { CommunityHub } from '../data/mockData';

interface ModalNewCommunityProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newHub: CommunityHub) => void;
}

export const ModalNewCommunity: React.FC<ModalNewCommunityProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Müzik & Sahne Sanatları');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCommunity: CommunityHub = {
      id: `comm-${Date.now()}`,
      name: name.trim(),
      verified: true,
      membersCount: 1,
      activeStatus: 'Şimdi aktif',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsEPf9-wwQSC0SctuXR_nz9wsGDQwf1QOPbbsfTgY_zi3wB9x7cTN2HN52aupS4avaQm2xvn_CYjqAPfOPMXqJIHZmffp0hNj7hX-SjxzxLnPp9jIuXyCG5GpAyIw2ziYPH-lwEzcZKV5a4QPA0Ytfy43obPA4VhJeXgc6jMUL-Om2I4bAtE0I3woeP0CEJ_g2jz92ItO4ZSNErpv0ZuyyEciD6kExz6G0fwLeNOrHIezQAWQ7lHyn_w',
      isJoined: true,
      isManaged: true,
      roleBadge: 'Yöneticisin',
      category,
      channels: [
        {
          id: `c-genel-${Date.now()}`,
          name: '#Genel-Duyurular',
          icon: 'campaign',
          lastMessage: 'Topluluk başarıyla oluşturuldu. İlk duyurunuzu paylaşın.',
          timeOrDate: 'Şimdi',
          unreadCount: 1
        },
        {
          id: `c-sohbet-${Date.now()}`,
          name: '#Topluluk-Sohbeti',
          icon: 'forum',
          lastMessage: 'Yeni üyeler katıldıkça burada tanışabilirsiniz.',
          timeOrDate: 'Şimdi'
        }
      ]
    };

    onSubmit(newCommunity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-3">
      <div className="w-full max-w-sm bg-white rounded-2xl p-4 flex flex-col gap-3 shadow-2xl border border-surface-container-high animate-in fade-in duration-200">
        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">group_add</span>
            <h3 className="font-bold text-sm text-primary">Yeni Topluluk Başlat</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Kapat"
            className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-primary"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-xs text-on-surface-variant leading-relaxed font-normal">
          Kültür-sanat kolektifiniz veya kurumunuz için alt kanallara ve kaşeli sözleşme desteğine sahip bir topluluk ağı oluşturun.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase text-outline">Topluluk Adı</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Örn: Akdeniz Çağdaş Müzik Topluluğu"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase text-outline">Kategori</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-9 px-2 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none"
            >
              <option value="Müzik & Sahne Sanatları">Müzik & Sahne Sanatları</option>
              <option value="Görsel Sanatlar & Sergi">Görsel Sanatlar & Sergi</option>
              <option value="Sanat Akademisi & Eğitim">Sanat Akademisi & Eğitim</option>
              <option value="Kurumsal / Mekan & Festival">Kurumsal / Mekan & Festival</option>
            </select>
          </label>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-9 rounded-xl bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 h-9 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-xs active:scale-95"
            >
              Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
