const express = require('express');
const RED = require("node-red");
const http = require('http');
    
const app = express();
const server = http.createServer(app);
    
const settings = {
httpAdminRoot:"/red",
httpNodeRoot: "/api",
    userDir:".",
    flowFile: 'flows.json',
    functionGlobalContext: {
    },

    adminAuth: {
    type: "credentials",
    users: [{
        username: "WasteLog",
        password: "$2a$12$xTEa1UAwLt3sCL5KjpW2BejnFAJNNt/doi4/gdzw33ZKmR6owXfte",
        permissions: "*"
    }]
}
};

RED.init(server,settings);

app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

RED.start();

app.get('/test', (req, res) => {
    res.json({ message: 'Hello from my custom API!' });
});

module.exports = app;
