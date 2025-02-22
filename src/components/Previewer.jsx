import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../AppContextProvider";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

const Previewer = () => {
  const { markdown } = useContext(AppContext);
  useEffect(() => {
    const preview = DOMPurify.sanitize(marked(markdown));
    if (previewRef.current) previewRef.current.innerHTML = preview;
  }, [markdown]);

  const previewRef = useRef();

  return (
    <div className="previewer">
      <p className="header">Previewer</p>
      <div id="preview" ref={previewRef} className="preview"></div>
    </div>
  );
};

export default Previewer;
