import {message} from 'antd';
import {list, listOut,save,listAllIn,tenantManager,access} from '../services/appkeyService';
import constants from '@/utils/constUtil';
import {conversionWsdl} from "../pages/util";

const { STATUS } = constants;
export default {
  namespace: 'appkeyModel',

  state: {
    inAppkeyList :[],
    outAppkeyList :[],
    data:[],
    tenant:{}
  },

  effects: {
    * list({payload, callback}, {call, put}) {
      const response = yield call(list,payload);
      if (callback) {
        const data = response && response.data ? response.data : [];
        const adapterList = data.filter(item => item.status === STATUS.A);
        callback(adapterList);
      }
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * save({payload, callback}, {call, put }) {
      console.log('postinfo add:', payload);
      const response = yield call(save, payload);
      if (callback) callback(response);
    },
    * listIn({payload, callback}, {call, put}) {
      const response = yield call(listOut,payload);
      yield put({
        type: 'saveIn',
        payload: response,
      });
    },
    * listAllIn({payload, callback}, {call, put}) {
      const response = yield call(listAllIn,payload);
      yield put({
        type: 'saveIn',
        payload: response,
      });
    },
    * listOut({payload, callback}, {call, put}) {
      const response = yield call(listOut,payload);
      if (callback) {
        const data = response && response.data ? response.data : [];
        const adapterList = data.filter(item => item.status === STATUS.A);
        callback(adapterList);
      }
      yield put({
        type: 'saveOut',
        payload: response,
      });
    },
    * tenantManager({payload, callback}, {call, put}) {
      const response = yield call(tenantManager,payload);
      yield put({
        type: 'saveTenant',
        payload: response,
      });
      if (callback) callback(response);
    },
    * access({payload, callback}, {call, put }) {
      console.log('postinfo add:', payload);
      const response = yield call(access, payload);
      if (callback) callback(response);
    },
  },
  reducers: {
    save(state, action) {
      const data = action.payload.data;
      return {
        ...state,
        data,
      };
    },
    saveIn(state, action) {
      const data = action.payload ? action.payload.data : [];
      const inAppkeyList = data;
      return {
        ...state,
        inAppkeyList
      };
    },
    saveOut(state, action) {
      const data = action.payload ? action.payload.data : [];
      const outAppkeyList = data.filter(item => item.status === STATUS.A);
      // adapterList.unshift({"adapterId": null, "adapterName": "All"});
      return {
        ...state,
        outAppkeyList,
      };
    },
    saveTenant(state, action) {
      const tenant = action.payload ? action.payload.data : {};
      return {
        ...state,
        tenant,
      };
    },
  }
}


