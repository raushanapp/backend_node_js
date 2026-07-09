const express = require("express");
// const cluster = require("cluster");
// const os = require("os");

// this for the windows operating system and the other operating  systems handling automatically

// cluster.schedulingPolicy = cluster.SCHED_RR;

const app = express();

const PORT = process.env.PORT || 3000;

function delay(durations) {
  const startTime = Date.now();
  while (Date.now() - startTime < durations) {
    //  event loop is blocked
  }
}

app.get("/", (req, res) => {
  // JSON.stringify({})=> "{}",  this take in javascript object and return the string representation
  // JSON.parse("{}")=>{} this take a string and return the javascript object
  // [5,4,1,2,3,4].sort()
  //  this fucntion do not take  to much time only take few milliseconds
  return res.send(`Performance example ${process.pid}`);
});

app.get("/timer", (req, res) => {
  //  delay the response
  delay(5000);
  return res.send(`Beep beep beep! ${process.pid}`);
});

//  if we install pm2 tool then we don't have these code implemented and
// pm2 automatic handle these things

// console.log("Running server .js.....");
// if (cluster.isPrimary) {
//   console.log("Master has been started.....");
//   const NUM_WORKERS = os.cpus().length;
//   for (let i = 0; i < NUM_WORKERS; i++) {
//     cluster.fork();
//   }
// } else {
//   console.log(`Worker has been started with PID: ${process.pid}`);

//   app.listen(PORT);
// }

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
