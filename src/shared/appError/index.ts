export class AppError {
  readonly status: number;
  readonly message: string;

  constructor(message: string, status = 400) {
    this.status = status;
    this.message = message;
  }
}
