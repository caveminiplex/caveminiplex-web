import { Router } from "express";
import { login } from "../../../controllers/admin/login.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { AUTH_ROLES } from "../../../utils/roles";
import { handleLogout } from "../../../controllers/handleLogout.controller";
import { addBooking, fetchBookings } from "../../../controllers/admin/bookings.controller";
import { fetchUsers } from "../../../controllers/admin/users.controller";
import { addSnack, fetchAddedSnacks } from "../../../controllers/admin/snacks.controller";
import { fetchAddedMovies } from "../../../controllers/common/movie.controller";
import { addMovie, removeMovie } from "../../../controllers/admin/addMovie.controller";


const router = Router()



// POST ENDPOINTS
router.route("/login").post(login);
router.route("/logout").post(authMiddleware(AUTH_ROLES.ADMIN), handleLogout)

router.route("/add/movie").post(addMovie)
router.route("/add/snack").post(addSnack)
router.route("/add/booking").post(addBooking)
router.route("/remove/movie").post(removeMovie)

// GET ENDPOINTS
router.route("/bookings").get(fetchBookings)
router.route("/users").get(fetchUsers)
router.route("/snacks").get(fetchAddedSnacks)
router.route("/movies").get(fetchAddedMovies)



export default router;