import React, { createContext, useContext, useState } from 'react';

type CursorContextType = {
  cursorText: string;
  cursorVariant: string;
  setCursorText: (text: string) => void;
  setCursorVariant: (variant: string) => void;
};

const CursorContext = createContext<CursorContextType>({
  cursorText: '',
  cursorVariant: 'default',
  setCursorText: () => {},
  setCursorVariant: () => {},
});

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');

  return (
    <CursorContext.Provider
      value={{
        cursorText,
        cursorVariant,
        setCursorText,
        setCursorVariant,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);

export const useCursorHandlers = (
  variant: string,
  text: string = ''
) => {
  const { setCursorText, setCursorVariant } = useCursor();

  return {
    onMouseEnter: () => {
      setCursorText(text);
      setCursorVariant(variant);
    },
    onMouseLeave: () => {
      setCursorText('');
      setCursorVariant('default');
    },
  };
};