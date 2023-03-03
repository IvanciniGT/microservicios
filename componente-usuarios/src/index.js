import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import User from './components/user/UserComponentView';
import UserList from "./components/userlist/UserListComponentView";
import {Provider} from "react-redux";
import {AppStore} from "./store/MiAppStore";
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

function usuarioBorrado(usuario){
      console.log("Usuario borrado", usuario)
}

root.render(
  <React.StrictMode>
    <Provider store={AppStore}>
        <User id="2" borrable={true} editable={true} onDelete={usuarioBorrado}/>
        <User id="3" borrable={true} editable={true} onDelete={ usuario =>  alert("Usuario borrado "+ usuario.name) }/>

      <br/><br/><br/><br/><br/><br/><br/>
      <h2>Usuarios responsables de tramitar un expediente</h2>
      <UserList></UserList>


      <h2>Usuarios responsables de aprobar un expediente</h2>
      <UserList></UserList>
    </Provider>
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
