/* eslint-disable eqeqeq */
import {parse} from 'url';
import constants from './constUtil';

const {STATUS} = constants;
// mock tableListDataSource


const urlSample = "/rest/{tableName}/voice/{id}";
const urlSample1 = "/rest/{tableName}/voice/123123";
const requestHeaderSample = "[{\"key\":\"appkey\",\"value\":\"xxxx\"}]";
const requestBodySample = "[{\"name\":\"appkey\",\"type\":\"string\",\"remark\":\"app key\",\"parent\":\"-\"}]";
const responseHeaderSample = "{\"type\":1,\"name\":\"asia info\",\"rela\":{\"orgId\":1,\"orgName\":\"asia intl\"}}";
const responseBodySample = "[{\"name\":\"type\",\"type\":\"integer\",\"remark\":\"type for query\",\"parent\":\"root\"},{\"name\":\"name\",\"type\":\"string\",\"remark\":\"name for query\",\"parent\":\"root\"}]";

const allRoleList = [
  {
    "roleId": 1,
    "roleName": "admin",
    "remark": "admin",
    "status": STATUS.A,

  },
  {
    "roleId": 2,
    "roleName": "manager",
    "remark": "",
    "status": STATUS.A,
  },
  {
    "roleId": 3,
    "roleName": "user",
    "remark": "",
    "status": STATUS.A,
  },
];

const configlist = {
  "code": "200",
  "msg": null,
  "data": [
    {
      "envId": 1,
      "publicGatewayUrl": 'pb_gwl0',
      "privateGatewayUrl": 'pr_gwl0',
      "agentUrl": 'agent_url0',
      "envName": 'env_name0',
      "status": STATUS.A,
      "fileServerUrl": '/f/fsul0',
      "ifSelected": 'T',
    },
    {
      "envId": 2,
      "publicGatewayUrl": 'pb_gwl1',
      "privateGatewayUrl": 'pr_gwl1',
      "agentUrl": 'agent_url1',
      "envName": 'env_name1',
      "status": STATUS.D,
      "fileServerUrl": '/f/fsul1',
      "ifSelected": 'T',
    },
    {
      "envId": 3,
      "publicGatewayUrl": 'pb_gwl2',
      "privateGatewayUrl": 'pr_gwl2',
      "agentUrl": 'agent_url2',
      "envName": 'env_name2',
      "status": STATUS.A,
      "fileServerUrl": '/f/fsul2',
      "ifSelected": 'F',
    },
    {
      "envId": 4,
      "publicGatewayUrl": 'pb_gwl3',
      "privateGatewayUrl": 'pr_gwl3',
      "agentUrl": 'agent_url3',
      "envName": 'env_name3',
      "status": STATUS.A,
      "fileServerUrl": '/f/fsul3',
      "ifSelected": 'T',
    },
    {
      "envId": 5,
      "publicGatewayUrl": 'pb_gwl4',
      "privateGatewayUrl": 'pr_gwl4',
      "agentUrl": 'agent_url4',
      "envName": 'env_name4',
      "status": STATUS.A,
      "fileServerUrl": '/f/fsul4',
      "ifSelected": 'T',
    },
    {
      "envId": 6,
      "publicGatewayUrl": 'pb_gwl5',
      "privateGatewayUrl": 'pr_gwl5',
      "agentUrl": 'agent_url5',
      "envName": 'env_name5',
      "status": STATUS.D,
      "fileServerUrl": '/f/fsul5',
      "ifSelected": 'T',
    },
    {
      "envId": 7,
      "publicGatewayUrl": 'pb_gwl6',
      "privateGatewayUrl": 'pr_gwl6',
      "agentUrl": 'agent_url6',
      "envName": 'env_name6',
      "status": STATUS.A,
      "fileServerUrl": '/f/fsul6',
      "ifSelected": 'F',
    },
    {
      "envId": 8,
      "publicGatewayUrl": 'pb_gwl7',
      "privateGatewayUrl": 'pr_gwl7',
      "agentUrl": 'agent_url07',
      "envName": 'env_name7',
      "status": STATUS.D,
      "fileServerUrl": '/f/fsul7',
      "ifSelected": 'F',
    },
    {
      "envId": 9,
      "publicGatewayUrl": 'pb_gwl8',
      "privateGatewayUrl": 'pr_gwl8',
      "agentUrl": 'agent_url8',
      "envName": 'env_name8',
      "status": STATUS.A,
      "fileServerUrl": '/f/fsul8',
      "ifSelected": 'T',
    },
    {
      "envId": 10,
      "publicGatewayUrl": 'pb_gwl9',
      "privateGatewayUrl": 'pr_gwl9',
      "agentUrl": 'agent_url9',
      "envName": 'env_name9',
      "status": STATUS.A,
      "fileServerUrl": '/f/fsul9',
      "ifSelected": 'T',
    },
    {
      "envId": '11',
      "publicGatewayUrl": 'pb_gwl10',
      "privateGatewayUrl": 'pr_gwl10',
      "agentUrl": 'agent_url10',
      "envName": 'env_name10',
      "status": STATUS.A,
      "fileServerUrl": '/f/fsul10',
      "ifSelected": 'T',
    },
  ]
}

