'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckCircledIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { replacePlaceholders } from '../../../lib';
import localeTr from '../../../locale_tr.json';

export type ResetPasswordFormDataType = {
  password: string;
  passwordConfirm: string;
};

export type PasswordRequirementsType = {
  passwordRequiredLength?: number;
  passwordRequiredUniqueCharsLength?: number;
  passwordRequiresDigit: boolean;
  passwordRequiresLower: boolean;
  passwordRequiresNonAlphanumeric: boolean;
  passwordRequiresUniqueChars: boolean;
  passwordRequiresUpper: boolean;
};
export type ResetPasswordFormPropsType = {
  allowTenantChange: boolean;
  onResetPasswordCancel?: () => void;
  onResetPasswordSubmit?: (
    values: ResetPasswordFormDataType
  ) => Promise<string>;
  passwordRequirements: PasswordRequirementsType;
  resources?: { [key: string]: any };
};

export default function ResetPasswordForm({
  passwordRequirements,
  onResetPasswordSubmit,
  onResetPasswordCancel,
  resources = localeTr.resources,
}: ResetPasswordFormPropsType) {
  const formSchema = z
    .object({
      password: z
        .string()
        .min(passwordRequirements.passwordRequiredLength || 0, {
          message: replacePlaceholders(
            resources?.AbpIdentity?.texts?.[
              'Volo.Abp.Identity:PasswordTooShort'
            ],
            [
              {
                holder: '{0}',
                replacement: passwordRequirements.passwordRequiredLength || 0,
              },
            ]
          ).join(' '),
        }) // length
        .regex(/[0-9]/, {
          message:
            resources?.AbpIdentity?.texts?.[
              'Volo.Abp.Identity:PasswordRequiresDigit'
            ],
        }) // number
        .regex(/[a-z]/, {
          message:
            resources?.AbpIdentity?.texts?.[
              'Volo.Abp.Identity:PasswordRequiresLower'
            ],
        }) // lowercase
        .regex(/[A-Z]/, {
          message:
            resources?.AbpIdentity?.texts?.[
              'Volo.Abp.Identity:PasswordRequiresUpper'
            ],
        }) // uppercase
        .regex(/[^a-zA-Z0-9]/, {
          message:
            resources?.AbpIdentity?.texts?.[
              'Volo.Abp.Identity:PasswordRequiresNonAlphanumeric'
            ],
        }) // nonalphanumeric
        .refine(
          (password: string) => {
            const uniqueCount = new Map();
            for (let i = 0; i < password.length; i++) {
              if (uniqueCount.has(password[i])) {
                uniqueCount.set(password[i], uniqueCount.get(password[i]) + 1);
              } else {
                uniqueCount.set(password[i], 1);
              }
            }
            if (!passwordRequirements.passwordRequiresUniqueChars) {
              return false;
            }
            if (!passwordRequirements.passwordRequiredUniqueCharsLength) {
              return false;
            }

            if (
              uniqueCount.size <
              passwordRequirements.passwordRequiredUniqueCharsLength
            ) {
              return false;
            }
            return true;
          },
          {
            message:
              replacePlaceholders(
                resources?.AbpIdentity?.texts?.[
                  'Volo.Abp.Identity:PasswordRequiresUniqueChars'
                ],
                [
                  {
                    holder: '{0}',
                    replacement:
                      passwordRequirements.passwordRequiredUniqueCharsLength ||
                      0,
                  },
                ]
              ).join(' ') || '',
          }
        ),
      passwordConfirm: z.string(),
    })
    .required()
    .superRefine(({ passwordConfirm, password }, ctx) => {
      if (passwordConfirm !== password) {
        ctx.addIssue({
          code: 'custom',
          message: replacePlaceholders(
            localeTr.resources?.AbpValidation?.texts?.[
              "'{0}' and '{1}' do not match."
            ],
            [
              {
                holder: '{0}',
                replacement:
                  localeTr.resources.AbpIdentity.texts[
                    'DisplayName:NewPassword'
                  ],
              },
              {
                holder: '{1}',
                replacement:
                  localeTr.resources.AbpIdentity.texts[
                    'DisplayName:NewPasswordConfirm'
                  ],
              },
            ]
          ).join(' '),
        });
      }
    });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<
    | {
        message: React.ReactNode | string | null;
        variant: 'default' | 'destructive';
      }
    | undefined
  >();

  const form = useForm<ResetPasswordFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  function onSubmit(values: ResetPasswordFormDataType) {
    if (onResetPasswordSubmit) {
      setIsLoading(true);
      onResetPasswordSubmit(values)
        .then(() => {
          setAlert({
            variant: 'default',
            message: resources?.AbpAccount?.texts?.PasswordResetMailSentMessage,
          });
          setIsLoading(false);
        })
        .catch(() => {
          setAlert({
            variant: 'destructive',
            message: replacePlaceholders(
              resources?.AbpAccount?.texts?.[
                'Volo.Account:InvalidEmailAddress'
              ],
              [
                {
                  holder: '{0}',
                  replacement: values.email,
                },
              ]
            ),
          });
          setIsLoading(false);
        });
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-4 sm:w-[350px] p-5">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {resources?.AbpUi?.texts?.Login}
        </h1>
      </div>
      <div className="space-y-4 grid">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between gap-2">
                    {`${resources.AbpIdentity.texts['DisplayName:NewPassword']}*`}
                    <PasswordRequirements resources={resources} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder={
                        resources.AbpIdentity.texts['DisplayName:NewPassword']
                      }
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between gap-2">
                    {`${resources.AbpIdentity.texts['DisplayName:NewPasswordConfirm']}*`}
                    <PasswordRequirements resources={resources} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder={
                        resources.AbpIdentity.texts[
                          'DisplayName:NewPasswordConfirm'
                        ]
                      }
                      type="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {alert && (
              <Alert variant={alert.variant}>
                {alert.variant === 'destructive' ? (
                  <ExclamationTriangleIcon className="h-4 w-4" />
                ) : (
                  <CheckCircledIcon className="h-4 w-4" />
                )}
                <AlertTitle>
                  {alert.variant === 'destructive' &&
                    resources?.AbpAuditLogging?.texts?.Fault}
                  {alert.variant === 'default' &&
                    resources?.AbpUi?.texts?.Success}
                </AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={onResetPasswordCancel}>
                {resources?.AbpUi?.texts?.Cancel}
              </Button>
              <Button variant="default" disabled={isLoading} type="submit">
                {isLoading ? (
                  <ReloadIcon className="mr-2 h-4 w-4  animate-spin" />
                ) : (
                  resources?.AbpUi?.texts?.Submit
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
export const PasswordRequirements = ({ resources }: { [key: string]: any }) => (
  <HoverCard>
    <HoverCardTrigger className="cursor-help">
      <QuestionMarkCircledIcon />
    </HoverCardTrigger>
    <HoverCardContent className="grid gap-4 w-full">
      <p className="flex gap-2 text-xs items-center">
        <ChevronRightIcon />
        {
          resources?.AbpIdentity?.texts[
            'Volo.Abp.Identity:PasswordRequiresDigit'
          ]
        }
      </p>
      <p className="flex gap-2 text-xs items-center">
        <ChevronRightIcon />
        {
          resources?.AbpIdentity?.texts[
            'Volo.Abp.Identity:PasswordRequiresLower'
          ]
        }
      </p>
      <p className="flex gap-2 text-xs items-center ">
        <ChevronRightIcon />
        {
          resources?.AbpIdentity?.texts[
            'Volo.Abp.Identity:PasswordRequiresNonAlphanumeric'
          ]
        }
      </p>
      <p className="flex gap-2 text-xs items-center">
        <ChevronRightIcon />
        {
          resources?.AbpIdentity?.texts[
            'Volo.Abp.Identity:PasswordRequiresUpper'
          ]
        }
      </p>
      <p className="flex gap-2 text-xs items-center">
        <ChevronRightIcon />
        {resources?.AbpIdentity?.texts['Volo.Abp.Identity:PasswordTooShort']}
      </p>
      <p className="flex gap-2 text-xs items-center">
        <ChevronRightIcon />
        {
          resources?.AbpIdentity?.texts[
            'Volo.Abp.Identity:PasswordRequiresUniqueChars'
          ]
        }
      </p>
    </HoverCardContent>
  </HoverCard>
);
