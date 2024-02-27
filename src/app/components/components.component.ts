import { Component, OnInit, Renderer } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HomeService } from '../shared/service/Home/home.service';
import { Area } from '../shared/model/area.model';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styleUrls: ['./components.component.scss'],
    providers: [HomeService]
})

export class ComponentsComponent implements OnInit {
    page = 4;
    page1 = 5;
    date: {year: number, month: number};
    model: NgbDateStruct;
    public area: Area[];
    location: number;
    constructor( private renderer: Renderer, private home: HomeService) {}
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }

    ngOnInit() {
        this.home.getAvailableAreas().then(
            res => { // Success
                this.area = this.home.areas;
            }
          );
        const input_group_focus = document.getElementsByClassName('form-control');
        const input_group = document.getElementsByClassName('input-group');
        for (let i = 0; i < input_group.length; i++) {
            input_group[i].children[0].addEventListener('focus', function () {
                input_group[i].classList.add('input-group-focus');
            });
            input_group[i].children[0].addEventListener('blur', function () {
                input_group[i].classList.remove('input-group-focus');
            });
        }
    }
}
