import React from 'react';
import { Button, ThemeButton } from './Button';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Shared/Button',
  component: Button,
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: [ThemeButton.CLEAR, ThemeButton.OUTLINE],
      },
    },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof Button>;

export const ClearButton: StoryObj<React.ComponentProps<typeof Button>> = {
  args: {
    children: 'Clear Button',
    theme: ThemeButton.CLEAR,
  },
};

export const OutlineButton: StoryObj<React.ComponentProps<typeof Button>> = {
  args: {
    children: 'Outline Button',
    theme: ThemeButton.OUTLINE,
  },
};