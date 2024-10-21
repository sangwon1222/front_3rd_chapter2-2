import { useState } from 'react';

type PropsType = {
  handleToggle: (toggle: boolean) => void;
  className: string;
  label: { on: string; off: string };
};

const ToggleBtn: React.FC<PropsType> = ({
  handleToggle,
  className = '',
  label = { on: '', off: '' },
}) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const onClick = () => {
    setToggle((prev) => !prev);
    handleToggle(!toggle);
  };

  return (
    <button onClick={onClick} className={className}>
      {toggle ? label.on : label.off}
    </button>
  );
};

export default ToggleBtn;
