import request from  '@/utils/request';
import constants from '@/utils/constUtil';

const { PREFIX_PATH } = constants;

export async function list(params) {
  return request(`${PREFIX_PATH}/baseInfo/sysdata/${params.tableName}/list`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function save(params){
  return request(`${PREFIX_PATH}/baseInfo/${params.tableName}/save`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function del(){

}

export async function update(){

}

export async function listOut(params) {
  return request(`${PREFIX_PATH}/baseInfo/sysdata/${params.tableName}/list`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function listAllIn(params) {
  return request(`${PREFIX_PATH}/baseInfo/appkeyInbound/appkeyInboundList?apiId=${params.apiId}`);
}

export async function tenantManager(params) {
  return request(`${PREFIX_PATH}/baseInfo/tenant/management?userId=${params.userId}`);
}

export async function access(params){
  return request(`${PREFIX_PATH}/baseInfo/appkeyInbound/access`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
