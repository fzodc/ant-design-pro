import React, {PureComponent} from 'react';
import {Divider, message, Card, Row, Col, Table, Button, Form, Modal, Input, Select, Drawer, Tag} from 'antd';
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getItems} from '@/utils/masterData';

import { getUserId, getUserName} from '@/utils/authority';
import OrgSelectView from "../ApiGateway/OrgSelectView";
import Detail from "./Detail";
import ApiTransfer from "./ApiTransfer";
import {getItemValue2} from "../../utils/masterData";

const FormItem = Form.Item;
const {Option} = Select;
const statusList = getItems('common', 'status');
const authTypes = getItems('appkey', 'auth_type');
const tokenExpires = getItems('appkey', 'token_expire');
const ranges = getItems('appkey', 'range');
const rangesFilter = ranges.map(item => ({
  value: item.itemCode,
  text: item.itemValue,
}));
/**
 * get form item array for query condition form and add(modify) form
 * @param currentProps
 * @param type include:query, add
 * @returns {Array}
 */
const getFormItemArray = (currentProps, type) => {
  const {
    columnSchemas: { columnDetails },
  } = currentProps;
  return columnDetails.filter(columnDetail => columnDetail[type]);
};
// 定义编辑页面
const CreateForm = Form.create()(props => {
  const { selectedRow, modalVisible, form, handleAdd, handleModalVisible } = props;
  // console.log('1 selectedRow in CreateForm :', selectedRow);
  const {
    columnSchemas: { key },
  } = props;
  const content = selectedRow?  'Are you sure modify, it maybe effect use this appkey call user':'Do you submit？';
  const okHandle = () => {
    // console.log('okHandle1');
    form.validateFields((err, fieldsValue) => {
      // console.log('okHandle2',fieldsValue);
      if (err) return;
      Modal.confirm({
        title: '',
        content,
        okText: 'Confirm',
        cancelText: 'Cancel',
        onOk: () => handleAdd(fieldsValue, form),
      });
    });
  };
  const cancelHandle = (row, flag) => {
    form.resetFields();
    handleModalVisible(row, flag);
  };

  const renderAutoForm = (item) => {
    switch (item.tag) {
      case 'commonSelect':
        return (
          <Select style={{ width: '100%' }} disabled={item.disabled}>
            {item.enumData.map(d => (
              <Option key={`${item.javaCode}_${item.javaKey}_${d.itemCode}`} value={d.itemCode}>
                {d.itemValue}
              </Option>
            ))}
          </Select>
        );
      default:
        return <Input disabled={item.disabled} placeholder={`please enter ${item.title}`} />;
    }
  };
  let addForms = getFormItemArray(props, 'add')
    .filter(data => !(`${data.name}` === key && !selectedRow))
    .map(item => {
      const itemTemp = item;
      // console.log("======:",itemTemp.name === key,key,itemTemp.name);
      itemTemp.disabled = itemTemp.name === key||itemTemp.disabledAct==='true';
      return itemTemp;
    });
  // console.log('addForm:', addForms);
  const editForms = getFormItemArray(props, 'edit')
    .filter(data => !(`${data.name}` === key && !selectedRow))
    .map(item => {
      const itemTemp = item;
      // console.log("======:",itemTemp.name === key,key,itemTemp.name);
      itemTemp.disabled = itemTemp.disabledAct==='true';
      return itemTemp;
    });
  const modalTitle = selectedRow ? 'update' : 'new';
  if(selectedRow){
    addForms = editForms;
  }
  console.log(addForms);
  return (
    <Modal
      title={modalTitle}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => cancelHandle()}
    >
      <div>
        {addForms.map(item => (
          <FormItem
            key={`addFormItem-${item.name}`}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            label={item.title}
          >
            {form.getFieldDecorator(item.name, {
              /* eslint-disable no-nested-ternary */
              initialValue: selectedRow?(item.prefix&&selectedRow[item.name]?(selectedRow[item.name]).replace(item.prefix,""):selectedRow[item.name]) : item.defaultValue||'',
              rules: item.rules ? [] : [{ required: true, message: `please enter ${item.title}` }],
            })(renderAutoForm(item))}
          </FormItem>
        ))}
      </div>
    </Modal>
  );

});

@connect(({uniComp, appkeyModel, loading}) => ({
  uniComp,
  appkeyModel,
  loading: loading.models.uniComp,
}))
class Appkey extends PureComponent {

  state ={
    apiServices :[],
    appkeyInbounds :[],
    appkeyOutbounds :[],
    modalVisible : false,
    selectedRow : {},
    sign : 0,
    orgId : '',
    orgCode:'',
    drawerVisible:false,
    transferVisible : false
  }

