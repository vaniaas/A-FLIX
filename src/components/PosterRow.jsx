import React from "react";

export default function PosterRow({ title, items }) {
  return (
    <section className="row">
      <div className="row__heading">
        <h2>{title}</h2>
      </div>
      <div className="row__posters">
        {items.map((item) => (
          <article key={item.title} className="poster-card">
            <img className="row__poster row__posterLarge" src={item.image} alt={item.title} />
          </article>
        ))}
      </div>
    </section>
  );
}
