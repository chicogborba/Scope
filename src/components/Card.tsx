import { MouseEvent, useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiWhatsappLine } from "react-icons/ri";
import { LuClipboardList } from "react-icons/lu";


export interface CardProps {
  name: string;
  nextTravel: string;
  recurrence: string;
  email: string;
  whatsapp: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  name,
  nextTravel,
  recurrence,
  onClick,
  email,
  whatsapp
}) => {

  const [isEmailCopied, setIsEmailCopied] = useState(false);

  const handleCopyEmailClick = (event: MouseEvent<HTMLSpanElement> ) => {
  event.stopPropagation();
  navigator.clipboard.writeText(email);
  setIsEmailCopied(true)
  };

  const handleWhatsAppClick = (event: MouseEvent<HTMLSpanElement> ) => {
  event.stopPropagation();
  window.open(`https://api.whatsapp.com/send?phone=${whatsapp}`, "_blank");
  };


  const getNameInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ");
    return firstName.charAt(0) + lastName.charAt(0);
  }

    useEffect(() => {
    if (isEmailCopied) {
      const timer = setTimeout(() => {
        setIsEmailCopied(false);
      }, 3000); // Oculta o alerta após 3 segundos
      return () => clearTimeout(timer);
    }
  }, [isEmailCopied]);

  return (
    <>
      {isEmailCopied && (
        <div role="alert" className="alert alert-slide-in absolute border-none shadow-lg transition-all bottom-10 w-1/6 left-5 bg-white">
          <LuClipboardList className="h-7 w-7 text-primary"/>
          <span>Email copiado!</span>
        </div>
      )}
    <div className={`bg-white shadow-sm
     rounded-2xl flex flex-col justify-between p-4 items-center transition-all 
     ${onClick && "hover:cursor-pointer hover:scale-105"}`}
     onClick={onClick}>
        <div className=" avatar placeholder">
          <div className="bg-primary text-white rounded-full w-12">
            <span className="text-1xl">{getNameInitials(name)}</span>
          </div>
        </div>
        <h3 className="font-semibold text-xl mb-4">{name}</h3>
        <h4 className="font-extralight text-xs">Proxima viagem:</h4>
        <h4 className="font-normal text-xs text-primary">{nextTravel}</h4>
        <div className="p-2 px-11 mt-4  shadow-md rounded-xl flex items-center flex-col">
          <h4 className="font-medium mb-1 text-gray-500 text-xs">Recorrência</h4>
          <h4 className="font-normal text-xs text-primary">{recurrence}</h4>
        </div>
        <div className="flex gap-2 justify-center items-center mt-8 mb-2">
          <span onClick={handleCopyEmailClick} className="text-xs flex hover:opacity-40">
            <HiOutlineMail className="h-5 w-5 mr-2"/>
            Copiar email
          </span>
          <div className="border-gray-200 border h-3 w-0"/>
          <span onClick={handleWhatsAppClick} className="text-xs flex hover:opacity-40"> 
            <RiWhatsappLine className="h-5 w-5 mr-2"/>
            Whatsapp
          </span>
        </div>
    </div>
    </>
  )
}

export default Card