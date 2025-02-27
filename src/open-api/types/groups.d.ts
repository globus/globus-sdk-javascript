export interface paths {
    "/v2/groups/my_groups": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Retrieve your groups and memberships
         * @description This endpoint returns, as an array, all groups in which the user and
         *     its linked identities is an active member, manager, or admin, by default.
         *
         *     The my_memberships field is included by default.
         *
         *     The optional query parameter, `statuses`, results in the array containing
         *     those memberships with one of the specified status(es). The default value
         *     is `active`.
         */
        get: operations["get_my_groups_and_memberships_v2_groups_my_groups_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/groups/statuses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the status counts of memberships for each group you are an admin or manager of.
         * @description This endpoint retreives all the membership counts for groups where the caller is
         *     either an admin or manager.
         */
        get: operations["get_statuses_v2_groups_statuses_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/groups/{group_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Group
         * @description Get details and members of a group by group id.
         *
         *     If `memberships` or `my_memberships` are in the `include` parameter and the
         *     scopes in the provided authorization token allow memberships to be viewed,
         *     the memberships will be returned in the response.
         *
         *     If `allowed_actions` are in the `include` parameter, and the scopes in the
         *     tokens allow managing memberships, an object will be returned detailing which
         *     membership actions each identity in the user's set is allowed to perform.
         *
         *     A group can be viewed if:
         *     - The group policy is that any authenticated user can view it.
         *     - The group is private, and the user has an active/invited/pending membership.
         *
         *     Group memberships can only be viewed by active members. Depending on group policy,
         *     this may be further restricted to only admins and managers. Note that future
         *     versions may relax this restriction for specific cases, such as allowing invited
         *     or pending members to view the membership of the user that invited them.
         */
        get: operations["get_group_v2_groups__group_id__get"];
        /**
         * Update an existing group
         * @description Update the details of a group by group id.
         *
         *     If `allowed_actions` are in the `include` parameter, and the scopes in the
         *     tokens allow managing memberships, an object will be returned detailing which
         *     membership actions each identity in the user's set is allowed to perform.
         *
         *     A group can be updated if:
         *     - The user is an admin.
         *
         *     Group memberships should be updated using the membership endpoint.
         */
        put: operations["update_group_v2_groups__group_id__put"];
        /**
         * Perform actions on members of the group.
         * @description This endpoint supports bulk actions on collections of members of the group.
         *     Currently the following actions are supported:
         *
         *     - **accept**: Identities in the `accept` list which are in the users identity set
         *       will be accepted into the group. Only `invited` memberships can `accept`.
         *     - **add**: Identities in the `add` list will be added to the group as long
         *       as the identity exists and they have not previously left the group, or indicated
         *       via settings that they can not be added to any group. Adding an identity which
         *       already have an active membership in the group will not modify the membership,
         *       and is an error for informational purposes. All active admins and managers are
         *       permitted to add members to a group. Active admins are also permitted to add
         *       admins and managers to a group.  Role is an optional parameter to set the
         *       membership role on addition.
         *     - **approve**: Identities in the `approve` list will be
         *       accepted into the group. Only `pending` memberships can be included in
         *       the `approve` list. All active admins and managers are permitted to approve
         *       pending members to a group.
         *     - **change_role**: Identities in the `change_role` list whose roles in the group are
         *       to be updated.  Only admins can change member roles.  Only `active` memberships
         *       are eligible for role changes.
         *     - **decline**: Identities in the `decline` list which are in the users identity set
         *       will be rejected from the group. Only `invited` memberships can `decline`.
         *     - **invite**:  Identities in the `invite` list will be invited to join the group.
         *       All active admins and managers are permitted to invite members to a group. Members
         *       may also invite other members if the policy allows it. Role is an optional
         *       parameter to set the membership role on invitation.
         *     - **join**: Identities in the `join` list which are in the users identity set
         *       will join the group, if the group policy is to allow users to join. High Assurance
         *       groups cannot use this action.
         *     - **leave**: Identities in the `leave` list which are in the users identity set
         *       will be removed from the group. Only `active` memberships can `leave`. If the
         *       identity is the last remaining `admin` of the group leaving is not allowed,
         *       since this would leave the group in an orphaned state.
         *     - **reject**: Identities in the `reject` list will be
         *       rejected from the group. Only `pending` memberships can be included in
         *       the `reject` list. All active admins and managers are permitted to reject pending
         *       members from a group.
         *     - **remove**: Identities in the `remove` list will be removed from the group.
         *       Admins can remove admins, managers, and members. Managers can remove managers and
         *       members. Regular members cannot remove any members. Only `active` and `invited`
         *       memberships can be removed, and users cannot remove their own memberships.
         *     - **request_join**: Identities in the `request_join` list which are in the users
         *       identity set will be set as pending memberships for the group if the group policy
         *       requires membership approval. Pending memberships must be approved or rejected by
         *       administrators or managers.
         *
         *     The response will include the current state of any membership that was
         *     successfully processed. The response will also include a list of errors
         *     indicating the identity of any requested membership action that failed to
         *     be processed.
         *
         *     Identity IDs must be unique across all actions in the same call. For example,
         *     trying to add and remove the same identity in the same request will cause the
         *     entire request to fail.
         */
        post: operations["group_membership_post_actions_v2_groups__group_id__post"];
        /**
         * Delete a group
         * @description This endpoint allows a group to be deleted by an admin.
         *
         *     > Note: Groups can only be deleted by admins.
         */
        delete: operations["delete_group_v2_groups__group_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/groups/{group_id}/children": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Children
         * @description Get the children of the group.
         */
        get: operations["get_children_v2_groups__group_id__children_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/groups": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a new group
         * @description MVP limitations:
         *
         *     - For users with more than one linked identity, ability to specify
         *     which identity becomes the admin will be added later.
         *     - Non-default policies can not be specified. They can be adjusted using the
         *     Globus web app.
         *
         *     Create a new group with the given name. The effective identity (typically
         *     the user's primary identity) of the Auth token used for the call will be
         *     added to the group as an administrator. The group will be created with
         *     default polices that:
         *
         *     * Allow membership requests only to be approved by admins and managers
         *     * Allow subgroups to be created only by admins
         *     * Allow the group to be visible only to members
         *     * Allow member names to be visible only to managers and admins
         *     * Allow invititations to be sent by managers and admins
         *     * Disallow requests to join
         *
         *     Groups can only be created by users with 1000 or fewer active memberships.
         */
        post: operations["create_group_v2_groups_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/groups/{group_id}/policies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the policies for the group.
         * @description Get the policies for a group.
         */
        get: operations["get_policies_v2_groups__group_id__policies_get"];
        /**
         * Set the policies for the group.
         * @description Update the policies for a group.
         */
        put: operations["update_policies_v2_groups__group_id__policies_put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/preferences": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the preferences for your identity set.
         * @description This endpoint allows users to get preferences for each of their
         *      identities that affect how their identity can be used in groups.
         *       Currently, the supported preferences are:
         *
         *     - **allow_add**: Whether or not an identity can be added
         */
        get: operations["get_identity_set_preferences_v2_preferences_get"];
        /**
         * Set the preferences for your identity set.
         * @description This endpoint allows users to set preferences for each of their
         *      identities that affect how their identity can be used in groups.
         *       Currently, the supported preferences are:
         *
         *     - **allow_add**: Whether or not an identity can be added
         */
        put: operations["put_identity_set_preferences_v2_preferences_put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/groups/{group_id}/membership_fields": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the membership fields for your identity set.
         * @description This endpoint allows users to get preferences for each of their identities
         *      that affect how their identity can be used in groups. Currently, the
         *      supported preferences are:
         */
        get: operations["get_membership_fields_v2_groups__group_id__membership_fields_get"];
        /**
         * Set the membership fields for your identity set.
         * @description This endpoint allows users to set preferences for each of their identities
         *      that affect how their identity can be used in groups. Currently, the supported
         *      preferences are:
         */
        put: operations["put_membership_fields_v2_groups__group_id__membership_fields_put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/subscription_info/{subscription_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get groups by subscription_id
         * @description This endpoint allows users to retrieve limited information about all groups that
         *     have the given subscription_id. Currently, the fields returned for each group are:
         *
         *     - **group_id**: The unique UUID for the group
         *     - **subscription_id**: The unique UUID for the subscription; identical to the id
         *       provided in the request
         *     - **subscription_info**: Basic information about the subscription; excludes the
         *       subscription name for privacy purposes
         */
        get: operations["get_group_by_subscription_id_v2_subscription_info__subscription_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /**
         * AllowedActionsModel
         * @description Specifies which identities associated with the current token, if any, are
         *     in principle allowed to perform various actions.
         *
         *     Attempting to perform an action which no identity has permissions for is a
         *     transactional error, and the entire request will fail.
         */
        AllowedActionsModel: {
            /**
             * Add
             * @description User's identities which are allowed to add members to the group.
             */
            add: string[];
            /**
             * Change Role
             * @description User's identities which are allowed to change group members' roles.
             */
            change_role: string[];
            /**
             * Invite
             * @description User's identities which are allowed to invite members to the group.
             */
            invite: string[];
            /**
             * Remove
             * @description User's identities which are allowed to remove members from the group.
             */
            remove: string[];
            /**
             * Join
             * @description User's identities which can join the group, becoming active members.
             */
            join: string[];
            /**
             * Request Join
             * @description User's identities which can request to join the group, pending admin/manager approval.
             */
            request_join: string[];
            /**
             * Approve
             * @description Identities that are approved to join the group.
             */
            approve: string[];
            /**
             * Reject
             * @description Identities that are rejected from joining the group.
             */
            reject: string[];
            /**
             * Accept
             * @description User's identities which can accept an invitation to the group, pending admin/manager approval.
             */
            accept: string[];
            /**
             * Leave
             * @description User's active identities which can leave the group.
             */
            leave: string[];
            /**
             * Decline
             * @description User's invited identities which can decline an invitation.
             */
            decline: string[];
        };
        /** AuthErrorModel */
        AuthErrorModel: {
            /**
             * Code
             * @description A machine parsable string representing the type of error.
             */
            code: string;
            /**
             * Detail
             * @description A human readable explanation of the error.
             */
            detail: string;
            /** @description Additional fields in compliance with the Globus Auth Requirements Error format. */
            authorization_parameters: components["schemas"]["AuthParamsModel"];
        };
        /** AuthParamsModel */
        AuthParamsModel: {
            /**
             * Session Message
             * @description A message to be displayed to the user.
             */
            session_message?: string;
            /**
             * Session Required Identities
             * @description A list of identities required for the session.
             */
            session_required_identities?: string[];
            /**
             * Session Required Policies
             * @description A list of policies required for the session.
             */
            session_required_policies?: string[];
            /**
             * Session Required Single Domain
             * @description A list of domains required for the session.
             */
            session_required_single_domain?: string[];
            /**
             * Session Required Mfa
             * @description Whether MFA is required for the session.
             */
            session_required_mfa?: boolean;
            /**
             * Required Scopes
             * @description A list of scopes for which consent is required.
             */
            required_scopes?: string[];
            /**
             * Extra
             * @description A dictionary of additional fields that were provided.
             */
            extra?: Record<string, unknown>;
        };
        /** BadRequestErrorModel */
        BadRequestErrorModel: {
            /**
             * Code
             * @description A machine parsable string representing the type of error.
             */
            code: string;
            /**
             * Detail
             * @description A human readable explanation of the error.
             */
            detail: string;
            /**
             * Ambiguous Identities
             * @description List of duplicate identities that caused the exception.
             */
            ambiguous_identities: string[];
        };
        /** BaseErrorModel */
        BaseErrorModel: {
            /**
             * Code
             * @description A machine parsable string representing the type of error.
             */
            code: string;
            /**
             * Detail
             * @description A human readable explanation of the error.
             */
            detail: string;
        };
        /** ConnectorSubscriptionInfo */
        ConnectorSubscriptionInfo: {
            /**
             * Is Ha
             * @description True if HA connector subscription.
             */
            is_ha: boolean;
            /**
             * Is Baa
             * @description True if BAA connector subscription.
             */
            is_baa: boolean;
        };
        /** ForbiddenErrorModel */
        ForbiddenErrorModel: {
            /**
             * Code
             * @description A machine parsable string representing the type of error.
             */
            code: string;
            /**
             * Detail
             * @description A human readable explanation of the error.
             */
            detail: string;
            /**
             * Provided Scopes
             * @description List of all scopes provided to the user.
             */
            provided_scopes?: string[] | null;
        };
        /** GroupChildrenReadModel */
        GroupChildrenReadModel: {
            /**
             * Children
             * @description The children of the group.
             */
            children: components["schemas"]["GroupReadModel"][];
        };
        /** GroupCreateModel */
        GroupCreateModel: {
            /**
             * Description
             * @description The description of the group.
             */
            description?: string | null;
            /**
             * Terms And Conditions
             * @description The terms and conditions for group membership
             */
            terms_and_conditions?: string | null;
            /**
             * Name
             * @description The name of the group.
             */
            name: string;
            /**
             * Parent Id
             * @description The ID of the parent of the group to be created.  The identity creating this group must be an admin of the parent group.
             */
            parent_id?: string | null;
            /** @description Policies for the group regarding members etc. */
            policies?: components["schemas"]["GroupPolicyWriteModel"];
        };
        /**
         * GroupMemberVisibilityPolicyEnum
         * @description Who can view group memberships.
         *
         *     - **members**: All members of the group.
         *     - **managers**: Only admins and managers.
         * @enum {string}
         */
        GroupMemberVisibilityPolicyEnum: "members" | "managers";
        /** GroupMembershipPostAction */
        GroupMembershipPostAction: {
            /**
             * Accept
             * @description List of identities that have been invited and should be accepted to the group.
             */
            accept?: components["schemas"]["MembershipActionStatusModel"][] | null;
            /**
             * Add
             * @description List of identities to add as active members of the group
             */
            add?: components["schemas"]["MembershipActionStatusAndRoleModel"][] | null;
            /**
             * Change Role
             * @description List of identities whose roles are to be changed
             */
            change_role?: components["schemas"]["MembershipsActionChangeRoleModel"][] | null;
            /**
             * Decline
             * @description List of identities that are declining an invitation to join.
             */
            decline?: components["schemas"]["MembershipActionStatusModel"][] | null;
            /**
             * Invite
             * @description List of identities to invite to the group.
             */
            invite?: components["schemas"]["MembershipActionInviteModel"][] | null;
            /**
             * Leave
             * @description List of user's active memberships to leave the group
             */
            leave?: components["schemas"]["MembershipActionStatusModel"][] | null;
            /**
             * Join
             * @description List of identities that will join the group if policies allow directly joining.  These must be identities in the authenticated user's identity set.
             */
            join?: components["schemas"]["MembershipActionBaseModel"][] | null;
            /**
             * Remove
             * @description List of identities to remove from the group
             */
            remove?: components["schemas"]["MembershipActionStatusModel"][] | null;
            /**
             * Request Join
             * @description List of identities that are requesting to join the group. These must be identities in the authenticated user's identity set.
             */
            request_join?: components["schemas"]["MembershipActionBaseModel"][] | null;
            /**
             * Approve
             * @description List of pending identities that will be approved to join the group.
             */
            approve?: components["schemas"]["MembershipActionStatusModel"][] | null;
            /**
             * Reject
             * @description List of pending identities that will be rejected from joining the group.
             */
            reject?: components["schemas"]["MembershipActionStatusModel"][] | null;
        };
        /** GroupMembershipPostActionErrors */
        GroupMembershipPostActionErrors: {
            /** Accept */
            accept?: components["schemas"]["MembershipError"][] | null;
            /** Add */
            add?: components["schemas"]["MembershipError"][] | null;
            /** Change Role */
            change_role?: components["schemas"]["MembershipError"][] | null;
            /** Decline */
            decline?: components["schemas"]["MembershipError"][] | null;
            /** Invite */
            invite?: components["schemas"]["MembershipError"][] | null;
            /** Join */
            join?: components["schemas"]["MembershipError"][] | null;
            /** Leave */
            leave?: components["schemas"]["MembershipError"][] | null;
            /** Remove */
            remove?: components["schemas"]["MembershipError"][] | null;
            /** Request Join */
            request_join?: components["schemas"]["MembershipError"][] | null;
            /** Approve */
            approve?: components["schemas"]["MembershipError"][] | null;
            /** Reject */
            reject?: components["schemas"]["MembershipError"][] | null;
        };
        /** GroupMembershipPostActionResponse */
        GroupMembershipPostActionResponse: {
            /** Accept */
            accept?: components["schemas"]["MembershipReadModel"][] | null;
            /** Add */
            add?: components["schemas"]["MembershipReadModel"][] | null;
            /** Change Role */
            change_role?: components["schemas"]["MembershipReadModel"][] | null;
            /** Decline */
            decline?: components["schemas"]["MembershipReadModel"][] | null;
            /** Invite */
            invite?: components["schemas"]["MembershipReadModel"][] | null;
            /** Join */
            join?: components["schemas"]["MembershipReadModel"][] | null;
            /** Leave */
            leave?: components["schemas"]["MembershipReadModel"][] | null;
            /** Remove */
            remove?: components["schemas"]["MembershipReadModel"][] | null;
            /** Request Join */
            request_join?: components["schemas"]["MembershipReadModel"][] | null;
            /** Approve */
            approve?: components["schemas"]["MembershipReadModel"][] | null;
            /** Reject */
            reject?: components["schemas"]["MembershipReadModel"][] | null;
            errors?: components["schemas"]["GroupMembershipPostActionErrors"] | null;
        };
        /** GroupPolicyReadModel */
        GroupPolicyReadModel: {
            /** Is High Assurance */
            is_high_assurance: boolean;
            /**
             * Authentication Assurance Timeout
             * @description Maximum allowed seconds before a user must reauthenticate to access the group if is set to High Assurance. Defaults to 28800 for HA groups.
             */
            authentication_assurance_timeout?: number | null;
            group_visibility: components["schemas"]["GroupVisibilityPolicyEnum"];
            group_members_visibility: components["schemas"]["GroupMemberVisibilityPolicyEnum"];
            /**
             * Join Requests
             * @description If true then users may request to join the group.
             */
            join_requests?: boolean;
            /** Signup Fields */
            signup_fields: components["schemas"]["SignupFieldsEnum"][];
        };
        /** GroupPolicyWriteModel */
        GroupPolicyWriteModel: {
            /** Is High Assurance */
            is_high_assurance?: boolean | null;
            /**
             * Authentication Assurance Timeout
             * @description Maximum allowed seconds before a user must reauthenticate to access the group if is set to High Assurance. Defaults to 28800 for HA groups.
             */
            authentication_assurance_timeout?: number | null;
            group_visibility?: components["schemas"]["GroupVisibilityPolicyEnum"] | null;
            group_members_visibility?: components["schemas"]["GroupMemberVisibilityPolicyEnum"] | null;
            /**
             * Join Requests
             * @description If true then users may request to join the group.
             */
            join_requests?: boolean | null;
            /** Signup Fields */
            signup_fields?: components["schemas"]["SignupFieldsEnum"][] | null;
        };
        /** GroupReadModel */
        GroupReadModel: {
            /**
             * Description
             * @description The description of the group.
             */
            description?: string | null;
            /**
             * Terms And Conditions
             * @description The terms and conditions for group membership
             */
            terms_and_conditions?: string | null;
            /**
             * Name
             * @description The name of the group.
             */
            name: string;
            /**
             * Id
             * Format: uuid
             * @description The ID of the group.
             */
            id: string;
            /**
             * @description The type of group (regular or Globus Plus).
             * @default regular
             */
            group_type?: components["schemas"]["GroupTypeEnum"];
            /**
             * Child Ids
             * @description IDs of the children groups (some of the groups in this list might be private).
             */
            child_ids?: string[] | null;
            /**
             * Enforce Session
             * @default false
             */
            enforce_session?: boolean;
            /**
             * Session Limit
             * @description Number of seconds required for most recent authentication token
             */
            session_limit?: number | null;
            /**
             * Session Timeouts
             * @description A mapping of identity_ids to data about when that identity's authentication falls out of this group's session limit. Only identities in the session will be included here.
             * @default {}
             */
            session_timeouts?: {
                [key: string]: components["schemas"]["TimeoutData"];
            };
            /**
             * My Memberships
             * @description Optional list of memberships the authenticated user has in the group.
             */
            my_memberships?: components["schemas"]["MembershipReadModel"][] | null;
            /**
             * Memberships
             * @description Optional list of all memberships in the group.
             */
            memberships?: components["schemas"]["MembershipReadModel"][] | null;
            /** @description The actions allowed for the authenticated user's identities. This is intended to assist clients in determining which actions are possible for a given user. */
            allowed_actions?: components["schemas"]["AllowedActionsModel"] | null;
            /**
             * Subscription Id
             * @description The subscription ID
             */
            subscription_id?: string | null;
            /** @description Detailed information regarding the subscription. */
            subscription_info?: components["schemas"]["SubscriptionModel"] | null;
            /** @description Policies for the group regarding members etc. */
            policies?: components["schemas"]["GroupPolicyReadModel"];
            /**
             * Parent Id
             * @description The ID of the parent of the group to be created.  The identity creating this group must be an admin of the parent group.
             */
            parent_id: string | null;
        };
        /** GroupStatusCounts */
        GroupStatusCounts: {
            /**
             * Active
             * @description Count of active group members
             * @default 0
             */
            active?: number;
            /**
             * Invited
             * @description Count of identities invited to join the group.
             * @default 0
             */
            invited?: number;
            /**
             * Pending
             * @description Count of identities pending acceptance to join the group.
             * @default 0
             */
            pending?: number;
            /**
             * Rejected
             * @description Count of indentities that were rejected.
             * @default 0
             */
            rejected?: number;
            /**
             * Removed
             * @description Count of former group members who were removed.
             * @default 0
             */
            removed?: number;
            /**
             * Left
             * @description Count of former group members who left the group.
             * @default 0
             */
            left?: number;
            /**
             * Declined
             * @description Count of declined group members.
             * @default 0
             */
            declined?: number;
        };
        /** GroupSubscriptionModel */
        GroupSubscriptionModel: {
            /**
             * Group Id
             * Format: uuid
             * @description The ID of the group.
             */
            group_id: string;
            /**
             * Subscription Id
             * Format: uuid
             * @description The subscription ID
             */
            subscription_id: string;
            /** @description Detailed information regarding the subscription. */
            subscription_info: components["schemas"]["SubscriptionModelLimited"];
        };
        /**
         * GroupTypeEnum
         * @enum {string}
         */
        GroupTypeEnum: "regular" | "plus";
        /**
         * GroupVisibilityPolicyEnum
         * @description Who can view the group.
         *
         *     - **authenticated**: Any authenticated user.
         *     - **private**: Only active/invited/pending members of the group.
         * @enum {string}
         */
        GroupVisibilityPolicyEnum: "authenticated" | "private";
        /** GroupWriteModel */
        GroupWriteModel: {
            /**
             * Description
             * @description The description of the group.
             */
            description?: string | null;
            /**
             * Terms And Conditions
             * @description The terms and conditions for group membership
             */
            terms_and_conditions?: string | null;
            /**
             * Name
             * @description The name of the group.
             */
            name?: string | null;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** IdentityPreferences */
        IdentityPreferences: {
            /**
             * Allow Add
             * @description If false, then this identity can not be added directly to a group by an admin.
             */
            allow_add: boolean | null;
        };
        /** MembershipActionBaseModel */
        MembershipActionBaseModel: {
            /**
             * Identity Id
             * Format: uuid
             * @description The identity of the user whose membership is being created or updated.
             */
            identity_id: string;
        };
        /** MembershipActionInviteModel */
        MembershipActionInviteModel: {
            /**
             * @description The membership role for the user that is being added, invited, or changed.
             * @default member
             */
            role?: components["schemas"]["RoleEnum"] | null;
            /**
             * Identity Id
             * Format: uuid
             * @description The identity of the user whose membership is being created or updated.
             */
            identity_id: string;
            /**
             * Status Reason
             * @description The reason provided when changing the member status.
             */
            status_reason?: string | null;
            /**
             * Invite Email Address
             * @description Send the group invitation to the specified email address.
             */
            invite_email_address?: string | null;
        };
        /** MembershipActionStatusAndRoleModel */
        MembershipActionStatusAndRoleModel: {
            /**
             * @description The membership role for the user that is being added, invited, or changed.
             * @default member
             */
            role?: components["schemas"]["RoleEnum"] | null;
            /**
             * Identity Id
             * Format: uuid
             * @description The identity of the user whose membership is being created or updated.
             */
            identity_id: string;
            /**
             * Status Reason
             * @description The reason provided when changing the member status.
             */
            status_reason?: string | null;
        };
        /** MembershipActionStatusModel */
        MembershipActionStatusModel: {
            /**
             * Identity Id
             * Format: uuid
             * @description The identity of the user whose membership is being created or updated.
             */
            identity_id: string;
            /**
             * Status Reason
             * @description The reason provided when changing the member status.
             */
            status_reason?: string | null;
        };
        /** MembershipError */
        MembershipError: {
            /**
             * Identity Id
             * @description The identity from the request that caused the error.
             */
            identity_id: string;
            /**
             * Code
             * @description A machine parsable string representing the type of error.
             */
            code: string;
            /**
             * Detail
             * @description A human readable explanation of the error.
             */
            detail: string;
        };
        /** MembershipFields */
        MembershipFields: {
            /** First Name */
            first_name?: string | null;
            /** Last Name */
            last_name?: string | null;
            /** Organization */
            organization?: string | null;
            /** Institution */
            institution?: string | null;
            /** Current Project Name */
            current_project_name?: string | null;
            /** Address */
            address?: string | null;
            /** City */
            city?: string | null;
            /** State */
            state?: string | null;
            /** Country */
            country?: string | null;
            /** Address1 */
            address1?: string | null;
            /** Address2 */
            address2?: string | null;
            /** Zip */
            zip?: string | null;
            /** Phone */
            phone?: string | null;
            /** Department */
            department?: string | null;
            /** Field Of Science */
            field_of_science?: string | null;
        };
        /** MembershipReadModel */
        MembershipReadModel: {
            /**
             * Group Id
             * Format: uuid
             * @description The id of the group the member belongs to.
             */
            group_id: string;
            /**
             * Source Group Id
             * Format: uuid
             * @description The subgroup that the identity is a member of causing membership to be implied in this group.
             */
            source_group_id?: string;
            /**
             * Identity Id
             * Format: uuid
             * @description The identity of the user that is a member.
             */
            identity_id: string;
            /**
             * Username
             * @description The username of the user that is a member.
             */
            username: string;
            /** @description The role of the member in the group. */
            role: components["schemas"]["RoleEnum"];
            /** @description The status of the member in the group. */
            status: components["schemas"]["StatusEnum"];
            /**
             * Status Reason
             * @description The reason provided when changing the member status.
             */
            status_reason?: string | null;
            /**
             * Invite Email Address
             * @description Email address for the group invitation.
             */
            invite_email_address?: string | null;
            /**
             * Updated
             * @description RFC 8601 format date and time when the membership was last updated.
             */
            updated?: string | null;
            /**
             * Invite Time
             * @description RFC 8601 format date and time when the user was invited to the group.
             */
            invite_time?: string | null;
            /**
             * Membership Fields
             * @description The additional sign-up fields required by the group.
             * @default {}
             */
            membership_fields?: Record<string, unknown> | null;
        };
        /** MembershipsActionChangeRoleModel */
        MembershipsActionChangeRoleModel: {
            /**
             * @description The membership role for the user that is being added, invited, or changed.
             * @default member
             */
            role?: components["schemas"]["RoleEnum"] | null;
            /**
             * Identity Id
             * Format: uuid
             * @description The identity of the user whose membership is being created or updated.
             */
            identity_id: string;
        };
        /**
         * RoleEnum
         * @enum {string}
         */
        RoleEnum: "member" | "manager" | "admin";
        /**
         * SignupFieldsEnum
         * @description The available signup fields.
         * @enum {string}
         */
        SignupFieldsEnum: "institution" | "current_project_name" | "address" | "city" | "state" | "country" | "address1" | "address2" | "zip" | "phone" | "department" | "field_of_science";
        /**
         * StatusEnum
         * @enum {string}
         */
        StatusEnum: "active" | "invited" | "pending" | "rejected" | "removed" | "left" | "declined";
        /** SubscriptionModel */
        SubscriptionModel: {
            /**
             * Name
             * @description The subscription name.
             */
            name: string;
            /**
             * Subscriber Name
             * @description The subscriber's name.
             */
            subscriber_name: string;
            /**
             * Is High Assurance
             * @description True if HA subscriber.
             * @default false
             */
            is_high_assurance?: boolean;
            /**
             * Is Baa
             * @description True if BAA subscriber.
             * @default false
             */
            is_baa?: boolean;
            /**
             * Connectors
             * @description A mapping of connector UUIDs to connector subscription data.
             * @default {}
             */
            connectors?: {
                [key: string]: components["schemas"]["ConnectorSubscriptionInfo"];
            };
        };
        /** SubscriptionModelLimited */
        SubscriptionModelLimited: {
            /**
             * Is High Assurance
             * @description True if HA subscriber.
             * @default false
             */
            is_high_assurance?: boolean;
            /**
             * Is Baa
             * @description True if BAA subscriber.
             * @default false
             */
            is_baa?: boolean;
            /**
             * Connectors
             * @description A mapping of connector UUIDs to connector subscription data.
             * @default {}
             */
            connectors?: {
                [key: string]: components["schemas"]["ConnectorSubscriptionInfo"];
            };
        };
        /** TimeoutData */
        TimeoutData: {
            /**
             * Expire Time
             * Format: date-time
             * @description RFC 8601 format date and time when the identity will have passed the session limit
             */
            expire_time: string;
            /**
             * Expires In
             * @description Seconds until authentication will have passed the session limit.
             */
            expires_in: number;
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    get_my_groups_and_memberships_v2_groups_my_groups_get: {
        parameters: {
            query?: {
                /** @description Form-encoded or comma-separated list of statuses.  Memberships with these statuses will be included in the memberships array.  Valid values are `active`, `invited`, `pending`, `rejected`, `removed`, `left`, and `declined`. */
                statuses?: string[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GroupReadModel"][];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthErrorModel"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenErrorModel"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Unprocessable Entity */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
        };
    };
    get_statuses_v2_groups_statuses_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A mapping from group_id to an object of status counts for memberships */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        [key: string]: components["schemas"]["GroupStatusCounts"];
                    };
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthErrorModel"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenErrorModel"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
        };
    };
    get_group_v2_groups__group_id__get: {
        parameters: {
            query?: {
                /** @description Form encoded or comma separated list of additional fields to include (allowed fields are `memberships`, `my_memberships`,`policies`, `allowed_actions`, and `child_ids` ) */
                include?: string[] | null;
            };
            header?: never;
            path: {
                group_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GroupReadModel"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthErrorModel"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenErrorModel"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
        };
    };
    update_group_v2_groups__group_id__put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                group_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GroupWriteModel"];
            };
        };
        responses: {
            /** @description The updated group. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GroupReadModel"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthErrorModel"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenErrorModel"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
        };
    };
    group_membership_post_actions_v2_groups__group_id__post: {
        parameters: {
            query?: never;
            header?: {
                "community-context"?: string | null;
            };
            path: {
                group_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GroupMembershipPostAction"];
            };
        };
        responses: {
            /** @description A list of the changed memberships and a list of errors that occurred */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GroupMembershipPostActionResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BadRequestErrorModel"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthErrorModel"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenErrorModel"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
        };
    };
    delete_group_v2_groups__group_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                group_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GroupReadModel"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BadRequestErrorModel"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthErrorModel"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenErrorModel"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
        };
    };
    get_children_v2_groups__group_id__children_get: {
        parameters: {
            query?: {
                /** @description Form encoded or comma separated list of additional fields to include (allowed fields are `memberships`, `my_memberships`,`policies`, `allowed_actions`, and `child_ids` ) */
                include?: string[] | null;
            };
            header?: never;
            path: {
                group_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GroupChildrenReadModel"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthErrorModel"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenErrorModel"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
        };
    };
    create_group_v2_groups_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GroupCreateModel"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GroupReadModel"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BadRequestErrorModel"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthErrorModel"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenErrorModel"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
        };
    };
    get_policies_v2_groups__group_id__policies_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                group_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The current group policies. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GroupPolicyReadModel"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthErrorModel"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenErrorModel"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
        };
    };
    update_policies_v2_groups__group_id__policies_put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                group_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GroupPolicyWriteModel"];
            };
        };
        responses: {
            /** @description The updated set of policies. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GroupPolicyReadModel"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthErrorModel"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenErrorModel"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
        };
    };
    get_identity_set_preferences_v2_preferences_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A mapping from identity_id to a list of preferences. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        [key: string]: components["schemas"]["IdentityPreferences"];
                    };
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthErrorModel"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenErrorModel"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
        };
    };
    put_identity_set_preferences_v2_preferences_put: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    [key: string]: components["schemas"]["IdentityPreferences"];
                };
            };
        };
        responses: {
            /** @description A mapping from identity_id to a list of preferences. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        [key: string]: components["schemas"]["IdentityPreferences"];
                    };
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthErrorModel"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenErrorModel"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
        };
    };
    get_membership_fields_v2_groups__group_id__membership_fields_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                group_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A mapping from identity_id to an object of membership fields. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        [key: string]: components["schemas"]["MembershipFields"];
                    };
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthErrorModel"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenErrorModel"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
        };
    };
    put_membership_fields_v2_groups__group_id__membership_fields_put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                group_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    [key: string]: components["schemas"]["MembershipFields"];
                };
            };
        };
        responses: {
            /** @description A mapping from identity_id to a list of membership fields. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        [key: string]: components["schemas"]["MembershipFields"];
                    };
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthErrorModel"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenErrorModel"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
        };
    };
    get_group_by_subscription_id_v2_subscription_info__subscription_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                subscription_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A list of groups with the given subscription_id. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GroupSubscriptionModel"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthErrorModel"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenErrorModel"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseErrorModel"];
                };
            };
        };
    };
}
