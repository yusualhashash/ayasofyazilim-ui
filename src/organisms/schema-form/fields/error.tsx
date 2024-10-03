import { FieldErrorProps } from '@rjsf/utils';

export const FieldErrorTemplate = (props: FieldErrorProps) =>
  props.errors && (
    <ul className="space-y-1">
      {props.errors.map((error) => (
        <li
          key={error.toString()}
          className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive"
        >
          {error.toString()}
        </li>
      ))}
    </ul>
  );
