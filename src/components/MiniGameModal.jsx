import React, { useEffect, useMemo, useState } from "react";

const WORDS = ["MATH", "DRIVE", "NOTES", "PIXEL", "LOGIC", "ARRAY", "REACT"];
const GAME_ORDER = ["number", "word", "tetris"];
const TETRIS_ROWS = 12;
const TETRIS_COLS = 8;
const TETROMINOES = [
  { type: "i", shape: [[1, 1, 1, 1]] },
  {
    type: "o",
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    type: "t",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  {
    type: "l",
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
  {
    type: "j",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  {
    type: "s",
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  {
    type: "z",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
];

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function createSecretNumber() {
  return randomInt(10) + 1;
}

function createWordState() {
  return {
    secretWord: WORDS[randomInt(WORDS.length)],
    currentGuess: "",
    guesses: [],
    message: "Tebak kata bahasa Inggris 4-5 huruf. Semua kata dipilih random.",
    isWon: false,
    isLost: false,
  };
}

function createEmptyBoard() {
  return Array.from({ length: TETRIS_ROWS }, () => Array(TETRIS_COLS).fill(0));
}

function createPiece() {
  const tetromino = TETROMINOES[randomInt(TETROMINOES.length)];
  const startCol = Math.floor((TETRIS_COLS - tetromino.shape[0].length) / 2);
  return {
    row: 0,
    col: startCol,
    type: tetromino.type,
    shape: tetromino.shape,
  };
}

function rotateShape(shape) {
  return shape[0].map((_, colIndex) => shape.map((row) => row[colIndex]).reverse());
}

function canPlace(board, shape, row, col) {
  return shape.every((shapeRow, rowIndex) =>
    shapeRow.every((cell, colIndex) => {
      if (!cell) {
        return true;
      }

      const boardRow = row + rowIndex;
      const boardCol = col + colIndex;

      if (boardRow < 0 || boardRow >= TETRIS_ROWS || boardCol < 0 || boardCol >= TETRIS_COLS) {
        return false;
      }

      return board[boardRow][boardCol] === 0;
    }),
  );
}

function mergePiece(board, piece) {
  const nextBoard = board.map((row) => [...row]);
  piece.shape.forEach((shapeRow, rowIndex) => {
    shapeRow.forEach((cell, colIndex) => {
      if (!cell) {
        return;
      }
      const boardRow = piece.row + rowIndex;
      const boardCol = piece.col + colIndex;
      if (boardRow >= 0 && boardRow < TETRIS_ROWS && boardCol >= 0 && boardCol < TETRIS_COLS) {
        nextBoard[boardRow][boardCol] = piece.type;
      }
    });
  });
  return nextBoard;
}

function clearFullRows(board) {
  const keptRows = board.filter((row) => row.some((cell) => cell === 0));
  const cleared = TETRIS_ROWS - keptRows.length;
  const newRows = Array.from({ length: cleared }, () => Array(TETRIS_COLS).fill(0));
  return {
    board: [...newRows, ...keptRows],
    cleared,
  };
}

function movePiece(board, piece, direction) {
  const nextCol = piece.col + direction;
  if (!canPlace(board, piece.shape, piece.row, nextCol)) {
    return piece;
  }
  return { ...piece, col: nextCol };
}

function rotatePiece(board, piece) {
  const rotatedShape = rotateShape(piece.shape);
  if (canPlace(board, rotatedShape, piece.row, piece.col)) {
    return { ...piece, shape: rotatedShape };
  }

  if (canPlace(board, rotatedShape, piece.row, piece.col - 1)) {
    return { ...piece, col: piece.col - 1, shape: rotatedShape };
  }

  if (canPlace(board, rotatedShape, piece.row, piece.col + 1)) {
    return { ...piece, col: piece.col + 1, shape: rotatedShape };
  }

  return piece;
}

function getRandomGameId(exclude) {
  const options = GAME_ORDER.filter((gameId) => gameId !== exclude);
  return options[randomInt(options.length)];
}

function NumberGame({ active, launchMode }) {
  const [secretNumber, setSecretNumber] = useState(createSecretNumber);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Tebak angka dari 1 sampai 10.");
  const [attempts, setAttempts] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    if (!active) {
      return;
    }

    setSecretNumber(createSecretNumber());
    setGuess("");
    setAttempts(0);
    setIsWon(false);
    setMessage(
      launchMode === "list"
        ? "Game tebak angka dipilih dari My List. Tebak angka dari 1 sampai 10."
        : "Play memilih Number Hunt. Tebak angka dari 1 sampai 10.",
    );
  }, [active, launchMode]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const numericGuess = Number(guess);

    if (!numericGuess || numericGuess < 1 || numericGuess > 10) {
      setMessage("Masukkan angka valid dari 1 sampai 10.");
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (numericGuess === secretNumber) {
      setIsWon(true);
      setMessage(`Benar. Kamu menebak dalam ${nextAttempts} percobaan.`);
      return;
    }

    setMessage(
      numericGuess < secretNumber
        ? "Terlalu kecil. Coba angka yang lebih besar."
        : "Terlalu besar. Coba angka yang lebih kecil.",
    );
  };

  const handleReset = () => {
    setSecretNumber(createSecretNumber());
    setGuess("");
    setAttempts(0);
    setIsWon(false);
    setMessage("Game di-reset. Tebak angka dari 1 sampai 10.");
  };

  return (
    <div className="game-panel">
      <p className="game-modal__eyebrow">A-FLIX Arcade</p>
      <h2 id="game-title" className="game-modal__title">Number Hunt</h2>
      <form className="game-modal__form" onSubmit={handleSubmit}>
        <input
          className="game-modal__input"
          type="number"
          min="1"
          max="10"
          inputMode="numeric"
          value={guess}
          onChange={(event) => setGuess(event.target.value)}
          placeholder="1 - 10"
        />
        <button type="submit" className="game-modal__action game-modal__action--primary">
          Tebak
        </button>
        <button type="button" className="game-modal__action" onClick={handleReset}>
          Reset
        </button>
      </form>
      <p className={`game-modal__status ${isWon ? "is-win" : ""}`}>{message}</p>
      <p className="game-modal__attempts">Percobaan: {attempts}</p>
    </div>
  );
}

function getLetterStatus(letter, secretWord, currentGuess, isSubmitted) {
  if (!isSubmitted) {
    return "pending";
  }
  if (secretWord[letter.index] === letter.char) {
    return "correct";
  }
  if (secretWord.includes(letter.char)) {
    return "present";
  }
  return "absent";
}

function WordGame({ active, launchMode }) {
  const [state, setState] = useState(createWordState);

  useEffect(() => {
    if (!active) {
      return;
    }
    setState((prev) => {
      const next = createWordState();
      return {
        ...next,
        message:
          launchMode === "list"
            ? "Word Guess dipilih dari My List. Kamu punya 6 percobaan."
            : "Play memilih Word Guess. Kamu punya 6 percobaan.",
        secretWord: next.secretWord ?? prev.secretWord,
      };
    });
  }, [active, launchMode]);

  const secretLength = state.secretWord.length;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (state.isWon || state.isLost) {
      return;
    }

    const guess = state.currentGuess.trim().toUpperCase();
    if (guess.length !== secretLength) {
      setState((prev) => ({
        ...prev,
        message: `Kata harus ${secretLength} huruf.`,
      }));
      return;
    }

    const nextGuesses = [...state.guesses, guess];
    const isWon = guess === state.secretWord;
    const isLost = !isWon && nextGuesses.length >= 6;

    setState((prev) => ({
      ...prev,
      guesses: nextGuesses,
      currentGuess: "",
      isWon,
      isLost,
      message: isWon
        ? "Benar. Kamu menebak kata dengan tepat."
        : isLost
          ? `Percobaan habis. Jawabannya ${prev.secretWord}.`
          : `Percobaan ${nextGuesses.length}/6 terkunci.`,
    }));
  };

  const handleReset = () => {
    setState(createWordState());
  };

  return (
    <div className="game-panel">
      <p className="game-modal__eyebrow">A-FLIX Arcade</p>
      <h2 id="game-title" className="game-modal__title">Word Guess</h2>
      <div className="word-grid" aria-label="Word Guess board">
        {Array.from({ length: 6 }, (_, rowIndex) => {
          const guess = state.guesses[rowIndex] ?? "";
          const isSubmitted = rowIndex < state.guesses.length;
          const preview = !guess && rowIndex === state.guesses.length ? state.currentGuess.toUpperCase() : guess;

          return (
            <div
              key={rowIndex}
              className="word-grid__row"
              style={{ gridTemplateColumns: `repeat(${secretLength}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: secretLength }, (_, colIndex) => {
                const char = preview[colIndex] ?? "";
                const status = getLetterStatus(
                  { char, index: colIndex },
                  state.secretWord,
                  state.currentGuess,
                  isSubmitted,
                );
                return (
                  <div key={`${rowIndex}-${colIndex}`} className={`word-grid__cell is-${status}`}>
                    {char}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <form className="game-modal__form" onSubmit={handleSubmit}>
        <input
          className="game-modal__input"
          type="text"
          maxLength={secretLength}
          value={state.currentGuess}
          onChange={(event) =>
            setState((prev) => ({
              ...prev,
              currentGuess: event.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase(),
            }))
          }
          placeholder={`Ketik ${secretLength} huruf`}
        />
        <button type="submit" className="game-modal__action game-modal__action--primary">
          Submit
        </button>
        <button type="button" className="game-modal__action" onClick={handleReset}>
          Kata Baru
        </button>
      </form>
      <p className={`game-modal__status ${state.isWon ? "is-win" : ""}`}>{state.message}</p>
    </div>
  );
}

function TetrisGame({ active, launchMode }) {
  const [board, setBoard] = useState(createEmptyBoard);
  const [piece, setPiece] = useState(createPiece);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("Susun blok yang jatuh dan kosongkan baris penuh.");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (!active) {
      return;
    }
    setBoard(createEmptyBoard());
    setPiece(createPiece());
    setScore(0);
    setIsGameOver(false);
    setStatus(
      launchMode === "list"
        ? "Mini Tetris dipilih dari My List. Gunakan tombol kiri dan kanan."
        : "Play memilih Mini Tetris. Gunakan tombol kiri dan kanan.",
    );
  }, [active, launchMode]);

  useEffect(() => {
    if (!active || isGameOver) {
      return;
    }

    const timer = window.setInterval(() => {
      setPiece((currentPiece) => {
        const nextRow = currentPiece.row + 1;

        if (canPlace(board, currentPiece.shape, nextRow, currentPiece.col)) {
          return { ...currentPiece, row: nextRow };
        }

        setBoard((prevBoard) => {
          const merged = mergePiece(prevBoard, currentPiece);
          const { board: clearedBoard, cleared } = clearFullRows(merged);
          if (cleared > 0) {
            setScore((prev) => prev + cleared * 10);
            setStatus(`Mantap. ${cleared} baris berhasil dibersihkan.`);
          }

          const nextPiece = createPiece();
          if (!canPlace(clearedBoard, nextPiece.shape, nextPiece.row, nextPiece.col)) {
            setIsGameOver(true);
            setStatus("Game over. Board sudah penuh.");
          } else {
            setPiece(nextPiece);
          }

          return clearedBoard;
        });

        return currentPiece;
      });
    }, 550);

    return () => window.clearInterval(timer);
  }, [active, board, isGameOver, launchMode]);

  useEffect(() => {
    if (!active || isGameOver) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        setPiece((currentPiece) => movePiece(board, currentPiece, -1));
      }

      if (event.key === "ArrowRight") {
        setPiece((currentPiece) => movePiece(board, currentPiece, 1));
      }

      if (event.key === "ArrowUp") {
        setPiece((currentPiece) => rotatePiece(board, currentPiece));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, board, isGameOver]);

  const displayBoard = useMemo(() => {
    if (isGameOver) {
      return board;
    }
    return mergePiece(board, piece);
  }, [board, piece, isGameOver]);

  const handleMove = (direction) => {
    if (isGameOver) {
      return;
    }
    setPiece((currentPiece) => movePiece(board, currentPiece, direction));
  };

  const handleRotate = () => {
    if (isGameOver) {
      return;
    }
    setPiece((currentPiece) => rotatePiece(board, currentPiece));
  };

  const handleReset = () => {
    setBoard(createEmptyBoard());
    setPiece(createPiece());
    setScore(0);
    setIsGameOver(false);
    setStatus("Board baru siap. Susun blok dan bersihkan baris.");
  };

  return (
    <div className="game-panel">
      <p className="game-modal__eyebrow">A-FLIX Arcade</p>
      <h2 id="game-title" className="game-modal__title">Mini Tetris</h2>
      <div className="tetris-board" aria-label="Mini Tetris board">
        {displayBoard.map((row, rowIndex) => (
          <div key={rowIndex} className="tetris-board__row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`tetris-board__cell ${cell ? `is-filled is-${cell}` : ""}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="game-modal__actions">
        <button type="button" className="game-modal__action" onClick={() => handleMove(-1)}>
          Left
        </button>
        <button type="button" className="game-modal__action" onClick={() => handleMove(1)}>
          Right
        </button>
        <button type="button" className="game-modal__action" onClick={handleRotate}>
          Rotate
        </button>
        <button type="button" className="game-modal__action game-modal__action--primary" onClick={handleReset}>
          Restart
        </button>
      </div>
      <p className="game-modal__status">{status}</p>
      <p className="game-modal__attempts">Score: {score}</p>
    </div>
  );
}

const GAME_META = {
  number: {
    title: "Number Hunt",
  },
  word: {
    title: "Word Guess",
  },
  tetris: {
    title: "Mini Tetris",
  },
};

export default function MiniGameModal({ isOpen, mode, gameId, onClose, onSelectGame }) {
  const selectedGameId = gameId ?? "number";

  if (!isOpen) {
    return null;
  }

  return (
    <div className="game-modal" role="dialog" aria-modal="true" aria-labelledby="game-title">
      <div className="game-modal__backdrop" onClick={onClose} />
      <section className="game-modal__panel">
        <button type="button" className="game-modal__close" onClick={onClose} aria-label="Close game">
          x
        </button>

        {mode === "list" && !gameId ? (
          <div className="game-panel">
            <p className="game-modal__eyebrow">A-FLIX Arcade</p>
            <h2 id="game-title" className="game-modal__title">
              My List
            </h2>
            <div className="game-list">
              {GAME_ORDER.map((id) => (
                <button
                  key={id}
                  type="button"
                  className="game-list__item"
                  onClick={() => onSelectGame(id)}
                >
                  <span className="game-list__title">{GAME_META[id].title}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {selectedGameId === "number" && gameId ? <NumberGame active={isOpen} launchMode={mode} /> : null}
        {selectedGameId === "word" && gameId ? <WordGame active={isOpen} launchMode={mode} /> : null}
        {selectedGameId === "tetris" && gameId ? <TetrisGame active={isOpen} launchMode={mode} /> : null}
      </section>
    </div>
  );
}

export { getRandomGameId };
