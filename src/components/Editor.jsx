import { useContext, useRef, useLayoutEffect } from "react";
import { AppContext } from "../AppContextProvider";

const Editor = () => {
  const { markdown, setMarkdown, height } = useContext(AppContext);
  const textareaRef = useRef();

  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${height}px`;
    }
  }, [height]); //Verwende hier useLayoutEffect, um sicherzustellen, dass der DOM richtig gemessen wird, bevor der Textbereich seine Höhe erhält

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
