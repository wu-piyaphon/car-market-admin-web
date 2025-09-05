export type TQueue = {
  resolve: (value: string) => void;
  reject: (error: unknown) => void;
};

export interface ApiErrorResponse {
  message: string[];
  error: string;
  statusCode: number;
}

export class ApiError extends Error {
  public statusCode: number;
  public error: string;
  public messages: string[];
  public message: string;

  constructor(response: ApiErrorResponse) {
    super(response.message.join("; "));

    this.name = "ApiError";
    this.statusCode = response.statusCode;
    this.error = response.error;
    this.messages = response.message;
    this.message = response.message[0] || "An error occurred";
  }

  // Get the first error message
  get primaryMessage(): string {
    return this.message;
  }

  // Get all messages as a formatted string
  get formattedMessage(): string {
    return this.messages.join("\n");
  }
}
