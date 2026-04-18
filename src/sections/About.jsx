import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { socials } from "../constants";

const aboutBlocks = [
  {
    primary: "Debugging across\nthe stack",
    secondary: "Frontend to backend",
  },
  {
    primary: "Turning coffee into",
    secondary: "Production-ready code",
  },
  {
    primary: "Late-night coding\nfueled",
    secondary: "By curiosity and creativity",
  },
];

const About = () => {
  const imageFrameRef = useRef(null);

  const text = `Passionate about clean architecture and scalable system design
Building high-performance applications that grow from prototype to production`;

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imageFrameRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });

    gsap.to(imageFrameRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imageFrameRef.current },
    });
  }, []);

  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-stretch gap-8 px-6 pb-10 lg:flex-row lg:gap-12 lg:px-10">
        <div className="mx-auto w-full max-w-[340px] lg:mx-0 lg:max-w-[440px]">
          <div ref={imageFrameRef} className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
            <img
              src="images/man.jpg"
              alt="Shivam Kumar"
              className="h-full w-full rounded-[1.7rem] object-cover"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-6 font-light uppercase lg:gap-7">
          {aboutBlocks.map((block) => (
            <div
              key={block.secondary}
              className="border-b border-white/20 pb-3 last:border-b-0 last:pb-0"
            >
              <p className="whitespace-pre-line text-[1.55rem] font-medium leading-[1.08] tracking-[0.015em] text-white md:text-[2.35rem]">
                {block.primary}
              </p>
              <p className="mt-2 text-[1.1rem] font-medium leading-tight tracking-[0.015em] text-white/45 md:text-[1.7rem]">
                {block.secondary}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-5 border-t border-white/20 px-10 py-8 sm:flex-row sm:gap-7">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/75 transition-colors duration-300 hover:border-gold hover:text-white"
            >
              {social.name}
            </a>
          ))}
        </div>

        <a
          href="/resume.pdf"
          download
          className="border border-gold bg-gold px-6 py-3 text-xs uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-transparent hover:text-gold"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default About;