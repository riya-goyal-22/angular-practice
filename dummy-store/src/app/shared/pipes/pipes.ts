import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "Dollar",
    standalone: true
 })

export class CustomPipe implements PipeTransform {
    transform(value: number): string {
        return `$ ${value}`
    }
}
