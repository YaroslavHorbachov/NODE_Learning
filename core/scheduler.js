const schedule = require('node-schedule');

let ActiveRule;
class Scheduler {
    constructor() {
        this.startJob = this.startJob.bind(this);
        this.cancelJob = this.cancelJob.bind(this);
        this.checkJob = this.checkJob.bind(this);
        this.setDayOfWeek = this.setDayOfWeek.bind(this);
    }

    async startJob(rule, cb) {
        ActiveRule = await schedule.scheduleJob(rule, cb);
    };

    cancelJob ()  {
        ActiveRule.cancel();
        console.log('Active Rule canceled and is null ')
    };

    checkJob() {
        console.log(ActiveRule);
        return Boolean(ActiveRule);
    };

    setDayOfWeek(date) {
        return `0 0 ${date.getDay()} * *`
    }
}

/*module.exports = {
    startJob,
    cancelJob,
    checkJob,
    setDayOfWeek
}*/
module.exports = {
    Scheduler
};

