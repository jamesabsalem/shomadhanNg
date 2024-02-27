import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-secondary-component-review-footer',
  templateUrl: './secondary-component-review-footer.component.html',
  styleUrls: ['./secondary-component-review-footer.component.scss']
})
export class SecondaryComponentReviewFooterComponent implements OnInit {

  constructor(public location: Location) { }

  ngOnInit() {
  }

  get showHideAssistant() {
    const assistantPath = this.location.prepareExternalUrl(this.location.path());
    if (assistantPath.includes('/assistant/')) {
      return true;
    } else {
      return false;
    }
  }
}
