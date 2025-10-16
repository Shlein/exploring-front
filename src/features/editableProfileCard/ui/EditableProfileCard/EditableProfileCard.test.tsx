import { fireEvent, screen } from '@testing-library/react';
import { EditableProfileCard } from './EditableProfileCard';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Profile } from 'entities/Profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { profileReducer } from 'features/editableProfileCard/model/slice/profileSlice';
import userEvent from '@testing-library/user-event';
import { $api } from 'shared/api/api';

const profile: Profile = {
  id: '1',
  firstName: 'admin',
  lastName: 'admin',
  age: 465,
  currency: Currency.USD,
  country: Country.Armenia,
  city: 'Moscow',
  username: 'admin213'
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile
    },
    user: {
      authData: { id: '1', username: 'admin' }
    }
  },
  asyncReducers: {
    profile: profileReducer
  }
};

describe('features/EditableProfileCard', () => {
  beforeEach(() => {
    componentRender(<EditableProfileCard id="1" />, options);
  });

  test('click on edit btn', async () => {
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditBtn')
    );
    expect(
      screen.getByTestId('EditableProfileCardHeader.CancelBtn')
    ).toBeInTheDocument();
  });

  test('click on cancel btn', async () => {
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditBtn')
    );
    await userEvent.clear(
      screen.getByTestId('ProfileCard.firstName')
    );
    await userEvent.clear(screen.getByTestId('ProfileCard.lastName'));

    await userEvent.type(
      screen.getByTestId('ProfileCard.firstName'),
      'user'
    );
    await userEvent.type(
      screen.getByTestId('ProfileCard.lastName'),
      'user'
    );

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue(
      'user'
    );
    expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue(
      'user'
    );

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.CancelBtn')
    );

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue(
      'admin'
    );
    expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue(
      'admin'
    );
  });

  test('error during save with invalid firstName', async () => {
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditBtn')
    );

    await userEvent.clear(
      screen.getByTestId('ProfileCard.firstName')
    );

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveBtn')
    );

    expect(
      screen.getByTestId('EditableProfileCard.Error.Paragraph')
    ).toBeInTheDocument();
  });

  test('without validation errors, success PUT request', async () => {
    const mockPutReq = jest.spyOn($api, 'put');

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditBtn')
    );

    await userEvent.type(
      screen.getByTestId('ProfileCard.firstName'),
      'user'
    );

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveBtn')
    );

    expect(mockPutReq).toHaveBeenCalled();
  });
});