const groups = {
  "code": "200",
  "msg": null,
  "data": [
    {
      "groupId": 1,
      "groupName": "语音识别",
      "groupDesc": "分组1",
      "groupApiDoc": "空",
      "status": STATUS.A
    },
    {
      "groupId": 2,
      "groupName": "OCR识别",
      "groupDesc": "aaaaa",
      "groupApiDoc": "bbbbbb",
      "status": STATUS.A
    },
    {
      "groupId": 3,
      "groupName": "身份识别",
      "groupDesc": "aaaaa1",
      "groupApiDoc": "bbbbbb1",
      "status": STATUS.A
    },
    {
      "groupId": 4,
      "groupName": "文本识别",
      "groupDesc": null,
      "groupApiDoc": null,
      "status": STATUS.A
    }
  ]
};
const roles = {
  "code": "200",
  "msg": null,
  "data": allRoleList,
};

// const flatPrivileges=[];
// const routes=getRouteDatas(routeDatas);
// toSimulatePrivilege(flatPrivileges,routes,true,true);

const privileges = {
  "code": "200",
  "msg": null,
  "data": {
    "records": [
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/",
        "sysPrivilegeRoles": [],
        "privilegeId": 1,
        "name": "home",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 0,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 2,
        "hideInMenu": "N",
        "path": "/apiGateway",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 2,
            "roleId": 2,
            "roleName": "manager",
            "id": 1
          },
          {
            "privilegeId": 2,
            "roleId": 3,
            "roleName": "user",
            "id": 2
          }
        ],
        "privilegeId": 2,
        "name": "apiGateway",
        "icon": "gateway",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 0,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/apiGateway/apiList",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 3,
            "roleId": 2,
            "roleName": "manager",
            "id": 3
          },
          {
            "privilegeId": 3,
            "roleId": 3,
            "roleName": "user",
            "id": 4
          },
          {
            "privilegeId": 3,
            "roleId": 1,
            "roleName": "admin",
            "id": 5
          }
        ],
        "privilegeId": 3,
        "name": "apiList",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 2,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 2,
        "hideInMenu": "N",
        "path": "/apiGateway/apiUpdate",
        "sysPrivilegeRoles": [],
        "privilegeId": 4,
        "name": "apiUpdate",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 2,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 3,
        "hideInMenu": "N",
        "path": "/apiGateway/apiCreate",
        "sysPrivilegeRoles": [],
        "privilegeId": 5,
        "name": "apiCreate",
        "hideChildrenInMenu": "Y",
        "parentPrivilegeId": 2,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/apiGateway/apiCreate/info",
        "sysPrivilegeRoles": [],
        "privilegeId": 6,
        "name": "info",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 5,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 2,
        "hideInMenu": "N",
        "path": "/apiGateway/apiCreate/consumer",
        "sysPrivilegeRoles": [],
        "privilegeId": 7,
        "name": "consumer",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 5,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 3,
        "hideInMenu": "N",
        "path": "/apiGateway/apiCreate/producer",
        "sysPrivilegeRoles": [],
        "privilegeId": 8,
        "name": "producer",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 5,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 4,
        "hideInMenu": "N",
        "path": "/apiGateway/apiCreate/result",
        "sysPrivilegeRoles": [],
        "privilegeId": 9,
        "name": "result",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 5,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 3,
        "hideInMenu": "N",
        "path": "/baseData",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 10,
            "roleId": 2,
            "roleName": "manager",
            "id": 6
          },
          {
            "privilegeId": 10,
            "roleId": 3,
            "roleName": "user",
            "id": 40
          }
        ],
        "privilegeId": 10,
        "name": "baseData",
        "icon": "table",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 0,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseData/org",
        "sysPrivilegeRoles": [],
        "privilegeId": 11,
        "name": "org",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 10,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 2,
        "hideInMenu": "N",
        "path": "/baseData/group",
        "sysPrivilegeRoles": [],
        "privilegeId": 12,
        "name": "group",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 10,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 4,
        "hideInMenu": "N",
        "path": "/userManager",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 13,
            "roleId": 1,
            "roleName": "admin",
            "id": 7
          }
        ],
        "privilegeId": 13,
        "name": "userManager",
        "icon": "team",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 0,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/userManager/user",
        "sysPrivilegeRoles": [],
        "privilegeId": 14,
        "name": "user",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 13,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 2,
        "hideInMenu": "N",
        "path": "/userManager/role",
        "sysPrivilegeRoles": [],
        "privilegeId": 15,
        "name": "role",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 13,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 3,
        "hideInMenu": "N",
        "path": "/userManager/privilege",
        "sysPrivilegeRoles": [],
        "privilegeId": 16,
        "name": "privilege",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 13,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 5,
        "hideInMenu": "N",
        "path": "/admin",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 17,
            "roleId": 1,
            "roleName": "admin",
            "id": 8
          }
        ],
        "privilegeId": 17,
        "name": "admin",
        "icon": "table",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 0,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/admin/logPage",
        "sysPrivilegeRoles": [],
        "privilegeId": 18,
        "name": "logPage",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 17,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 6,
        "hideInMenu": "N",
        "path": "/test",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 19,
            "roleId": 1,
            "roleName": "admin",
            "id": 32
          }
        ],
        "privilegeId": 19,
        "name": "test",
        "icon": "table",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 0,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/test/test1",
        "sysPrivilegeRoles": [],
        "privilegeId": 20,
        "name": "test1",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 19,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 2,
        "hideInMenu": "N",
        "path": "/test/test2",
        "sysPrivilegeRoles": [],
        "privilegeId": 21,
        "name": "test2",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 19,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 3,
        "hideInMenu": "N",
        "path": "/test/test3",
        "sysPrivilegeRoles": [],
        "privilegeId": 22,
        "name": "test3",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 19,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 4,
        "hideInMenu": "N",
        "path": "/test/test4",
        "sysPrivilegeRoles": [],
        "privilegeId": 23,
        "name": "test4",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 19,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 5,
        "hideInMenu": "N",
        "path": "/test/test5",
        "sysPrivilegeRoles": [],
        "privilegeId": 24,
        "name": "test5",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 19,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 6,
        "hideInMenu": "N",
        "path": "/test/orgTransfer",
        "sysPrivilegeRoles": [],
        "privilegeId": 25,
        "name": "orgTransfer",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 19,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 7,
        "hideInMenu": "N",
        "path": "/account",
        "sysPrivilegeRoles": [],
        "privilegeId": 26,
        "name": "account",
        "icon": "user",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 0,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/account/center",
        "sysPrivilegeRoles": [],
        "privilegeId": 27,
        "name": "center",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 26,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 2,
        "hideInMenu": "N",
        "path": "/account/settings",
        "sysPrivilegeRoles": [],
        "privilegeId": 28,
        "name": "settings",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 26,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 8,
        "hideInMenu": "N",
        "path": "/editor",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 29,
            "roleId": 1,
            "roleName": "admin",
            "id": 10
          }
        ],
        "privilegeId": 29,
        "name": "editor",
        "icon": "highlight",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 0,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/editor/flow",
        "sysPrivilegeRoles": [],
        "privilegeId": 30,
        "name": "flow",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 29,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 2,
        "hideInMenu": "N",
        "path": "/editor/mind",
        "sysPrivilegeRoles": [],
        "privilegeId": 31,
        "name": "mind",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 29,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 3,
        "hideInMenu": "N",
        "path": "/editor/koni",
        "sysPrivilegeRoles": [],
        "privilegeId": 32,
        "name": "koni",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 29,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 9,
        "hideInMenu": "N",
        "path": "/exception",
        "sysPrivilegeRoles": [],
        "privilegeId": 33,
        "name": "exception",
        "icon": "warning",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 0,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/exception/403",
        "sysPrivilegeRoles": [],
        "privilegeId": 34,
        "name": "not-permission",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 33,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 2,
        "hideInMenu": "N",
        "path": "/exception/404",
        "sysPrivilegeRoles": [],
        "privilegeId": 35,
        "name": "not-find",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 33,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 3,
        "hideInMenu": "N",
        "path": "/exception/500",
        "sysPrivilegeRoles": [],
        "privilegeId": 36,
        "name": "server-error",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 33,
        "type": "menu",
        "status": "A"
      },
      {
        "orderSeq": 4,
        "hideInMenu": "Y",
        "path": "/exception/trigger",
        "sysPrivilegeRoles": [],
        "privilegeId": 37,
        "name": "trigger",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 33,
        "type": "menu",
        "status": "A"
      },
      {
        "hideInMenu": "",
        "path": "***",
        "sysPrivilegeRoles": [],
        "privilegeId": 54,
        "name": "publicApi",
        "icon": "",
        "hideChildrenInMenu": "",
        "parentPrivilegeId": 0,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/sys/allEnumList",
        "sysPrivilegeRoles": [],
        "privilegeId": 89,
        "name": "allEnumList",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 54,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/sys/enumList",
        "sysPrivilegeRoles": [],
        "privilegeId": 90,
        "name": "enumList",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 54,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/sys/enumItemInfo",
        "sysPrivilegeRoles": [],
        "privilegeId": 91,
        "name": "enumItemInfo",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 54,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/api/allGroupList",
        "sysPrivilegeRoles": [],
        "privilegeId": 92,
        "name": "allGroupList",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 54,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/apiService/apiList",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 93,
            "roleId": 1,
            "roleName": "admin",
            "id": 35
          },
          {
            "privilegeId": 93,
            "roleId": 2,
            "roleName": "manager",
            "id": 36
          },
          {
            "privilegeId": 93,
            "roleId": 3,
            "roleName": "user",
            "id": 37
          }
        ],
        "privilegeId": 93,
        "name": "apiList",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 2,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/apiService/apiInfo",
        "sysPrivilegeRoles": [],
        "privilegeId": 94,
        "name": "apiInfo",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 2,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/apiService/apiBatch",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 95,
            "roleId": 1,
            "roleName": "admin",
            "id": 100
          }
        ],
        "privilegeId": 95,
        "name": "apiBatch",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 2,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/Org/getOrg",
        "sysPrivilegeRoles": [],
        "privilegeId": 96,
        "name": "getOrg",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 54,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/apiService/saveApi",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 108,
            "roleId": 2,
            "roleName": "manager",
            "id": 38
          }
        ],
        "privilegeId": 108,
        "name": "api_save",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 4,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/sysdata/org/save",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 109,
            "roleId": 1,
            "roleName": "admin",
            "id": 104
          }
        ],
        "privilegeId": 109,
        "name": "org_save",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 11,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/sysdata/api_group/save",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 110,
            "roleId": 1,
            "roleName": "admin",
            "id": 105
          }
        ],
        "privilegeId": 110,
        "name": "group_save",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 12,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/sysdata/sys_user/save",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 111,
            "roleId": 1,
            "roleName": "admin",
            "id": 34
          }
        ],
        "privilegeId": 111,
        "name": "user_save",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 14,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/sysdata/sys_privilege/save",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 112,
            "roleId": 1,
            "roleName": "admin",
            "id": 107
          }
        ],
        "privilegeId": 112,
        "name": "privilege_save",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 16,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/sysdata/sys_role/save",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 113,
            "roleId": 1,
            "roleName": "admin",
            "id": 108
          }
        ],
        "privilegeId": 113,
        "name": "role_save",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 15,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/sysdata/api_group/statusBatch",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 115,
            "roleId": 1,
            "roleName": "admin",
            "id": 27
          }
        ],
        "privilegeId": 115,
        "name": "group_statusBatch",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 12,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/sysdata/sys_user/statusBatch",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 116,
            "roleId": 1,
            "roleName": "admin",
            "id": 28
          }
        ],
        "privilegeId": 116,
        "name": "user_statusBatch",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 14,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/sysdata/sys_privilege/statusBatch",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 117,
            "roleId": 1,
            "roleName": "admin",
            "id": 29
          }
        ],
        "privilegeId": 117,
        "name": "privilege_statusBatch",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 16,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/sysdata/sys_role/statusBatch",
        "sysPrivilegeRoles": [
          {
            "privilegeId": 118,
            "roleId": 1,
            "roleName": "admin",
            "id": 30
          }
        ],
        "privilegeId": 118,
        "name": "role_statusBatch",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 15,
        "type": "api",
        "status": "A"
      },
      {
        "orderSeq": 1,
        "hideInMenu": "N",
        "path": "/baseInfo/sysdata/org/statusBatch",
        "sysPrivilegeRoles": [],
        "privilegeId": 119,
        "name": "org_statusBatch",
        "hideChildrenInMenu": "N",
        "parentPrivilegeId": 11,
        "type": "api",
        "status": "A"
      }
    ],
    "pagination": {
      "total": 57,
      "pageSize": 999,
      "pageNo": 1
    },
    "total": 57,
    "current": 1,
    "size": 999,
    "pages": 1
  }
};
const users = {
  "code": "200",
  "msg": null,
  "data": [
    {
      "id": 1,
      "username": "admin",
      "password": "ant.design",
      "email": "j1@163.com",
      "tel": "18905926370",
      "utype": "client",
      "status": STATUS.A,
      "sysUserRoles": [{"id": 1, "userId": 1, "roleId": 1, "roleName": "admin"},],
    },
    {
      "id": 2,
      "username": "user",
      "password": "ant.design",
      "email": "j2@163.com",
      "tel": "18905926371",
      "utype": "client",
      "status": STATUS.A,
      "sysUserRoles": [{"id": 1, "userId": 2, "roleId": 3, "roleName": "user"},],
    },
    {
      "id": 3,
      "username": "manager",
      "password": "ant.design",
      "email": "j3@163.com",
      "tel": "18905926373",
      "utype": "client",
      "status": STATUS.A,
      "sysUserRoles": [],
    },
    {
      "id": 4,
      "username": "super_admin",
      "password": "ant.design",
      "email": "j4@163.com",
      "tel": "18905926374",
      "utype": "client",
      "status": STATUS.A,
      "sysUserRoles": [{"id": 9, "userId": 4, "roleId": 1, "roleName": "admin"}, {
        "id": 10,
        "userId": 4,
        "roleId": 2,
        "roleName": "manager"
      }, {"id": 11, "userId": 4, "roleId": 3, "roleName": "user"},],
    },
  ]
};
const adapterSpecs = {
  "code": "200",
  "msg": null,
  "data": [
    {
      "id": 1,
      "name": "ootb_adapter_in",
      "techType": "url",
      "pointType": "in",
      "url": "http://333",
      "reqPath": "/rest/111",
      "code": "String a=\"dd\";",
      "status": "A",
      "attrSpecs": [{
        "attrSpecId": 151,
        "attrSpecCode": "busi_code",
        "attrSpecName": "business Code",
        "tableName": "api_service_backend",
        "upId": 0,
        "adapterSpecId": 1
      },
        {
          "attrSpecId": 152,
          "attrSpecCode": "operation_code",
          "attrSpecName": "operation code",
          "defaultValue": "",
          "tableName": "api_service_backend",
          "upId": 0,
          "adapterSpecId": 1
        },],
    },
    {
      "id": 2,
      "name": "token_adapter_in",
      "techType": "code",
      "pointType": "in",
      "url": "http://token",
      "reqPath": "/rest/token",
      "code": "String a=\"123\";",
      "status": "A",
      "remark": "good",
      "attrSpecs": [{
        "attrSpecId": 153,
        "attrSpecCode": "token",
        "attrSpecName": "token",
        "default_value": "Beare dadjf9iojsdfdsdj",
        "tableName": "api_service_backend",
        "up_id": 0,
        "adapterSpecId": 2
      },],
    },
    {
      "id": 3,
      "name": "ootb_adapter_out",
      "techType": "url",
      "pointType": "out",
      "url": "http://333",
      "reqPath": "/rest/111",
      "code": "String a=\"dd\";",
      "status": "A",
    },
  ]
};
const attrSpecs = {
  "code": "200",
  "msg": null,
  "data": [
    {
      "attrSpecId": 150,
      "attrSpecCode": "busi_code",
      "attrSpecName": "business Code",
      "defaultValue": "1123",
      "tableName": "api_service_backend",
      "upId": 0,
      "adapterSpecId": 1,
      "status": "A"
    },
    {
      "attrSpecId": 151,
      "attrSpecCode": "operation_code",
      "attrSpecName": "operation code",
      "defaultValue": "1123",
      "tableName": "api_service_backend",
      "upId": 0,
      "adapterSpecId": 1,
      "status": "A"
    },
    {
      "attrSpecId": 152,
      "attrSpecCode": "token",
      "attrSpecName": "token",
      "defaultValue": "Beare dadjf9iojsdfdsdj",
      "tableName": "api_service_backend",
      "upId": 0,
      "adapterSpecId": 2,
      "status": "A"
    },
  ],

};
const orgs = {
  "code": "200",
  "msg": null,
  "data": [
    {
      "orgName": "111",
      "tokenExpireTime": 1800,
      "orgTypeName": "",
      "orgType": "2",
      "password": "StudySC",
      "createTime": "2019-04-04T08:04:54.000+0000",
      "orgCode": "test21111",
      "statusName": "",
      "tel": "1",
      "appkey": "000001",
      "id": 1,
      "authType": "1",
      "email": "111",
      "status": STATUS.A,
      "sysUserOrgs": [{"id": 1, "orgId": 1, "userId": 1, "username": "admin"},],
      "consumerApis": [
        {
          "apiId": 160,
          "name": "Get Api Detail",
          "groupId": 19,
          "requestUrl": "/baseInfo/apiService/apiInfo",
          "reqMethod": "post",
          "status": "2",
          "statusName": "已发布",
          "createTime": "2019-06-17T21:50:23.000+0000",
          "apiType": "1",
          "updateTime": "2019-06-17T08:49:27.000+0000",
          "serviceType": "1",
          "serviceTypeName": "Rest"
        }
      ],
      "producerApis": [
        {
          "apiId": 161,
          "name": "Get Api List",
          "groupId": 19,
          "requestUrl": "/baseInfo/apiService/apiList",
          "reqMethod": "post",
          "status": "2",
          "statusName": "已发布",
          "createTime": "2019-06-17T21:50:23.000+0000",
          "apiType": "1",
          "updateTime": "2019-06-17T08:49:27.000+0000",
          "serviceType": "1",
          "serviceTypeName": "Rest"
        }
      ]
    },
    {
      "orgType": "2",
      "password": "StudySC",
      "orgName": "billing",
      "createTime": "2019-04-03T09:02:21.000+0000",
      "orgCode": "test2",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "000002",
      "id": 2,
      "authType": "2",
      "status": STATUS.A,
      "sysUserOrgs": [{"id": 1, "orgId": 1, "userId": 1, "username": "admin"},],
      "consumerApis": [
        {
          "apiId": 160,
          "name": "Get Api Detail",
          "groupId": 19,
          "requestUrl": "/baseInfo/apiService/apiInfo",
          "reqMethod": "post",
          "status": "2",
          "statusName": "已发布",
          "createTime": "2019-06-17T21:50:23.000+0000",
          "apiType": "1",
          "updateTime": "2019-06-17T08:49:27.000+0000",
          "serviceType": "1",
          "serviceTypeName": "Rest"
        }
      ],
      "producerApis": [
        {
          "apiId": 161,
          "name": "Get Api List",
          "groupId": 19,
          "requestUrl": "/baseInfo/apiService/apiList",
          "reqMethod": "post",
          "status": "2",
          "statusName": "已发布",
          "createTime": "2019-06-17T21:50:23.000+0000",
          "apiType": "1",
          "updateTime": "2019-06-17T08:49:27.000+0000",
          "serviceType": "1",
          "serviceTypeName": "Rest"
        }
      ]
    },
    {
      "orgType": "2",
      "password": "StudySC",
      "orgName": "ose",
      "createTime": "2019-04-03T09:02:22.000+0000",
      "orgCode": "test21111",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "000003",
      "id": 3,
      "authType": "3",
      "status": STATUS.A,
      "sysUserOrgs": [{"id": 1, "orgId": 1, "userId": 1, "username": "admin"},],
      "consumerApis": [
        {
          "apiId": 160,
          "name": "Get Api Detail",
          "groupId": 19,
          "requestUrl": "/baseInfo/apiService/apiInfo",
          "reqMethod": "post",
          "status": "2",
          "statusName": "已发布",
          "createTime": "2019-06-17T21:50:23.000+0000",
          "apiType": "1",
          "updateTime": "2019-06-17T08:49:27.000+0000",
          "serviceType": "1",
          "serviceTypeName": "Rest"
        }
      ],
      "producerApis": [
        {
          "apiId": 161,
          "name": "Get Api List",
          "groupId": 19,
          "requestUrl": "/baseInfo/apiService/apiList",
          "reqMethod": "post",
          "status": "2",
          "statusName": "已发布",
          "createTime": "2019-06-17T21:50:23.000+0000",
          "apiType": "1",
          "updateTime": "2019-06-17T08:49:27.000+0000",
          "serviceType": "1",
          "serviceTypeName": "Rest"
        }
      ]
    },
    {
      "orgType": "0",
      "password": "StudySC",
      "orgName": "baidu",
      "createTime": "2019-04-03T09:02:23.000+0000",
      "orgCode": "abc",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "000004",
      "id": 4,
      "authType": "2",
      "status": STATUS.A
    },
    {
      "orgType": "2",
      "password": "StudySC",
      "orgName": "facebook",
      "createTime": "2019-04-03T09:02:24.000+0000",
      "orgCode": "test2",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "000005",
      "id": 5,
      "authType": "2",
      "status": STATUS.A
    },
    {
      "orgType": "2",
      "password": "StudySC",
      "orgName": "google",
      "createTime": "2019-04-03T09:02:25.000+0000",
      "orgCode": "test2",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "000006",
      "id": 6,
      "authType": "2",
      "status": STATUS.A
    },
    {
      "orgType": "0",
      "password": "StudySC",
      "orgName": "tdc",
      "createTime": "2019-04-03T09:02:29.000+0000",
      "orgCode": "test2",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "000007",
      "id": 7,
      "authType": "2",
      "status": STATUS.A
    },
    {
      "orgType": "0",
      "orgName": "let",
      "createTime": "2019-04-04T07:15:24.000+0000",
      "orgCode": "111_11",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "111",
      "id": 24,
      "authType": "1",
      "status": STATUS.A
    },
    {
      "orgType": "2",
      "password": "h4J9d7R8N",
      "orgName": "111",
      "tokenExpireTime": 100,
      "createTime": "2019-04-04T08:05:16.000+0000",
      "orgCode": "10000000015",
      "orgTypeName": "",
      "statusName": "",
      "appkey": "10000000015",
      "id": 28,
      "authType": "1",
      "status": STATUS.A
    }
  ]
};
const debugs = {
  "code": "200",
  "msg": null,
  "data": [
    {
      "userDebugId": 1,
      "userId": 4,
      "apiId": 152,
      "debugName": "测试一",
      "urlSample": urlSample,
      "requestHeaderSample": requestHeaderSample,
      "requestBodySample": requestBodySample,
      "responseHeaderSample": responseHeaderSample,
      "responseBodySample": responseBodySample
    },
    {
      "userDebugId": 2,
      "userId": 4,
      "apiId": 152,
      "debugName": "测试二",
      "urlSample": urlSample1,
      "requestHeaderSample": requestHeaderSample,
      "requestBodySample": requestBodySample,
      "responseHeaderSample": responseHeaderSample,
      "responseBodySample": responseBodySample
    }
  ]
};

