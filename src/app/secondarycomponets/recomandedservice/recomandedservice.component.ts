import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { MainService } from '../../shared/model/mainservice.model';
import { CategoryService } from '../../shared/service/category/category.service';
import { RecomandedService } from '../../shared/model/recomanded-service.model';

@Component({
  selector: 'app-recomandedservice',
  templateUrl: './recomandedservice.component.html',
  styleUrls: ['./recomandedservice.component.scss'],
  providers: [CategoryService]
})
export class RecomandedServiceComponent implements OnInit {

  public recomandedService: RecomandedService[];


  constructor(private category: CategoryService) { }

  ngOnInit() {
    this.category.getRecomandedServices().subscribe((rec) => this.recomandedService = rec);
  }


}
