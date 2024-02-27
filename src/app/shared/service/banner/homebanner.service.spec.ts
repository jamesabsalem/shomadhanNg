import { TestBed, inject } from '@angular/core/testing';
import { HomeBannerService } from './homebanner.service';

describe('HomeBannerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeBannerService]
    });
  });

  it('should be created', inject([HomeBannerService], (service: HomeBannerService) => {
    expect(service).toBeTruthy();
  }));
});