const tableListDataSource = orgs.data;
const groupsDataSource = groups.data;
const usersDataSource = users.data;
const adapterSpecSource = adapterSpecs.data;
const attrSpecSource = attrSpecs.data;
const rolesDataSource = roles.data;
const privilegesDataSource = privileges.data.records;
const debugDataSource = debugs.data;
const configlistDataSource = configlist.data;

function getList(innerTableName) {
  let dataSource = tableListDataSource;
  switch (innerTableName) {
    /* eslint no-case-declarations:0 */
    case 'api_group':
      dataSource = groupsDataSource;
      break;
    case 'sys_user':
      dataSource = usersDataSource;
      break;
    case 'adapter_spec':
      dataSource = adapterSpecSource;
      break;
    case 'attr_spec':
      dataSource = attrSpecSource;
      break;
    case 'sys_role':
      dataSource = rolesDataSource;
      break;
    case 'sys_privilege':
      dataSource = privilegesDataSource;
      break;
    case 'env':
      dataSource = configlistDataSource;
      break;
    case 'api_user_debug':
      dataSource = debugDataSource;
      break;

    default:
      break;
  }
  return dataSource;
}

export function sug(req, res, u) {
  // console.log('pushOrg');
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  let dataSource = getList(params.t);

  // console.log(url, params, dataSource.length);
  let no = 'code';
  const title = 'name';
  if (params.t === 'org') {
    no = 'orgCode';
  }
  // console.log('no:', no, title);
  if (params.q) {
    dataSource = dataSource.filter(data => `${data[no]}:${data[title]}`.indexOf(params.q) > -1);
  }
  if (params.title) {
    dataSource = dataSource.filter(data => data[title].indexOf(params.title) > -1);
  }

  const result = {
    list: dataSource,
  };

  if (res && res.json) {
    return res.json(result);
  }
  return result;
}

