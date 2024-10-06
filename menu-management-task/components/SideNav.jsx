"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bars3Icon,
  FolderIcon,
  UsersIcon,
  Squares2X2Icon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Logo from "./Logo";

export default function SideNav({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isActiveTab, setIsActiveTab] = useState("menus");
  const router = useRouter();
  const handleTabChange = (tab) => {
    setIsActiveTab(tab);
    router.push(`/navigate/${tab}`);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-gray-900 h-screen transition-all duration-300 rounded-3xl p-2.5 h-auto`}
      >
        <div className="flex items-center justify-between p-4 text-white">
          <Logo
            className={`${isOpen ? "text-xl font-bold" : "hidden"}`}
            onClick={() => setIsOpen(!isOpen)}
          />
          {!isOpen && (
            <Bars3Icon
              onClick={() => setIsOpen(!isOpen)}
              className="h-6 w-6 text-white cursor-pointer"
            />
          )}
        </div>

        <nav className="mt-5">
          <ul>
            <div className={`${isOpen ? "bg-gray-800 rounded-2xl p-2.5" : ""}`}>
              <li
                className={`${
                  isActiveTab === "systems"
                    ? "bg-lime-400 text-black rounded-xl"
                    : "text-white"
                } group flex items-center space-x-4 py-2 px-4 cursor-pointer`}
                onClick={() => handleTabChange("systems")}
              >
                <FolderIcon
                  className={`${
                    isActiveTab === "systems"
                      ? "text-black"
                      : " text-white group-hover:text-white"
                  } h-6 w-6`}
                />
                <span className={`${isOpen ? "block" : "hidden"}`}>
                  Systems
                </span>
              </li>
              <li
                className={`${
                  isActiveTab === "systemscode"
                    ? "bg-lime-400 text-black rounded-xl"
                    : "text-gray-400"
                } group flex items-center space-x-4 py-2 px-4 cursor-pointer cursor-pointer`}
                onClick={() => handleTabChange("systemscode")}
              >
                <Squares2X2Icon
                  className={`${
                    isActiveTab === "systemscode"
                      ? "text-black"
                      : "text-gray-400 group-hover:text-white"
                  } h-6 w-6 `}
                />
                <span className={`${isOpen ? "block" : "hidden"}`}>
                  System Code
                </span>
              </li>
              <li
                className={`${
                  isActiveTab === "properties"
                    ? "bg-lime-400 text-black rounded-xl"
                    : "text-gray-400"
                } group flex items-center space-x-4 py-2 px-4 cursor-pointer`}
                onClick={() => handleTabChange("properties")}
              >
                <Squares2X2Icon
                  className={`${
                    isActiveTab === "properties"
                      ? "text-black"
                      : "text-gray-400 group-hover:text-white"
                  } h-6 w-6`}
                />
                <span className={`${isOpen ? "block" : "hidden"}`}>
                  Properties
                </span>
              </li>
              <li
                className={`${
                  isActiveTab === "menus"
                    ? "bg-lime-400 text-black rounded-xl"
                    : "text-white"
                } group flex items-center space-x-4 py-2 px-4 rounded-md cursor-pointer`}
                onClick={() => handleTabChange("menus")}
              >
                <Squares2X2Icon
                  className={` ${
                    isActiveTab === "menus" ? "text-black" : "text-white"
                  } h-6 w-6`}
                />
                <span className={`${isOpen ? "block" : "hidden"}`}>Menus</span>
              </li>
              <li
                className={`${
                  isActiveTab === "apilist"
                    ? "bg-lime-400 text-black rounded-xl"
                    : "text-gray-400"
                } group flex items-center space-x-4 py-2 px-4 cursor-pointer`}
                onClick={() => handleTabChange("apilist")}
              >
                <Squares2X2Icon
                  className={`${
                    isActiveTab === "apilist"
                      ? "text-black"
                      : "text-gray-400 group-hover:text-white"
                  } h-6 w-6 `}
                />
                <span className={`${isOpen ? "block" : "hidden"}`}>
                  API List
                </span>
              </li>
            </div>
            <li
              className={`${
                isActiveTab === "usersgroup"
                  ? "bg-lime-400 text-black rounded-xl"
                  : "text-gray-400"
              } group flex items-center space-x-4 py-2 px-4 cursor-pointer`}
              onClick={() => handleTabChange("usersgroup")}
            >
              <UsersIcon
                className={`${
                  isActiveTab === "usersgroup"
                    ? "text-black"
                    : "text-gray-400 group-hover:text-white"
                } h-6 w-6 `}
              />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                Users & Group
              </span>
            </li>
            <li
              className={`${
                isActiveTab === "competition"
                  ? "bg-lime-400 text-black rounded-xl"
                  : "text-gray-400"
              } group flex items-center space-x-4 py-2 px-4 cursor-pointer`}
              onClick={() => handleTabChange("competition")}
            >
              <FolderIcon
                className={`${
                  isActiveTab === "competition"
                    ? "text-black"
                    : "text-gray-400 group-hover:text-white"
                } h-6 w-6 `}
              />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                Competition
              </span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        <main className="flex-1 p-6 text-black">{children}</main>
      </div>
    </div>
  );
}