  componentDidMount() {

    const {location} = this.props;
    const {state} = location;
    const {id,orgCode} = state || {id: '',orgCode:''};
    this.setState({orgId:id,orgCode});
    if(orgCode !== '' && id !== ''){
      this.getOrgDetail(id);
    }
  }

  getOrgInfo = e => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    this.getOrgDetail(e);
  }

  getOrgDetail = id =>{
    const {dispatch} = this.props;
    dispatch({
      type: 'uniComp/detail',
      payload:{
        tableName:'org',
        id
      },
      callback:resp=>{
        const {appkeyInbounds,appkeyOutbounds,orgCode,apiServices} = resp;
        this.setState({orgId:id,orgCode,appkeyInbounds,appkeyOutbounds,apiServices});
      }
    });
  }

  respDeal = resp => {
    const {orgId} = this.state;
    const { code } = resp;
    let { msg } = resp;
    if (code === '200') {
      if (!msg || msg === '') {
        msg = 'Success.';
      }
      message.success(msg);
      this.getOrgDetail(orgId);
    } else {
      message.error(`error:${msg}`);
    }
  }

  handleDel = (record,act) => {
    const { dispatch } = this.props;
    const { sign,orgCode } = this.state;

    let tableName = 'appkeyInbound';
    if( sign === 1){
      tableName = 'appkeyOutbound';
    }
    const payload = {tableName};
    payload.data = {};
    payload.data.info = {};
    payload.option = parseInt(act, 10);
    payload.data.info.id = record.id;
    payload.data.info.orgCode = orgCode;
    dispatch({
      type: 'appkeyModel/save',
      payload,
      callback: resp => {
        this.respDeal(resp);
      },
    });
  }

  handleModalVisible = (row, flag, sign) => {
    const {orgCode} = this.state;
    if( orgCode === ''){
      message.error(`Please select Org Name!`);
      return;
    }
    this.setState({
      modalVisible: flag,
      selectedRow: row,
      sign
    });
  };

  handleDrawerVisible = (row, flag) => {
    this.setState({
      selectedRow: row,
      drawerVisible: !!flag,
    });
  };

  handleTransferVisible = (row, flag) => {
    this.setState({
      transferVisible: flag,
      selectedRow: row
    });
  };

  handleAdd = (fields) => {
    const newFields = fields;
    const { selectedRow,sign,orgCode } = this.state;
    const orgKey = 'orgCode';
    const { dispatch } = this.props;
    const key = 'id';
    let option = 1;
    const userName = getUserName();
    const keyValue = selectedRow ? selectedRow[key] : "";
    if(keyValue !== ""){
      newFields[key] = keyValue;
      option = 2;
    }
    newFields[orgKey] = orgCode;
    let tableName = 'appkeyInbound';
    if( sign === 1){
      tableName = 'appkeyOutbound';
    }
    const payload = {
      tableName,
      option,
      userName,
      data:{
        info:newFields
      }
    };
    dispatch({
      type: 'appkeyModel/save',
      payload,
      callback: resp => {
        this.respDeal(resp);
        this.handleModalVisible(selectedRow,false,sign);
      },
    });
  }

  onDrawerClose = () => {
    this.handleDrawerVisible(null, false);
  }

  handleAccess = (flag, record) => {
    this.handleTransferVisible(record, flag);
  };

  handleRefreshData = () =>{
    const {orgId} = this.state;
    this.getOrgDetail(orgId);
  }

  render() {
    const {
      modalVisible,
      transferVisible,
      drawerVisible,
      selectedRow,
      orgId,
      apiServices,
      appkeyInbounds,
      appkeyOutbounds,
      sign,
    } = this.state;
    const userId = getUserId();
    let columnSchemas = {
      key: 'id',
      name: 'id',
      columnDetails: [
        { name: 'appkey', title: 'App Key', sorter: true, add: false ,edit:true,disabledAct:'true' },
        { name: 'callerName', title: 'Caller Name', sorter: true, add: true ,edit:true },
        { name: 'password', title: 'Password', sorter: true },
        { name: 'newPassword', title: 'New Password', sorter: true, add: true ,edit:true },
        { name: 'tokenExpireTime',
          title: 'Token Expire Time',
          add: true,
          edit:true,
          rules:[],
          tag: 'commonSelect',
          enumData: tokenExpires},
        {
          name: 'authType',
          title: 'Auth Type of Consumer',
          columnHidden: false,
          add: true,
          edit:true,
          tag: 'commonSelect',
          tableName: 'org',
          query: true,
          enumData: authTypes},
        { name: 'status', title: 'status', tag: 'commonSelect',sorter: true, add: true ,edit:true, enumData: statusList},
        { name: 'remark', title: 'Remark', sorter: true, add: true ,edit:true },
      ]
    };
    if(sign === 1){
      columnSchemas = {
        key: 'id',
        name: 'id',
        columnDetails: [
          { name: 'appkey', title: 'App Key', sorter: true, add: true, edit:true },
          { name: 'targetSystemName', title: 'Target System Name', sorter: true, add: true, edit:true },
          { name: 'password', title: 'Password', rules:[], edit:true },
          { name: 'newPassword', title: 'New Password', sorter: true, add: true },
          {
            name: 'range',
            title: 'Appkey Range',
            tag: 'commonSelect',
            enumData: ranges,
            sorter: true,
            add: true
          },
          { name: 'tokenExpireTime',
            title: 'Token Expire Time',
            add:true,
            edit:true,
            rules:[]
          },
          { name: 'authCount',
            title: 'Auth Count',
            add:true,
            edit:true,
            rules:[]
          },
          {
            name: 'authType',
            title: 'Auth Type of Consumer',
            tag: 'commonSelect',
            enumData: authTypes,
            add:true,
            edit:true,
            rules:[]
          },
          { name: 'status', title: 'status', tag: 'commonSelect',sorter: true , enumData: statusList, edit:true,},
          { name: 'remark', title: 'Remark', sorter: true },
        ]
      };
    }
    const appkeyColumns = [
      {
        title: 'appkey',
        dataIndex: 'appkey',
        render: (text, record) =>{
          return <a onClick={() => this.handleDrawerVisible(record,true)}>{text}</a>;
        },
      },
      {
        title: 'Caller Name',
        dataIndex: 'callerName',
      },
      {
        title: 'Auth Ratio',
        dataIndex: 'authRatio',
      },
      {
        name:'action',
        title:'Action',
        render: (text, record) => (
          <span>
            <a onClick={()=>this.handleAccess(true,record)}>Access</a>
            <Divider type="vertical" />
            <a onClick={()=>this.handleModalVisible(record, true , 0)}>Modify</a>
            <Divider type="vertical" />
            <a onClick={()=>this.handleDel(record, 3)}>Del</a>
          </span>
        ),
      }
    ];
    const appkeyOutColumns = [
      {
        title: 'appkey',
        dataIndex: 'appkey',
        width: 50,
        render: (text, record) =>{
          return <a onClick={() => this.handleDrawerVisible(record,true)}>{text}</a>;
        },
      },
      {
        title: 'Target System Name',
        dataIndex: 'targetSystemName',
        render: (text, record) =>{
          const {newPassword} = record;
          return newPassword?<span>{text}</span>:<Tag color="#87d068">{text}</Tag>;
        },
      },
      {
        title: 'Auth Count',
        dataIndex: 'authCount',
      },
      {
        title: 'Appkey Range',
        dataIndex: 'range',
        filters: rangesFilter,
        render(val) {
          return <span>{getItemValue2(ranges, val)}</span>
        },
      },
      {
        name:'action',
        title:'Action',
        render: (text, record) => (
          <span>
            <a onClick={()=>this.handleModalVisible(record, true , 1)}>Modify</a>
            <Divider type="vertical" />
            <a onClick={()=>this.handleDel(record, 3)}>Del</a>
          </span>
        ),
      }
    ];

    const appkeyAdd = (
      <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(null, true, 0)}>New</Button>);
    const userAppkeyAdd = (
      <Button icon="plus" type="danger" onClick={() => this.handleModalVisible(null, true, 1)}>Import</Button>);
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const paginationProps = {
      pageSize: 5,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Row gutter={2}>
            <Col lg={6} md={12} sm={24}>
              <span>Org Name</span>
              <OrgSelectView style={{ width: '100%' }} userId={userId} onChange={this.getOrgInfo} value={orgId} />
            </Col>
          </Row>
        </Card>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Inbound System AppKey" bordered={false} extra={appkeyAdd}>
              <Table
                columns={appkeyColumns}
                dataSource={appkeyInbounds}
                size="small"
                bordered="true"
                pagination={paginationProps}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Outbound System AppKey" bordered={false} extra={userAppkeyAdd}>
              <Table
                columns={appkeyOutColumns}
                dataSource={appkeyOutbounds}
                size="small"
                bordered="true"
                pagination={paginationProps}
              />
            </Card>
          </Col>
        </Row>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          selectedRow={selectedRow}
          renderAutoForm
          columnSchemas={columnSchemas}
        />
        <Drawer
          height={400}
          placement="bottom"
          closable
          onClose={this.onDrawerClose}
          visible={drawerVisible}
        >
          <Detail selectedRow={selectedRow} targetServices={apiServices} />
        </Drawer>
        <ApiTransfer
          title="Access Api"
          modalVisible={transferVisible}
          onVisible={this.handleTransferVisible}
          selectedRow={selectedRow}
          onRefreshData={this.handleRefreshData}
          keyName="apiId"
          apiServices={apiServices}
          relationName="apiServices" // 选中的关联表
        />
      </PageHeaderWrapper>
    );
  }
}

export default Appkey;
