'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { iconStyle } from './FooterNav';

function Header() {
  const { data: session } = useSession();

  return (
    <div className=" fixed top-0 left-0 w-full py-3 px-4 bg-white h-16 flex justify-between items-center z-50 ">
      <h1 className="uppercase flex items-center font-bold text-[#165f77] text-2xl md:text-4xl ">
        Staff <span className=" text-gray-700 ml-1 "> Only</span>
      </h1>
      {session?.user && (
        <span className="hover:opacity-50 cursor-pointer">
          <FiLogOut
            className={iconStyle}
            onClick={() =>
              signOut({
                callbackUrl: '/',
              })
            }
          />
        </span>
      )}
    </div>
  );
}

export default Header;
