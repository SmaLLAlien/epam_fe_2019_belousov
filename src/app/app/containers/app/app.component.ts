import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LoaderService} from '../../../core/services/loader/loader.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  subscription: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.subscription = this.loaderService.loader;
  }


}
