/// <reference lib="webworker" />
// Import angular serviceworker
importScripts("ngsw-worker.js");

// custom code
addEventListener("message", (data) => {
    console.log(data + " ts worker");
});

