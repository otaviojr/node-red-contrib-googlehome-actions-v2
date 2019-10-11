const Promise = require('promise');

const {
  dialogflow,
  actionssdk,
  Image,
  Table,
  Carousel,
  LinkOutSuggestion,
  HtmlResponse,
  OpenUrlAction,
  BrowseCarousel,
  Permission
} = require('actions-on-google');

module.exports = function(RED) {

    function GoogleHomeMessageNode(config) {
        console.log("GoogleHomeMessageNode");
        console.log(config);

        RED.nodes.createNode(this, config);

        this.name = config.name;
        this.messageType = config.message_type;
        this.message = config.message;
        this.permissions = config.permissions;
        this.url = config.url;
        this.concatMessage = config.concat_message;

        this.on('input', msg => {
            this.debug("GoogleHomeMessageNode - Input Message Received");
            this.log(msg);

            let obj = null;
            switch(this.messageType){
                case "SimpleResponse":
                    obj = {
                        type: "SimpleResponse",
                        Message: this.message
                    };
                    break;

                case "LinkOutSuggestion":
                    obj = {
                        type: "link",
                        message: {
                            url: this.url
                        }
                    };
                    break;

                case "Permission":
                    if(this.permissions.length > 0){
                        obj = {
                            type: "permission",
                            permission: {
                                context: this.message,
                                permissions: this.permissions.split(",")
                            }
                        };
                    }
                    break;
            }

            if(obj != null){
                if(this.concatMessage){
                    if(Array.isArray(msg.gh_messages)){
                        msg.gh_messages.push(obj);
                    }
                } else {
                    msg.gh_messages = [obj];
                }
            }
            this.send(msg);
        });

        this.on('close', () => {
            console.debug("Closed");
        });
    }

    RED.nodes.registerType("googlehome-message", GoogleHomeMessageNode);
};
