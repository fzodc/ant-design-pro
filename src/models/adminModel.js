import { refreshCache } from '@/services/sysDataService';

export default {
  namespace: 'adminModel',

  state: {
    status: undefined,
    message:undefined,
  },

  effects: {
    * refreshCache({ payload,callback }, {call, put}) {
      const response = yield call(refreshCache,payload);
      yield put({
        type: 'changeCacheStatus',
        payload: response,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    changeCacheStatus(state, { payload }) {
      const status = payload.code === '200' ? 'success' : 'error';
      const {msg} = payload;
      return {
        ...state,
        status,
        message:msg,
      };
    },
  },
};
