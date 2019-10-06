const Promise = require('promise');
const {
  dialogflow,
  actionssdk,
  Image,
  Table,
  Carousel,
} = require('actions-on-google');

module.exports = function(RED) {

    function GoogleHomeControllerNode(config) {

        RED.nodes.createNode(this, config);
        let flowContext = this.context().flow;

        console.log("GoogleHomeControllerNode");
        console.log(config);

        this.app = dialogflow();
        flowContext.set("app");

        this.on('input', msg => {
            console.debug("GoogleHomeControllerNode - Input Message Received");
            console.log(msg);

            if(msg && msg.req && msg.res){
              this.app(msg.req, msg.res);
            }
        });

        this.on('close', () => {
            console.debug("Closed");
        });

    }

    RED.nodes.registerType("googlehome-controller", GoogleHomeControllerNode);
};
