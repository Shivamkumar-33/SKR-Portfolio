import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import { gsap } from "../lib/gsap";
import { SITE, socials } from "../constants";
import ButtonWithIcon from "../components/ui/button-with-icon";

const socialIcons = {
  LinkedIn: "ph:linkedin-logo",
  GitHub: "ph:github-logo",
};

const About = () => {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      gsap.from(".about-profile-card", {
        y: 48,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  const copyEmail = async () => {
    await navigator.clipboard.writeText(SITE.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="about" ref={sectionRef} className="about-profile-section">
      <div className="about-profile-grid">
        <article className="about-profile-card about-profile-intro">
          <div className="about-availability">
            <span aria-hidden />
            Available for work
          </div>

          <div>
            <p className="about-hello">Hi, I&apos;m</p>
            <h2 className="about-profile-name">
              Shivam <span className="animated-gradient-text">Kumar.</span>
            </h2>
            <p className="about-profile-role">I BUILD DIGITAL SYSTEMS</p>
            <div className="about-short-rule" />
            <p className="about-profile-copy">
              I turn complex ideas into scalable, meaningful products —
              combining thoughtful design, clean engineering, and intelligent
              technology.
            </p>
          </div>

          <ButtonWithIcon href="#projects" className="about-cta-button about-work-button">
            View my work
          </ButtonWithIcon>

          <div className="about-social-row">
            <span>Find me on</span>
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
              >
                <Icon icon={socialIcons[social.name] || social.icon} />
              </a>
            ))}
            <a
              href="/assets/resume/Shivamkumar_resume.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="View resume"
            >
              <Icon icon="solar:document-text-linear" />
            </a>
          </div>
        </article>

        <div className="about-profile-center">
          <article className="about-profile-card about-photo-card">
            <img
              src="/images/myproflle.png"
              alt="Shivam Kumar"
              loading="lazy"
            />
            <div className="about-photo-glow" aria-hidden />
          </article>

          <article className="about-profile-card about-location-card">
            <div className="about-location-pin" aria-hidden>
              <span />
            </div>
            <div>
              <h3>Delhi, India</h3>
              <p>28.6139° N, 77.2090° E</p>
              <span className="about-timezone">
                <Icon icon="solar:clock-circle-linear" />
                GMT +5:30
              </span>
            </div>
          </article>
        </div>

        <article className="about-profile-card about-profile-contact">
          <div className="about-contact-mark" aria-hidden>
            <span />
          </div>

          <div className="about-contact-heading">
            <h3>Let&apos;s build something</h3>
            <p className="animated-gradient-text">worth building.</p>
          </div>

          <div className="about-contact-email">
            <div className="about-email-icon">
              <Icon icon="solar:letter-linear" />
            </div>
            <button type="button" onClick={copyEmail}>
              <strong>{copied ? "Email copied!" : SITE.email}</strong>
              <span>{copied ? "READY TO PASTE" : "TAP TO COPY EMAIL"}</span>
            </button>
          </div>

          <ButtonWithIcon href="#contact" className="about-cta-button">
            Connect now
          </ButtonWithIcon>
        </article>
      </div>
    </section>
  );
};

export default About;
