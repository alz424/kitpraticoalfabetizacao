import { defaultOffer } from './offer';

export type Pixel = (...args: unknown[]) => void;

// A destination click is not a checkout session or an approved payment.
export function trackCheckoutClick(pixel?: Pixel) {
  try {
    pixel?.('trackCustom', 'CheckoutClick', {
      content_name: 'Kit Prático de Alfabetização',
      currency: 'BRL',
      value: Number(defaultOffer.essentialPrice.replace(',', '.')),
    });
  } catch {
    // Analytics failures must not interrupt the native purchase link.
  }
}