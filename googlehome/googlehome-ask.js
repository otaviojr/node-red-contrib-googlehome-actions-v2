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
                  intent.registerAsk( (conv, params) => {
                    return new Promise( (resolv, reject) => {
                      this.send({
                        topic: "conversation",
                        req: {
                            params: params
                        },
                        res: {
                          conv: conv,
                          resolv: resolv,
                          reject: reject
                        },
                        gh_messages: [{
                            type: "SimpleResponse",
                            message: this.message}]
                      },false);
                    });
                  });
                  break;

                case "message":
                  this.message = msg.payload;
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
