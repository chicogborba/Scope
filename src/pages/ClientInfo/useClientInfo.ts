import { FormTextFieldType } from "../../components/FormTextField";
import { MockDataType, mock_data } from "../../mock/mock";

export type InputField = {
  label: string;
  type: FormTextFieldType;
  initialKey: keyof MockDataType;
};

export interface UseClientInfoReturn {
  initialState: InitialStateType;
  inputFields: InputField[];
  client_data: MockDataType | undefined;
}

export type InitialStateType = {
  [key: string]: string ;
};

function useClientInfo(id: string | undefined): UseClientInfoReturn {

  const inputFields: InputField[] = [
    { label: "Data de Nascimento", type: "date", initialKey: "birthDate"},
    { label: "Telefone", type: "phone", initialKey: "phone" },
    { label: "Endereço de Email", type: "text", initialKey: "email"},
    { label: "CPF", type: "doc" , initialKey: "cpf"},
    { label: "Ocupação", type: "text" , initialKey: "job"},
    { label: "Origem", type: "text" , initialKey: "origin"},
    { label: "Primeira Consulta", type: "date" , initialKey: "firstTrip"},
    { label: "Recorrência", type: "text" , initialKey: "recurrence"},
  ];

  const client_data = mock_data.find(item => item.id === id);

  const initialState = inputFields.reduce<InitialStateType>((acc, field) => {
    if (client_data) {
        const value = client_data[field.initialKey];
        acc[field.label] = typeof value === 'string' ? value : String(value);
    }
        return acc;
    }
    , {});

    return {
      initialState,
      inputFields,
      client_data
    }
}


export default useClientInfo;