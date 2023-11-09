const actual: typeof import('../fetch') = jest.requireActual('../fetch');

module.exports = {
  ...actual,
  fetch: jest.fn().mockResolvedValue({}),
};
