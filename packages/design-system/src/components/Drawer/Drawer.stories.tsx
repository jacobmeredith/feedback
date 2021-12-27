import * as React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Drawer } from './Drawer';

export default {
  title: 'Drawer',
  component: Drawer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    open: {
      control: {
        type: 'boolean'
      }
    }
  },
} as ComponentMeta<typeof Drawer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  open: false,
};
