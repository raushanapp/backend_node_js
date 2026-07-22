const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

// const launches = new Map();

const DEAULT_FLIGHTNUMBER = 100;

// const launch = {
//   flightNumber: 100,
//   mission: "kepler Exploration name",
//   rocket: "Explorer IS1",
//   launchDate: new Date("December 17,2030"),
//   target: "Kepler-442 b",
//   customers: ["NASA", "SpaceX", "ISRO"],
//   upcoming: true,
//   success: true,
// };

// launches.set(launch.flightNumber, launch);

async function existsLaunchWithId(launchId) {
  return await launches.findOne({ flightNumber: launchId });
}

async function getLatestFlightNumer() {
  const latestLaunch = await launches.findOne().sort("-flightNumber");
  return latestLaunch ? latestLaunch.flightNumber : DEAULT_FLIGHTNUMBER;
}

async function getAllLaunches() {
  return await launches.find({}, { _id: 0, __v: 0 });
}

// save  the new launches data

async function saveLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });
  if (!planet) {
    throw new Error(`Planet ${launch.target} not found`);
  }
  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true },
  );
}

// function addNewLaunch(launch) {
//   lastestFlightNumber++;
//   launches.set(
//     lastestFlightNumber,
//     Object.assign(launch, {
//       upcoming: true,
//       success: true,
//       customer: ["Zero to Mastery ", "ISRO"],
//       flightNumber: lastestFlightNumber,
//     }),
//   );
// }

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumer()) + 1;
  const newLaunch = Object.assign(launch, {
    upcoming: true,
    success: true,
    customers: ["Zero to Mastery ", "ISRO", "NASA"],
    flightNumber: newFlightNumber,
  });
  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launches.updateOne(
    { flightNumber: launchId },
    { upcoming: false, success: false },
  );
  return aborted.modifiedCount === 1;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
