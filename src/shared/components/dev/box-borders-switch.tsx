import { useEffect } from 'react';
import { FaCube } from 'react-icons/fa6';
import { useToggle } from 'usehooks-ts';

import { config } from '../../../config/config';
import { Toggle } from '../ui/toggle';

export const BoxBordersSwitch: React.FC = () => {
  if (config.isProduction) return null;
  const [show, toggle] = useToggle(false);

  useEffect(() => {
    const addRedBorders = () => {
      const allElements = document.querySelectorAll('*');
      allElements.forEach((element) => {
        (element as HTMLElement).style.outline = '1px solid red';
      });
    };
    if (show) addRedBorders();

    return () => {
      const allElements = document.querySelectorAll('*');
      allElements.forEach((element) => {
        (element as HTMLElement).style.outline = '';
      });
    };
  }, [show]);

  return (
    <Toggle
      pressed={show}
      onPressedChange={toggle}
      className="absolute left-1 bottom-8"
      size={'sm'}
      variant={'outline'}>
      <FaCube />
    </Toggle>
  );
};
