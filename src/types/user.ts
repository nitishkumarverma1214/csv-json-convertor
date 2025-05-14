export interface InputUser {
  name: { firstName: string; lastName: string };
  age: string;
  address?: any;
  [key: string]: any;
}
