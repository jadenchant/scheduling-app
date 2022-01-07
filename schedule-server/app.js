var express = require("express");
const { Pool } = require("pg");

var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Get events by uid
app.get("/events/:uid", (request, response) => {
  let uid = request.params.uid;
  console.log(`Got request for events uid: ${uid}`);
  pool
    .query(
      "SELECT eid, activity, descript, location, date, stime, duration FROM event WHERE ($1) = muid ORDER BY date",
      [uid]
    )
    .then((res) => {
      let arr = [];
      console.log("DB response: ");
      res.rows.forEach((val) => {
        console.log(val);
        arr.push(val);
      });
      response.send({ events: arr });
    })
    .catch((err) =>
      setImmediate(() => {
        throw err;
      })
    );
});

// Post event
app.post("/events/new", (request, response) => {
  let uid = request.body.uid;
  let date = request.body.date;
  let stime = request.body.stime;
  let activity = request.body.activity;
  let descript = request.body.description;
  let location = request.body.location;
  let duration = request.body.duration;
  console.log(`Got request to add event to uid: ${uid}`);
  pool
    .query(
      "INSERT INTO event (muid, puid, activity, descript, location, date, stime, duration) VALUES ($1, (SELECT uid FROM users WHERE cid = (SELECT cid FROM users WHERE uid = $1) AND uid != $1), $2, $3, $4, $5, $6, $7)",
      [uid, activity, descript, location, date, stime, duration]
    )
    .then((res) => {
      console.log("DB response: " + res.rows[0]);
      response.status(200);
    })
    .catch((err) =>
      setImmediate(() => {
        throw err;
      })
    );
});

app.delete("/events/delete/:eid", (request, response) => {
  let eid = request.params.eid;
  console.log(`Got request to delete events uid: ${eid}`);
  pool
    .query(
      "DELETE FROM event WHERE eid = ($1)",
      [eid]
    )
    .then((res) => {
      console.log("DB response: " + res.rows[0]);
      response.status(200);
    })
    .catch((err) =>
      setImmediate(() => {
        throw err;
      })
    );
});

// catch 404 and forward to error handler
app.use(function (request, response, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, request, response, next) {
  // set locals, only providing error in development
  response.locals.message = err.message;
  response.locals.error = request.app.get("env") === "development" ? err : {};

  // render the error page
  response.status(err.status || 500);
});

console.log(`Starting schedule-server app`);

// database connection parameters
const lib = require("./mcalib");
const username = require("./username");

const dbHost = "anansi.stolaf.edu";
const user = username.id();
const password = lib.getPGPassword(dbHost); // uncomment for Windows
const dbName = "mca_f21";
const schema = "mca_f21_sched";

const pool = new Pool({
  user: user,
  password: password, // uncomment for Windows
  host: dbHost,
  database: dbName,
  port: 5432,
});

pool.on("connect", (client) => {
  client.query(`SET search_path = ${schema}, public;`);
  console.log("Connected to " + schema);
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

console.log(`Connected to database ${dbName} on ${dbHost}`);

console.log("IP addresses:  ", lib.getIPAddresses());

module.exports = app;
