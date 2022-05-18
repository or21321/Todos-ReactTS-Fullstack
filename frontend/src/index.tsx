// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/styles.scss'
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
  // Link
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import TodoApp from './pages/TodoApp'
import Home from './pages/Home';
import Login from './pages/Login'
import TodoEdit from './components/TodoEdit'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} >
            <Route path="home" element={<Home />} />
            <Route path="todo" element={<TodoApp />} >
              <Route path="edit" element={<TodoEdit />} />
              <Route path="edit/:id" element={<TodoEdit />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
)
