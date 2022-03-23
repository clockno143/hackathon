import { Component } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { WelcomeComponent } from './home/welcome.component';
export let browserRefresh = false;
@Component(
  {
    selector:'pm-root',
    template:'<div><router-outlet></router-outlet></div>'
    
    
  }
)
export class AppComponent
{
  pageTitle: string="nikhil"
  subscription: Subscription;

  constructor(private router: Router) {
    this.subscription = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          browserRefresh = !router.navigated;
        }
    });
}
}