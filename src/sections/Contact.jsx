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
      y: 24,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: ".social-link",
        start: "top 96%",
        once: true,
      },
    });
  }, []);
  return (
    <section
      id="contact"
      className="flex flex-col justify-between bg-black px-6 py-16 sm:px-10 sm:py-20"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"You Dream It, I Code it"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        <div className="flex px-0 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-8">
          <div className="flex flex-col w-full gap-10">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                shivamjmp2@gmail.com
              </p>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl lowercase md:text-2xl lg:text-3xl">
                +91 7362006858
              </p>
            </div>
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-2">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-xs leading-loose tracking-widest uppercase md:text-sm hover:text-white/80 transition-colors duration-200"
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
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
