export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/loading', name: 'loading', component: './User/Loading' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis', authority: ['admin', 'manager', 'user'] },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
        ],
      },
      // apiGateWay
      {
        path: '/apiGateway',
        icon: 'gateway',
        name: 'apiGateway',
        authority: ['user'],
        routes: [
          {
            path: '/apiGateway/apiList',
            name: 'apiList',
            component: './ApiGateway/ApiList',
            authority: ['user'],
          },
          {
            path: '/apiGateway/apiUpdate',
            name: 'apiUpdate',
            component: './ApiGateway/ApiUpdate',
          },
          {
            path: '/apiGateway/apiDocUpdate',
            name: 'apiDocUpdate',
            component: './ApiGateway/ApiDocUpdate',
          },
          {
            path: '/apiGateway/apiDetail',
            name: 'apiDetail',
            hideInMenu: true,
            component: './ApiGateway/ApiDetail',
          },
          {
            path: '/apiGateway/apiDebug',
            name: 'apiDebug',
            component: './ApiGateway/ApiDebugMenu',
            routes: [
              {
                path: '/apiGateway/apiDebug',
                component: './ApiGateway/ApiDebug',
              }
            ]
          },
          {
            path: '/apiGateway/apiLog',
            name: 'apiLog',
            hideInMenu: true,
            component: './ApiGateway/ApiLog',
          },
          {
            path: '/apiGateway/wsdlList',
            name: 'wsdlList',
            component: './ApiGateway/WsdlList',
          },
          {
            path: '/apiGateway/wsdlAuth',
            name: 'wsdlAuth',
            component: './ApiGateway/WsdlAuth',
          },
          {
            path: '/apiGateway/apiCreate',
            name: 'apiCreate',
            component: './ApiGateway/ApiCreate',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/apiGateway/apiCreate',
                redirect: '/apiGateway/apiCreate/info',
              },
              {
                path: '/apiGateway/apiCreate/info',
                name: 'info',
                component: './ApiGateway/ApiCreate/Step1',
              },
              {
                path: '/apiGateway/apiCreate/consumer',
                name: 'consumer',
                component: './ApiGateway/ApiCreate/Step2',
              },
              {
                path: '/apiGateway/apiCreate/producer',
                name: 'producer',
                component: './ApiGateway/ApiCreate/Step3',
              },
              {
                path: '/apiGateway/apiCreate/result',
                name: 'result',
                component: './ApiGateway/ApiCreate/Step4',
              },
            ],
          },
          {
            path: '/apiGateway/wsdl',
            name: 'wsdl',
            component: './ApiGateway/Wsdl',
            hideInMenu: true,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/apiGateway/wsdl',
                redirect: '/apiGateway/wsdl/info',
              },
              {
                path: '/apiGateway/wsdl/info',
                name: 'info',
                component: './ApiGateway/Wsdl/Step1',
              },
              {
                path: '/apiGateway/wsdl/consumer',
                name: 'consumer',
                component: './ApiGateway/Wsdl/Step2',
              },
              {
                path: '/apiGateway/wsdl/producer',
                name: 'producer',
                component: './ApiGateway/Wsdl/Step3',
              },
              {
                path: '/apiGateway/wsdl/result',
                name: 'result',
                component: './ApiGateway/Wsdl/Step4',
              },
            ],
          },
        ],
      },
      // baseData
      {
        path: '/baseData',
        icon: 'table',
        name: 'baseData',
        authority: ['manager','user'],
        routes: [
          {
            path: '/baseData/org',
            name: 'org',
            component: './BaseData/Org',
          },
          {
            path: '/baseData/appkey',
            name: 'appkey',
            component: './BaseData/Appkey',
          },
          {
            path: '/baseData/group',
            name: 'group',
            component: './BaseData/Group',
          },
          {
            path: '/baseData/adapterSpec',
            name: 'adapterSpec',
            component: './BaseData/AdapterSpec',
          },
          {
            path: '/baseData/attrSpec',
            name: 'attrSpec',
            component: './BaseData/AttrSpec',
          },
          {
            path: '/baseData/adapterAttrSpec',
            name: 'adapterAttrSpec',
            component: './BaseData/AdapterAttrSpec',
            hideInMenu: true,
          },
          {
            path: '/baseData/appkey',
            name: 'appkey',
            component: './BaseData/Appkey',
          },
        ],
      },
      // userManager
      {
        path: '/userManager',
        icon: 'team',
        name: 'userManager',
        authority: ['admin'],
        routes: [
          {
            path: '/userManager/user',
            name: 'user',
            component: './UserManager/User',
          },
          {
            path: '/userManager/role',
            name: 'role',
            component: './UserManager/Role',
          },
          {
            path: '/userManager/privilege',
            name: 'privilege',
            component: './UserManager/Privilege',
          },
          {
            path: '/userManager/tenant',
            name: 'tenant',
            component: './UserManager/Tenant',
          },
        ],
      },
      // admin
      {
        path: '/admin',
        icon: 'table',
        name: 'admin',
        authority: ['admin'],
        routes: [
          {
            path: '/admin/apiLogList',
            name: 'apiLogList',
            component: './ApiLog/ApiLogList',
          },
          {
            path: '/admin/logPage',
            name: 'logPage',
            component: './Admin/LogPage',
          },
          {
            path: '/admin/refreshCache',
            name: 'refreshCache',
            component: './Admin/RefreshCache',
          },
        ],
      },
      // resource
      {
        path: '/resourcesDistribute',
        icon: 'table',
        name: 'resourcesDistribute',
        authority: ['admin'],
        routes: [
          {
            path: '/resourcesDistribute/configuration',
            name: 'configuration',
            component: './ResourcesDistribute/Configuration',
          }
        ],
      },
      // test2
      {
        path: '/test',
        icon: 'table',
        name: 'test',
        authority: ['admin'],
        routes: [
          {
            path: '/test/test1',
            name: 'test1',
            component: './Test/Test1',
          },
          {
            path: '/test/test2',
            name: 'test2',
            component: './Test/Test2',
          },
          {
            path: '/test/test3',
            name: 'test3',
            component: './Test/Test3',
          },
          {
            path: '/test/test4',
            name: 'test4',
            component: './Test/Test4',
          },
          {
            path: '/test/test5',
            name: 'test5',
            component: './Test/Test5',
          },
          {
            path: '/test/test6',
            name: 'test6',
            component: './Test/Test6',
          },
          {
            path: '/test/orgTransfer',
            name: 'orgTransfer',
            component: './ApiGateway/OrgTransfer',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
              {
                path: '/account/settings/tenant',
                component: './Account/Settings/TenantView',
              },
            ],
          },
        ],
      },
      //  editor
      {
        name: 'editor',
        icon: 'highlight',
        path: '/editor',
        authority: ['admin'],
        routes: [
          {
            path: '/editor/flow',
            name: 'flow',
            component: './Editor/GGEditor/Flow',
          },
          {
            path: '/editor/mind',
            name: 'mind',
            component: './Editor/GGEditor/Mind',
          },
          {
            path: '/editor/koni',
            name: 'koni',
            component: './Editor/GGEditor/Koni',
          },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
