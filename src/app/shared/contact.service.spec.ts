import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { UserService } from './user.service';

describe('ContactService', () => {
  let service: ContactService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactService);
  });

  it('test contact loader', async () => {
    await userService.Authenticate({
      name: "jessy",
      password: "12345678"
    });
    expect(service.getAllContacts());
  });
});
