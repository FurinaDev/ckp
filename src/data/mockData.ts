export interface Opportunity {
  id: string;
  title: string;
  institution: string;
  institutionVerified: boolean;
  institutionLogo?: string;
  category: 'grant' | 'stage' | 'call' | 'residency' | 'service';
  discipline: string;
  location: string;
  budgetOrFee: string;
  budgetType?: string; // '/ Proje', '/ Dinleti', '/ Dönem'
  deadlineText: string;
  daysRemaining: number;
  description: string;
  tags: string[];
  imageUrl: string;
  isBookmarked?: boolean;
  featured?: boolean;
  matchScore?: number;
  // Detail-specific fields
  quota?: string;
  format?: string;
  aboutDetails?: string;
  requirements?: string[];
  benefits?: { title: string; desc: string; icon: string }[];
  coordinator?: {
    name: string;
    role: string;
    avatar: string;
    verified: boolean;
  };
}

export interface CommunityHub {
  id: string;
  name: string;
  verified: boolean;
  membersCount: number;
  activeStatus: string;
  avatar: string;
  isJoined: boolean;
  category: string;
  isManaged?: boolean;
  roleBadge?: string;
  channels: {
    id: string;
    name: string;
    icon: string;
    lastMessage: string;
    timeOrDate: string;
    unreadCount?: number;
    isPrivate?: boolean;
    requiredApproval?: boolean;
  }[];
}

