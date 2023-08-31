import React from "react";
import cn from "classnames";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

import { defaultNavItems, NavItem } from "./defaultNavItems";
import classNames from "classnames";

// 👇 props to get and set the collapsed state from parent component
type Props = {
  collapsed: boolean;
  navItems?: NavItem[]
  setCollapsed(collapsed: boolean): void;
};
const Sidebar = ({ collapsed, navItems = defaultNavItems, setCollapsed }: Props) => {
  // 👇 use the correct icon depending on the state.
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  return (
    <div
      className={cn({
        "bg-indigo-700 text-zinc-50 z-20": true,
      })}
    >
      <div
        className={cn({
          "flex flex-col justify-between": true,
        })}
      >
        {/* logo and collapse button */}
        <div
          className={cn({
            "flex items-center border-b border-b-indigo-800": true,
            "p-4 justify-between": !collapsed,
            "py-4 justify-center": collapsed,
          })}
        >
          {!collapsed && <span className="whitespace-nowrap">Leetcode Tracker</span>}
          <button
            className={cn({
              "grid place-content-center": true, // position
              "hover:bg-indigo-800 ": true, // colors
              "w-10 h-10 rounded-full": true, // shape
            })}
            // 👇 set the collapsed state on click
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-grow">
            <ul className={classNames({
                "my-2 flex flex-col gap-2 items-stretch": true,
            })}
            >
                {navItems.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className={classNames({
                                "text-indigo-100 hover:bg-indigo-900 flex": true,
                                "transition-colors duration-300": true,
                                "rounded-md p-2 mx-3 gap-4": !collapsed,
                                "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                            })}
                        >
                            <a href={item.href} className="flex gap-2">
                                {item.icon} <span>{!collapsed && item.label}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;