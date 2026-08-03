const ConnectButton = () => {
  return (
    <a
      href="#contact"
      className="connect-btn connect-btn-glow group relative z-0 inline-flex items-center justify-center overflow-hidden rounded-full p-0.5 transition duration-300 hover:scale-105 active:scale-100"
    >
      <span className="connect-btn-inner relative z-10 flex w-full items-center justify-between rounded-full px-1.5 py-1.5 backdrop-blur sm:py-2">
        <span className="connect-btn-label relative z-20 pl-4 pr-5 text-sm font-semibold tracking-wide sm:text-base">
          Let&apos;s Connect
        </span>

        <span className="connect-btn-icon relative z-20 flex size-9 items-center justify-center overflow-hidden rounded-full transition-transform duration-500 sm:size-10 group-hover:bg-gold group-hover:text-black">
          <svg
            className="absolute h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[150%] group-hover:-translate-y-[150%]"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5 19L19 5M19 5v10m0-10H9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>

          <svg
            className="absolute h-4 w-4 -translate-x-[150%] translate-y-[150%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 group-hover:translate-y-0"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5 19L19 5M19 5v10m0-10H9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </span>
      </span>
    </a>
  );
};

export default ConnectButton;
