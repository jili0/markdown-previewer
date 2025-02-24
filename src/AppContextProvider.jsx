import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const defaultMarkdown = [
    "# Welcome to my React Markdown Previewer!",
    "## Here’s a sneak peek of some cool features you can use!",

    "### Links",
    "You can easily link to other websites. Here’s a link to my [other projects](https://jingli.work).",

    "### Code Snippet",
    "You can also display code in a neat block:",
    "```",
    "const greeting = 'Hello, World!';",
    "console.log(greeting);",
    "```",

    "### Blockquotes",
    "Blockquotes are great for emphasizing text or quoting others:",
    "> To be, or not to be, that is the question. - Shakespeare",

    "### Images",
    "You can add images too! Check out this React logo:",
    "![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)",

    "### Text Formatting",
    "Markdown allows you to format your text:",
    "- **Bold Text** makes things stand out.",
    "- *Italic Text* is perfect for emphasis.",
    "- `Code inline` is great for showing short snippets.",
    "- ~~Strikethrough~~ to show changes or corrections.",

    "### Lists",
    "Markdown supports both ordered and unordered lists:",
    "#### Unordered List:",
    "- Item A",
    "- Item B",
    "- Item C",

    "#### Ordered List:",
    "1. First item",
    "2. Second item",
    "3. Third item",

    "### Tables",
    "You can also create tables to organize your data:",
    "| Header 1 | Header 2 | Header 3 |",
    "|----------|----------|----------|",
    "| Row 1    | Data 1   | More data|",
    "| Row 2    | Data 2   | Even more|",

    "### Task Lists",
    "Checklists are easy to create:",
    "- [x] Task 1 (completed)",
    "- [ ] Task 2 (not done yet)",

    "### Horizontal Line",
    "Use a horizontal line to separate sections:",
    "***",

    "### Emoji Support",
    "You can even add some fun with emojis! :smile: :rocket: :fire:",

    "### Conclusion",
    "Now you can easily create well-structured and interactive documents with Markdown. Happy writing!",
  ].join("\n");

  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const [height, setHeight] = useState(1000);

  return (
    <AppContext.Provider value={{ markdown, setMarkdown, height, setHeight }}>
      {children}
    </AppContext.Provider>
  );
};
