import { ICON_KEYS } from "./iconMap";

/*
 * Declarative config for every editable list table. The generic
 * <SectionEditor /> in the admin panel renders add/edit/delete UI for a
 * table purely from this config, so adding a new content type later means
 * adding one entry here (plus the matching Supabase table) rather than a
 * whole new component.
 *
 * Field types: "text" | "textarea" | "number" | "icon" | "tags"
 * ("tags" = comma-separated list, stored as a Postgres text[] column)
 */
export const SECTIONS = [
  {
    key: "dashboard_metrics",
    table: "dashboard_metrics",
    label: "Hero Dashboard Metrics",
    fields: [
      { name: "label", type: "text", label: "Label" },
      { name: "value", type: "number", label: "Value (%)" },
      { name: "icon", type: "icon", label: "Icon" },
    ],
  },
  {
    key: "about_counters",
    table: "about_counters",
    label: "About — Counters",
    fields: [
      { name: "label", type: "text", label: "Label" },
      { name: "value", type: "number", label: "Value" },
      { name: "suffix", type: "text", label: "Suffix (e.g. +)" },
    ],
  },
  {
    key: "education",
    table: "education",
    label: "Education",
    fields: [
      { name: "degree", type: "text", label: "Degree" },
      { name: "school", type: "text", label: "School" },
      { name: "place", type: "text", label: "Place" },
      { name: "period", type: "text", label: "Period" },
    ],
  },
  {
    key: "business_skills",
    table: "business_skills",
    label: "Core Business Skills",
    fields: [
      { name: "title", type: "text", label: "Title" },
      { name: "icon", type: "icon", label: "Icon" },
      { name: "items", type: "tags", label: "Skills (comma-separated)" },
    ],
  },
  {
    key: "software_skills",
    table: "software_skills",
    label: "Accounting & Software Skills",
    fields: [
      { name: "title", type: "text", label: "Title" },
      { name: "items", type: "tags", label: "Items (comma-separated)" },
    ],
  },
  {
    key: "projects",
    table: "projects",
    label: "Academic Projects",
    fields: [
      { name: "title", type: "text", label: "Title" },
      { name: "description", type: "textarea", label: "Description" },
      { name: "tools", type: "tags", label: "Tools (comma-separated)" },
      { name: "icon", type: "icon", label: "Icon" },
    ],
  },
  {
    key: "languages",
    table: "languages",
    label: "Languages",
    fields: [
      { name: "name", type: "text", label: "Language" },
      { name: "level", type: "text", label: "Level" },
      { name: "percent", type: "number", label: "Proficiency (%)" },
    ],
  },
  {
    key: "personal_attributes",
    table: "personal_attributes",
    label: "Personal Attributes",
    fields: [{ name: "text", type: "text", label: "Attribute" }],
  },
  {
    key: "why_hire_me",
    table: "why_hire_me",
    label: "Why Hire Me",
    fields: [
      { name: "title", type: "text", label: "Title" },
      { name: "icon", type: "icon", label: "Icon" },
    ],
  },
  {
    key: "achievements",
    table: "achievements",
    label: "Achievements",
    fields: [
      { name: "label", type: "text", label: "Label" },
      { name: "value", type: "text", label: "Value" },
    ],
  },
];

export { ICON_KEYS };
