import React, {PureComponent} from 'react';
import {Divider, message} from 'antd';
import router from 'umi/router';
import BindDataQueryTable from '../BindDataQueryTable';
import QueryCommand from '@/components/QueryTable/QueryCommand';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getItems} from '@/utils/masterData';
import UserTransfer from './UserTransfer';

import Authorized from '@/utils/Authorized';
import {getAuth, getUserId, getUserName} from '@/utils/authority';
import {getToken} from "../../utils/authority";

const { check } = Authorized;

class Org extends PureComponent {
  state = {
    selectedRow: undefined,
    modalVisible: false,
    columnSchemas: {},
  };

  componentWillMount() {
    const auth = getAuth('org_save'); // 获取某个功能权的角色
    const saveAct = check(auth, 'Modify'); // 检查某个功能权的权限，如果有权限，返回第二个参数的值作为展现内容
    const commandAct = check(auth, 'role');

    // 动作对象
    const actions =
      saveAct || commandAct
        ? {
          title: 'action',
          width: 300,
          saveAct,
          commandAct,
          havePermissions: true,
          haveAddPermissions: true,
        }
        : { havePermissions: false, haveAddPermissions: false };

    // const authTypes = getItems('org', 'auth_type');
    const statusList = getItems('common', 'status');
    const addStatusList = statusList.filter(item => item.itemCode !== 'D');

    const columnSchemas = {
      tableName: 'org',
      key: 'id',
      name: 'orgName',
      reCallDetail: true,
      columnDetails: [
        { name: 'id', title: 'ID', columnHidden: false, add: true, disabledAct: 'trgit config --global user.name "tortoiseYY"ue' }, // 第一列需要作为查询条件，新增时不需要采集
        { name: 'orgCode', title: 'Code',detailFlag:1 }, // 第二列需要作为查询条件，新增时需要采集
        { name: 'orgName', title: 'Name', sorter: true, query: true, add: true }, //  需要排序，需要作为查询条件，新增时需要采集
        { name: 'createTime', title: 'Create Date', format: 'YYYY-MM-DD HH:mm:ss' }, // 返回是日期类型，需要转换
        { name: 'tel', title: 'tel', columnHidden: true, add: true, rules: [] },
        { name: 'email', title: 'email', columnHidden: true, add: true, rules: [] },
        {
          name: 'status',
          title: 'Status',
          columnHidden: false,
          query: false,
          add: true,
          tag: 'commonSelect',
          tableName: 'org',
          enumData: statusList,
          addEnum : addStatusList
        }, // 需要作为查询条件，新增时需要采集，需要使用绑定的下拉标签
        {
          name: 'remark',
          title: 'remark',
          tag: 'textArea',
          columnHidden: true,
          add: true,
          rows: 3,
          rules: [],
        },
      ],
      relations: [
        {
          name: 'sysUsers',
          key: 'id',
          title: "Access User List",
          columnDetails: [
            { name: 'id', title: 'User Id' },
            { name: 'username', title: 'User Name' },
            { name: 'password', title: 'Pass Word' },
            { name: 'utype', title:'Account Type' },
            { name: 'status', title:'Status' },
            { name: 'tokenExpireTime' , title:'Expire Time (Minute)'},
          ],
        },
        {
          name: 'consumerApis',
          key: 'apiId',
          title: "Consumer Api List",
          columnDetails: [
            { name: 'apiId', title: 'Api Id' },
            { name: 'name', title: 'Name' },
            { name: 'requestUrl', title: 'Path' },
            { name: 'statusName', title: 'Status' },
          ],
        },
        {
          name: 'producerApis',
          key: 'apiId',
          title: "Producer Api List",
          columnDetails: [
            { name: 'apiId', title: 'Api Id' },
            { name: 'name', title: 'Name' },
            { name: 'requestUrl', title: 'Path' },
            { name: 'statusName', title: 'Status' },
          ],
        },
      ],
      actions,
    };
    const userName = getUserName();
    const userId = getUserId();
    columnSchemas.userName = userName;
    columnSchemas.userId = userId;
    this.setState({ columnSchemas });
  }

  handleUser = () => {
    const { selectedRow } = this.state;
    if (selectedRow && selectedRow.orgType !== '2') {
      // message.success(selectedRow.username);
      this.setState({
        modalVisible: true,
      });
    } else {
      message.error('消费方无法选择用户！');
    }
  };

  handleList = ( ) =>{
    const { selectedRow } = this.state;
    const { id,orgCode } = selectedRow;
    router.push({
      pathname: `/baseData/appkey`, // 通过url参数传递
      state: {
        // 通过对象传递
        id,
        orgCode
      },
    });
  }


  handleDown = () => {
    const {selectedRow}=this.state;
    const {id} = selectedRow;
    const token = getToken();
    const url= `/server/baseInfo/statement/org?orgId=${id}`;
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

  handleVisible = modalVisible => {
    // console.log("---modalVisible＝＝＝＝3:",modalVisible);
    this.setState({ modalVisible });
  };

  handleRefreshData = () => {
    this.child.handleSearchDefault();
  };

  handleRef = ref => {
    this.child = ref;
  };

  render() {
    const { modalVisible, selectedRow, columnSchemas } = this.state;
    return (
      <PageHeaderWrapper>
        <BindDataQueryTable
          columnSchemas={columnSchemas}
          onRef={this.handleRef}
          size="middle"
          onRow={record => {
            return {
              // onClick: (event) => {message.success("1")},       // 点击行
              // onDoubleClick: (event) => {},
              // onContextMenu: (event) => {},
              onMouseEnter: () => {
                this.setState({ selectedRow: record });
              }, // 鼠标移入行
              // onMouseLeave: (event) => {console.log(12)}

            };
          }}
        >
          <span id="QueryCommand">
            <QueryCommand>
              <Divider type="vertical" />
              <a onClick={() => this.handleUser()} title="Set Data Access Permission">
                Access
              </a>
              <Divider type="vertical" />
              <a onClick={() => this.handleList()} title="Appkey List">
                Appkey
              </a>
              <Divider type="vertical" />
              <a onClick={() => this.handleDown()} title="Download Org Config Sql">
                Download
              </a>
            </QueryCommand>
          </span>
        </BindDataQueryTable>
        <UserTransfer
          title="授权"
          modalVisible={modalVisible}
          onVisible={this.handleVisible}
          columnSchemas={columnSchemas}
          selectedRow={selectedRow}
          onRefreshData={this.handleRefreshData}
          keyName="userId"
          relationName="sysUserOrgs" // 选中的关联表
        />
      </PageHeaderWrapper>
    );
  }
}
export default Org;
// export default () => (
//   <PageHeaderWrapper title="接入系统管理">
//     <BindDataQueryTable columnSchemas={columnSchemas} />
//   </PageHeaderWrapper>
// );
