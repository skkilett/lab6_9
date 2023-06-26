import ShowService from './service/show-service.js';


export default new class AppController{


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