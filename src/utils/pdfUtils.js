import { PERSONAL_INFO, TECH_STACK } from "../data/constants";

/**
 * PDF Utilities for handling PDF files in the portfolio
 * Supports PDF viewing, text extraction, and data integration
 */

// PDF configuration
export const PDF_CONFIG = {
  // Default PDF files paths
  RESUME_PATH: PERSONAL_INFO.resumePath,
  PORTFOLIO_PATH: PERSONAL_INFO.resumePath,
  CERTIFICATES_PATH: "/documents/certificates/",

  // PDF viewer options
  VIEWER_OPTIONS: {
    scale: 1.2,
    page: 1,
    rotation: 0,
    textLayerMode: 1, // Enable text selection
    annotationMode: 1, // Enable annotations
  },
};

// Resume data derived from constants
export const PDF_DATA = {
  resume: {
    personalInfo: {
      name: PERSONAL_INFO.fullName,
      email: PERSONAL_INFO.email,
      phone: "",
      location: PERSONAL_INFO.location,
      linkedin: PERSONAL_INFO.linkedin,
      github: PERSONAL_INFO.github,
    },

    summary: PERSONAL_INFO.role,

    experience: [], // Experience data is managed in translation files

    education: [], // Education data is managed in translation files

    skills: {
      technical: TECH_STACK.map((skill) => ({
        name: skill,
        level: 90,
        category: "general",
      })),
      soft: [],
    },

    projects: [], // Project data is managed in translation files

    certifications: [],

    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Professional Working Proficiency" },
    ],
  },
};

/**
 * Utility functions for PDF handling
 */

// Check if PDF file exists
export const checkPDFExists = async (pdfPath) => {
  try {
    const response = await fetch(pdfPath, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.warn(`PDF not found: ${pdfPath}`);
    console.log(error);
    return false;
  }
};

// Get PDF metadata
export const getPDFInfo = (pdfDocument) => {
  return {
    numPages: pdfDocument.numPages,
    info: pdfDocument.getMetadata(),
    fingerprint: pdfDocument.fingerprint,
  };
};

// Extract text from PDF page
export const extractTextFromPage = async (page) => {
  try {
    const textContent = await page.getTextContent();
    return textContent.items.map((item) => item.str).join(" ");
  } catch (error) {
    console.error("Error extracting text from PDF page:", error);
    return "";
  }
};

// Format resume section for display
export const formatResumeSection = (sectionData, sectionType) => {
  if (!sectionData) return [];

  switch (sectionType) {
    case "experience":
      return sectionData.map((exp) => ({
        ...exp,
        formattedDuration: exp.duration || exp.period,
        formattedResponsibilities: exp.responsibilities
          ? exp.responsibilities.join("\n• ")
          : exp.achievements
            ? exp.achievements.join("\n• ")
            : "",
      }));

    case "skills":
      if (!sectionData.technical) return sectionData;
      return {
        ...sectionData,
        categorized: sectionData.technical.reduce((acc, skill) => {
          const category = skill.category || "general";
          if (!acc[category]) acc[category] = [];
          acc[category].push(skill);
          return acc;
        }, {}),
      };

    case "projects":
      return sectionData.map((project) => ({
        ...project,
        formattedTech: project.technologies ? project.technologies.join(" • ") : "",
        formattedHighlights: project.highlights ? project.highlights.join("\n• ") : "",
      }));

    default:
      return sectionData;
  }
};

// Generate dynamic resume data based on PDF content
export const generateDynamicResume = (extractedText) => {
  // This would parse the extracted text and create structured data
  // For now, return the base data
  console.log("Extracted text length:", extractedText?.length || 0);
  return PDF_DATA.resume;
};

export default {
  PDF_CONFIG,
  PDF_DATA,
  checkPDFExists,
  getPDFInfo,
  extractTextFromPage,
  formatResumeSection,
  generateDynamicResume,
};

