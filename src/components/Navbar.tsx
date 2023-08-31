import classNames from "classnames"
import React, { PropsWithChildren, useState} from "react"
import Sidebar from "./Sidebar"
import { Bars3Icon} from "@heroicons/react/24/outline"


const Navbar = (props: PropsWithChildren) => {
    const [collapsed, setSidebarCollapsed] = useState(false)
    return (
        <div className={classNames({
            "grid min-h-screen": true,
            "grid-cols-sidebar": !collapsed,
            "grid-cols-sidebar-collapsed": collapsed,
            "transition-[grid-template-columns] duration-300 ease-in-out": true,
        })}
        >
            {/* Sidebar */}
            <Sidebar 
                collapsed={collapsed}
                setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
            />
            {/* Content */}
            <div>{props.children}</div>
        </div>
    )
}

export default Navbar;