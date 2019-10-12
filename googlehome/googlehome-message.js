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
        this.suggestions = config.suggestions;
        this.concatMessage = config.concat_message;

        this.on('input', msg => {
            this.debug("GoogleHomeMessageNode - Input Message Received");
            this.log(msg);

            const message = (msg.payload !== undefined && msg.payload.message !== undefined ?  msg.payload.message : this.message);
            const url = (msg.payload !== undefined && msg.payload.url !== undefined ? msg.payload.url : this.url);
            const permissions = (msg.payload !== undefined && msg.payload.permissions !== undefined ? msg.payload.permissions : this.permissions);
            const suggestions = (msg.payload !== undefined && msg.payload.suggestions !== undefined ? msg.payload.suggestions : this.suggestions);

            let obj = null;
            switch(this.messageType){
                case "SimpleResponse":
                    obj = {
                        type: "SimpleResponse",
                        message: message
                    };
                    break;

                case "LinkOutSuggestion":
                    obj = {
                        type: "link",
                        message: {
                            url: url
                        }
                    };
                    break;

                case "Permission":
                    if(permissions.length > 0){
                        obj = {
                            type: "permission",
                            permission: {
                                context: message,
                                permissions: permissions.split(",")
                            }
                        };
                    }
                    break;

                case "Suggestions":
                    if(suggestions.length > 0){
                        obj = {
                            type: "suggestions",
                            suggestions:  suggestions.split(",")
                        };
                    }
                    break;
            }

            if(obj !== null){
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
