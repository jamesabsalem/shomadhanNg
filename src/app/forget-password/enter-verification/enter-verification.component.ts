import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { WindowService } from '../../shared/service/common/window.service';
@Component({
  selector: 'app-enter-verification',
  templateUrl: './enter-verification.component.html',
  styleUrls: ['./enter-verification.component.scss']
})
export class EnterVerificationComponent implements OnInit {
  windowRef: any;
  verificationCode: string;
  constructor(
    private win: WindowService
  ) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef
  }
  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {

        // this.user = result.user;
        swal({
          icon: 'success'
        })
      })
      .catch(error => console.log(error, 'Incorrect code entered?'));
  }
}
