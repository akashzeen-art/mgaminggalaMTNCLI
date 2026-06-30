import { createContext, useContext, useState, ReactNode } from 'react';

interface GameFullscreenContextType {
  isFullscreen: boolean;
  setIsFullscreen: (value: boolean) => void;
}

const GameFullscreenContext = createContext<GameFullscreenContextType>({
  isFullscreen: false,
  setIsFullscreen: () => {},
});

export function GameFullscreenProvider({ children }: { children: ReactNode }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  return (
    <GameFullscreenContext.Provider value={{ isFullscreen, setIsFullscreen }}>
      {children}
    </GameFullscreenContext.Provider>
  );
}

export function useGameFullscreen() {
  return useContext(GameFullscreenContext);
}
