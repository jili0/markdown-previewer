import { useContext, useRef, useLayoutEffect, useEffect } from "react";
import { AppContext } from "../AppContextProvider";

const Editor = () => {
  const { 
    markdown, 
    setMarkdown, 
    editorHeight, 
    setEditorHeight,
    previewerHeight,
    setPreviewerHeight 
  } = useContext(AppContext);
  
  const editorRef = useRef();
  const textareaRef = useRef();

  // Synchronisiere Höhe mit Previewer
  useLayoutEffect(() => {
    if (editorRef.current) {
      // Stelle sicher, dass die Container gleich hoch sind
      editorRef.current.style.height = `${Math.max(editorHeight, previewerHeight)}px`;
      
      // Berechne die Höhe für die Textarea (Container-Höhe minus Header und Padding)
      if (textareaRef.current) {
        const headerHeight = 60; // Header plus Padding
        textareaRef.current.style.height = `${Math.max(editorHeight, previewerHeight) - headerHeight}px`;
      }
    }
  }, [editorHeight, previewerHeight]);

  // Aktualisiere Höhe basierend auf dem Inhalt
  useEffect(() => {
    if (textareaRef.current) {
      // Aktuelle Höhe messen
      const scrollHeight = textareaRef.current.scrollHeight;
      const padding = 80; // Deutlich mehr Extra-Platz (erhöht von 40 auf 150)
      const newHeight = scrollHeight + padding;
      
      // Nur aktualisieren wenn sich die Höhe signifikant geändert hat
      if (Math.abs(newHeight - editorHeight) > 50) {
        setEditorHeight(newHeight);
        // Auch die Previewer-Höhe anpassen
        setPreviewerHeight(newHeight);
      }
    }
  }, [markdown]);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };
  
  return (
    <div className="editor" ref={editorRef}>
      <label htmlFor="editor" className="header">
        ✍️ Editor
      </label>
      <textarea
        id="editor"
        ref={textareaRef}
        onChange={handleChange}
        value={markdown}
        
      />
    </div>
  );
};

export default Editor;