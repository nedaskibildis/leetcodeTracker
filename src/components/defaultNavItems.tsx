import React from "react"
import {
    FolderIcon,
    HomeIcon,
    UserGroupIcon,
}
from "@heroicons/react/24/outline"

export type NavItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
}

export const defaultNavItems: NavItem[] = [
    {
        label: "Home",
        href: "/",
        icon: <HomeIcon className="w-6 h-6"/>
    },
    {
        label: "DataSets",
        href: "/datasets",
        icon: <FolderIcon className="w-6 h-6"/>
    },
    {
        label: "UserStats",
        href: "/userStats",
        icon: <UserGroupIcon className="w-6 h-6"/>
    }

]