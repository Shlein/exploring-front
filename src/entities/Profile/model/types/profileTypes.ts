import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export enum ProfileErrors {
  INCORRECT_DATA = 'INCORRECT_DATA',
  INCORRECT_AGE = 'INCORRECT_AGE',
  SERVER_ERROR = 'SERVER_ERROR',
  NO_DATA = 'NO_DATA'
}

export interface Profile {
  firstName?: string;
  lastName?: string;
  age?: number;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
}

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateErrors?: ProfileErrors[];
}
