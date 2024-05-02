'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { replacePlaceholders } from '../../../lib';
import localeTr from '../../../locale_tr.json';
import { PasswordInput } from '../../password-input';
import ForgotPasswordForm, {
  ForgotPasswordFormDataType,
  defaultForgotPasswordFormSchema,
} from '../forgot-password-form';
import Button from '../../../molecules/button';

export const defaultLoginFormSchema = z.object({
  userIdentifier: z.string().min(5),
  password: z.string().min(4).max(32),
  tenantId: z.string(),
});

export type LoginFormDataType = {
  password: string;
  tenantId: string;
  userIdentifier: string;
};

export type LoginFormPropsType = {
  allowTenantChange: boolean;
  formSchema: z.ZodObject<any>;
  onForgotPasswordSubmit?: (
    values: ForgotPasswordFormDataType
  ) => Promise<string>;
  onSubmitFunction: (values: LoginFormDataType) => Promise<string>;
  registerPath: string;
  resources?: { [key: string]: any };
};

export default function LoginForm({
  onSubmitFunction,
  formSchema,
  allowTenantChange,
  registerPath,
  resources = localeTr.resources,
  onForgotPasswordSubmit,
}: LoginFormPropsType) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const form = useForm<LoginFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tenantId: '',
      userIdentifier: '',
      password: '',
    },
  });

  function onSubmit(values: LoginFormDataType) {
    setIsLoading(true);
    onSubmitFunction(values)
      .then(() => {
        setError('');
      })
      .catch((result) => {
        setError(result);
        setIsLoading(false);
      });
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            id="login-form"
          >
            {allowTenantChange && (
              <FormField
                control={form.control}
                name="tenantId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {resources?.AbpIdentity?.texts?.Tenant}
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Tenant"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="userIdentifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {resources?.AbpAccount?.texts?.UserNameOrEmailAddress}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {resources?.AbpIdentity?.texts?.Password}
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      disabled={isLoading}
                      placeholder={resources?.AbpIdentity?.texts?.Password}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>
                  {resources?.AbpExceptionHandling?.texts?.DefaultErrorMessage}
                </AlertTitle>
                <AlertDescription>
                  {resources?.AbpAccount?.texts?.[error]}
                </AlertDescription>
              </Alert>
            )}

            <Button
              title={resources?.AbpUi?.texts?.Login}
              variant="default"
              className=" w-full text-white"
              isLoading={isLoading}
            />
          </form>
        </Form>
        <ForgotPasswordForm
          resources={resources}
          formSchema={defaultForgotPasswordFormSchema}
          onForgotPasswordSubmit={onForgotPasswordSubmit}
        />
        <div className="flex items-center justify-center gap-4">
          <span className="w-full h-px bg-muted" />
          <span className="text-center whitespace-nowrap text-xs uppercase text-muted-foreground">
            {resources?.AbpAccount?.texts?.OrRegisterWith}
          </span>
          <span className="w-full h-px bg-muted" />
        </div>
        <Button variant="outline" asChild className="">
          <a
            href={registerPath}
            className={`text-center cursor-pointer text-sm w-full  ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
          >
            {resources?.AbpUi?.texts?.Register}
          </a>
        </Button>
      </div>
      <p className="px-4 text-center text-xs text-muted-foreground">
        {replacePlaceholders(
          resources?.AbpGdpr?.texts?.CookieConsentAgreePolicies,
          [
            {
              holder: '{0}',
              replacement: (
                <a
                  key="cookie-policy"
                  href="/cookies"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  {resources?.AbpGdpr?.texts?.CookiePolicy}
                </a>
              ),
            },
            {
              holder: '{1}',
              replacement: (
                <a
                  key="privacy-policy"
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  {resources?.AbpGdpr?.texts?.PrivacyPolicy}
                </a>
              ),
            },
          ]
        )}
      </p>
    </div>
  );
}
