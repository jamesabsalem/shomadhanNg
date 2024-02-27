import { Component, Input, ElementRef, OnChanges } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'read-more',
    template: `
        <div [innerHTML]="currentText">
        </div>
            <a [class.hidden]="hideToggle" style="padding-left: 0px;" class="btn btn-link" (click)="toggleView()">Read {{isCollapsed? 'more':'less'}}</a>
    `
})

export class ReadMoreComponent implements OnChanges {
    @Input() text: string;
    @Input() maxLength = 100;
    currentText: string;
    hideToggle = true;

    public isCollapsed = true;

    constructor(private elementRef: ElementRef) {

    }
    toggleView() {
        this.isCollapsed = !this.isCollapsed;
        this.determineView();
    }
    determineView() {
        if (this.text.length <= this.maxLength) {
            this.currentText = this.text;
            this.isCollapsed = false;
            this.hideToggle = true;
            return;
        }
        this.hideToggle = false;
        if (this.isCollapsed === true) {
            this.currentText = this.text.substring(0, this.maxLength) + '...';
        } else if (this.isCollapsed === false) {
            this.currentText = this.text;
        }

    }
    ngOnChanges() {
        this.determineView();
    }
}
