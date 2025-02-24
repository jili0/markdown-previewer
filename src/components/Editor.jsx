import { useContext, useRef, useEffect } from "react";
import { AppContext } from "../AppContextProvider";

const Editor = () => {
  const { markdown, setMarkdown } = useContext(AppContext);
  const textareaRef = useRef();

  useEffect(() => {
    // Adjust height on initial load
    if (textareaRef.current) {
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 100
      }px`;
    }
  }, []);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto"; // Reset height to auto before recalculating
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
  };
  return (
    <div className="editor">
      <label htmlFor="editor" className="header">
        ✍️ Editor
      </label>
      <textarea
        id="editor"
        ref={textareaRef}
        onChange={handleChange}
        value={markdown}
        rows="20"
      />
    </div>
  );
};

export default Editor;
