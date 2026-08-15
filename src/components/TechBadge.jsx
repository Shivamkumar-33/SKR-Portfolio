const TechBadge = ({ icon: Icon, label }) => {
  return (
    <span className="tech-badge inline-flex items-center gap-1.5 rounded-full border border-[var(--theme-border-soft)] bg-[var(--theme-chip-bg)] px-2.5 py-1 text-xs text-[var(--theme-text-secondary)] backdrop-blur-sm transition-colors duration-300 md:text-sm">
      {Icon ? (
        <Icon className="tech-badge-icon size-3.5 shrink-0 text-[var(--theme-text-secondary)] transition-colors duration-300 md:size-4" aria-hidden />
      ) : null}
      <span>{label}</span>
    </span>
  );
};

export default TechBadge;
