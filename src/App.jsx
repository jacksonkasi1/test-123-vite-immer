import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
