import { useState } from "react";
import "./App.css";
import ModalDialog from "./components/ModalDialog";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>OPEN MODAL</button>
      <ModalDialog title="Title" open={open} handleClose={() => setOpen(false)}>
        One morning, when Gregor Samsa woke from troubled dreams, he found
        himself transformed in his bed into a horrible vermin. He lay on his
        armour-like back, and if he lifted his head a little he could see his
        brown belly, slightly domed and divided by arches into stiff sections.
      </ModalDialog>
    </div>
  );
}

export default App;
