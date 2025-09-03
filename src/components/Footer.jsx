import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-teal-700 absolute bottom-0">
      <div className="flex flex-col items-center justify-center mb-2">

        <span className="font-bold text-white text-lg sm:text-xl tracking-widest">
          <span className="text-yellow-400">{`<`}</span>
          Lockify
          <span className="text-yellow-400">{`/>`}</span>
        </span>

        <div className="flex items-center justify-center font-semibold text-white text-base">
          Made with
          <span className="mx-1.5 text-red-500 text-2xl">♥</span>
          by Muzakkir
        </div>
      </div>
    </footer>
  );
};

export default Footer;
