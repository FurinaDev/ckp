import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterOpportunities,
  calculateEscrowProtection,
  formatDeadlineWarning,
  formatCurrencyTRY,
  type OpportunityItem
} from './cultureLogic.ts';

const mockItems: OpportunityItem[] = [
  {
    id: '1',
    title: '2025 Genç Sanatçı Lisansüstü Müzik Bursu',
    institution: 'İKSV & Konservatuvar Derneği',
    category: 'grant',
    discipline: 'Klasik Müzik',
    location: 'İstanbul / Uluslararası',
    budgetOrFee: '45.000 ₺',
    deadlineText: '15 Mayıs 2025',
    daysRemaining: 12,
    description: 'Klasik icra ve kompozisyon desteği.',
    tags: ['Burs', 'Müzik']
  },
  {
    id: '2',
    title: 'Haftalık Akustik Performans & Dinleti',
    institution: 'The Marmara Art Lounge',
    category: 'stage',
    discipline: 'Oda Müziği',
    location: 'Taksim, İstanbul',
    budgetOrFee: '7.500 ₺',
    deadlineText: '20 Mayıs 2025',
    daysRemaining: 2,
    description: 'Flüt ve çello duo için fuaye konseri.',
    tags: ['Sahne', 'Kaşe']
  },
  {
    id: '3',
    title: 'Geçmiş Çağrı',
    institution: 'Eski Sergi',
    category: 'call',
    discipline: 'Heykel',
    location: 'Ankara',
    budgetOrFee: '10.000 ₺',
    deadlineText: '1 Ocak 2024',
    daysRemaining: 0,
    description: 'Süresi dolmuş çağrı.',
    tags: ['Arşiv']
  }
];

test('filterOpportunities filters by query correctly', () => {
  const result = filterOpportunities(mockItems, 'konservatuvar', 'all');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, '1');
});

test('filterOpportunities filters by category correctly', () => {
  const result = filterOpportunities(mockItems, '', 'stage');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, '2');
});

test('filterOpportunities excludes expired items when onlyActive is true', () => {
  const result = filterOpportunities(mockItems, '', 'all', true);
  assert.equal(result.length, 2);
  assert.equal(result.some(r => r.id === '3'), false);
});

test('calculateEscrowProtection computes zero platform fee for artists', () => {
  const { netAmount, platformGuaranteeFee, totalToHold } = calculateEscrowProtection(13000, true);
  assert.equal(netAmount, 13000);
  assert.equal(platformGuaranteeFee, 0);
  assert.equal(totalToHold, 13000);
});

test('formatDeadlineWarning correctly identifies urgency', () => {
  assert.deepEqual(formatDeadlineWarning(2), { label: 'Son 2 Gün', isUrgent: true });
  assert.deepEqual(formatDeadlineWarning(12), { label: 'Son 12 Gün', isUrgent: false });
  assert.deepEqual(formatDeadlineWarning(0), { label: 'Süresi Doldu', isUrgent: false });
});

test('formatCurrencyTRY formats Turkish Lira correctly', () => {
  const formatted = formatCurrencyTRY(45000);
  assert.ok(formatted.includes('45'));
  assert.ok(formatted.includes('₺'));
});