export function detail(req, res, u) {
  console.log('detail===------');
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const tableName = url.split("/")[3];
  const dataSource = getList(tableName);
  let idName = "id";
  switch (tableName) {
    case 'api_group':
      idName = "groupId";
      break;
    case 'sys_user':
      idName = "id";
      break;
    case 'sys_role':
      idName = "roleId";
      break;
    case 'sys_privilege':
      idName = "privilegeId";
      break;
    case 'attr_spec':
      idName = "attrSpecId";
      break;
    default:
      break;
  }
  const params = parse(url, true).query;
  const obj = dataSource.find(data => data[idName] === parseInt(params.id, 10));

  const result = {
    "code": "200",
    "msg": null,
    "data": {
      ...obj,
    }
  }
  if (res && res.json) {
    return res.json(result);
  }
  return result;
}

export function queryList(req, res, u, b) {
  const params = (b && b.body) || req.body;
  const {tableName, data: {info}} = params;

  let dataSource = [...getList(tableName)];// 根据表明获取对应数据
  console.log(params, dataSource.length);
  if (info.sorter) {
    const s = info.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }
  const keys = Object.keys(info); // 根据查询条件（form表单）的参数，过滤列表
  keys.forEach(key => {
    // console.log("----:",info[key]);
    if (info[key]) {
      dataSource = dataSource.filter(data => {
        const value = data[key];
        if (value) {
          return value.toString().indexOf(info[key]) > -1;
        }

        return true;
      });
    }
  });
  let pageSize = 10;
  if (info.pageSize) {
    pageSize = info.pageSize * 1;
  }
  const result = {
    "code": "200",
    "msg": null,
    "data": {
      "records": dataSource,
      pagination: {
        total: dataSource.length,
        pageSize,
        pageNo: parseInt(info.pageNo, 10) || 1,
      },
    },
  };
  if (res && res.json) {
    return res.json(result);
  }
  return result;
}

