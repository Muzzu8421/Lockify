const Navbar = () => {
  return (
    <nav className="bg-teal-700 text-white px-4 sm:px-6 py-4 flex items-center gap-3 shadow-md">
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <rect x="4" y="11" width="16" height="9" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
      <span className="font-bold text-lg sm:text-xl tracking-widest">
        <span className="text-yellow-400">{`<`}</span>
        Lockify
        <span className="text-yellow-400">{`/>`}</span>
      </span>
    </nav>
  );
};

export default Navbar;
