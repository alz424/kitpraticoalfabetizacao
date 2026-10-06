import { describe, expect, it } from 'vitest';
import { defaultOffer, GUARANTEE_DAYS, validCheckout } from '@/features/sales/offer';

describe('Sales offer', () => {
  it('provides the specified seven-day guarantee', () => {
    expect(GUARANTEE_DAYS).toBe(7);
  });
  it('keeps unspecified prices as placeholders', () => {
    expect(defaultOffer.essentialPrice).toBe('[PREÇO]');
    expect(defaultOffer.completePrice).toBe('[PREÇO PREMIUM]');
  });
  it('does not allow missing or unsafe payment destinations', () => {
    expect(validCheckout('')).toBe(false);
    expect(validCheckout('javascript:alert(1)')).toBe(false);
    expect(validCheckout('https://checkout.example.com/kit')).toBe(true);
  });
});