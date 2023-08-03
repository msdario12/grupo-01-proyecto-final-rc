
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';
import { useState } from 'react';
export const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"/;
const navigate = useNavigate();

const isValidEmail = emailRegex.test(email);
const isValidPassword = passwordRegex.test(password);
  const handleLogin = async (e) => {
    e.preventDefault();

    //validaciones
if (email === "" || password === ""){
  alert("Todos los campos son obligatorios")
}else if (!isValidEmail){
  alert('No es un email valido');
}else if (!isValidPassword){
  alert('La contraseña debe contener ocho caracteres, incluyendo una letra mayúscula, una letra minúscula y un número o carácter especial');
}else {
  alert('El usuario se logueo correctamente !!');
}

}

   
  return (
    <div className="container" style={{background:"black",marginTop:20,padding:20}}>
      <h2 style= {{color:"blue", textaling:"center"}}>LOGIN</h2>
      <form onSubmit={handleLogin} className="form">
        <input
          type="email"
          placeholder='correo Electronico'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='contraseña'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={{color:"blue"}}  className="btn btn-primary">Login</button>
      </form>
    </div>
  );

  }