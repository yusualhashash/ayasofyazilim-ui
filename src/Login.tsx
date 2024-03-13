import React from 'react';
import { cva } from 'class-variance-authority';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ShadcnButton } from './ShadcnButton';

const themeVariants = cva(
  'ay-flex md:ay-flex-1 ay-justify-center ay-items-center ay-px-5 ay-py-5',
  {
    variants: {
      variant: {
        ayasofyazilim: 'ay-bg-zinc-900 ay-text-white',
        abc1: 'ay-bg-emerald-900 ay-text-white',
      },
    },
    defaultVariants: {
      variant: 'ayasofyazilim',
    },
  }
);
export type LoginProps = {
  company: React.ReactNode;
  variant: 'ayasofyazilim' | 'abc1';
};

export const Login = ({ variant, ...props }: LoginProps) => (
  <div className="ay-flex ay-flex-col md:ay-flex-row ay-h-screen">
    <div className={cn(themeVariants({ variant }))}>
      <div className=" ay-flex ay-flex-row ay-items-center">
        {props?.company}
      </div>
    </div>
    <div className="ay-flex ay-flex-1 ay-container">
      <div className="ay-mx-auto ay-flex ay-w-full ay-flex-col ay-justify-center ay-space-y-6 sm:ay-w-[350px]">
        <div className="ay-flex ay-flex-col ay-space-y-2 ay-text-center">
          <h1 className="ay-text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <div className="ay-grid ay-gap-6">
          <form>
            <div className="ay-grid ay-gap-4">
              <div className="ay-grid ay-gap-1">
                <Label className="ay-sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />
              </div>
              <ShadcnButton rounded="full">Sign In with Email</ShadcnButton>
            </div>
          </form>
          <div className="ay-relative">
            <div className="ay-absolute ay-inset-0 ay-flex ay-items-center">
              <span className="ay-w-full ay-border-t" />
            </div>
            <div className="ay-relative ay-flex ay-justify-center ay-text-xs ay-uppercase">
              <span className="ay-bg-background ay-px-2 ay-text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <ShadcnButton variant="outline" rounded="full">
            <img
              src="https://cdn.e-devlet.gov.tr/themes/izmir/images/favicons/favicon-196x196.1.8.0.png"
              width={20}
              className="ay-mx-1"
              alt="E-devlet"
            />
            <span className="ay-mx-1">E-devlet </span>
          </ShadcnButton>
        </div>{' '}
        <p className="px-8 ay-text-center text-sm text-muted-foreground">
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
