import React from "react";

export default function Navbar({ pages, currentPage, onNavigate }) {
  return (
    <nav className="nav">
      <button
        type="button"
        className="nav__brand"
        onClick={() => onNavigate("home")}
        aria-label="Go to A-FLIX home"
      >
        <img className="nav__logo" src="/images/logo.png" alt="A-FLIX" />
      </button>
      <div className="nav__links">
        {pages.map((page) => (
          <button
            key={page.id}
            type="button"
            className={`nav__link ${currentPage === page.id ? "is-active" : ""}`}
            onClick={() => onNavigate(page.id)}
          >
            {page.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
