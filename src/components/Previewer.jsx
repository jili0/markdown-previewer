import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../AppContextProvider";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const Previewer = () => {
  marked.setOptions({
    breaks: true,
    gfm: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  const { markdown, height, setHeight } = useContext(AppContext);

  const previewRef = useRef();

  useEffect(() => {
    const preview = DOMPurify.sanitize(
      marked(markdown.replace(/\n(?=\n)/g, "\n<br>\n"))
    );

    if (previewRef.current) {
      previewRef.current.innerHTML = preview;

      const codeBlocks = previewRef.current.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block);
      });

      const newHeight = previewRef.current.scrollHeight;
      if (newHeight !== height) {
        setHeight(newHeight);
      }
    }
  }, [markdown, setHeight]);

  return (
    <div className="previewer">
      <p className="header">📜 Previewer</p>
      <div id="preview" ref={previewRef} className="preview"></div>
    </div>
  );
};

export default Previewer;
