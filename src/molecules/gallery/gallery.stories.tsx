import { StoryFn, Meta } from '@storybook/react';
import React from 'react';

import Gallery, { GalleryItem } from '.';

export default {
  component: Gallery,
  parameters: {
    layout: 'centered',
  },
  args: {
    content: '15000',
    description: 'your target',
    footer: 'You are doing well!',
    title: 'People',
  },
} as Meta<typeof Gallery>;

const images = Array.from({ length: 9 }, (_, i) => {
  const isLandscape = i % 2 === 0;
  const width = isLandscape ? 800 : 600;
  const height = isLandscape ? 600 : 800;
  return {
    imageUrl: `https://picsum.photos/seed/${i + 1}/${width}/${height}`,
    id: i.toString(),
    alt: `Image ${i + 1}`,
  };
});

const Template: StoryFn<typeof Gallery> = (args: { images: GalleryItem[] }) => (
  <Gallery {...args} images={images} />
);

export const Default = Template.bind({});
