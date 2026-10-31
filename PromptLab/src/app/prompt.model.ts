export class Prompt{
    role: string;
    promptAI: string;
    generatedPrompt: string;

    constructor(role: string, promptAI: string) {
        this.role = role;
        this.promptAI = promptAI;
        this.generatedPrompt = "";
    }
}