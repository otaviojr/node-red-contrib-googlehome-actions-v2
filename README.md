# node-red-contrib-googlehome-actions-v2

Node Red nodes to receive and respond to Google Action requests from Google Assistant.

This node is a wrapper around Google's actions-on-google-nodejs client library using the [Actions SDK](https://actions-on-google.github.io/actions-on-google-nodejs/2.12.0/index.html).

This node will use the http request and response nodes responding at the same URL NodeRed is running.
Other plugins have been using Express to open another port in order to secure nodered. Now a days we have
enough tech to protect nodered. We can use nginx or apache as reverse proxy or even API gateways like Kong
to obfuscate the URL's we don't want access, allowing only those we must.

The default design of a flow using this plugin is like the image below:

![node-red-contrib-googlehome-actions-v2 architecture](/design.png?raw=true "Title")
