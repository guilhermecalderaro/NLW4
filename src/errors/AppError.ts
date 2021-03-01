

export class AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(mesagge: string, statusCode = 400) {
        this.message = mesagge;
        this.statusCode = statusCode;
    }
}