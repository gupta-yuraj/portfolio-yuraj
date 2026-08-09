import {
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiBriefcase,
} from "react-icons/fi";
import {
  MdInventory2,
  MdOutlineAnalytics,
  MdOutlineHandshake,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { RiFileExcel2Fill } from "react-icons/ri";

/*
  Static fallback content — what the site renders when Supabase isn't
  configured yet, or while the very first fetch is in flight. Shape must
  match PortfolioDataContext's STATIC_FALLBACK / shapeFromSupabase output
  exactly, since components consume both through the same usePortfolioData()
  hook without knowing which source the data came from.
*/

export const personal = {
  name: "Yuraj Gupta",
  titleLine1: "Business Administration Graduate",
  titleLine2: "Operations & Business Development Enthusiast",
  location: "HSR Layout, 5th Sector, Bangalore, India",
  phone: "+91 6362570156",
  email: "guptayuraj10@gmail.com",
  mapsQuery: "HSR Layout 5th Sector Bangalore India",
  linkedin:"https://www.linkedin.com/in/yuraj-gupta-576b41313/",
    instagram:"https://www.instagram.com/yurajgupta09/"
};

import { FaLinkedinIn } from "react-icons/fa";

{/* <a
  href={personal.linkedin}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn"
>
  <FaLinkedinIn />
</a>
export const objective = */}
  "Motivated BBA graduate seeking an entry-level position in business management where I can apply my knowledge of business operations, customer handling, and organizational skills to contribute to company growth. Open to flexible and rotational shifts.";

export const heroSubtitle =
  "I transform business challenges into strategic opportunities through strategic thinking, operational excellence, customer-focused solutions, and data-driven decision making.";

export const dashboardMetrics = [
  { label: "Business Analytics", value: 92, icon: MdOutlineAnalytics },
  { label: "Operations", value: 88, icon: MdInventory2 },
  { label: "Market Analysis", value: 85, icon: BsGraphUpArrow },
  { label: "Customer Satisfaction", value: 95, icon: MdOutlineSupportAgent },
  { label: "Business Growth", value: 90, icon: FiTrendingUp },
];

export const aboutCounters = [
  { label: "Education", value: 1, suffix: "" },
  { label: "Projects", value: 2, suffix: "" },
  { label: "Skills", value: 20, suffix: "+" },
  { label: "Certification", value: 1, suffix: "" },
  { label: "Languages", value: 3, suffix: "" },
];

export const education = [
  {
    degree: "Bachelor of Business Administration",
    school: "Bangalore University",
    place: "Bangalore, India",
    period: "2022 – 2025",
  },
  {
    degree: "Pre-University, Management (Commerce)",
    school: "City School of Birgunj",
    place: "Birgunj, Nepal",
    period: "2019 – 2021",
  },
  {
    degree: "School",
    school: "Shree Zilla Uchangal Higher Secondary School",
    place: "Pokhariya-04, Nepal",
    // period: "2019 – 2021",
  },
];

export const businessSkills = [
  {
    title: "Business Strategy",
    icon: FiTarget,
    items: ["Market Analysis", "Competitor Research", "SWOT Analysis", "Pricing Study"],
  },
  {
    title: "Operations Management",
    icon: MdInventory2,
    items: ["Stock Tracking", "MIS Reporting", "Supply Coordination"],
  },
  {
    title: "Customer Satisfaction",
    icon: MdOutlineSupportAgent,
    items: ["Customer Engagement", "Communication", "Vendor Coordination", "Retail Coordination"],
  },
  {
    title: "Business Development",
    icon: MdOutlineHandshake,
    items: ["Lead Generation", "B2B Sales", "Client Relationship Management", "Stakeholder Management"],
  },
];

export const softwareSkills = [
  {
    title: "TallyPrime",
    items: ["Accounting Entries", "Ledger Management", "GST-Compliant Invoicing"],
  },
  {
    title: "GST Concepts",
    items: ["GSTR-1", "GSTR-3B", "Input Tax Credit (ITC)", "HSN/SAC Codes", "Reverse Charge Mechanism (RCM)"],
  },
  {
    title: "Microsoft Office",
    items: ["Microsoft Excel", "Microsoft Word", "Microsoft PowerPoint"],
  },
];

export const typingSpeed = "35+ WPM";

export const projects = [
  {
    title: "Business Strategy & Market Analysis",
    description:
      "Analyzed competitor strategies and pricing models. Prepared SWOT-based business reports with operational recommendations.",
    tools: ["Business Research", "Excel", "Presentation", "SWOT Analysis"],
    icon: FiBriefcase,
  },
  {
    title: "Inventory & Customer Operations Study",
    description:
      "Studied inventory management practices and their impact on customer satisfaction. Created Excel-based summary reports and operational improvement recommendations.",
    tools: ["Inventory Management", "Excel", "Customer Operations"],
    icon: RiFileExcel2Fill,
  },
];

export const certification = {
  title: "Logistics & Supply Chain Management",
  subtitle: "Certification Course",
};

export const languages = [
  { name: "English", level: "Proficient", percent: 90 },
  { name: "Hindi", level: "Proficient", percent: 90 },
  { name: "Nepali", level: "Native", percent: 100 },
];

export const personalAttributes = [
  "Energetic & Self-Motivated",
  "Target-Oriented",
  "Fast Learner",
  "Quick Adaptation to New Tools & Technologies",
  "Field Work Ready",
  "Market Visit Experience",
  "Adaptable to Q-Commerce",
  "Adaptable to FMCG Environment",
];

export const whyHireMe = [
  { title: "Strategic Thinking", icon: FiTarget },
  { title: "Operations Management", icon: MdInventory2 },
  { title: "Business Development", icon: MdOutlineHandshake },
  { title: "Customer Handling", icon: MdOutlineSupportAgent },
  { title: "Excellent Communication", icon: FiUsers },
  { title: "Quick Learner", icon: FiTrendingUp },
  { title: "Problem Solving", icon: MdOutlineAnalytics },
];

export const achievements = [
  { label: "Business Skills", value: "20+" },
  { label: "Academic Projects", value: "2" },
  { label: "Certification", value: "1" },
  { label: "Languages", value: "3" },
  { label: "Typing Speed", value: "30+ WPM" },
  { label: "Degree", value: "BBA Graduate" },
];

export const navLinks = [
  { label: "Home", to: "hero" },
  { label: "About", to: "about" },
  { label: "Education", to: "education" },
  { label: "Skills", to: "skills" },
  { label: "Projects", to: "projects" },
  { label: "Achievements", to: "achievements" },
  { label: "Contact", to: "contact" },
];
