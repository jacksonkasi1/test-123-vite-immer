import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import Router from "./Router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  
  // change mode
  const themeConfig = useSelector(state => state.themeConfigs)
  useEffect(() => {
    if(themeConfig.mode === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [themeConfig.mode])


  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
