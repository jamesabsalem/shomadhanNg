import { PartnerRegistationComponent } from './../partner-registation/partner-registation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {

    constructor(
      private _ngbModal: NgbModal
    ) {    }

    ngOnInit() { }

    onClickPartnerRegistations() {
      this._ngbModal.open(PartnerRegistationComponent);
    }
  }










