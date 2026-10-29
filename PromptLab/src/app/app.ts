import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('PromptLab');
  role = "programista";
  prompt = "napisz kod c#";
  submitted = false;

  submitPrompt() {
    this.submitted = true;
  }
}
