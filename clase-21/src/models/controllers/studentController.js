import { Student } from "../models/studentModel.js";

export const getStudents = async (req, res) => {
    try {
        const { site, active, order, page, limit } = req.query;
        const filters = {};
        
        if (site) {
            filters.site = site;
        }
        
        if (active) {
            filters.active = active === "true";
        }

        const currentPage = parseInt(page) || 1;
        const currentLimit = parseInt(limit) || 10;
        const skip = (currentPage - 1) * currentLimit;

        const sortOptions = {};
        if (order === "desc") {
            sortOptions.grade = -1;
        } else if (order === "asc") {
            sortOptions.grade = 1;
        }

        const students = await Student.find(filters)
            .sort(sortOptions)
            .skip(skip)
            .limit(currentLimit);

        const totalStudents = await Student.countDocuments(filters);

        return res.status(200).json({
            info: {
                total: totalStudents,
                page: currentPage,
                limit: currentLimit
            },
            results: students
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};