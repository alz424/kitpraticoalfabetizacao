export const GUARANTEE_DAYS = 7;

export const defaultOffer = {
  activities: '[QUANTIDADE DE ATIVIDADES]',
  pages: '[QUANTIDADE DE PÁGINAS]',
  essentialAnchor: '[ÂNCORA]',
  essentialPrice: '19,99',
  completeAnchor: '[ÂNCORA]',
  completePrice: '29,99',
  essentialLink: '',
  completeLink: '',
  bonus1: '[X]',
  bonus2: '[X]',
  bonus3: '[X]',
  bonus4: '[X]',
};
export type Offer = typeof defaultOffer;

export function validCheckout(url: string) {
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}