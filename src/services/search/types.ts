import { OpenAPI as GroupsOpenApi } from '../groups/index';
import { OpenAPI as ComputeOpenApi } from '../compute/index';
import { OpenAPI as FlowsOpenApi } from '../flows/index';

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

type Group = GroupsOpenApi.components['schemas']['GroupReadModel'];
/**
 * @see https://github.com/globusonline/nexus/blob/2fb1788c62c7c2f87a9288671755f218632eaf97/globus/groups/search_utils.py#L20
 */
export type GroupsGroupContent = Pick<
  Group,
  | 'child_ids'
  | 'description'
  | 'group_type'
  | 'id'
  | 'name'
  | 'policies'
  | 'subscription_admin_verified_id'
  | 'subscription_id'
  | 'subscription_info'
> & {
  created: string;
  parent_id?: Group['parent_id'];
  updated: string;
  [key: string]: unknown;
};

type ComputeEndpoint = ComputeOpenApi.components['schemas']['Endpoint'];
/**
 * @see https://github.com/globusonline/compute-services/blob/a7c17a4da7290cf7abaa71c99bae6f89a2a1302b/dev_scripts/search_populator.py#L14
 */
export type ComputeEndpointContent = Pick<
  ComputeEndpoint,
  | 'description'
  | 'display_name'
  | 'hostname'
  | 'ip_address'
  | 'local_user'
  | 'multi_user'
  | 'subscription_uuid'
> & {
  name: ComputeEndpoint['display_name'];
  owner: string;
  subscription_admin_verified: string | null;
  [key: string]: unknown;
};

type FlowResponse = FlowsOpenApi.components['schemas']['FlowResponse'];
/**
 * @see https://github.com/globusonline/globus-flows/blob/cd9926da82e9ca90bb393b53ccd6cb4cf29d8f76/src/globus_flows/search_utils.py#L336
 */
export type FlowsFlowContent = Pick<
  FlowResponse,
  | 'created_at'
  | 'description'
  | 'is_high_assurance'
  | 'keywords'
  | 'subscription_id'
  | 'subtitle'
  | 'title'
  | 'updated_at'
> & {
  action_provider_urls: string[];
  doc_type: 'flows/flows';
  flow_id: FlowResponse['id'];
  flow_owner: string;
  flow_owner_username: string | null;
  has_input_schema: boolean;
  number_of_states_in_flow: number;
  runnable: boolean;
  [key: string]: unknown;
};

type FlowRun = FlowsOpenApi.components['schemas']['FlowRun'];
/**
 * @see https://github.com/globusonline/globus-flows/blob/cd9926da82e9ca90bb393b53ccd6cb4cf29d8f76/src/globus_flows/search_utils.py#L393
 */
export type FlowsRunContent = Pick<FlowRun, 'flow_id' | 'status' | 'tags' | 'label'> & {
  completion_time: string | null;
  doc_type: 'flows/runs';
  flow_title: FlowResponse['title'];
  is_high_assurance: FlowResponse['is_high_assurance'];
  run_id: FlowRun['run_id'];
  run_owner: string;
  run_owner_username: string | null;
  start_time: string | null;
  [key: string]: unknown;
};
