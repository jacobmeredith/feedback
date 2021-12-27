import * as React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TextInput } from './TextInput';

export default {
  title: 'TextInput',
  component: TextInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    type: {
      description: 'The type of the input',
      type: { name: 'string' },
    },
    placeholder: {
      description: 'The placeholder for the input',
      type: { name: 'string' },
    }
  },
} as ComponentMeta<typeof TextInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  type: 'text',
  placeholder: 'Placeholder'
};
