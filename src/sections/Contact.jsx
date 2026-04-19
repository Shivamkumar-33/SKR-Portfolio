import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

const Contact = () => {
  const text = `Have an idea or a challenge in mind?
Let’s connect and build something impactful.`;
  const items = [
    "just imagine, i code",
    "just imagine, i code",
    "just imagine, i code",
    "just imagine, i code",
    "just imagine, i code",
  ];

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 75%",
      },
    });
  }, []);

  return (
    <section
      id="contact"
      className="theme-section relative z-10 flex flex-col justify-between px-6 pt-12 pb-8 sm:px-10 sm:pt-14 sm:pb-12"
    >
      <AnimatedHeaderSection
        subTitle={"You Dream It, I Code it"}
        title={"Contact"}
        text={text}
        textColor={"theme-text-primary"}
        withScrollTrigger={true}
      />

      <div className="flex flex-col gap-12 md:gap-16 w-full max-w-7xl mx-auto z-10 relative pt-0 sm:pt-2">
        {/* Two Columns */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Column */}
          <div className="flex w-full flex-col gap-6 lg:w-3/5 lg:pr-10">
            <h2 className="theme-text-primary text-3xl sm:text-4xl lg:text-[42px] font-serif leading-tight social-link">
              Ready to work together?
            </h2>
            <p className="theme-text-secondary text-base sm:text-[17px] font-sans leading-relaxed social-link mb-2 md:mb-4">
              Send me an email or drop a message via WhatsApp, and let's explore how I can help you build your project better.
            </p>
            
            <div className="flex flex-col gap-4 social-link">
              <div className="contact-detail-card flex flex-col sm:flex-row sm:items-center border border-l-[#D4AF37] border-l-[3px] py-5 px-6 lg:px-8 gap-3 sm:gap-6">
                <span className="theme-text-tertiary w-28 shrink-0 text-xs font-semibold tracking-[0.2em] uppercase">
                  Email
                </span>
                <a href="mailto:shivamjmp2@gmail.com" className="theme-link transition-colors truncate text-sm sm:text-base tracking-wide">
                  shivamjmp2@gmail.com
                </a>
              </div>
              
              <div className="contact-detail-card flex flex-col sm:flex-row sm:items-center border border-l-[#D4AF37] border-l-[3px] py-5 px-6 lg:px-8 gap-3 sm:gap-6">
                <span className="theme-text-tertiary w-28 shrink-0 text-xs font-semibold tracking-[0.2em] uppercase">
                  Phone
                </span>
                <a href="tel:+917362006858" className="theme-link transition-colors truncate text-sm sm:text-base tracking-wide">
                  +91 7362006858
                </a>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex w-full flex-col gap-6 lg:w-2/5 mt-4 lg:mt-0 lg:pl-4">
            <h3 className="theme-text-primary text-2xl sm:text-[32px] font-serif social-link mb-2 md:mb-4">
              Find me on social
            </h3>
            
            <div className="flex flex-col gap-4 social-link">
              {socials.map((social, index) => (
                <div key={index} className="contact-social-card flex flex-col sm:flex-row sm:items-center bg-transparent border transition-colors py-5 px-6 lg:px-8 gap-3 sm:gap-6">
                  <span className="theme-text-tertiary w-28 shrink-0 text-xs font-semibold tracking-[0.2em] uppercase">
                    {social.name}
                  </span>
                  <a href={social.href} target="_blank" rel="noreferrer" className="theme-link transition-colors truncate text-sm sm:text-base tracking-wide">
                    {social.name === "LinkedIn" ? "Shivam Kumar" 
                      : social.name === "GitHub" ? "Shivamkumar-33" 
                      : social.name === "Twitter" ? "X (Twitter)" 
                      : social.name}
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <div className="mt-16 sm:mt-20">
        <Marquee items={items} className="marquee-surface" />
      </div>
    </section>
  );
};

export default Contact;
