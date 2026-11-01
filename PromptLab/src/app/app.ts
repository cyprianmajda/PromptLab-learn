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
  filteredPrompts: Prompt[] = [];
  currentPromptId: string | null = null;
  searchFilter: string = "";

  ngOnInit() {
    this.readLocalStorage();
  }

  showForm() {
    this.currentPage = "form";
    this.saveLocalStorage();
  }

  showSaved() {
    this.currentPage = "savedPrompts";
    this.searchFilter = "";
    this.filteredPrompts = this.savedPrompts;
    this.saveLocalStorage();
  }

  submitPrompt() : boolean {
    this.resetFormValues();
    this.submitted = true;

    if (this.prompt.role && this.prompt.promptAI) {
      this.prompt.generatedPrompt = "Działaj jako " + this.prompt.role + ", wykonaj zadanie: " + this.prompt.promptAI;
      return true;
    } else {
      this.validationErrors = true;
      return false;
    }
  }

  savePrompt() {
    if (this.submitPrompt()) {
      if (this.currentPromptId != null) {
        this.modifyPrompt(this.prompt);
      } else {
        this.addPromptToList();
      }
      this.currentPromptId = null;
      this.prompt = new Prompt("", "");
    }
  }
  
  resetFormValues() {
    this.validationErrors = false;
    this.submitted = false;
  }

  addPromptToList() {
    this.savedPrompts.push(this.prompt);
    this.saveLocalStorage();
  }

  modifyPrompt(prompt: Prompt) {
    let index = this.savedPrompts.findIndex(savedPrompt => savedPrompt.id === prompt.id);
    this.savedPrompts[index] = prompt;
    this.saveLocalStorage();
  }

  deletePrompt(prompt: Prompt) {
    let index = this.savedPrompts.findIndex(savedPrompt => savedPrompt.id === prompt.id);

    this.savedPrompts.splice(index, 1);
    if (this.currentPromptId != null) {
      this.currentPromptId = null;
      this.prompt = new Prompt("", "");
    }
    this.saveLocalStorage();
  }

  setCurrentPrompt(prompt: Prompt) {
    let index = this.savedPrompts.findIndex(savedPrompt => savedPrompt.id === prompt.id);
    this.currentPage = "form";
    this.prompt = this.savedPrompts[index];
    this.currentPromptId = this.prompt.id;
  }

  searchPrompt() {
    let searchFilterCut = this.searchFilter.toUpperCase().trim();
    this.filteredPrompts = this.savedPrompts.filter(prompt => prompt.role.toUpperCase().trim().includes(searchFilterCut) || prompt.promptAI.toUpperCase().trim().includes(searchFilterCut));
  }

  saveLocalStorage() {
    let promptsJSON : string = JSON.stringify(this.savedPrompts);
    localStorage.setItem("promptLab-prompts", promptsJSON);
    localStorage.setItem("promptLab-currentPage", this.currentPage);
  }

  readLocalStorage() {
    let promptsJSON = localStorage.getItem("promptLab-prompts");
    let currentPageLocal = localStorage.getItem("promptLab-currentPage");

    if (promptsJSON != null) {
      this.savedPrompts = JSON.parse(promptsJSON);
      this.filteredPrompts = this.savedPrompts;
      this.searchFilter = "";
    }

    if (currentPageLocal != null && currentPageLocal != "") {
      this.currentPage = currentPageLocal;
    }
  }
}
