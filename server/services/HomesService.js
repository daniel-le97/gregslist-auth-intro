import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js";
import { jobsService } from "./JobsService.js";

class HomesService {
  async deleteHome(body, userInfo) {
    const home = await this.getHome(body.id);
    if (userInfo.id != home.creatorId.toString()) {
      throw new Forbidden("Thats not your home...Swiper no swiping");
    }
    await home.delete();
  }
  async editHome(body, userInfo) {
    const home = await this.getHome(body.id);
    if (userInfo.id != home.creatorId.toString()) {
      throw new Forbidden("Thats not your home...swiper no swiping!");
    }
    home.bedrooms = body.bedrooms || home.bedrooms;
    home.bathrooms = body.bathrooms || home.bathrooms;
    home.levels = body.levels || home.levels;
    home.price = body.price || home.price;
    home.imgUrl = body.imgUrl || home.imgUrl;
    home.year = body.year || home.year;
    home.description = body.description || home.description;

    await home.save();
    return home;
  }
  async addHome(homeData) {
    const home = await dbContext.Homes.create(homeData);
    return home;
  }
  async getHome(homeId) {
    const home = await (
      await dbContext.Homes.findById(homeId)
    ).populate("creator", "name picture");
    if (!home) {
      throw new BadRequest("invalid id");
    }
    return home;
  }
  async getHomes() {
    const homes = await dbContext.Homes.find();
    return homes;
  }
  //
}
export const homesService = new HomesService();
