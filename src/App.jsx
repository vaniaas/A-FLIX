import React, { useEffect, useState } from "react";
import HeroBanner from "./components/HeroBanner";
import LibraryGrid from "./components/LibraryGrid";
import MiniGameModal, { getRandomGameId } from "./components/MiniGameModal";
import Navbar from "./components/Navbar";
import PosterRow from "./components/PosterRow";
import { heroContent, libraries, originals } from "./data/content";

const defaultPage = "home";

function getPageFromHash() {
  const page = window.location.hash.replace("#/", "");
  return libraries.some((entry) => entry.id === page) ? page : defaultPage;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);
  const [gameState, setGameState] = useState({ isOpen: false, mode: null, gameId: null });

  useEffect(() => {
    const onHashChange = () => setCurrentPage(getPageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleNavigate = (pageId) => {
    window.location.hash = pageId === defaultPage ? "/" : `/${pageId}`;
  };

  const activePage = libraries.find((page) => page.id === currentPage) ?? libraries[0];

  const handleOpenRandomGame = () => {
    setGameState((prev) => ({
      isOpen: true,
      mode: "play",
      gameId: getRandomGameId(prev.gameId),
    }));
  };

  const handleOpenList = () => {
    setGameState({
      isOpen: true,
      mode: "list",
      gameId: null,
    });
  };

  const handleSelectGame = (gameId) => {
    setGameState((prev) => ({
      ...prev,
      gameId,
    }));
  };

  return (
    <div className="app-shell">
      <Navbar pages={libraries} currentPage={currentPage} onNavigate={handleNavigate} />
      <MiniGameModal
        isOpen={gameState.isOpen}
        mode={gameState.mode}
        gameId={gameState.gameId}
        onClose={() => setGameState({ isOpen: false, mode: null, gameId: null })}
        onSelectGame={handleSelectGame}
      />
      {currentPage === "home" ? (
        <>
          <HeroBanner
            content={heroContent}
            onPlay={handleOpenRandomGame}
            onMyList={handleOpenList}
          />
          <main className="content">
            <PosterRow title="A-FLIX ORIGINALS" items={originals} />
          </main>
        </>
      ) : (
        <LibraryGrid page={activePage} />
      )}
    </div>
  );
}
