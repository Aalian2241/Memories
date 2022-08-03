import  express  from "express";
import { HomePage} from "../controllers/home.js";

const router = express.Router();

router.get('', HomePage);

export default router;