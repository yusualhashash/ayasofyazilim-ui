import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import CustomNovelEditor from '../custom-novel-editor';

export default {
  component: CustomNovelEditor,
  argTypes: {},
} as Meta<typeof CustomNovelEditor>;

const Template: StoryFn<typeof CustomNovelEditor> = () => <CustomNovelEditor />;

export const EditorTemplate = Template.bind({});
