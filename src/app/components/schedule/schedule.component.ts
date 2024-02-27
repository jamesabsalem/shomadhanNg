import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { NguCarousel, NguCarouselStore, NguCarouselService } from '@ngu/carousel';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import * as moment from 'moment';
import { ScheduleService } from '../../service/schedule.service';
import { ScheduleTime, ScheduleInfo } from './../../models/schedule-time';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { Input } from '@angular/core';
import { ModelScheduleTime } from 'app/models/place-order.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() scheduleSelectionData$: Subject<ScheduleInfo>;
  public scheduleDateForm: FormGroup;
  public scheduleTimeForm: FormGroup;
  scheduleInfo = new ScheduleInfo();

  scheduleDates = [
    // { name: 'July 02', value: 1 },
    // { name: 'July 03', value: 2 },
    // { name: 'July 04', value: 3 },
    // { name: 'July 05', value: 4 },
    // { name: 'July 06', value: 5 },
    // { name: 'July 07', value: 6 }
  ];

  private carouselToken: string;

  public carouselTileItems: Array<any>;
  public carouselTile: NguCarousel;

  public scheduleTimes: Array<ScheduleTime> = [];

  constructor(
    private carousel: NguCarouselService,
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService,
    public bsModalRef: BsModalRef,
  ) {
    this.scheduleDateForm = this.formBuilder.group({
      date: moment().format('YYYY-MM-DD')
    });

    this.scheduleTimeForm = this.formBuilder.group({
      time: ''
    });

    this.scheduleDateForm.valueChanges.subscribe(value => {
      this.scheduleInfo.ScheduleDate = value.date;
      this.scheduleSelectionData$.next(this.scheduleInfo);
    });

    this.scheduleTimeForm.valueChanges.subscribe(value => {
      const scheduleTime = new ModelScheduleTime();
      const id = value.time;
      scheduleTime.ServiceScheduleTimeId = +id;
      scheduleTime.TimeSlot = this.getScheduleTimeById(id).TimeSlot;
      this.scheduleInfo.ScheduleTime = scheduleTime;
      this.scheduleSelectionData$.next(this.scheduleInfo);
    })
  }

  ngOnInit() {
    this.scheduleInfo.ScheduleDate = this.scheduleDateForm.get('date').value;

    this.carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    this.carouselTile = {
      grid: { xs: 2, sm: 3, md: 3, lg: 3, all: 0 },
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: false
      },
      load: 2,
      touch: true,
      easing: 'ease'
    };

    this.populateScheduleDate();

    this.getAllScheduleTimes();
  }

  populateScheduleDate() {
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const now = moment().add(i, 'days');
      dates.push({
        month: now.format('MMMM'),
        day: now.format('ddd'),
        date: now.format('DD'),
        fullDate: now.format('YYYY-MM-DD')
      });
    }
    this.scheduleDates = dates;
  }

  initDataFn(key: NguCarouselStore) {
    this.carouselToken = key.token;
  }

  resetFn() {
    this.carousel.reset(this.carouselToken);
  }

  moveToSlide() {
    this.carousel.moveToSlide(this.carouselToken, 2, false);
  }

  public carouselTileLoad(evt: any) {
    const len = this.carouselTileItems.length;
    if (len <= 30) {
      for (let i = len; i < len + 10; i++) {
        this.carouselTileItems.push(i);
      }
    }
  }

  getAllScheduleTimes() {
    this.scheduleService.getAllScheduleTimes()
    .subscribe((data: [ScheduleTime]) => {
      this.scheduleTimes = data;
    })

    // const scheduleTime = new ScheduleTime();
    // scheduleTime.ServiceScheduleTimeId = 1;
    // scheduleTime.TimeSlot = '09:00 Am - 11:00 Pm';

    // const scheduleTime2 = new ScheduleTime();
    // scheduleTime2.ServiceScheduleTimeId = 2;
    // scheduleTime2.TimeSlot = '09:00 Am - 11:00 Pm';

    // const scheduleTime3 = new ScheduleTime();
    // scheduleTime3.ServiceScheduleTimeId = 3;
    // scheduleTime3.TimeSlot = '09:00 Am - 11:00 Pm';

    // const scheduleTime4 = new ScheduleTime();
    // scheduleTime4.ServiceScheduleTimeId = 4;
    // scheduleTime4.TimeSlot = '09:00 Am - 11:00 Pm';

    // const scheduleTime5 = new ScheduleTime();
    // scheduleTime5.ServiceScheduleTimeId = 5;
    // scheduleTime5.TimeSlot = '09:00 Am - 11:00 Pm';

    // this.scheduleTimes.push(scheduleTime);
    // this.scheduleTimes.push(scheduleTime2);
    // this.scheduleTimes.push(scheduleTime3);
    // this.scheduleTimes.push(scheduleTime4);
    // this.scheduleTimes.push(scheduleTime5);
  }

  getScheduleTimeById(id) {
    return this.scheduleTimes.find(x => x.ServiceScheduleTimeId === +id);
  }
}
