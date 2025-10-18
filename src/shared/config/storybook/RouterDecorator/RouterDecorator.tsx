import { BrowserRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';

export const RouterDecorator = (StoryComponent: StoryFn) => (
  <BrowserRouter>
    <StoryComponent />
  </BrowserRouter>
);
