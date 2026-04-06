const { randomUUID } = require('crypto');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = Number(process.env.PORT || 3000);

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
    const isCreateProjeto = req.method === 'POST' && req.path === '/projetos';
    const isCreateTarefa = req.method === 'POST' && req.path === '/tarefas';

    if ((isCreateProjeto || isCreateTarefa) && !req.body.id) {
        req.body.id = randomUUID();
    }

    next();
});

server.use(router);

server.listen(port, () => {
    console.log(`JSON Server com UUID iniciado em http://localhost:${port}`);
});
