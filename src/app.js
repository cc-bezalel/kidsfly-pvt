import express from "express";
import setGeneraliddleware from "./middleware/generalMiddleware";
import errorHandler from "./middleware/errorHandler";
import verifyToken from "./middleware/verifyToken";
import * as user from "./controllers/user";
import * as trip from "./controllers/trip";
import * as login from "./controllers/login";
import path from "path";

const server = express();
setGeneraliddleware(server);

server.use(express.static(path.resolve(path.join(__dirname, "../public"))));
server.get("/", (__, res) => res.sendFile("index.html"));

//login
server.route("/login").post(login.login);

server
  .route("/users")
  .get(verifyToken, user.getAllUsers)
  .post(user.post);

//Auth required beyond this line
server.use(verifyToken);

server
  .route("/trips")
  .get(trip.get)
  .post(trip.post);

server
  .route("/users/:id")
  .get(verifyToken, user.get)
  .put(user.put)
  .delete(user.deleteU);

server
  .route("/trips/:id")
  .get(trip.get)
  .put(trip.put)
  .delete(trip.deleteT);

  server.use('*', (req, res) =>
  res.status(404).json({
    status: 404,
    message: 'No endpoint matches that URL.'
  })
);

// server.use(errorHandler);

export default server;
