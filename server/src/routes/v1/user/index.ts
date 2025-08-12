import { Router } from "express";
import { searchMovie } from "../../../controllers/user/movie.controller";
import { login } from "../../../controllers/user/login.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { AUTH_ROLES } from "../../../utils/roles";
import { handleLogout } from "../../../controllers/handleLogout.controller";
import { signup } from "../../../controllers/user/signup.controller";

const router = Router();


// GET ENDPOINTS
router.route("/movie/search").get(searchMovie);


// POST ENDPOINTS
router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").post(authMiddleware(AUTH_ROLES.USER), handleLogout)

export default router;
