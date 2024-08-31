import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi";
import TextFieldWithIcons from "./TextFieldWithIcons";
import Logo from "../assets/Logo.svg";


export interface LoginCardProps {
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: () => void;
}

const LoginCard: React.FC<LoginCardProps> = 
({
  onEmailChange, 
  onPasswordChange, 
  onLogin
}) => {

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-xl w-full">
        <div className="card shrink-0 w-full shadow-2xl bg-base-100">
          <form className="card-body px-20 py-14 text-center flex flex-col">
            <img src={Logo} alt="Logo" className="w-40 h-40 ml-auto mr-auto"/>
            <h1 className="text-5xl font-bold text-primary">NexusTrip</h1>
            <div className="form-control">
              <TextFieldWithIcons 
              onTextChange={onEmailChange} 
              icon={<HiOutlineMail className="w-6 h-6 opacity-40"/>} 
              placeholder="Digite seu email"
              label="Email"
              border/>
            </div>
            <div className="form-control">
              <TextFieldWithIcons 
              onTextChange={onPasswordChange} 
              icon={<HiOutlineLockClosed className="w-6 h-6 opacity-40"/>} 
              placeholder="Digite sua senha"
              label="Password"
              border/>
            </div>
            <div className="form-control mt-6">
              <button onClick={onLogin} className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginCard;