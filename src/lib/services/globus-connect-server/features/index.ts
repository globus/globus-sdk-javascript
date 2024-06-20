export default {
  API: {
    '1.0.0': {
      COLLECTIONS: {
        DATA_TYPES: ['collection#1.0.0'],
      },
    },
    '1.1.0': {
      COLLECTIONS: {
        DATA_TYPES: ['collection#1.0.0', 'collection#1.1.0'],
      },
    },
    '1.2.0': {
      COLLECTIONS: {
        DATA_TYPES: ['collection#1.0.0', 'collection#1.1.0', 'collection#1.2.0'],
      },
    },
    '1.3.0': {
      COLLECTIONS: {
        DATA_TYPES: ['collection#1.0.0', 'collection#1.1.0', 'collection#1.2.0'],
      },
    },
    '1.4.0': {
      COLLECTIONS: {
        DATA_TYPES: ['collection#1.0.0', 'collection#1.1.0', 'collection#1.2.0'],
      },
    },
    '1.5.0': {
      COLLECTIONS: {
        DATA_TYPES: ['collection#1.0.0', 'collection#1.1.0', 'collection#1.2.0'],
      },
    },
    '1.6.0': {
      COLLECTIONS: {
        DATA_TYPES: ['collection#1.0.0', 'collection#1.1.0', 'collection#1.2.0'],
      },
    },
    '1.7.0': {
      COLLECTIONS: {
        /**
         * "Added force_verify to collection#1.4.0" is referenced, here but not in previous releases.
         * @see https://docs.globus.org/globus-connect-server/v5.4/api/#1_7_0
         */
        DATA_TYPES: [
          'collection#1.0.0',
          'collection#1.1.0',
          'collection#1.2.0',
          'collection#1.4.0',
        ],
      },
    },
    '1.8.0': {
      COLLECTIONS: {
        DATA_TYPES: [
          'collection#1.0.0',
          'collection#1.1.0',
          'collection#1.2.0',
          'collection#1.4.0',
          'collection#1.5.0',
        ],
      },
    },
    '1.9.0': {
      COLLECTIONS: {
        DATA_TYPES: [
          'collection#1.0.0',
          'collection#1.1.0',
          'collection#1.2.0',
          'collection#1.4.0',
          'collection#1.5.0',
        ],
      },
    },
    '1.10.0': {
      COLLECTIONS: {
        DATA_TYPES: [
          'collection#1.0.0',
          'collection#1.1.0',
          'collection#1.2.0',
          'collection#1.4.0',
          'collection#1.5.0',
        ],
      },
    },
    // ...
    '1.29.0': {
      COLLECTIONS: {
        DATA_TYPES: [
          'collection#1.0.0',
          'collection#1.1.0',
          'collection#1.2.0',
          // ...
          'collection#1.11.0',
        ],
      },
    },
  },
};

export const DATA_TYPES = {
  'collection#1.0.0': {
    properties: [
      /* ... */
    ],
  },
  // ...
};
