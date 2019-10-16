import React, {PureComponent} from 'react';
import router from 'umi/router';
import {connect} from 'dva';
import moment from 'moment';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Table,
  Icon,
  Modal,
  Divider,
  message,
  Dropdown,
  Menu,
  Drawer,
} from 'antd';
import reqwest from 'reqwest';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Ellipsis from '@/components/Ellipsis';
import WsdlUpload from "./WsdlUpload";
import WsdlApi from "./WsdlApi";
import Detail from "./Wsdl/Detail";
import TenantSelectView from "../UserManager/TenantSelectView";

import styles from './ApiList.less';
import {getItems,getItemValue2} from '@/utils/masterData';
import {getUserId,getToken} from "../../utils/authority";
import constants from '@/utils/constUtil';

const { PREFIX_PATH,TOKEN_PREFIX,ACT,API_STATUS,WS } = constants;
const { PATH_PREFIX } = WS;

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusList = getItems('apiService', 'status');
const statusFilter = statusList.map(item => ({
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
  const { selectedRow, modalVisible, form, handleAdd, handleModalVisible,handleFile } = props;
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
      case 'fileUpload':
        return (
          <WsdlUpload selectedRow={selectedRow} handleFile={handleFile} />
        );
      case 'prefix':
        return (
          <Input addonBefore={item.prefix} disabled={item.disabled} placeholder={`Please input ${item.title}`} />
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

/* eslint react/no-multi-comp:0 */
@connect(({wsdlModel, loading}) => ({
  wsdlModel,
  loading: loading.models.wsdlModel,
}))
@Form.create()
class WsdlList extends PureComponent {

  state = {
    selectedRow: {},
    selectedRowKeys:[],
    formValues: {},
    pagination: {
      pageNo: 1,
      pageSize: 10,
      current:1
    },
    list:[],
    filtersArg: {},
    sorter: {},
    logList: [],
    selectedRows: [],
    modalVisible:false,
    apiVisible:false,
    fileList: [],
    columnSchemas:{},
    removeFiles:[],
    drawerVisible: false,
    parseList:{}
  };

  componentWillMount() {
    const {dispatch} = this.props;

    const columnSchemas = {
      key: 'wsdlId',
      name: 'wsdlId',
      commands:[{action:'setRole',title:'角色'},],
      columnDetails: [
        { name: 'wsdlId', title: 'Wsdl Id'},
        { name: 'folder', title: 'Folder', sorter: true, query: true, detailFlag:1 },
        { name: 'wsdlUrlPath', title: 'Wsdl Url Path',tag:'prefix', prefix: PATH_PREFIX , sorter: true, query: true, add: true, detailFlag:1 },
        { name: 'wsdlFileName', title: 'Wsdl File Name',tag:'fileUpload',columnHidden: true, add: true,rows:3,rules:[] },
      ]

    };
    this.setState({columnSchemas});

    const userId = getUserId();
    const payload = {
      userId,
      range:'all',
      data:{
        info:{
          pageNo: 1,
          pageSize: 10
        }
      }
    };
    dispatch({
      type: 'wsdlModel/fetchWsdlList',
      payload,
      callback: resp => {
        const {data} = resp;
        const { page,records } = data;
        this.setState({
          pagination:page,
          list:records
        });
      }
    });

  }

  getOptionMaster(javaCode, javaKey) {
    const items = getItems(javaCode, javaKey);
    return this.getOptionWhithList(items);
  }

  getOptionWhithList = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.itemCode} value={item.itemCode}>
        {item.itemValue}
      </Option>
    ));
  };

  getRowByKey(key, newData) {
    const {logList} = this.state;
    return (newData || logList).filter(item => item.orderId === key)[0];
  }


  getOption(javaCode, javaKey) {
    const items = getItems(javaCode, javaKey);
    return this.getOptionWhithList(items);
  }

  getOptionWhithList = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.itemCode} value={item.itemCode}>
        {item.itemValue}
      </Option>
    ));
  };

  /**
   * {status: Array(2)} 转化为{status: "1,2"}
   */
  conversionFilter = filtersArg => {
    return Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
  };


  handleRowSelectChange = (selectedRowKeys, selectedRows) => {

    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys });
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };


  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });

    const userId = getUserId();
    const payload = {
      userId,
      range:'all',
      data: {
        info: {
          pageNo: 1,
          pageSize: 10
        }
      }
    };
    dispatch({
      type: 'wsdlModel/fetchWsdlList',
      payload,
      callback: resp => {
        const {data} = resp;
        const { page,records } = data;
        this.setState({
          pagination:page,
          list:records
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
        range:'all',
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
        type: 'wsdlModel/fetchWsdlList',
        payload,
        callback: resp => {
          const {data} = resp;
          const { page,records } = data;
          this.setState({
            pagination:page,
            list:records
          });
        }
      });

    });
  };

  handleTableChange = (paginations, filtersArg, sorter) => {
    console.log("handleTableChange",paginations);
    const {dispatch} = this.props;
    const {formValues} = this.state;

    this.setState({pagination: paginations, filtersArg, sorter});
    const filters = this.conversionFilter(filtersArg);

    const userId = getUserId();
    const payload = {
      userId,
      range:'all',
      data: {
        info: {
          pageNo: paginations&&paginations.current?paginations.current:1,
          pageSize: paginations&&paginations.pageSize?paginations.pageSize:10,
          ...formValues,
          ...filters,
          ...sorter,
        }
      }
    };
    if (sorter.field) {
      payload.data.info.sorter = `${sorter.field}_${sorter.order}`;
    }
    dispatch({
      type: 'wsdlModel/fetchWsdlList',
      payload,
      callback: resp => {
        const {data} = resp;
        const { page,records } = data;
        this.setState({
          pagination:page,
          list:records
        });
      }
    });

  };

  handleRefreshData = () =>{
    console.log("onRefreshData");
    const { pagination, filtersArg, sorter } = this.state;
    this.handleTableChange(pagination, filtersArg, sorter);
  }

  handleModalVisible = (row, flag) => {
    this.setState({
      modalVisible: flag,
      selectedRow: row,
      fileList:[],
      removeFiles:[]
    });
  };


  handleApiVisible = (row, flag) => {
    this.setState({
      selectedRow: row,
      apiVisible: flag,
    });
  };

  handleApi = ( record ) =>{
    // this.handleApiVisible(record,true);


    /**
     * 解析数据后，成功跳转
     */
    const { dispatch } = this.props;
    const {wsdlId} = record;
    const payload = {wsdlId};
    dispatch({
      type: 'wsdlModel/parseWsdl',
      payload,
      callback: resp => {
        console.log("resp",resp);
        const {code,data,msg} = resp;
        if(code === '200'){
          const {actionNames} = data;
          router.push({
            pathname: `/apiGateway/wsdl/info`, // 通过url参数传递
            state: {
              // 通过对象传递
              wsdlId,
              record, // 表格某行的对象数据
              actionNames // actionName列表数据
            },
          });
        }else{
          message.error(`error:${msg}`);
        }

      },
    });

  }

  handleAccess = ( record ) =>{
    const { wsdlId } = record;
    router.push({
      pathname: `/apiGateway/wsdlAuth`, // 通过url参数传递
      state: {
        // 通过对象传递
        wsdlId,
        record, // 表格某行的对象数据
      },
    });
  }

  handleList = ( record ) =>{
    const { wsdlId } = record;
    router.push({
      pathname: `/apiGateway/apiList`, // 通过url参数传递
      state: {
        // 通过对象传递
        wsdlId,
        record, // 表格某行的对象数据
      },
    });
  }

  handleFile = (fileList,removeFiles)=>{

    const newFileList = fileList.filter(item=> item.old !== 1);
    this.setState({
      fileList:newFileList,
      removeFiles
    });
  }

  handleAdd = (fields) => {

    const { selectedRow,columnSchemas,removeFiles } = this.state;
    const { key } = columnSchemas;
    const userId = getUserId();
    const keyValue = selectedRow ? selectedRow[key] : "";

    // 上传数据
    const { fileList } = this.state;
    // console.log("handleAdd",fileList);
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files', file.originFileObj);
    });
    Object.keys(fields).forEach( keyField => {

      if( keyField === 'wsdlUrlPath' ){
        formData.append(keyField, PATH_PREFIX + fields[keyField]);
      }else{
        formData.append(keyField, fields[keyField]);
      }
    });
    formData.append('userId',userId);
    formData.append(key,keyValue);
    formData.append('removeFiles',removeFiles);
    // console.log("removeFiles",removeFiles);
    // console.log("fileList",fileList);

    const token = getToken();
    const tokenStr =  `${TOKEN_PREFIX}${token}`;
    reqwest({
      url: `${PREFIX_PATH}/baseInfo/wsdl/upload`,
      method: 'post',
      contentType: 'application/json',
      headers: {
        Authorization :  tokenStr
      },
      processData: false,
      data: formData,
      success: (resp) => {

        const {code} = resp;
        let { msg } = resp;
        if (code === '200') {
          if (!msg || msg === '') {
            msg = 'Success.';
          }
          this.setState({
            fileList: [],
            removeFiles:[]
          });

          this.handleModalVisible(null,false);
          this.handleRefreshData();
        } else {
          message.error(`error:${msg}`);
        }

      },
      error: () => {
        message.error('upload failed.');
      },
    });
  };

  handleStatusClick = (act, record) => {
    const { dispatch } = this.props;

    const payload = {};
    payload.data = {};
    payload.data.info = {};
    payload.option = parseInt(act, 10);
    payload.data.info.wsdlId = record.wsdlId;
    dispatch({
      type: 'wsdlModel/saveWsdl',
      payload,
      callback: resp => {
        this.respDeal(resp);
      },
    });
  };

  handleParse = ( record,act ) =>{

    const { dispatch } = this.props;
    const {wsdlId} = record;
    const payload = {wsdlId};
    dispatch({
      type: 'wsdlModel/parseWsdl',
      payload,
      callback: resp => {

        const {code,data} = resp;
        const { msg } = resp;
        if (code === '200') {
          // 设置action数据
          this.setState({parseList:data});
          if( act > 0){
            this.handleDrawerVisible(record,true);
          }
        }else {
          message.error(`error:${msg}`);
        }
      },
    });

  }

  handleDrawerVisible = (row, flag) => {
    this.setState({
      selectedRow: row,
      drawerVisible: !!flag,
    });
  };

  onDetail = () => {
    const {selectedRow} = this.state;
    // 重新设置详情
    this.handleParse(selectedRow,0);
  }

  onDrawerClose = () => {
    this.handleDrawerVisible(null, false);
  }

  respDeal = resp => {
    const { code } = resp;
    let { msg } = resp;
    if (code === '200') {
      if (!msg || msg === '') {
        msg = 'Success.';
      }
      message.success(msg);
      this.setState({
        selectedRows: [],
      });
      const { pagination, filtersArg, sorter } = this.state;
      this.handleTableChange(pagination, filtersArg, sorter);
    } else {
      message.error(`error:${msg}`);
    }
  };

  renderMoreBtn = props => {
    const {current} = props;
    const {apiServices,status} = current;
    return (
      <Dropdown
        overlay={
          <Menu onClick={({key}) => this.moreHandle(key, current)}>

            <Menu.Item key="handleModify">Modify</Menu.Item>
            <Menu.Item key="handleParse">Validate</Menu.Item>
            { apiServices.length === 0 ? <Menu.Item key="handleApi">Generate Api</Menu.Item>: null}
            <Menu.Item key="handleList">Action List</Menu.Item>
            {status === API_STATUS.ONLINE ? <Menu.Item key="handleOffline">Offline</Menu.Item>:null}
            {status === API_STATUS.OFFLINE ?  <Menu.Item key="handleDelete">Remove</Menu.Item>:null}
          </Menu>
        }
      >
        <a>
           More <Icon type="down" />
        </a>
      </Dropdown>
    );
  };

  moreHandle = (key, record) => {
    if (key === 'handleModify') {
      this.handleModalVisible(record, true);
    } else if (key === 'handleDelete') {
      this.handleStatusClick(ACT.DEL, record);
    } else if (key === 'handleOffline') {
      this.handleStatusClick(ACT.OFFLINE, record);
    } else if (key === 'handleParse'){
      // 先解析
      this.handleParse(record,1);
    } else if (key === 'handleApi'){
      // 批量设置Api
      this.handleApi(record);
    } else if (key === 'handleList'){
      // 查询列表
      this.handleList(record);
    }
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const userId = getUserId();
    let tenantStr = '';
    if( userId === 4 || userId === 22){
      tenantStr = (<Col md={8} sm={24}><FormItem label="Tenant">{getFieldDecorator('tenantId', {})(<TenantSelectView userId={userId} />)}</FormItem></Col>);
    }
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <FormItem label="WSDL Name">
              {getFieldDecorator('wsdlName')(<Input placeholder="please enter WSDL Name" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="WSDL URL Path">
              {getFieldDecorator('wsdlUrlPath')(<Input placeholder="please enter WSDL URL Path" />)}
            </FormItem>
          </Col>
          {tenantStr}
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ float: 'right', marginBottom: 24 }}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  Query
                </Button>
                <Button style={{marginRight: 32}} onClick={this.handleFormReset} htmlType="button">
                  Reset
                </Button>
              </span>
            </div>
          </div>
        </Row>
        <Row gutter={{md: 8, lg: 24, xl: 48}}>
          <Col md={8} sm={24}>
            <Button style={{marginBottom:16}} icon="plus" type="primary" onClick={() => this.handleModalVisible(null, true)}>
              Upload WSDL
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {

    const {
      loading
    } = this.props;
    const {
      pagination,
      selectedRow,
      selectedRowKeys,
      list,
      modalVisible,
      apiVisible,
      columnSchemas,
      selectedRows,
      drawerVisible,
      parseList
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    // const auth = getAuth('wsdl_save'); // 获取某个功能权的角色

    const columns = [
      {
        title: 'WSDL Name',
        dataIndex: 'wsdlName',
        fixed: 'left',
        width: 150,
      },
      {
        title: 'WSDL URL Path',
        dataIndex: 'wsdlUrlPath',
        render(val) {
          return <Ellipsis length={36} tooltip>{val}</Ellipsis>;
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        filters: statusFilter,
        render(val) {
          return <span>{getItemValue2(statusList, val)}</span>
        },
      },
      {
        title: 'Create Time',
        dataIndex: 'createTime',
        width: 180,
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: 'Update Time',
        dataIndex: 'updateTime',
        width: 180,
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: 'WSDL File Name',
        dataIndex: 'wsdlFileName',
      },
      {
        title: 'Folder',
        dataIndex: 'folder',
        render(val) {
          return <Ellipsis length={20} tooltip>{val}</Ellipsis>;
        },
      },
      {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        align:'center',
        width: 150,
        render: (text, record) => (
          <span>
            <span style={{display:record.status === API_STATUS.ONLINE ?'':'none'}}>
              <a onClick={()=>this.handleAccess(record, true)}>Access</a>
            </span>
            <span style={{display:record.status === API_STATUS.OFFLINE?'':'none',width:100}}>
              <a onClick={()=> this.handleStatusClick(ACT.ONLINE, record)}>Online</a>
            </span>
            <span style={{display:record.status !== API_STATUS.REMOVE ?'':'none'}}>
              <Divider type="vertical" />
              {this.renderMoreBtn({current:record})}
            </span>
          </span>
        ),
      }
    ];


    const rowKey = "wsdlId";
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleFile: this.handleFile,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderWrapper showBreadcrumb style={{height: '50px'}}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>

            <Table
              rowKey={rowKey || 'key'}
              loading={loading}
              selectedRows={selectedRows}
              size="small"
              columns={columns}
              dataSource={list}
              pagination={paginationProps}
              onChange={this.handleTableChange}
              rowSelection={rowSelection}
              scroll={{ x: 1500 }}
            />

            <CreateForm
              {...parentMethods}
              modalVisible={modalVisible}
              selectedRow={selectedRow}
              renderAutoForm
              columnSchemas={columnSchemas}
            />
            <WsdlApi
              selectedRow={selectedRow}
              apiVisible={apiVisible}
              onVisible={this.handleApiVisible}
              onRefreshData={this.handleRefreshData}
            />

            <Drawer
              width={850}
              placement="right"
              closable
              onClose={this.onDrawerClose}
              visible={drawerVisible}
            >
              <Detail selectedRow={selectedRow} parseList={parseList} onDetail={this.onDetail} />
            </Drawer>

          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default WsdlList;
