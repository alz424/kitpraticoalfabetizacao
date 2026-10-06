import { describe, expect, it } from 'vitest';
import { defaultOffer, GUARANTEE_DAYS, validCheckout } from '@/features/sales/offer';

describe('Sales offer', () => {
  it('provides the specified seven-day guarantee', () => {
    expect(GUARANTEE_DAYS).toBe(7);
  });
  it('uses the kit prices specified by the client', () => {
    expect(defaultOffer.essentialPrice).toBe('19,99');
    expect(defaultOffer.completePrice).toBe('29,99');
  });
  it('does not allow missing or unsafe payment destinations', () => {
    expect(validCheckout('')).toBe(false);
    expect(validCheckout('javascript:alert(1)')).toBe(false);
    expect(validCheckout('https://checkout.example.com/kit')).toBe(true);
  });
});