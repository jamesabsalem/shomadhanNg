import { Pipe, PipeTransform } from '@angular/core';
import { MainService } from '../shared/model/mainservice.model';
@Pipe({
    name: 'filterByMainService'
})
export class FilterByMainService implements PipeTransform {
    transform(value: MainService[], serviceId?: number): MainService[] {
        return value.filter(it => it.ServiceCategoryId === serviceId);
    }
}
