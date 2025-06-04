import { jobs } from '../index';
import { mirror } from '../../../__mocks__/handlers';

test('jobs.getAll', async () => {
  const result = await jobs.getAll({
    query: {
      filter_name: 'job_name',
      filter_status: 'active,inactive,ended',
      order: 'name asc',
      result_count: 1,
      submitted_after: '1970-01-01T12:00:0Z',
      submitted_before: '2300-01-01T12:00:0Z',
    },
  });
  const json = await mirror(result);
  expect(json).toMatchInlineSnapshot(`
    {
      "__msw": "FALLBACK",
      "req": {
        "formData": {},
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "connection": "close",
          "host": "timer.automate.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://timer.automate.globus.org/jobs?filter_name=job_name&filter_status=active%2Cinactive%2Cended&order=name+asc&result_count=1&submitted_after=1970-01-01T12%3A00%3A0Z&submitted_before=2300-01-01T12%3A00%3A0Z",
      },
    }
  `);
});

test('jobs.get', async () => {
  const result = await jobs.get('example-job-id', {
    query: {
      page_size: 50,
    },
  });
  const json = await mirror(result);
  expect(json).toMatchInlineSnapshot(`
    {
      "__msw": "FALLBACK",
      "req": {
        "formData": {},
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "connection": "close",
          "host": "timer.automate.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "GET",
        "url": "https://timer.automate.globus.org/jobs/example-job-id?page_size=50",
      },
    }
  `);
});

test('jobs.patch', async () => {
  const result = await jobs.patch('example-job-id', {
    payload: {
      name: 'example-job-rename',
    },
  });
  const json = await mirror(result);
  expect(json).toMatchInlineSnapshot(`
    {
      "__msw": "FALLBACK",
      "req": {
        "formData": {},
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "connection": "close",
          "content-length": "29",
          "content-type": "application/json",
          "host": "timer.automate.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "json": {
          "name": "example-job-rename",
        },
        "method": "PATCH",
        "url": "https://timer.automate.globus.org/jobs/example-job-id",
      },
    }
  `);
});

test('jobs.pause', async () => {
  const result = await jobs.pause('example-job-id', {});
  const json = await mirror(result);
  expect(json).toMatchInlineSnapshot(`
    {
      "__msw": "FALLBACK",
      "req": {
        "formData": {},
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "connection": "close",
          "content-length": "0",
          "host": "timer.automate.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "POST",
        "url": "https://timer.automate.globus.org/jobs/example-job-id/pause",
      },
    }
  `);
});

test('jobs.resume', async () => {
  const result = await jobs.resume('example-job-id', {
    query: {
      update_credentials: true,
    },
  });
  const json = await mirror(result);
  expect(json).toMatchInlineSnapshot(`
    {
      "__msw": "FALLBACK",
      "req": {
        "formData": {},
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "connection": "close",
          "content-length": "0",
          "host": "timer.automate.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "POST",
        "url": "https://timer.automate.globus.org/jobs/example-job-id/resume?update_credentials=true",
      },
    }
  `);
});

test('jobs.remove', async () => {
  const result = await jobs.remove('example-job-id', {});
  const json = await mirror(result);
  expect(json).toMatchInlineSnapshot(`
    {
      "__msw": "FALLBACK",
      "req": {
        "formData": {},
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip,deflate",
          "connection": "close",
          "host": "timer.automate.globus.org",
          "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
        },
        "method": "DELETE",
        "url": "https://timer.automate.globus.org/jobs/example-job-id",
      },
    }
  `);
});
