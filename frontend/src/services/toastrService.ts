import { toastr } from 'react-redux-toastr';

export async function toastrError(errorMessage: string) {
  await toastr.error('Error', errorMessage);
}
