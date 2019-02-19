'use strict';

function generateProcesses(N = 0, timeout = 3) {
  const processes = [];
  for (let i = 0; i < N; i++) {
    const randomTimeout = Math.round(Math.random() * timeout * 1000);
    processes.push((resolve) => setTimeout(
        () => { resolve(`${i+1} process with timeout=${randomTimeout}ms done`) /*smth useful*/ },
        // timeout in sec
        randomTimeout
    ))
  }
  return processes;
}

module.exports = generateProcesses;
