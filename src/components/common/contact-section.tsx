"use client";

import React, { useState } from "react";
import { submitInquiryAction } from "@/app/actions/inquiries";
import { Profile } from "@/lib/types";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/social-icons";
import { HeadingAccent } from "@/components/common/decorative-svgs";

export function ContactSection({ profile }: { profile: Profile }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await submitInquiryAction({
        name,
        email,
        subject: subject || "Data Architecture Consultation / Opportunity",
        message,
      });

      if (res.success) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setError(res.error || "Failed to submit message.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-[rgba(55,53,47,0.1)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column */}
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#37352F] tracking-tight leading-tight font-heading">
            Let’s Architect Your Next <br />
            <span className="text-[#D9730D]">Data Platform</span>.
          </h2>

          <div className="mt-2 mb-4">
            <HeadingAccent className="w-56 sm:w-72 h-4" />
          </div>

          <p className="text-[#787774] text-sm sm:text-base leading-relaxed max-w-md">
            Available for Staff/Principal Big Data roles, cloud lakehouse architecture reviews,
            and high-throughput streaming consultations.
          </p>

          <div className="pt-6 space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAEBDD] border border-[#D9730D]/25 flex items-center justify-center text-[#D9730D] shadow-xs">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#787774] block font-bold font-mono">DIRECT EMAIL</span>
                <a
                  href={`mailto:${profile.socials.email}`}
                  className="text-[#37352F] hover:text-[#D9730D] font-bold text-sm transition-colors"
                >
                  {profile.socials.email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              {profile.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white border border-[rgba(55,53,47,0.14)] text-[#37352F] hover:text-[#D9730D] hover:border-[#D9730D] transition-all shadow-xs"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {profile.socials.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white border border-[rgba(55,53,47,0.14)] text-[#37352F] hover:text-[#DFAB01] hover:border-[#DFAB01] transition-all shadow-xs"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="notion-card p-8 rounded-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#EEF5F2] border border-[#0F7B6C]/25 text-[#0F7B6C] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-[#37352F]">Message Delivered</h3>
              <p className="text-xs text-[#787774] max-w-xs mx-auto">
                Thank you for reaching out. Your transmission has been securely stored in Appwrite and forwarded to Mohamed.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2.5 rounded-xl text-xs font-bold text-[#37352F] hover:text-black bg-[#F7F6F3] hover:bg-[#EAE8E3] transition-colors cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#37352F] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F6F3] border border-[rgba(55,53,47,0.14)] text-sm text-[#37352F] placeholder:text-[#9B9A97] focus:bg-white focus:outline-none focus:border-[#D9730D] focus:ring-2 focus:ring-[#D9730D]/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#37352F] mb-1.5">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F6F3] border border-[rgba(55,53,47,0.14)] text-sm text-[#37352F] placeholder:text-[#9B9A97] focus:bg-white focus:outline-none focus:border-[#D9730D] focus:ring-2 focus:ring-[#D9730D]/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#37352F] mb-1.5">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Data Architecture Consultation / Role Inquiry"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F6F3] border border-[rgba(55,53,47,0.14)] text-sm text-[#37352F] placeholder:text-[#9B9A97] focus:bg-white focus:outline-none focus:border-[#D9730D] focus:ring-2 focus:ring-[#D9730D]/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#37352F] mb-1.5">
                  Message Details
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your pipeline scale, architecture challenge, or team requirements..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F6F3] border border-[rgba(55,53,47,0.14)] text-sm text-[#37352F] placeholder:text-[#9B9A97] focus:bg-white focus:outline-none focus:border-[#D9730D] focus:ring-2 focus:ring-[#D9730D]/10 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#D9730D] hover:bg-[#C26207] text-white transition-all flex items-center justify-center gap-2 shadow-xs hover:shadow-md disabled:opacity-60 cursor-pointer hover:scale-[1.01]"
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
