import { Router } from "express";
import { registerUser, login , logout} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import verfieyJWT from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route('/login').post(login);

router.route('/logout').post(verfieyJWT,logout);


router.get('/', (req, res) => {
    res.send('server is running')
})



export default router