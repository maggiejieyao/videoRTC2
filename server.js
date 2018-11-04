let port = process.env.PORT || 1337;
const express = require('express');

const app = express();

// Set app folder as root
app.use(express.static(__dirname + "/app"));

// Provide access to node_modules folder from the client-side
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/app/index.html`));

app.listen(port, () => {
    console.info('listening on %d', port);
});