export function save(req, res, u, b) {
  // let url = u;
  // if (!url || Object.prototype.toString.call(url) !== '[object String]') {
  //   url = req.url; // eslint-disable-line
  // }

  const body = (b && b.body) || req.body;
  const {method, tableName, data: {info}} = body;
  const {orgType, orgName, id, name, groupName, appKey, groupId, authType, tel, email, remark} = info;
  const {userId, username, utype, roleId, roleName, privilegeId, path, icon, hideInMenu, hideChildrenInMenu, type,} = info;
  const {envId, envName, ifSelected, publicGatewayUrl, privateGatewayUrl, agentUrl, status, fileServerUrl} = info;
  // console.log('save in mock:', body, id);
  const datasource = getList(tableName);
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'post':
      switch (tableName) {
        case 'org':
          const tmpOrgArray = datasource.filter(item => id && id === item.id);
          if (tmpOrgArray && tmpOrgArray.length > 0) {
            const tmpObj = tmpOrgArray.shift();
            tmpObj.orgName = orgName;
            tmpObj.appkey = appKey;
            tmpObj.orgType = orgType;
            tmpObj.tel = tel;
            tmpObj.remark = remark;
            tmpObj.email = email;
            tmpObj.authType = authType;
            tmpObj.status = STATUS.A;
            if (id) {
              tmpObj.id = id;
            }
          } else {
            const newId = datasource.length + 1;
            datasource.unshift({
              id: newId,
              orgCode: '1',
              orgName,
              appkey: `appkey${newId}`,
              authType,
              tel,
              email,
              orgType,
              remark,
              status: STATUS.A,
              createTime: new Date(),
            });
          }
          break;
        case 'api_group':
          const tmpGroupsArray = datasource.filter(item => groupId && groupId === item.groupId);
          if (tmpGroupsArray && tmpGroupsArray.length > 0) {
            const tmpObj = tmpGroupsArray.shift();
            tmpObj.groupName = groupName;
            if (groupId) {
              tmpObj.tel = tel;
              tmpObj.remark = remark;
              tmpObj.email = email;
              tmpObj.id = groupId;
            }
          } else {
            const newId = datasource.length + 1;
            datasource.unshift({
              groupId: newId,
              groupName,
              status: STATUS.A,
            });
            console.log("datasource:", datasource);
          }
          break;
        case 'sys_user':
          const tmpUsersArray = datasource.filter(item => userId && userId === item.userId);
          if (tmpUsersArray && tmpUsersArray.length > 0) {
            const tmpObj = tmpUsersArray.shift();
            tmpObj.userName = username;
            if (groupId) {
              tmpObj.userId = userId;
            }
          } else {
            const newId = datasource.length + 1;
            datasource.unshift({
              userId: newId,
              username,
              tel,
              email,
              utype,
              remark,
              status: STATUS.A,
            });
            console.log("datasource:", datasource);
          }
          break;
        case 'sys_role':
          const tmpRolesArray = datasource.filter(item => roleId && roleId === item.roleId);
          if (tmpRolesArray && tmpRolesArray.length > 0) {
            const tmpObj = tmpRolesArray.shift();
            tmpObj.roleName = roleName;
            if (groupId) {
              tmpObj.roleId = roleId;
            }
          } else {
            const newId = datasource.length + 1;
            datasource.unshift({
              roleId: newId,
              roleName,
              remark,
              status: STATUS.A,
            });
            console.log("datasource:", datasource);
          }
          break;
        case 'env':
          const tmpConfiglistArray = datasource.filter(item => envId && envId === item.envId);
          if (tmpConfiglistArray && tmpConfiglistArray.length > 0) {
            const tmpObj = tmpConfiglistArray.shift();
            tmpObj.envName = envName;
            tmpObj.ifSelected = ifSelected;
            console.log('sage1');
          } else {
            const newId = datasource.length + 1;
            datasource.unshift({
              envId: newId,
              publicGatewayUrl,
              privateGatewayUrl,
              agentUrl,
              envName,
              status,
              fileServerUrl,
              ifSelected,
            });
            console.log("datasource:", datasource);
          }
          break;
        case 'sys_privilege':
          const tmpPrivilegesArray = datasource.filter(item => privilegeId && privilegeId === item.privilegeId);
          if (tmpPrivilegesArray && tmpPrivilegesArray.length > 0) {
            const tmpObj = tmpPrivilegesArray.shift();
            tmpObj.name = name;
            if (groupId) {
              tmpObj.privilegeId = privilegeId;
            }
          } else {
            const newId = datasource.length + 1;
            datasource.unshift({
              privilegeId: newId,
              roleName,
              path, icon, hideInMenu, hideChildrenInMenu, type,

              remark,
              status: STATUS.A,
            });
            console.log("datasource:", datasource);
          }
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
  console.log(datasource.length);
  console.log("---:", groupsDataSource.length);
  const result = {
    code: "200",
  };

  if (res && res.json) {
    return res.json(result);
  }
  return result;
}

export function statusBatch(req, res, u, b) {
  // console.log('statusBatch======');
  // let url = u;
  // if (!url || Object.prototype.toString.call(url) !== '[object String]') {
  //   url = req.url; // eslint-disable-line
  // }

  const body = (b && b.body) || req.body;
  const {method, tableName, data: {info}, option} = body;
  const {ids} = info;
  const datasource = getList(tableName);
  // console.log('statusBatch method:',method);
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      let status = 'D';
      switch (option) {
        case 3:
          status = STATUS.D;
          break;
        case 4:
          status = STATUS.A;
          break;
        case 5:
          status = STATUS.S;
          break;
        default:
          status = STATUS.A;
          break;
      }
      // console.log("status batch method:",method,ids," status:",status);
      let id = "id";
      switch (tableName) {
        case 'api_group':
          id = "groupId";
          break;
        case 'sys_user':
          id = "userId";
          break;
        case 'attr_spec':
          id = "attrSpecId";
          break;
        case 'env':
          id = "envId"
        default:
          break;
      }

      ids.forEach((value) => {
        const tmpObj = datasource.find(item => value && value === item[id]);
        if (tmpObj) {
          tmpObj.status = status;
        }
      });
      break;
    default:
      break;
  }
  const result = {
    code: "200",
    list: datasource,
    pagination: {
      total: datasource.length,
    },
  };

  if (res && res.json) {
    return res.json(result);
  }
  return result;
}


export function getAdapterListByType(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;

  const result = {...adapterSpecs};
  if (params.pointType) {
    result.data = adapterSpecs.data.filter((item) => params.pointType.indexOf(item.pointType) !== -1);
  }

  if (res && res.json) {
    return res.json(result);
  }
  return result;
}

export function getOrgListByType(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;

  // console.log("getOrgListByType in model", params);
  const result = {...orgs};
  if (params.orgType) {
    result.data = orgs.data.filter((item) => params.orgType.indexOf(item.orgType) !== -1);
  }

  if (res && res.json) {
    return res.json(result);
  }
  return result;
}

export default {
  'POST /baseInfo/sysdata/(.*)/list': queryList,
  'POST /baseInfo/sysdata/(.*)/save': save,
  'GET /baseInfo/sysdata/(.*)/detail': detail,
  'POST /baseInfo/sysdata/(.*)/statusBatch': statusBatch,
  'GET /baseInfo/sysdata/sug': sug,
  'GET /baseInfo/api/allGroupList': groups,
  'GET /baseInfo/sysdata/orgList': getOrgListByType,
  'GET /baseInfo/sysdata/adapterList': getAdapterListByType,
};
