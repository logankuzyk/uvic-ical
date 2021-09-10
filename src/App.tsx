import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const DETAILED_TIMETABLE_URL =
    "https://www.uvic.ca/tools/student/registration/detailed-timetable/index.php";

  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab | undefined>();
  const [ics, setIcs] = useState<string | undefined>();

  useEffect(() => {}, [ics]);

  chrome.tabs.query({ active: true }).then((tab) => {
    tab[0] ? setCurrentTab(tab[0]) : setCurrentTab(undefined);
  });

  return (
    <div className="App">
      <header className="AppHeader">
        <h2>UVic Timetable to iCal</h2>
        {currentTab && currentTab.url === DETAILED_TIMETABLE_URL ? (
          <div
            className="DownloadButton"
            onClick={() => {
              chrome.tabs.sendMessage(
                currentTab.id || 0,
                { type: "GET_ICS" },
                setIcs
              );
            }}
          >
            Download iCal File
          </div>
        ) : (
          <div className="Container">
            <p>
              Go to the
              <a
                className="AppLink"
                href={DETAILED_TIMETABLE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Detailed Timetable{" "}
              </a>
              and click on the extension again.
            </p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
