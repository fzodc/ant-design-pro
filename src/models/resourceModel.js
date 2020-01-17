import { list,resourceList,save,saveResource,statusBatch,statusBatchResource } from '../services/sysResourceService';
import constants from '@/utils/constUtil';
import {conversionInfo, conversionClientInfo, conversionReqNoInfo, conversionList, conversionDel,} from "../pages/util";

const { STATUS } = constants;
export default {
  namespace: 'resourceModel',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    resourceList: [],
  },

  effects: {
    *list({ payload ,onConversionData,callback}, { call, put }) {
      console.log('payload:', payload);
      const req = conversionReqNoInfo(payload);
      // console.log('req:', JSON.stringify(req));
      const response = yield call(list, req);
      console.log("response in resource model:",response);
      yield put({
        type: 'saveData',
        payload: response,
        onConversionData,
      });
      if (callback) callback(response);
    },
    *resourceList({ payload ,onConversionData,callback}, { call, put }) {
      console.log('payload:', payload);
      const req = conversionReqNoInfo(payload);
      // console.log('req:', JSON.stringify(req));
      const response = yield call(resourceList, req);
      console.log("response in resource model:",response);
      yield put({
        type: 'saveData',
        payload: response,
        onConversionData,
      });
      if (callback) callback(response);
    },
    *allList({ payload ,callback}, { call, put }) {
      const response = yield call(resourceList, payload);
      console.log("response in resource model:",response);
      yield put({
        type: 'saveAll',
        payload: response,
      });
      if (callback) callback(response);
    },
    *save({ payload, callback }, { call }) {
      console.log('postinfo add:', payload);
      const newPayload = conversionClientInfo(payload);
      const response = yield call(save, newPayload);
      // console.log('postinfo response add1:', response);
      if (callback) callback(response);
      // console.log('postinfo response add3:');
    },
    *saveResource({ payload, callback }, { call }) {
      console.log('postinfo add:', payload);
      const newPayload = conversionInfo(payload);
      const response = yield call(saveResource, newPayload);
      // console.log('postinfo response add1:', response);
      if (callback) callback(response);
      // console.log('postinfo response add3:');
    },
    *statusBatch({ payload, callback }, { call }) {
      const req = conversionDel(payload);
      const response = yield call(statusBatch, req);
      if (callback) callback(response);
    },
    *statusBatchResource({ payload, callback }, { call }) {
      const req = conversionDel(payload);
      console.log("statusBatchResource",req);
      const response = yield call(statusBatchResource, req);
      if (callback) callback(response);
    },
  },
  reducers: {
    saveData(state, action) {
      const data = action.payload ? action.payload.data : null;
      const response = conversionList(data);
      console.log("saveData1111",action.payload,data);
      const { onConversionData } = action;
      if (onConversionData) {
        response.list = onConversionData(response.list);
      }
      return {
        ...state,
        data: response,
      };
    },
    saveAll(state, action) {
      console.log("response in resource model reducers:",action.payload.data);
      const data=action.payload ? action.payload.data.records : [];
      const filterResourceList=data.filter((item)=>(item.status===STATUS.A));
      return {
        ...state,
        resourceList:filterResourceList,
      };
    },
  },
};
