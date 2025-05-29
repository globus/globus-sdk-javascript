export interface paths {
    "/api/collections/batch_delete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Delete multiple guest collections
         * @description Initiate the deletion of multiple guest collections. The input document
         *     contains a list of the IDs of collections to delete.
         *
         *     If any of the collections have collection_type of "mapped", then this
         *     operation returns an error indicating which ones were not valid or this
         *     operation.
         *
         *     If any of the collections do not exist or are already deleted, then they
         *     are silently ignored.
         *
         *     Deletion does not happen immediately; it is handled in the background by
         *     the GCS Manager Assistant process.
         *
         *     On success, this operation returns a message body containing the list of
         *     collections from the input that this GCS manager node will delete.
         *
         */
        post: operations["postCollectionsBatchDelete"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/collections/check": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Check the collections on this endpoint */
        get: operations["checkCollections"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/collections": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List the collections on this endpoint
         * @description This operation requires either the endpoint to have the `public` property
         *     set to true or the caller to have a role that allows viewing this
         *     Collection.
         *
         *     The result of this can be limited by using the `filter` query parameter to
         *     choose which of the visible collections to return.  This is a
         *     comma-separated list of filters to apply to the result set:
         *
         *     <dl>
         *     <dt>mapped_collections</dt>
         *         <dd>Only collections with collection_type equal to <em>mapped</em>.</dd>
         *     <dt>guest_collections</dt>
         *         <dd>Only collections with collection_type equal to <em>guest</em>.</dd>
         *     <dt>managed_by_me</dt>
         *         <dd>Only collections where one of caller's identities (either directly or
         *         via a group role assignment) is granted a role on the collection.</dd>
         *     <dt>created_by_me</dt>
         *         <dd>Only collections where one of the caller's identities matches the
         *         `identity_id` property of the collection.</dd>
         *     <dt>last_access < YYYY-MM-DD</dt>
         *     <dt>last_access <= YYYY-MM-DD</dt>
         *     <dt>last_access <= YYYY-MM-DD</dt>
         *     <dt>last_access = YYYY-MM-DD</dt>
         *     <dt>last_access >= YYYY-MM-DD</dt>
         *     <dt>last_access < YYYY-MM-DD</dt>
         *         <dd>Only collections accessed before or after the given date</dd>
         *     <dt>created_at < YYYY-MM-DD</dt>
         *     <dt>created_at <= YYYY-MM-DD</dt>
         *     <dt>created_at <= YYYY-MM-DD</dt>
         *     <dt>created_at = YYYY-MM-DD</dt>
         *     <dt>created_at >= YYYY-MM-DD</dt>
         *     <dt>created_at < YYYY-MM-DD</dt>
         *         <dd>Only collections created before or after the given date</dd>
         *     </dl>
         *
         *     The result can also be limited by including the `mapped_collection_id`
         *     query parameter. This limits the response to guest collections which have
         *     been created using the specified mapped collection.
         *
         *     Normally, only public collection configuration policy data is included in
         *     the response. If the query parameter `include=private_policies` is passed
         *     to this API, and the caller has an administrator role on this collection,
         *     the response will include all private policies for the collection as well.
         *
         */
        get: operations["listCollections"];
        put?: never;
        /**
         * Create a collection
         * @description This is used to create either a mapped or a guest collection. When created,
         *     a "collection:administrator" role for that collection will be created using
         *     the caller's identity.
         *
         *     The collection is assigned a unique DNS name. For guest collections, this
         *     DNS name begins with "g-". By default, for mapped collections this name
         *     begins with "m-", but a user with an "endpoint:administrator" role may
         *     assign a custom domain name for a mapped collection.
         *
         *     In order to create a guest collection, the caller must have an identity
         *     that matches the Storage Gateway policies.
         *
         *     In order to create a mapped collection, the caller must have an
         *     "endpoint:administrator" or "endpoint:owner" role.
         *
         */
        post: operations["postCollection"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/collections/{collection_id}/subscription_admin_verified": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Set the subscription_admin_verified property for a collection
         * @description Set the subscription_admin_verified property of the collection. This
         *     only be invoked if the endpoint is associated with a subscription and
         *     the caller is a subscription administrator for that subscription.
         *
         */
        put: operations["putSubscriptionAdminVerified"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/collections/{collection_id}/owner_string": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Set advertised owner of collection
         * @description Update the advertised owner string of the collection
         *
         *     Modify the collection's advertised owner to match the username of one of
         *     the caller's linked identities.  The identity must have an administrator
         *     role on the collection.
         *
         */
        put: operations["putCollectionOwnerString"];
        post?: never;
        /**
         * Reset advertised owner of collection
         * @description Reset the advertised owner string of the collection to the endpoint's client_id.
         *
         */
        delete: operations["deleteCollectionOwnerString"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/collections/{collection_id}/domain": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get custom domain for a collection
         * @description Get the custom domain document associated with this collection.
         *
         *     This requires an `administrator` role on the Endpoint
         *
         */
        get: operations["getCollectionDomain"];
        /**
         * Set custom domain for a collection
         * @description Register a new custom domain and certificate to to be used to serve
         *     this collection.
         *
         *     The domain is used for the collection. If this is a mapped collection
         *     and the `wildcard` property is set to true, then all all guest collections
         *     associated with this collection that do not have a custom domain will be
         *     updated to use subdomains of that domain. Otherwise, only this collection
         *     will use that domain.
         *
         *     This requires an `administrator` role on the Endpoint
         *
         */
        put: operations["putCollectionDomain"];
        post?: never;
        /**
         * Delete custom domain for a collection
         * @description Delete the custom collection domain.
         *
         *     If this is a mapped collection, this will cause the collection to revert to
         *     a subdomain of the endpoint's domain (if it is wildcard domain) or a
         *     subdomain of the endpoint's data.globus.org domain. If this mapped collection
         *     has a wildcard domain when this is called, then all guest collections without
         *     custom domains will have their domains changed as well.
         *
         *     If this is a guest collection, and the mapped collection it was created from
         *     has a custom wildcard domain, then this collection will become a subdomain
         *     of that domain; otherwise it will revert to a subdomain of either the
         *     endpoint's domain (if it is a wildcard domain) or a subdomain of the endpoint's
         *     data.globus.org domain.
         *
         *     This requires an `administrator` role on the Endpoint.
         *
         */
        delete: operations["deleteCollectionDomain"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/collections/{collection_id}/check": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Check a collection for configuration problems
         * @description Check the configuration of a collection for configuration problems. Returns
         *     a list of configuration error details.
         *
         *     This operation requires the caller to have an endpoint owner or
         *     administrator role, or a collection administrator role.
         *
         */
        get: operations["checkCollection"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/collections/{collection_id}/owner": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Set collection owner
         * @description Assign a new identity to act as the mapped collection owner. Caller must have
         *     an endpoint admin or owner role.
         *
         *     - This is only allowed for mapped collections
         *     - Owner ID can not be the endpoint client ID
         *
         */
        put: operations["setCollectionOwner"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/collections/{collection_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get information about a collection
         * @description This operation requires either the endpoint to have the `public` property
         *     set to `true` or the caller to have a role that allows viewing this
         *     Endpoint.  Some property visibility is limited for users who do not have an
         *     `administrator` role.
         *
         *     Normally, only public collection configuration policy data is included in
         *     the response. If the query parameter `include=private_policies` is passed
         *     to this API, and the caller has an administrator role on this collection,
         *     the response will include all private policies for the collection as well.
         *
         */
        get: operations["getCollection"];
        /**
         * Update a collection
         * @description Update a collection, completely replacing its definition with the new
         *     document. It returns a document containing the collection after the
         *     update has been applied.
         *
         */
        put: operations["putCollection"];
        post?: never;
        /**
         * Delete a collection
         * @description Deletes a collection owned by the caller or an endpoint administrator.
         *     If the collection has the delete_protection property set to true, the
         *     collection can not be deleted.
         *
         *     When a collection is deleted, all collection-specific roles and
         *     sharing_policies are also deleted.
         *
         *     If a mapped collection is deleted, then all guest collections and roles
         *     associated them are also deleted.
         *
         */
        delete: operations["deleteCollection"];
        options?: never;
        head?: never;
        /**
         * Update a collection
         * @description Updates a collection, changing only the properties included in the input
         *     document. It optionally returns a document containing the document after
         *     the change is applied.  Items explicitly set to null in the input are
         *     removed from the collection document.
         *
         */
        patch: operations["patchCollection"];
        trace?: never;
    };
    "/api/endpoint/subscription_id": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Set the endpoint subscription id
         * @description Change the subscription_id of this endpoint. Because subscription
         *     is enforcement is handled in a separate service than GCS and an
         *     organization's subscription manager may not be the administrator
         *     of the endpoint, this API has allows for both role-based
         *     authorization and subscription manager based authorization.
         *
         *     The authorization allows the following:
         *
         *     <dl>
         *     <dt>Caller has a role but is not subscription manager</dt>
         *     <dd>Remove an existing subscription from an endpoint, even if the
         *         caller is not a manager for that subscription.</dd>
         *
         *     <dt>Caller does not have a role but is a subscription manager</dt>
         *     <dd>Set the subscription_id to a subscription they manage on a
         *         currently-unmanaged endpoint or remove the subscription_id from
         *         the endpoint if it is one that they managed.</dd>
         *
         *     <dt>Caller has a role and is a subscription manager</dt>
         *     <dd>Set the subscription_id to a subscription they manage on an endpoint
         *         even if it is currently managed by a subscription that the caller is
         *         not a manager of.</dd>
         *     </dl>
         *
         */
        put: operations["putEndpointSubscriptionId"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/endpoint/owner_string": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Set endpoint owner string
         * @description Modify the endpoint's advertised owner to match the username of one of the
         *     caller's linked identities.  The identity must have an administrator role
         *     on the endpoint.
         *
         */
        put: operations["putEndpointOwnerString"];
        post?: never;
        /**
         * Reset advertised owner string
         * @description Reset the endpoint's advertised owner to the client_id of the endpoint.
         *
         */
        delete: operations["deleteEndpointOwnerString"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/endpoint/domain": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get endpoint domain
         * @description Get the custom domain document associated with this endpoint.
         *
         *     This requires an `administrator` role on the Endpoint.
         *
         */
        get: operations["getEndpointDomain"];
        /**
         * Set endpoint domain
         * @description Register a new custom domain and certificate to to be used to serve
         *     the endpoint or collection.
         *
         *     The domain is used for the endpoint itself. If the `wildcard`
         *     property is set to true, then all all collections associated
         *     with that endpoint that do not have a custom domain will be
         *     updated to use subdomains of that domain. Otherwise, only the
         *     endpoint will use that domain.
         *
         */
        put: operations["putEndpointDomain"];
        post?: never;
        /**
         * Delete endpoint domain
         * @description Delete the custom endpoint domain. This will cause the endpoint
         *     to revert to using a data.globus.org domain for the GCS Manager
         *     and any collections which do not have custom domains associated
         *     with them.
         *
         *     This requires an `administrator` role on the Endpoint.
         *
         */
        delete: operations["deleteEndpointDomain"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/endpoint/owner": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Set endpoint owner
         * @description Assign a new identity to act as the endpoint owner.
         *
         */
        put: operations["putEndpointOwner"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/endpoint": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get endpoint definition
         * @description Get the endpoint.
         *
         */
        get: operations["getEndpoint"];
        /**
         * Update an endpoint
         * @description Update the endpoint document, replacing all properties with those in the
         *     input. This operation optionally returns the Endpoint after the update if
         *     the include=endpoint query parameter is passed to this operation.
         *
         */
        put: operations["putEndpoint"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /**
         * Update an endpoint
         * @description Update the Endpoint document, changing only the properties included in the
         *     input. Items explicitly set to null in the input are removed from the
         *     endpoint document. This operation optionally returns the endpoint after
         *     applying the changes in the input if the include=endpoint query parameter
         *     is passed to this operation.
         *
         */
        patch: operations["patchEndpoint"];
        trace?: never;
    };
    "/api/info": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get GCS service information
         * @description Returns information about the GCS Manager service for this endpoint, as
         *     well as additional features such as connectors that it provides as
         *     extensions to the API defined in this document.
         *
         *     This operation can be performed without an `Authorization` header.
         *
         */
        get: operations["getInfo"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/nodes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List endpoint nodes
         * @description Get the endpoint's list of nodes.
         *
         *     This operation requires either the endpoint to have the `public` property
         *     set to true or the caller to have a role that allows viewing this endpoint
         *     or a collection on it.
         *
         */
        get: operations["listNodes"];
        put?: never;
        /**
         * Create a new node
         * @description Create a new node to describe a host which is providing service
         *     for this endpoint. This adds the node's IP address to the DNS record
         *     for this endpoint's GCS Manager and for all collections.
         *
         *     On success returns a copy of the created Node with the system generated id
         *     added.
         *
         */
        post: operations["postNode"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/nodes/{node_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get node
         * @description Get information about one of the endpoint's node.
         *
         *     This operation requires either the endpoint to have the public property set
         *     to true or the caller to have a role that allows viewing this Endpoint or a
         *     Collection on it.
         *
         */
        get: operations["getNode"];
        /**
         * Update a node
         * @description Update a node, replacing all properties with those in the input.  This
         *     operation optionally returns the node's definition after the update if the
         *     `include=node` query parameter is passed to this operation.
         *
         */
        put: operations["putNode"];
        post?: never;
        /**
         * Delete a node
         * @description Delete the `Node` document for the given node.
         *
         */
        delete: operations["deleteNode"];
        options?: never;
        head?: never;
        /**
         * Update a node
         * @description Update a node, changing only the properties included in the input document.
         *     Items explicitly set to null in the input are removed from the Node
         *     document. This operation optionally returns the node definition after
         *     applying the changes in the input if the `include=node` query parameter is
         *     passed to this operation.
         *
         */
        patch: operations["patchNode"];
        trace?: never;
    };
    "/api/roles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List roles
         * @description Get the endpoint's or a collection's list of role associations.
         *
         *     If the `collection_id` query parameter is passed to this operation, then
         *     the roles related to that collection are returned. Otherwise, this
         *     operation returns endpoint roles.
         *
         *     The `include` parameter determines whether this operation returns all roles
         *     relevant to the resource or only those that the caller has.
         *
         *     To obtain information about *all* roles, the caller must pass the
         *     "all_roles" value as the value of the "include" parameter.  This requires
         *     the "administrator" role for the endpoint Or Collection the role is
         *     associated with.
         *
         */
        get: operations["listRoles"];
        put?: never;
        /**
         * Create a role
         * @description Assign a role to an identity or group for the endpoint or a collection.
         *
         *     See
         *     https://docs.globus.org/globus-connect-server/v5.4/reference/endpoint/role/[endpoint roles]
         *     and
         *     https://docs.globus.org/globus-connect-server/v5.4/reference/collection/role/[collection
         *     roles] for description of the available roles.
         *
         *     To assign a role to a collection, include the collection's ID in the
         *     collection property of the input document.
         *
         *
         *     When creating an endpoint role, the caller must have then
         *     `endpoint:administrator` role assigned to one of their identities.
         *
         *     When creating a collection role for a *mapped* collection, the caller must
         *     have either the `endpoint:administrator` role or the
         *     `collection:administrator` role assigned for that collection.
         *
         *     When creating a collection role for a *guest* collection, the caller must have
         *     a `collection:administrator` role on the collection.
         *
         *     On success returns a copy of the created role with the system generated id
         *     added.
         *
         */
        post: operations["postRoles"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/roles/{role_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a role
         * @description Get one of the role assignments on this endpoint.
         *
         */
        get: operations["getRole"];
        put?: never;
        post?: never;
        /**
         * Delete a role
         * @description Delete one of the endpoint or collection roles on this endpoint.
         *
         *     To delete an endpoint role, the caller must have an `endpoint:administrator`
         *     role.
         *
         *     To delete a *mapped* collection role, the caller must have one of
         *     `endpoint:administrator` or `collection:administrator` role for the
         *     collection.
         *
         *     To delete a *guest* collection role, the caller must have one of
         *     `endpoint:administrator`, `collection:administrator` role for the
         *     guest collection, or `collection:administrator` for the mapped collection
         *     the guest collection was created on.
         *
         *     The `endpoint:owner`, or the `collection:administrator` role for the creator
         *     of a collection may not be deleted using this API.
         *
         */
        delete: operations["deleteRole"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/sharing_policies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List sharing policies
         * @description List the sharing policies for a mapped collection.  This may return a
         *     paginated result; the `marker` and `page_size` query parameters can be used
         *     to obtain the next page of response data for the query.
         *
         *     If the `username` query parameter is passed to this function then only the
         *     policies which are relevant to the given username are returned. This will
         *     include policies where the **users** property is `null` or contains the
         *     given username.
         *
         */
        get: operations["listSharingPolicies"];
        put?: never;
        /**
         * Create a sharing policy
         * @description Create a new sharing policy document for a mapped collection.  This new
         *     document will be added to the set of sharing policy documents for this
         *     collection. The sharing policy documents which either have no user
         *     constraint, or match the guest collection owner are used to determine which
         *     paths are available to be shared.
         *
         *     This returns the policy document with the "id" field populated with the
         *     assigned ID of this policy.
         *
         */
        post: operations["postSharingPolicy"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/sharing_policies/{sharing_policy_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a sharing policy
         * @description Get a sharing policy.
         *
         */
        get: operations["getSharingPolicy"];
        put?: never;
        post?: never;
        /**
         * Delete a sharing policy
         * @description Delete a sharing policy.
         *
         *     This may alter the behavior of existing guest collections, if the policies
         *     change the visible parts of the storage gateway's virtual file system for
         *     the guest collection creator.
         *
         */
        delete: operations["deleteSharingPolicy"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/storage_gateways": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List storage gateways
         * @description List the storage gateways on an endpoint.
         *
         *     The `include` query parameter controls what additional information is
         *     included in the `Result` document.  This operation requires either the
         *     endpoint to have the `public` property set to true, the caller to have a
         *     role that allows viewing this Endpoint, the user to have an identity which
         *     is allowed by the individual Storage Gateway policies, or an identity which
         *     has a permission for a collection created on this Storage Gateway.
         *
         */
        get: operations["listStorageGateways"];
        put?: never;
        /**
         * Create a storage gateway
         * @description Create a storage gateway on an endpoint. On success, this operation returns
         *     a copy of the created storage gateway with the system generated id added.
         *
         */
        post: operations["postStorageGateway"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/storage_gateways/{storage_gateway_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a storage gateway
         * @description Get a storage gateway's definition.
         *
         *     The `include` query parameter controls what additional information is
         *     included in the `Result` document. This operation requires either the
         *     endpoint to have the `public` property set to true, the caller to have a
         *     role that allows viewing this Endpoint, the user to have an identity which
         *     is allowed by the individual storage gateway policies, or an identity which
         *     has a permission for a collection created on this storage gateway.
         *
         */
        get: operations["getStorageGateway"];
        /**
         * Update a storage gateway
         * @description Update a storage gateway, completely replacing its definition with the new
         *     document. It returns a document containing the storage gateway after the
         *     update has been applied.
         *
         *     This operation may return a Conflict error if any collections exist which
         *     would be not be consistent with the change in Storage Gateway policies.
         *
         *     The `high_assurance` property cannot be changed.
         *
         */
        put: operations["putStorageGateway"];
        post?: never;
        /**
         * Delete a storage gateway
         * @description Delete a storage gateway.
         *
         */
        delete: operations["deleteStorageGateway"];
        options?: never;
        head?: never;
        /**
         * Update a storage gateway
         * @description Update a storage gateway, change only the properties included in the input
         *     document. It returns a document containing the storage gateway after the
         *     changes have been applied. Items explicitly set to null in the input are
         *     removed from the storage gateway.
         *
         *     Some properties are immutable, in general, the `id`,  `connector_id`, and
         *     `high_assurance` properties cannot be changed, though storage
         *     gateways may enforce additional restrictions.
         *
         *     This operation may return a Conflict error if any collections exist which
         *     would be not be consistent with the change in Storage Gateway policies.
         *
         */
        patch: operations["patchStorageGateway"];
        trace?: never;
    };
    "/api/user_credentials": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List user credentials
         * @description The caller may only retrieve User Credentials which were created by an
         *     identity in the caller's identity set unless they are an administrator. If
         *     the endpoint is not public, returns ForbiddenError if the user has no
         *     credentials
         *
         */
        get: operations["listUserCredentials"];
        put?: never;
        /**
         * Create a user credential
         * @description Create a user credential on a storage gateway. This is required
         *     for some connectors that require a local user name or other
         *     credential information to access the storage system. See the
         *     connector-specific documentation for details on what is needed.
         *
         *     The caller is authorized based on the StorageGateway identity
         *     policies, so users with no assigned roles on the endpoint may
         *     be permitted to access this operation.
         *
         */
        post: operations["postUserCredential"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/user_credentials/{user_credential_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a user credential
         * @description Get a user credential.
         *
         *     The caller must have the identity_id of the user credential
         *     in its identity set.
         *
         */
        get: operations["getUserCredential"];
        /**
         * Update a user credential
         * @description Update a user credential on a storage gateway. This is required
         *     for some connectors that require a local user name or other
         *     credential information to access the storage system. See the
         *     connector-specific documentation for details on what is needed.
         *
         *     The caller must have the identity_id of the user credential
         *     in its identity set.
         *
         */
        put: operations["putUserCredential"];
        post?: never;
        /**
         * Delete a user credential
         * @description Delete a user credential.
         *
         *     The caller must have the identity_id of the user credential in its identity
         *     set.
         *
         */
        delete: operations["deleteUserCredential"];
        options?: never;
        head?: never;
        /**
         * Update a user credential
         * @description Update a user credential on a storage gateway. This is required
         *     for some connectors that require a local user name or other
         *     credential information to access the storage system. See the
         *     connector-specific documentation for details on what is needed.
         *
         *     The caller must have the identity_id of the user credential
         *     in its identity set.
         *
         */
        patch: operations["patchUserCredential"];
        trace?: never;
    };
    "/api/v1/authcallback_google": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * OAuth callback
         * @deprecated
         */
        get: operations["getAuthcallbackGoogle"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/user_credentials": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a user credential
         * @description Create a user credential on a Storage Gateway. This
         *     initiates a flow to an OAuth service
         *     to authenticate the user and generate an authentication
         *     token to allow access to a storage system.
         *
         */
        post: operations["postUserCredentials"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/authclicomplete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * OAuth callback for CLI apps
         * @description Landing page for auth flow completion, suitable for use with a
         *     non-web application that uses a browser to complete the flow.
         *
         */
        get: operations["getAuthclicomplete"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/authcallback": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** OAuth callback */
        get: operations["getAuthcallback"];
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
        /** OAuthUserCredentialForm */
        OAuthUserCredentialForm: {
            /** @description Unused */
            access_token?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity id that this credential is associated with
             */
            identity_id: string;
            /** @description Mapped account username on the storage gateway */
            login_hint?: string;
            /** @description URL to redirect to once the credential registration flow is complete. This should be a maximum of 220 characters to avoid conflicts with connector state limits. */
            redirect_uri: string;
            /**
             * Format: uuid
             * @description Storage gateway to associate the credential with
             */
            storage_gateway: string;
        };
        /**
         * Account_1_0_0
         * @description User account information for a particular Storage Gateway.
         */
        Account_1_0_0: {
            /**
             * @description Type of this document
             * @default account#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "account#1.0.0";
            /**
             * Format: uuid
             * @description Globus Auth identity which maps to this account
             */
            identity_id?: string;
            /**
             * Format: uuid
             * @description Storage Gateway for which this account is valid.
             */
            storage_gateway_id?: string;
            /** @description Connector-specific local username */
            username?: string;
        };
        /**
         * Batch_1_0_0
         * @description The Batch data type is used to specify multiple objects to operate
         *     on via a single REST API call.
         *
         */
        Batch_1_0_0: {
            /**
             * @description Type of this document
             * @default batch#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "batch#1.0.0";
            /** @description List of object IDs to operate on */
            ids?: string[];
        };
        /**
         * AuthenticationTimeout_1_0_0
         * @description Error details when a user must reauthenticate an identity
         *     in order to perform this operation.
         *
         */
        AuthenticationTimeout_1_0_0: {
            /**
             * @description Type of this document
             * @default authentication_timeout#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "authentication_timeout#1.0.0";
            /** @description Boolean flag indicating whether the new authentication
             *     must be done within the same auth session as the
             *     application making the request.
             *      */
            high_assurance?: boolean;
            /** @description List of identities that would have otherwise been
             *     authorized except that the authentication has timed out.
             *      */
            identities?: string[];
        };
        /**
         * AuthenticationTimeout_1_1_0
         * @description Error details when a user must reauthenticate an identity
         *     in order to perform this operation.
         *
         *     Version 1.1.0 adds the require_mfa property.
         *
         */
        AuthenticationTimeout_1_1_0: {
            /**
             * @description Type of this document
             * @default authentication_timeout#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "authentication_timeout#1.1.0";
            /** @description Boolean flag indicating whether the new authentication
             *     must be done within the same auth session as the
             *     application making the request.
             *      */
            high_assurance?: boolean;
            /** @description List of identities that would have otherwise been
             *     authorized except that the authentication has timed out.
             *      */
            identities?: string[];
            /** @description Flag indicating that multi-factor authentication is required.
             *     Only occurs on high assurance storage gateways.
             *      */
            require_mfa?: boolean;
        };
        /**
         * CheckResult_1_0_0
         * @description Consistency check information
         */
        CheckResult_1_0_0: {
            /**
             * @description Type of this document
             * @default check_result#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "check_result#1.0.0";
            /** @description Error details */
            error?: Record<string, unknown> | null;
            /**
             * Format: uuid
             * @description ID of the object that was checked
             */
            id?: string;
            /** @description Message describing the error */
            message?: string;
        };
        /**
         * Domain_1_0_0
         * @description Custom domain description
         *
         */
        Domain_1_0_0: {
            /**
             * @description Type of this document
             * @default domain#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "domain#1.0.0";
            /** @description PEM-Encoded X.509 certificate for this domain */
            certificate?: string | null;
            /** @description PEM-Encoded X.509 certificate chain for this domain. Only needed if
             *     there are intermediate certificates that must also be sent to
             *     clients to allow them to verify the certificate.
             *      */
            certificate_chain?: string | null;
            /** @description Path to a file containing the X.509 certificate chain for this
             *     domain. This file path must contain a sequence of valid
             *     certificate and be present on each data transfer node.
             *      */
            certificate_chain_path?: string | null;
            /** @description Path to a file containing the X.509 certificate for this domain.
             *     This file path must contain a valid certificate and be present on
             *     each data transfer node.
             *      */
            certificate_path?: string | null;
            /** @description Domain name */
            domain_name: string;
            /** @description PEM-Encoded private key for the certificate */
            private_key?: string | null;
            /** @description Path to a file containing the private key for this domain. This
             *     file path must contain a valid key and be present on each data
             *     transfer node.
             *      */
            private_key_path?: string | null;
            /** @description Flag indicating whether this is a wildcard domain or not.
             *
             *     When setting a custom domain for a mapped collection, the domain
             *     may optionally be a wildcard domain. If it is a wildcard domain,
             *     the guest collections will be created as subdomains of the mapped
             *     collection domain; if not, guest collections will be created as
             *     subdomains of the endpoint domain.
             *      */
            wildcard: boolean;
        };
        /**
         * PathRestrictions_1_0_0
         * @description This object represents the path restrictions for a storage gateway
         *     or a sharing path restrictions for a mapped collection.
         *
         *     The values of each of the path lists in this object are interpreted using
         *     the POSIX pattern matching notation as described in
         *     https://pubs.opengroup.org/onlinepubs/9699919799/functions/fnmatch.html[fnmatch(3)]
         *     with flags set to `0` with additional support for some special
         *     user-specific value interpolation:
         *
         *     `~`, `$HOME`::
         *
         *     The user's home directory if the storage gateway supports such a concept,
         *     `/` otherwise
         *
         *     `$USER`::
         *
         *     The effective Storage Gateway-specific username that is being used for data
         *     access. For a Guest Collection, this is the username of the identity that
         *     created the Guest Collection.
         *
         *     These restrictions are evaluated at every data access. When
         *     evaluating restrictions, the user-specific interpolation is
         *     applied before the file name matching is evaluated.
         *
         *     Globus Connect Server evaluates its path restrictions from
         *     longest leading expression match to shortest. When pattern
         *     matching characters are present, they are considered as a lower
         *     priority match than a literal character, with more specific
         *     pattern characters given precedence. The precedence is thus
         *     literal character, bracket expression, `?` (single-character
         *     wildcard), `*` (wildcard).
         *
         *     If multiple path restrictions apply, all matches are applied
         *     from longest to shortest, with the following rules for
         *     overriding values:
         *
         *     ### Path Restriction Override Precedence
         *     ++++
         *     <table>
         *       <tr>
         *         <th>longer restriction</th>
         *         <th>shorter restriction</th>
         *         <th>result</th>
         *       </tr>
         *     <tr>
         *     <td> <pre>read_write</pre>   </td><td> <pre>read</pre>          </td><td> <pre>read_write</pre></td>
         *     </tr>
         *     <tr>
         *     <td> <pre>read_write</pre>   </td><td> <pre>none</pre>          </td><td> <pre>read_write</pre></td>
         *     </tr>
         *     <tr>
         *     <td> <pre>read</pre>         </td><td> <pre>read_write</pre>    </td><td> <pre>read_write</pre></td>
         *     </tr>
         *     <tr>
         *     <td> <pre>read</pre>         </td><td> <pre>none</pre>          </td><td> <pre>read</pre></td>
         *     </tr>
         *     <tr>
         *     <td> <pre>none</pre>         </td><td> <pre>read_write</pre>    </td><td> <pre>none</pre></td>
         *     </tr>
         *     <tr>
         *     <td> <pre>none</pre>         </td><td> <pre>read</pre>          </td><td> <pre>none</pre></td>
         *     </tr>
         *     </table>
         *     ++++
         *
         *
         */
        PathRestrictions_1_0_0: {
            /**
             * @description Type of this document
             * @default path_restrictions#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "path_restrictions#1.0.0";
            /** @description List of paths which are denied any access */
            none?: string[];
            /** @description List of paths which are allowed read-only access */
            read?: string[];
            /** @description List of paths which are allowed read-write access */
            read_write?: string[];
        };
        /**
         * PathRestrictions
         * @description This object represents the path restrictions for a storage gateway
         *     or a sharing path restrictions for a mapped collection.
         *
         *     The values of each of the path lists in this object are interpreted using
         *     the POSIX pattern matching notation as described in
         *     https://pubs.opengroup.org/onlinepubs/9699919799/functions/fnmatch.html[fnmatch(3)]
         *     with flags set to `0` with additional support for some special
         *     user-specific value interpolation:
         *
         *     `~`, `$HOME`::
         *
         *     The user's home directory if the storage gateway supports such a concept,
         *     `/` otherwise
         *
         *     `$USER`::
         *
         *     The effective Storage Gateway-specific username that is being used for data
         *     access. For a Guest Collection, this is the username of the identity that
         *     created the Guest Collection.
         *
         *     These restrictions are evaluated at every data access. When
         *     evaluating restrictions, the user-specific interpolation is
         *     applied before the file name matching is evaluated.
         *
         *     Globus Connect Server evaluates its path restrictions from
         *     longest leading expression match to shortest. When pattern
         *     matching characters are present, they are considered as a lower
         *     priority match than a literal character, with more specific
         *     pattern characters given precedence. The precedence is thus
         *     literal character, bracket expression, `?` (single-character
         *     wildcard), `*` (wildcard).
         *
         *     If multiple path restrictions apply, all matches are applied
         *     from longest to shortest, with the following rules for
         *     overriding values:
         *
         *     ### Path Restriction Override Precedence
         *     ++++
         *     <table>
         *       <tr>
         *         <th>longer restriction</th>
         *         <th>shorter restriction</th>
         *         <th>result</th>
         *       </tr>
         *     <tr>
         *     <td> <pre>read_write</pre>   </td><td> <pre>read</pre>          </td><td> <pre>read_write</pre></td>
         *     </tr>
         *     <tr>
         *     <td> <pre>read_write</pre>   </td><td> <pre>none</pre>          </td><td> <pre>read_write</pre></td>
         *     </tr>
         *     <tr>
         *     <td> <pre>read</pre>         </td><td> <pre>read_write</pre>    </td><td> <pre>read_write</pre></td>
         *     </tr>
         *     <tr>
         *     <td> <pre>read</pre>         </td><td> <pre>none</pre>          </td><td> <pre>read</pre></td>
         *     </tr>
         *     <tr>
         *     <td> <pre>none</pre>         </td><td> <pre>read_write</pre>    </td><td> <pre>none</pre></td>
         *     </tr>
         *     <tr>
         *     <td> <pre>none</pre>         </td><td> <pre>read</pre>          </td><td> <pre>none</pre></td>
         *     </tr>
         *     </table>
         *     ++++
         *
         *
         */
        PathRestrictions: components["schemas"]["PathRestrictions_1_0_0"];
        /**
         * SharingPolicy_1_0_0
         * @description Sharing policies for a mapped collection.
         *
         *     This document type allows endpoint and collection administrators to
         *     optionally constrain sharing path policies for particular users. The
         *     **sharing_restrict_paths** property has a similar meaning to that of the
         *     **sharing_restrict_paths** in the collection document; however, it is in
         *     effect only for specific users.
         *
         *     If the **users** property is null, then the restriction applies to all
         *     users. If it is non-null, then this restriction applies only to accounts
         *     which have been mapped to the enumerated storage gateway user accounts.
         *
         *     Multiple sharing policies can be defined for a mapped collection.  When a
         *     guest collection is created or accessed, only the policies relevant to the
         *     user which created the account are enforced.
         *
         */
        SharingPolicy_1_0_0: {
            /**
             * @description Type of this document
             * @default sharing_policy#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "sharing_policy#1.0.0";
            /**
             * Format: uuid
             * @description Id of the mapped collection which this policy is associated with
             */
            collection_id: string;
            /**
             * Format: uuid
             * @description Unique id for this sharing policy
             */
            id?: string;
            /** @description Restrictions on which paths may be shared in guest collections
             *     related to this mapped collection. These paths are relative to the
             *     root_path property of the mapped collection.
             *      */
            sharing_restrict_paths: components["schemas"]["PathRestrictions"];
            /** @description List of local user accounts that this policy applies to. If omitted
             *     or null, this restriction applies to all local user accounts.
             *      */
            users?: string[];
        };
        /**
         * Collection_1_0_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         */
        Collection_1_0_0: {
            /**
             * @description Type of this document
             * @default collection#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.0.0";
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
        };
        /**
         * Collection_1_1_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         */
        Collection_1_1_0: {
            /**
             * @description Type of this document
             * @default collection#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.1.0";
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Boolean flag indicating whether this collection should support
             *     HTTPS. This value can be set on mapped collections or guest
             *     collections. However, it may not be set to true on a guest
             *     collection if the value on the related mapped collection is false.
             *      */
            enable_https?: boolean;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
            /** @description A message for clients to display to users when interacting with
             *     this collection. For guest collections, this property is read-only
             *     and is the same as the value of its related mapped collection. The
             *     message may be up to 64 characters long.
             *      */
            user_message?: string | null;
            /** @description Link to additional messaging for clients to display to users
             *     when interacting with this endpoint, linked to an
             *     HTTP or HTTPS URL. For guest collections, this property is
             *     read-only and is the same as the value of its related mapped
             *     collection.
             *      */
            user_message_link?: string | null;
        };
        /**
         * Collection_1_2_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         *     Version 1.2.0 adds the ability to enable or disable sharing by specific
         *     users.
         *
         */
        Collection_1_2_0: {
            /**
             * @description Type of this document
             * @default collection#1.2.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.2.0";
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Boolean flag indicating whether this collection should support
             *     HTTPS. This value can be set on mapped collections or guest
             *     collections. However, it may not be set to true on a guest
             *     collection if the value on the related mapped collection is false.
             *      */
            enable_https?: boolean;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to create new guest
             *     collections on this mapped collection.
             *      */
            sharing_users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to
             *     create new guest collections on this mapped collection.
             *      */
            sharing_users_deny?: string[] | null;
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
            /** @description A message for clients to display to users when interacting with
             *     this collection. For guest collections, this property is read-only
             *     and is the same as the value of its related mapped collection. The
             *     message may be up to 64 characters long.
             *      */
            user_message?: string | null;
            /** @description Link to additional messaging for clients to display to users
             *     when interacting with this endpoint, linked to an
             *     HTTP or HTTPS URL. For guest collections, this property is
             *     read-only and is the same as the value of its related mapped
             *     collection.
             *      */
            user_message_link?: string | null;
        };
        /**
         * Domain
         * @description Custom domain description
         *
         */
        Domain: components["schemas"]["Domain_1_0_0"];
        /**
         * Collection_1_3_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         *     Version 1.2.0 adds the ability to enable or disable sharing by specific
         *     users.
         *
         *     Version 1.3.0 add support for custom DNS domains on collections.
         *
         */
        Collection_1_3_0: {
            /**
             * @description Type of this document
             * @default collection#1.3.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.3.0";
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            domain?: components["schemas"]["Domain"];
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Boolean flag indicating whether this collection should support
             *     HTTPS. This value can be set on mapped collections or guest
             *     collections. However, it may not be set to true on a guest
             *     collection if the value on the related mapped collection is false.
             *      */
            enable_https?: boolean;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to create new guest
             *     collections on this mapped collection.
             *      */
            sharing_users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to
             *     create new guest collections on this mapped collection.
             *      */
            sharing_users_deny?: string[] | null;
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
            /** @description A message for clients to display to users when interacting with
             *     this collection. For guest collections, this property is read-only
             *     and is the same as the value of its related mapped collection. The
             *     message may be up to 64 characters long.
             *      */
            user_message?: string | null;
            /** @description Link to additional messaging for clients to display to users
             *     when interacting with this endpoint, linked to an
             *     HTTP or HTTPS URL. For guest collections, this property is
             *     read-only and is the same as the value of its related mapped
             *     collection.
             *      */
            user_message_link?: string | null;
        };
        /**
         * Collection_1_4_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         *     Version 1.2.0 adds the ability to enable or disable sharing by specific
         *     users.
         *
         *     Version 1.3.0 add support for custom DNS domains on collections.
         *
         *     Version 1.4.0 allows optional multi-factor authentication requirements to
         *     high assurance collections and the ability to require checksums when
         *     transferring data on this collection.
         *
         */
        Collection_1_4_0: {
            /**
             * @description Type of this document
             * @default collection#1.4.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.4.0";
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            domain?: components["schemas"]["Domain"];
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Boolean flag indicating whether this collection should support
             *     HTTPS. This value can be set on mapped collections or guest
             *     collections. However, it may not be set to true on a guest
             *     collection if the value on the related mapped collection is false.
             *      */
            enable_https?: boolean;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating that this endpoint requires computing checksums,
             *     needed for the verify_checksum option of transfer.
             *      */
            force_verify?: boolean;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Flag indicating if the storage_gateway requires multi-factor
             *     authentication. Only applies to high assurance storage gateways.
             *      */
            readonly require_mfa?: boolean;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to create new guest
             *     collections on this mapped collection.
             *      */
            sharing_users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to
             *     create new guest collections on this mapped collection.
             *      */
            sharing_users_deny?: string[] | null;
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
            /** @description A message for clients to display to users when interacting with
             *     this collection. For guest collections, this property is read-only
             *     and is the same as the value of its related mapped collection. The
             *     message may be up to 64 characters long.
             *      */
            user_message?: string | null;
            /** @description Link to additional messaging for clients to display to users
             *     when interacting with this endpoint, linked to an
             *     HTTP or HTTPS URL. For guest collections, this property is
             *     read-only and is the same as the value of its related mapped
             *     collection.
             *      */
            user_message_link?: string | null;
        };
        /**
         * Collection_1_5_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         *     Version 1.2.0 adds the ability to enable or disable sharing by specific
         *     users.
         *
         *     Version 1.3.0 add support for custom DNS domains on collections.
         *
         *     Version 1.4.0 allows optional multi-factor authentication requirements to
         *     high assurance collections and the ability to require checksums when
         *     transferring data on this collection.
         *
         *     Version 1.5.0 allows administrators to disable permissions that would allow
         *     anonymous users to have write access to an endpoint.
         *
         */
        Collection_1_5_0: {
            /**
             * @description Type of this document
             * @default collection#1.5.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.5.0";
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating if guest collections on this mapped collection
             *     allow anonymous write permissions or not. This flag is always true for high
             *     assurance collections. For non-high assurance mapped collections, the
             *     default value is false.
             *      */
            disable_anonymous_writes?: boolean;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            domain?: components["schemas"]["Domain"];
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Boolean flag indicating whether this collection should support
             *     HTTPS. This value can be set on mapped collections or guest
             *     collections. However, it may not be set to true on a guest
             *     collection if the value on the related mapped collection is false.
             *      */
            enable_https?: boolean;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating that this endpoint requires computing checksums,
             *     needed for the verify_checksum option of transfer.
             *      */
            force_verify?: boolean;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Flag indicating if the storage_gateway requires multi-factor
             *     authentication. Only applies to high assurance storage gateways.
             *      */
            readonly require_mfa?: boolean;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to create new guest
             *     collections on this mapped collection.
             *      */
            sharing_users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to
             *     create new guest collections on this mapped collection.
             *      */
            sharing_users_deny?: string[] | null;
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
            /** @description A message for clients to display to users when interacting with
             *     this collection. For guest collections, this property is read-only
             *     and is the same as the value of its related mapped collection. The
             *     message may be up to 64 characters long.
             *      */
            user_message?: string | null;
            /** @description Link to additional messaging for clients to display to users
             *     when interacting with this endpoint, linked to an
             *     HTTP or HTTPS URL. For guest collections, this property is
             *     read-only and is the same as the value of its related mapped
             *     collection.
             *      */
            user_message_link?: string | null;
        };
        /**
         * Collection_1_6_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         *     Version 1.2.0 adds the ability to enable or disable sharing by specific
         *     users.
         *
         *     Version 1.3.0 add support for custom DNS domains on collections.
         *
         *     Version 1.4.0 allows optional multi-factor authentication requirements to
         *     high assurance collections and the ability to require checksums when
         *     transferring data on this collection.
         *
         *     Version 1.5.0 allows administrators to disable permissions that would allow
         *     anonymous users to have write access to an endpoint.
         *
         *     Version 1.6.0 allows administrators of mapped collections to associate
         *     policies that users accessing guest collections must meet beyond the
         *     guest collection permissions.
         *
         */
        Collection_1_6_0: {
            /**
             * @description Type of this document
             * @default collection#1.6.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.6.0";
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating if guest collections on this mapped collection
             *     allow anonymous write permissions or not. This flag is always true for high
             *     assurance collections. For non-high assurance mapped collections, the
             *     default value is false.
             *      */
            disable_anonymous_writes?: boolean;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            domain?: components["schemas"]["Domain"];
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Boolean flag indicating whether this collection should support
             *     HTTPS. This value can be set on mapped collections or guest
             *     collections. However, it may not be set to true on a guest
             *     collection if the value on the related mapped collection is false.
             *      */
            enable_https?: boolean;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating that this endpoint requires computing checksums,
             *     needed for the verify_checksum option of transfer.
             *      */
            force_verify?: boolean;
            /**
             * Format: uuid
             * @description Authentication policy set on mapped collections and inherited by its
             *     guest collections. During authorization, the authentication policy must
             *     be satisfied before permissions are considered. Read-only on guest
             *     collections. (**Added in API 1.15.0**)
             *
             */
            guest_auth_policy_id?: string | null;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Flag indicating if the storage_gateway requires multi-factor
             *     authentication. Only applies to high assurance storage gateways.
             *      */
            readonly require_mfa?: boolean;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to create new guest
             *     collections on this mapped collection.
             *      */
            sharing_users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to
             *     create new guest collections on this mapped collection.
             *      */
            sharing_users_deny?: string[] | null;
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
            /** @description A message for clients to display to users when interacting with
             *     this collection. For guest collections, this property is read-only
             *     and is the same as the value of its related mapped collection. The
             *     message may be up to 64 characters long.
             *      */
            user_message?: string | null;
            /** @description Link to additional messaging for clients to display to users
             *     when interacting with this endpoint, linked to an
             *     HTTP or HTTPS URL. For guest collections, this property is
             *     read-only and is the same as the value of its related mapped
             *     collection.
             *      */
            user_message_link?: string | null;
        };
        /**
         * Collection_1_7_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         *     Version 1.2.0 adds the ability to enable or disable sharing by specific
         *     users.
         *
         *     Version 1.3.0 add support for custom DNS domains on collections.
         *
         *     Version 1.4.0 allows optional multi-factor authentication requirements to
         *     high assurance collections and the ability to require checksums when
         *     transferring data on this collection.
         *
         *     Version 1.5.0 allows administrators to disable permissions that would allow
         *     anonymous users to have write access to an endpoint.
         *
         *     Version 1.6.0 allows administrators of mapped collections to associate
         *     policies that users accessing guest collections must meet beyond the
         *     guest collection permissions.
         *
         *     Version 1.7.0 increases the maximum allowed length of the user_message
         *     property.
         *
         */
        Collection_1_7_0: {
            /**
             * @description Type of this document
             * @default collection#1.7.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.7.0";
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating if guest collections on this mapped collection
             *     allow anonymous write permissions or not. This flag is always true for high
             *     assurance collections. For non-high assurance mapped collections, the
             *     default value is false.
             *      */
            disable_anonymous_writes?: boolean;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            domain?: components["schemas"]["Domain"];
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Boolean flag indicating whether this collection should support
             *     HTTPS. This value can be set on mapped collections or guest
             *     collections. However, it may not be set to true on a guest
             *     collection if the value on the related mapped collection is false.
             *      */
            enable_https?: boolean;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating that this endpoint requires computing checksums,
             *     needed for the verify_checksum option of transfer.
             *      */
            force_verify?: boolean;
            /**
             * Format: uuid
             * @description Authentication policy set on mapped collections and inherited by its
             *     guest collections. During authorization, the authentication policy must
             *     be satisfied before permissions are considered. Read-only on guest
             *     collections. (**Added in API 1.15.0**)
             *
             */
            guest_auth_policy_id?: string | null;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Flag indicating if the storage_gateway requires multi-factor
             *     authentication. Only applies to high assurance storage gateways.
             *      */
            readonly require_mfa?: boolean;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to create new guest
             *     collections on this mapped collection.
             *      */
            sharing_users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to
             *     create new guest collections on this mapped collection.
             *      */
            sharing_users_deny?: string[] | null;
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
            /** @description A message for clients to display to users when interacting with
             *     this collection. For guest collections, this property is read-only
             *     and is the same as the value of its related mapped collection. The
             *     message may be up to 256 characters long.
             *      */
            user_message?: string | null;
            /** @description Link to additional messaging for clients to display to users
             *     when interacting with this endpoint, linked to an
             *     HTTP or HTTPS URL. For guest collections, this property is
             *     read-only and is the same as the value of its related mapped
             *     collection.
             *      */
            user_message_link?: string | null;
        };
        /**
         * Collection_1_8_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         *     Version 1.2.0 adds the ability to enable or disable sharing by specific
         *     users.
         *
         *     Version 1.3.0 add support for custom DNS domains on collections.
         *
         *     Version 1.4.0 allows optional multi-factor authentication requirements to
         *     high assurance collections and the ability to require checksums when
         *     transferring data on this collection.
         *
         *     Version 1.5.0 allows administrators to disable permissions that would allow
         *     anonymous users to have write access to an endpoint.
         *
         *     Version 1.6.0 allows administrators of mapped collections to associate
         *     policies that users accessing guest collections must meet beyond the
         *     guest collection permissions.
         *
         *     Version 1.7.0 increases the maximum allowed length of the user_message
         *     property.
         *
         *     Version 1.8.0 adds the delete_protected property. While it is set to true
         *     on a mapped collection, the collection may not be deleted. As of GCS 5.4.69,
         *     this is true by default.
         *
         */
        Collection_1_8_0: {
            /**
             * @description Type of this document
             * @default collection#1.8.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.8.0";
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description If set to true, this collection can not be deleted. This property
             *     is available only on mapped collections. As of GCS 5.4.69, this is
             *     true by default.
             *      */
            delete_protected?: boolean;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating if guest collections on this mapped collection
             *     allow anonymous write permissions or not. This flag is always true for high
             *     assurance collections. For non-high assurance mapped collections, the
             *     default value is false.
             *      */
            disable_anonymous_writes?: boolean;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            domain?: components["schemas"]["Domain"];
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Boolean flag indicating whether this collection should support
             *     HTTPS. This value can be set on mapped collections or guest
             *     collections. However, it may not be set to true on a guest
             *     collection if the value on the related mapped collection is false.
             *      */
            enable_https?: boolean;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating that this endpoint requires computing checksums,
             *     needed for the verify_checksum option of transfer.
             *      */
            force_verify?: boolean;
            /**
             * Format: uuid
             * @description Authentication policy set on mapped collections and inherited by its
             *     guest collections. During authorization, the authentication policy must
             *     be satisfied before permissions are considered. Read-only on guest
             *     collections. (**Added in API 1.15.0**)
             *
             */
            guest_auth_policy_id?: string | null;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Flag indicating if the storage_gateway requires multi-factor
             *     authentication. Only applies to high assurance storage gateways.
             *      */
            readonly require_mfa?: boolean;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to create new guest
             *     collections on this mapped collection.
             *      */
            sharing_users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to
             *     create new guest collections on this mapped collection.
             *      */
            sharing_users_deny?: string[] | null;
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
            /** @description A message for clients to display to users when interacting with
             *     this collection. For guest collections, this property is read-only
             *     and is the same as the value of its related mapped collection. The
             *     message may be up to 256 characters long.
             *      */
            user_message?: string | null;
            /** @description Link to additional messaging for clients to display to users
             *     when interacting with this endpoint, linked to an
             *     HTTP or HTTPS URL. For guest collections, this property is
             *     read-only and is the same as the value of its related mapped
             *     collection.
             *      */
            user_message_link?: string | null;
        };
        /**
         * Collection_1_9_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         *     Version 1.2.0 adds the ability to enable or disable sharing by specific
         *     users.
         *
         *     Version 1.3.0 add support for custom DNS domains on collections.
         *
         *     Version 1.4.0 allows optional multi-factor authentication requirements to
         *     high assurance collections and the ability to require checksums when
         *     transferring data on this collection.
         *
         *     Version 1.5.0 allows administrators to disable permissions that would allow
         *     anonymous users to have write access to an endpoint.
         *
         *     Version 1.6.0 allows administrators of mapped collections to associate
         *     policies that users accessing guest collections must meet beyond the
         *     guest collection permissions.
         *
         *     Version 1.7.0 increases the maximum allowed length of the user_message
         *     property.
         *
         *     Version 1.8.0 adds the delete_protected property. While it is set to true
         *     on a mapped collection, the collection may not be deleted. As of GCS 5.4.69,
         *     this is true by default.
         *
         *     Version 1.9.0 adds the read-only last_access and created_at properties.
         *
         */
        Collection_1_9_0: {
            /**
             * @description Type of this document
             * @default collection#1.9.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.9.0";
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /**
             * Format: date
             * @description Date on which this collection was created
             */
            readonly created_at?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description If set to true, this collection can not be deleted. This property
             *     is available only on mapped collections. As of GCS 5.4.69, this is
             *     true by default.
             *      */
            delete_protected?: boolean;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating if guest collections on this mapped collection
             *     allow anonymous write permissions or not. This flag is always true for high
             *     assurance collections. For non-high assurance mapped collections, the
             *     default value is false.
             *      */
            disable_anonymous_writes?: boolean;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            domain?: components["schemas"]["Domain"];
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Boolean flag indicating whether this collection should support
             *     HTTPS. This value can be set on mapped collections or guest
             *     collections. However, it may not be set to true on a guest
             *     collection if the value on the related mapped collection is false.
             *      */
            enable_https?: boolean;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating that this endpoint requires computing checksums,
             *     needed for the verify_checksum option of transfer.
             *      */
            force_verify?: boolean;
            /**
             * Format: uuid
             * @description Authentication policy set on mapped collections and inherited by its
             *     guest collections. During authorization, the authentication policy must
             *     be satisfied before permissions are considered. Read-only on guest
             *     collections. (**Added in API 1.15.0**)
             *
             */
            guest_auth_policy_id?: string | null;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /**
             * Format: date
             * @description Date on which this collection was last accessed
             */
            readonly last_access?: string | null;
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Flag indicating if the storage_gateway requires multi-factor
             *     authentication. Only applies to high assurance storage gateways.
             *      */
            readonly require_mfa?: boolean;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to create new guest
             *     collections on this mapped collection.
             *      */
            sharing_users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to
             *     create new guest collections on this mapped collection.
             *      */
            sharing_users_deny?: string[] | null;
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
            /** @description A message for clients to display to users when interacting with
             *     this collection. For guest collections, this property is read-only
             *     and is the same as the value of its related mapped collection. The
             *     message may be up to 256 characters long.
             *      */
            user_message?: string | null;
            /** @description Link to additional messaging for clients to display to users
             *     when interacting with this endpoint, linked to an
             *     HTTP or HTTPS URL. For guest collections, this property is
             *     read-only and is the same as the value of its related mapped
             *     collection.
             *      */
            user_message_link?: string | null;
        };
        /**
         * Collection_1_10_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         *     Version 1.2.0 adds the ability to enable or disable sharing by specific
         *     users.
         *
         *     Version 1.3.0 add support for custom DNS domains on collections.
         *
         *     Version 1.4.0 allows optional multi-factor authentication requirements to
         *     high assurance collections and the ability to require checksums when
         *     transferring data on this collection.
         *
         *     Version 1.5.0 allows administrators to disable permissions that would allow
         *     anonymous users to have write access to an endpoint.
         *
         *     Version 1.6.0 allows administrators of mapped collections to associate
         *     policies that users accessing guest collections must meet beyond the
         *     guest collection permissions.
         *
         *     Version 1.7.0 increases the maximum allowed length of the user_message
         *     property.
         *
         *     Version 1.8.0 adds the delete_protected property. While it is set to true
         *     on a mapped collection, the collection may not be deleted. As of GCS 5.4.69,
         *     this is true by default.
         *
         *     Version 1.9.0 adds the read-only last_access and created_at properties.
         *
         *     Version 1.10.0 adds the acl_expiration_mins property to HA mapped collections.
         *
         */
        Collection_1_10_0: {
            /**
             * @description Type of this document
             * @default collection#1.10.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.10.0";
            /** @description Length of time that guest collection permissions are valid. Only settable on HA mapped collections and used by the guest collections attached to it. Set to null to delete any previously set value. */
            acl_expiration_mins?: number | null;
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /**
             * Format: date
             * @description Date on which this collection was created
             */
            readonly created_at?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description If set to true, this collection can not be deleted. This property
             *     is available only on mapped collections. As of GCS 5.4.69, this is
             *     true by default.
             *      */
            delete_protected?: boolean;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating if guest collections on this mapped collection
             *     allow anonymous write permissions or not. This flag is always true for high
             *     assurance collections. For non-high assurance mapped collections, the
             *     default value is false.
             *      */
            disable_anonymous_writes?: boolean;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            domain?: components["schemas"]["Domain"];
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Boolean flag indicating whether this collection should support
             *     HTTPS. This value can be set on mapped collections or guest
             *     collections. However, it may not be set to true on a guest
             *     collection if the value on the related mapped collection is false.
             *      */
            enable_https?: boolean;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating that this endpoint requires computing checksums,
             *     needed for the verify_checksum option of transfer.
             *      */
            force_verify?: boolean;
            /**
             * Format: uuid
             * @description Authentication policy set on mapped collections and inherited by its
             *     guest collections. During authorization, the authentication policy must
             *     be satisfied before permissions are considered. Read-only on guest
             *     collections. (**Added in API 1.15.0**)
             *
             */
            guest_auth_policy_id?: string | null;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /**
             * Format: date
             * @description Date on which this collection was last accessed
             */
            readonly last_access?: string | null;
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Flag indicating if the storage_gateway requires multi-factor
             *     authentication. Only applies to high assurance storage gateways.
             *      */
            readonly require_mfa?: boolean;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to create new guest
             *     collections on this mapped collection.
             *      */
            sharing_users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to
             *     create new guest collections on this mapped collection.
             *      */
            sharing_users_deny?: string[] | null;
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
            /** @description A message for clients to display to users when interacting with
             *     this collection. For guest collections, this property is read-only
             *     and is the same as the value of its related mapped collection. The
             *     message may be up to 256 characters long.
             *      */
            user_message?: string | null;
            /** @description Link to additional messaging for clients to display to users
             *     when interacting with this endpoint, linked to an
             *     HTTP or HTTPS URL. For guest collections, this property is
             *     read-only and is the same as the value of its related mapped
             *     collection.
             *      */
            user_message_link?: string | null;
        };
        /**
         * Collection_1_11_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         *     Version 1.2.0 adds the ability to enable or disable sharing by specific
         *     users.
         *
         *     Version 1.3.0 add support for custom DNS domains on collections.
         *
         *     Version 1.4.0 allows optional multi-factor authentication requirements to
         *     high assurance collections and the ability to require checksums when
         *     transferring data on this collection.
         *
         *     Version 1.5.0 allows administrators to disable permissions that would allow
         *     anonymous users to have write access to an endpoint.
         *
         *     Version 1.6.0 allows administrators of mapped collections to associate
         *     policies that users accessing guest collections must meet beyond the
         *     guest collection permissions.
         *
         *     Version 1.7.0 increases the maximum allowed length of the user_message
         *     property.
         *
         *     Version 1.8.0 adds the delete_protected property. While it is set to true
         *     on a mapped collection, the collection may not be deleted. As of GCS 5.4.69,
         *     this is true by default.
         *
         *     Version 1.9.0 adds the read-only last_access and created_at properties.
         *
         *     Version 1.10.0 adds the acl_expiration_mins property to HA mapped collections.
         *
         *     Version 1.11.0 adds the acl_expiration_mins property to HA guest collection.
         *
         */
        Collection_1_11_0: {
            /**
             * @description Type of this document
             * @default collection#1.11.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.11.0";
            /** @description Length of time that guest collection permissions are valid. Only settable on HA guest collections and HA mapped collections and used by guest collections attached to it. When set on both the mapped and guest collections, the lesser value is in effect. Set to null to delete any previously set value. */
            acl_expiration_mins?: number | null;
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /**
             * Format: date
             * @description Date on which this collection was created
             */
            readonly created_at?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description If set to true, this collection can not be deleted. This property
             *     is available only on mapped collections. As of GCS 5.4.69, this is
             *     true by default.
             *      */
            delete_protected?: boolean;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating if guest collections on this mapped collection
             *     allow anonymous write permissions or not. This flag is always true for high
             *     assurance collections. For non-high assurance mapped collections, the
             *     default value is false.
             *      */
            disable_anonymous_writes?: boolean;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            domain?: components["schemas"]["Domain"];
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Boolean flag indicating whether this collection should support
             *     HTTPS. This value can be set on mapped collections or guest
             *     collections. However, it may not be set to true on a guest
             *     collection if the value on the related mapped collection is false.
             *      */
            enable_https?: boolean;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating that this endpoint requires computing checksums,
             *     needed for the verify_checksum option of transfer.
             *      */
            force_verify?: boolean;
            /**
             * Format: uuid
             * @description Authentication policy set on mapped collections and inherited by its
             *     guest collections. During authorization, the authentication policy must
             *     be satisfied before permissions are considered. Read-only on guest
             *     collections. (**Added in API 1.15.0**)
             *
             */
            guest_auth_policy_id?: string | null;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /**
             * Format: date
             * @description Date on which this collection was last accessed
             */
            readonly last_access?: string | null;
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Flag indicating if the storage_gateway requires multi-factor
             *     authentication. Only applies to high assurance storage gateways.
             *      */
            readonly require_mfa?: boolean;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to create new guest
             *     collections on this mapped collection.
             *      */
            sharing_users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to
             *     create new guest collections on this mapped collection.
             *      */
            sharing_users_deny?: string[] | null;
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
            /** @description A message for clients to display to users when interacting with
             *     this collection. For guest collections, this property is read-only
             *     and is the same as the value of its related mapped collection. The
             *     message may be up to 256 characters long.
             *      */
            user_message?: string | null;
            /** @description Link to additional messaging for clients to display to users
             *     when interacting with this endpoint, linked to an
             *     HTTP or HTTPS URL. For guest collections, this property is
             *     read-only and is the same as the value of its related mapped
             *     collection.
             *      */
            user_message_link?: string | null;
        };
        /**
         * Collection_1_12_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         *     Version 1.2.0 adds the ability to enable or disable sharing by specific
         *     users.
         *
         *     Version 1.3.0 add support for custom DNS domains on collections.
         *
         *     Version 1.4.0 allows optional multi-factor authentication requirements to
         *     high assurance collections and the ability to require checksums when
         *     transferring data on this collection.
         *
         *     Version 1.5.0 allows administrators to disable permissions that would allow
         *     anonymous users to have write access to an endpoint.
         *
         *     Version 1.6.0 allows administrators of mapped collections to associate
         *     policies that users accessing guest collections must meet beyond the
         *     guest collection permissions.
         *
         *     Version 1.7.0 increases the maximum allowed length of the user_message
         *     property.
         *
         *     Version 1.8.0 adds the delete_protected property. While it is set to true
         *     on a mapped collection, the collection may not be deleted. As of GCS 5.4.69,
         *     this is true by default.
         *
         *     Version 1.9.0 adds the read-only last_access and created_at properties.
         *
         *     Version 1.10.0 adds the acl_expiration_mins property to HA mapped collections.
         *
         *     Version 1.11.0 adds the acl_expiration_mins property to HA guest collection.
         *
         *     Version 1.12.0 adds the restrict_transfers_to_high_assurance property to HA
         *     collections.
         *
         */
        Collection_1_12_0: {
            /**
             * @description Type of this document
             * @default collection#1.12.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.12.0";
            /** @description Length of time that guest collection permissions are valid. Only settable on HA guest collections and HA mapped collections and used by guest collections attached to it. When set on both the mapped and guest collections, the lesser value is in effect. Set to null to delete any previously set value. */
            acl_expiration_mins?: number | null;
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /**
             * Format: date
             * @description Date on which this collection was created
             */
            readonly created_at?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description If set to true, this collection can not be deleted. This property
             *     is available only on mapped collections. As of GCS 5.4.69, this is
             *     true by default.
             *      */
            delete_protected?: boolean;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating if guest collections on this mapped collection
             *     allow anonymous write permissions or not. This flag is always true for high
             *     assurance collections. For non-high assurance mapped collections, the
             *     default value is false.
             *      */
            disable_anonymous_writes?: boolean;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            domain?: components["schemas"]["Domain"];
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Boolean flag indicating whether this collection should support
             *     HTTPS. This value can be set on mapped collections or guest
             *     collections. However, it may not be set to true on a guest
             *     collection if the value on the related mapped collection is false.
             *      */
            enable_https?: boolean;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating that this endpoint requires computing checksums,
             *     needed for the verify_checksum option of transfer.
             *      */
            force_verify?: boolean;
            /**
             * Format: uuid
             * @description Authentication policy set on mapped collections and inherited by its
             *     guest collections. During authorization, the authentication policy must
             *     be satisfied before permissions are considered. Read-only on guest
             *     collections. (**Added in API 1.15.0**)
             *
             */
            guest_auth_policy_id?: string | null;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /**
             * Format: date
             * @description Date on which this collection was last accessed
             */
            readonly last_access?: string | null;
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Flag indicating if the storage_gateway requires multi-factor
             *     authentication. Only applies to high assurance storage gateways.
             *      */
            readonly require_mfa?: boolean;
            /**
             * @description Flag indicating whether all data transfers to and from this
             *     collection require the remote collection be HA. This can only be
             *     assigned on high assurance mapped collections. High assurance
             *     guest collections inherit the restriction from their associated
             *     mapped collections. This may be set to null to disable this feature.
             *
             *     If a restriction is in place for a collection, then HTTPS access to
             *     it is disabled.
             *
             * @enum {string|null}
             */
            restrict_transfers_to_high_assurance?: "inbound" | "outbound" | "all" | null;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to create new guest
             *     collections on this mapped collection.
             *      */
            sharing_users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to
             *     create new guest collections on this mapped collection.
             *      */
            sharing_users_deny?: string[] | null;
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
            /** @description A message for clients to display to users when interacting with
             *     this collection. For guest collections, this property is read-only
             *     and is the same as the value of its related mapped collection. The
             *     message may be up to 256 characters long.
             *      */
            user_message?: string | null;
            /** @description Link to additional messaging for clients to display to users
             *     when interacting with this endpoint, linked to an
             *     HTTP or HTTPS URL. For guest collections, this property is
             *     read-only and is the same as the value of its related mapped
             *     collection.
             *      */
            user_message_link?: string | null;
        };
        /**
         * Collection_1_13_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         *     Version 1.2.0 adds the ability to enable or disable sharing by specific
         *     users.
         *
         *     Version 1.3.0 add support for custom DNS domains on collections.
         *
         *     Version 1.4.0 allows optional multi-factor authentication requirements to
         *     high assurance collections and the ability to require checksums when
         *     transferring data on this collection.
         *
         *     Version 1.5.0 allows administrators to disable permissions that would allow
         *     anonymous users to have write access to an endpoint.
         *
         *     Version 1.6.0 allows administrators of mapped collections to associate
         *     policies that users accessing guest collections must meet beyond the
         *     guest collection permissions.
         *
         *     Version 1.7.0 increases the maximum allowed length of the user_message
         *     property.
         *
         *     Version 1.8.0 adds the delete_protected property. While it is set to true
         *     on a mapped collection, the collection may not be deleted. As of GCS 5.4.69,
         *     this is true by default.
         *
         *     Version 1.9.0 adds the read-only last_access and created_at properties.
         *
         *     Version 1.10.0 adds the acl_expiration_mins property to HA mapped collections.
         *
         *     Version 1.11.0 adds the acl_expiration_mins property to HA guest collection.
         *
         *     Version 1.12.0 adds the restrict_transfers_to_high_assurance property to HA
         *     collections.
         *
         *     Version 1.13.0 adds the auto_delete_timeout property to mapped collections
         *     and the skip_auto_delete property to guest collections.
         *
         */
        Collection_1_13_0: {
            /**
             * @description Type of this document
             * @default collection#1.13.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.13.0";
            /** @description Length of time that guest collection permissions are valid. Only settable on HA guest collections and HA mapped collections and used by guest collections attached to it. When set on both the mapped and guest collections, the lesser value is in effect. Set to null to delete any previously set value. */
            acl_expiration_mins?: number | null;
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Number of days before unused guest collections will be automatically
             *     deleted. Only settable on mapped collections. Values must be an integer
             *     greater than 0. Set to null to disable automatic guest collection deletion
             *     for the mapped collection. Defaults to disabled.
             *      */
            auto_delete_timeout?: number | null;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /**
             * Format: date
             * @description Date on which this collection was created
             */
            readonly created_at?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description If set to true, this collection can not be deleted. This property
             *     is available only on mapped collections. As of GCS 5.4.69, this is
             *     true by default.
             *      */
            delete_protected?: boolean;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating if guest collections on this mapped collection
             *     allow anonymous write permissions or not. This flag is always true for high
             *     assurance collections. For non-high assurance mapped collections, the
             *     default value is false.
             *      */
            disable_anonymous_writes?: boolean;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            domain?: components["schemas"]["Domain"];
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Boolean flag indicating whether this collection should support
             *     HTTPS. This value can be set on mapped collections or guest
             *     collections. However, it may not be set to true on a guest
             *     collection if the value on the related mapped collection is false.
             *      */
            enable_https?: boolean;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating that this endpoint requires computing checksums,
             *     needed for the verify_checksum option of transfer.
             *      */
            force_verify?: boolean;
            /**
             * Format: uuid
             * @description Authentication policy set on mapped collections and inherited by its
             *     guest collections. During authorization, the authentication policy must
             *     be satisfied before permissions are considered. Read-only on guest
             *     collections. (**Added in API 1.15.0**)
             *
             */
            guest_auth_policy_id?: string | null;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /**
             * Format: date
             * @description Date on which this collection was last accessed
             */
            readonly last_access?: string | null;
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Flag indicating if the storage_gateway requires multi-factor
             *     authentication. Only applies to high assurance storage gateways.
             *      */
            readonly require_mfa?: boolean;
            /**
             * @description Flag indicating whether all data transfers to and from this
             *     collection require the remote collection be HA. This can only be
             *     assigned on high assurance mapped collections. High assurance
             *     guest collections inherit the restriction from their associated
             *     mapped collections. This may be set to null to disable this feature.
             *
             *     If a restriction is in place for a collection, then HTTPS access to
             *     it is disabled.
             *
             * @enum {string|null}
             */
            restrict_transfers_to_high_assurance?: "inbound" | "outbound" | "all" | null;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to create new guest
             *     collections on this mapped collection.
             *      */
            sharing_users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to
             *     create new guest collections on this mapped collection.
             *      */
            sharing_users_deny?: string[] | null;
            /** @description Flag indicating whether the guest collection is subject to automatic
             *     deletion if auto_delete_timeout is set on its mapped collection. Only
             *     settable on guest collections. Defaults to false.
             *      */
            skip_auto_delete?: boolean;
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
            /** @description A message for clients to display to users when interacting with
             *     this collection. For guest collections, this property is read-only
             *     and is the same as the value of its related mapped collection. The
             *     message may be up to 256 characters long.
             *      */
            user_message?: string | null;
            /** @description Link to additional messaging for clients to display to users
             *     when interacting with this endpoint, linked to an
             *     HTTP or HTTPS URL. For guest collections, this property is
             *     read-only and is the same as the value of its related mapped
             *     collection.
             *      */
            user_message_link?: string | null;
        };
        /** ActivityNotificationPolicy */
        ActivityNotificationPolicy: {
            status: string[];
            transfer_use: string[];
        };
        /**
         * Collection_1_14_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         *     Version 1.2.0 adds the ability to enable or disable sharing by specific
         *     users.
         *
         *     Version 1.3.0 add support for custom DNS domains on collections.
         *
         *     Version 1.4.0 allows optional multi-factor authentication requirements to
         *     high assurance collections and the ability to require checksums when
         *     transferring data on this collection.
         *
         *     Version 1.5.0 allows administrators to disable permissions that would allow
         *     anonymous users to have write access to an endpoint.
         *
         *     Version 1.6.0 allows administrators of mapped collections to associate
         *     policies that users accessing guest collections must meet beyond the
         *     guest collection permissions.
         *
         *     Version 1.7.0 increases the maximum allowed length of the user_message
         *     property.
         *
         *     Version 1.8.0 adds the delete_protected property. While it is set to true
         *     on a mapped collection, the collection may not be deleted. As of GCS 5.4.69,
         *     this is true by default.
         *
         *     Version 1.9.0 adds the read-only last_access and created_at properties.
         *
         *     Version 1.10.0 adds the acl_expiration_mins property to HA mapped collections.
         *
         *     Version 1.11.0 adds the acl_expiration_mins property to HA guest collection.
         *
         *     Version 1.12.0 adds the restrict_transfers_to_high_assurance property to HA
         *     collections.
         *
         *     Version 1.13.0 adds the auto_delete_timeout property to mapped collections
         *     and the skip_auto_delete property to guest collections.
         *
         *     Version 1.14.0 adds the subscription_admin_verified property to collections
         *     and activity_notification_policy to guest collections.
         *
         */
        Collection_1_14_0: {
            /**
             * @description Type of this document
             * @default collection#1.14.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.14.0";
            /** @description Length of time that guest collection permissions are valid. Only settable on HA guest collections and HA mapped collections and used by guest collections attached to it. When set on both the mapped and guest collections, the lesser value is in effect. Set to null to delete any previously set value. */
            acl_expiration_mins?: number | null;
            activity_notification_policy?: components["schemas"]["ActivityNotificationPolicy"];
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Number of days before unused guest collections will be automatically
             *     deleted. Only settable on mapped collections. Values must be an integer
             *     greater than 0. Set to null to disable automatic guest collection deletion
             *     for the mapped collection. Defaults to disabled.
             *      */
            auto_delete_timeout?: number | null;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /**
             * Format: date
             * @description Date on which this collection was created
             */
            readonly created_at?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description If set to true, this collection can not be deleted. This property
             *     is available only on mapped collections. As of GCS 5.4.69, this is
             *     true by default.
             *      */
            delete_protected?: boolean;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating if guest collections on this mapped collection
             *     allow anonymous write permissions or not. This flag is always true for high
             *     assurance collections. For non-high assurance mapped collections, the
             *     default value is false.
             *      */
            disable_anonymous_writes?: boolean;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            domain?: components["schemas"]["Domain"];
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Boolean flag indicating whether this collection should support
             *     HTTPS. This value can be set on mapped collections or guest
             *     collections. However, it may not be set to true on a guest
             *     collection if the value on the related mapped collection is false.
             *      */
            enable_https?: boolean;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating that this endpoint requires computing checksums,
             *     needed for the verify_checksum option of transfer.
             *      */
            force_verify?: boolean;
            /**
             * Format: uuid
             * @description Authentication policy set on mapped collections and inherited by its
             *     guest collections. During authorization, the authentication policy must
             *     be satisfied before permissions are considered. Read-only on guest
             *     collections. (**Added in API 1.15.0**)
             *
             */
            guest_auth_policy_id?: string | null;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /**
             * Format: date
             * @description Date on which this collection was last accessed
             */
            readonly last_access?: string | null;
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Flag indicating if the storage_gateway requires multi-factor
             *     authentication. Only applies to high assurance storage gateways.
             *      */
            readonly require_mfa?: boolean;
            /**
             * @description Flag indicating whether all data transfers to and from this
             *     collection require the remote collection be HA. This can only be
             *     assigned on high assurance mapped collections. High assurance
             *     guest collections inherit the restriction from their associated
             *     mapped collections. This may be set to null to disable this feature.
             *
             *     If a restriction is in place for a collection, then HTTPS access to
             *     it is disabled.
             *
             * @enum {string|null}
             */
            restrict_transfers_to_high_assurance?: "inbound" | "outbound" | "all" | null;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to create new guest
             *     collections on this mapped collection.
             *      */
            sharing_users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to
             *     create new guest collections on this mapped collection.
             *      */
            sharing_users_deny?: string[] | null;
            /** @description Flag indicating whether the guest collection is subject to automatic
             *     deletion if auto_delete_timeout is set on its mapped collection. Only
             *     settable on guest collections. Defaults to false.
             *      */
            skip_auto_delete?: boolean;
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description Flag indicating whether the collection has been marked as
             *     verified by the administrator of the subscription associated
             *     with this endpoint.
             *      */
            readonly subscription_admin_verified?: boolean;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
            /** @description A message for clients to display to users when interacting with
             *     this collection. For guest collections, this property is read-only
             *     and is the same as the value of its related mapped collection. The
             *     message may be up to 256 characters long.
             *      */
            user_message?: string | null;
            /** @description Link to additional messaging for clients to display to users
             *     when interacting with this endpoint, linked to an
             *     HTTP or HTTPS URL. For guest collections, this property is
             *     read-only and is the same as the value of its related mapped
             *     collection.
             *      */
            user_message_link?: string | null;
        };
        /** FlowAssociation */
        FlowAssociation: {
            transfer?: unknown | components["schemas"]["FlowTransferAssociation"];
        };
        /** FlowTransferAssociation */
        FlowTransferAssociation: {
            destination?: unknown | components["schemas"]["Flow"];
            source?: unknown | components["schemas"]["Flow"];
        };
        /** Flow */
        Flow: {
            flow: string;
        };
        /**
         * Collection_1_15_0
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         *     Version 1.2.0 adds the ability to enable or disable sharing by specific
         *     users.
         *
         *     Version 1.3.0 add support for custom DNS domains on collections.
         *
         *     Version 1.4.0 allows optional multi-factor authentication requirements to
         *     high assurance collections and the ability to require checksums when
         *     transferring data on this collection.
         *
         *     Version 1.5.0 allows administrators to disable permissions that would allow
         *     anonymous users to have write access to an endpoint.
         *
         *     Version 1.6.0 allows administrators of mapped collections to associate
         *     policies that users accessing guest collections must meet beyond the
         *     guest collection permissions.
         *
         *     Version 1.7.0 increases the maximum allowed length of the user_message
         *     property.
         *
         *     Version 1.8.0 adds the delete_protected property. While it is set to true
         *     on a mapped collection, the collection may not be deleted. As of GCS 5.4.69,
         *     this is true by default.
         *
         *     Version 1.9.0 adds the read-only last_access and created_at properties.
         *
         *     Version 1.10.0 adds the acl_expiration_mins property to HA mapped collections.
         *
         *     Version 1.11.0 adds the acl_expiration_mins property to HA guest collection.
         *
         *     Version 1.12.0 adds the restrict_transfers_to_high_assurance property to HA
         *     collections.
         *
         *     Version 1.13.0 adds the auto_delete_timeout property to mapped collections
         *     and the skip_auto_delete property to guest collections.
         *
         *     Version 1.14.0 adds the subscription_admin_verified property to collections
         *     and activity_notification_policy to guest collections.
         *
         *     Version 1.15.0 adds the associated_flow_policy property to the collection.
         *
         */
        Collection_1_15_0: {
            /**
             * @description Type of this document
             * @default collection#1.15.0
             * @enum {string}
             */
            DATA_TYPE: "collection#1.15.0";
            /** @description Length of time that guest collection permissions are valid. Only settable on HA guest collections and HA mapped collections and used by guest collections attached to it. When set on both the mapped and guest collections, the lesser value is in effect. Set to null to delete any previously set value. */
            acl_expiration_mins?: number | null;
            activity_notification_policy?: components["schemas"]["ActivityNotificationPolicy"];
            /** @description Flag indicating if this Collection allows users to create guest
             *     collections on it. This is always false if this is a guest
             *     collection. If this is changed to false on a mapped collection with
             *     associated guest collections, those collections will no longer be
             *     accessible.
             *      */
            allow_guest_collections?: boolean;
            /** @description Policy describing Globus flows to run when the collection is accessed.
             *      */
            associated_flow_policy?: unknown | components["schemas"]["FlowAssociation"];
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated in a session to access this storage gateway.
             *      */
            readonly authentication_timeout_mins?: number;
            /** @description Number of days before unused guest collections will be automatically
             *     deleted. Only settable on mapped collections. Values must be an integer
             *     greater than 0. Set to null to disable automatic guest collection deletion
             *     for the mapped collection. Defaults to disabled.
             *      */
            auto_delete_timeout?: number | null;
            /** @description Path to be interpreted as the base path when creating a new
             *     collection. It is interpreted differently depending on the
             *     collection type being created. For a mapped collection, this is an
             *     absolute path on the storage system named by the
             *     storage_gateway_id.  For a guest collection, this is a relative
             *     path relative to the value of the `root_path` attribute on the
             *     mapped collection with the same Id as the `mapped_collection_id`
             *     property.  This may not be changed once the collection is created.
             *
             *     Support for `~` was added in API version 1.21.0.
             *      */
            collection_base_path: string;
            /**
             * @description Type of collection. A `mapped` collection requires an account on
             *     the system to access the administrator-defined collection. A
             *     `guest` collection allows users to share access to their data on a
             *     Storage Gateway by registering a credential with the GCS Manager.
             *
             * @enum {string}
             */
            collection_type: "mapped" | "guest";
            /**
             * Format: uuid
             * @description Id of the connector type that is used by this collection.
             */
            readonly connector_id?: string;
            /** @description Email address of the support contact for this collection. This is visible
             *     to end users so that they may contact your organization for support.
             *      */
            contact_email?: string | null;
            /** @description Other non-email contact information for the collection, e.g.  phone and
             *     mailing address. This is visible to end users for support.
             *      */
            contact_info?: string | null;
            /**
             * Format: date
             * @description Date on which this collection was created
             */
            readonly created_at?: string | null;
            /** @description Default directory when accessing the collection. This may include
             *     the special string `$USER` which is evaluated at access time to be
             *     the connector-specific username accessing the data.
             *
             *     If the collection is mapped collection with a
             *     **collection_base_path** value of `/`, this value can also begin
             *     with the values `/~/` and `$HOME`, which are replaced by the user's
             *     home directory, or `/` if the connector does not support the
             *     concept of a home directory.
             *      */
            default_directory?: string;
            /** @description If set to true, this collection can not be deleted. This property
             *     is available only on mapped collections. As of GCS 5.4.69, this is
             *     true by default.
             *      */
            delete_protected?: boolean;
            /** @description Flag indicating that this collection has been deleted */
            readonly deleted?: boolean;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Optional. Unicode string, max 1024
             *     characters, no new lines.
             *      */
            department?: string | null;
            /** @description A description of the collection. */
            description?: string | null;
            /** @description Flag indicating if guest collections on this mapped collection
             *     allow anonymous write permissions or not. This flag is always true for high
             *     assurance collections. For non-high assurance mapped collections, the
             *     default value is false.
             *      */
            disable_anonymous_writes?: boolean;
            /** @description Flag indicating that this endpoint does not support computing
             *     checksums, needed for the verify_checksum option of transfer.
             *      */
            disable_verify?: boolean;
            /** @description Friendly name for the collection. Unicode string, max 128
             *     characters, no new lines (`\r` or `\n`).
             *      */
            display_name: string;
            domain?: components["schemas"]["Domain"];
            /** @description DNS name of the virtual host serving this collection. For mapped
             *     collections which do not have a custom domain, this may be specified as
             *     part of the input document to create the collection, otherwise this is
             *     a read-only property. When included in the input, the name is
             *     restricted to be a subdomain of the endpoint, and the input name label
             *     may not start with `m-` or `g-`.
             *      */
            domain_name?: string;
            /** @description Boolean flag indicating whether this collection should support
             *     HTTPS. This value can be set on mapped collections or guest
             *     collections. However, it may not be set to true on a guest
             *     collection if the value on the related mapped collection is false.
             *      */
            enable_https?: boolean;
            /** @description Flag indicating whether all data transfers to and from this
             *     collection are always encrypted.
             *
             *     __New in v5.4.17__: If a mapped collection forces encryption, all
             *     of its guest collections must as well.  If this option is used on a
             *     mapped collection, the value is propagated to its guest
             *     collections.
             *      */
            force_encryption?: boolean;
            /** @description Flag indicating that this endpoint requires computing checksums,
             *     needed for the verify_checksum option of transfer.
             *      */
            force_verify?: boolean;
            /**
             * Format: uuid
             * @description Authentication policy set on mapped collections and inherited by its
             *     guest collections. During authorization, the authentication policy must
             *     be satisfied before permissions are considered. Read-only on guest
             *     collections. (**Added in API 1.15.0**)
             *
             */
            guest_auth_policy_id?: string | null;
            /** @description Flag indicating if this collection is created on a high assurance
             *     Storage Gateway.
             *      */
            readonly high_assurance?: boolean;
            /** @description HTTPS URL for the data on this collection. */
            readonly https_url?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this collection. This is assigned
             *     by the GCS manager when creating a collection.
             *
             */
            readonly id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity to who acts as the owner of this collection.
             *     This identity is an `administrator` on the collection.
             *
             */
            identity_id?: string;
            /** @description Link to a web page with more information about the collection */
            info_link?: string | null;
            /** @description List of search keywords for the
             *     endpoint.  Optional. Unicode string, max 1024
             *     characters total across all strings.
             *      */
            keywords?: string[];
            /**
             * Format: date
             * @description Date on which this collection was last accessed
             */
            readonly last_access?: string | null;
            /** @description URL of the GCS Manager API service for the endpoint hosting this
             *     collection.
             *      */
            readonly manager_url?: string;
            /**
             * Format: uuid
             * @description Unique ID of the Mapped Collection which this guest collection is
             *     associated with. This is set on creation and may not be changed.
             *     For a Guest Collection, this must be set, and policies related
             *     sharing (`allow_guest_collections`, `sharing_restrict_paths`) will
             *     always reflect the values in the Mapped Collection definition and
             *     may not be changed on this Guest Collection.
             *
             */
            mapped_collection_id?: string;
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Optional to preserve backward compatibility, but will eventually be
             *     required and all clients are encouraged to require users to specify
             *     it.  Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Connector-specific collection policies */
            policies?: components["schemas"]["S3CollectionPolicies_1_0_0"] | components["schemas"]["AzureBlobCollectionPolicies_1_0_0"] | components["schemas"]["BlackPearlCollectionPolicies_1_0_0"] | components["schemas"]["BoxCollectionPolicies_1_0_0"] | components["schemas"]["CephCollectionPolicies_1_0_0"] | components["schemas"]["DropboxCollectionPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"] | components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"] | components["schemas"]["HPSSCollectionPolicies_1_0_0"] | components["schemas"]["IrodsCollectionPolicies_1_0_0"] | components["schemas"]["OneDriveCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"] | components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
            /** @description Flag indicating whether this collection is visible to other Globus
             *     users.
             *      */
            public: boolean;
            /** @description Flag indicating if the storage_gateway requires multi-factor
             *     authentication. Only applies to high assurance storage gateways.
             *      */
            readonly require_mfa?: boolean;
            /**
             * @description Flag indicating whether all data transfers to and from this
             *     collection require the remote collection be HA. This can only be
             *     assigned on high assurance mapped collections. High assurance
             *     guest collections inherit the restriction from their associated
             *     mapped collections. This may be set to null to disable this feature.
             *
             *     If a restriction is in place for a collection, then HTTPS access to
             *     it is disabled.
             *
             * @enum {string|null}
             */
            restrict_transfers_to_high_assurance?: "inbound" | "outbound" | "all" | null;
            /** @description Absolute root path of the collection. All data access
             *     is done relative to this path. On a guest collection,
             *     this value is only visible if the caller has an
             *     administrator role on both the guest collection and the
             *     mapped collection it is created on.
             *      */
            readonly root_path?: string;
            /** @description Restrictions on which paths may be shared in guest collections related
             *     to this mapped collection. On the mapped collection, these paths are
             *     relative to the root_path property of the mapped collection. On a guest
             *     collection, they are absolute paths from the storage root.
             *      */
            sharing_restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to create new guest
             *     collections on this mapped collection.
             *      */
            sharing_users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to
             *     create new guest collections on this mapped collection.
             *      */
            sharing_users_deny?: string[] | null;
            /** @description Flag indicating whether the guest collection is subject to automatic
             *     deletion if auto_delete_timeout is set on its mapped collection. Only
             *     settable on guest collections. Defaults to false.
             *      */
            skip_auto_delete?: boolean;
            /**
             * Format: uuid
             * @description Unique ID of the Storage Gateway which this collection provides
             *     access to. This value can not change after the collection is
             *     created.
             *
             */
            storage_gateway_id?: string;
            /** @description Flag indicating whether the collection has been marked as
             *     verified by the administrator of the subscription associated
             *     with this endpoint.
             *      */
            readonly subscription_admin_verified?: boolean;
            /** @description TLSFTP URL for the data on this collection. */
            readonly tlsftp_url?: string;
            /**
             * Format: uuid
             * @description The ID of the User Credential which is used to access data on this
             *     collection. This credential must be owned by the collection's
             *     identity_id.
             *
             */
            user_credential_id?: string;
            /** @description A message for clients to display to users when interacting with
             *     this collection. For guest collections, this property is read-only
             *     and is the same as the value of its related mapped collection. The
             *     message may be up to 256 characters long.
             *      */
            user_message?: string | null;
            /** @description Link to additional messaging for clients to display to users
             *     when interacting with this endpoint, linked to an
             *     HTTP or HTTPS URL. For guest collections, this property is
             *     read-only and is the same as the value of its related mapped
             *     collection.
             *      */
            user_message_link?: string | null;
        };
        /**
         * CollectionNotFound_1_0_0
         * @description Error details when a mapped collection no longer exists when accessing a
         *     guest collection.
         *
         */
        CollectionNotFound_1_0_0: {
            /**
             * @description Type of this document
             * @default collection_not_found#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "collection_not_found#1.0.0";
            /**
             * Format: uuid
             * @description collection ID
             */
            collection_id?: string;
        };
        /**
         * CollectionOwner_1_0_0
         * @description Schema for processing the collection_owner#1.0.0 data type
         *
         */
        CollectionOwner_1_0_0: {
            /**
             * @description Type of this document
             * @default collection_owner#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "collection_owner#1.0.0";
            /**
             * Format: uuid
             * @description Auth identity ID of the collection owner
             */
            identity_id: string;
        };
        /**
         * Connector_1_0_0
         * @description Connector information document
         *
         */
        Connector_1_0_0: {
            /**
             * @description Type of this document
             * @default connector#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "connector#1.0.0";
            /**
             * @description Friendly name of the connector
             * @example POSIX
             */
            display_name: string;
            /** @description Unique id of this connector type */
            id: string;
            /** @description Semantic version of this connector implementation */
            version?: string;
        };
        /**
         * Connector_1_1_0
         * @description Connector information document
         *
         *         Version 1.1.0 adds information about HA and BAA subscriptions.
         *
         */
        Connector_1_1_0: {
            /**
             * @description Type of this document
             * @default connector#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "connector#1.1.0";
            /**
             * @description Friendly name of the connector
             * @example POSIX
             */
            display_name: string;
            /** @description Unique id of this connector type */
            id: string;
            /** @description Subscription for this connector supports a BAA */
            is_baa?: boolean;
            /** @description Subscription for this connector supports high assurance */
            is_ha?: boolean;
            /** @description Semantic version of this connector implementation */
            version?: string;
        };
        /**
         * Account
         * @description User account information for a particular Storage Gateway.
         */
        Account: components["schemas"]["Account_1_0_0"];
        /**
         * CredentialNotFound_1_0_0
         * @description Error details when a user has attempted to use a credential when creating a
         *     collection or logging in, but there are multiple mapped identities and none
         *     of them have a valid credential.
         *
         */
        CredentialNotFound_1_0_0: {
            /**
             * @description Type of this document
             * @default credential_not_found#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "credential_not_found#1.0.0";
            /** @description List of available accounts that do not have credentials registered.
             *      */
            accounts: components["schemas"]["Account"][];
        };
        /**
         * Endpoint_1_0_0
         * @description A Globus Connect Server endpoint is a deployment of Globus Connect Server
         *     version 5. A single endpoint may optionally include multiple data transfer
         *     nodes. The endpoint provides a link between a Globus Connect Server
         *     deployment and the Globus Transfer service. The endpoint describes services
         *     for accessing data via GridFTP and HTTPS and also for configuring and
         *     managing the policies associated with that access.
         *
         */
        Endpoint_1_0_0: {
            /**
             * @description Type of this document
             * @default endpoint#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "endpoint#1.0.0";
            /** @description Allow data transfer on this endpoint using the UDT protocol */
            allow_udt?: boolean;
            /** @description Email address of the support contact for this endpoint. This is visible to end users so that they may contact your organization for support. */
            contact_email?: string;
            /** @description Other non-email contact information for the endpoint, e.g.  phone and mailing address. This is visible to end users for support. */
            contact_info?: string;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Unicode string, max 1024 characters, no new lines.
             *      */
            department?: string;
            /** @description A description of the endpoint */
            description?: string;
            /** @description Friendly name for the endpoint, not unique.  Unicode string, no new
             *     lines (`\r` or `\n`).  Searchable.
             *      */
            display_name: string;
            /**
             * Format: uuid
             * @description Unique identifier for this endpoint
             */
            id?: string;
            /** @description URL of the GCS Manager API service for this endpoint */
            readonly gcs_manager_url?: string;
            /** @description Link to a web page with more information about the endpoint. The
             *     administrator is responsible for running a website at this URL and
             *     verifying that it is accepting public connections.
             *      */
            info_link?: string;
            /** @description List of search keywords for the endpoint. Unicode
             *     string, max 1024 characters total across all strings.
             *      */
            keywords?: string[];
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            max_concurrency?: number;
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            max_parallelism?: number;
            /**
             * @description Control how Globus interacts with this endpoint over the network.
             *
             *     Allowed values for **network_use** are:
             *
             *     * `normal`
             *         - The default setting. Uses an average level of concurrency and
             *           parallelism. The levels depend on the number of physical
             *           servers in the endpoint.
             *     * `minimal`
             *         - Uses a minimal level of concurrency and parallelism.
             *     * `aggressive`
             *         - Uses a high level of concurrency and parallelism.
             *     * `custom`
             *         - Uses custom values of concurrency and parallelism set by the
             *           endpoint admin. When setting this level, you must also set
             *           the **max_concurrency**, **preferred_concurrency**,
             *           **max_parallelism**, and **preferred_parallelism** properties.
             *
             * @default normal
             * @enum {string}
             */
            network_use: "normal" | "minimal" | "aggressive" | "custom";
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            preferred_concurrency?: number;
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            preferred_parallelism?: number;
            /**
             * @description Flag indicating whether this endpoint is visible to all other
             *     Globus users. If false, only users which have been granted a role
             *     on the endpoint or one of its collections, or belong to a domain
             *     allowed access to any of its storage gateways may view it.
             *
             * @default true
             */
            public: boolean;
            /** @description The id of the subscription that is managing this endpoint.  This may be
             *     the special value `DEFAULT` when using this as input to PATCH or PUT to
             *     use the caller's default subscription id.
             *      */
            subscription_id?: string | null;
        };
        /**
         * Endpoint_1_1_0
         * @description A Globus Connect Server endpoint is a deployment of Globus Connect Server
         *     version 5. A single endpoint may optionally include multiple data transfer
         *     nodes. The endpoint provides a link between a Globus Connect Server
         *     deployment and the Globus Transfer service. The endpoint describes services
         *     for accessing data via GridFTP and HTTPS and also for configuring and
         *     managing the policies associated with that access.
         *
         *     Version 1.1.0 of the endpoint includes support for customizing the TCP port
         *     that the GridFTP listens on.
         *
         */
        Endpoint_1_1_0: {
            /**
             * @description Type of this document
             * @default endpoint#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "endpoint#1.1.0";
            /** @description Allow data transfer on this endpoint using the UDT protocol */
            allow_udt?: boolean;
            /** @description Email address of the support contact for this endpoint. This is visible to end users so that they may contact your organization for support. */
            contact_email?: string;
            /** @description Other non-email contact information for the endpoint, e.g.  phone and mailing address. This is visible to end users for support. */
            contact_info?: string;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Unicode string, max 1024 characters, no new lines.
             *      */
            department?: string;
            /** @description A description of the endpoint */
            description?: string;
            /** @description Friendly name for the endpoint, not unique.  Unicode string, no new
             *     lines (`\r` or `\n`).  Searchable.
             *      */
            display_name: string;
            /**
             * Format: uuid
             * @description Unique identifier for this endpoint
             */
            id?: string;
            /** @description URL of the GCS Manager API service for this endpoint */
            readonly gcs_manager_url?: string;
            /** @description TCP port for the Globus control channel to listen on. By default,
             *     the control channel is passed through 443 with an ALPN header
             *     containing the value "ftp".
             *      */
            gridftp_control_channel_port?: number | null;
            /** @description Link to a web page with more information about the endpoint. The
             *     administrator is responsible for running a website at this URL and
             *     verifying that it is accepting public connections.
             *      */
            info_link?: string;
            /** @description List of search keywords for the endpoint. Unicode
             *     string, max 1024 characters total across all strings.
             *      */
            keywords?: string[];
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            max_concurrency?: number;
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            max_parallelism?: number;
            /**
             * @description Control how Globus interacts with this endpoint over the network.
             *
             *     Allowed values for **network_use** are:
             *
             *     * `normal`
             *         - The default setting. Uses an average level of concurrency and
             *           parallelism. The levels depend on the number of physical
             *           servers in the endpoint.
             *     * `minimal`
             *         - Uses a minimal level of concurrency and parallelism.
             *     * `aggressive`
             *         - Uses a high level of concurrency and parallelism.
             *     * `custom`
             *         - Uses custom values of concurrency and parallelism set by the
             *           endpoint admin. When setting this level, you must also set
             *           the **max_concurrency**, **preferred_concurrency**,
             *           **max_parallelism**, and **preferred_parallelism** properties.
             *
             * @default normal
             * @enum {string}
             */
            network_use: "normal" | "minimal" | "aggressive" | "custom";
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            preferred_concurrency?: number;
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            preferred_parallelism?: number;
            /**
             * @description Flag indicating whether this endpoint is visible to all other
             *     Globus users. If false, only users which have been granted a role
             *     on the endpoint or one of its collections, or belong to a domain
             *     allowed access to any of its storage gateways may view it.
             *
             * @default true
             */
            public: boolean;
            /** @description The id of the subscription that is managing this endpoint.  This may be
             *     the special value `DEFAULT` when using this as input to PATCH or PUT to
             *     use the caller's default subscription id.
             *      */
            subscription_id?: string | null;
        };
        /**
         * Endpoint_1_2_0
         * @description A Globus Connect Server endpoint is a deployment of Globus Connect Server
         *     version 5. A single endpoint may optionally include multiple data transfer
         *     nodes. The endpoint provides a link between a Globus Connect Server
         *     deployment and the Globus Transfer service. The endpoint describes services
         *     for accessing data via GridFTP and HTTPS and also for configuring and
         *     managing the policies associated with that access.
         *
         *     Version 1.1.0 of the endpoint includes support for customizing the TCP port
         *     that the GridFTP listens on.
         *
         *     Version 1.2.0 of the endpoint includes read-only earliest_last_access
         *     to put a limit on collections which are missing a last_access value.
         *
         */
        Endpoint_1_2_0: {
            /**
             * @description Type of this document
             * @default endpoint#1.2.0
             * @enum {string}
             */
            DATA_TYPE: "endpoint#1.2.0";
            /** @description Allow data transfer on this endpoint using the UDT protocol */
            allow_udt?: boolean;
            /** @description Email address of the support contact for this endpoint. This is visible to end users so that they may contact your organization for support. */
            contact_email?: string;
            /** @description Other non-email contact information for the endpoint, e.g.  phone and mailing address. This is visible to end users for support. */
            contact_info?: string;
            /** @description Department within organization that runs the server(s).
             *     Searchable. Unicode string, max 1024 characters, no new lines.
             *      */
            department?: string;
            /** @description A description of the endpoint */
            description?: string;
            /** @description Friendly name for the endpoint, not unique.  Unicode string, no new
             *     lines (`\r` or `\n`).  Searchable.
             *      */
            display_name: string;
            /**
             * Format: date
             * @description Earliest date when this endpoint began tracking last_access for
             *     collections
             *
             */
            readonly earliest_last_access?: string;
            /**
             * Format: uuid
             * @description Unique identifier for this endpoint
             */
            id?: string;
            /** @description URL of the GCS Manager API service for this endpoint */
            readonly gcs_manager_url?: string;
            /** @description TCP port for the Globus control channel to listen on. By default,
             *     the control channel is passed through 443 with an ALPN header
             *     containing the value "ftp".
             *      */
            gridftp_control_channel_port?: number | null;
            /** @description Link to a web page with more information about the endpoint. The
             *     administrator is responsible for running a website at this URL and
             *     verifying that it is accepting public connections.
             *      */
            info_link?: string;
            /** @description List of search keywords for the endpoint. Unicode
             *     string, max 1024 characters total across all strings.
             *      */
            keywords?: string[];
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            max_concurrency?: number;
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            max_parallelism?: number;
            /**
             * @description Control how Globus interacts with this endpoint over the network.
             *
             *     Allowed values for **network_use** are:
             *
             *     * `normal`
             *         - The default setting. Uses an average level of concurrency and
             *           parallelism. The levels depend on the number of physical
             *           servers in the endpoint.
             *     * `minimal`
             *         - Uses a minimal level of concurrency and parallelism.
             *     * `aggressive`
             *         - Uses a high level of concurrency and parallelism.
             *     * `custom`
             *         - Uses custom values of concurrency and parallelism set by the
             *           endpoint admin. When setting this level, you must also set
             *           the **max_concurrency**, **preferred_concurrency**,
             *           **max_parallelism**, and **preferred_parallelism** properties.
             *
             * @default normal
             * @enum {string}
             */
            network_use: "normal" | "minimal" | "aggressive" | "custom";
            /** @description Organization that runs the server(s) represented by the endpoint.
             *     Unicode string, max 1024 characters, no new lines.
             *      */
            organization?: string;
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            preferred_concurrency?: number;
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            preferred_parallelism?: number;
            /**
             * @description Flag indicating whether this endpoint is visible to all other
             *     Globus users. If false, only users which have been granted a role
             *     on the endpoint or one of its collections, or belong to a domain
             *     allowed access to any of its storage gateways may view it.
             *
             * @default true
             */
            public: boolean;
            /** @description The id of the subscription that is managing this endpoint.  This may be
             *     the special value `DEFAULT` when using this as input to PATCH or PUT to
             *     use the caller's default subscription id.
             *      */
            subscription_id?: string | null;
        };
        /**
         * EndpointOwner_1_0_0
         * @description Schema for processing the endpoint_owner#1.0.0 data type
         *
         */
        EndpointOwner_1_0_0: {
            /**
             * @description Type of this document
             * @default endpoint_owner#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "endpoint_owner#1.0.0";
            /**
             * Format: uuid
             * @description Auth identity ID of the endpoint owner
             */
            identity_id: string;
        };
        /**
         * EndpointSubscription_1_0_0
         * @description Endpoint subscription
         *
         */
        EndpointSubscription_1_0_0: {
            /**
             * @description Type of this document
             * @default endpoint_subscription#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "endpoint_subscription#1.0.0";
            /** @description Either the id of a Globus subscription or the special value
             *     "DEFAULT" if the caller has only one subscription associated with
             *     their identity set.
             *      */
            subscription_id: string | null;
        };
        /**
         * IdNotInIdentitySet_1_0_0
         * @description Error details when a user has authenticated but has requested to act as an
         *     identity not in the current identity set.
         *
         */
        IdNotInIdentitySet_1_0_0: {
            /**
             * @description Type of this document
             * @default id_not_in_identity_set#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "id_not_in_identity_set#1.0.0";
            /**
             * Format: uuid
             * @description Requested identity ID
             */
            id?: string;
        };
        /**
         * Info_1_0_0
         * @description This document contains information about the Globus Connect
         *     Server, including its software and supported API version
         *     number.
         *
         */
        Info_1_0_0: {
            /**
             * @description Type of this document
             * @default info#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "info#1.0.0";
            /** @description Semantic version of the Globus Connect Server API */
            api_version?: string;
            /**
             * Format: uuid
             * @description Client id that created the endpoint
             */
            client_id?: string;
            /** @description Domain name for the GCS Manager service */
            domain_name?: string;
            /**
             * Format: uuid
             * @description Transfer endpoint ID managed by this GCS Manager
             */
            endpoint_id?: string;
            /** @description Globus Connect Server software version */
            manager_version?: string;
        };
        /**
         * InvalidCredential_1_0_0
         * @description Error details when the caller's identity maps to an account with a user
         *     credential that is in an invalid state.
         *
         */
        InvalidCredential_1_0_0: {
            /**
             * @description Type of this document
             * @default invalid_credential#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "invalid_credential#1.0.0";
            /**
             * Format: uuid
             * @description The ID of the user credential which needs to be fixed before this
             *     resource can be accessed.
             *
             */
            user_credential_id: string;
        };
        /**
         * InvalidInputItem
         * @description Invalid input item details.
         *
         */
        InvalidInputItem: {
            /** @description Name of the property whose value contains the error, if known. May
             *     be unset depending on the error.
             *      */
            property?: string;
            /** @description Error message describing the invalid input error */
            message: string;
        };
        /**
         * InvalidInput_1_0_0
         * @description Error details when the caller has sent an invalid input document.
         *
         */
        InvalidInput_1_0_0: {
            /**
             * @description Type of this document
             * @default invalid_input#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "invalid_input#1.0.0";
            /** @description Optional list of input schema violations, such as missing or
             *     unknown properties, or properties with invalid values.
             *      */
            errors?: components["schemas"]["InvalidInputItem"][];
        };
        /**
         * InvalidUser_1_0_0
         * @description Error details when the caller's identity does not map to valid local
         *     account.
         *
         */
        InvalidUser_1_0_0: {
            /**
             * @description Type of this document
             * @default invalid_user#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "invalid_user#1.0.0";
            /** @description List of connector-specific usernames */
            usernames?: string[];
        };
        /**
         * ExternalIdentityMapping_1_0_0
         * @description The ExternalIdentityMapping defines the path and arguments of an external
         *     program to map an identity to a storage-gateway specific user account name.
         *     The specified command will be called to map Globus Auth identity data to a
         *     connector-specific list of account names.
         *
         */
        ExternalIdentityMapping_1_0_0: {
            /**
             * @description Type of this document
             * @default external_identity_mapping#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "external_identity_mapping#1.0.0";
            /** @description The mapping command and its command-line arguments.  In addition to
             *     these arguments, the following will also be passed to the program.
             *
             *     <dl><dt>-c <em>CONNECTOR_ID</em></dt>
             *     <dd>
             *     The ID of the connector that the mapping is being
             *     done in the context of.
             *     </dd>
             *     <dt>-s <em>STORAGE_GATEWAY_ID</em></dt>
             *     <dd>
             *     The ID of the storage gateway that the mapping is being done in
             *     the context of.
             *     </dd>
             *     <dt>-a</dt>
             *     <dd>This option is a flag that indicates that the GCS Manager wants to
             *     receive output containing all mappings for the given identity set.  If
             *     not present, the program will receive exactly one object in the
             *     identities array and may only return a single mapping for that
             *     identity.
             *     </dd>
             *     </dl>
             *      */
            command?: string[];
        };
        /**
         * MappingExpression
         * @description The MappingExpression document type contains information about a mapping
         *     expression, including the input, match, output, and flags used to process
         *     this expression.
         *
         */
        MappingExpression: {
            /** @description Flag indicating the match should be executed as a case insensitive
             *     comparison. If not present, this defaults to false.
             *      */
            ignore_case?: boolean;
            /** @description Flag indicating the match expression should be done as a literal
             *     match, ignoring any special regular characters. If not present,
             *     this defaults to false.
             *      */
            literal?: boolean;
            /** @description An expression which is applied to the output performing
             *     interpolation on source for determining if this mapping applies.
             *     This requires a full string match on the source.
             *      */
            match?: string;
            /** @description A string representing the result of the mapping if the match
             *     succeeded. References to the original identity_set data can be
             *     interpolated as in the *source* property.  References to match
             *     groups from the *match* property can be interpolated with numbers
             *     (indices starting with 0) surrounded by curly brackets `{}`.
             *      */
            output?: string;
            /** @description A string comprised of text plus identity set data field names
             *     surrounded by curly brackets `{}` which are interpolated into the
             *     text.
             *      */
            source?: string;
        };
        /**
         * ExpressionIdentityMapping_1_0_0
         * @description The ExpressionIdentityMapping defines a set of identity mapping expressions
         *     to map Globus Auth identity data to a connector-specific list of account
         *     names.
         *
         */
        ExpressionIdentityMapping_1_0_0: {
            /**
             * @description Type of this document
             * @default expression_identity_mapping#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "expression_identity_mapping#1.0.0";
            /** @description Array of expression-based identity mapping values */
            mappings?: components["schemas"]["MappingExpression"][];
        };
        /**
         * LimitExceeded_1_0_0
         * @description Error details when a user would be authorized, but the endpoint has reached
         *     a hard resource limit on the type of object being created.
         *
         */
        LimitExceeded_1_0_0: {
            /**
             * @description Type of this document
             * @default limit_exceeded#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "limit_exceeded#1.0.0";
        };
        /**
         * MissingRoleEntrySchema
         * @description Missing required role details.
         *
         */
        MissingRoleEntrySchema: {
            /**
             * Format: uuid
             * @description The collection which the role must apply to. If omitted, the role
             *     must apply to an endpoint.
             *
             */
            collection?: string;
            /** @enum {string} */
            role: "owner" | "administrator" | "access_manager" | "activity_manager" | "activity_monitor" | "access_monitor";
        };
        /**
         * MissingRequiredRole_1_0_0
         * @description Error details when a user has authenticated but lacks a role to be able to
         *     perform the requested operation.
         *
         */
        MissingRequiredRole_1_0_0: {
            /**
             * @description Type of this document
             * @default missing_required_role#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "missing_required_role#1.0.0";
            /** @description List of roles authorized to perform this operation */
            roles?: components["schemas"]["MissingRoleEntrySchema"][];
        };
        /**
         * MissingRequiredScopes_1_0_0
         * @description Error details when a user has authenticated but lacks an OAuth scope to be
         *     able to perform the requested operation.
         *
         */
        MissingRequiredScopes_1_0_0: {
            /**
             * @description Type of this document
             * @default missing_required_scopes#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "missing_required_scopes#1.0.0";
            /** @description List of OAuth scope names */
            required_scopes?: string[];
        };
        /**
         * Node_1_0_0
         * @description Services for Globus Connect Server endpoints may be deployed on multiple
         *     different physical resources, referred to as data transfer nodes. Each node
         *     may have one or more IP addresses, TCP incoming and outgoing port ranges,
         *     and a *status* value indicating whether it is configured to actively
         *     respond to requests or is in maintenance mode.
         *
         */
        Node_1_0_0: {
            /**
             * @description Type of this document
             * @default node#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "node#1.0.0";
            /**
             * Format: uuid
             * @description Unique id string this node. This is system generated and may not
             *     be included in create requests.
             *
             */
            id?: string;
            /** @description Allowed port range for incoming TCP data connections */
            incoming_port_range?: number[];
            /** @description List of IP addresses for this node */
            ip_addresses: string[];
            /** @description Port range used as the source for outgoing TCP data connections */
            outgoing_port_range?: number[];
            /**
             * @description Current status of the Node. If a Node is marked *inactive*, it will
             *     be removed from the DNS entries for this endpoint and will return
             *     an error on any attempt to use the Manager API or attempt a
             *     Transfer using this node.
             *
             * @enum {string}
             */
            status: "active" | "inactive";
        };
        /**
         * Node_1_1_0
         * @description Services for Globus Connect Server endpoints may be deployed on multiple
         *     different physical resources, referred to as data transfer nodes. Each node
         *     may have one or more IP addresses, TCP incoming and outgoing port ranges,
         *     and a *status* value indicating whether it is configured to actively
         *     respond to requests or is in maintenance mode.
         *
         *     Version 1.1.0 adds support for setting the data interface on a node.
         *
         */
        Node_1_1_0: {
            /**
             * @description Type of this document
             * @default node#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "node#1.1.0";
            /** @description IP address on which this node listens for data transfers */
            data_interface?: string | null;
            /**
             * Format: uuid
             * @description Unique id string this node. This is system generated and may not
             *     be included in create requests.
             *
             */
            id?: string;
            /** @description Allowed port range for incoming TCP data connections */
            incoming_port_range?: number[];
            /** @description List of IP addresses for this node */
            ip_addresses: string[];
            /** @description Port range used as the source for outgoing TCP data connections */
            outgoing_port_range?: number[];
            /**
             * @description Current status of the Node. If a Node is marked *inactive*, it will
             *     be removed from the DNS entries for this endpoint and will return
             *     an error on any attempt to use the Manager API or attempt a
             *     Transfer using this node.
             *
             * @enum {string}
             */
            status: "active" | "inactive";
        };
        /**
         * Node_1_2_0
         * @description Services for Globus Connect Server endpoints may be deployed on multiple
         *     different physical resources, referred to as data transfer nodes. Each node
         *     may have one or more IP addresses, TCP incoming and outgoing port ranges,
         *     and a *status* value indicating whether it is configured to actively
         *     respond to requests or is in maintenance mode.
         *
         *     Version 1.1.0 adds support for setting the data interface on a node.
         *
         *     Version 1.2.0 adds support for setting an IPv6 data interface on a node.
         *
         */
        Node_1_2_0: {
            /**
             * @description Type of this document
             * @default node#1.2.0
             * @enum {string}
             */
            DATA_TYPE: "node#1.2.0";
            /** @description IP address on which this node listens for data transfers */
            data_interface?: string | null;
            /** @description IPv6 address on which this node listens for data transfers */
            data_interface6?: string | null;
            /**
             * Format: uuid
             * @description Unique id string this node. This is system generated and may not
             *     be included in create requests.
             *
             */
            id?: string;
            /** @description Allowed port range for incoming TCP data connections */
            incoming_port_range?: number[];
            /** @description List of IP addresses for this node */
            ip_addresses: string[];
            /** @description Port range used as the source for outgoing TCP data connections */
            outgoing_port_range?: number[];
            /**
             * @description Current status of the Node. If a Node is marked *inactive*, it will
             *     be removed from the DNS entries for this endpoint and will return
             *     an error on any attempt to use the Manager API or attempt a
             *     Transfer using this node.
             *
             * @enum {string}
             */
            status: "active" | "inactive";
        };
        /**
         * NotFromAllowedDomain_1_0_0
         * @description Error details when a user has authenticated but does not
         *     have an identity from the required domain to perform the
         *     requested action.
         *
         */
        NotFromAllowedDomain_1_0_0: {
            /**
             * @description Type of this document
             * @default not_from_allowed_domain#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "not_from_allowed_domain#1.0.0";
            /** @description List of domains allowed by this resource */
            allowed_domains?: string[];
        };
        /**
         * NotResourceOwner_1_0_0
         * @description Error details when a user has authenticated but is not the owner of the
         *     resource being acted upon.
         *
         */
        NotResourceOwner_1_0_0: {
            /**
             * @description Type of this document
             * @default not_resource_owner#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "not_resource_owner#1.0.0";
            /**
             * Format: uuid
             * @description Identity ID of the owner of the resource
             */
            id?: string;
        };
        /**
         * SubscriptionAdminVerified_1_0_0
         * @description Subscription Admin Verified
         */
        SubscriptionAdminVerified_1_0_0: {
            /**
             * @description Type of this document
             * @default subscription_admin_verified#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "subscription_admin_verified#1.0.0";
            /** @description Value of the subscription_admin_verified property of a collection. This
             *     can be set or cleared by a subscription group administrator.
             *      */
            subscription_admin_verified: boolean;
        };
        /**
         * OwnerString_1_0_0
         * @description Owner string document
         *
         */
        OwnerString_1_0_0: {
            /**
             * @description Type of this document
             * @default owner_string#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "owner_string#1.0.0";
            /**
             * Format: uuid
             * @description Globus Auth Identity id
             */
            identity_id?: string;
        };
        /**
         * Result_1_0_0
         * @description This is the result envelope returned from all operations in this API. Each
         *     operation may add properties to this base document type with additional
         *     operation-specific data values.
         *
         */
        Result_1_0_0: {
            /**
             * @description Type of this document
             * @default result#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "result#1.0.0";
            /** @description String response code */
            code: string;
            data?: Record<string, unknown>[];
            detail?: unknown;
            /**
             * @description Boolean flag indicating whether or not additional pages of response
             *     data may be requested by passing the marker to the same operation.
             *
             * @default false
             */
            has_next_page: boolean;
            /** @description Numeric HTTP response code */
            http_response_code: number;
            /** @description Opaque marker that may be passed to this API call to fetch the next
             *     page of results if the returned document has `has_next_page` set to
             *     true.
             *      */
            marker?: string | null;
            /** @description Message describing this result */
            message?: string;
        };
        /**
         * Result_1_1_0
         * @description This is the result envelope returned from all operations in this API. Each
         *     operation may add properties to this base document type with additional
         *     operation-specific data values.
         *
         *     Version 1.1.0 adds optional authorization_parameters to help process
         *     authorization or authentication errors
         *
         */
        Result_1_1_0: {
            /**
             * @description Type of this document
             * @default result#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "result#1.1.0";
            authorization_parameters?: {
                [key: string]: unknown;
            } | null;
            /** @description String response code */
            code: string;
            data?: Record<string, unknown>[];
            detail?: unknown;
            /**
             * @description Boolean flag indicating whether or not additional pages of response
             *     data may be requested by passing the marker to the same operation.
             *
             * @default false
             */
            has_next_page: boolean;
            /** @description Numeric HTTP response code */
            http_response_code: number;
            /** @description Opaque marker that may be passed to this API call to fetch the next
             *     page of results if the returned document has `has_next_page` set to
             *     true.
             *      */
            marker?: string | null;
            /** @description Message describing this result */
            message?: string;
        };
        /**
         * ResourceConflict_1_0_0
         * @description Error details when the caller has attempted to update an object that
         *     results in a conflict with some other object.
         *
         */
        ResourceConflict_1_0_0: {
            /**
             * @description Type of this document
             * @default resource_conflict#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "resource_conflict#1.0.0";
            /** @description List of other resources which conflict with this proposed change.
             *      */
            resources?: string[];
        };
        /**
         * Role_1_0_0
         * @description The "Role" document type represents the assignment of a role on an
         *     Endpoint or Collection to a Globus identity or group.
         *
         */
        Role_1_0_0: {
            /**
             * @description Type of this document
             * @default role#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "role#1.0.0";
            /**
             * Format: uuid
             * @description Unique id string for this role assignment. This is system generated
             *     and should not be included in create requests.
             *
             */
            id?: string;
            /** @description Globus Auth identity or group id URN */
            principal: string;
            /**
             * Format: uuid
             * @description Collection Id. This value is omitted when creating an endpoint role
             *     or when creating role definitions when creating "collections.
             *
             */
            collection?: string | null;
            /**
             * @description Role assigned to the principal
             * @enum {string}
             */
            role: "owner" | "administrator" | "access_manager" | "activity_manager" | "activity_monitor" | "access_monitor";
        };
        /**
         * IdentityMapping
         * @description Globus Connect Server provides two ways for you to implement a custom
         *     Globus identity to account mapping: expression-based and external program
         *
         *     With expression-based mapping you can write rules that extract data from
         *     fields in the Globus identity document to form storage gateway-specific
         *     usernames. If there is a regular relationship between most of your users'
         *     Identity information to their account names, this is probably the most
         *     direct way to accomplish the mapping.
         *
         *     With external program mappings you can use any mechanism you like (static
         *     mapping, ldap, database, etc) to look up account information and return the
         *     mapped account user name. If you have an account system that has usernames
         *     without a simple relationship to your users' Globus identities, or that
         *     requires interfacing with an accounting system, this may be necessary.
         *
         */
        IdentityMapping: components["schemas"]["ExternalIdentityMapping_1_0_0"] | components["schemas"]["ExpressionIdentityMapping_1_0_0"];
        /**
         * StorageGateway_1_0_0
         * @description A storage gateway provides the access policies for the endpoint's
         *     connected storage systems. It is a named interface by which
         *     authorized users can create and manage collections on the
         *     connected storage system. A single storage system may be
         *     associated with multiple storage gateways, each with its own
         *     policies.
         *
         *     Storage gateway policies describe what type connector the storage
         *     gateway uses, the paths it allows access to, the login
         *     requirements are for the storage gateway, and the algorithm to
         *     map Globus identities to the user namespace of the storage
         *     gateway (e.g. local accounts).
         *
         */
        StorageGateway_1_0_0: {
            /**
             * @description Type of this document
             * @default storage_gateway#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "storage_gateway#1.0.0";
            /** @description List of allowed domains. Users creating credentials or collections
             *     on this storage gateway must have an identity in one of these domains.
             *      */
            allowed_domains?: string[];
            /**
             * @deprecated
             * @description Alias for **authentication_timeout_mins**
             */
            authentication_assurance_timeout?: number | null;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated to access files or create user credentials on this
             *     storage gateway.
             *
             *     For a high assurance storage gateway, this must be done within the
             *     current Globus Auth session, otherwise, the caller can perform the
             *     authentication with any application which uses Globus Auth.
             *      */
            authentication_timeout_mins?: number | null;
            /**
             * Format: uuid
             * @description Id of the connector type that this storage gateway interacts with.
             *
             */
            connector_id?: string;
            /** @description Flag indicating that this storage gateway has been deleted */
            deleted?: boolean;
            /** @description Name of the storage gateway */
            display_name?: string;
            /** @description Flag indicating if the storage_gateway requires high
             *     assurance features.
             *      */
            high_assurance?: boolean | null;
            /**
             * Format: uuid
             * @description Unique id for this storage gateway
             */
            id?: string;
            /** @description List of identity mappings to apply to user identities to determine
             *     what connector-specific accounts are available for access.
             *      */
            identity_mappings?: components["schemas"]["IdentityMapping"][] | null;
            /** @description Name of the DSI module to load by the GridFTP server when
             *     accessing this storage gateway.
             *      */
            load_dsi_module?: string | null;
            /** @description Connector-specific storage policies */
            policies?: components["schemas"]["S3StoragePolicies_1_0_0"] | components["schemas"]["S3StoragePolicies_1_1_0"] | components["schemas"]["S3StoragePolicies_1_2_0"] | components["schemas"]["AzureBlobStoragePolicies_1_0_0"] | components["schemas"]["AzureBlobStoragePolicies_1_1_0"] | components["schemas"]["BlackPearlStoragePolicies_1_0_0"] | components["schemas"]["BoxStorage_1_0_0"] | components["schemas"]["BoxStorage_1_1_0"] | components["schemas"]["BoxStorage_1_2_0"] | components["schemas"]["CephStoragePolicies_1_0_0"] | components["schemas"]["DropboxStoragePolicies_1_0_0"] | components["schemas"]["GoogleCloudStoragePolicies_1_0_0"] | components["schemas"]["GoogleCloudStoragePolicies_1_1_0"] | components["schemas"]["GoogleDriveStoragePolicies_1_0_0"] | components["schemas"]["GoogleDriveStoragePolicies_1_1_0"] | components["schemas"]["HPSSStoragePolicies_1_0_0"] | components["schemas"]["HPSSStoragePolicies_1_1_0"] | components["schemas"]["IrodsStoragePolicies_1_0_0"] | components["schemas"]["OneDriveStoragePolicies_1_0_0"] | components["schemas"]["OneDriveStoragePolicies_1_1_0"] | components["schemas"]["PosixStoragePolicies_1_0_0"] | components["schemas"]["PosixStagingStoragePolicies_1_0_0"];
            /** @description Local POSIX user the GridFTP server should run as when accessing
             *     this storage gateway.
             *      */
            process_user?: string | null;
            /**
             * @deprecated
             * @description Alias for **high_assurance**
             */
            require_high_assurance?: boolean | null;
            /** @description Path restrictions within this storage gateway. Paths are
             *     interpreted as absolute paths in the file namespace of the
             *     connector.
             *      */
            restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to access this storage
             *     gateway.
             *      */
            users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to this storage
             *     gateway.
             *      */
            users_deny?: string[] | null;
        };
        /**
         * StorageGateway_1_1_0
         * @description A storage gateway provides the access policies for the endpoint's
         *     connected storage systems. It is a named interface by which
         *     authorized users can create and manage collections on the
         *     connected storage system. A single storage system may be
         *     associated with multiple storage gateways, each with its own
         *     policies.
         *
         *     Storage gateway policies describe what type connector the storage
         *     gateway uses, the paths it allows access to, the login
         *     requirements are for the storage gateway, and the algorithm to
         *     map Globus identities to the user namespace of the storage
         *     gateway (e.g. local accounts).
         *
         *     Version 1.1.0 includes support for multi-factor authentication requirements
         *     for high assurance storage gateways.
         *
         */
        StorageGateway_1_1_0: {
            /**
             * @description Type of this document
             * @default storage_gateway#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "storage_gateway#1.1.0";
            /** @description List of allowed domains. Users creating credentials or collections
             *     on this storage gateway must have an identity in one of these domains.
             *      */
            allowed_domains?: string[];
            /**
             * @deprecated
             * @description Alias for **authentication_timeout_mins**
             */
            authentication_assurance_timeout?: number | null;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated to access files or create user credentials on this
             *     storage gateway.
             *
             *     For a high assurance storage gateway, this must be done within the
             *     current Globus Auth session, otherwise, the caller can perform the
             *     authentication with any application which uses Globus Auth.
             *      */
            authentication_timeout_mins?: number | null;
            /**
             * Format: uuid
             * @description Id of the connector type that this storage gateway interacts with.
             *
             */
            connector_id?: string;
            /** @description Flag indicating that this storage gateway has been deleted */
            deleted?: boolean;
            /** @description Name of the storage gateway */
            display_name?: string;
            /** @description Flag indicating if the storage_gateway requires high
             *     assurance features.
             *      */
            high_assurance?: boolean | null;
            /**
             * Format: uuid
             * @description Unique id for this storage gateway
             */
            id?: string;
            /** @description List of identity mappings to apply to user identities to determine
             *     what connector-specific accounts are available for access.
             *      */
            identity_mappings?: components["schemas"]["IdentityMapping"][] | null;
            /** @description Name of the DSI module to load by the GridFTP server when
             *     accessing this storage gateway.
             *      */
            load_dsi_module?: string | null;
            /** @description Connector-specific storage policies */
            policies?: components["schemas"]["S3StoragePolicies_1_0_0"] | components["schemas"]["S3StoragePolicies_1_1_0"] | components["schemas"]["S3StoragePolicies_1_2_0"] | components["schemas"]["AzureBlobStoragePolicies_1_0_0"] | components["schemas"]["AzureBlobStoragePolicies_1_1_0"] | components["schemas"]["BlackPearlStoragePolicies_1_0_0"] | components["schemas"]["BoxStorage_1_0_0"] | components["schemas"]["BoxStorage_1_1_0"] | components["schemas"]["BoxStorage_1_2_0"] | components["schemas"]["CephStoragePolicies_1_0_0"] | components["schemas"]["DropboxStoragePolicies_1_0_0"] | components["schemas"]["GoogleCloudStoragePolicies_1_0_0"] | components["schemas"]["GoogleCloudStoragePolicies_1_1_0"] | components["schemas"]["GoogleDriveStoragePolicies_1_0_0"] | components["schemas"]["GoogleDriveStoragePolicies_1_1_0"] | components["schemas"]["HPSSStoragePolicies_1_0_0"] | components["schemas"]["HPSSStoragePolicies_1_1_0"] | components["schemas"]["IrodsStoragePolicies_1_0_0"] | components["schemas"]["OneDriveStoragePolicies_1_0_0"] | components["schemas"]["OneDriveStoragePolicies_1_1_0"] | components["schemas"]["PosixStoragePolicies_1_0_0"] | components["schemas"]["PosixStagingStoragePolicies_1_0_0"];
            /** @description Local POSIX user the GridFTP server should run as when accessing
             *     this storage gateway.
             *      */
            process_user?: string | null;
            /**
             * @deprecated
             * @description Alias for **high_assurance**
             */
            require_high_assurance?: boolean | null;
            /**
             * @description Flag indicating if the storage_gateway requires multi-factor
             *     authentication. Only usable on high assurance storage gateways.
             *
             * @default false
             */
            require_mfa: boolean;
            /** @description Path restrictions within this storage gateway. Paths are
             *     interpreted as absolute paths in the file namespace of the
             *     connector.
             *      */
            restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to access this storage
             *     gateway.
             *      */
            users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to this storage
             *     gateway.
             *      */
            users_deny?: string[] | null;
        };
        /**
         * StorageGateway_1_2_0
         * @description A storage gateway provides the access policies for the endpoint's
         *     connected storage systems. It is a named interface by which
         *     authorized users can create and manage collections on the
         *     connected storage system. A single storage system may be
         *     associated with multiple storage gateways, each with its own
         *     policies.
         *
         *     Storage gateway policies describe what type connector the storage
         *     gateway uses, the paths it allows access to, the login
         *     requirements are for the storage gateway, and the algorithm to
         *     map Globus identities to the user namespace of the storage
         *     gateway (e.g. local accounts).
         *
         *     Version 1.1.0 includes support for multi-factor authentication requirements
         *     for high assurance storage gateways.
         *
         *     Version 1.2.0 includes support for admin managed credentials.
         *
         */
        StorageGateway_1_2_0: {
            /**
             * @description Type of this document
             * @default storage_gateway#1.2.0
             * @enum {string}
             */
            DATA_TYPE: "storage_gateway#1.2.0";
            /**
             * @description Flag indicating if the storage_gateway allows endpoint
             *     administrators to manage user credentials on behalf of other users.
             *
             * @default false
             */
            admin_managed_credentials: boolean;
            /** @description List of allowed domains. Users creating credentials or collections
             *     on this storage gateway must have an identity in one of these domains.
             *      */
            allowed_domains?: string[];
            /**
             * @deprecated
             * @description Alias for **authentication_timeout_mins**
             */
            authentication_assurance_timeout?: number | null;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated to access files or create user credentials on this
             *     storage gateway.
             *
             *     For a high assurance storage gateway, this must be done within the
             *     current Globus Auth session, otherwise, the caller can perform the
             *     authentication with any application which uses Globus Auth.
             *      */
            authentication_timeout_mins?: number | null;
            /**
             * Format: uuid
             * @description Id of the connector type that this storage gateway interacts with.
             *
             */
            connector_id?: string;
            /** @description Flag indicating that this storage gateway has been deleted */
            deleted?: boolean;
            /** @description Name of the storage gateway */
            display_name?: string;
            /** @description Flag indicating if the storage_gateway requires high
             *     assurance features.
             *      */
            high_assurance?: boolean | null;
            /**
             * Format: uuid
             * @description Unique id for this storage gateway
             */
            id?: string;
            /** @description List of identity mappings to apply to user identities to determine
             *     what connector-specific accounts are available for access.
             *      */
            identity_mappings?: components["schemas"]["IdentityMapping"][] | null;
            /** @description Name of the DSI module to load by the GridFTP server when
             *     accessing this storage gateway.
             *      */
            load_dsi_module?: string | null;
            /** @description Connector-specific storage policies */
            policies?: components["schemas"]["S3StoragePolicies_1_0_0"] | components["schemas"]["S3StoragePolicies_1_1_0"] | components["schemas"]["S3StoragePolicies_1_2_0"] | components["schemas"]["AzureBlobStoragePolicies_1_0_0"] | components["schemas"]["AzureBlobStoragePolicies_1_1_0"] | components["schemas"]["BlackPearlStoragePolicies_1_0_0"] | components["schemas"]["BoxStorage_1_0_0"] | components["schemas"]["BoxStorage_1_1_0"] | components["schemas"]["BoxStorage_1_2_0"] | components["schemas"]["CephStoragePolicies_1_0_0"] | components["schemas"]["DropboxStoragePolicies_1_0_0"] | components["schemas"]["GoogleCloudStoragePolicies_1_0_0"] | components["schemas"]["GoogleCloudStoragePolicies_1_1_0"] | components["schemas"]["GoogleDriveStoragePolicies_1_0_0"] | components["schemas"]["GoogleDriveStoragePolicies_1_1_0"] | components["schemas"]["HPSSStoragePolicies_1_0_0"] | components["schemas"]["HPSSStoragePolicies_1_1_0"] | components["schemas"]["IrodsStoragePolicies_1_0_0"] | components["schemas"]["OneDriveStoragePolicies_1_0_0"] | components["schemas"]["OneDriveStoragePolicies_1_1_0"] | components["schemas"]["PosixStoragePolicies_1_0_0"] | components["schemas"]["PosixStagingStoragePolicies_1_0_0"];
            /** @description Local POSIX user the GridFTP server should run as when accessing
             *     this storage gateway.
             *      */
            process_user?: string | null;
            /**
             * @deprecated
             * @description Alias for **high_assurance**
             */
            require_high_assurance?: boolean | null;
            /**
             * @description Flag indicating if the storage_gateway requires multi-factor
             *     authentication. Only usable on high assurance storage gateways.
             *
             * @default false
             */
            require_mfa: boolean;
            /** @description Path restrictions within this storage gateway. Paths are
             *     interpreted as absolute paths in the file namespace of the
             *     connector.
             *      */
            restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to access this storage
             *     gateway.
             *      */
            users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to this storage
             *     gateway.
             *      */
            users_deny?: string[] | null;
        };
        /**
         * StorageGateway_1_3_0
         * @description A storage gateway provides the access policies for the endpoint's
         *     connected storage systems. It is a named interface by which
         *     authorized users can create and manage collections on the
         *     connected storage system. A single storage system may be
         *     associated with multiple storage gateways, each with its own
         *     policies.
         *
         *     Storage gateway policies describe what type connector the storage
         *     gateway uses, the paths it allows access to, the login
         *     requirements are for the storage gateway, and the algorithm to
         *     map Globus identities to the user namespace of the storage
         *     gateway (e.g. local accounts).
         *
         *     Version 1.1.0 includes support for multi-factor authentication requirements
         *     for high assurance storage gateways.
         *
         *     Version 1.2.0 includes support for admin managed credentials.
         *
         *     Version 1.3.0 includes support for overriding the endpoint's network use
         *     parameters on a storage gateway.
         *
         */
        StorageGateway_1_3_0: {
            /**
             * @description Type of this document
             * @default storage_gateway#1.3.0
             * @enum {string}
             */
            DATA_TYPE: "storage_gateway#1.3.0";
            /**
             * @description Flag indicating if the storage_gateway allows endpoint
             *     administrators to manage user credentials on behalf of other users.
             *
             * @default false
             */
            admin_managed_credentials: boolean;
            /** @description List of allowed domains. Users creating credentials or collections
             *     on this storage gateway must have an identity in one of these domains.
             *      */
            allowed_domains?: string[];
            /**
             * @deprecated
             * @description Alias for **authentication_timeout_mins**
             */
            authentication_assurance_timeout?: number | null;
            /** @description Timeout (in minutes) during which a user is required to have
             *     authenticated to access files or create user credentials on this
             *     storage gateway.
             *
             *     For a high assurance storage gateway, this must be done within the
             *     current Globus Auth session, otherwise, the caller can perform the
             *     authentication with any application which uses Globus Auth.
             *      */
            authentication_timeout_mins?: number | null;
            /**
             * Format: uuid
             * @description Id of the connector type that this storage gateway interacts with.
             *
             */
            connector_id?: string;
            /** @description Flag indicating that this storage gateway has been deleted */
            deleted?: boolean;
            /** @description Name of the storage gateway */
            display_name?: string;
            /** @description Flag indicating if the storage_gateway requires high
             *     assurance features.
             *      */
            high_assurance?: boolean | null;
            /**
             * Format: uuid
             * @description Unique id for this storage gateway
             */
            id?: string;
            /** @description List of identity mappings to apply to user identities to determine
             *     what connector-specific accounts are available for access.
             *      */
            identity_mappings?: components["schemas"]["IdentityMapping"][] | null;
            /** @description Name of the DSI module to load by the GridFTP server when
             *     accessing this storage gateway.
             *      */
            load_dsi_module?: string | null;
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            max_concurrency?: number;
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            max_parallelism?: number;
            /**
             * @description Control how Globus interacts with this endpoint over the network.
             *
             *     Allowed values for **network_use** are:
             *
             *     * `normal`
             *         - The default setting. Uses an average level of concurrency and
             *           parallelism. The levels depend on the number of physical
             *           servers in the endpoint.
             *     * `minimal`
             *         - Uses a minimal level of concurrency and parallelism.
             *     * `aggressive`
             *         - Uses a high level of concurrency and parallelism.
             *     * `custom`
             *         - Uses custom values of concurrency and parallelism set by the
             *           endpoint admin. When setting this level, you must also set
             *           the **max_concurrency**, **preferred_concurrency**,
             *           **max_parallelism**, and **preferred_parallelism** properties.
             *
             * @enum {string|null}
             */
            network_use?: "normal" | "minimal" | "aggressive" | "custom" | null;
            /** @description Connector-specific storage policies */
            policies?: components["schemas"]["S3StoragePolicies_1_0_0"] | components["schemas"]["S3StoragePolicies_1_1_0"] | components["schemas"]["S3StoragePolicies_1_2_0"] | components["schemas"]["AzureBlobStoragePolicies_1_0_0"] | components["schemas"]["AzureBlobStoragePolicies_1_1_0"] | components["schemas"]["BlackPearlStoragePolicies_1_0_0"] | components["schemas"]["BoxStorage_1_0_0"] | components["schemas"]["BoxStorage_1_1_0"] | components["schemas"]["BoxStorage_1_2_0"] | components["schemas"]["CephStoragePolicies_1_0_0"] | components["schemas"]["DropboxStoragePolicies_1_0_0"] | components["schemas"]["GoogleCloudStoragePolicies_1_0_0"] | components["schemas"]["GoogleCloudStoragePolicies_1_1_0"] | components["schemas"]["GoogleDriveStoragePolicies_1_0_0"] | components["schemas"]["GoogleDriveStoragePolicies_1_1_0"] | components["schemas"]["HPSSStoragePolicies_1_0_0"] | components["schemas"]["HPSSStoragePolicies_1_1_0"] | components["schemas"]["IrodsStoragePolicies_1_0_0"] | components["schemas"]["OneDriveStoragePolicies_1_0_0"] | components["schemas"]["OneDriveStoragePolicies_1_1_0"] | components["schemas"]["PosixStoragePolicies_1_0_0"] | components["schemas"]["PosixStagingStoragePolicies_1_0_0"];
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            preferred_concurrency?: number;
            /** @description Admin-specified value when the **network_use** property's value is
             *     `custom`; otherwise the preset value for the specified
             *     **network_use**.
             *      */
            preferred_parallelism?: number;
            /** @description Local POSIX user the GridFTP server should run as when accessing
             *     this storage gateway.
             *      */
            process_user?: string | null;
            /**
             * @deprecated
             * @description Alias for **high_assurance**
             */
            require_high_assurance?: boolean | null;
            /**
             * @description Flag indicating if the storage_gateway requires multi-factor
             *     authentication. Only usable on high assurance storage gateways.
             *
             * @default false
             */
            require_mfa: boolean;
            /** @description Path restrictions within this storage gateway. Paths are
             *     interpreted as absolute paths in the file namespace of the
             *     connector.
             *      */
            restrict_paths?: unknown | components["schemas"]["PathRestrictions"];
            /** @description List of connector-specific usernames allowed to access this storage
             *     gateway.
             *      */
            users_allow?: string[] | null;
            /** @description List of connector-specific usernames denied access to this storage
             *     gateway.
             *      */
            users_deny?: string[] | null;
        };
        /**
         * StorageGatewayNotFound_1_0_0
         * @description Error details when a storage gateway no longer exists when accessing a
         *     collection.
         *
         */
        StorageGatewayNotFound_1_0_0: {
            /**
             * @description Type of this document
             * @default storage_gateway_not_found#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "storage_gateway_not_found#1.0.0";
            /**
             * Format: uuid
             * @description Storage gateway ID
             */
            storage_gateway_id?: string;
        };
        /**
         * SubscriptionRequired_1_0_0
         * @description Error details when the caller has attempted to access a feature
         *     not supported by the endpoint's subscription.
         *
         */
        SubscriptionRequired_1_0_0: {
            /**
             * @description Type of this document
             * @default subscription_required#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "subscription_required#1.0.0";
            /** @description List of subscription add-ons required for this feature */
            add_ons?: string[];
            /** @description Level of subscription required for this feature */
            subscription_level?: string;
        };
        /**
         * UserCredential_1_0_0
         * @description Credential information for an identity on a particular storage gateway and
         *     its related collections.
         *
         */
        UserCredential_1_0_0: {
            /**
             * @description Type of this document
             * @default user_credential#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "user_credential#1.0.0";
            /**
             * Format: uuid
             * @description Id of the connector type used by this credential
             */
            connector_id?: string;
            /** @description Flag indicating that this credential has been deleted */
            deleted?: boolean;
            /** @description Display name of the credential */
            display_name?: string | null;
            /** @description The home directory of this account associated with this credential */
            readonly home_directory?: string;
            /**
             * Format: uuid
             * @description Unique id for this user credential
             */
            id?: string;
            /**
             * Format: uuid
             * @description Globus Auth identity id that this credential is associated with
             */
            identity_id?: string;
            /** @description Flag indicating that this credential is no longer valid */
            invalid?: boolean;
            /** @description Connector-specific user credential policies */
            policies?: components["schemas"]["S3UserCredentialPolicies_1_0_0"] | components["schemas"]["S3UserCredentialPolicies_1_1_0"] | components["schemas"]["S3UserCredentialPolicies_1_2_0"] | components["schemas"]["AzureBlobUserCredentialPolicies_1_0_0"] | components["schemas"]["BlackPearlUserCredentialPolicies_1_0_0"] | components["schemas"]["BoxUserCredential_1_0_0"] | components["schemas"]["BoxUserCredential_1_1_0"] | components["schemas"]["CephUserCredentialPolicies_1_0_0"] | components["schemas"]["DropboxUserCredentialPolicies_1_0_0"] | components["schemas"]["GoogleCloudStorageUserCredentialPolicies_1_0_0"] | components["schemas"]["GoogleDriveUserCredentialPolicies_1_0_0"] | components["schemas"]["HPSSUserCredentialPolicies_1_0_0"] | components["schemas"]["IrodsUserCredentialPolicies_1_0_0"] | components["schemas"]["OneDriveUserCredentialPolicies_1_0_0"] | components["schemas"]["PosixUserCredentialPolicies_1_0_0"] | components["schemas"]["PosixStagingUserCredentialPolicies_1_0_0"];
            /** @description Flag indicating that this credential has been fully provisioned. If
             *     this is false and the invalid property is true, then the credential
             *     was created during login and patching it to add the missing data
             *     should be presented to the user as initializing the credential.
             *      */
            provisioned?: boolean;
            /**
             * Format: uuid
             * @description Storage Gateway this credential is associated with
             */
            storage_gateway_id?: string;
            /** @description Connector-specific username that this credential is associated
             *     with. If the connector supports identity mapping, this matches the
             *     result of the mapping applied to identity_id.
             *      */
            username?: string;
        };
        /**
         * S3StoragePolicies_1_0_0
         * @description Connector-specific storage gateway policies for the S3 connector
         *
         */
        S3StoragePolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default s3_storage_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "s3_storage_policies#1.0.0";
            /** @description List of buckets not owned by the collection owner that will be shown in
             *     the root of collections created at the base of this storage gateway.
             *      */
            s3_buckets?: string[];
            /**
             * @description URL of the S3 API endpoint
             * @example https://s3.amazonaws.com
             */
            s3_endpoint?: string;
            /** @description Flag indicating if a Globus User must register a user credential in
             *     order to create a guest collection on this storage gateway.
             *      */
            s3_user_credential_required?: boolean;
        };
        /**
         * S3StoragePolicies_1_1_0
         * @description Connector-specific storage gateway policies for the S3 connector
         *
         *     Version 1.1.0 adds support for the s3_requester_pays property
         *
         */
        S3StoragePolicies_1_1_0: {
            /**
             * @description Type of this document
             * @default s3_storage_policies#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "s3_storage_policies#1.1.0";
            /** @description List of buckets not owned by the collection owner that will be shown in
             *     the root of collections created at the base of this storage gateway.
             *      */
            s3_buckets?: string[];
            /**
             * @description URL of the S3 API endpoint
             * @example https://s3.amazonaws.com
             */
            s3_endpoint?: string;
            /** @description Flag indicating that S3 operations will be charged to the account of
             *     the registered credentials. Credentials used with a storage gateway
             *     that has the s3_requester_pays property set to true are invalid unless
             *     they also have this property set to true as an acknowledgement.
             *      */
            s3_requester_pays?: boolean;
            /** @description Flag indicating if a Globus User must register a user credential in
             *     order to create a guest collection on this storage gateway.
             *      */
            s3_user_credential_required?: boolean;
        };
        /**
         * S3StoragePolicies_1_2_0
         * @description Connector-specific storage gateway policies for the S3 connector
         *
         *     Version 1.1.0 adds support for the s3_requester_pays property
         *
         *     Version 1.2.0 adds support for the s3_allow_multi_keys property
         *
         */
        S3StoragePolicies_1_2_0: {
            /**
             * @description Type of this document
             * @default s3_storage_policies#1.2.0
             * @enum {string}
             */
            DATA_TYPE: "s3_storage_policies#1.2.0";
            /** @description Allow users of this gateway to add multiple s3 IAM keys to their credentials
             *      */
            s3_allow_multi_keys?: boolean;
            /** @description List of buckets not owned by the collection owner that will be shown in
             *     the root of collections created at the base of this storage gateway.
             *      */
            s3_buckets?: string[];
            /**
             * @description URL of the S3 API endpoint
             * @example https://s3.amazonaws.com
             */
            s3_endpoint?: string;
            /** @description Flag indicating that S3 operations will be charged to the account of
             *     the registered credentials. Credentials used with a storage gateway
             *     that has the s3_requester_pays property set to true are invalid unless
             *     they also have this property set to true as an acknowledgement.
             *      */
            s3_requester_pays?: boolean;
            /** @description Flag indicating if a Globus User must register a user credential in
             *     order to create a guest collection on this storage gateway.
             *      */
            s3_user_credential_required?: boolean;
        };
        /**
         * S3CollectionPolicies_1_0_0
         * @description Connector-specific collection policies for the S3 connector
         *
         */
        S3CollectionPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default s3_collection_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "s3_collection_policies#1.0.0";
        };
        /**
         * S3UserCredentialPolicies_1_0_0
         * @description Connector-specific user credential policies for the S3 connector
         *
         */
        S3UserCredentialPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default s3_user_credential_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "s3_user_credential_policies#1.0.0";
            /** @description Access Key ID to use with the S3 API to access your buckets and
             *     objects.
             *      */
            s3_key_id?: string | null;
            /** @description Secret key to use with the S3 API to access your buckets and objects.
             *      */
            s3_secret_key?: string | null;
        };
        /**
         * S3UserCredentialPolicies_1_1_0
         * @description Connector-specific user credential policies for the S3 connector
         *
         *     Version 1.1.0 adds support for the s3_requester_pays property.
         *
         */
        S3UserCredentialPolicies_1_1_0: {
            /**
             * @description Type of this document
             * @default s3_user_credential_policies#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "s3_user_credential_policies#1.1.0";
            /** @description Access Key ID to use with the S3 API to access your buckets and
             *     objects.
             *      */
            s3_key_id?: string | null;
            /** @description Flag indicating the user acknowledges S3 operations will be charged to
             *     the account of this credential.  If this flag is true in the storage
             *     gateway policy, this must also be true or the credential will be invalid.
             *      */
            s3_requester_pays?: boolean;
            /** @description Secret key to use with the S3 API to access your buckets and objects.
             *      */
            s3_secret_key?: string | null;
        };
        /** S3KeysPrefixPaths_1_0_0 */
        S3KeysPrefixPaths_1_0_0: {
            /** @description A list of matching prefix strings. When a S3 object is being accessed its virtual
             *     path <bucket>/<object> is matched against each string in this list. If the
             *     virtual path starts with a value in this list then the s3 keys in this object
             *     will be used.
             *      */
            path_prefixes: string[];
            /** @description Access Key ID to use with the S3 API to access your buckets and
             *     objects.
             *      */
            s3_key_id?: string | null;
            /** @description Secret key to use with the S3 API to access your buckets and objects.
             *     If set to null when calling PATCH it indicates that this entry should be
             *     deleted.
             *      */
            s3_secret_key?: string | null;
        };
        /**
         * S3UserCredentialPolicies_1_2_0
         * @description Connector-specific user credential policies for the S3 connector
         *
         *     Version 1.1.0 adds support for the s3_requester_pays property.
         *
         *     Version 1.2.0 adds support for the s3_multi_keys property list.
         *
         */
        S3UserCredentialPolicies_1_2_0: {
            /**
             * @description Type of this document
             * @default s3_user_credential_policies#1.2.0
             * @enum {string}
             */
            DATA_TYPE: "s3_user_credential_policies#1.2.0";
            /** @description Access Key ID to use with the S3 API to access your buckets and
             *     objects.
             *      */
            s3_key_id?: string | null;
            /** @description A list of path prefixes and S3 key pairs to use with them.
             *      */
            s3_multi_keys?: components["schemas"]["S3KeysPrefixPaths_1_0_0"][] | null;
            /** @description Flag indicating the user acknowledges S3 operations will be charged to
             *     the account of this credential.  If this flag is true in the storage
             *     gateway policy, this must also be true or the credential will be invalid.
             *      */
            s3_requester_pays?: boolean;
            /** @description Secret key to use with the S3 API to access your buckets and objects.
             *      */
            s3_secret_key?: string | null;
        };
        /**
         * AzureBlobStoragePolicies_1_0_0
         * @description Connector-specific storage gateway policies for the AzureBlob connector
         *
         */
        AzureBlobStoragePolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default azure_blob_storage_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "azure_blob_storage_policies#1.0.0";
            /** @description Azure Storage account to access with this storage gateway */
            account: string | null;
            /** @description Flag indicating the Azure storage account has enabled Azure Data
             *     Lake Gen2 hierarchical namespace support.
             *      */
            adls: boolean | null;
            /** @description URL of the auth callback that must be registered on the Microsoft
             *     API console for the application client_id in order to process
             *     Microsoft credentials.
             *      */
            readonly auth_callback?: string;
            /** @description The method of authentication to Azure. "user" prompts the user to
             *     log in to their Microsoft account via an oauth2 flow.
             *     "service_principal" uses the configured client_id and client_secret
             *     values to authenticate as an Azure service principal.
             *      */
            auth_type: string | null;
            /** @description Client ID registered with the Azure console to access Azure Blob.
             *      */
            client_id: string | null;
            /** @description Secret created in the Azure console to access Azure Blob with the
             *     client_id in this policy.
             *      */
            secret: string | null;
            /** @description Tenant id of the Microsoft organization */
            tenant: string | null;
            /** @description Flag indicating whether users must register a credential.  If true
             *     (or if this property is missing), this storage gateway is
             *     configured for OAuth2 user authentication.  If false,
             *     authentication is configured by the admin.
             *      */
            readonly user_credential_required?: boolean;
        };
        /**
         * AzureBlobStoragePolicies_1_1_0
         * @description Connector-specific storage gateway policies for the AzureBlob connector
         *
         */
        AzureBlobStoragePolicies_1_1_0: {
            /**
             * @description Type of this document
             * @default azure_blob_storage_policies#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "azure_blob_storage_policies#1.1.0";
            /** @description Azure Storage account to access with this storage gateway */
            account: string | null;
            /** @description Flag indicating the Azure storage account has enabled Azure Data
             *     Lake Gen2 hierarchical namespace support.
             *      */
            adls: boolean | null;
            /** @description If true, allow users to access personal or external Microsoft accounts.
             *     If false (the default), users must use the Microsoft account which
             *     matches the username their Globus credential maps to.
             *      */
            allow_any_account?: boolean;
            /** @description URL of the auth callback that must be registered on the Microsoft
             *     API console for the application client_id in order to process
             *     Microsoft credentials.
             *      */
            readonly auth_callback?: string;
            /** @description The method of authentication to Azure. "user" prompts the user to
             *     log in to their Microsoft account via an oauth2 flow.
             *     "service_principal" uses the configured client_id and client_secret
             *     values to authenticate as an Azure service principal.
             *      */
            auth_type: string | null;
            /** @description Client ID registered with the Azure console to access Azure Blob.
             *      */
            client_id: string | null;
            /** @description Secret created in the Azure console to access Azure Blob with the
             *     client_id in this policy.
             *      */
            secret: string | null;
            /** @description Tenant id of the Microsoft organization */
            tenant: string | null;
            /** @description Flag indicating whether users must register a credential.  If true
             *     (or if this property is missing), this storage gateway is
             *     configured for OAuth2 user authentication.  If false,
             *     authentication is configured by the admin.
             *      */
            readonly user_credential_required?: boolean;
        };
        /**
         * AzureBlobCollectionPolicies_1_0_0
         * @description Connector-specific collection policies for the AzureBlob connector
         *
         */
        AzureBlobCollectionPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default azure_blob_collection_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "azure_blob_collection_policies#1.0.0";
        };
        /**
         * AzureBlobUserCredentialPolicies_1_0_0
         * @description Connector-specific user credential policies for the AzureBlob connector
         *
         */
        AzureBlobUserCredentialPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default azure_blob_user_credential_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "azure_blob_user_credential_policies#1.0.0";
            /** @description OAuth access token */
            access_token?: string | null;
            /** @description OAuth email claim */
            email?: string | null;
            /** @description OAuth refresh_token token */
            refresh_token?: string | null;
            /** @description OAuth scopes associated with this access token */
            scopes?: string[];
            /** @description OAuth subject identifier claim */
            sub?: string | null;
            /** @description Tenant id */
            tid?: string;
            /**
             * Format: date-time
             * @description OAuth access token expiration time
             */
            token_expiry?: string;
        };
        /**
         * BlackPearlStoragePolicies_1_0_0
         * @description Connector-specific storage gateway policies for the Blackpearl connector
         *
         */
        BlackPearlStoragePolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default blackpearl_storage_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "blackpearl_storage_policies#1.0.0";
            /** @description Path to the file which provides mappings from usernames within the
             *     configured identity domain to the ID and secret associated with the
             *     user's BlackPearl account
             *      */
            bp_access_id_file?: string;
            /** @description The URL of the S3 endpoint of the BlackPearl appliance
             *     to use to access collections on this Storage Gateway.
             *      */
            s3_endpoint?: string;
        };
        /**
         * BlackPearlCollectionPolicies_1_0_0
         * @description Connector-specific collection policies for the BlackPearl connector
         *
         */
        BlackPearlCollectionPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default blackpearl_collection_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "blackpearl_collection_policies#1.0.0";
        };
        /**
         * BlackPearlUserCredentialPolicies_1_0_0
         * @description Connector-specific user credential policies for the Blackpearl connector
         *
         */
        BlackPearlUserCredentialPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default blackpearl_user_credential_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "blackpearl_user_credential_policies#1.0.0";
            /** @description BlackPearl access id */
            readonly access_id?: string;
            /** @description BlackPearl secret key */
            readonly secret_key?: string;
        };
        /**
         * BoxAppSettings
         * @description Values from the Box JWT client configuration that the storage gateway uses
         *     to identify and authenticate with the Box API.  This is only set when
         *     configuring the storage gateway for Box enterprise authentication.
         *
         */
        BoxAppSettings: {
            /** @description Box application keys */
            appAuth: components["schemas"]["BoxAppAuth"];
            /** @description Application client ID */
            clientID: string;
            /** @description Application client secret */
            clientSecret: string;
        };
        /**
         * BoxAppAuth
         * @description Key information used to perform JWT grants for using the Box API
         *
         */
        BoxAppAuth: {
            /** @description Passphrase to decrypt the private key */
            passphrase: string;
            /** @description Private key */
            privateKey: string;
            /** @description ID of the public key */
            publicKeyID: string;
        };
        /**
         * BoxStorage_1_0_0
         * @description Connector-specific storage gateway policies for the Box connector.
         *
         */
        BoxStorage_1_0_0: {
            /**
             * @description Type of this document
             * @default box_storage_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "box_storage_policies#1.0.0";
            /** @description Box Application settings */
            boxAppSettings: components["schemas"]["BoxAppSettings"];
            /** @description Identifies which Box Enterprise this storage gateway is authorized
             *     access to. This is only set when configuring the storage gateway
             *     for Box enterprise authentication.
             *      */
            enterpriseID: string;
        };
        /**
         * BoxStorage_1_1_0
         * @description Connector-specific storage gateway policies for the Box connector.
         *
         */
        BoxStorage_1_1_0: {
            /**
             * @description Type of this document
             * @default box_storage_policies#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "box_storage_policies#1.1.0";
            /** @description URL of the auth callback that must be set on the Box developer
             *     console for the Box application of client_id.
             *      */
            readonly auth_callback?: string;
            boxAppSettings?: components["schemas"]["BoxAppSettings"];
            /** @description Client ID of the Box OAuth2 application registered on the Box developer
             *     console.  This is only set when configuring the storage gateway for
             *     OAuth2 user authentication.
             *      */
            client_id?: string;
            /** @description Identifies which Box Enterprise this storage gateway is authorized
             *     access to. This is only set when configuring the storage gateway for
             *     Box enterprise authentication.
             *      */
            enterpriseID?: string;
            /** @description Secret associated with the client_id set in this policy.  This is only
             *     set when configuring the storage gateway for OAuth2 user
             *     authentication.
             *      */
            secret?: string;
            /** @description User API Rate Limit associated with this client ID in operations per
             *     second per user.
             *      */
            user_api_rate_limit?: number;
            /** @description Flag indicating whether users must register a credential.  If true,
             *     this storage gateway is configured for OAuth2 user authentication.  If
             *     false (and for older DATA_TYPE where this property is missing), this
             *     storage gateway is configured for enterprise authentication.
             *      */
            readonly user_credential_required?: boolean;
        };
        /**
         * BoxStorage_1_2_0
         * @description Connector-specific storage gateway policies for the Box connector.
         *
         */
        BoxStorage_1_2_0: {
            /**
             * @description Type of this document
             * @default box_storage_policies#1.2.0
             * @enum {string}
             */
            DATA_TYPE: "box_storage_policies#1.2.0";
            /** @description If true, allow users to access personal or external Box accounts.
             *     If false (the default), users must use the Box account which
             *     matches the username their Globus credential maps to.
             *      */
            allow_any_account?: boolean;
            /** @description URL of the auth callback that must be set on the Box developer
             *     console for the Box application of client_id.
             *      */
            readonly auth_callback?: string;
            boxAppSettings?: components["schemas"]["BoxAppSettings"];
            /** @description Client ID of the Box OAuth2 application registered on the Box developer
             *     console.  This is only set when configuring the storage gateway for
             *     OAuth2 user authentication.
             *      */
            client_id?: string;
            /** @description Identifies which Box Enterprise this storage gateway is authorized
             *     access to. This is only set when configuring the storage gateway for
             *     Box enterprise authentication.
             *      */
            enterpriseID?: string;
            /** @description Secret associated with the client_id set in this policy.  This is only
             *     set when configuring the storage gateway for OAuth2 user
             *     authentication.
             *      */
            secret?: string;
            /** @description User API Rate Limit associated with this client ID in operations per
             *     second per user.
             *      */
            user_api_rate_limit?: number;
            /** @description Flag indicating whether users must register a credential.  If true,
             *     this storage gateway is configured for OAuth2 user authentication.  If
             *     false (and for older DATA_TYPE where this property is missing), this
             *     storage gateway is configured for enterprise authentication.
             *      */
            readonly user_credential_required?: boolean;
        };
        /**
         * BoxCollectionPolicies_1_0_0
         * @description Connector-specific collection policies for the Box connector
         *
         */
        BoxCollectionPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default box_collection_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "box_collection_policies#1.0.0";
        };
        /**
         * BoxUserCredential_1_0_0
         * @description Connector-specific user credential policies for the Box connector
         *
         */
        BoxUserCredential_1_0_0: {
            /**
             * @description Type of this document
             * @default box_user_credential_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "box_user_credential_policies#1.0.0";
        };
        /**
         * BoxUserCredential_1_1_0
         * @description Connector-specific user credential policies for the Box connector
         *
         */
        BoxUserCredential_1_1_0: {
            /**
             * @description Type of this document
             * @default box_user_credential_policies#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "box_user_credential_policies#1.1.0";
            /** @description OAuth access token */
            access_token?: string | null;
            /** @description OAuth email identifier claim */
            email?: string | null;
            max_upload?: number;
            /** @description OAuth refresh token */
            refresh_token?: string | null;
            /**
             * @description OAuth scopes associated with this access token
             * @example [
             *       "box_readwrite"
             *     ]
             */
            scopes?: string[];
            /** @description OAuth subject identifier claim */
            sub?: string | null;
            /**
             * Format: date-time
             * @description OAuth access token expiration time
             */
            token_expiry?: string;
        };
        /**
         * CephStoragePolicies_1_0_0
         * @description Connector-specific storage gateway policies for the Ceph connector
         *
         */
        CephStoragePolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default ceph_storage_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "ceph_storage_policies#1.0.0";
            /** @description Administrator key id used to authenticate with the ceph admin service
             *     to obtain user credentials.
             *      */
            ceph_admin_key_id?: string;
            /** @description Administrator secret key used to authenticate with the ceph admin
             *     service to obtain user credentials.
             *      */
            ceph_admin_secret_key?: string;
            /** @description List of buckets not owned by the collection owner that will be shown in
             *     the root of collections created at the base of this Storage Gateway.
             *      */
            s3_buckets?: string[];
            /** @description URL of the Ceph RADOS Gateway S3 API */
            s3_endpoint?: string;
        };
        /**
         * CephCollectionPolicies_1_0_0
         * @description Connector-specific collection policies for the Ceph connector
         *
         */
        CephCollectionPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default ceph_collection_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "ceph_collection_policies#1.0.0";
        };
        /**
         * CephUserCredentialPolicies_1_0_0
         * @description Connector-specific user credential policies for the Ceph connector
         *
         */
        CephUserCredentialPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default ceph_user_credential_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "ceph_user_credential_policies#1.0.0";
        };
        /**
         * DropboxStoragePolicies_1_0_0
         * @description Connector-specific storage gateway policies for the Dropbox connector
         *
         */
        DropboxStoragePolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default dropbox_storage_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "dropbox_storage_policies#1.0.0";
            /** @description If true, allow users to access personal or external Dropbox accounts.
             *     If false (the default), users must use the Dropbox account which
             *     matches the username their Globus credential maps to.
             *      */
            allow_any_account?: boolean;
            /** @description URL of the auth callback that must be registered on the Dropbox App
             *     Console for the associated client_id in order to process Dropbox
             *     credentials.
             *      */
            readonly auth_callback?: string;
            /** @description Client ID (App key) of the app created in the Dropbox App Console
             *      */
            client_id: string | null;
            /** @description App secret of the app from the Dropbox App Console
             *     policy.
             *      */
            secret: string | null;
            /** @description User API Rate Limit associated with this client ID in operations per
             *     second per user.
             *      */
            user_api_rate_limit?: number;
        };
        /**
         * DropboxCollectionPolicies_1_0_0
         * @description Connector-specific collection policies for the Dropbox connector
         *
         */
        DropboxCollectionPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default dropbox_collection_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "dropbox_collection_policies#1.0.0";
        };
        /**
         * DropboxUserCredentialPolicies_1_0_0
         * @description Connector-specific user credential policies for the Dropbox connector
         *
         */
        DropboxUserCredentialPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default dropbox_user_credential_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "dropbox_user_credential_policies#1.0.0";
            /** @description OAuth access token */
            access_token?: string | null;
            /** @description OAuth email claim */
            email?: string | null;
            /** @description OAuth refresh token */
            refresh_token?: string | null;
            /**
             * root_info
             * @description Root path namespace for Dropbox API requests
             */
            root_info?: Record<string, unknown>;
            /**
             * @description OAuth scopes associated with this access token
             * @example [
             *       "profile",
             *       "openid",
             *       "email",
             *       "account_info.read",
             *       "files.metadata.read",
             *       "files.content.write",
             *       "files.content.read"
             *     ]
             */
            scopes?: string[];
            /** @description OAuth subject identifier claim */
            sub?: string | null;
            /**
             * Format: date-time
             * @description OAuth access token expiration time
             */
            token_expiry?: string;
        };
        /**
         * GoogleCloudStoragePolicies_1_0_0
         * @description Connector-specific storage gateway policies for the Google Cloud Storage
         *     connector
         *
         */
        GoogleCloudStoragePolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default google_cloud_storage_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "google_cloud_storage_policies#1.0.0";
            /** @description URL of the auth callback that must be registered on the Google API
             *     console for the application client_id in order to process "
             *     Google credentials.
             *      */
            readonly auth_callback?: string;
            /** @description The list of Google Cloud Storage buckets which the Storage Gateway is
             *     allowed to access, as well as the list of buckets that will be shown in
             *     root level directory listings. If this list is unset, bucket access is
             *     unrestricted and all non public credential accessible buckets will be
             *     shown in root level directory listings. The value is a list of bucket
             *     names.
             *      */
            buckets?: string[] | null;
            /** @description Client ID registered with the Google Application console to access
             *     Google Cloud Storage.
             *      */
            client_id: string | null;
            /** @description The list of Google Cloud Storage project ids which the Storage Gateway
             *     is allowed to access. If this list is unset, project access is
             *     unrestricted. The value is a list of project id strings.
             *      */
            projects?: string[] | null;
            /** @description Secret created to access access Google Cloud Storage with the client_id
             *     in this policy.
             *      */
            secret: string | null;
            /** @description Service account key to use when authenticating all storage access */
            service_account_key?: Record<string, unknown> | null;
            /** @description Flag indicating whether users must register a credential.  If true (or
             *     if this property is missing), this storage gateway is configured for
             *     OAuth2 user authentication.  If false, authentication is configured by
             *     the admin.
             *      */
            readonly user_credential_required?: boolean;
        };
        /**
         * GoogleCloudStoragePolicies_1_1_0
         * @description Connector-specific storage gateway policies for the Google Cloud Storage
         *     connector
         *
         */
        GoogleCloudStoragePolicies_1_1_0: {
            /**
             * @description Type of this document
             * @default google_cloud_storage_policies#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "google_cloud_storage_policies#1.1.0";
            /** @description If true, allow users to access personal or external Google accounts.
             *     If false (the default), users must use the Google account which
             *     matches the username their Globus credential maps to.
             *      */
            allow_any_account?: boolean;
            /** @description URL of the auth callback that must be registered on the Google API
             *     console for the application client_id in order to process "
             *     Google credentials.
             *      */
            readonly auth_callback?: string;
            /** @description The list of Google Cloud Storage buckets which the Storage Gateway is
             *     allowed to access, as well as the list of buckets that will be shown in
             *     root level directory listings. If this list is unset, bucket access is
             *     unrestricted and all non public credential accessible buckets will be
             *     shown in root level directory listings. The value is a list of bucket
             *     names.
             *      */
            buckets?: string[] | null;
            /** @description Client ID registered with the Google Application console to access
             *     Google Cloud Storage.
             *      */
            client_id: string | null;
            /** @description The list of Google Cloud Storage project ids which the Storage Gateway
             *     is allowed to access. If this list is unset, project access is
             *     unrestricted. The value is a list of project id strings.
             *      */
            projects?: string[] | null;
            /** @description Secret created to access access Google Cloud Storage with the client_id
             *     in this policy.
             *      */
            secret: string | null;
            /** @description Service account key to use when authenticating all storage access */
            service_account_key?: Record<string, unknown> | null;
            /** @description Flag indicating whether users must register a credential.  If true (or
             *     if this property is missing), this storage gateway is configured for
             *     OAuth2 user authentication.  If false, authentication is configured by
             *     the admin.
             *      */
            readonly user_credential_required?: boolean;
        };
        /**
         * GoogleCloudStorageCollectionPolicies_1_0_0
         * @description Connector-specific collection policies for the Google Cloud Storage
         *     connector
         *
         */
        GoogleCloudStorageCollectionPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default google_cloud_storage_collection_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "google_cloud_storage_collection_policies#1.0.0";
            /** @description Google Cloud Platform project ID value that is associated with this
             *     collection. If set, users must be a member of this project to access
             *     the collection.  If the storage gateway 'projects' property is set
             *     to exactly one project, that will be the default value for this property.
             *      */
            project?: string;
        };
        /**
         * GoogleCloudStorageProject
         * @description A Google Cloud Platform project resource
         *
         */
        GoogleCloudStorageProject: {
            /** @description The name of the project */
            name?: string;
            /** @description Google-issued id of a Google Cloud Platform project */
            projectId?: string;
        };
        /**
         * GoogleCloudStorageUserCredentialPolicies_1_0_0
         * @description Connector-specific user credential policies for the Google Cloud Storage
         *     connector
         *
         */
        GoogleCloudStorageUserCredentialPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default google_cloud_storage_user_credential_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "google_cloud_storage_user_credential_policies#1.0.0";
            /** @description Access token to interact with the Google Cloud Storage API */
            access_token?: string | null;
            /** @description OpenID Connect email property of this credential */
            email?: string;
            /** @description List of Google Cloud Platform projects available for use with this
             *     credential.
             *      */
            projects?: components["schemas"]["GoogleCloudStorageProject"][];
            /** @description Refresh token to generate new access tokens to use with the Google
             *     Cloud Storage API
             *      */
            refresh_token?: string | null;
            /** @description List of OAuth2 scopes associated with the tokens in this credential */
            scopes?: string[];
            /** @description OpenID Connect subject property of this credential */
            sub?: string;
            /**
             * Format: date-time
             * @description Time when he access token expires
             */
            token_expiry?: string;
        };
        /**
         * GoogleDriveStoragePolicies_1_0_0
         * @description Connector-specific storage gateway policies for the Google Drive connector
         *
         */
        GoogleDriveStoragePolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default google_drive_storage_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "google_drive_storage_policies#1.0.0";
            /** @description URL of the auth callback that must be registered on the Google API
             *     console for the application client_id in order to process Google
             *     credentials.
             *      */
            readonly auth_callback?: string;
            /** @description Client ID registered with the Google Application console to access
             *     Google Drive.
             *      */
            client_id: string | null;
            /** @description Secret created to access access Google Drive with the client_id in this
             *     policy.
             *      */
            secret: string | null;
            /** @description User API Rate quota associated with this client ID */
            user_api_rate_quota?: number;
        };
        /**
         * GoogleDriveStoragePolicies_1_1_0
         * @description Connector-specific storage gateway policies for the Google Drive connector
         *
         */
        GoogleDriveStoragePolicies_1_1_0: {
            /**
             * @description Type of this document
             * @default google_drive_storage_policies#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "google_drive_storage_policies#1.1.0";
            /** @description If true, allow users to access personal or external Google accounts.
             *     If false (the default), users must use the Google account which
             *     matches the username their Globus credential maps to.
             *      */
            allow_any_account?: boolean;
            /** @description URL of the auth callback that must be registered on the Google API
             *     console for the application client_id in order to process Google
             *     credentials.
             *      */
            readonly auth_callback?: string;
            /** @description Client ID registered with the Google Application console to access
             *     Google Drive.
             *      */
            client_id: string | null;
            /** @description Secret created to access access Google Drive with the client_id in this
             *     policy.
             *      */
            secret: string | null;
            /** @description User API Rate quota associated with this client ID */
            user_api_rate_quota?: number;
        };
        /**
         * GoogleDriveCollectionPolicies_1_0_0
         * @description Connector-specific collection policies for the Google Drive connector
         *
         */
        GoogleDriveCollectionPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default google_drive_collection_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "google_drive_collection_policies#1.0.0";
        };
        /**
         * GoogleDriveUserCredentialPolicies_1_0_0
         * @description Connector-specific user credential policies for the Google Drive connector
         *
         */
        GoogleDriveUserCredentialPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default google_drive_user_credential_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "google_drive_user_credential_policies#1.0.0";
            /** @description OAuth access token */
            access_token?: string | null;
            /** @description OAuth email claim */
            email?: string | null;
            /** @description OAuth refresh token */
            refresh_token?: string | null;
            /**
             * @description OAuth scopes associated with this access token
             * @example [
             *       "email",
             *       "profile",
             *       "https://www.googleapis.com/auth/drive",
             *       "https://www.googleapis.com/auth/drive.appfolder"
             *     ]
             */
            scopes?: string[];
            /** @description OAuth subject identifier claim */
            sub?: string | null;
            /**
             * Format: date-time
             * @description OAuth access token expiration time
             */
            token_expiry?: string;
        };
        /**
         * HPSSStoragePolicies_1_0_0
         * @description Connector-specific storage gateway policies for the HPSS connector
         *
         */
        HPSSStoragePolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default hpss_storage_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "hpss_storage_policies#1.0.0";
            /**
             * @description The type of authentication the connector will perform when logging into HPSS
             *
             * @enum {string}
             */
            authentication_mech: "krb5" | "unix";
            /**
             * @description Authenticator used with authentication mech to perform authentication
             *     to HPSS. Format is: "<auth_type>:<auth_file>" where <auth_type> is one
             *     of "auth_keytab" or "auth_keyfile".
             *
             * @example auth_keytab:/var/hpss/etc/gridftp.keytab
             */
            authenticator: string;
            /** @description Flag that indicates if checksums should be stored within UDAs so that
             *     sync-by-checksum transfers can verify the file without staging the file
             *     from tape.
             *      */
            uda_checksum: boolean;
        };
        /** HPSSStoragePolicies_1_1_0 */
        HPSSStoragePolicies_1_1_0: {
            /**
             * @description Type of this document
             * @default hpss_storage_policies#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "hpss_storage_policies#1.1.0";
            /**
             * @description The type of authentication the connector will perform when logging into HPSS
             *
             * @enum {string}
             */
            authentication_mech: "krb5" | "unix";
            /**
             * @description Authenticator used with authentication mech to perform authentication
             *     to HPSS. Format is: "<auth_type>:<auth_file>" where <auth_type> is one
             *     of "auth_keytab" or "auth_keyfile".
             *
             * @example auth_keytab:/var/hpss/etc/gridftp.keytab
             */
            authenticator: string;
            /** @description Name of the HPSS user in the keytab file that the GridFTP server will use
             *     to authenticate to HPSS. This user must have the ability to switch to another
             *     HPSS user. Defaults to 'hpssftp' which is also handled special by HPSS with
             *     regards to the gate keeper.
             *      */
            login_name?: string;
            /** @description Flag that indicates if checksums should be stored within UDAs so that
             *     sync-by-checksum transfers can verify the file without staging the file
             *     from tape.
             *      */
            uda_checksum: boolean;
        };
        /**
         * HPSSCollectionPolicies_1_0_0
         * @description Connector-specific collection policies for the HPSS connector
         *
         */
        HPSSCollectionPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default hpss_collection_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "hpss_collection_policies#1.0.0";
        };
        /**
         * HPSSUserCredentialPolicies_1_0_0
         * @description Connector-specific user credential policies for the HPSS connector
         *
         */
        HPSSUserCredentialPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default hpss_user_credential_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "hpss_user_credential_policies#1.0.0";
        };
        /**
         * IrodsEnvironment
         * @description Variables to set in the iRODS client environment.
         *
         */
        IrodsEnvironment: {
            /** @description Environment variable name */
            name: string;
            /** @description Environment variable value */
            value: string;
        };
        /**
         * IrodsStoragePolicies_1_0_0
         * @description Connector-specific storage gateway policies for the Irods connector
         *
         */
        IrodsStoragePolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default irods_storage_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "irods_storage_policies#1.0.0";
            /** @description Variables to set in the iRODS client environment */
            environment?: components["schemas"]["IrodsEnvironment"][];
            /**
             * @description Path to the irods authentication file
             * @example /var/irods/.irodsA
             */
            irods_authentication_file?: string;
            /**
             * @description Path to the irods environment file
             * @example /var/irods/irods_environment.json
             */
            irods_environment_file: string;
        };
        /**
         * IrodsCollectionPolicies_1_0_0
         * @description Connector-specific collection policies for the Irods connector
         *
         */
        IrodsCollectionPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default irods_collection_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "irods_collection_policies#1.0.0";
        };
        /**
         * IrodsUserCredentialPolicies_1_0_0
         * @description Connector-specific user credential policies for the Irods connector
         *
         */
        IrodsUserCredentialPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default irods_user_credential_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "irods_user_credential_policies#1.0.0";
        };
        /**
         * OneDriveStoragePolicies_1_0_0
         * @description Connector-specific storage gateway policies for the OneDrive connector
         *
         */
        OneDriveStoragePolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default onedrive_storage_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "onedrive_storage_policies#1.0.0";
            /** @description URL of the auth callback that must be registered on the Microsoft
             *     API console for the application client_id in order to process
             *     Microsoft credentials.
             *      */
            readonly auth_callback?: string;
            /** @description Client ID registered with the Azure console to access OneDrive */
            client_id: string | null;
            /** @description Secret created in the Azure console to access OneDrive with the
             *     client_id in this policy.
             *      */
            secret: string | null;
            /** @description Tenant ID of the Microsoft organization. Required when Supported
             *     Account Types of the Azure application is set to Single tenant.
             *      */
            tenant?: string | null;
            /** @description User API Rate Limit associated with this client ID in operations per
             *     second per user.
             *      */
            user_api_rate_limit?: number;
        };
        /**
         * OneDriveStoragePolicies_1_1_0
         * @description Connector-specific storage gateway policies for the OneDrive connector
         *
         */
        OneDriveStoragePolicies_1_1_0: {
            /**
             * @description Type of this document
             * @default onedrive_storage_policies#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "onedrive_storage_policies#1.1.0";
            /** @description If true, allow users to access personal or external Microsoft accounts.
             *     If false (the default), users must use the Microsoft account which
             *     matches the username their Globus credential maps to.
             *      */
            allow_any_account?: boolean;
            /** @description URL of the auth callback that must be registered on the Microsoft
             *     API console for the application client_id in order to process
             *     Microsoft credentials.
             *      */
            readonly auth_callback?: string;
            /** @description Client ID registered with the Azure console to access OneDrive */
            client_id: string | null;
            /** @description Secret created in the Azure console to access OneDrive with the
             *     client_id in this policy.
             *      */
            secret: string | null;
            /** @description Tenant ID of the Microsoft organization. Required when Supported
             *     Account Types of the Azure application is set to Single tenant.
             *      */
            tenant?: string | null;
            /** @description User API Rate Limit associated with this client ID in operations per
             *     second per user.
             *      */
            user_api_rate_limit?: number;
        };
        /**
         * OneDriveCollectionPolicies_1_0_0
         * @description Connector-specific collection policies for the OneDrive connector
         *
         */
        OneDriveCollectionPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default onedrive_collection_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "onedrive_collection_policies#1.0.0";
        };
        /**
         * OneDriveUserCredentialPolicies_1_0_0
         * @description Connector-specific user credential policies for the OneDrive connector
         *
         */
        OneDriveUserCredentialPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default onedrive_user_credential_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "onedrive_user_credential_policies#1.0.0";
            /** @description OAuth access token */
            access_token?: string | null;
            /** @description OAuth email claim */
            email?: string | null;
            /** @description OAuth refresh token */
            refresh_token?: string | null;
            /**
             * @description OAuth scopes associated with the access token
             * @example [
             *       "openid",
             *       "email",
             *       "profile",
             *       "offline_access",
             *       "files.readwrite.all"
             *     ]
             */
            scopes?: string[];
            /** @description OAuth subject identifier claim */
            sub?: string | null;
            tid?: string;
            /**
             * Format: date-time
             * @description OAuth access token expiration time
             */
            token_expiry?: string;
        };
        /**
         * PosixStoragePolicies_1_0_0
         * @description Connector-specific storage gateway policies for the POSIX connector.
         *
         */
        PosixStoragePolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default posix_storage_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "posix_storage_policies#1.0.0";
            /** @description List of POSIX group names allowed to access this storage gateway
             *      */
            groups_allow?: string[] | null;
            /** @description List of POSIX group names denied access this storage gateway
             *      */
            groups_deny?: string[] | null;
        };
        /**
         * PosixCollectionPolicies_1_0_0
         * @description Connector-specific collection policies for the POSIX connector
         *
         */
        PosixCollectionPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default posix_collection_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "posix_collection_policies#1.0.0";
        };
        /**
         * PosixCollectionPolicies_1_1_0
         * @description Connector-specific collection policies for the POSIX connector
         *
         *
         *     Version 1.1.0 of the posix_collection_policies document adds the
         *     **sharing_groups_allow**, and **sharing_groups_deny** properties.
         *
         */
        PosixCollectionPolicies_1_1_0: {
            /**
             * @description Type of this document
             * @default posix_collection_policies#1.1.0
             * @enum {string}
             */
            DATA_TYPE: "posix_collection_policies#1.1.0";
            /** @description List of POSIX group names allowed to create shares on this collection
             *      */
            sharing_groups_allow?: string[] | null;
            /** @description List of POSIX group names denied access to create shares on this
             *     collection.
             *      */
            sharing_groups_deny?: string[] | null;
        };
        /**
         * PosixUserCredentialPolicies_1_0_0
         * @description Connector-specific user credential policies for the POSIX connector
         *
         */
        PosixUserCredentialPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default posix_user_credential_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "posix_user_credential_policies#1.0.0";
        };
        /**
         * PosixStagingEnvironment
         * @description Variables to set in the environment when executing
         *     the stage_app.
         *
         */
        PosixStagingEnvironment: {
            /** @description Environment variable name */
            name: string;
            /** @description Environment variable value */
            value: string;
        };
        /**
         * PosixStagingStoragePolicies_1_0_0
         * @description Connector-specific storage gateway policies for the POSIX Staging connector
         *
         */
        PosixStagingStoragePolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default posix_staging_storage_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "posix_staging_storage_policies#1.0.0";
            /** @description Variables to set in the environment when executing the stage_app */
            environment?: components["schemas"]["PosixStagingEnvironment"][];
            /** @description List of POSIX group names allowed to access this storage gateway
             *      */
            groups_allow?: string[] | null;
            /** @description List of POSIX group names denied access this storage gateway
             *      */
            groups_deny?: string[] | null;
            /** @description Path to the stage app */
            stage_app: string;
        };
        /**
         * PosixStagingCollectionPolicies_1_0_0
         * @description Connector-specific collection policies for the POSIX Staging connector
         *
         */
        PosixStagingCollectionPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default posix_staging_collection_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "posix_staging_collection_policies#1.0.0";
            /** @description List of POSIX group names allowed to create shares on this collection
             *      */
            sharing_groups_allow?: string[] | null;
            /** @description List of POSIX group names denied access to create shares on this
             *     collection.
             *      */
            sharing_groups_deny?: string[] | null;
        };
        /**
         * PosixStagingUserCredentialPolicies_1_0_0
         * @description Connector-specific user credential policies for the POSIX Staging connector
         *
         */
        PosixStagingUserCredentialPolicies_1_0_0: {
            /**
             * @description Type of this document
             * @default posix_staging_user_credential_policies#1.0.0
             * @enum {string}
             */
            DATA_TYPE: "posix_staging_user_credential_policies#1.0.0";
        };
        /**
         * Node
         * @description Services for Globus Connect Server endpoints may be deployed on multiple
         *     different physical resources, referred to as data transfer nodes. Each node
         *     may have one or more IP addresses, TCP incoming and outgoing port ranges,
         *     and a *status* value indicating whether it is configured to actively
         *     respond to requests or is in maintenance mode.
         *
         *     Version 1.1.0 adds support for setting the data interface on a node.
         *
         *     Version 1.2.0 adds support for setting an IPv6 data interface on a node.
         *
         */
        Node: components["schemas"]["Node_1_0_0"] | components["schemas"]["Node_1_1_0"] | components["schemas"]["Node_1_2_0"];
        /**
         * Batch
         * @description The Batch data type is used to specify multiple objects to operate
         *     on via a single REST API call.
         *
         */
        Batch: components["schemas"]["Batch_1_0_0"];
        /**
         * AuthenticationTimeout
         * @description Error details when a user must reauthenticate an identity
         *     in order to perform this operation.
         *
         *     Version 1.1.0 adds the require_mfa property.
         *
         */
        AuthenticationTimeout: components["schemas"]["AuthenticationTimeout_1_0_0"] | components["schemas"]["AuthenticationTimeout_1_1_0"];
        /**
         * CheckResult
         * @description Consistency check information
         */
        CheckResult: components["schemas"]["CheckResult_1_0_0"];
        /**
         * SharingPolicy
         * @description Sharing policies for a mapped collection.
         *
         *     This document type allows endpoint and collection administrators to
         *     optionally constrain sharing path policies for particular users. The
         *     **sharing_restrict_paths** property has a similar meaning to that of the
         *     **sharing_restrict_paths** in the collection document; however, it is in
         *     effect only for specific users.
         *
         *     If the **users** property is null, then the restriction applies to all
         *     users. If it is non-null, then this restriction applies only to accounts
         *     which have been mapped to the enumerated storage gateway user accounts.
         *
         *     Multiple sharing policies can be defined for a mapped collection.  When a
         *     guest collection is created or accessed, only the policies relevant to the
         *     user which created the account are enforced.
         *
         */
        SharingPolicy: components["schemas"]["SharingPolicy_1_0_0"];
        /**
         * Collection
         * @description A collection consists of metadata about the collection, a DNS
         *     domain for accessing data on the collection, and configuration on
         *     the Data Transfer Nodes to access the collection data. Globus
         *     Connect Server version 5 supports two types of collections:
         *     **mapped** and **guest**.
         *
         *     Version 1.1.0 adds support for enabling or disabling https access for
         *     individual collections, as well as the ability for collection
         *     administrators to add an optional message and web link to be shown on
         *     the Globus Web App when users visit the collection.
         *
         *     Version 1.2.0 adds the ability to enable or disable sharing by specific
         *     users.
         *
         *     Version 1.3.0 add support for custom DNS domains on collections.
         *
         *     Version 1.4.0 allows optional multi-factor authentication requirements to
         *     high assurance collections and the ability to require checksums when
         *     transferring data on this collection.
         *
         *     Version 1.5.0 allows administrators to disable permissions that would allow
         *     anonymous users to have write access to an endpoint.
         *
         *     Version 1.6.0 allows administrators of mapped collections to associate
         *     policies that users accessing guest collections must meet beyond the
         *     guest collection permissions.
         *
         *     Version 1.7.0 increases the maximum allowed length of the user_message
         *     property.
         *
         *     Version 1.8.0 adds the delete_protected property. While it is set to true
         *     on a mapped collection, the collection may not be deleted. As of GCS 5.4.69,
         *     this is true by default.
         *
         *     Version 1.9.0 adds the read-only last_access and created_at properties.
         *
         *     Version 1.10.0 adds the acl_expiration_mins property to HA mapped collections.
         *
         *     Version 1.11.0 adds the acl_expiration_mins property to HA guest collection.
         *
         *     Version 1.12.0 adds the restrict_transfers_to_high_assurance property to HA
         *     collections.
         *
         *     Version 1.13.0 adds the auto_delete_timeout property to mapped collections
         *     and the skip_auto_delete property to guest collections.
         *
         *     Version 1.14.0 adds the subscription_admin_verified property to collections
         *     and activity_notification_policy to guest collections.
         *
         *     Version 1.15.0 adds the associated_flow_policy property to the collection.
         *
         */
        Collection: components["schemas"]["Collection_1_0_0"] | components["schemas"]["Collection_1_1_0"] | components["schemas"]["Collection_1_2_0"] | components["schemas"]["Collection_1_3_0"] | components["schemas"]["Collection_1_4_0"] | components["schemas"]["Collection_1_5_0"] | components["schemas"]["Collection_1_6_0"] | components["schemas"]["Collection_1_7_0"] | components["schemas"]["Collection_1_8_0"] | components["schemas"]["Collection_1_9_0"] | components["schemas"]["Collection_1_10_0"] | components["schemas"]["Collection_1_11_0"] | components["schemas"]["Collection_1_12_0"] | components["schemas"]["Collection_1_13_0"] | components["schemas"]["Collection_1_14_0"] | components["schemas"]["Collection_1_15_0"];
        /**
         * CollectionNotFound
         * @description Error details when a mapped collection no longer exists when accessing a
         *     guest collection.
         *
         */
        CollectionNotFound: components["schemas"]["CollectionNotFound_1_0_0"];
        /**
         * CollectionOwner
         * @description Schema for processing the collection_owner#1.0.0 data type
         *
         */
        CollectionOwner: components["schemas"]["CollectionOwner_1_0_0"];
        /**
         * Connector
         * @description Connector information document
         *
         *         Version 1.1.0 adds information about HA and BAA subscriptions.
         *
         */
        Connector: components["schemas"]["Connector_1_0_0"] | components["schemas"]["Connector_1_1_0"];
        /**
         * CredentialNotFound
         * @description Error details when a user has attempted to use a credential when creating a
         *     collection or logging in, but there are multiple mapped identities and none
         *     of them have a valid credential.
         *
         */
        CredentialNotFound: components["schemas"]["CredentialNotFound_1_0_0"];
        /**
         * Endpoint
         * @description A Globus Connect Server endpoint is a deployment of Globus Connect Server
         *     version 5. A single endpoint may optionally include multiple data transfer
         *     nodes. The endpoint provides a link between a Globus Connect Server
         *     deployment and the Globus Transfer service. The endpoint describes services
         *     for accessing data via GridFTP and HTTPS and also for configuring and
         *     managing the policies associated with that access.
         *
         *     Version 1.1.0 of the endpoint includes support for customizing the TCP port
         *     that the GridFTP listens on.
         *
         *     Version 1.2.0 of the endpoint includes read-only earliest_last_access
         *     to put a limit on collections which are missing a last_access value.
         *
         */
        Endpoint: components["schemas"]["Endpoint_1_0_0"] | components["schemas"]["Endpoint_1_1_0"] | components["schemas"]["Endpoint_1_2_0"];
        /**
         * EndpointOwner
         * @description Schema for processing the endpoint_owner#1.0.0 data type
         *
         */
        EndpointOwner: components["schemas"]["EndpointOwner_1_0_0"];
        /**
         * EndpointSubscription
         * @description Endpoint subscription
         *
         */
        EndpointSubscription: components["schemas"]["EndpointSubscription_1_0_0"];
        /**
         * IdNotInIdentitySet
         * @description Error details when a user has authenticated but has requested to act as an
         *     identity not in the current identity set.
         *
         */
        IdNotInIdentitySet: components["schemas"]["IdNotInIdentitySet_1_0_0"];
        /**
         * Info
         * @description This document contains information about the Globus Connect
         *     Server, including its software and supported API version
         *     number.
         *
         */
        Info: components["schemas"]["Info_1_0_0"];
        /**
         * InvalidCredential
         * @description Error details when the caller's identity maps to an account with a user
         *     credential that is in an invalid state.
         *
         */
        InvalidCredential: components["schemas"]["InvalidCredential_1_0_0"];
        /**
         * InvalidInput
         * @description Error details when the caller has sent an invalid input document.
         *
         */
        InvalidInput: components["schemas"]["InvalidInput_1_0_0"];
        /**
         * InvalidUser
         * @description Error details when the caller's identity does not map to valid local
         *     account.
         *
         */
        InvalidUser: components["schemas"]["InvalidUser_1_0_0"];
        /**
         * LimitExceeded
         * @description Error details when a user would be authorized, but the endpoint has reached
         *     a hard resource limit on the type of object being created.
         *
         */
        LimitExceeded: components["schemas"]["LimitExceeded_1_0_0"];
        /**
         * MissingRequiredRole
         * @description Error details when a user has authenticated but lacks a role to be able to
         *     perform the requested operation.
         *
         */
        MissingRequiredRole: components["schemas"]["MissingRequiredRole_1_0_0"];
        /**
         * MissingRequiredScopes
         * @description Error details when a user has authenticated but lacks an OAuth scope to be
         *     able to perform the requested operation.
         *
         */
        MissingRequiredScopes: components["schemas"]["MissingRequiredScopes_1_0_0"];
        /**
         * NotFromAllowedDomain
         * @description Error details when a user has authenticated but does not
         *     have an identity from the required domain to perform the
         *     requested action.
         *
         */
        NotFromAllowedDomain: components["schemas"]["NotFromAllowedDomain_1_0_0"];
        /**
         * NotResourceOwner
         * @description Error details when a user has authenticated but is not the owner of the
         *     resource being acted upon.
         *
         */
        NotResourceOwner: components["schemas"]["NotResourceOwner_1_0_0"];
        /**
         * SubscriptionAdminVerified
         * @description Subscription Admin Verified
         */
        SubscriptionAdminVerified: components["schemas"]["SubscriptionAdminVerified_1_0_0"];
        /**
         * OwnerString
         * @description Owner string document
         *
         */
        OwnerString: components["schemas"]["OwnerString_1_0_0"];
        /**
         * Result
         * @description This is the result envelope returned from all operations in this API. Each
         *     operation may add properties to this base document type with additional
         *     operation-specific data values.
         *
         *     Version 1.1.0 adds optional authorization_parameters to help process
         *     authorization or authentication errors
         *
         */
        Result: components["schemas"]["Result_1_0_0"] | components["schemas"]["Result_1_1_0"];
        /**
         * ResourceConflict
         * @description Error details when the caller has attempted to update an object that
         *     results in a conflict with some other object.
         *
         */
        ResourceConflict: components["schemas"]["ResourceConflict_1_0_0"];
        /**
         * Role
         * @description The "Role" document type represents the assignment of a role on an
         *     Endpoint or Collection to a Globus identity or group.
         *
         */
        Role: components["schemas"]["Role_1_0_0"];
        /**
         * StorageGateway
         * @description A storage gateway provides the access policies for the endpoint's
         *     connected storage systems. It is a named interface by which
         *     authorized users can create and manage collections on the
         *     connected storage system. A single storage system may be
         *     associated with multiple storage gateways, each with its own
         *     policies.
         *
         *     Storage gateway policies describe what type connector the storage
         *     gateway uses, the paths it allows access to, the login
         *     requirements are for the storage gateway, and the algorithm to
         *     map Globus identities to the user namespace of the storage
         *     gateway (e.g. local accounts).
         *
         *     Version 1.1.0 includes support for multi-factor authentication requirements
         *     for high assurance storage gateways.
         *
         *     Version 1.2.0 includes support for admin managed credentials.
         *
         *     Version 1.3.0 includes support for overriding the endpoint's network use
         *     parameters on a storage gateway.
         *
         */
        StorageGateway: components["schemas"]["StorageGateway_1_0_0"] | components["schemas"]["StorageGateway_1_1_0"] | components["schemas"]["StorageGateway_1_2_0"] | components["schemas"]["StorageGateway_1_3_0"];
        /**
         * StorageGatewayNotFound
         * @description Error details when a storage gateway no longer exists when accessing a
         *     collection.
         *
         */
        StorageGatewayNotFound: components["schemas"]["StorageGatewayNotFound_1_0_0"];
        /**
         * SubscriptionRequired
         * @description Error details when the caller has attempted to access a feature
         *     not supported by the endpoint's subscription.
         *
         */
        SubscriptionRequired: components["schemas"]["SubscriptionRequired_1_0_0"];
        /**
         * UserCredential
         * @description Credential information for an identity on a particular storage gateway and
         *     its related collections.
         *
         */
        UserCredential: components["schemas"]["UserCredential_1_0_0"];
        /**
         * S3StoragePolicies
         * @description Connector-specific storage gateway policies for the S3 connector
         *
         *     Version 1.1.0 adds support for the s3_requester_pays property
         *
         *     Version 1.2.0 adds support for the s3_allow_multi_keys property
         *
         */
        S3StoragePolicies: components["schemas"]["S3StoragePolicies_1_0_0"] | components["schemas"]["S3StoragePolicies_1_1_0"] | components["schemas"]["S3StoragePolicies_1_2_0"];
        /**
         * S3CollectionPolicies
         * @description Connector-specific collection policies for the S3 connector
         *
         */
        S3CollectionPolicies: components["schemas"]["S3CollectionPolicies_1_0_0"];
        /**
         * S3UserCredentialPolicies
         * @description Connector-specific user credential policies for the S3 connector
         *
         *     Version 1.1.0 adds support for the s3_requester_pays property.
         *
         *     Version 1.2.0 adds support for the s3_multi_keys property list.
         *
         */
        S3UserCredentialPolicies: components["schemas"]["S3UserCredentialPolicies_1_0_0"] | components["schemas"]["S3UserCredentialPolicies_1_1_0"] | components["schemas"]["S3UserCredentialPolicies_1_2_0"];
        /**
         * ActiveScaleStoragePolicies
         * @description Connector-specific storage gateway policies for the ActiveScale connector.
         *     These are identical to s3 connector's storage gateway policies.
         *
         */
        ActiveScaleStoragePolicies: components["schemas"]["S3StoragePolicies_1_0_0"];
        /**
         * ActiveScaleCollectionPolicies
         * @description Connector-specific storage gateway policies for the ActiveScale connector.
         *     These are identical to s3 connector's storage gateway policies.
         *
         */
        ActiveScaleCollectionPolicies: components["schemas"]["S3CollectionPolicies"];
        /**
         * ActiveScaleUserCredentialPolicies
         * @description Connector-specific storage gateway policies for the ActiveScale connector.
         *     These are identical to s3 connector's storage gateway policies.
         *
         */
        ActiveScaleUserCredentialPolicies: components["schemas"]["S3UserCredentialPolicies_1_0_0"];
        /**
         * AzureBlobStoragePolicies
         * @description Connector-specific storage gateway policies for the AzureBlob connector
         *
         */
        AzureBlobStoragePolicies: components["schemas"]["AzureBlobStoragePolicies_1_0_0"] | components["schemas"]["AzureBlobStoragePolicies_1_1_0"];
        /**
         * AzureBlobCollectionPolicies
         * @description Connector-specific collection policies for the AzureBlob connector
         *
         */
        AzureBlobCollectionPolicies: components["schemas"]["AzureBlobCollectionPolicies_1_0_0"];
        /**
         * AzureBlobUserCredentialPolicies
         * @description Connector-specific user credential policies for the AzureBlob connector
         *
         */
        AzureBlobUserCredentialPolicies: components["schemas"]["AzureBlobUserCredentialPolicies_1_0_0"];
        /**
         * BlackPearlStoragePolicies
         * @description Connector-specific storage gateway policies for the Blackpearl connector
         *
         */
        BlackPearlStoragePolicies: components["schemas"]["BlackPearlStoragePolicies_1_0_0"];
        /**
         * BlackPearlCollectionPolicies
         * @description Connector-specific collection policies for the BlackPearl connector
         *
         */
        BlackPearlCollectionPolicies: components["schemas"]["BlackPearlCollectionPolicies_1_0_0"];
        /**
         * BlackPearlUserCredentialPolicies
         * @description Connector-specific user credential policies for the Blackpearl connector
         *
         */
        BlackPearlUserCredentialPolicies: components["schemas"]["BlackPearlUserCredentialPolicies_1_0_0"];
        /**
         * BoxStoragePolicies
         * @description Connector-specific storage gateway policies for the Box connector.
         *
         */
        BoxStoragePolicies: components["schemas"]["BoxStorage_1_0_0"] | components["schemas"]["BoxStorage_1_1_0"] | components["schemas"]["BoxStorage_1_2_0"];
        /**
         * BoxCollectionPolicies
         * @description Connector-specific collection policies for the Box connector
         *
         */
        BoxCollectionPolicies: components["schemas"]["BoxCollectionPolicies_1_0_0"];
        /**
         * BoxUserCredentialPolicies
         * @description Connector-specific user credential policies for the Box connector
         *
         */
        BoxUserCredentialPolicies: components["schemas"]["BoxUserCredential_1_0_0"] | components["schemas"]["BoxUserCredential_1_1_0"];
        /**
         * CephStoragePolicies
         * @description Connector-specific storage gateway policies for the Ceph connector
         *
         */
        CephStoragePolicies: components["schemas"]["CephStoragePolicies_1_0_0"];
        /**
         * CephCollectionPolicies
         * @description Connector-specific collection policies for the Ceph connector
         *
         */
        CephCollectionPolicies: components["schemas"]["CephCollectionPolicies_1_0_0"];
        /**
         * CephUserCredentialPolicies
         * @description Connector-specific user credential policies for the Ceph connector
         *
         */
        CephUserCredentialPolicies: components["schemas"]["CephUserCredentialPolicies_1_0_0"];
        /**
         * DropboxStoragePolicies
         * @description Connector-specific storage gateway policies for the Dropbox connector
         *
         */
        DropboxStoragePolicies: components["schemas"]["DropboxStoragePolicies_1_0_0"];
        /**
         * DropboxCollectionPolicies
         * @description Connector-specific collection policies for the Dropbox connector
         *
         */
        DropboxCollectionPolicies: components["schemas"]["DropboxCollectionPolicies_1_0_0"];
        /**
         * DropboxUserCredentialPolicies
         * @description Connector-specific user credential policies for the Dropbox connector
         *
         */
        DropboxUserCredentialPolicies: components["schemas"]["DropboxUserCredentialPolicies_1_0_0"];
        /**
         * GoogleCloudStoragePolicies
         * @description Connector-specific storage gateway policies for the Google Cloud Storage
         *     connector
         *
         */
        GoogleCloudStoragePolicies: components["schemas"]["GoogleCloudStoragePolicies_1_0_0"] | components["schemas"]["GoogleCloudStoragePolicies_1_1_0"];
        /**
         * GoogleCloudStorageCollectionPolicies
         * @description Connector-specific collection policies for the Google Cloud Storage
         *     connector
         *
         */
        GoogleCloudStorageCollectionPolicies: components["schemas"]["GoogleCloudStorageCollectionPolicies_1_0_0"];
        /**
         * GoogleCloudStorageUserCredentialPolicies
         * @description Connector-specific user credential policies for the Google Cloud Storage
         *     connector
         *
         */
        GoogleCloudStorageUserCredentialPolicies: components["schemas"]["GoogleCloudStorageUserCredentialPolicies_1_0_0"];
        /**
         * GoogleDriveStoragePolicies
         * @description Connector-specific storage gateway policies for the Google Drive connector
         *
         */
        GoogleDriveStoragePolicies: components["schemas"]["GoogleDriveStoragePolicies_1_0_0"] | components["schemas"]["GoogleDriveStoragePolicies_1_1_0"];
        /**
         * GoogleDriveCollectionPolicies
         * @description Connector-specific collection policies for the Google Drive connector
         *
         */
        GoogleDriveCollectionPolicies: components["schemas"]["GoogleDriveCollectionPolicies_1_0_0"];
        /**
         * GoogleDriveUserCredentialPolicies
         * @description Connector-specific user credential policies for the Google Drive connector
         *
         */
        GoogleDriveUserCredentialPolicies: components["schemas"]["GoogleDriveUserCredentialPolicies_1_0_0"];
        /** HPSSStoragePolicies */
        HPSSStoragePolicies: components["schemas"]["HPSSStoragePolicies_1_0_0"] | components["schemas"]["HPSSStoragePolicies_1_1_0"];
        /**
         * HPSSCollectionPolicies
         * @description Connector-specific collection policies for the HPSS connector
         *
         */
        HPSSCollectionPolicies: components["schemas"]["HPSSCollectionPolicies_1_0_0"];
        /**
         * HPSSUserCredentialPolicies
         * @description Connector-specific user credential policies for the HPSS connector
         *
         */
        HPSSUserCredentialPolicies: components["schemas"]["HPSSUserCredentialPolicies_1_0_0"];
        /**
         * IrodsStoragePolicies
         * @description Connector-specific storage gateway policies for the Irods connector
         *
         */
        IrodsStoragePolicies: components["schemas"]["IrodsStoragePolicies_1_0_0"];
        /**
         * IrodsCollectionPolicies
         * @description Connector-specific collection policies for the Irods connector
         *
         */
        IrodsCollectionPolicies: components["schemas"]["IrodsCollectionPolicies_1_0_0"];
        /**
         * IrodsUserCredentialPolicies
         * @description Connector-specific user credential policies for the Irods connector
         *
         */
        IrodsUserCredentialPolicies: components["schemas"]["IrodsUserCredentialPolicies_1_0_0"];
        /**
         * OneDriveStoragePolicies
         * @description Connector-specific storage gateway policies for the OneDrive connector
         *
         */
        OneDriveStoragePolicies: components["schemas"]["OneDriveStoragePolicies_1_0_0"] | components["schemas"]["OneDriveStoragePolicies_1_1_0"];
        /**
         * OneDriveCollectionPolicies
         * @description Connector-specific collection policies for the OneDrive connector
         *
         */
        OneDriveCollectionPolicies: components["schemas"]["OneDriveCollectionPolicies_1_0_0"];
        /**
         * OneDriveUserCredentialPolicies
         * @description Connector-specific user credential policies for the OneDrive connector
         *
         */
        OneDriveUserCredentialPolicies: components["schemas"]["OneDriveUserCredentialPolicies_1_0_0"];
        /**
         * PosixStoragePolicies
         * @description Connector-specific storage gateway policies for the POSIX connector.
         *
         */
        PosixStoragePolicies: components["schemas"]["PosixStoragePolicies_1_0_0"];
        /**
         * PosixCollectionPolicies
         * @description Connector-specific collection policies for the POSIX connector
         *
         *
         *     Version 1.1.0 of the posix_collection_policies document adds the
         *     **sharing_groups_allow**, and **sharing_groups_deny** properties.
         *
         */
        PosixCollectionPolicies: components["schemas"]["PosixCollectionPolicies_1_0_0"] | components["schemas"]["PosixCollectionPolicies_1_1_0"];
        /**
         * PosixUserCredentialPolicies
         * @description Connector-specific user credential policies for the POSIX connector
         *
         */
        PosixUserCredentialPolicies: components["schemas"]["PosixUserCredentialPolicies_1_0_0"];
        /**
         * PosixStagingStoragePolicies
         * @description Connector-specific storage gateway policies for the POSIX Staging connector
         *
         */
        PosixStagingStoragePolicies: components["schemas"]["PosixStagingStoragePolicies_1_0_0"];
        /**
         * PosixStagingCollectionPolicies
         * @description Connector-specific collection policies for the POSIX Staging connector
         *
         */
        PosixStagingCollectionPolicies: components["schemas"]["PosixStagingCollectionPolicies_1_0_0"];
        /**
         * PosixStagingUserCredentialPolicies
         * @description Connector-specific user credential policies for the POSIX Staging connector
         *
         */
        PosixStagingUserCredentialPolicies: components["schemas"]["PosixStagingUserCredentialPolicies_1_0_0"];
    };
    responses: {
        /** @description Unsupported media type */
        UnsupportedMediaError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    /** @enum {string} */
                    code?: "unsupported_media_type";
                    /** @enum {unknown} */
                    http_response_code?: 415;
                } & components["schemas"]["Result"];
            };
        };
        /** @description Bad Request */
        BadRequestError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    /** @enum {string} */
                    code?: "bad_request";
                    /** @enum {unknown} */
                    http_response_code?: 400;
                } & components["schemas"]["Result"];
            };
        };
        /** @description Unprocessable entity */
        ValidationError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    /** @enum {string} */
                    code?: "unprocessable_entity";
                    /** @enum {unknown} */
                    http_response_code?: 422;
                    detail?: string | components["schemas"]["InvalidInput"];
                } & components["schemas"]["Result"];
            };
        };
        /** @description Unauthorized */
        Unauthorized: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    /** @enum {string} */
                    code?: "not_authorized";
                    /** @enum {unknown} */
                    http_response_code?: 401;
                    detail?: string | components["schemas"]["MissingRequiredScopes"];
                } & components["schemas"]["Result"];
            };
        };
        /** @description Not found */
        NotFound: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    /** @enum {string} */
                    code?: "not_found";
                    /** @enum {unknown} */
                    http_response_code?: 404;
                } & components["schemas"]["Result"];
            };
        };
    };
    parameters: {
        /** @description Maximum page size for a paginated response */
        page_size_query_parameter: number;
        /** @description Pagination marker for a paginated response */
        marker_query_parameter: string;
        /** @description ID of the collection */
        collection_id_query_parameter: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    postCollectionsBatchDelete: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description List of collection ids to delete */
        requestBody: {
            content: {
                "application/json": components["schemas"]["Batch"];
            };
        };
        responses: {
            /** @description Delete multiple collections response */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Batch"][];
                    } & components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": ({
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"]) | ({
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["Batch"];
                    } & components["schemas"]["Result"]);
                };
            };
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    checkCollections: {
        parameters: {
            query?: {
                /** @description Maximum page size for a paginated response */
                page_size?: components["parameters"]["page_size_query_parameter"];
                /** @description Pagination marker for a paginated response */
                marker?: components["parameters"]["marker_query_parameter"];
                /** @description Filter to apply to the return set
                 *      */
                filter?: string[];
                /** @description Filter collections which were created using this storage_gateway_id
                 *      */
                storage_gateway_id?: string;
                /** @description Filter collections which were created using this mapped_collection_id
                 *      */
                mapped_collection_id?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Check collections response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["CheckResult"][];
                    } & components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    listCollections: {
        parameters: {
            query?: {
                /** @description Maximum page size for a paginated response */
                page_size?: components["parameters"]["page_size_query_parameter"];
                /** @description Pagination marker for a paginated response */
                marker?: components["parameters"]["marker_query_parameter"];
                /** @description Document values to include */
                include?: "private_policies"[];
                /** @description Filter to apply to the return set
                 *      */
                filter?: string[];
                /** @description Filter collections which were created using this storage_gateway_id
                 *      */
                storage_gateway_id?: string;
                /** @description Filter collections which were created using this mapped_collection_id
                 *      */
                mapped_collection_id?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List collections response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Collection"][];
                    } & components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    postCollection: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Collection definition */
        requestBody: {
            content: {
                "application/json": components["schemas"]["Collection"];
            };
        };
        responses: {
            /** @description Create collections response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Collection"][];
                    } & components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["AuthenticationTimeout"] | components["schemas"]["CredentialNotFound"] | components["schemas"]["IdNotInIdentitySet"] | components["schemas"]["InvalidCredential"] | components["schemas"]["InvalidUser"] | components["schemas"]["MissingRequiredRole"] | components["schemas"]["NotFromAllowedDomain"] | components["schemas"]["SubscriptionRequired"];
                    } & components["schemas"]["Result"];
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "conflict";
                        /** @enum {unknown} */
                        http_response_code?: 409;
                        detail?: string | components["schemas"]["ResourceConflict"];
                    } & components["schemas"]["Result"];
                };
            };
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    putSubscriptionAdminVerified: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the collection */
                collection_id: string;
            };
            cookie?: never;
        };
        /** @description New value of the subscription_admin_verified property of this collection */
        requestBody: {
            content: {
                "application/json": components["schemas"]["SubscriptionAdminVerified"];
            };
        };
        responses: {
            /** @description Set collection subscription admin verified response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    putCollectionOwnerString: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the collection */
                collection_id: string;
            };
            cookie?: never;
        };
        /** @description New collection owner string */
        requestBody: {
            content: {
                "application/json": components["schemas"]["OwnerString"];
            };
        };
        responses: {
            /** @description Set collection owner string response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    deleteCollectionOwnerString: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the collection */
                collection_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Delete collection owner string response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    getCollectionDomain: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the collection */
                collection_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Get collection domain response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Domain"][];
                    } & components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    putCollectionDomain: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the collection */
                collection_id: string;
            };
            cookie?: never;
        };
        /** @description New collection domain definition */
        requestBody: {
            content: {
                "application/json": components["schemas"]["Domain"];
            };
        };
        responses: {
            /** @description Set collection domain response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    deleteCollectionDomain: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the collection */
                collection_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Delete collection domain response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    checkCollection: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the collection */
                collection_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Check response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["CheckResult"][];
                    } & components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    setCollectionOwner: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the collection */
                collection_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CollectionOwner"];
            };
        };
        responses: {
            /** @description Set collection owner response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    getCollection: {
        parameters: {
            query?: {
                /** @description Document values to include */
                include?: "private_policies"[];
            };
            header?: never;
            path: {
                /** @description Id of the collection */
                collection_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List collections response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Collection"][];
                    } & components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    putCollection: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the collection */
                collection_id: string;
            };
            cookie?: never;
        };
        /** @description New collection definition */
        requestBody: {
            content: {
                "application/json": components["schemas"]["Collection"];
            };
        };
        responses: {
            /** @description Update collections response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    deleteCollection: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the collection */
                collection_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Delete collections response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    patchCollection: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the collection */
                collection_id: string;
            };
            cookie?: never;
        };
        /** @description Changes to apply to the collection */
        requestBody: {
            content: {
                "application/json": components["schemas"]["Collection"];
            };
        };
        responses: {
            /** @description Update collections response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    putEndpointSubscriptionId: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Endpoint subscription request */
        requestBody: {
            content: {
                "application/json": components["schemas"]["EndpointSubscription"];
            };
        };
        responses: {
            /** @description Set endpoint owner response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    putEndpointOwnerString: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description New endpoint owner_string */
        requestBody: {
            content: {
                "application/json": components["schemas"]["OwnerString"];
            };
        };
        responses: {
            /** @description Set endpoint owner string response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    deleteEndpointOwnerString: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Reset advertised owner string response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
        };
    };
    getEndpointDomain: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Get endpoint domain response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
        };
    };
    putEndpointDomain: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Put domain request */
        requestBody: {
            content: {
                "application/json": components["schemas"]["Domain"];
            };
        };
        responses: {
            /** @description Set endpoint domain response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    deleteEndpointDomain: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Delete endpoint domain response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
        };
    };
    putEndpointOwner: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EndpointOwner"];
            };
        };
        responses: {
            /** @description Set endpoint owner response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    getEndpoint: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Get endpoint response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Endpoint"][];
                    } & components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
        };
    };
    putEndpoint: {
        parameters: {
            query?: {
                /** @description List of document types to include in the response */
                include?: "endpoint"[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description New endpoint document */
        requestBody: {
            content: {
                "application/json": components["schemas"]["Endpoint"];
            };
        };
        responses: {
            /** @description Update endpoint response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Endpoint"][];
                    } & components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    patchEndpoint: {
        parameters: {
            query?: {
                /** @description List of document types to include in the response */
                include?: "endpoint"[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Changes to the Endpoint document */
        requestBody: {
            content: {
                "application/json": components["schemas"]["Endpoint"];
            };
        };
        responses: {
            /** @description Update endpoint response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Endpoint"][];
                    } & components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    getInfo: {
        parameters: {
            query?: {
                /** @description Maximum page size for a paginated response */
                page_size?: components["parameters"]["page_size_query_parameter"];
                /** @description Pagination marker for a paginated response */
                marker?: components["parameters"]["marker_query_parameter"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Get info response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: (components["schemas"]["Connector"] | components["schemas"]["Info"])[];
                    } & components["schemas"]["Result"];
                };
            };
        };
    };
    listNodes: {
        parameters: {
            query?: {
                /** @description Maximum page size for a paginated response */
                page_size?: components["parameters"]["page_size_query_parameter"];
                /** @description Pagination marker for a paginated response */
                marker?: components["parameters"]["marker_query_parameter"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List nodes response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Node"][];
                    } & components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
        };
    };
    postNode: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description New node definition */
        requestBody: {
            content: {
                "application/json": components["schemas"]["Node"];
            };
        };
        responses: {
            /** @description Create node response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Node"][];
                    } & components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": ({
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"]) | ({
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["LimitExceeded"];
                    } & components["schemas"]["Result"]);
                };
            };
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    getNode: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the node */
                node_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Get node response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Node"][];
                    } & components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    putNode: {
        parameters: {
            query?: {
                /** @description Flag indicating whether to request all roles assignments for the endpoint
                 *     or collection.
                 *      */
                include?: "node"[];
            };
            header?: never;
            path: {
                /** @description Id of the node */
                node_id: string;
            };
            cookie?: never;
        };
        /** @description New node definition */
        requestBody: {
            content: {
                "application/json": components["schemas"]["Node"];
            };
        };
        responses: {
            /** @description Update node response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Node"][];
                    } & components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    deleteNode: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the node */
                node_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Delete node response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    patchNode: {
        parameters: {
            query?: {
                /** @description Flag indicating whether to request all roles assignments for the endpoint
                 *     or collection.
                 *      */
                include?: "node"[];
            };
            header?: never;
            path: {
                /** @description Id of the node */
                node_id: string;
            };
            cookie?: never;
        };
        /** @description Updates to node definition */
        requestBody: {
            content: {
                "application/json": components["schemas"]["Node"];
            };
        };
        responses: {
            /** @description Update node response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Node"][];
                    } & components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    listRoles: {
        parameters: {
            query?: {
                /** @description Maximum page size for a paginated response */
                page_size?: components["parameters"]["page_size_query_parameter"];
                /** @description Pagination marker for a paginated response */
                marker?: components["parameters"]["marker_query_parameter"];
                /** @description ID of the collection */
                collection_id?: components["parameters"]["collection_id_query_parameter"];
                /** @description Flag indicating whether to request all roles assignments for the endpoint
                 *     or collection.
                 *      */
                include?: "all_roles"[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List roles response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Role"][];
                    } & components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
        };
    };
    postRoles: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description New role assignment document */
        requestBody: {
            content: {
                "application/json": components["schemas"]["Role"];
            };
        };
        responses: {
            /** @description Create role response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Role"][];
                    } & components["schemas"]["Result"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "bad_request";
                        /** @enum {unknown} */
                        http_response_code?: 400;
                    } & components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": ({
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"]) | ({
                        /** @enum {string} */
                        code?: "subscription_required";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["SubscriptionRequired"];
                    } & components["schemas"]["Result"]);
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "exists";
                        /** @enum {unknown} */
                        http_response_code?: 409;
                    } & components["schemas"]["Result"];
                };
            };
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    getRole: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the role */
                role_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Get role response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["Role"][];
                    } & components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    deleteRole: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the role */
                role_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Delete role response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": ({
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"]) | ({
                        /** @enum {string} */
                        code?: "subscription_required";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["SubscriptionRequired"];
                    } & components["schemas"]["Result"]);
                };
            };
            404: components["responses"]["NotFound"];
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "conflict";
                        /** @enum {unknown} */
                        http_response_code?: 409;
                    } & components["schemas"]["Result"];
                };
            };
        };
    };
    listSharingPolicies: {
        parameters: {
            query: {
                /** @description Maximum page size for a paginated response */
                page_size?: components["parameters"]["page_size_query_parameter"];
                /** @description Pagination marker for a paginated response */
                marker?: components["parameters"]["marker_query_parameter"];
                /** @description Username to query information about */
                username?: string;
                /** @description ID of the collection */
                collection_id: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List sharing policies response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["SharingPolicy"][];
                    } & components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
        };
    };
    postSharingPolicy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description New sharing policy */
        requestBody: {
            content: {
                "application/json": components["schemas"]["SharingPolicy"];
            };
        };
        responses: {
            /** @description List sharing policies response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["SharingPolicy"][];
                    } & components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    getSharingPolicy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the sharing policy */
                sharing_policy_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Get sharing policy response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["SharingPolicy"][];
                    } & components["schemas"]["Result"];
                };
            };
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    deleteSharingPolicy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the sharing policy */
                sharing_policy_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Delete sharing policy response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    listStorageGateways: {
        parameters: {
            query?: {
                /** @description Maximum page size for a paginated response */
                page_size?: components["parameters"]["page_size_query_parameter"];
                /** @description Pagination marker for a paginated response */
                marker?: components["parameters"]["marker_query_parameter"];
                include?: ("private_policies" | "accounts")[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List storage gateways response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["StorageGateway"][];
                    } & components["schemas"]["Result"];
                };
            };
        };
    };
    postStorageGateway: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description New storage gateway definition */
        requestBody: {
            content: {
                "application/json": components["schemas"]["StorageGateway"];
            };
        };
        responses: {
            /** @description Post storage gateways response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["StorageGateway"][];
                    } & components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    getStorageGateway: {
        parameters: {
            query?: {
                include?: ("private_policies" | "accounts")[];
            };
            header?: never;
            path: {
                /** @description Id of the storage gateway */
                storage_gateway_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Get storage gateways response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["StorageGateway"][];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    putStorageGateway: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the storage gateway */
                storage_gateway_id: string;
            };
            cookie?: never;
        };
        /** @description Updated storage gateway definition */
        requestBody: {
            content: {
                "application/json": components["schemas"]["StorageGateway"];
            };
        };
        responses: {
            /** @description Update storage gateway response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["StorageGateway"][];
                    } & components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    deleteStorageGateway: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the storage gateway */
                storage_gateway_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Get storage gateways response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    patchStorageGateway: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the storage gateway */
                storage_gateway_id: string;
            };
            cookie?: never;
        };
        /** @description Updates to the storage gateway definition */
        requestBody: {
            content: {
                "application/json": components["schemas"]["StorageGateway"];
            };
        };
        responses: {
            /** @description Update storage gateway response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["StorageGateway"][];
                    } & components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["MissingRequiredRole"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    listUserCredentials: {
        parameters: {
            query?: {
                /** @description Maximum page size for a paginated response */
                page_size?: components["parameters"]["page_size_query_parameter"];
                /** @description Pagination marker for a paginated response */
                marker?: components["parameters"]["marker_query_parameter"];
                /** @description Credentials to include. If set to **all**, then -
                 *     credentials owned by other users are returned if the storage gateway allows
                 *     admin_managed_credentials and the caller has an endpoint:administrator or
                 *     endpoint:owner role.
                 *      */
                include?: "all"[];
                /** @description ID of the Storage Gateway */
                storage_gateway?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List user credential response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["UserCredential"][];
                    } & components["schemas"]["Result"];
                };
            };
        };
    };
    postUserCredential: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description New user credential definition */
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserCredential"];
            };
        };
        responses: {
            /** @description Create user credential response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["UserCredential"][];
                    } & components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    getUserCredential: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the user credential */
                user_credential_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Get user credential response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["UserCredential"][];
                    } & components["schemas"]["Result"];
                };
            };
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["NotResourceOwner"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    putUserCredential: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the user credential */
                user_credential_id: string;
            };
            cookie?: never;
        };
        /** @description Updated user credential definition */
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserCredential"];
            };
        };
        responses: {
            /** @description Update user credential response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["UserCredential"][];
                    } & components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["NotResourceOwner"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    deleteUserCredential: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the user credential */
                user_credential_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Delete user credential response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["NotResourceOwner"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    patchUserCredential: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Id of the user credential */
                user_credential_id: string;
            };
            cookie?: never;
        };
        /** @description Changes to the user credential definition */
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserCredential"];
            };
        };
        responses: {
            /** @description Update user credential response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "success";
                        data?: components["schemas"]["UserCredential"][];
                    } & components["schemas"]["Result"];
                };
            };
            400: components["responses"]["BadRequestError"];
            /** @description Permission denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {string} */
                        code?: "permission_denied";
                        /** @enum {unknown} */
                        http_response_code?: 403;
                        detail?: string | components["schemas"]["NotResourceOwner"];
                    } & components["schemas"]["Result"];
                };
            };
            404: components["responses"]["NotFound"];
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    getAuthcallbackGoogle: {
        parameters: {
            query: {
                /** @description OAuth code response */
                code?: string;
                /** @description Error information from the OAuth provider */
                error?: string;
                /** @description Encrypted authorization context */
                state: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Redirect to page initiating the credential creation */
            302: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            400: components["responses"]["BadRequestError"];
        };
    };
    postUserCredentials: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description User credential request */
        requestBody?: {
            content: {
                "application/x-www-form-urlencoded": components["schemas"]["OAuthUserCredentialForm"];
            };
        };
        responses: {
            /** @description Redirection to OAuth flow */
            303: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            400: components["responses"]["BadRequestError"];
            401: components["responses"]["Unauthorized"];
            415: components["responses"]["UnsupportedMediaError"];
            422: components["responses"]["ValidationError"];
        };
    };
    getAuthclicomplete: {
        parameters: {
            query?: {
                /** @description Unique identifier of the new credential */
                user_credential_id?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Authentication callback response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Result"];
                };
            };
        };
    };
    getAuthcallback: {
        parameters: {
            query: {
                /** @description OAuth code response */
                code?: string;
                /** @description Error information from the OAuth provider */
                error?: string;
                /** @description Encrypted authorization context */
                state: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Redirect to page initiating the credential creation */
            302: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            400: components["responses"]["BadRequestError"];
        };
    };
}
