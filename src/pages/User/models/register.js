// import { fakeRegister } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { fakeAccountRegister } from '@/services/userService';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload, callback }, { call, put }) {
    // *submit(_, { put }) {
      const response = yield call(fakeAccountRegister, payload);
      if (callback) callback(response);
      // const response = { status: 'ok', currentAuthority: 'guess' };
      // yield put({
      //   type: 'registerHandle',
      //   payload: response,
      // });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
