import Show from '../models/show-model.js';

export default new class ShowService {


  async getAllShows() {
    return Show.findAll();
  }

  async getShowById(id) {
    return Show.findByPk(id);
  }

  async createShow(showData) {
    return Show.create(showData);
  }

  async updateShow(id, showData) {
    await Show.update(showData, { where: { id: id } });
    return Show.findByPk(id);
  }

  async deleteShow(id) {
    return Show.destroy({ where: { id: id } });
  }
}
