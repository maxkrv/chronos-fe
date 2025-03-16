import { forwardRef } from 'react';

import { cn } from '../lib/utils';
import { Color } from '../types/interfaces';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface ColorSelectorProps {
  colors: Color[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onChange?: (color: Color) => void;
  className?: string;
  disabled?: boolean;
}

export const ColorSelector = forwardRef<HTMLDivElement, ColorSelectorProps>(
  ({ colors, defaultValue, value, onValueChange, onChange, className, disabled, ...props }, ref) => {
    const handleValueChange = (newValue: string) => {
      const selectedColor = colors.find((color) => color.id === newValue);
      if (selectedColor) {
        onChange?.(selectedColor);
        onValueChange?.(selectedColor.value);
      }
    };

    return (
      <RadioGroup
        ref={ref}
        defaultValue={defaultValue || (colors.length > 0 ? colors[0].id : '')}
        value={value}
        onValueChange={handleValueChange}
        className={cn('flex items-center gap-3', className)}
        disabled={disabled}
        {...props}>
        {colors.map((color) => (
          <div key={color.id} className="relative">
            <RadioGroupItem value={color.id} id={`color-${color.value}`} className="sr-only" />
            <Label
              htmlFor={`color-${color.value}`}
              className={cn(
                'relative block h-5 w-5 cursor-pointer rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                disabled && 'cursor-not-allowed opacity-50'
              )}>
              <span className="block h-full w-full rounded-full" style={{ backgroundColor: color.value }} />
              <span
                className={cn(
                  'absolute inset-[-4px] rounded-full transition-all',
                  value === color.value || (!value && defaultValue === color.value) ? 'opacity-100' : 'opacity-0'
                )}
                style={{
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: color.ringColor || color.value
                }}
              />
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  }
);

ColorSelector.displayName = 'ColorSelector';
