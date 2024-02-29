import { useState } from "react";
import "./App.css";

function App() {
  const [widgets, setWidgets] = useState<string[]>([]);

  const handleDrag = (e: React.DragEvent, widgetName: string) => {
    e.dataTransfer.setData("widgetType", widgetName);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const newWidget = e.dataTransfer.getData("widgetType") as string;
    setWidgets((prev) => [...prev, newWidget]);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="widget-container">
            <div
              className="widget"
              draggable
              onDragStart={(e) => handleDrag(e, "widget1")}
            >
              widget 1
            </div>
            <div
              className="widget"
              draggable
              onDragStart={(e) => handleDrag(e, "widget2")}
            >
              widget 2
            </div>
            <div
              className="widget"
              draggable
              onDragStart={(e) => handleDrag(e, "widget3")}
            >
              widget 3
            </div>
          </div>
          <div
            className="drop-container"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {widgets.map((w, index) => (
              <div key={index} className="dropped-widgets">
                {w}
              </div>
            ))}
          </div>
        </div>
        <div>
          <button style={{ margin: 10 }} onClick={() => setWidgets([])}>
            RESET
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
