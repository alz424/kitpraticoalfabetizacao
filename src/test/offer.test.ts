import { describe, expect, it } from 'vitest';
import { defaultOffer, GUARANTEE_DAYS, validCheckout } from '@/features/sales/offer';

describe('Sales offer', () => {
  it('provides the specified seven-day guarantee', () => {
    expect(GUARANTEE_DAYS).toBe(7);
  });
  it('uses the single kit price specified by the client', () => {
    expect(defaultOffer.essentialPrice).toBe('19,99');
    expect('completePrice' in defaultOffer).toBe(false);
  });
  it('sends every buy button to the client's Cakto checkout', () => {
    expect(defaultOffer.essentialLink).toBe('https://pay.cakto.com.br/37ifcan_1179687');
    expect(validCheckout(defaultOffer.essentialLink)).toBe(true);
  });
  it('does not allow missing or unsafe payment destinations', () => {
    expect(validCheckout('')).toBe(false);
    expect(validCheckout('javascript:alert(1)')).toBe(false);
    expect(validCheckout('https://checkout.example.com/kit')).toBe(true);
  });
});