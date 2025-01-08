import { Consent } from '../service/identities/consents';
import { toScopeTree, hasConsentForScope } from '../utils';

describe('toScopeTree', () => {
  it('should parse a single scope without children', () => {
    const scope = 'urn:globus:auth:scope:transfer.api.globus.org:all';
    const result = toScopeTree(scope);
    expect(result).toEqual([
      {
        scope: 'urn:globus:auth:scope:transfer.api.globus.org:all',
        atomically_revocable: false,
        children: [],
      },
    ]);
  });

  it('should parse a single scope with children', () => {
    const scope =
      'urn:globus:auth:scope:transfer.api.globus.org:all[https://auth.globus.org/scopes/8062693f-f8c2-46be-86d0-de651a974ff3/data_access]';
    const result = toScopeTree(scope);
    expect(result).toEqual([
      {
        scope: 'urn:globus:auth:scope:transfer.api.globus.org:all',
        atomically_revocable: false,
        children: [
          {
            scope:
              'https://auth.globus.org/scopes/8062693f-f8c2-46be-86d0-de651a974ff3/data_access',
            atomically_revocable: false,
            children: [],
          },
        ],
      },
    ]);
  });

  it('should parse a dependent scope with atomically revocable flag', () => {
    const scope =
      'urn:globus:auth:scope:transfer.api.globus.org:all[*https://auth.globus.org/scopes/8062693f-f8c2-46be-86d0-de651a974ff3/data_access]';
    const result = toScopeTree(scope);
    expect(result).toEqual([
      {
        scope: 'urn:globus:auth:scope:transfer.api.globus.org:all',
        atomically_revocable: false,
        children: [
          {
            scope:
              'https://auth.globus.org/scopes/8062693f-f8c2-46be-86d0-de651a974ff3/data_access',
            atomically_revocable: true,
            children: [],
          },
        ],
      },
    ]);
  });

  it('should parse a complex scope with nested children and atomically revocable flag', () => {
    const scope =
      'urn:globus:auth:scope:transfer.api.globus.org:all[*https://auth.globus.org/scopes/8062693f-f8c2-46be-86d0-de651a974ff3/data_access[https://auth.globus.org/scopes/8062693f-f8c2-46be-86d0-de651a974ff3/ls]] urn:globus:auth:scope:flows.api.globus.org:all';
    const result = toScopeTree(scope);

    expect(result).toEqual([
      {
        scope: 'urn:globus:auth:scope:transfer.api.globus.org:all',
        atomically_revocable: false,
        children: [
          {
            scope:
              'https://auth.globus.org/scopes/8062693f-f8c2-46be-86d0-de651a974ff3/data_access',
            atomically_revocable: true,
            children: [
              {
                scope: 'https://auth.globus.org/scopes/8062693f-f8c2-46be-86d0-de651a974ff3/ls',
                atomically_revocable: false,
                children: [],
              },
            ],
          },
        ],
      },
      {
        scope: 'urn:globus:auth:scope:flows.api.globus.org:all',
        atomically_revocable: false,
        children: [],
      },
    ]);
  });
});

