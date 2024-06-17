import "./App.css";
import AudioFeed from "./components/AudioFeed";
import AppRoutes from "./routes/index";
//Routes
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <br />
      <br />
      <br />
      <div>
        <h1>
          <b>
            audio<span>z</span>zap
          </b>
        </h1>
      </div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
