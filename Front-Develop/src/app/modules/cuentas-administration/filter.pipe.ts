import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], filter: any): any {
        console.log('Items:', items);
        console.log('Filter:', filter);

        if (!items || !filter) {
            return items;
        }
        const filteredItems = items.filter(item => item.id_grupo === filter.id_grupo);
        console.log('Filtered Items:', filteredItems);

        return filteredItems;
    }
}
