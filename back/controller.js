import UserService from "./service/user-service.js"
import ShowService from './service/show-service.js';


export default new class AppController{
  async registration(req, res){ 
    try {
      const {username, password} = req.body;
      return await UserService.registration(username, password, res);
    } catch (e) {
      console.log(e);
      return res.json({status:'failed', message: 'error', description: 'Not successful, unknown error'});
    }
  }

  async login(req, res){ 
    try {
      const {username, password} = req.body;
      console.log(username);
      return await UserService.login(username, password, res);
    } catch (e) {
      console.log(e);
      return res.json({status:'failed', message: 'error', description: 'Not successful, unknown error'});
    }
  }

  async getAllShows(req, res) {
    const shows = await ShowService.getAllShows();
    res.json(shows);
  }

  async getShow(req, res) {
    const show = await ShowService.getShowById(req.params.id);
    res.json(show);
  }

  async createShow(req, res) {
    console.log(req.body);
    const newShow = await ShowService.createShow(req.body);
    res.json(newShow);
  }

  async updateShow(req, res) {
    const updatedShow = await ShowService.updateShow(req.params.id, req.body);
    res.json(updatedShow);
  }

  async deleteShow(req, res) {
    await ShowService.deleteShow(req.params.id);
    res.json({ message: 'Show deleted successfully' });
  }



}