import React, { useState } from 'react';
import { Opportunity } from '../data/mockData';

interface ModalNewPostProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newOpp: Opportunity) => void;
}

export const ModalNewPost: React.FC<ModalNewPostProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [institution, setInstitution] = useState('Kadıköy Sahne Kolektifi');
  const [category, setCategory] = useState<'grant' | 'stage' | 'call' | 'residency'>('stage');
  const [discipline, setDiscipline] = useState('Müzik & Sahne');
  const [location, setLocation] = useState('İstanbul / Kadıköy');
  const [budgetOrFee, setBudgetOrFee] = useState('8.500 ₺');
  const [description, setDescription] = useState('');
  const [deadlineText, setDeadlineText] = useState('30 Kasım 2025');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Lütfen başlık ve açıklama alanlarını doldurunuz.');
      return;
    }

    const created: Opportunity = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      institution: institution.trim(),
      institutionVerified: true,
      category,
      discipline,
      location: location.trim(),
      budgetOrFee: budgetOrFee.trim(),
      budgetType: category === 'stage' ? '/ Dinleti' : 'Destek',
      deadlineText,
      daysRemaining: 15,
      description: description.trim(),
      tags: ['Yeni Çağrı', discipline.split(' ')[0]],
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ0LADWORWOiHPpoG12MyELYyYezc38mQYOVDLCFeSzW_tdzUpcOSn1QvTc9Dq_KP-0dptETPasmLUFQ-eM0hygmhDVmCh7Z660xcAr7M1R56Ev5NAZRrm__n5lu8aOKkznbKACbJZxnFwKBhWsh_-z7DOZOwSLEF8yUyxJOzgG_W_oGgbvdLPrw6os4ItW8NuOPa3jHScWAhelb-sga5Pd4xp04qMhLYnV8JBvXI3CuhkrI6zn60fYA',
      quota: '1 Sanatçı / Topluluk',
      format: 'Yüz Yüze'
    };

    onSubmit(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-3">
      <div className="w-full max-w-sm bg-white rounded-2xl p-4 flex flex-col gap-3 shadow-2xl border border-surface-container-high animate-in fade-in duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[20px]">add_circle</span>
            <h3 className="font-bold text-sm text-primary">Yeni Çağrı & İlan Aç</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Kapat"
            className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-primary"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase text-outline">İlan / Çağrı Başlığı</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Akustik Keman & Piyano Duo Sahne Çağrısı"
              className="h-9 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase text-outline">Kategori</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="h-9 px-2 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none"
              >
                <option value="stage">Sahne & Kaşeli</option>
                <option value="grant">Burs & Hibe</option>
                <option value="call">Açık Çağrı</option>
                <option value="residency">Rezidans & Stüdyo</option>
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase text-outline">Bütçe / Kaşe</span>
              <input
                value={budgetOrFee}
                onChange={(e) => setBudgetOrFee(e.target.value)}
                placeholder="Örn: 8.500 ₺"
                className="h-9 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase text-outline">Kurum / İnisiyatif</span>
              <input
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="h-9 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase text-outline">Şehir / Lokasyon</span>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-9 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase text-outline">Açıklama & Gereksinimler</span>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Repertuar standartları, dinleti tarihleri ve aranan nitelikleri yazın..."
              className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none resize-none"
              required
            ></textarea>
          </label>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-9 rounded-xl bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="flex-1 h-9 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-orange-700 shadow-xs active:scale-95"
            >
              Yayınla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
