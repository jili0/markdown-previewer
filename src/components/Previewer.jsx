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

  const { 
    markdown, 
    editorHeight, 
    setEditorHeight,
    previewerHeight,
    setPreviewerHeight 
  } = useContext(AppContext);
  
  const previewerRef = useRef();
  const previewRef = useRef();

  useEffect(() => {
    // Bereite Markdown vor
    const preview = DOMPurify.sanitize(
      marked(markdown.replace(/\n(?=\n)/g, "\n<br>\n"))
    );

    if (previewRef.current) {
      // Setze den HTML-Inhalt
      previewRef.current.innerHTML = preview;
      
      // Füge einen zusätzlichen leeren Abschnitt am Ende hinzu, um mehr Platz zu schaffen
      const spacer = document.createElement('div');
      spacer.style.height = '80px'; // Entspricht dem padding-bottom im Editor
      previewRef.current.appendChild(spacer);

      // Wende Syntax-Highlighting auf Code-Blöcke an
      const codeBlocks = previewRef.current.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block);
      });

      // Synchronisiere Container-Höhe mit Editor
      if (previewerRef.current) {
        // Stelle sicher, dass die Container gleich hoch sind
        previewerRef.current.style.height = `${Math.max(editorHeight, previewerHeight)}px`;
        
        // Passe Preview-Div-Höhe an (Container-Höhe minus Header und Padding)
        const headerHeight = 60; // Header plus Padding
        previewRef.current.style.height = `${Math.max(editorHeight, previewerHeight) - headerHeight}px`;
      }

      // Aktualisiere Höhe basierend auf dem Inhalt
      const newHeight = previewRef.current.scrollHeight;
      const padding = 80; // Deutlich mehr Extra-Platz (erhöht von 40 auf 150)
      const adjustedHeight = newHeight + padding;
      
      // Nur aktualisieren wenn sich die Höhe signifikant geändert hat
      if (Math.abs(adjustedHeight - previewerHeight) > 50) {
        setPreviewerHeight(adjustedHeight);
        // Auch Editor-Höhe anpassen
        setEditorHeight(adjustedHeight);
      }
    }
  }, [markdown, editorHeight, previewerHeight]);

  return (
    <div className="previewer" ref={previewerRef}>
      <p className="header">📜 Previewer</p>
      <div id="preview" ref={previewRef} className="preview"></div>
    </div>
  );
};

export default Previewer;