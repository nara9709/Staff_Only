'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { BsCalendarWeek, BsCalendarWeekFill } from 'react-icons/bs';
import { RiSearch2Line, RiSearch2Fill } from 'react-icons/ri';
import { HiLogin } from 'react-icons/hi';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Avatar from './UI/Avatar';

export const iconStyle = 'w-6 h-6';

function FooterNav() {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const navMenus = [
    {
      title: '휴게실',
      icon: <AiOutlineHome className={iconStyle} />,
      clickedIcon: <AiFillHome fill="#176B87" className={iconStyle} />,
      href: '/',
    },
    {
      title: '알바달력',
      icon: <BsCalendarWeek className={iconStyle} />,
      clickedIcon: <BsCalendarWeekFill fill="#176B87" className={iconStyle} />,
      href: '/calendar',
    },
    {
      title: '북마크',
      icon: <RiSearch2Line className={iconStyle} />,
      clickedIcon: <RiSearch2Fill fill="#176B87" className={iconStyle} />,
      href: '/bookmarks',
    },
  ];

  return (
    <div className="fixed left-0 right-0 bottom-0 h-20 bg-white z-10">
      <ul className="flex p-3 pl-6 pr-6 justify-between">
        {navMenus.map((nav, index) => (
          <Link href={nav.href} key={index}>
            <li key={nav.href} className=" flex flex-col items-center">
              <p> {pathName === nav.href ? nav.clickedIcon : nav.icon}</p>
              <p className="text-xs md:text-lg mt-1">{nav.title}</p>
            </li>
          </Link>
        ))}

        {/* 로그인한 유저가 있다면 유저 아바타를, 없다면 로그인 아이콘을 보여줌 */}
        {session?.user ? (
          <Link href={'/profile'}>
            <li>
              <Avatar
                image={user?.image as string}
                name={user?.name as string}
                size="md"
              />
            </li>
          </Link>
        ) : (
          <Link href="/login">
            <li>
              <p>
                <HiLogin className={iconStyle} />
              </p>
              <p className="text-xs md:text-lg mt-1">로그인</p>
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
}

export default FooterNav;
