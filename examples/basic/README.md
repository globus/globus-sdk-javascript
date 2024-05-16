# Example: Basic

This example will prompt users to authenticate and attempt to perform an `ls` on a configured Collection.

The example intentionally only uses vanilla JavaScript and DOM operations to keep the code concise and focus on SDK integrations.

To run this example, you will need to:

1. Ensure the file is accessible over HTTP(S).
    - **IMPORTANT**: HTTP redirects from Globus Auth are only allowed when hosting locally (i.e., `localhost`, `127.0.0.1`).
    - To host the file locally, using Node.js, you can use [serve](https://github.com/vercel/serve).
2. [Register a Globus Application](https://docs.globus.org/api/auth/developer-guide/#developing-apps)
    - Your application will be an OAuth public client.
    - The application can be registered in the Globus Web Application using the "_Register a thick client or script that will be installed and run by users on their devices_" option.
      - https://app.globus.org/settings/developers/registration/public_installed_client/select-project
    - Configure the "Redirects" to include the URL where the example is hosted (**Step 1**)
3. Update the example to include the following:
    - `collection` – The UUID of the collection to `ls`.
    - `client` – The UUID of the client you registered.
    - Optional:
      - `redirect` – Depending on your method of hosting this file, you may need to provide a different value.
