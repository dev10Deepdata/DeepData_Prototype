import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import Nav from './components/Nav';
import Footer from './components/Footer';
import './index.css';

import MainPage from './pages/MainPage';
import JoinPage from './pages/JoinPage';


const App = styled.div`
  width: 100%;
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store()}>
        <App className='App'>
          <Nav />
          <Routes>
            <Route path='/' element={<JoinPage />} />
            <Route path='/main' element={<MainPage />} />
          </Routes>
          <Footer />
        </App>
    </Provider>
  </BrowserRouter>
);
