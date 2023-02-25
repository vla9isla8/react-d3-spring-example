import {createRoot} from "react-dom/client";
import Graph from "./Graph";

const container = document.getElementById("canvas");

if (container) {
    const root = createRoot(container);
    root.render(<Graph/>);
}
