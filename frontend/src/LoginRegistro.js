import imgUser from "./imgUser.png";
function LoginRegistro(){

return(
    <div className="login">
    <div className="loginCont">
        <h2>Bienvenido</h2>
        <img src={imgUser} alt='imagen user'/>
        
        
        
        <form>
            <h4>Username</h4>
            <input
            className="username"
            placeholder="user"
            type="text"
            />
            <h4>password</h4>
            <input
            type="text"
            className="contraseña"
            placeholder="password"
            />

            <div className="confirmarDts">
            <button>Confirmar</button>
            </div>
        </form>
    
        
        
    </div>
    </div>


);
}

export default LoginRegistro;