const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "kepler Exploration name",
  rocket: "Explorer",
  launchDate: new Date("December 17,2030"),
  destination: "Kepler-442 b",
  customer: ["NASA", "SpaceX", "ISRO"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

module.exports = {
  getAllLaunches,
};
