import React, {PureComponent} from 'react';
import {Divider, message} from 'antd';
import {connect} from 'dva';
import BindDataQueryTable from '../BindDataQueryTable/index';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import QueryCommand from '@/components/QueryTable/QueryCommand';

import Authorized from '@/utils/Authorized';
import {getAuth} from '@/utils/authority';
import {getUserId} from "../../utils/authority";

const {check} = Authorized;

@connect(({uniComp,adminModel, loading}) => ({
  uniComp,
  adminModel,
  loading: loading.models.uniComp,
}))
class Tenant extends PureComponent {

  state = {
    columnSchemas: {},
    selectedRow : undefined
  }

  componentWillMount() {

    const auth = getAuth("user_save"); // 获取某个功能权的角色
    const saveAct = check(auth, 'Modify'); // 检查某个功能权的权限，如果有权限，返回第二个参数的值作为展现内容
    const commandAct = check(auth, 'Role');
// 动作对象
    const actions = saveAct || commandAct ? {
      title: 'action',
      width: 130,
      saveAct,
      commandAct,
      havePermissions: true,
      haveAddPermissions: true,
    } : {
      havePermissions: false,
      haveAddPermissions: false,
    };

    const columnSchemas = {
      tableName: 'tenant',
      key: 'id',
      name: 'tenantname',
      columnDetails: [
        {name: 'id', title: 'Id', add: true, disabledAct: 'true', rows: 3, rules: []},
        {name: 'code', title: 'Code', query: true, rows: 3, rules: []},
        {name: 'name', title: 'Name', add: true, rows: 3, rules: []},
        {name: 'remark', title: 'Remark', tag: 'textArea', add: true, rows: 3, rules: []},
      ],
      actions,
    };
    const userId = getUserId();
    columnSchemas.userId = userId;
    this.setState({columnSchemas});
  }

  handleRefreshData = () => {
    this.child.handleSearchDefault()
  }

  handleRef = (ref) => {
    this.child = ref
  }

  handleRefresh = () => {
    const { selectedRow } = this.state;
    const { dispatch } = this.props;
    const {code} = selectedRow || {code:''};
    const payload = {tenantId:code};
    dispatch({
      type:'adminModel/refreshCache',
      payload,
      callback: resp => {
        const { code:newCode,msg } = resp;
        if( newCode === '200'){
          message.success('Refresh Success');
        }else{
          message.error(`${msg}`);
        }
      }
    })

  }

  render() {
    const {columnSchemas} = this.state;
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
            <QueryCommand>
              <Divider type="vertical" />
              <a onClick={() => this.handleRefresh()} title="Refresh Cache">
                  Refresh
              </a>
            </QueryCommand>
          </span>
        </BindDataQueryTable>
      </PageHeaderWrapper>
    );
  }
}

export default Tenant;
