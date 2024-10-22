import { CustomInput } from './CustomInput';
import React from 'react';

type Props = {
  id?: string;
  label: string;
  inputValue?: string | number;
  type?: 'text' | 'number';
  inputStyle?: string;
  labelStyle?: string;
  onChange: (value: string) => void;
};

export const InputWithLabel: React.FC<Props> = React.memo(
  ({
    id = '',
    label,
    inputValue = '',
    type = 'text',
    inputStyle = '',
    labelStyle = 'block mb-1',
    onChange,
  }) => {
    return (
      <>
        <label htmlFor={id} className={labelStyle}>
          {label}
        </label>

        <CustomInput
          id={id}
          type={type}
          inputValue={inputValue}
          onChange={(v) => onChange(v)}
          inputStyle={inputStyle}
        />
      </>
    );
  }
);
