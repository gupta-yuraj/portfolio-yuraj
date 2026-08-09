import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { fetchAll, fetchSingleton } from "../lib/api";
import { resolveIcon } from "../lib/iconMap";
import * as staticData from "../data/portfolioData";

const PortfolioDataContext = createContext(null);

/* Reshapes raw Supabase rows into exactly the same shape as the static
 * fallback data in src/data/portfolioData.js, so components don't need to
 * know or care whether content came from the database or the defaults. */
function shapeFromSupabase({
  profile,
  certification,
  dashboard_metrics,
  about_counters,
  education,
  business_skills,
  software_skills,
  projects,
  languages,
  personal_attributes,
  why_hire_me,
  achievements,
}) {
  return {
    personal: {
      name: profile.name,
      titleLine1: profile.title_line1,
      titleLine2: profile.title_line2,
      location: profile.location,
      phone: profile.phone,
      email: profile.email,
      linkedin: profile.linkedin,
      mapsQuery: profile.maps_query,
    },
    objective: profile.objective,
    heroSubtitle: profile.hero_subtitle,
    typingSpeed: profile.typing_speed,
    resumeUrl: profile.resume_url || "/Yuraj_Gupta_Resume.pdf",
    dashboardMetrics: dashboard_metrics.map((m) => ({ ...m, icon: resolveIcon(m.icon) })),
    aboutCounters: about_counters,
    education,
    businessSkills: business_skills.map((s) => ({ ...s, icon: resolveIcon(s.icon) })),
    softwareSkills: software_skills,
    projects: projects.map((p) => ({ ...p, icon: resolveIcon(p.icon) })),
    certification: certification
      ? { title: certification.title, subtitle: certification.subtitle }
      : staticData.certification,
    languages,
    personalAttributes: personal_attributes.map((a) => a.text),
    whyHireMe: why_hire_me.map((w) => ({ ...w, icon: resolveIcon(w.icon) })),
    achievements,
    navLinks: staticData.navLinks,
  };
}

const STATIC_FALLBACK = {
  personal: staticData.personal,
  objective: staticData.objective,
  heroSubtitle: staticData.heroSubtitle,
  typingSpeed: staticData.typingSpeed,
  resumeUrl: "/Yuraj_Gupta_Resume.pdf",
  dashboardMetrics: staticData.dashboardMetrics,
  aboutCounters: staticData.aboutCounters,
  education: staticData.education,
  businessSkills: staticData.businessSkills,
  softwareSkills: staticData.softwareSkills,
  projects: staticData.projects,
  certification: staticData.certification,
  languages: staticData.languages,
  personalAttributes: staticData.personalAttributes,
  whyHireMe: staticData.whyHireMe,
  achievements: staticData.achievements,
  navLinks: staticData.navLinks,
};

export function PortfolioDataProvider({ children }) {
  const [data, setData] = useState(STATIC_FALLBACK);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [usingFallback, setUsingFallback] = useState(!isSupabaseConfigured);

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setUsingFallback(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [
        profile,
        certification,
        dashboard_metrics,
        about_counters,
        education,
        business_skills,
        software_skills,
        projects,
        languages,
        personal_attributes,
        why_hire_me,
        achievements,
      ] = await Promise.all([
        fetchSingleton("profile"),
        fetchSingleton("certification"),
        fetchAll("dashboard_metrics"),
        fetchAll("about_counters"),
        fetchAll("education"),
        fetchAll("business_skills"),
        fetchAll("software_skills"),
        fetchAll("projects"),
        fetchAll("languages"),
        fetchAll("personal_attributes"),
        fetchAll("why_hire_me"),
        fetchAll("achievements"),
      ]);

      if (!profile) throw new Error("Supabase tables are empty — run supabase/schema.sql first.");

      setData(
        shapeFromSupabase({
          profile,
          certification,
          dashboard_metrics,
          about_counters,
          education,
          business_skills,
          software_skills,
          projects,
          languages,
          personal_attributes,
          why_hire_me,
          achievements,
        })
      );
      setUsingFallback(false);
    } catch (err) {
      console.warn("Falling back to static portfolio content:", err.message);
      setData(STATIC_FALLBACK);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Live-refresh the public site whenever the admin edits content elsewhere.
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const channel = supabase
      .channel("portfolio-content-changes")
      .on("postgres_changes", { event: "*", schema: "public" }, () => load())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [load]);

  const value = useMemo(() => ({ ...data, loading, usingFallback, refresh: load }), [data, loading, usingFallback, load]);

  return <PortfolioDataContext.Provider value={value}>{children}</PortfolioDataContext.Provider>;
}

export function usePortfolioData() {
  const ctx = useContext(PortfolioDataContext);
  if (!ctx) throw new Error("usePortfolioData must be used within a PortfolioDataProvider");
  return ctx;
}
