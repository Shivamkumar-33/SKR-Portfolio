import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "shivamjmp2@gmail.com";

const quickLinks = [
  {
    id: "email",
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: "solar:letter-linear",
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/Shivamkumar-33",
    href: socials.find((s) => s.name === "GitHub")?.href || "#",
    icon: "mdi:github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/shivam-kumar",
    href: socials.find((s) => s.name === "LinkedIn")?.href || "#",
    icon: "mdi:linkedin",
  },
];

const Contact = () => {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const text = `Have an idea or a challenge in mind?
Let’s connect and build something impactful.`;
  const items = [
    "just imagine, i code",
    "just imagine, i code",
    "just imagine, i code",
    "just imagine, i code",
    "just imagine, i code",
  ];

  useGSAP(
    () => {
      gsap.from(".contact-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setSending(true);
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    window.setTimeout(() => setSending(false), 800);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="theme-section relative z-10 overflow-hidden px-6 pt-10 pb-6 sm:px-10 sm:pt-12 sm:pb-10"
    >
      <AnimatedHeaderSection
        subTitle={"You Dream It, I Code it"}
        title={"Contact"}
        text={text}
        textColor={"theme-text-primary"}
        withScrollTrigger={true}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl pt-4 sm:pt-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 lg:items-stretch">
          {/* LEFT */}
          <div className="contact-reveal flex flex-col">
            <h2 className="font-sans text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-[var(--theme-text-primary)] sm:text-[2.1rem] lg:text-[2.35rem]">
              Let&apos;s build{" "}
              <span className="text-[var(--theme-text-tertiary)]">
                something cool.
              </span>
            </h2>

            <p className="mt-4 max-w-[28rem] text-[0.92rem] leading-relaxed text-[var(--theme-text-secondary)] sm:text-[0.98rem]">
              Have a project in mind, an internship opportunity, or just want
              to connect? Drop a message. I&apos;ll get back to you.
            </p>

            <div className="mt-8 mb-5 flex w-full max-w-xs items-center">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-gold)] ring-1 ring-[var(--theme-border-strong)]" />
              <span className="h-px flex-1 bg-[var(--theme-divider)]" />
            </div>

            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.id === "email" ? undefined : "_blank"}
                  rel={link.id === "email" ? undefined : "noreferrer"}
                  className="group flex items-center gap-3.5 rounded-2xl border border-[rgba(255,255,255,0.12)] bg-transparent px-3.5 py-3.5 transition-colors hover:border-[rgba(191,161,129,0.45)] hover:bg-[rgba(191,161,129,0.04)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.12)] text-[var(--theme-text-secondary)] transition-colors group-hover:border-[rgba(191,161,129,0.45)] group-hover:text-[var(--color-gold)]">
                    <Icon icon={link.icon} width={18} height={18} />
                  </span>

                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--theme-text-tertiary)]">
                      {link.label}
                    </span>
                    <span className="truncate text-[0.92rem] font-medium text-[var(--theme-text-primary)] sm:text-[0.98rem]">
                      {link.value}
                    </span>
                  </span>

                  <Icon
                    icon="solar:arrow-right-linear"
                    width={16}
                    height={16}
                    className="shrink-0 text-[var(--theme-text-tertiary)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-gold)]"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — form card */}
          <div className="contact-reveal flex">
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col rounded-[1.35rem] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.02)] p-5 sm:p-6"
            >
              <div className="mb-5 flex items-center justify-end">
                <span className="contact-status-chip">
                  <span className="contact-status-pulse" aria-hidden="true">
                    <span className="contact-status-pulse-ring" />
                    <span className="contact-status-pulse-dot" />
                  </span>
                  <span className="contact-status-text">
                    <span className="contact-status-label">Status</span>
                    <span className="contact-status-value">Available</span>
                  </span>
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-transparent px-4 py-3.5 text-[0.92rem] text-[var(--theme-text-primary)] outline-none placeholder:text-[var(--theme-text-tertiary)] focus:border-[rgba(191,161,129,0.5)]"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-transparent px-4 py-3.5 text-[0.92rem] text-[var(--theme-text-primary)] outline-none placeholder:text-[var(--theme-text-tertiary)] focus:border-[rgba(191,161,129,0.5)]"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  rows={6}
                  className="min-h-[9rem] w-full flex-1 resize-y rounded-xl border border-[rgba(255,255,255,0.12)] bg-transparent px-4 py-3.5 text-[0.92rem] leading-relaxed text-[var(--theme-text-primary)] outline-none placeholder:text-[var(--theme-text-tertiary)] focus:border-[rgba(191,161,129,0.5)]"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-[rgba(255,255,255,0.14)] bg-transparent px-4 py-3.5 text-[0.95rem] font-semibold text-[var(--theme-text-primary)] transition-colors hover:border-[var(--color-gold)] hover:bg-[var(--theme-button-solid-bg)] hover:text-[var(--theme-button-solid-fg)] disabled:cursor-wait disabled:opacity-70"
              >
                <span>{sending ? "Opening mail…" : "Send message"}</span>
                <Icon icon="solar:plain-2-linear" width={16} height={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-14">
        <Marquee items={items} className="marquee-surface" />
      </div>
    </section>
  );
};

export default Contact;
