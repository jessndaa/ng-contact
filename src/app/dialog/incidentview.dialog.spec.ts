import { TestBed } from '@angular/core/testing';

import { IncidentviewDialog } from './incidentview.dialog';

describe('IncidentviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncidentviewDialog = TestBed.get(IncidentviewDialog);
    expect(service).toBeTruthy();
  });
});
