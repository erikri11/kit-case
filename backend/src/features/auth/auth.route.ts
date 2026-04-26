import { Router } from "express";
import { googleSignup } from "./auth.controller";

const router = Router();

router.post("/google/signup", googleSignup);

export default router;
