'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import Link from 'next/link';
import { PasswordInput } from '../../password-input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import localeTr from '../../../locale_tr.json';
import { replacePlaceholders } from '../../../lib/replace-placeholders';

export type RegisterFormDataType = {
  email: string;
  password: string;
  userName: string;
};

export type RegisterFormPropsType = {
  formSchema: z.ZodObject<any>;
  loginPath: string;
  registerFunction?: (values: RegisterFormDataType) => {
    description: any;
    status: any;
  };
  resources?: { [key: string]: any };
  router: any;
};

export default function RegisterForm({
  registerFunction,
  formSchema,
  loginPath,
  resources = localeTr.resources,
  router,
}: RegisterFormPropsType) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<RegisterFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
  });
  async function onSubmit(values: RegisterFormDataType) {
    setIsLoading(true);
    if (registerFunction) {
      const response = await registerFunction(values);
      if (response?.status === 200) {
        if (router) {
          const locale = window.location.pathname.split('/')[1];
          router.push(`/${locale}/${loginPath}?register=true`);
          return;
        }
        window.location.href = `${loginPath}?register=true`;
        return;
      }
      toast.error(response?.description);
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {resources?.AbpUi?.texts?.Register}
        </h1>
        <p className="text-sm text-muted-foreground">
          {resources?.AbpIdentity?.texts?.NewUser}
        </p>
      </div>
      <div className="grid gap-4 my-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {resources?.AbpIdentity?.texts?.UserName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {resources?.AbpIdentity?.texts?.EmailAddress}
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

            <Button variant="default" disabled={isLoading} className=" w-full ">
              {isLoading ? (
                <ReloadIcon className="mr-2 h-4 w-4  animate-spin" />
              ) : (
                resources?.AbpUi?.texts?.Register
              )}
            </Button>
          </form>
        </Form>
        <div className="flex items-center justify-center gap-4">
          <span className="w-full h-px bg-muted" />
          <span className="text-center whitespace-nowrap text-xs uppercase text-muted-foreground">
            {resources?.AbpAccount?.texts?.OrSignInWith}
          </span>
          <span className="w-full h-px bg-muted" />
        </div>
        <Button variant="outline" disabled={isLoading} className="" asChild>
          <Link
            href={loginPath}
            className={
              isLoading ? 'pointer-events-none' : 'text-center text-sm w-full'
            }
            aria-disabled={isLoading}
            tabIndex={isLoading ? -1 : undefined}
          >
            {isLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4  animate-spin" />
            ) : (
              resources?.AbpUi?.texts?.Login
            )}
          </Link>
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
