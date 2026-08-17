import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import { gsap } from "../lib/gsap";
import Marquee from "../components/Marquee";
import ButtonWithIcon from "../components/ui/button-with-icon";
import { SITE, socials } from "../constants";

const EMAIL = SITE.email;

const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { min: 5, max: 120 },
  message: { min: 10, max: 2000 },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeSingleLine = (value) =>
  value.replace(/[\r\n\u2028\u2029]/g, " ").replace(/\s+/g, " ").trim();

const validateContactForm = ({ name, email, message }) => {
  const cleaned = {
    name: sanitizeSingleLine(name),
    email: sanitizeSingleLine(email).toLowerCase(),
    message: message.replace(/\r\n/g, "\n").trim(),
  };

  if (
    cleaned.name.length < CONTACT_LIMITS.name.min ||
    cleaned.name.length > CONTACT_LIMITS.name.max
  ) {
    return { ok: false, error: "Please enter a valid name." };
  }

  if (
    cleaned.email.length < CONTACT_LIMITS.email.min ||
    cleaned.email.length > CONTACT_LIMITS.email.max ||
    !EMAIL_PATTERN.test(cleaned.email)
  ) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (
    cleaned.message.length < CONTACT_LIMITS.message.min ||
    cleaned.message.length > CONTACT_LIMITS.message.max
  ) {
    return { ok: false, error: "Please enter a message between 10 and 2000 characters." };
  }

  return { ok: true, value: cleaned };
};

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
  const [formError, setFormError] = useState("");

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
    const max = CONTACT_LIMITS[name]?.max;
    const nextValue = typeof max === "number" ? value.slice(0, max) : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
    if (formError) setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateContactForm(form);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    setFormError("");
    setSending(true);
    const subject = encodeURIComponent(`Portfolio message from ${result.value.name}`);
    const body = encodeURIComponent(
      `${result.value.message}\n\n— ${result.value.name}\n${result.value.email}`
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
              minLength={CONTACT_LIMITS.name.min}
              maxLength={CONTACT_LIMITS.name.max}
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
              minLength={CONTACT_LIMITS.email.min}
              maxLength={CONTACT_LIMITS.email.max}
              autoComplete="email"
              inputMode="email"
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
              minLength={CONTACT_LIMITS.message.min}
              maxLength={CONTACT_LIMITS.message.max}
              rows={6}
            />
            <label htmlFor="contact-message">Message</label>
          </div>

          {formError ? (
            <p className="contact-form-error" role="alert">
              {formError}
            </p>
          ) : null}

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
