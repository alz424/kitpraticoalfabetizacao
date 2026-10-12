import { describe, expect, it, vi } from 'vitest';
import { trackCheckoutClick } from '@/features/sales/tracking';

describe('Checkout click tracking', () => {
  it('records one destination click at R$ 10,90, not an approved purchase or checkout session', () => {
    const pixel = vi.fn();
    trackCheckoutClick(pixel);
    expect(pixel).toHaveBeenCalledTimes(1);
    expect(pixel).toHaveBeenCalledWith('trackCustom', 'CheckoutClick', {
      content_name: 'Kit Prático de Alfabetização', currency: 'BRL', value: 10.90,
    });
    expect(pixel.mock.calls.some(call => call.includes('Purchase') || call.includes('InitiateCheckout'))).toBe(false);
  });
  it('does not block navigation if tracking is absent or fails', () => {
    expect(() => trackCheckoutClick()).not.toThrow();
    expect(() => trackCheckoutClick(() => { throw new Error('Pixel unavailable'); })).not.toThrow();
  });
});