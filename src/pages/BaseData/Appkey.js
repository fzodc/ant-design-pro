import React, {PureComponent} from 'react';
import {Divider, message, Card, Row, Col, Table, Button, Form, Modal, Input, Select, Drawer} from 'antd';
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getItems} from '@/utils/masterData';

import { getUserId, getUserName} from '@/utils/authority';
import OrgSelectView from "../ApiGateway/OrgSelectView";
import Detail from "./Detail";

const FormItem = Form.Item;
const {Option} = Select;
const statusList = getItems('common', 'status');
const authTypes = getItems('appkey', 'auth_type');
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
  const okHandle = () => {
    // console.log('okHandle1');
    form.validateFields((err, fieldsValue) => {
      // console.log('okHandle2',fieldsValue);
      if (err) return;
      Modal.confirm({
        title: '',
        content: 'Do you submit？',
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
          <Select style={{ width: '100%' }}>
            {item.enumData.map(d => (
              <Option key={`${item.javaCode}_${item.javaKey}_${d.itemCode}`} value={d.itemCode}>
                {d.itemValue}
              </Option>
            ))}
          </Select>
        );
      case 'OrgSelectView':
        return (
          <OrgSelectView style={{ width: '100%' }} userId={item.userId} value={item.defaultValue} field="orgCode" />
        );
      default:
        return <Input disabled={item.disabled} placeholder={`please enter ${item.title}`} />;
    }
  };
  const addForms = getFormItemArray(props, 'add')
    .filter(data => !(`${data.name}` === key && !selectedRow))
    .map(item => {
      const itemTemp = item;
      // console.log("======:",itemTemp.name === key,key,itemTemp.name);
      itemTemp.disabled = itemTemp.name === key||itemTemp.disabledAct==='true';
      return itemTemp;
    });
  // console.log('addForm:', addForms);
  const modalTitle = selectedRow ? 'update' : 'new';
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
    drawerVisible:false
  }

  componentDidMount() {

    const {location} = this.props;
    const {state} = location;
    const {id,orgCode} = state || {id: '',orgCode:''};
    this.setState({orgId:id,orgCode});
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
    const { sign } = this.state;

    let tableName = 'appkeyInbound';
    if( sign === 1){
      tableName = 'appkeyOutbound';
    }
    const payload = {tableName};
    payload.data = {};
    payload.data.info = {};
    payload.option = parseInt(act, 10);
    payload.data.info.id = record.id;
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

  handleDrawerVisible = (row, flag) => {
    this.setState({
      selectedRow: row,
      drawerVisible: !!flag,
    });
  };

  onDrawerClose = () => {
    this.handleDrawerVisible(null, false);
  }

  render() {
    const {
      modalVisible,
      selectedRow,
      orgId,
      orgCode,
      apiServices,
      appkeyInbounds,
      appkeyOutbounds,
      sign,
      drawerVisible
    } = this.state;
    const userId = getUserId();
    let columnSchemas = {
      key: 'id',
      name: 'id',
      columnDetails: [
        { name: 'appkey', title: 'App Key', sorter: true, add: true, detailFlag:1 },
        { name: 'callerName', title: 'Caller Name', sorter: true, add: true, detailFlag:1 },
        { name: 'password', title: 'Password', sorter: true, detailFlag:1 },
        { name: 'newPassword', title: 'New Password', sorter: true, add: true, detailFlag:1 },
        { name: 'tokenExpireTime', title: 'Token Expire Time',rules:[], sorter: true, add: true, detailFlag:1 },
        {
          name: 'authType',
          title: 'Auth Type of Consumer',
          columnHidden: false,
          add: true,
          tag: 'commonSelect',
          tableName: 'org',
          query: true,
          enumData: authTypes,},
        { name: 'orgCode', title: 'Org Name',tag:'OrgSelectView',columnHidden: true, add: true,rows:3, userId, defaultValue:orgCode },
        { name: 'status', title: 'status', tag: 'commonSelect',sorter: true, add: true, detailFlag:1 , enumData: statusList},
        { name: 'remark', title: 'Remark', sorter: true, add: true, detailFlag:1 },
      ]
    };
    if(sign === 1){
      columnSchemas = {
        key: 'id',
        name: 'id',
        columnDetails: [
          { name: 'appkey', title: 'App Key', sorter: true, add: true, detailFlag:1 },
          { name: 'targetSystemName', title: 'Target System Name', sorter: true, add: true, detailFlag:1 },
          { name: 'password', title: 'Password', sorter: true, detailFlag:1 },
          { name: 'newPassword', title: 'New Password', sorter: true, add: true, detailFlag:1 },
          {
            name: 'authType',
            title: 'Auth Type of Consumer',
            columnHidden: false,
            add: true,
            tag: 'commonSelect',
            tableName: 'org',
            query: true,
            enumData: authTypes,},
          { name: 'orgCode', title: 'Org Name',tag:'OrgSelectView',columnHidden: true, add: true,rows:3, userId, defaultValue:orgCode },
          { name: 'status', title: 'status', tag: 'commonSelect',sorter: true, add: true, detailFlag:1 , enumData: statusList},
          { name: 'remark', title: 'Remark', sorter: true, add: true, detailFlag:1 },
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
      },
      {
        title: 'Auth Count',
        dataIndex: 'authCount',
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
      <Button icon="plus" type="danger" onClick={() => this.handleModalVisible(null, true, 1)}>New</Button>);
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
      </PageHeaderWrapper>
    );
  }
}

export default Appkey;
