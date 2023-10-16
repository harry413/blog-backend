import  express  from "express";
import { getAllUser, signup, signin, deleteUser, updateUser } from "../Controllers/user-controller.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.put("/update/:id" , updateUser);
router.delete("/delete/:id", deleteUser);


export default router; 