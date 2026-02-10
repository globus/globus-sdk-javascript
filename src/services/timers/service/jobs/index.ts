import {
  HTTP_METHODS,
  serviceRequest,
  normalizeServiceMethodArgs,
  normalizeServiceMethodArgsWithSegments,
} from '../../../shared.js';
import { ID } from '../../config.js';
import { RESOURCE_SERVERS } from '../../../auth/config.js';

import type { OpenAPI } from '../../index.js';
import type {
  ServiceMethod,
  ServiceMethodDynamicSegments,
  JSONFetchResponse,
} from '../../../types.js';

/**
 * @see https://timer.automate.globus.org/redoc#tag/jobs/operation/list_jobs_jobs__get
 */
export const getAll = function (
  arg1?: any,
  arg2?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['list_jobs_jobs__get']['responses']['200']['content']['application/json']
  >
> {
  const { request, options } = normalizeServiceMethodArgs('timers.jobs.getAll', arg1, arg2);
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS[ID],
      path: '/jobs',
      method: HTTP_METHODS.GET,
    },
    request,
    options,
  );
} satisfies ServiceMethod<{
  query?: OpenAPI.operations['list_jobs_jobs__get']['parameters']['query'];
  payload?: never;
}>;

/**
 * @see https://timer.automate.globus.org/redoc#tag/jobs/operation/read_job_jobs__job_id__get
 */
export const get = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['read_job_jobs__job_id__get']['responses']['200']['content']['application/json']
  >
> {
  const { segments: job_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'timers.jobs.get',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS[ID],
      path: `/jobs/${job_id}`,
      method: HTTP_METHODS.GET,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    query?: OpenAPI.operations['read_job_jobs__job_id__get']['parameters']['query'];
    payload?: never;
  }
>;

/**
 * @see https://timer.automate.globus.org/redoc#tag/jobs/operation/update_job_jobs__job_id__patch
 */
export const patch = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['update_job_jobs__job_id__patch']['responses']['200']['content']['application/json']
  >
> {
  const { segments: job_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'timers.jobs.patch',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS[ID],
      path: `/jobs/${job_id}`,
      method: HTTP_METHODS.PATCH,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload: OpenAPI.operations['update_job_jobs__job_id__patch']['requestBody']['content']['application/json'];
  }
>;

/**
 * @see https://timer.automate.globus.org/redoc#tag/jobs/operation/pause_job_jobs__job_id__pause_post
 */
export const pause = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['pause_job_jobs__job_id__pause_post']['responses']['200']['content']['application/json']
  >
> {
  const { segments: job_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'timers.jobs.pause',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS[ID],
      path: `/jobs/${job_id}/pause`,
      method: HTTP_METHODS.POST,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload?: never;
    body?: never;
    query?: never;
  }
>;

/**
 * @see https://timer.automate.globus.org/redoc#tag/jobs/operation/resume_job_jobs__job_id__resume_post
 */
export const resume = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['resume_job_jobs__job_id__resume_post']['responses']['200']['content']['application/json']
  >
> {
  const { segments: job_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'timers.jobs.resume',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS[ID],
      path: `/jobs/${job_id}/resume`,
      method: HTTP_METHODS.POST,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload?: never;
    body?: never;
    query?: OpenAPI.operations['resume_job_jobs__job_id__resume_post']['parameters']['query'];
  }
>;

/**
 * @see https://timer.automate.globus.org/redoc#tag/jobs/operation/delete_timer_jobs__timer_id__delete
 */
export const remove = function (
  arg1: any,
  arg2?: any,
  arg3?: any,
): Promise<
  JSONFetchResponse<
    OpenAPI.operations['delete_timer_jobs__timer_id__delete']['responses']['200']['content']['application/json']
  >
> {
  const { segments: job_id, request, options } = normalizeServiceMethodArgsWithSegments(
    'timers.jobs.remove',
    arg1,
    arg2,
    arg3,
  );
  return serviceRequest(
    {
      service: ID,
      resource_server: RESOURCE_SERVERS[ID],
      path: `/jobs/${job_id}`,
      method: HTTP_METHODS.DELETE,
    },
    request,
    options,
  );
} satisfies ServiceMethodDynamicSegments<
  string,
  {
    payload?: never;
    body?: never;
    query?: never;
  }
>;
