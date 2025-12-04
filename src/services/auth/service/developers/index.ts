export * as policies from './policies.js';
export * as projects from './projects.js';
export * as scopes from './scopes.js';
export * as clients from './clients/index.js';

export type ResourceEnvelope<K extends string, T> = {
  [P in K]: T;
};
