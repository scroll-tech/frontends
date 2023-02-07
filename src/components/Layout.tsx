import { Link, Outlet } from "react-router-dom"

import { pathL1Explorer, pathL2Explorer, pathRollupExplorer } from "@/constants"

import "./Layout.css"

const Layout = () => {
  return (
    <div className="Layout">
      <nav className="RouterLinks">
        <Link to="/">Home</Link>

        <Link to={pathL1Explorer}>L1 Explorer</Link>

        <Link to={pathL2Explorer}>L2 Explorer</Link>

        <Link to={pathRollupExplorer}>Rollup Explorer</Link>
      </nav>

      <div className="Outlet">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
