import React, {Component, Fragment} from 'react';
import router from 'umi/router';
import { Card, Table} from 'antd';
import {connect} from 'dva';
import DescriptionList from '@/components/DescriptionList';
import {getUserId} from "../../../utils/authority";

const {Description} = DescriptionList;

@connect(({appkeyModel, loading}) => ({
  tenant:appkeyModel.tenant,
  loading: loading.models.tenant,
}))
class TenantView extends Component {

  componentWillMount() {
    const {dispatch} = this.props;
    const userId = getUserId();
    dispatch({
      type: 'appkeyModel/tenantManager',
      payload: {userId},
    });
  }

  handleList = ( record ) =>{
    const { id,orgCode } = record;
    router.push({
      pathname: `/baseData/appkey`, // 通过url参数传递
      state: {
        // 通过对象传递
        id,
        orgCode
      },
    });
  }

  render() {
    const {tenant} = this.props;
    const newTenant = tenant || {name:'',code:'',remark:'',address:'',description:'',orgs:[]};
    const {orgs} = newTenant||[];
    const tenColumns = [
      { dataIndex: 'id', title: 'Id'   },
      { dataIndex: 'orgCode', title: 'Code'   },
      { dataIndex: 'orgName', title: 'Name' },
      { dataIndex: 'remark', title: 'Remark' },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <a onClick={()=> this.handleList(record)}>Appkey List</a>
        )
      }
    ];
    const paginationProps = {
      pageSize: 5
    };
    return (
      <Fragment>
        <Card title="Tenant" bordered={false}>
          <DescriptionList size="large" title="" style={{marginBottom: 0}}>
            <Description term="Tenant Name">{newTenant.name}</Description>
            <Description term="Tenant Code">{newTenant.code}</Description>
            <Description term="Tenant Remark">{newTenant.remark}</Description>
            <Description term="Tenant Address">{newTenant.address}</Description>
            <Description term="Tenant Description">{newTenant.description}</Description>
          </DescriptionList>
        </Card>
        <Card title="Org List" bordered={false}>
          <Table
            dataSource={orgs}
            columns={tenColumns}
            size="small"
            bordered="true"
            pagination={paginationProps}
          />
        </Card>
      </Fragment>
    );
  }

}

export default TenantView;
