import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between bg-filmflix-accent3 text-white h-20 fixed top-0 left-0 w-full z-10 px-6">
      <div className="flex items-center gap-12">
        <a href="/explore">
          <h1 className="text-2xl text-filmflix-main font-bold">FilmFlix</h1>
        </a>
        <a href="/explore">Explore</a>
        <a href="/library">Library</a>
        <a href="/recommendations">Recommendations</a>
      </div>

      <div>
        <a href="/login" className="text-white">
          Log In
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
