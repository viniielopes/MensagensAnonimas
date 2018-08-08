"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const next = require("next");
const sockIO = require("socket.io");
const app = express();
const httpServer = http.createServer(app);
const io = sockIO(httpServer);
const porta = process.env.PORT || 3000;
// const porta = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextAPP = next({ dev, dir: "./dist" });
const nextHandler = nextAPP.getRequestHandler();
io.on("connect", (client) => {
    // tslint:disable-next-line:no-console
    console.log("CONECTOU PATRÃO");
    // tslint:disable-next-line:no-console
    client.on("enviaMSG", (msg) => io.emit("recebeMSG", msg));
    client.on("fezJogada", (jogada, vezJogador) => client.broadcast.emit("fezJogada", jogada, vezJogador));
    client.on("disconnect", () => {
        // tslint:disable-next-line:no-console
        console.log("DISCONECTOU");
    });
});
nextAPP.prepare().then(() => {
    app.get("/", (req, res) => {
        nextAPP.render(req, res, "/index");
    });
    app.get("/mensagens", (req, res) => {
        nextAPP.render(req, res, "/mensagens");
    });
    app.get("*", (req, res) => {
        return nextHandler(req, res);
    });
    httpServer.listen(porta, (err) => {
        if (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
            return;
        }
        // tslint:disable-next-line:no-console
        console.log(`SERVIDOR INICIOU NA PORTA: ${porta}`);
    });
});
//# sourceMappingURL=../server/dist/server.js.map