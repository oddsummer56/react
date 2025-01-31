import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import './css/index.css';
import reportWebVitals from './scripts/reportWebVitals';

//import App from './components/App';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Join from "./components/Join";
import SearchRst from "./components/SearchRst";
import Main from "./components/Main";
import DetailPage from "./components/DetailPage";
import LoginCallback from "./components/Kakao/LoginCallback";
import LogoutCallback from "./components/Kakao/LogoutCallback";
import JoinCongratuation from "./components/JoinCongratuation";
import ToTopBtn from "./components/ToTopBtn";
import ExclusiveAll from "./components/ExclusiveAll";
import Admin from "./components/Admin";
import Visited from "./components/Visited";
import ErrorPage from "./components/ErrorPage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Header/>
            <Routes>
                {/*<Route path="/" element={<App/>}/>*/}
                <Route path="/" element={<Main />}/>
                <Route path="/join" element={<Join/>}/>
                <Route path="/search" element={<SearchRst />}/>
                <Route path="/exclusive/all" element={<ExclusiveAll />}/>
                <Route path="/detail/:id" element={<DetailPage />}/>
                <Route path="/callback" element={<LoginCallback />}/>
                <Route path="/callbackLogout" element={<LogoutCallback />}/>
                <Route path="/join/success" element={<JoinCongratuation />}/>
                <Route path="/admin" element={<Admin />}/>
                <Route path="/visited" element={<Visited />}/>
                <Route path="*" element={<ErrorPage />}/>
            </Routes>
            <ToTopBtn />
            <Footer/>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
