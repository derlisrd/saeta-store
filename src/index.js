import ReactDOM from 'react-dom';
import React from 'react'
import  LoginProvider  from "./Contextos/LoginProvider";
import  ThemeProviderContext  from "./Contextos/ThemeProviderContext";
import NotificationsProvider from "./Contextos/NotificationsProvider";
import Main from "./Main";
import { Router} from "react-router-dom";
import { history } from "./Config/globales";
import DatosEmpresaProvider from "./Contextos/DatosEmpresaProvider";
import LanguageProvider from "./Contextos/Language";
import ScrollToTop from './Componentes/ScroolToTop';

//import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import DataConfigProvider from './Contextos/DataConfigProvider';
//import reportWebVitals from './reportWebVitals';
const CustomRouter = ({basename,children,history}) => {
  const [state, setState] = React.useState({action: history.action,location: history.location});

  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router basename={basename} children={children} location={state.location}navigationType={state.action} navigator={history} />
  );
};


ReactDOM.render(
  <LanguageProvider>
    <DataConfigProvider>
      <LoginProvider>
        <ThemeProviderContext>
          <NotificationsProvider>
            <DatosEmpresaProvider>
              <CustomRouter history={history}>
                <ScrollToTop />
                <Main />
              </CustomRouter>
            </DatosEmpresaProvider>
          </NotificationsProvider>
        </ThemeProviderContext>
      </LoginProvider>
      </DataConfigProvider>
    </LanguageProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();


