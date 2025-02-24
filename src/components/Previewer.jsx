import { useContext, useEffect, useState, useRef } from "react";
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

  const { markdown } = useContext(AppContext);
  const [debouncedMarkdown, setDebouncedMarkdown] = useState(markdown);
  const previewRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedMarkdown(markdown);
    }, 800);

    return () => clearTimeout(timeout);
  }, [markdown]);

  useEffect(() => {
    const preview = DOMPurify.sanitize(marked(markdown));

    if (previewRef.current) {
      previewRef.current.innerHTML = preview;

      const codeBlocks = previewRef.current.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [debouncedMarkdown]);

  return (
    <div className="previewer">
      <p className="header">📜 Previewer</p>
      <div id="preview" ref={previewRef} className="preview"></div>
    </div>
  );
};

export default Previewer;
