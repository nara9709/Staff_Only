import React from 'react';

function Header() {
  return (
    <div className="py-3 px-4 bg-white h-16 flex">
      <h1 className="uppercase flex items-center font-bold text-blue-950 text-2xl md:text-4xl ">
        Staff <span className=" text-gray-700 ml-1 "> Only</span>
      </h1>
    </div>
  );
}

export default Header;
