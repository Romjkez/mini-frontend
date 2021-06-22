import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '../../auth/models/user-role';

@Pipe({
  name: 'userRole'
})
export class UserRolePipe implements PipeTransform {

  transform(value: any): string {
    return value === UserRole.EMPLOYEE ? 'Работник' : 'Администратор';
  }

}
