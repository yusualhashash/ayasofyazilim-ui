import { Meta, StoryFn } from '@storybook/react';
import { ContactInformationTypeDto } from './data';
import { Button } from '@/components/ui/button';
import { SchemaForm } from '..';

export default {
  component: SchemaForm,
  title: 'Organisms/schema-form',
  className: 'p-4 bg-red-400',
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} as Meta<typeof SchemaForm>;

const Template: StoryFn<typeof SchemaForm> = (args) => (
  <SchemaForm {...args}>{args.children}</SchemaForm>
);

export const Simple = Template.bind({});
Simple.args = {
  schema: ContactInformationTypeDto,
  uiSchema: {
    userName: {
      'ui:title': 'Kullanıcı Adı',
    },
    loginAs: {
      'ui:title': 'Şununla giriş yap',
    },
    password: {
      'ui:title': 'Şifre',
      'ui:help': 'İpucu: sifreniz en az 8 karakter olmalıdır.',
      'ui:inputType': 'password',
    },
  },
  usePhoneField: true,
  className: 'w-full p-4 border rounded-sm',
  onSubmit: (values) => console.log(values.formData),
  children: (
    <div>
      Hey I&apos;m a child <Button>Submit</Button>
    </div>
  ),
};
