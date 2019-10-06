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

        console.log("GoogleHomeControllerNode");
        console.log(config);

        this.app = dialogflow();

        this.getApp = () => {
          return this.app;
        };

        this.on('nodes-started', msg => {
          this.send({
            topic: "googlehome-controller",
            payload: this
          }, false);
        });

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
