import { Profile, ProfileErrors } from '../types/profileTypes';

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ProfileErrors.NO_DATA];
  }

  const { firstName, lastName, age } = profile;

  const errors: ProfileErrors[] = [];

  if (!firstName || !lastName) {
    errors.push(ProfileErrors.INCORRECT_DATA);
  }

  if (!age && !Number.isInteger(age)) {
    errors.push(ProfileErrors.INCORRECT_AGE);
  }

  return errors;
};
