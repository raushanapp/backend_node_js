const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({ error: "Missing required launch property" });
  }
  launch.launchDate = new Date(launch.launchDate);

  //  if the date is valid then give date.valueOf() 12234345 like
  //   if (launch.launchDate.toString() === "Invalid Date") {
  //     return res.status(400).json({ error: "Invalid launch date" });
  //   }

  //   we can do both way but if we are using isNaN
  //  first javascript is doing  here
  //  const date= new Date(launch.launchDate)
  // isNaN(date.valueOf())  if we are not calling my self javascript do by self

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "Invalid launch date" });
  }
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  //  if launch does't exist

  const existingLaunch = await existsLaunchWithId(launchId);

  if (!existingLaunch) {
    return res.status(404).json({ error: "Launch not found" });
  }

  //  if  launch  does exists
  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({ error: "Failed to abort launch" });
  }

  return res.status(200).json({ ok: true, message: "Launch aborted" });
}
module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
