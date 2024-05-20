'use client';

import React from 'react';
import { z } from 'zod';
import { ForgotPasswordFormDataType } from 'src/molecules/forms/forgot-password-form';
import LoginForm, { LoginFormDataType } from '../../molecules/forms/login-form';
import { CountrySelector, lang } from '../../organisms/country-selector';
import { TwoColumnLayout } from '../../templates/two-column-layout';

export type LoginPropsType = {
  allowTenantChange: boolean;
  children: JSX.Element;
  cultureName: string;
  formSchema: z.ZodObject<any>;
  onForgotPasswordSubmit?: (
    values: ForgotPasswordFormDataType
  ) => Promise<string>;
  onLangChange: (cultureName: string) => void;
  onSubmitFunction: (email: LoginFormDataType) => Promise<string>;
  registerPath: string;
  resources: { [key: string]: any };
};

export const Login = ({
  onSubmitFunction,
  onForgotPasswordSubmit,
  formSchema,
  allowTenantChange,
  children,
  registerPath,
  resources,
  cultureName = 'tr',
  onLangChange,
}: LoginPropsType) => (
  <TwoColumnLayout
    LeftNode={children}
    RightNode={
      <div className="flex-auto flex">
        <div className="absolute right-4 top-4 md:right-10 md:top-8">
          <CountrySelector
            menuAlign="end"
            countries={lang.countries}
            defaultValue={cultureName}
            onValueChange={onLangChange}
          />
        </div>
        <LoginForm
          onSubmitFunction={onSubmitFunction}
          formSchema={formSchema}
          allowTenantChange={allowTenantChange}
          onForgotPasswordSubmit={onForgotPasswordSubmit}
          registerPath={registerPath}
          resources={resources}
        />
      </div>
    }
  />
);
