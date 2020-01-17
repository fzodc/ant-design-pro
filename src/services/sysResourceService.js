import request from '@/utils/request';
import constants from '@/utils/constUtil';
import { stringify } from 'qs';

const { PREFIX_PATH } = constants;

export async function list(params) {
  return request(`${PREFIX_PATH}/auth/client/list`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function resourceList(params) {
  return request(`${PREFIX_PATH}/auth/oauthResource/list`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function save(params) {
  return request(`${PREFIX_PATH}/auth/client/saveOrUpdate`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function saveResource(params) {
  return request(`${PREFIX_PATH}/auth/oauthResource/saveOrUpdate`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function statusBatch(params) {
  return request(`${PREFIX_PATH}/auth/client/operation`, {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function statusBatchResource(params) {
  return request(`${PREFIX_PATH}/auth/resource/operation`, {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}
