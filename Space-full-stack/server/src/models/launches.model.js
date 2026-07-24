const axios = require("axios");
const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

// const launches = new Map();

const DEAULT_FLIGHTNUMBER = 100;

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

async function loadLaunchData() {
  try {
    const response = await axios.post(SPACEX_API_URL, {
      query: {},
      options: {
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

      console.log(launch, "=====");
      await saveLaunch(launch);
    }
  } catch (error) {
    console.error("Error loading launch data:", error);
  }
}

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
  loadLaunchData,
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
