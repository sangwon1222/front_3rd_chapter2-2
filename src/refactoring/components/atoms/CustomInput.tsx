import React, { useEffect, useState } from 'react';

type PropsType = {
  id?: string;
  inputValue?: string | number;
  type?: 'text' | 'number';
  placeholder?: string;
  inputStyle?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

export const CustomInput: React.FC<PropsType> = React.memo(
  ({
    id = '',
    inputValue = '',
    type = 'text',
    placeholder = '',
    inputStyle = '',
    required = false,
    onChange,
  }) => {
    const [value, setValue] = useState<string | number>('');
    useEffect(() => setValue(inputValue), [inputValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      const value = type === 'number' ? +target.value : target.value;
      setValue(value);
      onChange(target.value);
    };

    return (
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        className={inputStyle}
        placeholder={placeholder}
        required={required}
      />
    );
  }
);
