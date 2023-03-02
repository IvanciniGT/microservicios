import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import User from './components/user/UserComponentView';
import UserList from "./components/userlist/UserListComponentView";
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <User id="2"/>
      <User id="3"/>
      <User id="4"/>

      <br/><br/><br/><br/><br/><br/><br/>

      <UserList></UserList>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
