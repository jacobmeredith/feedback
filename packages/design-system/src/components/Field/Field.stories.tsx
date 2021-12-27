import * as React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Field } from './Field';

export default {
  title: 'Field',
  component: Field,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    label: {
      description: 'The label for the field',
      type: { name: 'string' },
    }
  },
} as ComponentMeta<typeof Field>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  label: 'Field label',
};
