import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoaderService} from '../../../core/services/loader/loader.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  obj = {isResponseOn: false};

  constructor(private loaderService: LoaderService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loaderService.loader.pipe(
      tap(show => {
        this.obj.isResponseOn = show;
        this.cdRef.detectChanges();
      })
    ).subscribe();
  }


}
