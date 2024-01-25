const app = require('./app');
const { server } = require('./src/config/environment.variables.config');

const port = server.port;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})