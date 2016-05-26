

module.exports = Configuration;

function Configuration() {
    this.Web = new Configuration.Web()
    this.WebSocket = new Configuration.WebSocket();   
}

Configuration.Web = function() {
    this.port=3031;
    this.host="0.0.0.0";
    this.encoding='UTF-8';
    this.docfile = "data/report.xml";
    this.stylesheet = "data/buildcompletedevent.xsl";
    return this;
}

Configuration.WebSocket = function() {}
