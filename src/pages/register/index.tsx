'use client';

import React from 'react';

import { z } from 'zod';

import RegisterForm from '../../molecules/forms/register-form';
import { CountrySelector, lang } from '../../organisms/country-selector';
import { TwoColumnLayout } from '../../templates/two-column-layout';

export type RegisterPropsType = {
  children: JSX.Element;
  formSchema: z.ZodObject<any>;
  loginPath: string;
  onLangChange: () => void;
  onSubmitFunction: (email: { [key: string]: any }) => Promise<string>;
  resources: { [key: string]: any };
};
export const Register = ({
  children,
  onSubmitFunction,
  formSchema,
  loginPath,
  resources,
  onLangChange,
}: RegisterPropsType) => (
  <TwoColumnLayout
    LeftNode={children}
    RightNode={
      <div className="flex-auto flex">
        <div className="absolute right-10 top-8">
          <CountrySelector
            menuAlign="end"
            countries={lang.countries}
            defaultValue="tr"
            onValueChange={onLangChange}
          />
        </div>
        <RegisterForm
          onSubmitFunction={onSubmitFunction}
          formSchema={formSchema}
          loginPath={loginPath}
          resources={resources}
        />
      </div>
    }
  />
);
