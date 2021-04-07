import { Postcode } from './Postcode';

export class Customer {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  postcode: Postcode;
  phoneNumber: string;
  email: string;
}
