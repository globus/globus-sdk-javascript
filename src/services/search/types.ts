export type ResultFormatVersion = '2019-08-27' | '2017-09-01';

/**
 * @see https://docs.globus.org/api/search/errors/
 */
export type GError = {
  message: string;
  code: string;
  request_id: string;
  status: number;
  error_data?: Record<string, unknown> | GError[];
};
