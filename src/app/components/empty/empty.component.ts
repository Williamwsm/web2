import { Component, Input } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.css'
})
export class EmptyComponent {
  options: AnimationOptions = {
    path: 'assets/animations/empty.json',
    autoplay: true,
    loop: true
  };

  @Input() menssagem:string="";

  private animationItem: AnimationItem | undefined;

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }
}
