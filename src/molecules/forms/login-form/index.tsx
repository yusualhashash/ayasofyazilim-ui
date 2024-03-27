'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { ExclamationTriangleIcon, ReloadIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import localeTr from '../../../locale_tr.json';

const onSubmitFunctionToTest = (values: LoginFormDataType): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const result = 'Success'; //await handler(values);
    if (result !== 'Success') {
      return reject(result);
    }
    resolve(result);
    //router.push("/profile");
  });
};

export const defaultLoginFormSchema = z.object({
  userIdentifier: z.string().min(5),
  password: z.string().min(4).max(32),
  tenantId: z.string(),
});

export type LoginFormDataType = {
  userIdentifier: string;
  password: string;
  tenantId: string;
};

export type LoginPropsType = {
  onSubmitFunction: (values: LoginFormDataType) => Promise<string>;
  formSchema: z.ZodObject<any>;
  allowTenantChange: boolean;
  registerPath: string;
  locale?: { [key: string]: any };
};

export default function LoginForm({
  onSubmitFunction,
  formSchema,
  allowTenantChange,
  registerPath,
  locale = localeTr.resources,
}: LoginPropsType) {
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
    <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {locale?.AbpUi?.texts?.Login}
        </h1>
      </div>
      <div className="grid gap-4 my-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {allowTenantChange && (
              <FormField
                control={form.control}
                name="tenantId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{locale?.AbpIdentity?.texts?.Tenant}</FormLabel>
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
                    {locale?.AbpAccount?.texts?.UserNameOrEmailAddress}
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
                  <FormLabel>{locale?.AbpIdentity?.texts?.Password}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Password"
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
                  {locale?.AbpExceptionHandling?.texts?.DefaultErrorMessage}
                </AlertTitle>
                <AlertDescription>
                  {locale?.AbpAccount?.texts?.[error]}
                </AlertDescription>
              </Alert>
            )}
            <Button
              variant={'default'}
              disabled={isLoading}
              className="bg-blue-800 hover:bg-blue-950 w-full text-white"
              type="submit"
            >
              {isLoading ? (
                <ReloadIcon className="mr-2 h-4 w-4  animate-spin" />
              ) : (
                locale?.AbpUi?.texts?.Login
              )}
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {locale?.AbpAccount?.texts?.OrSignInWith}
            </span>
          </div>
        </div>

        <Button
          variant={'default'}
          disabled={isLoading}
          className="bg-slate-700 hover:bg-slate-600"
          asChild
        >
          <a
            href={registerPath}
            className="text-center text-sm w-full text-white"
          >
            {isLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4  animate-spin" />
            ) : (
              locale?.AbpUi?.texts?.Register
            )}
          </a>
        </Button>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <a
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}

// <form onSubmit={onSubmit}>
//   <div className="grid gap-4">
//     <div className="grid gap-1">
//       <Label htmlFor="email">Email</Label>
//       <Input
//         id="email"
//         placeholder="name@example.com"
//         type="email"
//         autoComplete="email"
//         ref={emailRef}
//         disabled={isLoading}
//         autoFocus
//       />
//     </div>

//     <div className="grid gap-1">
//       <Label htmlFor="password">Password</Label>
//       <Input
//         id="password"
//         placeholder="password"
//         type="password"
//         autoComplete="no"
//         disabled={isLoading}
//         ref={passwordRef}
//       />
//     </div>

//     {error && (
//       <Alert variant="destructive">
//         <ExclamationTriangleIcon className="h-4 w-4" />
//         <AlertTitle>Error</AlertTitle>
//         <AlertDescription>{error}</AlertDescription>
//       </Alert>
//     )}
//     <Button disabled={isLoading}>
//       {isLoading ? (
//         <ReloadIcon className="mr-2 h-4 w-4  animate-spin" />
//       ) : (
//         'Log in with Email'
//       )}
//     </Button>
//   </div>
// </form>
