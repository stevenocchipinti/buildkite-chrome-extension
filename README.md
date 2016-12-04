BuildKite Chrome Extension
==========================

Show the status of builds from within Chrome.

Note: This stores configuration (including `access_token` in localStorage).  
If this scares you, don't use this extension.


Installation
------------

First, because I haven't published this to the Chrome store yet, this extension
needs to be installed manually for now:

1. Clone git repo
2. Visit chrome://extensions
3. Check the 'Developer mode' box at the top
4. Click 'Load unpacked extension...'
5. Find the folder where the repo is checked out


Next, you need to generate an `access_token` from BuildKite:

1. Browse to https://buildkite.com/user/api-access-tokens
2. Generate a new token with `read_builds` permission
3. Copy the token


Next, configure the extension:

1. Click on the icon in the toolbar
2. Click on "Configure"
3. Paste the `access_token` into the "Access Token" field
4. Enter the names of the pipelines you want to monitor in the "Pipelines" field
   (Note: The format of these names must be `org/pipeline`)
