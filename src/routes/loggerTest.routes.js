import { Router } from "express";



const router = Router();

router.get("/warn", (req, res) => {
    req.logger.info("!Alert!");
    res.send({ message: "Logger test" });
});

export default router;