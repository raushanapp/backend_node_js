const { isMainThread, workerData, Worker } = require("worker_threads");

if (isMainThread) {
  console.log(`Main thread ! Process ID ${process.pid}`);
  new Worker(__filename, {
    workerData: [7, 6, 2, 3],
  });
  new Worker(__filename, {
    workerData: [1, 4, 5, 8],
  });
} else {
  console.log(`Worker ! Process ID ${process.pid}`);
  //  [7,6,2,3].sort()
  console.log(`${workerData} sorted is ${workerData.sort()}`);
}
