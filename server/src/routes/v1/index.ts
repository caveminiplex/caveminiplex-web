import { Router } from "express";
import userRoutes from "./user/index"
import adminRoutes from "./user/index"


const router = Router()


router.use("/user", userRoutes);
router.use("/admin", adminRoutes);

export default router;