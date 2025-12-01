import { Router } from "express";
import buscarVagas from "../controllers/buscarVagas.js";

const router = Router();
router.get("/", buscarVagas);

export default router;