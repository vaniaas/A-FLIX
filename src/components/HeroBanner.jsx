import React from "react";

export default function HeroBanner({ content, onPlay, onMyList }) {
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `linear-gradient(77deg, rgba(0, 0, 0, 0.84), rgba(0, 0, 0, 0.28)), url("${content.backgroundImage}")`,
      }}
    >
      <div className="banner__contents">
        <p className="banner__eyebrow">A-FLIX ORIGINAL</p>
        <h1 className="banner__title">{content.title}</h1>
        <div className="banner__buttons">
          <button className="banner__button banner__button--primary" type="button" onClick={onPlay}>
            Play
          </button>
          <button className="banner__button" type="button" onClick={onMyList}>
            My List
          </button>
        </div>
        <p className="banner__description">{content.description}</p>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}
