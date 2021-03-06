import React, {PureComponent} from 'react';
import {Divider} from 'antd';
import {connect} from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import BindDataQueryTable from '../BindDataQueryTable';
import QueryCommand from '@/components/QueryTable/QueryCommand';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';
import RoleTransfer from "./RoleTransfer";

import Authorized from '@/utils/Authorized';
import { getAuth } from '@/utils/authority';
import {getToken, getUserId, getUserName} from "../../utils/authority";

const { check } = Authorized;

@connect(({ uniComp, loading }) => ({
  uniComp,
  loading: loading.models.uniComp,
}))
class User extends PureComponent {

  state={
    selectedRow:undefined,
    modalVisible:false,
    columnSchemas:{},
  }

  componentWillMount() {

    const statusList = getItems('common', 'status');// 用户状态
    const utypeList = getItems('sysUser', 'utype');// 账户类型
    console.log("------utypeList",utypeList,statusList);
    const auth=getAuth("user_save"); // 获取某个功能权的角色
    const saveAct = check(auth,'Modify'); // 检查某个功能权的权限，如果有权限，返回第二个参数的值作为展现内容
    const commandAct = check(auth,'Role');
    const userId = getUserId();
    const userName = getUserName();
    const isSuper = !!(userName === 'super_admin' ||userName=== 'super_manager');
// 动作对象
    const actions=saveAct||commandAct?{
      title:'action',
      width:200,
      saveAct,
      commandAct,
      havePermissions:true,
      haveAddPermissions:true,
    }:{havePermissions:false,
      haveAddPermissions:false,};

    const orgType = "0,1";
    const tagAttr ={ userId,orgType };

    const columnSchemas = {
      tableName: 'sys_user',
      key: 'id',
      name: 'username',
      relationKey: 'userId',
      commands:[{action:'setRole',title:'角色'},],
      columnDetails: [
        { name: 'id', title: formatMessage({'id':'app.user.sys_user.id'}), add: true, disabledAct:'true' },
        { name: 'username', title: formatMessage({'id':'app.user.sys_user.username'}), sorter: true, query: true, add: true, detailFlag:1 },
        {
          name: 'utype',
          title: formatMessage({'id':'app.user.sys_user.utype'}),
          columnHidden: false,
          query: true,
          add: true,
          tag: 'changeCommonSelect',
          enumData: utypeList,
        },
        { name: 'roleName', title: formatMessage({'id':'app.user.sys_user.roleName'})},
        {
          name: 'orgId',
          title: formatMessage({'id':'app.user.sys_user.org'}),
          tag: 'OrgSelectView',
          add: true,
          tagAttr,
          rules:[],
          columnHidden: true,
        },
        {
          name: 'tokenExpireTime',
          title: formatMessage({'id':'app.user.sys_user.expireTime'}),
          add: true,
          rules:[],
          columnHidden: true,
        },
        { name: 'password', title: formatMessage({'id':'app.user.sys_user.password'}),tag:'passwordTag', add: true, columnHidden: true,detail:false },
        { name: 'email', title: formatMessage({'id':'app.user.sys_user.email'}), query: false, add: true ,rules:[]},
        { name: 'tel', title: formatMessage({'id':'app.user.sys_user.tel'}), query: false, add: true ,rules:[]},
        { name: 'tenantName', title: formatMessage({'id':'app.user.sys_user.tenantName'}), columnHidden: !isSuper},
        { name: 'tenantId', title: formatMessage({'id':'app.user.sys_user.tenantName'}),tag:'TenantSelectView',query: isSuper ,columnHidden: true},
        {
          name: 'status',
          title: formatMessage({'id':'app.user.sys_user.status'}),
          columnHidden: false,
          query: false,
          add: true,
          tag: 'commonSelect',
          enumData: statusList,
          addHidden:true,
          rules:[]
        },
        { name: 'remark', title: formatMessage({'id':'app.user.sys_user.remark'}),tag:'textArea',columnHidden: true, add: true,rows:3,rules:[] },
      ],
      relations:[{
        name:'sysUserRoles',
        key: 'id',
        title:formatMessage({'id':'app.user.sys_user.sysUserRoles'}),
        columnDetails:[{name: 'id',title:formatMessage({'id':'app.user.sys_role.id'})},
          {name: 'roleId',title:formatMessage({'id':'app.user.sys_user.roleId'})},
          {name: 'roleName',title:formatMessage({'id':'app.user.sys_user.roleName'})}]
      }],
      actions,
    };
    columnSchemas.userId = userId;
    this.setState({columnSchemas});
  }

  handleRole=()=>{
    const {selectedRow}=this.state;
    // message.success(selectedRow);
    if(selectedRow) {
      // message.success(selectedRow.username);
      this.setState({
        modalVisible: true,
      });
    }
  }

  handleVisible=(modalVisible)=>{
    // console.log("---modalVisible＝＝＝＝3:",modalVisible);
    this.setState({modalVisible});
  }

  handleRefreshData=()=>{
    this.child.handleSearchDefault()
  }

  handleRef = (ref) => {
    this.child = ref
  }

  handleDown = () => {
    const {selectedRow}=this.state;
    const {id} = selectedRow;
    const token = getToken();
    const url= `/server/baseInfo/statement/user?userId=${id}`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.setRequestHeader("Authorization",`Bearer ${token}`);
    xhr.send();
    xhr.responseType = "blob";  // 返回类型blob
    xhr.onload = function() {   // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
      const blob = this.response;
      const reader = new FileReader();
      reader.readAsDataURL(blob);  // 转换为base64，可以直接放入a标签href
      reader.onload =function (e) {
        // 转换完成，创建一个a标签用于下载
        const a = document.createElement('a');
        a.download = `user_config.sql`;
        a.href = e.target.result;
        document.body.appendChild(a);  // 修复firefox中无法触发click
        a.click();
      }
    }
  };

  render() {
    const {modalVisible,selectedRow,columnSchemas}=this.state;
    const auth = getAuth("user_role"); // 获取某个功能权的角色
    const commandAct = check(auth,'Modify');
    const roleAuth = commandAct?(
      <QueryCommand>
        <Divider type="vertical" />
        <a onClick={() => this.handleRole()}>Role</a>
        <Divider type="vertical" />
        <a onClick={() => this.handleDown()}>Download</a>
      </QueryCommand>
    ):'';
    return (
      <PageHeaderWrapper>
        <BindDataQueryTable
          columnSchemas={columnSchemas}
          onRef={this.handleRef}
          size='middle'
          onRow={(record) => {
            return {
              // onClick: (event) => {message.success("1")},       // 点击行
              // onDoubleClick: (event) => {},
              // onContextMenu: (event) => {},
              onMouseEnter: () => {this.setState({selectedRow:record});},  // 鼠标移入行
              // onMouseLeave: (event) => {console.log(12)}
            };
          }}
        >
          <span id="QueryCommand">
            {roleAuth}
          </span>
        </BindDataQueryTable>
        <RoleTransfer
          title='Grant authorization'
          modalVisible={modalVisible}
          onVisible={this.handleVisible}
          columnSchemas={columnSchemas}
          selectedRow={selectedRow}
          onRefreshData={this.handleRefreshData}
          keyName='roleId'
          relationName='sysUserRoles'
        />
      </PageHeaderWrapper>
    );
  }
}
export default User;
