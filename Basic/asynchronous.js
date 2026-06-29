setTimeout(() => console.log("finished"), 1000);
console.log("started");

//  Event Loop
//  example how handle event loop and this loop is run while the program is runing
while (!shouldExit) {
  processEvents();
}
