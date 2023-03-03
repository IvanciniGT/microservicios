import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import User from './components/user/UserComponentView';
import UserList from "./components/userlist/UserListComponentView";
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

      <User id="2" borrable={true}/>
      <User id="3" quieroBotonDeBorrar={false}/>
      <User id="4" quieroBotonDeBorrar={true}/>
      <br/><br/><br/><br/><br/><br/><br/>

      <UserList></UserList>
  </React.StrictMode>
);
/*
<User id="2" borrable={true}/>
                  La primera vez que se llama a RENDER sería igual a :        new User(borrable=true)
                  las siguientes veces?                                       user.setBorrable(false | true)
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();


/*

 */
