import { version } from 'node:process';

import { generateCodeVerifier, generateState, isSupported } from '../../authorization/pkce';

describe('pkce', () => {
  test('isSupported', () => {
    /**
     * The PKCE module requires the `crypto` global to be available...
     */
    const supported = !version.startsWith('v18');
    expect(isSupported()).toBe(supported);
  });

  if (isSupported()) {
    describe('code_verifier', () => {
      const verifiers = Array.from({ length: 10 }, () => generateCodeVerifier());

      test.each(verifiers)('PKCE Specification', (verifier) => {
        /**
         * @see https://www.rfc-editor.org/rfc/rfc7636#section-4.1
         */
        expect(verifier.length >= 43).toBe(true);
        expect(verifier.length <= 128).toBe(true);
        expect(verifier).toMatch(/^[A-Za-z0-9\-._~]+$/);
      });

      test('uniqueness', () => {
        expect(new Set(verifiers).size).toBe(verifiers.length);
      });
    });

    test('state', () => {
      const state = generateState();
      expect(state).toHaveLength(16);
      expect(state).toMatch(/^[A-Za-z0-9]+$/);
    });
  }
});
