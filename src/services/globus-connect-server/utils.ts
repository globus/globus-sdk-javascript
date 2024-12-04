import { info } from './service/versioning';

/**
 * The default domain for a Globus Connect Server instance.
 * @see https://docs.globus.org/globus-connect-server/v5.4/domain-guide/#default_domain_names
 */
const GCS_DEFAULT_DOMAIN = 'data.globus.org';

export function getGCSDomainFromURL(url: string | URL) {
  const { host } = typeof url === 'string' ? new URL(url) : url;
  if (!host.endsWith(GCS_DEFAULT_DOMAIN)) {
    /**
     * If the host does not end with the default domain, it is a custom domain and we'll return it as is.
     */
    return host;
  }
  const [subdomain] = host.split(`.${GCS_DEFAULT_DOMAIN}`);
  const parts = subdomain.split('.');
  /**
   * If the subdomain only has two parts, it is the domain of the endpoint.
   * Otherwise it is a subdomain on the endpoint domain (a collection label) we'll drop that part.
   */
  return (
    parts.length === 2 ? [...parts, GCS_DEFAULT_DOMAIN] : [parts[1], parts[2], GCS_DEFAULT_DOMAIN]
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
  const isCustomDomain = !u.host.endsWith(GCS_DEFAULT_DOMAIN);
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
