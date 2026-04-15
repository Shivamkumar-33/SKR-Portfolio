import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

const Contact = () => {
  const text = `Got a question or project idea?
    I'd love to hear from you and discuss it further.`;
  const items = [
    "just imagine, i code",
    "just imagine, i code",
    "just imagine, i code",
    "just imagine, i code",
    "just imagine, i code",
  ];
  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);
  return (
    <section
      id="contact"
      className="relative z-10 flex min-h-screen flex-col justify-between bg-black px-6 py-12 sm:px-10 sm:py-14"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"You Dream It, I Code it"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        <div className="mb-6 flex px-0 text-[26px] font-light leading-none uppercase text-white lg:text-[32px]">
          <div className="flex w-full flex-col gap-7">
            <div className="social-link">
              <h2 className="font-medium text-white/70">E-mail</h2>
              <div className="my-2 h-px w-full bg-white/30" />
              <p className="text-xl lowercase tracking-wider md:text-2xl lg:text-3xl">
                shivamjmp2@gmail.com
              </p>
            </div>
            <div className="social-link">
              <h2 className="font-medium text-white/70">Phone</h2>
              <div className="my-2 h-px w-full bg-white/30" />
              <p className="text-xl lowercase md:text-2xl lg:text-3xl">
                +91 7362006858
              </p>
            </div>
            <div className="social-link">
              <h2 className="font-medium text-white/70">Social Media</h2>
              <div className="my-2 h-px w-full bg-white/30" />
              <div className="flex flex-wrap gap-2">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-xs leading-loose tracking-widest uppercase text-white/70 transition-colors duration-200 hover:text-gold md:text-sm"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee items={items} className="bg-transparent text-white" />
    </section>
  );
};

export default Contact;
