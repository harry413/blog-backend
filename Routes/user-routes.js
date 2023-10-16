import  express  from "express";
import { getAllUser, signup, signin } from "../Controllers/user-controller.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/signin", signin);


export default router; 