import React, { useState } from "react";
import "./Addons.css";

const addonsData = [
  {
    id: 1,
    name: "Google Docs",
    icon: "/icons/docs.png",
    description: "Write, edit, and collaborate on documents with others. Create and edit documents right in your browser—no special software required.",
  },
  {
    id: 2,
    name: "Google Sheets",
    icon: "/icons/sheets.png",
    description: "Create and edit spreadsheets online. Use charts, graphs, and built-in formulas to make your data work for you.",
  },
  {
    id: 3,
    name: "Google Slides",
    icon: "/icons/slides.png",
    description: "Tell stories that matter. Create, edit, and collaborate on beautiful presentations with others, from any device.",
  },
  {
    id: 4,
    name: "Google Drive",
    icon: "/icons/drive.png",
    description: "Store, share, and collaborate on files and folders from any mobile device, tablet, or computer.",
  },
  {
    id: 5,
    name: "Google Forms",
    icon: "/icons/forms.png",
    description: "Create custom forms for surveys and questionnaires at no extra cost. Gather everything in a spreadsheet and analyze data right in Google Sheets.",
  },
];

function App() {
  const [selectedAddon, setSelectedAddon] = useState(addonsData[0]);

  return (
    <div className="dashboard-container">
      {/* Sidebar on the Left */}
      <aside className="sidebar">
        <div className="sidebar-header">Workspace Add-ons</div>
        <ul className="addon-list">
          {addonsData.map((addon) => (
            <li
              key={addon.id}
              className={`addon-item ${
                selectedAddon.id === addon.id ? "active" : ""
              }`}
              onClick={() => setSelectedAddon(addon)}
            >
              {addon.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Detail View on the Right */}
      <main className="detail-view">
        <img
          src={selectedAddon.icon}
          alt={selectedAddon.name}
          className="addon-icon"
        />
        <h1 className="addon-name">{selectedAddon.name}</h1>
        <p className="addon-description">{selectedAddon.description}</p>
      </main>
    </div>
  );
}

export default App;
