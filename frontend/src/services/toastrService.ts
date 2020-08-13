import { toastr } from 'react-redux-toastr';

export async function toastrError(errorMessage: string) {
  await toastr.error('Error', errorMessage);
}

export async function toastrSuccess(message: string) {
  await toastr.success('Success', message);
}
