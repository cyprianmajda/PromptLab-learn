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
  role: string = "";
  prompt: string = "";
  preparedPrompt: string = "";
  submitted: boolean = false;
  validationErrors: boolean = false;
  savedPrompts: string[] = [];

  submitPrompt() {
    this.resetFormValues();
    this.submitted = true;

    if (this.role && this.prompt) {
      this.preparedPrompt = "Działaj jako " + this.role + ", wykonaj zadanie: " + this.prompt;

      this.addPromptToList(this.preparedPrompt);
    } else {
      this.validationErrors = true;
    }
    
  }
  
  resetFormValues() {
    this.validationErrors = false;
    this.preparedPrompt = "";
    this.submitted = false;
  }

  addPromptToList(preparedPrompt: string) {
    this.savedPrompts.push(preparedPrompt);
  }
}
