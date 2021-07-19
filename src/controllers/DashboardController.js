const Job = require('../model/Job');
const JobUtils = require('../utils/jobUtils');
const Profile = require('../model/Profile');

module.exports = {
  index(req, res) {

    const jobs = Job.get();
    const profiles = Profile.get();
    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    };

    // total de horas por dia de cada Job em progresso
    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {

      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? 'done' : 'progress';

      // status = done ou status = progress
      // Somando a quantidade de status
      statusCount[status] += 1;

      jobTotalHours = status === 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours
      // if(status === 'progress'){
      //   jobTotalHours += Number(job["daily-hours"])
      // }
      

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profiles["value-hour"])
      }
    })

    
    const freeHours = profiles["hours-per-day"] - jobTotalHours;

    return res.render("index", {
      jobs: updatedJobs,
      profile: profiles,
      statusCount: statusCount,
      freeHours: freeHours
    }
    );
  }
}