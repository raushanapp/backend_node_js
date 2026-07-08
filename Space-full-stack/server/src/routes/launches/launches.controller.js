const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
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
  addNewLaunch(launch);
  return res.status(201).json(launch);
}
module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
