import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import { gsap } from "../lib/gsap";
import Marquee from "../components/Marquee";
import ButtonWithIcon from "../components/ui/button-with-icon";
import { SITE, socials } from "../constants";

const EMAIL = SITE.email;

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
    icon: "ph:github-logo-duotone",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/shivam-kumar-3827b1352",
    href: socials.find((s) => s.name === "LinkedIn")?.href || "#",
    icon: "ph:linkedin-logo-duotone",
  },
];

const Contact = () => {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

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
      className="theme-section site-section-shell relative z-10 overflow-hidden"
    >
      <header className="contact-hero contact-reveal">
        <p className="contact-hero-eyebrow">You dream it, I code it</p>
        <h2 className="contact-hero-title">
          <span>Let&apos;s,</span>{" "}
          <span className="animated-gradient-text">Connect</span>
        </h2>
        <div className="contact-hero-rule" />
        <p className="contact-hero-copy">
          Have something worth building?
          <span>Let&apos;s turn it into something real.</span>
        </p>
      </header>

      <div className="contact-panel contact-reveal">
        <div className="contact-panel-left">
          <h3 className="contact-panel-title">
            Let&apos;s build{" "}
            <span className="animated-gradient-text">something real.</span>
          </h3>

          <p className="contact-panel-copy">
            Have a project in mind, an opportunity, or simply an idea
            you&apos;d like to explore? Drop me a message.
          </p>

          <ul className="contact-link-list">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <a
                  className="contact-link-row"
                  href={link.href}
                  target={link.id === "email" ? undefined : "_blank"}
                  rel={link.id === "email" ? undefined : "noreferrer"}
                >
                  <span className="contact-link-icon">
                    <Icon icon={link.icon} width={18} height={18} />
                  </span>

                  <span className="contact-link-text">
                    <span className="contact-link-label">{link.label}</span>
                    <span className="contact-link-value">{link.value}</span>
                  </span>

                  <span className="contact-link-arrow" aria-hidden>
                    <Icon icon="solar:arrow-right-linear" width={16} height={16} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-head">
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

          <div className="contact-field">
            <input
              id="contact-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder=" "
              required
              autoComplete="name"
            />
            <label htmlFor="contact-name">Name</label>
          </div>

          <div className="contact-field">
            <input
              id="contact-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder=" "
              required
              autoComplete="email"
            />
            <label htmlFor="contact-email">Email address</label>
          </div>

          <div className="contact-field contact-field-message">
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder=" "
              required
              rows={6}
            />
            <label htmlFor="contact-message">Message</label>
          </div>

          <ButtonWithIcon
            type="submit"
            className="contact-submit"
            disabled={sending}
          >
            {sending ? "Opening mail…" : "Send message"}
          </ButtonWithIcon>
        </form>
      </div>

      <div className="mt-12 sm:mt-14">
        <Marquee items={items} className="marquee-surface" />
      </div>
    </section>
  );
};

export default Contact;
