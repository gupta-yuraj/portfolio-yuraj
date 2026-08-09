import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";
import { usePortfolioData } from "../context/PortfolioDataContext";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

// Optional: fill these in to ALSO send an email via EmailJS on submit.
// The message is always saved to Supabase (visible in the admin panel)
// regardless of whether EmailJS is configured.

const EMAILJS_SERVICE_ID = "service_iwmhy8d";
const EMAILJS_TEMPLATE_ID = "template_eymodto";
const EMAILJS_PUBLIC_KEY = "SmELYvHBxrMAFvmW6";
const emailjsConfigured =
  EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" &&
  EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID" &&
  EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const { personal } = usePortfolioData();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.subject.trim()) e.subject = "Please add a subject";
    if (!form.message.trim()) e.message = "Please write a message";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field) => (ev) => {
    setForm((f) => ({ ...f, [field]: ev.target.value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error("Supabase isn't configured yet — see README for setup steps.");
      }

      // Primary path: save the message so it shows up in the admin panel.
      const { error: supabaseError } = await supabase
        .from("messages")
        .insert({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        });

      if (supabaseError) {
        throw supabaseError;
      }

      // Optional: also fire an EmailJS notification if configured.
      if (emailjsConfigured) {
        try {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
              from_name: form.name,
              from_email: form.email,
              subject: form.subject,
              message: form.message,
            },
            EMAILJS_PUBLIC_KEY
          );
        } catch (emailErr) {
          console.warn("Message saved, but EmailJS notification failed:", emailErr.message);
        }
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-pad relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Let's connect" title="Contact Section" subtitle="Have an opportunity in mind? I'd love to hear from you." />

        <div className="grid md:grid-cols-5 gap-8">
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            noValidate
            className="md:col-span-3 glass rounded-3xl p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">Name</label>
                <input
                  value={form.name}
                  onChange={handleChange("name")}
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 focus:border-highlight rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                />
                {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">Email</label>
                <input
                  value={form.email}
                  onChange={handleChange("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-highlight rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="text-xs text-white/50 mb-1.5 block">Subject</label>
              <input
                value={form.subject}
                onChange={handleChange("subject")}
                type="text"
                placeholder="What's this about?"
                className="w-full bg-white/5 border border-white/10 focus:border-highlight rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
              />
              {errors.subject && <p className="text-xs text-red-400 mt-1.5">{errors.subject}</p>}
            </div>

            <div>
              <label className="text-xs text-white/50 mb-1.5 block">Message</label>
              <textarea
                value={form.message}
                onChange={handleChange("message")}
                rows={5}
                placeholder="Tell me about the opportunity..."
                className="w-full bg-white/5 border border-white/10 focus:border-highlight rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors resize-none"
              />
              {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>}
            </div>

            <MagneticButton
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-highlight px-6 py-3.5 text-sm font-semibold text-white glow-hover disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : (<><FiSend /> Send Message</>)}
            </MagneticButton>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-emerald-400">
                <FiCheckCircle /> Message sent successfully. I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <FiAlertCircle /> Something went wrong. Please make sure Supabase is configured (see README), or email me directly.
              </p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-2 space-y-5"
          >
            <div className="glass rounded-2xl p-6 flex items-center gap-4 glow-hover">
              <span className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center text-highlight text-lg shrink-0">
                <FiPhone />
              </span>
              <div>
                <p className="text-xs text-white/45">Phone</p>
                <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="text-sm text-white/85 cursor-hover">
                  {personal.phone}
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 flex items-center gap-4 glow-hover">
              <span className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center text-highlight text-lg shrink-0">
                <FiMail />
              </span>
              <div>
                <p className="text-xs text-white/45">Email</p>
                <a href={`mailto:${personal.email}`} className="text-sm text-white/85 cursor-hover break-all">
                  {personal.email}
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 flex items-center gap-4 glow-hover">
              <span className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center text-highlight text-lg shrink-0">
                <FiMapPin />
              </span>
              <div>
                <p className="text-xs text-white/45">Location</p>
                <p className="text-sm text-white/85">{personal.location}</p>
              </div>
            </div>

            {personal.linkedinUrl && (
              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-6 flex items-center gap-4 glow-hover cursor-hover"
              >
                <span className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center text-highlight text-lg shrink-0">
                  <FiLinkedin />
                </span>

                <div>
                  <p className="text-xs text-white/45">LinkedIn</p>
                  <p className="text-sm text-white/85">Connect with me</p>
                </div>
              </a>
            )}

            <div className="rounded-2xl overflow-hidden border border-white/10 h-48">
              <iframe
                title="Location map"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  personal.mapsQuery
                )}&z=14&output=embed`}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}