describe('hasConsentForScope', () => {
  const SINGLE_DEP: Consent[] = [
    {
      auto_approved: false,
      atomically_revocable: false,
      updated: '2025-01-08T00:42:08.406080+00:00',
      last_used: '2025-01-08T02:29:34.425920+00:00',
      created: '2025-01-08T00:42:08.406080+00:00',
      dependency_path: [485554],
      status: 'approved',
      id: 485554,
      scope_name: 'urn:globus:auth:scope:744574bb-57fb-4553-88a9-9d84bcd66eb2:manage_collections',
      effective_identity: '70ecdb3e-b77a-4e09-af36-4f00fdcaa2dc',
      allows_refresh: false,
      scope: 'a8906c25-7b22-4d87-8245-ebe58fd4df53',
      client: '89ba3e72-768f-4ddb-952d-e0bb7305e2c7',
    },
    {
      auto_approved: false,
      atomically_revocable: false,
      updated: '2025-01-08T00:42:08.406080+00:00',
      last_used: '2025-01-08T00:42:08.406080+00:00',
      created: '2025-01-08T00:42:08.406080+00:00',
      dependency_path: [485554, 485555],
      status: 'approved',
      id: 485555,
      scope_name: 'urn:globus:auth:scope:auth.globus.org:view_identities',
      effective_identity: '70ecdb3e-b77a-4e09-af36-4f00fdcaa2dc',
      allows_refresh: false,
      scope: '4917e759-f300-40a8-a95e-5fce507f9857',
      client: '744574bb-57fb-4553-88a9-9d84bcd66eb2',
    },
  ];

  const MULTI_DEP: Consent[] = [
    {
      auto_approved: false,
      atomically_revocable: false,
      updated: '2025-01-08T00:42:08.406080+00:00',
      last_used: '2025-01-08T02:29:34.425920+00:00',
      created: '2025-01-08T00:42:08.406080+00:00',
      dependency_path: [485554],
      status: 'approved',
      id: 485554,
      scope_name: 'urn:globus:auth:scope:744574bb-57fb-4553-88a9-9d84bcd66eb2:manage_collections',
      effective_identity: '70ecdb3e-b77a-4e09-af36-4f00fdcaa2dc',
      allows_refresh: false,
      scope: 'a8906c25-7b22-4d87-8245-ebe58fd4df53',
      client: '89ba3e72-768f-4ddb-952d-e0bb7305e2c7',
    },
    {
      auto_approved: false,
      atomically_revocable: false,
      updated: '2025-01-08T00:42:08.406080+00:00',
      last_used: '2025-01-08T00:42:08.406080+00:00',
      created: '2025-01-08T00:42:08.406080+00:00',
      dependency_path: [485554, 485555],
      status: 'approved',
      id: 485555,
      scope_name: 'urn:globus:auth:scope:auth.globus.org:view_identities',
      effective_identity: '70ecdb3e-b77a-4e09-af36-4f00fdcaa2dc',
      allows_refresh: false,
      scope: '4917e759-f300-40a8-a95e-5fce507f9857',
      client: '744574bb-57fb-4553-88a9-9d84bcd66eb2',
    },
    {
      auto_approved: false,
      atomically_revocable: false,
      updated: '2025-01-08T00:42:08.406080+00:00',
      last_used: '2025-01-08T00:42:08.406080+00:00',
      created: '2025-01-08T00:42:08.406080+00:00',
      dependency_path: [485554, 485556],
      status: 'approved',
      id: 485556,
      scope_name: 'urn:globus:auth:scope:auth.globus.org:manage_projects',
      effective_identity: '70ecdb3e-b77a-4e09-af36-4f00fdcaa2dc',
      allows_refresh: false,
      scope: '4917e759-f300-40a8-a95e-5fce507f9857',
      client: '744574bb-57fb-4553-88a9-9d84bcd66eb2',
    },
  ];

  it('returns "true" for a top-level scope (with dependent scopes)', () => {
    const result = hasConsentForScope(
      SINGLE_DEP,
      'urn:globus:auth:scope:744574bb-57fb-4553-88a9-9d84bcd66eb2:manage_collections',
    );
    expect(result).toBe(true);
  });

  it('returns "false" for a dependent scope, queried as a top-level scope', () => {
    const result = hasConsentForScope(
      SINGLE_DEP,
      'urn:globus:auth:scope:auth.globus.org:view_identities',
    );
    expect(result).toBe(false);
  });

  it('returns "false" for a dependent scope, queried as a top-level scope (space seperated)', () => {
    const result = hasConsentForScope(
      SINGLE_DEP,
      'urn:globus:auth:scope:744574bb-57fb-4553-88a9-9d84bcd66eb2:manage_collections urn:globus:auth:scope:auth.globus.org:view_identities',
    );
    expect(result).toBe(false);
  });

  it('returns "true" for a dependent scope', () => {
    const result = hasConsentForScope(
      SINGLE_DEP,
      'urn:globus:auth:scope:744574bb-57fb-4553-88a9-9d84bcd66eb2:manage_collections[urn:globus:auth:scope:auth.globus.org:view_identities]',
    );
    expect(result).toBe(true);
  });

  it('returns "false" for a missing dependent scope', () => {
    const result = hasConsentForScope(
      SINGLE_DEP,
      'urn:globus:auth:scope:744574bb-57fb-4553-88a9-9d84bcd66eb2:manage_collections[urn:globus:auth:scope:auth.globus.org:data_access]',
    );
    expect(result).toBe(false);
  });

  it('returns "true" for multiple unique dependent scopes', () => {
    const result = hasConsentForScope(
      MULTI_DEP,
      'urn:globus:auth:scope:744574bb-57fb-4553-88a9-9d84bcd66eb2:manage_collections[urn:globus:auth:scope:auth.globus.org:view_identities] urn:globus:auth:scope:744574bb-57fb-4553-88a9-9d84bcd66eb2:manage_collections[urn:globus:auth:scope:auth.globus.org:manage_projects]',
    );
    expect(result).toBe(true);
  });

  const DEEP_MULTI_DEP: Consent[] = [
    {
      auto_approved: false,
      atomically_revocable: false,
      updated: '2025-01-08T00:42:08.406080+00:00',
      last_used: '2025-01-08T02:29:34.425920+00:00',
      created: '2025-01-08T00:42:08.406080+00:00',
      dependency_path: [485554],
      status: 'approved',
      id: 485554,
      scope_name: 'urn:globus:auth:scope:744574bb-57fb-4553-88a9-9d84bcd66eb2:manage_collections',
      effective_identity: '70ecdb3e-b77a-4e09-af36-4f00fdcaa2dc',
      allows_refresh: false,
      scope: 'a8906c25-7b22-4d87-8245-ebe58fd4df53',
      client: '89ba3e72-768f-4ddb-952d-e0bb7305e2c7',
    },
    {
      auto_approved: false,
      atomically_revocable: false,
      updated: '2025-01-08T00:42:08.406080+00:00',
      last_used: '2025-01-08T00:42:08.406080+00:00',
      created: '2025-01-08T00:42:08.406080+00:00',
      dependency_path: [485554, 485555],
      status: 'approved',
      id: 485555,
      scope_name: 'urn:globus:auth:scope:auth.globus.org:view_identities',
      effective_identity: '70ecdb3e-b77a-4e09-af36-4f00fdcaa2dc',
      allows_refresh: false,
      scope: '4917e759-f300-40a8-a95e-5fce507f9857',
      client: '744574bb-57fb-4553-88a9-9d84bcd66eb2',
    },
    {
      auto_approved: false,
      atomically_revocable: false,
      updated: '2025-01-08T00:42:08.406080+00:00',
      last_used: '2025-01-08T00:42:08.406080+00:00',
      created: '2025-01-08T00:42:08.406080+00:00',
      dependency_path: [485554, 485560],
      status: 'approved',
      id: 485560,
      scope_name: 'urn:globus:auth:scope:transfer.api.globus.org:set_gcs_attributes',
      effective_identity: '70ecdb3e-b77a-4e09-af36-4f00fdcaa2dc',
      allows_refresh: false,
      scope: '4f77b5e6-270c-4d00-b2da-8f9f415ade05',
      client: '744574bb-57fb-4553-88a9-9d84bcd66eb2',
    },
    {
      auto_approved: false,
      atomically_revocable: false,
      updated: '2025-01-08T00:42:08.406080+00:00',
      last_used: '2025-01-08T00:42:08.406080+00:00',
      created: '2025-01-08T00:42:08.406080+00:00',
      dependency_path: [485554, 485560, 485561],
      status: 'approved',
      id: 485561,
      scope_name: 'urn:globus:auth:scope:auth.globus.org:view_identities',
      effective_identity: '70ecdb3e-b77a-4e09-af36-4f00fdcaa2dc',
      allows_refresh: false,
      scope: '4917e759-f300-40a8-a95e-5fce507f9857',
      client: 'cf01eb30-9884-11e5-8d77-87f1f8b059db',
    },
    {
      auto_approved: false,
      atomically_revocable: false,
      updated: '2025-01-08T00:42:08.406080+00:00',
      last_used: '2025-01-08T00:42:08.406080+00:00',
      created: '2025-01-08T00:42:08.406080+00:00',
      dependency_path: [485554, 485560, 485562],
      status: 'approved',
      id: 485562,
      scope_name: 'urn:globus:auth:scope:groups.api.globus.org:view_my_groups_and_memberships',
      effective_identity: '70ecdb3e-b77a-4e09-af36-4f00fdcaa2dc',
      allows_refresh: false,
      scope: 'a9c7ef6f-3858-40fc-a238-551fcef1e7ef',
      client: 'cf01eb30-9884-11e5-8d77-87f1f8b059db',
    },
  ];

  it('handles deeply nested dependent scopes', () => {
    const result = hasConsentForScope(
      DEEP_MULTI_DEP,
      'urn:globus:auth:scope:744574bb-57fb-4553-88a9-9d84bcd66eb2:manage_collections[urn:globus:auth:scope:transfer.api.globus.org:set_gcs_attributes[urn:globus:auth:scope:groups.api.globus.org:view_my_groups_and_memberships]]',
    );
    expect(result).toBe(true);
  });
});
