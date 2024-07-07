import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ParamsDataService {
    private showViewSource = new BehaviorSubject<boolean>(false);
    showView$ = this.showViewSource.asObservable();

    private matchParamSource = new BehaviorSubject<string>('');
    matchParam$ = this.matchParamSource.asObservable();

    updateShowView(value: boolean) {
        this.showViewSource.next(value);
    }

    updateMatchParam(value: string) {
        this.matchParamSource.next(value);
    }
}
