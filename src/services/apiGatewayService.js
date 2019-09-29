// import { stringify } from 'qs';
import request from '@/utils/request';
import constants from '@/utils/constUtil';

const { PREFIX_PATH } = constants;

export async function apiList(params) {
  console.log('params in queryApi:', params,`${PREFIX_PATH}/baseInfo/apiService/apiList`);
  return request(`${PREFIX_PATH}/baseInfo/apiService/apiList`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function callList(params) {
  console.log('params in queryApi:', params,`${PREFIX_PATH}/baseInfo/apiService/callApis`);
  return request(`${PREFIX_PATH}/baseInfo/apiService/callApis`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function apiListBySearch(params) {
  console.log('params in queryApi:', params,`${PREFIX_PATH}/baseInfo/apiService/apiListBySearch`);
  return request(`${PREFIX_PATH}/baseInfo/apiService/apiListBySearch`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function apiStatusBatch(params) {
  // console.log('params:', params);
  return request(`${PREFIX_PATH}/baseInfo/apiService/apiBatch`, {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addApi(params) {
  return request('/conf/apiGateway', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateApi(params) {
  return request('/conf/apiGateway', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function apiInfo(params) {
  console.log('params in queryApi:', params);
  return request(`${PREFIX_PATH}/baseInfo/apiService/apiInfo`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function saveApi(params) {
  return request(`${PREFIX_PATH}/baseInfo/apiService/saveApi`, {
    method: 'POST',
    data: params,
  });
}

// --------enumMock.js--------------
export async function getMasterData(params) {
  return request(`${PREFIX_PATH}enum/${params.key}`);
}

export async function removeApis(params){
  return request(`${PREFIX_PATH}/baseInfo/apiService/removeApis`, {
    method: 'POST',
    data: params,
  });
}
