import { FiEdit } from "react-icons/fi";

export interface HeaderProps {
  onEdit: () => void;
  name: string;
  number: string;
  onAddTrip?: () => void ;
}

const Header: React.FC<HeaderProps> = ({
  onAddTrip, 
  onEdit,
  name, 
  number
}) => {

    const getNameInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ");
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  return (
    <>
      <div className="flex items-center relative z-10 space justify-between">
      <div className="flex items-center">
      <div className=" avatar placeholder mr-6 ">
          <div className="bg-primary text-white rounded-full w-20">
              <span className="text-2xl">{getNameInitials(name)}</span>
          </div>
      </div>  
      <h2 className="text-2xl font-bold ">{name}</h2>
      <div className="border-black border-2 rounded-full h-6 mx-2 w-0"/>
      <h2 className="text-2xl font-bold">{number}</h2>
      <FiEdit onClick={onEdit} className="ml-4 opacity-30 w-5 h-5 hover:cursor-pointer hover:opacity-50"/>
      </div>
      <button onClick={onAddTrip} className="btn btn-sm btn-primary  mb-4">Adicionar Viajem</button>
      </div>
      <div className="relative z-0 w-full border border-gray-100 my-4 rounded-full -translate-y-8"></div> 
    </>
  )
}

export default Header