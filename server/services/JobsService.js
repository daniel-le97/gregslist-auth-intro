import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js";

class JobsService {
  
  async deleteJob(body, userInfo) {
    const job = await this.getJob(body.id);
    if (userInfo.id != job.sellerId.toString()) {
      throw new Forbidden("Thats not your job...look elsewhere");
    }
    await job.delete();
    // note this is not needed
    // return job;
  }
  async editJob(jobData, userInfo) {
    const job = await this.getJob(jobData.id);
    if (userInfo.id != job.sellerId.toString()) {
      throw new Forbidden("Thats not your job...look elsewhere");
    }
    job.jobTitle = jobData.jobTitle || job.jobTitle;
    job.company = jobData.company || job.company;
    job.rate = jobData.rate || job.rate;
    job.hours = jobData.hours || job.hours;
    job.description = jobData.description || job.description;
    await job.save();
    return job;
  }
  async addJob(formData) {
    const job = await dbContext.Jobs.create(formData);
    return job;
  }
  async getJob(jobId) {
    const job = await dbContext.Jobs.findById(jobId).populate(
      "seller",
      "name email"
    );
    if (!job) {
      throw new BadRequest("invalid Id");
    }
    return job;
  }
  async getJobs() {
    const jobs = await dbContext.Jobs.find();
    return jobs;
  }
  //
}
export const jobsService = new JobsService();
