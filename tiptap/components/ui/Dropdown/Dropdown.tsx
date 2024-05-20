import { cn } from '@tiptap-location/lib/utils';

export const DropdownCategoryTitle = ({
  children,
}: {
  children: JSX.Element;
}) => {
  return (
    <div className="text-[.65rem] font-semibold mb-1 uppercase text-neutral-500 dark:text-neutral-400 px-1.5">
      {children}
    </div>
  );
};

export const DropdownButton = ({
  children,
  isActive,
  onClick,
  disabled,
  className,
}: {
  children: JSX.Element;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) => {
  const buttonClass = cn(
    'flex items-center gap-2 p-1.5 text-sm font-medium text-neutral-500 text-left bg-transparent w-full rounded',
    !isActive && !disabled,
    'hover:bg-neutral-100 hover:text-neutral-800 ',
    isActive && !disabled && 'bg-neutral-100 text-neutral-800 0',
    disabled && 'text-neutral-400 cursor-not-allowed ',
    className
  );

  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
