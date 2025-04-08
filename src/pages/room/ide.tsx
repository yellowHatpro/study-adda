import { useRef, useEffect, useState } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import RandomColor from "randomcolor";
import { UnControlled as CodeMirrorEditor } from "react-codemirror2";
import { CodemirrorBinding } from "y-codemirror";

interface IDEProps {
  roomId: string;
}

export const IDE = ({ roomId }: IDEProps) => {
  const [editor, setEditor] = useState<any>(null);
  const [code, setCode] = useState<string>("");
  const handleEditorDidMount = (editor: any) => {
    setEditor(editor);
  };

  useEffect(() => {
    if (editor) {
      try {
        // Create a new Yjs document
        const doc = new Y.Doc();

        // Create a WebRTC provider with multiple signaling servers
        const provider = new WebrtcProvider(`quill-demo-room`, doc, {
          //   signaling: [
          //     "wss://signaling.yjs.dev",
          //     "wss://y-webrtc-signaling-eu.herokuapp.com",
          //     "wss://y-webrtc-signaling-us.herokuapp.com",
          //   ],
        });

        // Get the Yjs text type
        const yText = doc.getText("monaco");

        // Create an undo manager
        const yUndoManager = new Y.UndoManager(yText);

        // Set up awareness
        const awareness = provider.awareness;
        const color = RandomColor();

        awareness.setLocalStateField("user", {
          name: `User-${Math.floor(Math.random() * 1000)}`,
          color: color,
        });

        // Create the Monaco binding
        const getBinding = new CodemirrorBinding(yText, editor, awareness, {
          yUndoManager,
        });

        // Cleanup function
        return () => {
          if (provider) {
            provider.disconnect();
            doc.destroy();
          }
        };
      } catch (err) {
        console.error("Error in collaboration:", err);
      }
    }
  }, [editor, roomId]);

  return (
    <CodeMirrorEditor
      onChange={(editor, data, value) => {
        setCode(value);
      }}
      editorDidMount={(editor) => handleEditorDidMount(editor)}
      autoScroll
      options={{
        lineNumbers: true,
        theme: "vs-dark",
        fontSize: 14,
        fontFamily: "monospace",
        fontWeight: "normal",
        value: code,
      }}
    />
  );
};
