import { ErrorCode } from '../../enums/ErrorCode';

export interface IResponseError {
  status: number;
  message?: string;
  errorCode?: ErrorCode;
  originalError?: any;
}
