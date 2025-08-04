import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import domains from './domains.json';
import { EmailProps, Maybe } from './types';
import { cleanValue, getEmailData, getHonestValue } from './utils';

/**
 * Controlled email input component using shadcn combobox.
 *
 * Read the documentation at: https://github.com/smastrom/react-email-autocomplete.
 */
export const Email = forwardRef<HTMLInputElement, EmailProps>(
  (
    {
      /* Core - Required */
      onChange: setEmail,
      value: _email,
      baseList: _baseList,
      /* Core - Optional */
      refineList = [],
      maxResults: _maxResults = 10,
      minChars: _minChars = 2,
      className,
      classNames = {
        wrapper: 'refineWrapper',
        dropdown: 'refineDropdown',
        input: 'refineInput',
        suggestion: 'refineSuggestion',
        domain: 'refineDomain',
      },
      onSelect = () => {},
      children,
      /* User events */
      onFocus: userOnFocus,
      onBlur: userOnBlur,
      onInput: userOnInput,
      onKeyDown: userOnKeyDown = () => {},
      /* ARIA */
      autoComplete,
      /* HTML */
      ...inputAttrs
    }: EmailProps,
    externalRef
  ) => {
    /* User settings */
    const _externalRef = externalRef;
    const isRefineMode = refineList?.length > 0;
    const maxResults = getHonestValue(_maxResults, 8, 6);
    const minChars = getHonestValue(_minChars, 8, 2);
    const baseList = _baseList.slice(0, maxResults);

    /* Refs */
    const isTouched = useRef(false);
    const inputRef = useRef<Maybe<HTMLInputElement>>(null);

    /* State */
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>(baseList);

    /* Reactive helpers */
    const email = typeof _email !== 'string' ? '' : cleanValue(_email);
    const [username] = email.split('@');

    const isOpen =
      isTouched.current &&
      suggestions.length > 0 &&
      username.length >= minChars;

    /* Callbacks */
    const clearResults = useCallback(() => {
      setSuggestions([]);
      setOpen(false);
    }, []);

    /* Effects */
    useEffect(() => {
      // Only auto-open if we have suggestions and user has typed enough
      if (isOpen && !open) {
        setOpen(true);
      }
    }, [isOpen, open]);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        const target = event.target as Node;
        const popoverContent = document.querySelector(
          '[data-radix-popper-content-wrapper]'
        );
        const inputElement = inputRef.current;

        // Don't close if clicking on input or popover content
        if (
          inputElement?.contains(target) ||
          popoverContent?.contains(target)
        ) {
          return;
        }

        // Close if clicking outside
        if (open) {
          clearResults();
        }
      }

      function handleWindowBlur() {
        if (open) {
          clearResults();
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('blur', handleWindowBlur);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('blur', handleWindowBlur);
      };
    }, [open, clearResults]);

    /* Value handlers */
    function handleEmailChange(value: string) {
      isTouched.current = true;

      const cleanEmail = cleanValue(value);
      const {
        hasUsername,
        hasAt,
        hasDomain,
        domain: _domain,
      } = getEmailData(cleanEmail, minChars);

      if (hasUsername) {
        if (!isRefineMode) {
          if (hasAt) clearResults();
          else setSuggestions(baseList);
        } else if (hasDomain) {
          const _suggestions = refineList
            .filter((_suggestion) => _suggestion.startsWith(_domain))
            .slice(0, maxResults);
          if (_suggestions.length > 0) {
            if (_suggestions[0] === _domain) clearResults();
            else setSuggestions(_suggestions);
          } else {
            clearResults();
          }
        } else {
          setSuggestions(baseList);
        }
      }

      setEmail(cleanEmail);
    }

    function handleSelect(domain: string) {
      const selectedEmail = `${username}@${domain}`;
      const cleanEmail = cleanValue(selectedEmail);

      setEmail(cleanEmail);
      onSelect({
        value: cleanEmail,
        keyboard: false,
        position: suggestions.indexOf(domain) + 1,
      });
      clearResults();
    }

    /* Props */
    function mergeRefs(inputElement: HTMLInputElement) {
      inputRef.current = inputElement;
      if (externalRef) {
        (
          _externalRef as React.MutableRefObject<Maybe<HTMLInputElement>>
        ).current = inputElement;
      }
    }

    return (
      <div className={cn('relative', className, classNames?.wrapper)}>
        <Popover
          open={open}
          onOpenChange={() => {
            /* Prevent auto-close */
          }}
        >
          <PopoverTrigger asChild>
            <div className="relative">
              <input
                {...inputAttrs}
                ref={mergeRefs}
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className={cn(
                  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                  classNames?.input
                )}
                type="email"
                autoComplete={autoComplete}
                aria-controls="email-suggestions"
                role="combobox"
                aria-expanded={open}
                onClick={(e) => {
                  e.preventDefault();
                  // Open dropdown if we have suggestions and user has typed enough
                  if (isOpen && !open) {
                    setOpen(true);
                  }
                }}
                onFocus={(e) => {
                  // Open dropdown if we have suggestions and user has typed enough
                  if (isOpen && !open) {
                    setOpen(true);
                  }
                  userOnFocus?.(e);
                }}
                onBlur={(e) => {
                  // Don't close immediately on blur - let click handler manage it
                  userOnBlur?.(e);
                }}
                onInput={userOnInput}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    clearResults();
                    e.preventDefault();
                  }
                  if (e.key === 'Tab') {
                    clearResults();
                  }
                  userOnKeyDown(e);
                }}
              />
            </div>
          </PopoverTrigger>
          {open && suggestions.length > 0 && (
            <PopoverContent
              className={cn('w-full p-0', classNames?.dropdown)}
              align="start"
              side="bottom"
              sideOffset={4}
              onOpenAutoFocus={(e) => {
                // Prevent auto-focus on popover content to keep input focused
                e.preventDefault();
              }}
            >
              <Command>
                <CommandList>
                  <CommandGroup>
                    {suggestions.map((domain) => (
                      <CommandItem
                        key={domain}
                        value={domain}
                        onSelect={(selectedValue) => {
                          handleSelect(selectedValue);
                        }}
                        onMouseDown={(e) => {
                          // Prevent input blur when clicking on items
                          e.preventDefault();
                        }}
                        className={cn('cursor-pointer', classNames?.suggestion)}
                      >
                        <span
                          className={cn(
                            'max-w-full text-ellipsis overflow-hidden',
                            classNames?.username
                          )}
                        >
                          {username}
                        </span>
                        <span
                          className={cn(
                            'text-primary font-semibold',
                            classNames?.domain
                          )}
                        >
                          @{domain}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          )}
        </Popover>
        {children}
      </div>
    );
  }
);

Email.displayName = 'Email';

export function EmailInput({
  baseList,
  defaultValue,
  onChange,
  className,
  autoComplete,
  maxResults = 10,
  ...props
}: {
  baseList?: string[];
  defaultValue?: string;
  autoComplete?: string;
  onChange?: (value: string) => void;
  className?: string;
  maxResults?: number;
} & Omit<EmailProps, 'baseList' | 'defaultValue' | 'onChange'>) {
  const _baseList = [
    ...(baseList || []),
    ...[
      'gmail.com',
      'outlook.com',
      'hotmail.com',
      'icloud.com',
      'yahoo.com',
      'yandex.com',
    ],
  ];

  const [email, setEmail] = useState<string>(defaultValue || '');

  useEffect(() => {
    if (onChange) {
      onChange(email);
    }
  }, [email, onChange]);

  return (
    <Email
      maxResults={maxResults || 10}
      onChange={setEmail}
      baseList={_baseList}
      autoComplete={autoComplete}
      classNames={{
        wrapper: 'relative',
        input: className,
        domain: 'text-primary font-semibold',
        username: 'max-w-full text-ellipsis overflow-hidden',
        suggestion: '',
        dropdown: '',
      }}
      refineList={domains}
      {...props}
      value={email}
    />
  );
}
