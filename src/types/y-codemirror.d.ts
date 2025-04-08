declare module "y-codemirror" {
  import { Awareness } from "y-protocols/awareness";
  import { Text } from "yjs";
  import { Editor } from "codemirror";

  export class CodemirrorBinding {
    constructor(
      ytext: Text,
      editor: Editor,
      awareness: Awareness,
      options?: { yUndoManager?: any }
    );
  }
}
