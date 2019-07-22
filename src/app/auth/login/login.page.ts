import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/resources';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.logout();
  }

  private logout() {
    this.authService.logout()
      .subscribe(() => {
        // this.router.navigate(['login']);
      });
  }

  public login(form) {
    this.authService.login(form.value)
      .subscribe(res => {
        if (res) {
          this.router.navigateByUrl('home');
          
        }
      });
  }
}
