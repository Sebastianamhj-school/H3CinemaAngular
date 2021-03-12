import { Postcode } from './Postcode';

export class Customer {
  constructor(
      public Id: number,
      public firstName: string,
      public lastName: string,
      public address: string,
      public postcode: Postcode,
      public phoneNumber: string,
      public email: string
  ) {}
}
