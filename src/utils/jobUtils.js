module.exports = {
  remainingDays(job) {
    //Calculo de tempo restante
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

    const createdDate = new Date(job.created_at);
    const dueDay = createdDate.getDate() + Number(remainingDays);
    const dueDateInMs = createdDate.setDate(dueDay);
    const timediffInMs = dueDateInMs - Date.now();
    // Transformar milisegundos em dias
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = (timediffInMs / dayInMs).toFixed();
    // Restam x dias
    return dayDiff
  },
  calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}