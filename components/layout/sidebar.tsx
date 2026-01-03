"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  //  menus
  const menus = [
    { label: "Home", icon: "/home.svg", href: "/" },
    { label: "My Playlists", icon: "/playlists.svg", href: "/playlists" },
    { label: "My Youtube", icon: "/youtube.svg", href: "/youtube" },
    { label: "Search", icon: "/search.svg", href: "/search" },
  ];

  //  current path
  const pathname = usePathname();

  return (
    <aside className={`${isExpanded ? "w-64" : "w-16"} transition-all duration-300 p-4 bg-gray-100 shadow-lg z-10`}>
      <button onClick={ () => setIsExpanded( prev => !prev ) }>
        <img className="w-12 h-12 rounded-full" src="/lisuu_logo.png" />
      </button>
      <nav>
        <ul>
          { menus.map((menu) => (
            <li key={menu.label} className={`hover:bg-gray-200 ${pathname === menu.href ? "bg-blue-200" : ""} rounded-md mb-2`}>
              <Link className="flex p-2" href={menu.href}>
                <span><img className="w-6 h-6 mr-4" src={menu.icon} /></span>
                <span
                  className={`
                    transition-all duration-400 ease-in-out whitespace-nowrap
                    ${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 pointer-events-none"}
                  `}
                >
                  {menu.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};