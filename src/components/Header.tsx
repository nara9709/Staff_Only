'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { iconStyle } from './FooterNav';

function Header() {
  const { data: session } = useSession();

  return (
    <div className="py-3 px-4 bg-white h-16 flex justify-between items-center">
      <h1 className="uppercase flex items-center font-bold text-blue-950 text-2xl md:text-4xl ">
        Staff <span className=" text-gray-700 ml-1 "> Only</span>
      </h1>
      {session?.user && (
        <span>
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
