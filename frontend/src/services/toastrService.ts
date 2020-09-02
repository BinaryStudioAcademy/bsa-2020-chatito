import { IBindingAction } from 'common/models/callback/IBindingActions';
import { toastr } from 'react-redux-toastr';

export const toastrError = async (errorMessage: string) => {
  toastr.error('Error', errorMessage);
};

export const toastrSuccess = async (message: string) => {
  toastr.success('Success', message);
};

export const toastrCustomNotification = async (
  notificationText: string,
  timeOut: number,
  className: string,
  onToastrClick: IBindingAction
) => {
  toastr.success('New message', notificationText, { timeOut, className, onToastrClick });
};
