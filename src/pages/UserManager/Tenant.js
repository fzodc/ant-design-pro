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
import {getUserId} from "../../utils/authority";

const { check } = Authorized;

@connect(({ uniComp, loading }) => ({
  uniComp,
  loading: loading.models.uniComp,
}))
class Tenant extends PureComponent {

  state={
    columnSchemas:{},
  }

  componentWillMount() {

    const auth=getAuth("user_save"); // 获取某个功能权的角色
    const saveAct = check(auth,'Modify'); // 检查某个功能权的权限，如果有权限，返回第二个参数的值作为展现内容
    const commandAct = check(auth,'Role');
// 动作对象
    const actions=saveAct||commandAct?{
      title:'action',
      width:130,
      saveAct,
      commandAct,
      havePermissions:true,
      haveAddPermissions:true,
    }:{havePermissions:false,
      haveAddPermissions:false,};

    const columnSchemas = {
      tableName: 'tenant',
      key: 'id',
      name: 'tenantname',
      columnDetails: [
        { name: 'id', title: 'Id', add: true, disabledAct: 'true' , rows:3,rules:[] },
        { name: 'code', title: 'Code', query: true, rows:3,rules:[] },
        { name: 'name', title: 'Name',add: true,rows:3,rules:[] },
        { name: 'remark', title: 'Remark',tag:'textArea',add: true,rows:3,rules:[] },
      ],
      actions,
    };
    const userId = getUserId();
    columnSchemas.userId = userId;
    this.setState({columnSchemas});
  }

  handleRefreshData=()=>{
    this.child.handleSearchDefault()
  }

  handleRef = (ref) => {
    this.child = ref
  }


  render() {
    const {columnSchemas}=this.state;
    return (
      <PageHeaderWrapper>
        <BindDataQueryTable
          columnSchemas={columnSchemas}
          onRef={this.handleRef}
          size='middle'
        >
        </BindDataQueryTable>
      </PageHeaderWrapper>
    );
  }
}
export default Tenant;
