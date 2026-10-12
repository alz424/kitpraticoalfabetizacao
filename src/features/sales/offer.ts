export const GUARANTEE_DAYS = 7;

export const defaultOffer = {
  activities: '[QUANTIDADE DE ATIVIDADES]',
  pages: '[QUANTIDADE DE PÁGINAS]',
  essentialAnchor: '[ÂNCORA]',
  essentialPrice: '10,90',
  essentialLink: 'https://pay.cakto.com.br/37ifcan_1179687',
};
export type Offer = typeof defaultOffer;

export function validCheckout(url: string) {
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}
