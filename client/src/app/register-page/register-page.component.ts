import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundEffectComponent } from '../side-components/background-effect/background-effect.component';
import { FormsModule } from '@angular/forms';
import { RegisterData } from '../typescript/interfaces';
import { environment } from '../app.environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, BackgroundEffectComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  registerData: RegisterData = {
    mail: '',
    name: '',
    lastname: '',
    password: ''
  }

  constructor(private router: Router, private toastr: ToastrService) { }

  switchToLoginPage() {
    this.router.navigate(['/login']);
  }

  registerUser() {
    fetch(`${environment.apiUrl}/authentication/register`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.registerData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Internal Server Error');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Internal Server Error:', error);
        throw error;
      });
  }

  validateForm() {
    let valid = true;
    if (!this.registerData.mail || !/\S+@\S+\.\S+/.test(this.registerData.mail)) {
      this.toastr.error('Invalid email address!', 'Register Error');
      valid = false;
    }
    if (!this.registerData.name.trim()) {
      this.toastr.error('Name is required!', 'Register Error');
      valid = false;
    }
    if (!this.registerData.lastname.trim()) {
      this.toastr.error('Lastname is required!', 'Register Error');
      valid = false;
    }
    if (!this.registerData.password || this.registerData.password.length < 6) {
      console.log('Password must be at least 6 characters long!');
      this.toastr.error('Password must be at least 6 characters long!', 'Register Successful');
      valid = false;
    }
    if (valid) {
      this.toastr.success('Registration successful!', 'Register Error');
      this.registerUser();
      this.registerData = {
        mail: '',
        name: '',
        lastname: '',
        password: ''
      }
    }
  }
}