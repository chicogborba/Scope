import React from 'react';
import FormTextField from "../../../components/FormTextField";
import { InitialStateType, InputField } from "../useClientInfo";

export interface ClientInfoFormProps {
  disabled?: boolean;
  onChange: (label: string, value: string) => void;
  fieldValues: InitialStateType;
  inputFields: InputField[];

}

const ClientInfoForm: React.FC<ClientInfoFormProps> = ({
  disabled,
  onChange,
  fieldValues,
  inputFields
}) => {

  return (
    <>
      <h2 className="text-2xl font-bold">Informações do Cliente</h2>
      <div className="grid grid-cols-2 gap-4 pr-20">
        {inputFields.map((field, index) => (
          <FormTextField
            disabled={disabled}
            key={index}
            label={field.label}
            value={fieldValues[field.label]}
            onChange={(e) => onChange(field.label, e.target.value)}
            type={field.type}
          />
        ))}
      </div>
    </>
  );
};

export default ClientInfoForm;