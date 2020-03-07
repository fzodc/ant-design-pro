import { message } from 'antd';
import { list, save, statusBatch, detail, token, del, config, tenantInfo, tenantView, orgView, decrySecret } from '../services/uniCompService';
import { conversion, conversionReq } from "../pages/util";

export default {
  namespace: 'uniComp',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    tenantList:[],
    userList:[]
  },

  effects: {

    * list({ payload, onConversionData, callback }, { call, put }) {
      // console.log('payload:', JSON.stringify(payload));
      const req = conversionReq(payload);
      // console.log('req:', JSON.stringify(req));
      const response = yield call(list, req);
      // console.log('response:', response);
      yield put({
        type: 'saveData',
        payload: response,
        onConversionData,
      });
      if (callback) callback(response);
    },
    *save({ payload, callback }, { call }) {
      console.log('postinfo add:', payload);
      const response = yield call(save, payload);
      // console.log('postinfo response add1:', response);
      if (callback) callback(response);
      // console.log('postinfo response add3:');
    },
    *saveDebug({ payload, callback }, { call }) {
      const response = yield call(save, payload);
      // console.log('postinfo response add1:', response);
      if (callback) callback(response);
      // console.log('postinfo response add3:');
    },
    *token({ payload, callback }, { call }) {
      const response = yield call(token, payload);
      // console.log('postinfo response add1:', response);
      if (callback) callback(response);
      // console.log('postinfo response add3:');
    },
    *del({ payload, callback }, { call }) {
      const response = yield call(del, payload);
      // console.log('postinfo response add1:', response);
      if (callback) callback(response);
      // console.log('postinfo response add3:');
    },
    *statusBatch({ payload, callback }, { call }) {
      const req = conversionReq(payload);
      // console.log('sysdata statusBatch in Model1:', payload);
      // console.log('sysdata statusBatch in Model2:', req);
      const response = yield call(statusBatch, req);
      // console.log('sysdata statusBatch in Model3:', response);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      if (callback) callback(response);
    },
    *submitRelation({ payload, callback }, { call }) {
      // console.log("payload in submitRelation model---:",JSON.stringify(payload));
      const response = yield call(save, payload);
      // console.log("response in submitRelation model---:",response);
      if (callback) callback(response);
    },
    *detail({ payload, callback }, { call }) {
      // console.log('sysdata detail request in Model:', payload);
      const response = yield call(detail, payload);
      // console.log('sysdata detail response in Model:', response,(!response||response.code!=="200"));
      if (!response || response.code !== "200") {
        response.data = {};
        const errorMsg = response.msg && response.msg !== "" ? response.msg : `Sorry, the server is reporting an error,code=${response.code}`;
        message.error(errorMsg);
      }
      if (callback) callback(response.data);
    },
    *config({ payload, callback }, { call }) {
      const response = yield call(config, payload);
      if (!response || response.code !== "200") {
        response.data = {};
        const errorMsg = response.msg && response.msg !== "" ? response.msg : `Sorry, the server is reporting an error,code=${response.code}`;
        message.error(errorMsg);
      }
      // console.log("response.data",response.data);
      if (callback) callback(response.data);
    },
    * listTenant({ payload, callback }, { call, put }) {
      const response = yield call(list, payload);
      yield put({
        type: 'saveTenant',
        payload: response
      });
      if (callback) callback(response);
    },
    * tenantInfo({ payload, callback }, { call, put }) {
      const response = yield call(tenantInfo, payload);
      yield put({
        type: 'saveTenant',
        payload: response,
      });
      if (callback) callback(response);
    },
    * allUserList({ payload, callback }, { call, put }) {
      const response = yield call(list, payload);
      yield put({
        type: 'saveUser',
        payload: response
      });
      if (callback) callback(response);
    },
    * tenantView({ payload, callback }, { call }) {
      const response = yield call(tenantView, payload);
      if (callback) callback(response);
    },
    * orgView({ payload, callback }, { call }) {
      const response = yield call(orgView, payload);
      if (callback) callback(response);
    },
    * decrySecret({ payload, callback }, { call }) {
      const response = yield call(decrySecret, payload);
      if (callback) callback(response);
    }
  },

  reducers: {
    saveData(state, action) {
      const data = action.payload ? action.payload.data : null;
      const response = conversion(data);
      // console.log("--------4",response);
      // if(action.tableMode==='Tree'){
      //   const newData=[];
      //   flatToTree(response.list,newData,0);
      //   response.list=newData;
      //   // console.log("-----flat to tree---5",newData);
      // }
      const { onConversionData } = action;
      if (onConversionData) {
        response.list = onConversionData(response.list);
      }
      return {
        ...state,
        data: response,
      };
    },
    saveTenant(state, action) {
      const tenantList = action.payload ? action.payload.data.records : [];
      return {
        ...state,
        tenantList
      };
    },
    saveUser(state, action) {
      const userList = action.payload ? action.payload.data.records : [];
      return {
        ...state,
        userList
      };
    }
  },
};
