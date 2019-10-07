const Promise = require('promise');

module.exports = function(RED) {

    function GoogleHomeAskNode(config) {
        console.log("GoogleHomeAskNode");
        console.log(config);

        RED.nodes.createNode(this, config);

        this.name = config.name;
        this.message = config.message;

        this.on('input', msg => {
            this.debug("GoogleHomeIntentNode - Input Message Received");
            this.log(msg);

            if(msg && msg.topic !== undefined){
              switch(msg.topic){
                case "googlehome-intent":
                  let intent = msg.payload;
                  intent.registerAsk( (conv, params, resolv, reject) => {
                    this.send({
                      topic: "conversation",
                      res: {
                        conv: conv,
                        resolv: resolv,
                        reject: reject,
                        params: params
                      },
                      gh_messages: [this.message]
                    },false);
                  });
                  break;

                case "ask":
                  this.ask = msg.payload;
                  break;
              }
            }
        });

        this.on('close', () => {
            console.debug("Closed");
        });
    }

    RED.nodes.registerType("googlehome-ask", GoogleHomeAskNode);
};
