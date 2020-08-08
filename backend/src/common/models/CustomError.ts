import { ErrorCode } from '../enums/ErrorCode';

export default class CustomError {
  status: number;

  message?: string;

  errorCode?: number;

  originalError?: any;

  constructor(status: number, message?: string, errorCode?: ErrorCode, original?: any) {
    this.status = status;
    this.errorCode = errorCode;
    this.message = message;
    this.originalError = original;
  }
}
