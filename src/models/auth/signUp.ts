import { ISignIn } from './signIn';

export interface ISignUp extends ISignIn {
  name: string;
  image?: string;
  description?: string;
}

export const defSignUp: ISignUp = {
  name: '',
  email: '',
  password: '',
};
