import { Auth0Provider } from "@bcwdev/auth0provider";
import { homesService } from "../services/HomesService.js";
import { jobsService } from "../services/JobsService.js";
import BaseController from "../utils/BaseController.js";

export class HomesController extends BaseController {
  constructor() {
    super("/api/houses");
    this.router
      .get("", this.getHomes)
      .get("/:homeId", this.getHome)
      // YOU SHALL NOT PASS unless logged in =)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.addHome)
      .put("/:id", this.editHome)
      .delete("/:id", this.deleteHome);
  }
  async deleteHome(req, res, next) {
    try {
      const home = await homesService.deleteHome(req.body, req.userInfo);
      res.send("home listing deleted");
    } catch (error) {
      next(error);
    }
  }
  async editHome(req, res, next) {
    try {
      const home = await homesService.editHome(req.body, req.userInfo);
      res.send(home);
    } catch (error) {
      next(error);
    }
  }
  async addHome(req, res, next) {
    try {
      const homeData = req.body;
      homeData.creatorId = req.userInfo.id;
      const home = await homesService.addHome(homeData);
      res.send(home);
    } catch (error) {
      next(error);
    }
  }
  async getHomes(req, res, next) {
    try {
      const homes = await homesService.getHomes();
      res.send(homes);
    } catch (error) {
      next(error);
    }
  }

  async getHome(req, res, next) {
    try {
      const home = await homesService.getHome(req.params.homeId);
      res.send(home);
    } catch (error) {
      next(error);
    }
  }
}
