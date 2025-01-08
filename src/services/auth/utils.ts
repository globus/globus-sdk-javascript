import { Consent } from './service/identities/consents';

export type ScopeTreeLeaf = {
  scope: string;
  atomically_revocable: boolean;
  children: ScopeTreeLeaf[];
};
/**
 * Parses a scope string into a normalized structure (leaf) for easier comparison.
 */
function parseScope(s: string): ScopeTreeLeaf {
  let parsedScope = s;
  const revocable = parsedScope.startsWith('*');
  if (revocable) {
    parsedScope = parsedScope.replace(/^\*\s*/, '');
  }
  let children: ScopeTreeLeaf[] = [];
  /**
   * If there is no bracket, then there are no children and we can return the parsed scope.
   */
  const firstBracket = parsedScope.indexOf('[');
  if (firstBracket === -1) {
    return {
      scope: parsedScope,
      atomically_revocable: revocable,
      children: [],
    };
  }
  /**
   * The top-level scope is everything before the first encountered bracket.
   */
  const topLevelScope = parsedScope.slice(0, firstBracket);
  /**
   * The children are everything inside the brackets.
   */
  children = parsedScope
    .slice(firstBracket + 1, -1)
    .split(' ')
    .map(parseScope);
  return {
    scope: topLevelScope,
    atomically_revocable: revocable,
    children,
  };
}

/**
 * Converts a scope string into a tree structure for easier comparison.
 */
export function toScopeTree(scope: string): ScopeTreeLeaf[] {
  const scopes = scope.split(' ');
  return scopes.map(parseScope);
}

/**
 * Given a list of consent entries and a scope string, determine if **all** scopes have been approved.
 *
 * @param consents An array of consent entries (sourced from the Globus Auth API) that will be used as the "haystack" for the search.
 * @param scope A full scope string that will be parsed into a tree, and compared against the `consents`.
 * @returns boolean
 */
export function hasConsentForScope(consents: Consent[], scope: string): boolean {
  const tree = toScopeTree(scope);
  /**
   * Determine if a leaf of the scope tree has a consent entry (including all `children`).
   * @param leaf The leaf of the scope tree we are checking for consent.
   * @param path The current, expected path to the leaf when processing `children`.
   * @returns boolean
   */
  function hasConsentEntry(leaf: ScopeTreeLeaf, path?: number[]): boolean {
    /**
     * Find the consent entry that matches the current leaf, and the current path.
     */
    const entry = consents.find(
      (c) =>
        c.scope_name === leaf.scope &&
        /**
         * If a `path` is provided, we need to make sure the entry is at the proper depth.
         */
        (path
          ? c.dependency_path.join(',') === [...path, c.id].join(',')
          : /**
             * If there is no `path`, then the entry must be a "top-level" scope.
             */
            c.dependency_path.length === 1),
    );
    /**
     * If no entry was found, then the scope has not be explicitly approved (or denied).
     */
    if (!entry) return false;
    /**
     * If we found an entry, and there are no `children` to process on the leaf,
     * then we can use the `status` of the entry to determine if the scope has been approved.
     */
    if (!leaf.children.length) return entry.status === 'approved';
    /**
     * If there are `children` to process, then we need to check if all `children` have been approved.
     */
    return leaf.children.every((s) =>
      hasConsentEntry(
        s,
        /**
         * If there is a `path`, make sure to pass it down to account for deeply nested scopes, otherwise
         * the `entry` can be considered to "root".
         */
        path ? [...path, entry.id] : [entry.id],
      ),
    );
  }

  return tree.every((l) => hasConsentEntry(l));
}
