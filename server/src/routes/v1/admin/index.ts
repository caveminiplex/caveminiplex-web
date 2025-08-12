import { Router } from "express";
import { login } from "../../../controllers/admin/login.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { AUTH_ROLES } from "../../../utils/roles";
import { handleLogout } from "../../../controllers/handleLogout.controller";



const router = Router()



// POST ENDPOINTS
router.route("/login").post(login);
router.route("/logout").post(authMiddleware(AUTH_ROLES.ADMIN), handleLogout)


export default router;