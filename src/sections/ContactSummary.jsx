import Marquee from "../components/Marquee";

const ContactSummary = () => {
  const items = [
    "Innovation",
    "Precision",
    "Trust",
    "Collaboration",
    "Excellence",
  ];
  const items2 = [
    "contact",
    "contact",
    "contact",
    "contact",
    "contact",
  ];

  return (
    <section
      className="flex flex-col items-center justify-between gap-10 bg-transparent px-6 py-16 text-white sm:px-10 sm:py-20 relative z-10"
    >
      <Marquee items={items} />
      <div className="overflow-hidden font-light text-center contact-text-responsive">
        <p>
          “ Let’s build a <br />
          <span className="font-normal">memorable</span> &{" "}
          <span className="italic">inspiring</span> <br />
          web application <span className="text-white">together</span> “
        </p>
      </div>
      <Marquee
        items={items2}
        reverse={true}
        className="text-white/70 bg-transparent border-y-2 border-white/20"
        iconClassName="stroke-white/70 stroke-2 text-white/70"
        icon="material-symbols-light:square"
      />
    </section>
  );
};

export default ContactSummary;
