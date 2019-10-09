import React, {PureComponent} from 'react';
import {Card, Table} from 'antd';
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import {getUserId} from "../../utils/authority";

@connect(({ uniComp, loading }) => ({
  tenantList:uniComp.tenantList,
  loading: loading.models.tenantList,
}))
class TenantManager extends PureComponent {

  state = {
    pagination: {
      pageNo: 1,
      pageSize: 10,
    },
    filtersArg: {},
    sorter: {},
  }

  componentWillMount() {
    const userId = getUserId();
    const { dispatch } = this.props;
    const tableName = "tenant";
    const payload = {userId,tableName};
    payload.data = {};
    payload.data.info = {
      pageNo: 1,
      pageSize: 10
    };
    dispatch({
      type: 'uniComp/tenantInfo',
      payload
    });
  }

  respDeal = () =>{
    const { pagination, filtersArg, sorter } = this.state;
    this.handleStandardTableChange(pagination, filtersArg, sorter);
  }

  handleRefreshData=()=>{
    this.child.handleSearchDefault()
  }

  handleRef = (ref) => {
    this.child = ref
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues, userId } = this.state;
    this.setState({ pagination, filtersArg, sorter });
    const filters = this.conversionFilter(filtersArg);
    const params = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    const payload = {userId};
    payload.data = {};
    payload.data.info = {
      pageNo: 1,
      pageSize: 10,
      ...params
    };
    payload.data.info.pageNo = payload.data.info.pageNo ? payload.data.info.pageNo : 1;
    dispatch({
      type: 'uniComp/tenantInfo',
      payload,
    });
  };

  render() {
    const {
      tenantList,
      loading,
    } = this.props;
    const {pagination} = this.state;
    const columns = [
      { dataIndex: 'tenantId', title: 'Tenant Id'},
      { dataIndex: 'tenantName', title: 'Tenant Name'},
      { dataIndex: 'tenantCode', title: 'Tenant Code'},
      { dataIndex: 'tenantUser', title: 'Tenant User'},
      { dataIndex: 'systemName', title: 'System Name'},
      { dataIndex: 'appkeyInboundId', title: 'Appkey InboundId'},
      { dataIndex: 'inboundAppkey', title: 'Inbound Appkey'},
      { dataIndex: 'inboundSystem', title: 'Inbound System'},
      { dataIndex: 'ouboundAppkey', title: 'Oubound Appkey'},
      { dataIndex: 'ouboundSystem', title: 'Oubound System'},
      { dataIndex: 'managementUsers', title: 'Management Users'},
    ];
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Table
            loading={loading}
            size="small"
            columns={columns}
            dataSource={tenantList}
            pagination={paginationProps}
            onChange={this.handleStandardTableChange}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default TenantManager;
