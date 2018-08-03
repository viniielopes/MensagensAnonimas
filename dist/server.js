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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2VydmVyL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQyw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBQzdCLG9DQUFvQztBQUVwQyxNQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUN0QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUU5QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFDdkMsMENBQTBDO0FBQzFDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVksQ0FBQztBQUVsRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDN0MsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFFaEQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUMxQixzQ0FBc0M7SUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRS9CLHNDQUFzQztJQUN0QyxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUUxRCxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7UUFDM0Isc0NBQXNDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO0lBQzFCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3hCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ2pDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3hCLE9BQU8sV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDL0IsSUFBSSxHQUFHLEVBQUU7WUFDUCxzQ0FBc0M7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixPQUFPO1NBQ1I7UUFDRCxzQ0FBc0M7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgKiBhcyBodHRwIGZyb20gXCJodHRwXCI7XHJcbmltcG9ydCAqIGFzIG5leHQgZnJvbSBcIm5leHRcIjtcclxuaW1wb3J0ICogYXMgc29ja0lPIGZyb20gXCJzb2NrZXQuaW9cIjtcclxuXHJcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcclxuY29uc3QgaHR0cFNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XHJcbmNvbnN0IGlvID0gc29ja0lPKGh0dHBTZXJ2ZXIpO1xyXG5cclxuY29uc3QgcG9ydGEgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XHJcbi8vIGNvbnN0IHBvcnRhID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwO1xyXG5jb25zdCBkZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCI7XHJcblxyXG5jb25zdCBuZXh0QVBQID0gbmV4dCh7IGRldiwgZGlyOiBcIi4vZGlzdFwiIH0pO1xyXG5jb25zdCBuZXh0SGFuZGxlciA9IG5leHRBUFAuZ2V0UmVxdWVzdEhhbmRsZXIoKTtcclxuXHJcbmlvLm9uKFwiY29ubmVjdFwiLCAoY2xpZW50KSA9PiB7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcclxuICBjb25zb2xlLmxvZyhcIkNPTkVDVE9VIFBBVFLDg09cIik7XHJcblxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXHJcbiAgY2xpZW50Lm9uKFwiZW52aWFNU0dcIiwgKG1zZykgPT4gaW8uZW1pdChcInJlY2ViZU1TR1wiLCBtc2cpKTtcclxuXHJcbiAgY2xpZW50Lm9uKFwiZGlzY29ubmVjdFwiLCAoKSA9PiB7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxyXG4gICAgY29uc29sZS5sb2coXCJESVNDT05FQ1RPVVwiKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5uZXh0QVBQLnByZXBhcmUoKS50aGVuKCgpID0+IHtcclxuICBhcHAuZ2V0KFwiL1wiLCAocmVxLCByZXMpID0+IHtcclxuICAgIG5leHRBUFAucmVuZGVyKHJlcSwgcmVzLCBcIi9pbmRleFwiKTtcclxuICB9KTtcclxuXHJcbiAgYXBwLmdldChcIi9tZW5zYWdlbnNcIiwgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBuZXh0QVBQLnJlbmRlcihyZXEsIHJlcywgXCIvbWVuc2FnZW5zXCIpO1xyXG4gIH0pO1xyXG5cclxuICBhcHAuZ2V0KFwiKlwiLCAocmVxLCByZXMpID0+IHtcclxuICAgIHJldHVybiBuZXh0SGFuZGxlcihyZXEsIHJlcyk7XHJcbiAgfSk7XHJcblxyXG4gIGh0dHBTZXJ2ZXIubGlzdGVuKHBvcnRhLCAoZXJyKSA9PiB7XHJcbiAgICBpZiAoZXJyKSB7XHJcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXHJcbiAgICBjb25zb2xlLmxvZyhgU0VSVklET1IgSU5JQ0lPVSBOQSBQT1JUQTogJHtwb3J0YX1gKTtcclxuICB9KTtcclxufSk7XHJcbiJdfQ==