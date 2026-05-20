import express from "express";

import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  exportCSV
} from "../controllers/leadController";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware";

const router = express.Router();


// CREATE LEAD
router.post(
  "/",
  protect,
  createLead
);


// EXPORT CSV
router.get(
  "/export/csv",
  protect,
  exportCSV
);


// GET ALL LEADS
router.get(
  "/",
  protect,
  getLeads
);


// GET SINGLE LEAD
router.get(
  "/:id",
  protect,
  getLeadById
);


// UPDATE LEAD
router.put(
  "/:id",
  protect,
  updateLead
);


// DELETE LEAD
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteLead
);

export default router;