import React from "react";
import { assetPath } from "../lib/assets";

export default function LibraryGrid({ page }) {
  return (
    <main className="library">
      <section className="library__hero">
        <h1 className="library__title">{page.label}</h1>
      </section>

      <section className="image-grid" aria-label={`${page.label} folders`}>
        {page.items.map((item) => (
          <a
            key={item.title}
            className="folder-card"
            href={item.href}
            target="_blank"
            rel="noreferrer"
          >
            <div className="folder-card__art">
              <img src={assetPath("images/folder.png")} alt={`Folder ${item.title}`} />
            </div>
            <div className="folder-card__body">
              <h2 className="folder-card__title">{item.title}</h2>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
