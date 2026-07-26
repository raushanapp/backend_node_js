const axios = require("axios");
const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEAULT_FLIGHTNUMBER = 100;
// const launches = new Map();
// const launch = {
//   flightNumber: 100, // flight_number
//   mission: "kepler Exploration name", // name
//   rocket: "Explorer IS1", exist in the api response rocket.name
//   launchDate: new Date("December 17,2030"),  // date_local
//   target: "Kepler-442 b",   //  not applicable
//   customers: ["NASA", "SpaceX", "ISRO"], // payload.customers for each payload
//   upcoming: true, // upcoming
//   success: true, // success
// };
// launches.set(launch.flightNumber, launch);

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunches() {
  try {
    const response = await axios.post(SPACEX_API_URL, {
      query: {},
      options: {
        pagination: false, //  it's mean we are getting all data at once
        populate: [
          {
            path: "rocket",
            select: {
              name: 1,
            },
          },
          {
            path: "payloads",
            select: {
              customers: 1,
            },
          },
        ],
      },
    });

    if (response.status !== 200) {
      console.log("Problem downloading launch data");
      throw new Error("Launch data download failed");
    }
    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
      const payloads = launchDoc["payloads"];
      const customers = payloads.flatMap((payload) => payload["customers"]);

      const launch = {
        flightNumber: launchDoc["flight_number"],
        mission: launchDoc["name"],
        rocket: launchDoc["rocket"]["name"],
        launchDate: new Date(launchDoc["date_local"]),
        // target: launchDoc["payloads"][0].customers[0], // Assuming the first customer is the target
        customers: customers,
        upcoming: launchDoc["upcoming"],
        success: launchDoc["success"],
      };
      await saveLaunch(launch);
    }
  } catch (error) {
    console.error("Error loading launch data:", error);
  }
}

async function loadLaunchData() {
  try {
    const firstLaunch = await findLaunch({
      flightNumber: 1,
      rocket: "Falcon 9",
      mission: "FalconSat",
    });

    if (firstLaunch) {
      console.log("Launch data already loaded!");
    } else {
      await populateLaunches();
    }
  } catch (error) {
    console.error("Error loading launch data:", error);
  }
}

async function findLaunch(filter) {
  return await launches.findOne(filter);
}

async function existsLaunchWithId(launchId) {
  return await findLaunch({ flightNumber: launchId });
}

async function getLatestFlightNumer() {
  const latestLaunch = await launches.findOne().sort("-flightNumber");
  return latestLaunch ? latestLaunch.flightNumber : DEAULT_FLIGHTNUMBER;
}

async function getAllLaunches({ skip, limit }) {
  return await launches
    .find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

// save  the new launches data
async function saveLaunch(launch) {
  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true },
  );
}

async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });
  if (!planet) {
    throw new Error(`Planet ${launch.target} not found`);
  }

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
  loadLaunchData,
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
