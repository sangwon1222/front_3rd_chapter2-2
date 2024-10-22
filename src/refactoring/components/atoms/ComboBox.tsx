import React, { useState } from 'react';

type Props = {
  id?: string;
  style?: string;
  onChange: (value: string) => void;
  initialValue: string | number;
  options: { label: string; value: string | number }[];
};

export const ComboBox: React.FC<Props> = React.memo(
  ({ id = '', style = '', initialValue, onChange, options }) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = event;
      setValue(target.value);
      onChange(target.value);
    };

    if (!options.length) return null;
    return (
      <select id={id} value={value} onChange={handleChange} className={style}>
        {options.map(({ label, value }, index) => (
          <option key={`${label}-${index}`} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  }
);
