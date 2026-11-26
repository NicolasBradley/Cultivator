import proposalPdf from '../../assets/Cultivator Project Proposal.pdf';

// The deck the live homepage already links. The November 2026 company decks aren't public yet.
export const DECK = { title: 'Cultivator pitch deck', href: proposalPdf, file: 'Cultivator-Pitch-Deck.pdf', meta: 'PDF · 16 pages · 5.2 MB' };
export const PITCH_DECK = DECK.href;

export const CONTACT = {
  email: 'ddieong04@gmail.com',
  conversation: 'mailto:ddieong04@gmail.com?subject=Partner%20conversation%20with%20Cultivator',
  phones: [
    { name: 'Daniel', number: '+886 95380908', href: 'tel:+88695380908' },
    { name: 'Jason', number: '+886 97072303', href: 'tel:+88697072303' },
  ],
  socials: [
    { name: 'Website', href: 'https://cultivatortech.com' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/cultivatortech/' },
    { name: 'Instagram', href: 'https://www.instagram.com/cultivatorteam/' },
  ],
};
