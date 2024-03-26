'use client';

import React from 'react';
import LoginForm from '../../molecules/login-form';
import { TwoColumnLayout } from '../../templates/two-column-layout';

export type LoginProps = {
  children: React.ReactNode;
  onSubmitFunction: (email: { [key: string]: any }) => Promise<string>;
};

export const Login = ({ onSubmitFunction, children }: LoginProps) => {
  return (
    <TwoColumnLayout
      LeftNode={children}
      RightNode={
        <div className="flex-auto flex">
          <LoginForm onSubmitFunction={onSubmitFunction} />
        </div>
      }
    />
  );
};
