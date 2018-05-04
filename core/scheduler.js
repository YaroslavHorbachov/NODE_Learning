const schedule = require('node-schedule');
let ActiveRule = null;

async function startJob(rule, cb) {
    const job =  await schedule.scheduleJob(rule, cb) ;
    ActiveRule = job;
}

function cancelJob() {
    ActiveRule.cancel();
    console.log('Active Rule canceled and is null ')
}

function checkJob(){
    console.log(ActiveRule)
    return Boolean(ActiveRule);
}


module.exports = {
    startJob,
    cancelJob,
    checkJob
}

