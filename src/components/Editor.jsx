import { useContext } from "react";
import { AppContext } from "../AppContextProvider";

const Editor = () => {
  const { markdown, setMarkdown } = useContext(AppContext);
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
        onChange={handleChange}
        value={markdown}
        rows="20"
      />
    </div>
  );
};

export default Editor;
