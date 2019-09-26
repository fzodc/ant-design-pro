import React, {Component, Fragment} from 'react';
import { Card, Table} from 'antd';
import {connect} from 'dva';
import DescriptionList from '@/components/DescriptionList';
import {getUserId} from "../../../utils/authority";

const {Description} = DescriptionList;

@connect(({appkeyModel, loading}) => ({
  appkeyModel,
  loading: loading.models.appkeyModel,
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

  render() {
    const {appkeyModel} = this.props;
    const {tenant} = appkeyModel||{};
    const {orgs} = tenant||[];
    const tenColumns = [
      { dataIndex: 'id', title: 'Id'   },
      { dataIndex: 'orgCode', title: 'Code'   },
      { dataIndex: 'orgName', title: 'Name' },
      { dataIndex: 'remark', title: 'Remark' },
    ];
    const paginationProps = {
      pageSize: 5
    };
    return (
      <Fragment>
        <Card title="Tenant" bordered={false}>
          <DescriptionList size="large" title="" style={{marginBottom: 0}}>
            <Description term="Tenant Name">{tenant.name}</Description>
            <Description term="Tenant Code">{tenant.code}</Description>
            <Description term="Tenant Remark">{tenant.remark}</Description>
            <Description term="Tenant Address">{tenant.address}</Description>
            <Description term="Tenant Description">{tenant.description}</Description>
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
