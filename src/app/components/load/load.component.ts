import { Component } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-load',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './load.component.html',
  styleUrl: './load.component.css'
})
export class LoadComponent {
options: AnimationOptions = {
    path: 'assets/animations/teste.json',
    autoplay: true,
    loop: true
  };
}
