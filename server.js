let port = process.env.PORT || 1337;
const express = require('express');

const app = express();

app.use(express.static(__dirname + "/app"));

app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.use((req, res) => res.sendFile(`${__dirname}/app/index.html`));

app.listen(port, () => {
    console.info('listening on %d', port);
});
