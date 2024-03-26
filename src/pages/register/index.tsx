'use client';

import React from 'react';

import { z } from 'zod';

import RegisterForm from '../../molecules/forms/register-form';
import { TwoColumnLayout } from '../../templates/two-column-layout';

export type RegisterProps = {
  children: React.ReactNode;
  onSubmitFunction: (email: { [key: string]: any }) => Promise<string>;
  formSchema: z.ZodObject<any>;
  loginPath: string;
};
export const Register = ({
  children,
  onSubmitFunction,
  formSchema,
  loginPath,
}: RegisterProps) => {
  return (
    <TwoColumnLayout
      LeftNode={children}
      RightNode={
        <div className="flex-auto flex">
          <RegisterForm
            onSubmitFunction={onSubmitFunction}
            formSchema={formSchema}
            loginPath={loginPath}
          />
        </div>
      }
    />
  );
};
