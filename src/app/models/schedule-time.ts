import { ModelScheduleTime } from './place-order.model';

export class ScheduleTime {
  ServiceScheduleTimeId: number;
  TimeSlot: string;
}

export class ScheduleInfo {
  ScheduleDate: string;
  ScheduleTime: ModelScheduleTime;
}
