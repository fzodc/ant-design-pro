import React, {PureComponent} from 'react';
import {Card, Table, Form, Row, Col, Button, Input} from 'antd';
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../ApiGateway/ApiList.less';

import {getUserId} from "../../utils/authority";
import OrgSelectView from "../ApiGateway/OrgSelectView";
import UserSelectView from "./UserSelectView";

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({uniComp, loading}) => ({
  uniComp,
  loading: loading.models.uniComp,
}))
@Form.create()
class TenantManager extends PureComponent {

  state = {
    pagination: {
      pageNo: 1,
      pageSize: 10,
    },
    filtersArg: {},
    sorter: {},
    tenantList: []
  }

  componentWillMount() {
    const userId = getUserId();
    const {dispatch} = this.props;
    const tableName = "tenant";
    const payload = {userId, tableName};
    payload.data = {};
    payload.data.info = {
      pageNo: 1,
      pageSize: 10
    };
    dispatch({
      type: 'uniComp/tenantInfo',
      payload,
      callback: resp => {
        const {data} = resp;
        const { pagination,records } = data;
        this.setState({
          pagination,
          tenantList:records
        });
      }
    });
  }

  respDeal = () => {
    const {pagination, filtersArg, sorter} = this.state;
    this.handleStandardTableChange(pagination, filtersArg, sorter);
  }

  handleRefreshData = () => {
    this.child.handleSearchDefault()
  }

  handleRef = (ref) => {
    this.child = ref
  }

  /**
   * {status: Array(2)} 转化为{status: "1,2"}
   */
  conversionFilter = filtersArg => {
    return Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
  };

  handleStandardTableChange = (page, filtersArg, sorter) => {
    const {dispatch} = this.props;
    const {formValues} = this.state;
    this.setState({pagination:page, filtersArg, sorter});
    const filters = this.conversionFilter(filtersArg);
    const params = {
      pageNo: page.current,
      pageSize: page.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    const tableName = "tenant";
    const userId = getUserId();
    const payload = {userId,tableName};
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
      callback: resp => {
        const {data} = resp;
        const { pagination,records } = data;
        this.setState({
          pagination,
          tenantList:records
        });
      }
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const {dispatch, form} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        // updatedTime: fieldsValue.updatedTime && fieldsValue.updatedTime.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      const {filtersArg, sorter} = this.state;
      const filters = this.conversionFilter(filtersArg);
      const userId = getUserId();
      const payload = {
        userId,
        tableName:'tenant',
        data: {
          info: {
            pageNo: 1,
            pageSize: 10,
            ...filters,
            ...values,
            ...sorter,
          }
        }
      };
      dispatch({
        type: 'uniComp/tenantInfo',
        payload,
        callback: resp => {
          const {data} = resp;
          const { pagination,records } = data;
          this.setState({
            pagination,
            tenantList:records
          });
        }
      });

    });
  };

  renderForm = () =>{
    const userId = getUserId();
    const {
      form: {getFieldDecorator},
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label='Tenant Code'>
              {getFieldDecorator('tenantCode')(<Input placeholder='' />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label='User Name'>
              {getFieldDecorator('userId')(<UserSelectView style={{ width: '100%' }} userId={userId} field="id" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label='Org Name'>
              {getFieldDecorator('orgId')(<OrgSelectView style={{ width: '100%' }} userId={userId} />)}
            </FormItem>
          </Col>
        </Row>
        <div style={{overflow: 'hidden'}}>
          <div style={{float: 'right', marginBottom: 24}}>
            <Button type="primary" htmlType="submit">
              Query
            </Button>
            <Button style={{marginLeft: 8}} onClick={this.handleFormReset} htmlType="button">
              Reset
            </Button>
          </div>
        </div>
      </Form>
    );
  }

  render() {
    const {
      loading,
    } = this.props;
    const {pagination,tenantList} = this.state;
    const columns = [
      {dataIndex: 'tenantName', title: 'Tenant Name'},
      {dataIndex: 'tenantCode', title: 'Tenant Code'},
      {dataIndex: 'tenantUser', title: 'Tenant User'},
      {dataIndex: 'userName', title: 'User Name'},
      {dataIndex: 'orgName', title: 'Org Name'},
      {dataIndex: 'systemName', title: 'System Name'},
      {
        dataIndex: 'inboundAppkey',
        title: 'Inbound Appkey',
        render: text => <span style={{color: 'red'}}>{text}</span>
      },
      {
        dataIndex: 'inboundSystem',
        title: 'Inbound System',
        render: text => <span style={{color: 'red'}}>{text}</span>
      },
      {
        dataIndex: 'ouboundAppkey',
        title: 'Oubound Appkey',
        render: text => <span style={{color: 'blue'}}>{text}</span>
      },
      {
        dataIndex: 'ouboundSystem',
        title: 'Oubound System',
        render: text => <span style={{color: 'blue'}}>{text}</span>
      },
      {dataIndex: 'managementUsers', title: 'Management Users'},
    ];
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              loading={loading}
              size="small"
              columns={columns}
              dataSource={tenantList}
              pagination={paginationProps}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TenantManager;
