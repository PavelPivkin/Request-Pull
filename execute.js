'use strict';

const generateProcesses = require('./generateProcesses');

function promisify(process) {
    return new Promise((resolve, reject) => {
        process(resolve);
    });
}

function execute(processes, coroutinesCount) {
    let promises = processes.map((process, index) => promisify(process, index));
    let i = 0;

    while(i < coroutinesCount) {
        next();
    }

    function next() {
        promises[i++].then(result => {
            console.log(result);
            if (i < promises.length) next();
        });
    }

}

function main() {
    const PROCESSES_NUM = 3;
    const MAX_TIMEOUT = 5;
    const COROUTINES_NUM = 2;

    const processes = generateProcesses(PROCESSES_NUM, MAX_TIMEOUT);
    execute(processes, COROUTINES_NUM);
}

main();
