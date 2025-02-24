import { useContext, useRef, useEffect } from "react";
import { AppContext } from "../AppContextProvider";

const Editor = () => {
  const { markdown, setMarkdown, height } = useContext(AppContext);
  const textareaRef = useRef();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${height}px`;
    }
  }, [height]);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
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
