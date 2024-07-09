/**
 * Service responses that are expected to pass `isAuthorizationRequirementsError` checks.
 */
export const FLOWS_AUTHORIZATION_REQUIREMENTS_ERROR = {
  code: 'ConsentRequired',
  state_name: 'RunTransfer',
  description:
    "Flow run requires user intervention to proceed. For state 'RunTransfer': Missing required data_access consent",
  required_scope:
    'https://auth.globus.org/scopes/28e781ba-dacb-4105-a411-fffc4fb8de62/flow_28e781ba_dacb_4105_a411_fffc4fb8de62_user[*https://auth.globus.org/scopes/actions.globus.org/transfer/transfer[*urn:globus:auth:scope:transfer.api.globus.org:all[*https://auth.globus.org/scopes/543aade1-db97-4a4b-9bdf-0b58e78dfa69/data_access]]]',
  action_statuses: [
    {
      label: null,
      status: 'INACTIVE',
      details: {
        code: 'ConsentRequired',
        description: 'Missing required data_access consent',
        required_scope:
          'https://auth.globus.org/scopes/actions.globus.org/transfer/transfer[*urn:globus:auth:scope:transfer.api.globus.org:all[*https://auth.globus.org/scopes/543aade1-db97-4a4b-9bdf-0b58e78dfa69/data_access]]',
        authorization_parameters: {
          required_scopes: [
            'https://auth.globus.org/scopes/actions.globus.org/transfer/transfer[*urn:globus:auth:scope:transfer.api.globus.org:all[*https://auth.globus.org/scopes/543aade1-db97-4a4b-9bdf-0b58e78dfa69/data_access]]',
          ],
          session_message: 'Missing required data_access consent',
        },
      },
      action_id: '5Fh4TTf0ribz',
      manage_by: [],
      creator_id: 'urn:globus:auth:identity:1d611a6d-9a22-4de5-b855-ba793df9b309',
      monitor_by: [],
      start_time: '2024-07-09T16:57:01.012765+00:00',
      state_name: 'RunTransfer',
      release_after: 'P30D',
      display_status: 'INACTIVE',
      completion_time: '2024-07-09T16:57:01.012794+00:00',
    },
  ],
  authorization_parameters: {
    required_scopes: [
      'https://auth.globus.org/scopes/28e781ba-dacb-4105-a411-fffc4fb8de62/flow_28e781ba_dacb_4105_a411_fffc4fb8de62_user[*https://auth.globus.org/scopes/actions.globus.org/transfer/transfer[*urn:globus:auth:scope:transfer.api.globus.org:all[*https://auth.globus.org/scopes/543aade1-db97-4a4b-9bdf-0b58e78dfa69/data_access]]]',
    ],
    session_message:
      "Flow run requires user intervention to proceed. For state 'RunTransfer': Missing required data_access consent",
  },
};

export const TRANSFER_AUTHORIZATION_REQUIREMENTS_ERROR = {
  authorization_parameters: {
    session_message: 'Session reauthentication required (Globus Transfer)',
    session_required_identities: [],
    session_required_mfa: false,
    session_required_single_domain: ['globus.org'],
  },
  code: 'ExternalError.DirListingFailed.LoginFailed',
  message:
    'Command Failed: Error (login)\nEndpoint: Globus Staff GCSv5.4 Demo POSIX HA (eed63c24-36cb-4f29-a47f-91d94a65fef8)\nServer: 35.89.91.21:443\nMessage: Login Failed\n---\nDetails: 530-Login incorrect. : GlobusError: v=1 c=LOGIN_DENIED\\r\\n530-GridFTP-Message: None of your identities are from domains allowed by resource policies\\r\\n530-GridFTP-JSON-Result: {"DATA_TYPE": "result#1.0.0", "code": "permission_denied", "detail": {"DATA_TYPE": "not_from_allowed_domain#1.0.0", "allowed_domains": ["globus.org"]}, "has_next_page": false, "http_response_code": 403, "message": "None of your identities are from domains allowed by resource policies"}\\r\\n530 End.\\r\\n\n',
  request_id: 'rvWu7tCfa',
  resource: '/operation/endpoint/eed63c24-36cb-4f29-a47f-91d94a65fef8/ls',
};
