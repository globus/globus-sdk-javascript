import { HttpResponse, http } from 'msw';
import { getGCSDomainFromURL, getEndpointIdFromURL } from '../utils';
import server from '../../../__mocks__/server';

describe('getGCSDomainFromURL', () => {
  it('returns the domain for a file path on a collection (e.g. HTTPS URL)', () => {
    expect(getGCSDomainFromURL('https://m-eef34f.fa5e.bd7c.data.globus.org/~joe/file.png')).toBe(
      'fa5e.bd7c.data.globus.org',
    );
  });
  /**
   * @see https://docs.globus.org/globus-connect-server/v5.4/domain-guide/#custom_label_for_a_mapped_collection
   */
  it('returns the domain when custom label is used', () => {
    expect(
      getGCSDomainFromURL('https://custom-label.fa5e.bd7c.data.globus.org/shared-user/file.txt'),
    ).toBe('fa5e.bd7c.data.globus.org');
  });

  it('returns the domain when an endpoint host is provided', () => {
    expect(getGCSDomainFromURL('https://fa5e.bd7c.data.globus.org')).toBe(
      'fa5e.bd7c.data.globus.org',
    );
  });

  it('supports endpoints migrated to gaccess.io', () => {
    expect(getGCSDomainFromURL('https://m-eef34f.fa5e.bd7c.gaccess.io/~joe/file.png')).toBe(
      'fa5e.bd7c.gaccess.io',
    );
    expect(getGCSDomainFromURL('https://custom-label.fa5e.bd7c.gaccess.io/file.txt')).toBe(
      'fa5e.bd7c.gaccess.io',
    );
    expect(getGCSDomainFromURL('https://fa5e.bd7c.gaccess.io')).toBe('fa5e.bd7c.gaccess.io');
  });

  it('does not treat domains that only end with a default domain string as default domains', () => {
    expect(getGCSDomainFromURL('https://a.b.c.sendingaccess.io/file.txt')).toBe(
      'a.b.c.sendingaccess.io',
    );
  });

  it('returns the doman when a custom domain is provided', () => {
    expect(getGCSDomainFromURL('https://some.example.com/shared-user/file.txt')).toBe(
      'some.example.com',
    );
  });
});

describe('getEndpointIdFromURL', () => {
  it('returns the domain for a file path on a collection (e.g. HTTPS URL)', async () => {
    server.use(
      http.get(
        'https://fa5e.bd7c.data.globus.org/api/info',
        () =>
          HttpResponse.json({
            DATA_TYPE: 'result#1.1.0',
            code: 'success',
            data: [
              {
                DATA_TYPE: 'info#1.0.0',
                api_version: '1.32.0',
                client_id: 'fccc470f-268b-4f36-a84e-1e1c09301aba',
                domain_name: 'fa5e.bd7c.data.globus.org',
                endpoint_id: 'fccc470f-268b-4f36-a84e-1e1c09301aba',
                manager_version: '5.4.80',
              },
            ],
          }),
        { once: true },
      ),
    );
    expect(
      await getEndpointIdFromURL('https://m-eef34f.fa5e.bd7c.data.globus.org/~joe/file.png'),
    ).toBe('fccc470f-268b-4f36-a84e-1e1c09301aba');
  });

  it('returns the endpoint ID for a URL on an endpoint migrated to gaccess.io', async () => {
    server.use(
      http.get(
        'https://fa5e.bd7c.gaccess.io/api/info',
        () =>
          HttpResponse.json({
            DATA_TYPE: 'result#1.1.0',
            code: 'success',
            data: [
              {
                DATA_TYPE: 'info#1.0.0',
                api_version: '1.32.0',
                client_id: 'fccc470f-268b-4f36-a84e-1e1c09301aba',
                domain_name: 'fa5e.bd7c.gaccess.io',
                endpoint_id: 'fccc470f-268b-4f36-a84e-1e1c09301aba',
                manager_version: '5.4.80',
              },
            ],
          }),
        { once: true },
      ),
    );
    expect(await getEndpointIdFromURL('https://m-eef34f.fa5e.bd7c.gaccess.io/~joe/file.png')).toBe(
      'fccc470f-268b-4f36-a84e-1e1c09301aba',
    );
  });

  it('returns null for custom domains', async () => {
    expect(await getEndpointIdFromURL('https://some.example.com/file.txt')).toBeNull();
  });
});
