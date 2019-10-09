# node-red-contrib-googlehome-actions-v2

Node Red nodes to receive and respond to Google Action requests from Google Assistant.

This node is a wrapper around Google's actions-on-google-nodejs client library using the [Actions SDK](https://actions-on-google.github.io/actions-on-google-nodejs/2.12.0/index.html).

This node will use the http request and response nodes responding at the same URL NodeRed is running.
Other plugins have been using Express to open another port in order to secure nodered. Now a days we have
enough tech to protect nodered. We can use nginx or apache as reverse proxy or even API gateways like Kong
to obfuscate the URL's we don't want access, allowing only those we must.

The default design of a flow using this plugin is like the image below:

![node-red-contrib-googlehome-actions-v2 architecture](/design.png?raw=true "node-red-contrib-googlehome-actions-v2 architecture")

A controller must have a http request node at its input and http response node at its second output. Always.

A controller must have all intent nodes connected directly to itself. You must create as much intent nodes
as you have created them at dialog flow console.

Every intent node will have at leat one Ask Node. It can have more. The as node have a message property that will
define the default answer to the intent. It can be changed later.

After a Ask node comes the logic you need to answer. You can use the msg.req.params to receive parameters sent by
google home to process your answer.

After your logic you must put all answers on the msg.gh_messages. This is an array of answers that will be sent back
to google home.

The last node ist the Send Node. It will get the msg.gh_messages and finish the conversation.

Simple like that. You can use any NodeRed node to make your logic and make your messages.

Enjoy!

# Installing

npm install git+https://git@github.com/otaviojr/node-red-contrib-googlehome-actions-v2

or add to your package.json

"node-red-contrib-googlehome-actions-v2": "https://github.com/otaviojr/node-red-contrib-googlehome-actions-v2.git"

The nodes will appears at NodeRed like this:

![NodeRed Google Assistant menu](/menu.png?raw=true "NodeRed Google Assistant menu")
