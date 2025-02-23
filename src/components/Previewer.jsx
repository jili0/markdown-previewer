import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../AppContextProvider";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const Previewer = () => {
  marked.setOptions({
    breaks: true,
    gfm: true, //Das gfm-Flag in marked.js aktiviert die GitHub Flavored Markdown (GFM)-Erweiterungen, die das Verhalten von Markdown in GitHub-Readme-Dateien nachahmen.
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });
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
