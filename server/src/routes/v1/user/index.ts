import { Router } from "express";
import { fetchAddedMovies, searchMovie } from "../../../controllers/common/movie.controller";
import { login } from "../../../controllers/user/login.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { AUTH_ROLES } from "../../../utils/roles";
import { handleLogout } from "../../../controllers/handleLogout.controller";
import { signup } from "../../../controllers/user/signup.controller";
import { bookTicket } from "../../../controllers/user/ticket.controller";
import { fetchAvailableSlots } from "../../../controllers/user/slots.controller";

const router = Router();

// GET ENDPOINTS
router.route("/movie/search").get(searchMovie);
router.route("/movies").get(fetchAddedMovies)
router.route("/slots").get(fetchAvailableSlots);

// POST ENDPOINTS
router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").post(authMiddleware(AUTH_ROLES.USER), handleLogout);

router.route("/book").post(bookTicket);

export default router;
