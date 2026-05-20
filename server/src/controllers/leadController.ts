import { Response } from "express";
import Lead from "../models/Lead";
import { AuthRequest } from "../types/express";
import { exportLeadsToCSV } from "../utils/csvExport";


// CREATE LEAD
export const createLead = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, email, status, source } = req.body;

    if (!name || !email || !source) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }

    const leadExists = await Lead.findOne({ email });

    if (leadExists) {
      res.status(400);
      throw new Error("Lead already exists");
    }

    const lead = await Lead.create({
      name,
      email,
      status,
      source,
      createdBy: req.user?.id
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead
    });

  } catch (error: any) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

export const exportCSV = async (
  _req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const leads = await Lead.find().select(
      "name email status source createdAt"
    );

    const csvData = exportLeadsToCSV(leads);

    res.header("Content-Type", "text/csv");

    res.attachment("leads.csv");

    res.status(200).send(csvData);

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// GET ALL LEADS
export const getLeads = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {

    // QUERY PARAMS
    const {
      status,
      source,
      search,
      sort,
      page = "1",
      limit = "10"
    } = req.query;

    // FILTER OBJECT
    const query: any = {};

    // FILTER BY STATUS
    if (status) {
      query.status = status;
    }

    // FILTER BY SOURCE
    if (source) {
      query.source = source;
    }

    // SEARCH BY NAME OR EMAIL
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i"
          }
        },
        {
          email: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    // SORTING
    let sortOption = {};

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    } else {
      sortOption = { createdAt: -1 };
    }

    // PAGINATION
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    const skip = (pageNumber - 1) * limitNumber;

    // TOTAL COUNT
    const totalLeads = await Lead.countDocuments(query);

    // FETCH LEADS
    const leads = await Lead.find(query)
      .populate("createdBy", "name email")
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    // RESPONSE
    res.status(200).json({
      success: true,

      currentPage: pageNumber,

      totalPages: Math.ceil(totalLeads / limitNumber),

      totalLeads,

      count: leads.length,

      leads
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// GET SINGLE LEAD
export const getLeadById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {

    const lead = await Lead.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!lead) {
      res.status(404);
      throw new Error("Lead not found");
    }

    res.status(200).json({
      success: true,
      lead
    });

  } catch (error: any) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};



// UPDATE LEAD
export const updateLead = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404);
      throw new Error("Lead not found");
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      lead: updatedLead
    });

  } catch (error: any) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};



// DELETE LEAD
export const deleteLead = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404);
      throw new Error("Lead not found");
    }

    await lead.deleteOne();

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully"
    });

  } catch (error: any) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};