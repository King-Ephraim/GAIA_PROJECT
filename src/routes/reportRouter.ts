import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { createReport, getAllReports } from "../models/reportModel";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/reports", upload.single("photo"), async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, zoneId, typeSignalement, description, lat, lng } = req.body;

    if (!req.file) {
      res.status(400).json({ error: "Aucune image fournie." });
      return;
    }

    const newReport = await createReport({
      userId: parseInt(userId),
      zoneId: parseInt(zoneId),
      typeSignalement,
      description,
      urlPhoto: `/uploads/${req.file.filename}`,
      position: { lat: parseFloat(lat), lng: parseFloat(lng) }, 
    });

    res.status(201).json(newReport);
  } catch (err) {
    console.error("Erreur report:", err);
    res.status(500).json({ error: "Erreur serveur", details: err });
  }
});

router.get("/reports", async (_req: Request, res: Response): Promise<void> => {
  try {
    const reports = await getAllReports();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération", details: err });
  }
});

export default router;
