import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import Kontakt from './components/Pages/Kontakt/Kontakt';
import Dojmovi from './components/Pages/Dojmovi/Dojmovi';
import Galerija from './components/Pages/Galerija/Galerija';
import Apartmani from './components/Pages/Apartmani/Apartmani';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ApartmanDetails from './components/Pages/ApartmanDetails/ApartmanDetails';
import Footer from './components/Footer/Footer';
import Navbar from './components/navbar/Navbar';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import Aktivnosti from './components/Pages/Aktivnosti/Aktivnosti';
import { createContext, useState } from "react";
import {Helmet} from "react-helmet";

import './i18n';

import Aos from 'aos';
import 'aos/dist/aos.css';
import Background from './components/Background/Background';


const root = ReactDOM.createRoot(document.getElementById('root'));

export const LanguageContext = createContext();

const Routing = () =>{
  const [language, setLanguage] = useState("en");

  Aos.init(500);

  return (
    <LanguageContext.Provider value={{language, setLanguage }}>
        <HashRouter>
          <ScrollToTop />
          <Navbar/>
          <Background />
          <Routes>
              <Route path='/' element={<App />} />
              <Route path='/apartments' element={<Apartmani />}/>
              <Route path='/testimonials' element={<Dojmovi />}/>
              <Route path='/gallery' element={<Galerija />}/>
              <Route path='/contact' element={<Kontakt />}/>
              <Route path='/apartments/:apartmanID' element={<ApartmanDetails />}/>
              <Route path='/gallery/cathedral-view' element={<Galerija currentFilter='galerijaPalace'/>}/>
              <Route path='/gallery/garden-view' element={<Galerija currentFilter='galerijaGarden'/>}/>
              <Route path='/activities' element={<Aktivnosti />}/>
          </Routes>
          <Footer />
        </HashRouter>
    </LanguageContext.Provider>
    // <LanguageContext.Provider value={{language, setLanguage }}>
    //     <BrowserRouter>
    //       <ScrollToTop />
    //       <Navbar/>
    //       <Routes>
    //         <Route path='/' element={<App />} />
    //         <Route path='/apartments' element={<Apartmani />}/>
    //         <Route path='/testimonials' element={<Dojmovi />}/>
    //         <Route path='/gallery' element={<Galerija />}/>
    //         <Route path='/contact' element={<Kontakt />}/>
    //         <Route path='/apartments/:apartmanID' element={<ApartmanDetails />}/>
    //         <Route path='/gallery/cathedral-view' element={<Galerija currentFilter='galerijaPalace'/>}/>
    //         <Route path='/gallery/garden-view' element={<Galerija currentFilter='galerijaGarden'/>}/>
    //         <Route path='/activities' element={<Aktivnosti />}/>
    //       </Routes>
    //       <Footer />
    //     </BrowserRouter>
    // </LanguageContext.Provider>
  )
}

root.render(<Routing />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
