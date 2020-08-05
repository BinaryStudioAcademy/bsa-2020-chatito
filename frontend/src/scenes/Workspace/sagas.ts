import { postWorkspaceNameRoutine } from './routines'
import { Routine } from 'redux-saga-routines';
import {takeEvery, put, call} from 'redux-saga/effects'
import {makeRequest} from '../../services/workspaceService'

function* makeWorkspaceRequest({ payload }: Routine<any>){
  yield put(makeRequest(payload));
}

function* watchPostWorkspaceName() {
  yield takeEvery(postWorkspaceNameRoutine.TRIGGER, makeWorkspaceRequest)
}
