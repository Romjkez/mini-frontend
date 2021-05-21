import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRating'
})
export class UserRatingPipe implements PipeTransform {

  transform(rating: any): string {
    if (rating === null) {
      return null;
    }

    return String(rating * 100);
  }

}
