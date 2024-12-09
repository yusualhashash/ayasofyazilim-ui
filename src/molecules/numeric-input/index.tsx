'use client';

import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export const numberFormatter = new Intl.NumberFormat('tr', {
  maximumFractionDigits: 0,
});
export type NumericInputProps = {
  className?: string;
  direction?: 'row' | 'column';
  disabled?: boolean;
  id?: string;
  inputLabel?: string;
  label: string;
  max: number;

  min: number;
  onValueChange?: (value: number) => void;
  slider?: boolean;
  step?: number;
  stepper?: boolean;
  subLabel: string;
  value?: number;
};
export function NumericInput({
  id = 'numeric-input',
  min = 0,
  max = 999999,
  step = 1,
  value = 0,
  label,
  subLabel,
  inputLabel,
  slider = false,
  stepper = true,
  className,
  onValueChange,
  direction = 'row',
  disabled,
}: NumericInputProps) {
  const [quantity, setQuantity] = useState<number>(value);
  const [inputQuantity, setInputQuantity] = useState<string>(value.toString());
  function onValueChanged(_value: number | string) {
    function getValue() {
      if (typeof _value === 'string') {
        return parseFloat(_value.replaceAll('.', '')) || min;
      }
      return _value;
    }
    const val = Math.min(Math.max(getValue(), min), max);

    setQuantity(val);
    setInputQuantity(numberFormatter.format(val));
    if (onValueChange) onValueChange(val);
  }
  return (
    <Label
      htmlFor={id}
      className={cn(
        'flex gap-4 justify-between w-full items-center ',
        direction === 'row' ? ' ' : 'flex-col',
        className
      )}
    >
      <div className="flex flex-col gap-1 w-full flex-grow">
        <h3 className="text-sm font-semibold">{label}</h3>
        <p className="text-xs text-muted-foreground">{subLabel}</p>
      </div>
      <div
        className={`flex flex-col gap-2 ${direction === 'row' ? '' : 'w-full'}`}
      >
        {slider && (
          <Slider
            value={[quantity]}
            min={min}
            max={max}
            step={step}
            className="h-6"
            onValueChange={(_value) => onValueChanged(_value[0])}
            disabled={disabled}
          />
        )}
        <div
          className={`flex items-center gap-2 justify-end ${
            direction === 'row' ? 'w-min' : ''
          }`}
        >
          {stepper && (
            <Button
              variant="outline"
              className="p-0 w-8 h-8"
              onClick={() => {
                onValueChanged(quantity - step);
              }}
              disabled={disabled}
            >
              <Minus className="w-3" />
            </Button>
          )}
          <div
            className={`relative flex items-center group ${
              direction === 'row' ? 'max-w-[140px]' : 'w-full'
            }`}
          >
            <Input
              type="text"
              className={` grow-0 h-8  ${inputLabel ? 'text-right peer pr-10' : 'text-center'} ${direction === 'row' ? 'w-min max-w-[140px]' : 'w-full'}`}
              min={min}
              max={max}
              step={step}
              value={inputQuantity}
              disabled={disabled}
              onChange={(e) => onValueChanged(e.target.value)}
              placeholder={label}
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp') {
                  onValueChanged(quantity + step);
                }
                if (e.key === 'ArrowDown') {
                  onValueChanged(quantity - step);
                }
              }}
              id={id}
            />
            {inputLabel && (
              <span className="absolute bg-gray-50 rounded-r-md max-w-8 peer-focus:text-primary min-w-8 px-1 right-[1px] inset-y-[1px] justify-center flex items-center text-muted-foreground text-sm leading-normal">
                {inputLabel}
              </span>
            )}
          </div>
          {stepper && (
            <Button
              variant="outline"
              className="p-0 w-8 h-8"
              disabled={disabled}
              onClick={() => {
                onValueChanged(quantity + step);
              }}
            >
              <Plus className="w-3" />
            </Button>
          )}
        </div>
      </div>
    </Label>
  );
}
