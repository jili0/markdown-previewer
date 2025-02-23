import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const defaultMarkdown = [
    "# Welcome to my React Markdown Previewer!!!",
    "## This is an H2 heading",
    "This is a link to [my other projects](https://jingli.work)",
    "This is a code block:",
    "```",
    "const greeting = 'Hello, World!';",
    "console.log(greeting);",
    "```",
    "This is a blockquote:",
    "> To be, or not to be, that is the question.",
    "This is an image:",
    "![React Logo w/ Text](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)",
    "This is **bold** text",
    "This is a list:",
    "- Item A",
    "- Item B",
    "- Item C",
  ].join("\n");

  const [markdown, setMarkdown] = useState(
    () => localStorage.getItem("markdown") || defaultMarkdown
  ); //Verwende eine Lazy Initialization mit einer Funktion,dadurch wird localStorage.getItem("markdown") nur beim ersten Render aufgerufen.

  return (
    <AppContext.Provider value={{ markdown, setMarkdown }}>
      {children}
    </AppContext.Provider>
  );
};
