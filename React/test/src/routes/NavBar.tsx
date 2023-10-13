import { Link, useLocation } from "react-router-dom"

const NavBar = () => {
    const currentPath = useLocation().pathname;

    return (
        <div className="container">
        <header className="d-flex justify-content-center py-3">
          <ul className="nav nav-pills">
            <li className="nav-item"><Link to="/home" className={`nav-link ${currentPath === "/home" || currentPath === '/' ? "active" : ''}`}>Home</Link></li>
            <li className="nav-item"><Link to="/about" className={`nav-link ${currentPath === "/about"? "active" : ''}`}>About</Link></li>
            <li className="nav-item"><Link to="/pokemon" className={`nav-link ${currentPath === "/pokemon"? "active" : ''}`}>Pokemon</Link></li>
          </ul>
        </header>
      </div>
    )
  }
  
  export default NavBar