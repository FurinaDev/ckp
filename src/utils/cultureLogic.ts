/**
 * Pure logic functions for Çağdaş Kültür Platformu
 * Filtering, escrow fee calculations, deadline formatting, and contract state.
 */

export interface OpportunityItem {
  id: string;
  title: string;
  institution: string;
  institutionVerified?: boolean;
  category: 'grant' | 'stage' | 'call' | 'residency' | 'service';
  discipline: string;
  location: string;
  budgetOrFee: string;
  deadlineText: string;
  daysRemaining: number;
  description: string;
  tags: string[];
  imageUrl?: string;
  isBookmarked?: boolean;
}

export function filterOpportunities(
  items: OpportunityItem[],
  query: string,
  selectedCategory: string,
  onlyActive: boolean = false
): OpportunityItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((item) => {
    // Query matching
    if (normalizedQuery) {
      const matchTitle = item.title.toLowerCase().includes(normalizedQuery);
      const matchInst = item.institution.toLowerCase().includes(normalizedQuery);
      const matchDisc = item.discipline.toLowerCase().includes(normalizedQuery);
      const matchDesc = item.description.toLowerCase().includes(normalizedQuery);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(normalizedQuery));
      if (!matchTitle && !matchInst && !matchDisc && !matchDesc && !matchTags) {
        return false;
      }
    }

    // Category matching
    if (selectedCategory && selectedCategory !== 'all') {
      if (item.category !== selectedCategory) {
        return false;
      }
    }

    // Active status
    if (onlyActive && item.daysRemaining <= 0) {
      return false;
    }

    return true;
  });
}

export function calculateEscrowProtection(totalHonorarium: number, vatIncluded: boolean = true) {
  if (totalHonorarium < 0) return { netAmount: 0, platformGuaranteeFee: 0, totalToHold: 0 };
  // cagdasmuzik.com guarantee fee is 0% for artists, covered by venue/institutions
  const platformFee = 0;
  const netAmount = vatIncluded ? totalHonorarium : totalHonorarium * 1.20;
  return {
    netAmount,
    platformGuaranteeFee: platformFee,
    totalToHold: netAmount + platformFee
  };
}

export function formatDeadlineWarning(daysRemaining: number): { label: string; isUrgent: boolean } {
  if (daysRemaining <= 0) {
    return { label: 'Süresi Doldu', isUrgent: false };
  }
  if (daysRemaining <= 3) {
    return { label: `Son ${daysRemaining} Gün`, isUrgent: true };
  }
  if (daysRemaining <= 7) {
    return { label: `Son ${daysRemaining} Gün`, isUrgent: true };
  }
  if (daysRemaining <= 14) {
    return { label: `Son ${daysRemaining} Gün`, isUrgent: false };
  }
  return { label: `${daysRemaining} Gün Kaldı`, isUrgent: false };
}

export function formatCurrencyTRY(val: number): string {
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(val) + ' ₺';
}
