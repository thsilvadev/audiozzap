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
      <p>Alpha v0.0.1</p>
      <p>Próxima atualização: Likes e Coments</p>
      <p>Toque na logo pra ir pra ver todos os áudios!</p>
      <div>
        <a href="/" style={{textDecoration: 'none', marginBottom: '0'}}>
        <h1>
          <b>
            audio<span>z</span>zap
          </b>
        </h1>
        </a>
        <h2>Mande seu áudio no WhatsApp para: +55 92 99477-0666</h2>
      </div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
