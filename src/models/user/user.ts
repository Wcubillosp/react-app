export interface IUser {
  name: string;
  email: string;
  image?: string;
  description?: string;
}

export const defUser: IUser = {
  name: '',
  email: '',
};
