import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Prompt } from './prompt.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('PromptLab');
  currentPage: string = "form";
  prompt: Prompt = new Prompt("","");
  submitted: boolean = false;
  validationErrors: boolean = false;
  savedPrompts: Prompt[] = [];
  currentIndex: number | null = null;

  showForm() {
    this.currentPage = "form";
  }

  showSaved() {
    this.currentPage = "savedPrompts";
  }

  submitPrompt() {
    this.resetFormValues();
    this.submitted = true;

    if (this.prompt.role && this.prompt.promptAI) {
      this.prompt.generatedPrompt = "Działaj jako " + this.prompt.role + ", wykonaj zadanie: " + this.prompt.promptAI;
    } else {
      this.validationErrors = true;
    }
  }

  savePrompt() {
    this.submitPrompt();
    if (this.currentIndex != null) {
      this.modifyPrompt(this.currentIndex);
    } else {
      this.addPromptToList();
    }
    this.currentIndex = null;
    this.prompt = new Prompt("", "");
  }
  
  resetFormValues() {
    this.validationErrors = false;
    this.submitted = false;
  }

  addPromptToList() {
    this.savedPrompts.push(this.prompt);
  }

  modifyPrompt(index: number) {
    this.savedPrompts[index] = this.prompt;
  }

  setCurrentPrompt(index: number) {
    this.currentPage = "form";
    this.prompt = this.savedPrompts[index];
    this.currentIndex = index;
  }
}
