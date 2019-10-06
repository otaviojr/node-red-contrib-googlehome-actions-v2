const Promise = require('promise');

module.exports = function(RED) {

    function GoogleHomeSendNode(config) {
        console.log("GoogleHomeSendNode");
        console.log(config);

        RED.nodes.createNode(this, config);

        this.name = config.name;
        this.closeConversation = config.close_conversation;
        this.closeMessage = config.close_message;

        this.on('input', msg => {
            this.debug("GoogleHomeSendNode - Input Message Received");
            this.log(msg);

            if(msg && msg.conversation !== undefined){

              msg.conversation.messages.forEach( (m, idx) => {
                msg.conversation.conv.ask(m);
              });

              if(this.closeConversation){
                msg.conversation.conv.close(this.closeMessage);
              }
            }
        });

        this.on('close', () => {
            console.debug("Closed");
        });
    }

    RED.nodes.registerType("googlehome-send", GoogleHomeSendNode);
};
