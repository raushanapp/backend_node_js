// const launches = require("./launches.mongo");

const launches = new Map();

let lastestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "kepler Exploration name",
  rocket: "Explorer IS1",
  launchDate: new Date("December 17,2030"),
  target: "Kepler-442 b",
  customers: ["NASA", "SpaceX", "ISRO"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  lastestFlightNumber++;
  launches.set(
    lastestFlightNumber,
    Object.assign(launch, {
      upcoming: true,
      success: true,
      customer: ["Zero to Mastery ", "ISRO"],
      flightNumber: lastestFlightNumber,
    }),
  );
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};
