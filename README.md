# node-red-contrib-googlehome-actions-v2

Node Red nodes to receive and respond to Google Action requests from Google Assistant.

It will create the webhook you need without any coding or at least with the fewest lines of code possible. :-)

Right now it is only compatible with [DialogFlow](https://dialogflow.com/) applications.

This node is a wrapper around Google's actions-on-google-nodejs client library using the [Actions SDK](https://actions-on-google.github.io/actions-on-google-nodejs/2.12.0/index.html).

It will use the **Http Request and Response Nodes** working at the same URL NodeRed is running.
Other plugins have been using Express to open another port in order to secure NodeRed. Now a days we have
enough tech to protect NodeRed. We can use nginx or apache as reverse proxy or even API gateways like Kong
to obfuscate the URL's we don't want access.

**NodeRed must be running with a public address and HTTPS in order to work with Google Home SDKs**

The default design of a flow using this plugin will be like the image below:

![node-red-contrib-googlehome-actions-v2 architecture](/design.png?raw=true "node-red-contrib-googlehome-actions-v2 architecture")

A **Controller Node** must have a **Http Request Node** at its input and **Http Response Node** at its second output. Always.

The **Http Request Node** must have been configured to receive a POST event in the same path you have configured at fulfillment section of dialog flow console.

A **Controller Node** must have all **Intent Nodes** connected directly to itself. You must create as much **Intent Nodes**
as you have created them at dialog flow console.

Every **Intent Node** will have at least one **Ask Node**. It can have more. The **Ask Node** have a message property that will
define the default answer to the intent. It can be changed later.

At **Ask Node** output comes the logic you need to answer the question. You can use the ```msg.req.params``` to get all parameters sent by
Google Home and use them to process your answer.

After your logic you must put all answers on the ```msg.gh_messages```. This is an array of answers that will be sent back
to google home by the **Send Node**.

The last node is the **Send Node**. It will get the ```msg.gh_messages``` and finish the conversation.

The ```msg.gh_messages``` is an array of messages objects. Each item has its own format depending of the type of the answers.

Below some examples:

```
[{
    "type": "SimpleResponse",
    "message": "Your Message here"
},{
    "type": "link",
    "message": {
        "url": "https://example.com"    
    }
}]
```

Simple like that. You can use any NodeRed nodes you want to make your logic and assembly your messages.

Enjoy!

# Installing

```
npm install git+https://git@github.com/otaviojr/node-red-contrib-googlehome-actions-v2
```

or add to your package.json

```
"node-red-contrib-googlehome-actions-v2": "https://github.com/otaviojr/node-red-contrib-googlehome-actions-v2.git"
```

The nodes will appears at NodeRed like this:

![NodeRed Google Assistant menu](/menu.png?raw=true "NodeRed Google Assistant menu")
