import Router from "express";
import AppController from "./controller.js";
import authMiddleware from "./middlewares/auth-middleware.js";

const router = new Router();

router.post("/registration", async (req, res) => {
  await AppController.registration(req, res);
});

router.post("/token", async (req, res) => {
  await AppController.login(req, res);
});

router.get('/', AppController.getAllShows);
router.get('/:id', AppController.getShow);
router.post('/', AppController.createShow);
router.put('/:id', AppController.updateShow);
router.delete('/:id', AppController.deleteShow);

export default router;
