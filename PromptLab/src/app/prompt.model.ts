export class Prompt{
    id: string;
    role: string;
    promptAI: string;
    generatedPrompt: string;

    constructor(role: string, promptAI: string) {
        this.id = crypto.randomUUID();
        this.role = role;
        this.promptAI = promptAI;
        this.generatedPrompt = "";
    }
}