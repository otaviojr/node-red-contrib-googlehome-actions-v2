# node-red-contrib-googlehome-actions-v2

Node Red nodes to receive and respond to Google Action requests from Google Assistant.

It will create the webhooks you need without any coding or at least with the fewest lines of code possible. :-)

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

A **Controller Node** must have all **Intent Nodes** connected directly to itself. At its first output, always. You must create as much **Intent Nodes**
as you have created at dialog flow console.

Every **Intent Node** will have at least one **Ask Node**. It can have more. The **Ask Node** have a message property that will
define the default answer to the intent. It can be changed later.

At **Ask Node** output comes the logic you need to answer the question. You can use the ```msg.req.params``` to get all parameters sent by Google Home and use them to process your answer. You can get access to the conv object
at any time using the ```msg.res.conv``` property. So, if you want to know if a user is verified you can check the
```msg.res.conv.user.verification``` property.

After your logic you must put all answers on the ```msg.gh_messages```. This is an array of answers that will be sent back
to google home by the **Send Node**.

The last node is the **Send Node**. It will get the ```msg.gh_messages``` and finish the conversation.

The ```msg.gh_messages``` is an array of messages objects. Each item has its own format depending of the type of the answer.

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
},{
    "type": "permission",
    "permission": {
        "context": "I need to know your name.",
        "permissions": ["NAME"]
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

# Advanced

Here we have a flow asking for user permission so we can have access to his name.
We use output context to know to which timeline goes back after permission.

![permission flow](/permission.png?raw=true "permission flow")

First we can check if we have or not the name using a **Switch Node**

![check name](/check_name.png?raw=true "Check Name")

If we don't we can use a **Template Node** to request permissions

![request permission](/request_permission.png?raw=true "Request Permission")

At DialogFlow console you have to create an intent to the permission event. Than,
at nodered, you have to create the same intent. This intent will be used when the
permission has been granted or denied.

At this permission intent you can use a **Switch Node** to check if the name permission
has been granted or not.

![permission status](/permission_status.png?raw=true "Permission Status")

If user granted it, you can check context to know to which timeline send this request.
At permission event on DialogFlow console you must set an output context. This context
will be at input context at NodeRed.

![context](/context.png?raw=true "Context")

Now you can just connect the output from this switch to the first one we created.
The name will be there and you can just say the name using a **Template Node**

![say](/say.png?raw=true "Say")

That is it... a more complex scenario... no coding... at all!