export interface DirectMessageThread {
  id: string;
  name: string;
  roleBadge: string;
  isCurator?: boolean;
  isGroup?: boolean;
  avatar: string;
  isOnline: boolean;
  verified: boolean;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isContractNotice?: boolean;
  contractStatus?: 'pending' | 'accepted' | 'escrow_locked';
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  category: 'contract' | 'application' | 'call' | 'system';
  isUnread: boolean;
  icon: string;
  actionLabel?: string;
  targetId?: string;
}

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'bks-2025',
    title: '2025–2026 Çağdaş Müzik & Sahne Sanatları Geliştirme Bursu',
    institution: 'Borusan Kültür Sanat',
    institutionVerified: true,
    institutionLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeNrCBVzcpPqkB7wHvR4nBmxt859e0z8Ue_TVEgxDVkXdT99LTu9zfnJlwKMyjhKce4Ai8rqDcPu3f_RgvHj7fQ9WBx9nrAU-6wkjzqoyVvuZsb_lilD3Feb5Rx4R6PlCbda3K6dFaYPT0FxMA3maLhYMi3xOup1TRvMSxmbAROhbefxT3leZCp41GRGePZ-oFuy4mMSq4w6nMCuylGCeXeHWCtLvvc-aXwtPsQBhLliw7oiTGrvzSaw',
    category: 'grant',
    discipline: 'Müzik & Sahne',
    location: 'Hibrit / İstanbul',
    budgetOrFee: '60.000 ₺',
    budgetType: 'Üretim desteği',
    deadlineText: '15 Mayıs 2025',
    daysRemaining: 12,
    description: 'Türkiye’de çağdaş klasik müzik, ses enstalasyonu ve disiplinlerarası sahne sanatları alanlarında özgün üretim yapan icracılara, bestecilere ve genç ensemble topluluklarına doğrudan destek.',
    tags: ['#ÇağdaşMüzik', '#SesTasarımı', '#Enstalasyon', '#Kompozisyon'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_AIr22Jq9Qgv3_GWQpcyumbh9OKikxULaaTog6XOVDIB_qaWr-CTo1UCrouz2ZnN0Zu5eeTpkH7_Am1bcvq3MenVSM4RWqWfuNAeISxlcIj17syqUYsn4lEW7QswL5SHBnBjwk7LubaxKOuSppQ9pBoJz0slKGhDty1FPLaOxg4eMFHJkcEdnsVhqEbt_wf9fgpRtDVPy9RsRP_pSuDNWssSZYSct7-TdvyE3cJxaPayqXefUgcifSA',
    featured: true,
    matchScore: 88,
    quota: '8 Sanatçı',
    format: 'Hibrit / İstanbul (Stüdyo + mentor)',
    aboutDetails: 'Seçilen 8 sanatçıya 60.000 ₺ üretim fonunun yanı sıra 6 aylık masterclass, Borusan Müzik Evi stüdyo provası ve profesyonel ses kayıt olanağı tahsis edilir.',
    requirements: [
      'Konservatuvar, GSF mezuniyeti veya bağımsız olarak en az 2 yıl aktif sahne / bestecilik icra kaydı bulunması.',
      'Son 18 ayda icra edilmiş 2 adet canlı performans videosu gizli linki (YouTube/Vimeo) ve dijital portfolyo özeti.',
      'Sanatsal Niyet Mektubu (Maks. 600 Kelime) - Burs süresince hayata geçirilecek projenin kavramsal omurgası.'
    ],
    benefits: [
      {
        title: 'Borusan Müzik Evi Stüdyo Erişimi',
        desc: 'Akustik prova stüdyolarında ayda 30 saate kadar ücretsiz kullanım ve profesyonel ekipman desteği.',
        icon: 'podium'
      },
      {
        title: 'Dijital Albüm & Basın Tanıtımı',
        desc: 'cagdasmuzik.com ekosistemi ve ulusal kültür-sanat basınında editoryal röportaj ve görünürlük alanı.',
        icon: 'language'
      },
      {
        title: 'Sene Sonu Galası Canlı Sahne',
        desc: 'Dönem sonunda tüm bursiyerlerin yeni bestelerini icra edeceği canlı gala konseri ve kayıt hakkı.',
        icon: 'theater_comedy'
      }
    ],
    coordinator: {
      name: 'Leyla Deren Aksoy',
      role: 'Burs & Sanatçı Koordinatörü',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwGvQ-JVDM8aV1_bNgpz235ncn0qrW0GPwYZhgARREsLpreqMHPRgwyCsE_AnuMCWzqZxpO5hs1Qvhn8PcryZPXMtiYQsecwoFPEmh5hSY_c57H4-6yU2DO-LMa_nUlt6_OzFnt-I2zPGjNcEnvABCrvCd3fo4tn2VRfJw0MC0MqGAqouFK4N5q_Ab4mripgUnJeqM4ywTVbmT6-I-fHzvyciCRXhgO7h1Na_YQuuiymJWixvzTzja2A',
      verified: true
    }
  },
  {
    id: 'iksv-hibe-2025',
    title: '2025 Bağımsız Sanatçı Hibe Programı',
    institution: 'İKSV & Kültür Fonu Ortaklığı',
    institutionVerified: true,
    category: 'grant',
    discipline: 'Görsel Sanatlar',
    location: 'İstanbul / Ulusal',
    budgetOrFee: '75.000 ₺',
    budgetType: 'Destek',
    deadlineText: '28 Kasım 2025',
    daysRemaining: 5,
    description: 'Görsel sanatlar alanında üretim yapan bağımsız sanatçıların yeni proje, araştırma ve materyal giderlerini karşılamak amacıyla açılan hibe dönemi.',
    tags: ['Hibe', 'Görsel Sanat', 'Proje Fonu'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxuqcn4NvQrxwvXeSIpkJf8Kqg-Vx8lUFEeYPGZ8aQuVLiPPPJvZnTKLpkolif-BhqyfroUq8nnxXC1ZF8gdYdO2_Lkxsd2vN_y-OQYbpay2FHaIlFnA4UVbbIT7YwxntkeeP79gOum5dVGskA6smaD_HXFwXs89sLWJGCUlyXdqyZum69h4I3JVT3bCAVQwVUMLaG-4M13NSq5ftPUr0ooi1vRiRtJiPpIbJC9P7O64P8_MGEFr-ddw',
    featured: true,
    matchScore: 92
  },
  {
    id: 'arter-ses-2025',
    title: 'Çağdaş Müzik & Ses Enstalasyonu Açık Çağrısı',
    institution: 'Arter İnisiyatifi • Dolapdere',
    institutionVerified: true,
    category: 'call',
    discipline: 'Ses Sanatı & Enstalasyon',
    location: 'Dolapdere, Beyoğlu',
    budgetOrFee: '12.000 €',
    budgetType: 'Prodüksiyon Fonu',
    deadlineText: '20 Aralık 2025',
    daysRemaining: 18,
    description: 'Deneysel akustik ve mekânsal ses düzenlemeleri üzerine çalışan besteci ve ses tasarımcıları için yeni sergileme ve üretim platformu.',
    tags: ['Açık Çağrı', 'Ses Enstalasyonu', 'Uluslararası Jüri'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN3T451Tafu9CXfW5zMfreNh2mRWsl75bmiW1rpgodHD-Wx1xdPEzR3e1dKEseQk69SlG4Thj-7bdqo9UCu-vjJgoK8qY6WetCnGHe_P_rCLobc49BMZl9OpabPUk5m-7NxzzoTTy_Z8d1Com20b8aP93L-8skH4zEguEcyJCZeAQOdrG2rIG5emx42vun4Dh3_DNwhJHcrWRT8wAJZ32DTMGK2K3YbWrGc6ESfjZGBloNCNmBxYdJ-A',
    matchScore: 84
  },
  {
    id: 'marmara-duo',
    title: 'Haftalık Akustik Performans & Dinleti İçin Flüt/Gitar & Viyolonsel',
    institution: 'The Marmara Art Lounge',
    institutionVerified: true,
    category: 'stage',
    discipline: 'Klasik & Oda Müziği',
    location: 'Taksim, İstanbul',
    budgetOrFee: '7.500 ₺',
    budgetType: '/ Dinleti (Kaşe Usulü)',
    deadlineText: 'Her Hafta Çarşamba & Cuma',
    daysRemaining: 3,
    description: 'Salı ve Cuma akşamları fuaye alanında icra edilecek Barok, Neo-klasik ve Akdeniz repertuvarına hakim profesyonel oda müziği ikilisi aranmaktadır.',
    tags: ['Düzenli Sahne', 'Kaşeli', 'Taksim'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4QfgTe8WgLqth5_TML-rmD12RuzTdvlFqGR4qCdZ23JB5OctK2J_5uGdvLJcm_qRmpEg3Zly1J16mcK06mdVBOEMShlFzVagJYIwYy6fFXI0yGbAznzNBU1qk2w6AEjZiDA5-Kz8wUrv5AcAC4syK28j1J_m6SmGnuKE8q1gg1gnTHCpqYZAe0sdo2To5aC_oYgfHOXG06bRRbzuSqTftTKnGoypmLWbJ7BKgMOn3-msqSc85KCJkvw',
    featured: true
  },
  {
    id: 'depo-barin-han',
    title: 'Küratöryel Araştırma & Rezidans Bursu',
    institution: 'Depo & Barın Han İş Birliği',
    institutionVerified: true,
    category: 'residency',
    discipline: 'Küratörlük & Arşiv',
    location: 'Tarihi Yarımada, İstanbul',
    budgetOrFee: '3 Ay Tam Burslu',
    budgetType: 'Konaklama + Harçlık',
    deadlineText: '15 Kasım 2025',
    daysRemaining: 14,
    description: 'Tarihi Yarımada’nın kentsel hafızasına odaklanan araştırmacılar için arşiv erişimi, atölye desteği ve aylık konaklama bursu.',
    tags: ['Rezidans', 'Arşiv', 'Küratörlük'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqnfU8g-sM4hUm5xikYLzScuvu3STteiaaKYZdtBsfVZ12GpRdNoGFyrT3waU0r7CpuFHIKswouBnwdsSHxr9JSztEF30cvJKnEIEv5sruQ632-Eh-_Rrr9wDOHzcd6I7sWmCbo0urWj0SDNYiTaq0BLsE7uFivD_RMk-GjibzBi6tGGs6SpWfqewOUMqmkqnrPN3SAU06gS2AAfSz37wmNARIlbHeB2utby0gIOLYth6aoHzJz8nHvA'
  },
  {
    id: 'cermodern-heykel',
    title: '3. Heykel ve Mekansal Yerleştirme Açık Çağrısı',
    institution: 'CerModern Çağdaş Sanat',
    institutionVerified: true,
    category: 'call',
    discipline: 'Heykel & Yerleştirme',
    location: 'Sıhhiye, Ankara',
    budgetOrFee: 'Ödüllü Seçki',
    budgetType: 'Katalog + Sergi',
    deadlineText: '10 Kasım 2025',
    daysRemaining: 10,
    description: 'Kamusal alan heykelleri ve açık hava yerleştirmeleri için 35 yaş altı sanatçılara açık ulusal jürili sergi.',
    tags: ['Açık Çağrı', 'Heykel', 'Katalog Basımı'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgzHivTVKZm--Fqcbci-hicuaO6Hhh5PK0Ox-ZgsDV4xZldwhx9VeXlOJCi9f3yYEQ7S-xuD8fhjqfj8D00O4cbTB7B-3XpNPfv8tU-pCmbZRywhurkkiw9RcoWHmgEvglcHJIq_EpmNmRDkQMrkCeU-CBiiv2pCq25gve9lni6yNrT-cJyixXeAYbbB1-YbL-prDccy6UJecbEWKpcCOWSxSi3CFuih9_tzX11LEscrd5bd4QPV8sCg'
  }
];

export const INITIAL_COMMUNITIES: CommunityHub[] = [
  {
    id: 'tbma',
    name: 'Türkiye Bağımsız Müzisyenler Ağı',
    verified: true,
    membersCount: 1420,
    activeStatus: '3 dk önce aktif',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI64yhlxn1K4bMqlSAXq1AkAOFVGjFAaEHM4w7Zhd9KJEpmQWtPvBH0mlMC5qaFBIPR8_zNt15ClCWhz5KjkxfUBKuYT2F-fhQdSjIeQ0vYw9HiRXcowgKQEvgVYlABMqeweOUlVLka1CrCbqKACV6tRtUPkVY6lTdjXdUdaGklNTGjtuwNn0kKCX4exkJeP1dLENVhDLtpge-hURmHuLdcstKkh4BSwND6d2cx-XwfzeIUbXdpza10w',
    isJoined: true,
    category: 'Müzik & Sahne',
    channels: [
      {
        id: 'c1',
        name: '#Genel-Duyurular',
        icon: 'campaign',
        lastMessage: 'Yeni: 2025 Yaylı Çalgılar sonuçları açıklandı ve listeler askıya...',
        timeOrDate: '11:20',
        unreadCount: 2
      },
      {
        id: 'c2',
        name: '#Sahne-ve-Grup-Arkadaşı',
        icon: 'forum',
        lastMessage: 'Barok oda müziği için viyola ve çello arayışımız sürüyor.',
        timeOrDate: '14:28'
      },
      {
        id: 'c3',
        name: '#Telif-ve-Sözleşmeler',
        icon: 'gavel',
        lastMessage: 'Dijital kaşe ve güvenli havuz standart rehberi yayınlandı.',
        timeOrDate: 'Dün'
      }
    ]
  },
  {
    id: 'iksv-genc',
    name: 'İKSV Genç Sanatçılar Komünü',
    verified: true,
    membersCount: 148,
    activeStatus: '12 dk önce aktif',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeNrCBVzcpPqkB7wHvR4nBmxt859e0z8Ue_TVEgxDVkXdT99LTu9zfnJlwKMyjhKce4Ai8rqDcPu3f_RgvHj7fQ9WBx9nrAU-6wkjzqoyVvuZsb_lilD3Feb5Rx4R6PlCbda3K6dFaYPT0FxMA3maLhYMi3xOup1TRvMSxmbAROhbefxT3leZCp41GRGePZ-oFuy4mMSq4w6nMCuylGCeXeHWCtLvvc-aXwtPsQBhLliw7oiTGrvzSaw',
    isJoined: true,
    isManaged: true,
    roleBadge: 'Yöneticisin',
    category: 'Akademi & Hibe',
    channels: [
      {
        id: 'c4',
        name: '#Resmi-Duyurular-Burs',
        icon: 'campaign',
        lastMessage: 'Borusan ve İKSV ortak burs takvimi kesinleşti.',
        timeOrDate: '11:20',
        unreadCount: 1
      },
      {
        id: 'c5',
        name: '#Genç-Solistler-Sohbet',
        icon: 'forum',
        lastMessage: 'Ece (Viyola): Viyana vize randevusu için tecrübesi olan var mı?',
        timeOrDate: 'Dün'
      }
    ]
  },
  {
    id: 'tiyatro-agi',
    name: 'İstanbul Bağımsız Tiyatrolar Ağı',
    verified: true,
    membersCount: 86,
    activeStatus: '45 dk önce aktif',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsEPf9-wwQSC0SctuXR_nz9wsGDQwf1QOPbbsfTgY_zi3wB9x7cTN2HN52aupS4avaQm2xvn_CYjqAPfOPMXqJIHZmffp0hNj7hX-SjxzxLnPp9jIuXyCG5GpAyIw2ziYPH-lwEzcZKV5a4QPA0Ytfy43obPA4VhJeXgc6jMUL-Om2I4bAtE0I3woeP0CEJ_g2jz92ItO4ZSNErpv0ZuyyEciD6kExz6G0fwLeNOrHIezQAWQ7lHyn_w',
    isJoined: true,
    category: 'Tiyatro & Sahne',
    channels: [
      {
        id: 'c6',
        name: '#Ortak-Takvim-Sahne-Değişimi',
        icon: 'meeting_room',
        lastMessage: 'Duyuru: Kadıköy sahnesi Salı akşamı 19:00 için boşaldı...',
        timeOrDate: 'Çarşamba',
        unreadCount: 3
      }
    ]
  },
  {
    id: 'kuratorler',
    name: 'Çağdaş Küratörler & Mekan İnisiyatifi',
    verified: true,
    membersCount: 620,
    activeStatus: '5 dk önce aktif',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsFni_6b_HBdV0nDC72OLZc-RY5TN4FCsn6vxKCmzC12hKf02nZUblZrt9kGsiWFI3B6ycd_EpM_iWYDf59TR1anNvof5N7o-E5839EO6BkxIFfNDdgYv9wAwX-38xU7NBIL-NejiNhr_jn60wpJe---CwY5nzQ7i1HhI9Q5GsDy3CSPUAxThKbFb6UJmLYOR51mlfyp9Rt9Q1qVX3XTu_Q6DNsK0GUBgDf4Nsqby94ieM6mf2nYTCZQ',
    isJoined: false,
    category: 'Görsel Sanatlar',
    channels: [
      {
        id: 'c7',
        name: '#Açık-Sergi-Çağrıları',
        icon: 'art_track',
        lastMessage: 'Barın Han yeni küratöryel çağrı metni onaylandı.',
        timeOrDate: '09:12',
        unreadCount: 5
      },
      {
        id: 'c8',
        name: '#Galeri-ve-Mekan-Paylaşımı',
        icon: 'domain',
        lastMessage: 'Moda ve Pera atölye değişim programı.',
        timeOrDate: 'Dün'
      }
    ]
  },
  {
    id: 'otel-kultur',
    name: 'Otel & Kültür-Sanat Direktörleri',
    verified: true,
    membersCount: 310,
    activeStatus: '1 saat önce aktif',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ENrjsGcncZ3NrTs5Da6TO5kMpbSNKdkTbLvq9TcwdYWNtlcv0pxNXv8kvbivxW40KAGBCVglkIBl6cFBVWvt1x5lRCX0T3-Zsk3sWyAiv041ct3oCGjEIl-dc_MJZML1Spqpq5YjFwEqIuD_i6gAdIw3mZCUaKmQMstyhKZkG9qVmVvVxcFzXGGDxpZ0k3UZ4gjdlZC46WlmjmdX_q7v1IvHh6iAPBHdVuB0vUhScjVZncmm9xNjEA',
    isJoined: false,
    category: 'Kurumsal',
    roleBadge: 'Kurumsal',
    channels: [
      {
        id: 'c9',
        name: '#Kürasyon-Talepleri (Özel Kanal)',
        icon: 'lock',
        lastMessage: 'Haftalık akustik fuaye performans talepleri ve kaşe eşleşmeleri.',
        timeOrDate: '14:15',
        isPrivate: true,
        requiredApproval: true
      }
    ]
  }
];

export const INITIAL_DIRECT_MESSAGES: DirectMessageThread[] = [
  {
    id: 'marmara-pera-chat',
    name: 'The Marmara Pera Sanat',
    roleBadge: 'Kaşeli İlan',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmr9Y91qLP4qDY4NLwaM1MyUrDiSb2Qu5qNMWvRPzB5JyC2wflVjFm513wtRDroCGYdb3nW3gDqt19C734zi_KBv6RshtMC5ozqCuvShmqfOY4Z9fMRq3fy_MJfwbB3H01Cm6fpY_Pds2zoJrcsMzNaC1YosplCk3fhICImX_ouKYGo8CP9iJsB1ikIPoCmcG7Da7LbJL9U8F70FRRkfNY8r9TH1WZqZwHLqEVWjlB_3C3L55sQIWUag',
    isOnline: true,
    verified: true,
    lastMessage: 'Sözleşme taslağını ekte iletiyoruz, kaşe blokesi sağlandı.',
    time: '14:15',
    isContractNotice: true,
    contractStatus: 'pending'
  },
  {
    id: 'mehmet-can-chat',
    name: 'Mehmet E. Can',
    roleBadge: 'Küratör',
    isCurator: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS_5skqOLkTfzQY0p81VNdKX4jV_l4zCb4R6Bu32ioiBfxhPBJBQ3B-Q3KxAXS0co2tBuo_sLaViK8PoI4gu7LLO-zvh2j2Hj7ITr-4dBwyi6R3MB8hJB5oeJAcdOS5AMNASqdw6cxRAJBCiybvfi81u-JHAwMVXL9GsctYKKqhVx3RPtsz7rjwgaXU7M3b9uCnwK4Ta6ncwcnhNWiy_InM1B4-hEBB5pqEV0YMCHaW_rsSkUu66zyNA',
    isOnline: true,
    verified: true,
    lastMessage: 'Bienal seçki metnini inceledim, revizyon notlarım hazır.',
    time: '12:40',
    unreadCount: 2
  },
  {
    id: 'moda-quintet-chat',
    name: 'Moda Oda Müziği Quintet',
    roleBadge: 'Grup (5)',
    isGroup: true,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrGrcYcKbo7sb4NSuBeV2QXQfDtL4nHX88Jtwp6hM3lMQvFQbMfawY659FdhU9CTUe2KUb1bu6SAWl-MRuQJOfcW9eG10kyhNE63_tFXH5SUUiYy4pNdSLyXO9CBW1j3PR5IsuyyfwrX5-vQNXjuGmjcyBXPcnXRk8-cjDY09pX2YT1yRbsCnG6P1S64VdkYrEOJWvU7kX0n6UsckAjtb03iDF4cd3v7q-f2lZWvXMXhd6bQ9it9505Q',
    isOnline: false,
    verified: false,
    lastMessage: 'Selin (Flüt): Notaları Google Drive klasörüne yükledim.',
    time: 'Dün'
  },
  {
    id: 'borusan-koordinasyon',
    name: 'Borusan Sanat Koordinasyonu',
    roleBadge: 'Kurumsal',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCEfjgRNXiMk8ZpvIco3fVgPXdhWsFZuppIXWBLvtdaMvN-Yw823swA-OZLfcTY45mgVoFBmErTB8aoBkzDXbOfU1iJRkPsEiLtIX6YsZdnWxnakRBN2A1HoCO0MwROqYQoeG5rrHGIKiv14HkIuVgh8PV2mTLGHyvsxVSO3U1Uj87fGVYqGZNdJnHKaeRWGuOFVvydhJo2dribtl4_hiEcl7xAyEtG8_a39J0QbnKfl7PUE5njSpX0Q',
    isOnline: false,
    verified: true,
    lastMessage: 'Masterclass katılım teyidiniz alınmıştır. Prova takvimi...',
    time: 'Pazartesi'
  },
  {
    id: 'cermodern-kurator',
    name: 'CerModern Küratör Ofisi',
    roleBadge: 'Kurumsal',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgzHivTVKZm--Fqcbci-hicuaO6Hhh5PK0Ox-ZgsDV4xZldwhx9VeXlOJCi9f3yYEQ7S-xuD8fhjqfj8D00O4cbTB7B-3XpNPfv8tU-pCmbZRywhurkkiw9RcoWHmgEvglcHJIq_EpmNmRDkQMrkCeU-CBiiv2pCq25gve9lni6yNrT-cJyixXeAYbbB1-YbL-prDccy6UJecbEWKpcCOWSxSi3CFuih9_tzX11LEscrd5bd4QPV8sCg',
    isOnline: false,
    verified: true,
    lastMessage: '3. Heykel Açık Çağrısı dosyanız jüriye iletildi.',
    time: '12 Eki'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Kaşe Bedeli Bloke Edildi',
    description: 'Haftalık Akustik Resital için 31.500 ₺ kaşe bedeli güvenli havuza aktarıldı.',
    time: '12 dk önce',
    category: 'contract',
    isUnread: true,
    icon: 'account_balance_wallet',
    actionLabel: 'Havuz Detayı'
  },
  {
    id: 'n2',
    title: 'Sözleşme Onaylandı',
    description: 'Selin Ela Karaca, sahne standartları sözleşmesini dijital olarak imzaladı.',
    time: '1 saat önce',
    category: 'contract',
    isUnread: true,
    icon: 'draw',
    actionLabel: 'E-İmza Doğrulandı'
  },
  {
    id: 'n3',
    title: 'İkame Sanatçı Başvurusu',
    description: 'Bu akşamki Acil Viyolonsel İkame çağrınıza 2 doğrulanmış sanatçı uygunluk bildirdi.',
    time: '3 saat önce',
    category: 'application',
    isUnread: true,
    icon: 'hourglass_top',
    actionLabel: '2 Adayı Gör'
  },
  {
    id: 'n4',
    title: 'Yeni Hibe Çağrısı Eşleşmesi',
    description: 'Profilinizdeki Oda Müziği disipliniyle eşleşen yeni bir İKSV Genç Sanatçı Fonu yayınlandı.',
    time: 'Dün, 16:40',
    category: 'call',
    isUnread: false,
    icon: 'workspace_premium',
    actionLabel: 'İncele'
  },
  {
    id: 'n5',
    title: 'Portfolyo İncelemesi',
    description: 'Arter Ses Enstalasyonu jürisi ön değerlendirmesini tamamladı.',
    time: '2 gün önce',
    category: 'application',
    isUnread: false,
    icon: 'verified',
    actionLabel: 'Sonuç Sayfası'
  }
];

export const UPCOMING_EVENTS = [
  {
    id: 'ev-1',
    day: '24',
    month: 'EKİM',
    title: 'Piyano & Viyolonsel Masterclass Serisi',
    discipline: 'Müzik Masterclass',
    venue: 'Kadıköy Moda Sahnesi • Büyük Salon',
    time: '14:00 - 18:30',
    price: 'Ücretsiz (Kayıtlı)',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ0LADWORWOiHPpoG12MyELYyYezc38mQYOVDLCFeSzW_tdzUpcOSn1QvTc9Dq_KP-0dptETPasmLUFQ-eM0hygmhDVmCh7Z660xcAr7M1R56Ev5NAZRrm__n5lu8aOKkznbKACbJZxnFwKBhWsh_-z7DOZOwSLEF8yUyxJOzgG_W_oGgbvdLPrw6os4ItW8NuOPa3jHScWAhelb-sga5Pd4xp04qMhLYnV8JBvXI3CuhkrI6zn60fYA',
    description: 'Prof. Dr. Ayşe Yılmaz rehberliğinde oda müziği dinamikleri, partisyon analizi ve çağdaş icra teknikleri üzerine yoğun seminer.'
  },
  {
    id: 'ev-2',
    day: '28',
    month: 'EKİM',
    title: 'Bileşik Sanatlar Karma Sergisi Açılışı',
    discipline: 'Görsel Sanatlar',
    venue: 'Galeri Beyoğlu • İstiklal Cad. No: 142',
    time: 'Kokteyl Açılış • 19:00',
    price: 'Küratör Turu Dahil',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkTrhOzZOh6tXZt8BIJfPljAVwihT77X2hhVbKgDydvQOJelmL_lbJOuvnqjdWMSkIA023Ko6cEJdNPILUuWdezLksJZtEA4xZY99p6YFTG8pK0907rDyBJPUbZPuSh1xtY88lZjGIUYeVXOjlhmPRJu9kw1jeChb2jom_OmgnUiAJtjPCNQ-2PAn3MYB2zrrcMR_1XHrM3sb50JbXh5FHFF3kJAnhKfTmDAp2JAH3XfgKVcSUcQK_1g',
    description: 'On iki bağımsız genç sanatçının heykel, video enstalasyonu ve yağlıboya üretimlerini bir araya getiren küratöryel seçki.'
  }
];

export const JURY_MEMBERS = [
  {
    name: 'Prof. Cihat Alpay',
    role: 'Kompozisyon Kürsü Başkanı',
    title: 'Başkan',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvfcLEMnWfC5LOAqF_1GxpRQnYwIGpo-qzt7M5GSQLm6h0O7-svaZGcFqqpq4rXzsVoL7byVOZgO1gRsPlURP6A7E_2kku2eh7VaX7ZHrNaxrLdx89PpZZSKU79FPdk2tKUl0Kz_bQKaojUgukl5Tk-wOHRvtgZrI6rNmBdaG6oUtW7gHbyov-XZmVTVG0MCHSSW8uumirOcYF_INU5ynbvwGysSeI8updZyU7Dc2ZSDkRYi1FcL2Skg'
  },
  {
    name: 'Dr. Melike Sun',
    role: 'Şef & Orkestra Direktörü',
    title: 'Üye',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxBVoSO48qRMxe3dc320aYgHGDqs_r-vgHOIjGfO2FVeOJObQdi2QoT9GZ55dOHRB1H43gvs8r8FvqOv2HgfpJGnLKbRbZ8e6MNbXP1L8BrIs3V_NqYSzcrLy79Xq8knH256_otDGLoBVbfPicJZ-jycoUo4F8atzEP_hR7zu0_R98s3gcZdDxZMJOA4x5A0241uT7UDZxFGXkzo5jel7h1j1bBtV2xF2f5bOrQxOknK4Vjdze1s3QQ'
  },
  {
    name: 'Emre Erkin',
    role: 'Elektronik Müzik Prodüktörü',
    title: 'Üye',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoYscUt5Q8GaqTzrPe9COTghsyUOFY8Q2Po4JIptjG161SsIXXc1QcAf4tdHi8QA9Lx7ZiqmzQVamHsyE2Nvx-Ay-82JBfyo6mWB4TjakO4fegADkuJllG7Ac3lhP4UpguwxbSkMGkbGP4C4bEdwVJ_kvK9qWsbvZf2Up0twbih9OKC0TWRU4z2z6n_oIK_m2c6Ry_9npNeKwxo6CWjCMjEjA04DKSJdR__9XYLXEtjOpvxs4I5TUb6w'
  }
];
