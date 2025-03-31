import { Request, Response, Router, RequestHandler } from "express";
import svgCaptcha from "svg-captcha";

const router = Router();
const captchaStore = new Map<string, string>();


router.get("/generate", (req: Request, res: Response): void => {
    const captcha = svgCaptcha.create({
        size: 6,
        noise: 3,
        color: true,
        background: "#f4f4f4",
    });

    const captchaId = Math.random().toString(36).substring(2, 10);
    captchaStore.set(captchaId, captcha.text);

    res.json({ captchaId, image: captcha.data });
});


const validateCaptcha: RequestHandler = (req: Request, res: Response): void => {
    const { captchaId, captchaText } = req.body;

    if (!captchaId || !captchaText) {
        res.status(400).json({ error: "Faltan datos en la solicitud" });
        return;
    }

    if (!captchaStore.has(captchaId)) {
        res.status(400).json({ error: "Captcha inválido o expirado" });
        return;
    }

    const storedCaptcha = captchaStore.get(captchaId);
    captchaStore.delete(captchaId);

    if (storedCaptcha?.toLowerCase() !== captchaText.toLowerCase()) {
        res.status(400).json({ error: "Captcha incorrecto" });
        return;
    }

    res.json({ success: true });
};


router.post("/validate", validateCaptcha);

export default router;
