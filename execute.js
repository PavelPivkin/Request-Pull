'use strict';

const generateProcesses = require('./generateProcesses');

function promisify(process) {
    return new Promise((resolve, reject) => {
        process(resolve);
    });
}

function execute(processes, coroutinesCount) {
    let i = 0;

    while(i < coroutinesCount) {
        next(i);
    }

    function next(coroutineIndex = 0, time = 0) {
        promisify(processes[i++]).then(result => {
            console.log(`${result} in coroutine ${coroutineIndex}`);
            if (i < processes.length) next(coroutineIndex);
        });
    }

}

function main() {
    const PROCESSES_NUM = 10;
    const MAX_TIMEOUT = 5;
    const COROUTINES_NUM = 2;

    const processes = generateProcesses(PROCESSES_NUM, MAX_TIMEOUT);
    execute(processes, COROUTINES_NUM);
}

main();
