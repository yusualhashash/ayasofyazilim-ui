'use client';

import { ReloadIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { cva } from 'class-variance-authority';
import React, { useRef } from 'react';
import { Button } from '../../@/components/ui/button';

import { cn } from '../../@/lib/utils';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../../@/components/ui/alert';
import { Input } from '../components/Input';

const themeVariants = cva(
  'flex md:flex-1 justify-center items-center px-5 py-5',
  {
    variants: {
      variant: {
        ayasofyazilim: 'bg-zinc-900 text-white',
        abc1: 'bg-emerald-900 text-white',
      },
    },
    defaultVariants: {
      variant: 'ayasofyazilim',
    },
  }
);

export type Props = {};

export type LoginProps = {
  company: React.ReactNode;
  onSubmitFunction: (email: string) => Promise<string>;
  variant: 'ayasofyazilim' | 'abc1';
};

export const Login = ({ variant, onSubmitFunction, ...props }: LoginProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const emailRef = useRef<HTMLInputElement>(null);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (!emailRef?.current?.value) return;
    setIsLoading(true);

    onSubmitFunction(emailRef.current.value)
      .then(() => {
        setError('');
        window.location.reload();
      })
      .catch((result) => {
        setError(result);
        setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className={cn(themeVariants({ variant }))}>
        <div className=" flex flex-row items-center">{props?.company}</div>
      </div>
      <div className="flex flex-1 container">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <Input
                    error={error}
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoComplete="email"
                    ref={emailRef}
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button disabled={isLoading}>
                  {isLoading ? (
                    <ReloadIcon className="mr-2 h-4 w-4  animate-spin" />
                  ) : (
                    'Sign In with Email'
                  )}
                </Button>
              </div>
            </form>
            <div className="relative">
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
                <>
                  <img
                    src="https://cdn.e-devlet.gov.tr/themes/izmir/images/favicons/favicon-196x196.1.8.0.png"
                    width={20}
                    className="mx-1"
                    alt="E-devlet"
                  />
                  <span className="mx-1">E-devlet</span>
                </>
              )}
            </Button>
          </div>{' '}
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
      </div>
    </div>
  );
};
