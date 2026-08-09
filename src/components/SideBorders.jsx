const SideBorders = () => {
  return (
    <div className="side-borders" aria-hidden="true">
      <div className="side-border side-border--left">
        <div className="side-border__fill" />
        <div className="side-border__pattern" />
        <div className="side-border__line" />
        <div className="side-border__edge" />
      </div>

      <div className="side-border side-border--right">
        <div className="side-border__fill" />
        <div className="side-border__pattern" />
        <div className="side-border__line" />
        <div className="side-border__edge" />
      </div>
    </div>
  );
};

export default SideBorders;
