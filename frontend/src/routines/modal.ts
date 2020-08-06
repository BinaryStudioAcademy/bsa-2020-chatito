import { ModalTypes } from '../common/enums/ModalTypes';
import { createRoutine } from 'redux-saga-routines';

export const modal = createRoutine('MODAL');

export interface IModalRoutine{
  modalType: ModalTypes;
  show: boolean;
}
