'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ExclamationTriangleIcon, ReloadIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../../@/components/ui/alert';
import { Button } from '../../../@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../@/components/ui/form';
import { Input } from '../../../@/components/ui/input';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});
const onSubmitFunction = (values: { [key: string]: any }): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(values);
    if (values.email === 'a@a.com') {
      resolve('success');
    }
    reject('User does not exist.');
  });
};

export type LoginProps = {
  onSubmitFunction: (values: { [key: string]: any }) => Promise<string>;
};

export default function LoginForm({ onSubmitFunction }: LoginProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    onSubmitFunction(values)
      .then(() => {
        setError('');
        //redirect
      })
      .catch((result) => {
        setError(result);
        setIsLoading(false);
      });
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
        <p className="text-sm text-muted-foreground">
          <a href="/register" className="text-slate-500 text-center text-sm">
            Don&apos;t you have an account?
          </a>
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
                  <FormLabel>Password</FormLabel>
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
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? (
                <ReloadIcon className="mr-2 h-4 w-4  animate-spin" />
              ) : (
                'Log in with Email'
              )}
            </Button>
          </form>
        </Form>
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button disabled={isLoading} variant="outline">
          {isLoading ? (
            <ReloadIcon className="mr-2 h-4 w-4  animate-spin" />
          ) : (
            <div className="flex justify-center">
              <img
                src="https://cdn.e-devlet.gov.tr/themes/izmir/images/favicons/favicon-196x196.1.8.0.png"
                width={20}
                className="mx-1"
                alt="E-devlet"
              />
              <span className="mx-1">E-devlet</span>
            </div>
          )}
        </Button> */}
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
