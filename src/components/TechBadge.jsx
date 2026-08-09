const TechBadge = ({ icon: Icon, label }) => {
  return (
    <span className="tech-badge inline-flex items-center gap-2.5 rounded-full border border-[var(--theme-border-soft)] bg-[var(--theme-chip-bg)] px-4 py-2 text-[0.95rem] text-[var(--theme-text-secondary)] backdrop-blur-sm transition-colors duration-300">
      {Icon ? (
        <Icon className="tech-badge-icon size-5 shrink-0 text-[#BFA181] transition-colors duration-300" aria-hidden />
      ) : null}
      <span>{label}</span>
    </span>
  );
};

export default TechBadge;
