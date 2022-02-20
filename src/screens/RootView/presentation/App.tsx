import React from "react";
import GithubResults from "../../GithubResults/presentation";
import Login from "../../Login/presentation";
import Search from "../../Search/presentation";
import "./app.scss";

function App() {
  return (
    <div className="App">
      {
        <div className="waiting-message">
          <p className="text-title">Starting Github Search App ...</p>
        </div>
      }

      {<Login />}

      {<Search />}

      {<GithubResults />}
    </div>
  );
}

export default App;
