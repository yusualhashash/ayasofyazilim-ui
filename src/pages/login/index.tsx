'use client';

import React from 'react';
import { z } from 'zod';
import LoginForm from '../../molecules/login-form';
import { TwoColumnLayout } from '../../templates/two-column-layout';

export type LoginProps = {
  children: React.ReactNode;
  onSubmitFunction: (email: { [key: string]: any }) => Promise<string>;
  formSchema: z.ZodObject<any>;
  allowTenantChange: boolean;
};

export const Login = ({
  onSubmitFunction,
  formSchema,
  allowTenantChange,
  children,
}: LoginProps) => {
  return (
    <TwoColumnLayout
      LeftNode={children}
      RightNode={
        <div className="flex-auto flex">
          <LoginForm
            onSubmitFunction={onSubmitFunction}
            formSchema={formSchema}
            allowTenantChange={allowTenantChange}
          />
        </div>
      }
    />
  );
};
