export class Message {
    Subject: string;
    Description: string;
    constructor(private subject: string, private description: string) {
        this.Subject = subject;
        this.Description = description;
    }
}