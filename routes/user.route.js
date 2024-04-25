import { Router } from "express"

const router = Router()

router.get('/users', (req, res) => { res.json({ ok: true }) })

export default router