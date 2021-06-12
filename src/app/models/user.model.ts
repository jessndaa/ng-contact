import { ContactModel } from "./contact.model";

 export interface UserModel{
  id?: string;
  name?: string;
  contacts?: Array<ContactModel>;
}
