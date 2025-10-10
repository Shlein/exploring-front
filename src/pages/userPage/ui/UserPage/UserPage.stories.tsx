import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { UserPage } from './UserPage';

export default {
    title: 'pages/UserPage',
    component: UserPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof UserPage>;

const Template: ComponentStory<typeof UserPage> = (args) => <UserPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   
};