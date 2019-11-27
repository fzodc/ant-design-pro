import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { list,fakeAccountLogin } from '@/services/userService';
import { setAuthority, setUser,setEnvUrl } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';


export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
        loginType: payload.type,
      });
      const status = response.code && response.code === '200' ? 'ok' : 'error';
      // Login successfully
      if (status === 'ok') {
        const {id,username,tenantId}=response.data;
        const user={id,username,tenantId};
        console.log("4:",user);
        setUser(user);
        console.log("3:",user);
        reloadAuthorized();
        console.log("2:");
        let url="/user/loading";
        const params = getPageQuery();
        console.log("1:",params);
        const newPayload = {
          data: {info: {pageNo: 1, pageSize: 10}},
          info: {pageNo: 1, pageSize: 10},
          method: "post",
          tableName: "env",
        };
        // 存储网关serviceAgent地址
        const envResponse = yield call(list, newPayload);
        yield put({
          type: 'saveEnv',
          payload: envResponse
        });
        const { redirect } = params;
        console.log(redirect);
        if (redirect) {
          url+=`?redirect=${redirect}`;
        }
        yield put(routerRedux.replace(url));
      }
      // else{
      //   message.error(response.msg);
      // }
    },

    // *getCaptcha({ payload }, { call }) {
    //   yield call(getFakeCaptcha, payload);
    // },

    *getCaptcha() {
      yield '111';
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: ['guest'],
        },
      });
      reloadAuthorized();
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload, loginType }) {
      const status = payload.code === '200' ? 'ok' : 'error';
      // console.log(status, loginType, payload);
      if (payload.code === '200' && payload.data && payload.data.currentAuthority) {
        setAuthority(payload.data.currentAuthority);
        // setAuthority(['admin','manager','user']);
      } else {
        setAuthority(['guest']);
      }
      return {
        ...state,
        status,
        type: loginType,
      };
    },
    saveEnv(state, action) {
      const envList = action.payload ? action.payload.data.records : [];
      console.log("saveEnv",envList.filter(item=> item.ifSelected === "1")[0]);
      const envObj = envList.filter(item=> item.ifSelected === "1")[0] || {};
      const {privateGatewayUrl} = envObj || {};
      setEnvUrl(privateGatewayUrl);
    }
  },
};
