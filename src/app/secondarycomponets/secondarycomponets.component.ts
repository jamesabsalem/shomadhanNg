import { Component, OnInit, Renderer } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-secondarycomponents',
    templateUrl: './secondarycomponets.component.html',
    styleUrls: ['secondarycomponets.component.scss']
})

export class SecondaryComponentsComponent implements OnInit {
    page = 4;
    page1 = 5;
    date: { year: number, month: number };
    model: NgbDateStruct;
    constructor(private renderer: Renderer) { }
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: { month: number }) {
        return date.month !== current.month;
    }

    ngOnInit() {
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
