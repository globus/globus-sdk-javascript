import { info } from './service/versioning.js';

/**
 * The default domains for a Globus Connect Server instance.
 * Endpoints are being migrated from `data.globus.org` to `gaccess.io`, so both must be supported.
 * @see https://docs.globus.org/globus-connect-server/v5.4/domain-guide/#default_domain_names
 */
const GCS_DEFAULT_DOMAINS = ['data.globus.org', 'gaccess.io'];

/**
 * Returns the default GCS domain the hostname belongs to, or `undefined` if it uses a custom domain.
 */
function getDefaultDomain(hostname: string) {
  return GCS_DEFAULT_DOMAINS.find((d) => hostname.endsWith(`.${d}`));
}

export function getGCSDomainFromURL(url: string | URL) {
  const { host, hostname } = typeof url === 'string' ? new URL(url) : url;
  const defaultDomain = getDefaultDomain(hostname);
  if (!defaultDomain) {
    /**
     * If the host does not end with a default domain, it is a custom domain and we'll return it as is.
     */
    return host;
  }
  const subdomain = hostname.slice(0, -`.${defaultDomain}`.length);
  const parts = subdomain.split('.');
  /**
   * If the subdomain only has two parts, it is the domain of the endpoint.
   * Otherwise it is a subdomain on the endpoint domain (a collection label) we'll drop that part.
   */
  return (
    parts.length === 2 ? [...parts, defaultDomain] : [parts[1], parts[2], defaultDomain]
  ).join('.');
}

/**
 * Derive the Globus Connect Server Endpoint ID (UUID) from a URL.
 * This method can be useful for determining the `endpoint_id` when only an HTTPS asset URL is known.
 *
 * @todo This method will only return an `endpoint_id` for URLs that **do not** use a custom domain.
 * @param url The URL the endpoint will be attempted to be derived from.
 * @returns The Globus Connect Server Endpoint ID (UUID) or `null` if the endpoint could not be derived.
 */
export async function getEndpointIdFromURL(url: string | URL) {
  const u = typeof url === 'string' ? new URL(url) : url;
  const isCustomDomain = !getDefaultDomain(u.hostname);
  if (isCustomDomain) {
    /**
     * @todo This can likely be implemented by querying the TXT record of the domain to obtain the `client_id` of
     * the endpoint (which happens to be be the GCS Endpoint UUID).
     * @see https://docs.globus.org/globus-connect-server/v5.4/domain-guide/#dns_configuration
     */
    return null;
  }

  const res = await (
    await info({
      host: `https://${getGCSDomainFromURL(u)}`,
    })
  ).json();
  const i = res.data?.filter((d) => d.DATA_TYPE.startsWith('info#'))[0];
  return i && 'endpoint_id' in i ? i.endpoint_id : null;
}
