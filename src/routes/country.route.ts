import { Router } from "express";
import { CountryController } from "../controllers";

const router = Router();

router.get("/countries", CountryController.getCountries);

export default router;
