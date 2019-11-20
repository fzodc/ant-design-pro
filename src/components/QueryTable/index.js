/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, {Fragment, PureComponent} from 'react';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Menu,
  Modal,
  Radio,
  Row,
  Select,
} from 'antd';
import moment from 'moment'; // 不能用｛moment｝
import { formatMessage } from 'umi-plugin-react/locale';
import Ellipsis from '@/components/Ellipsis';
import StandardTable from '@/components/StandardTable';
import Detail from './Detail';
import styles from './index.less';

import PrivilegeTreeSelectView from '@/pages/UserManager/PrivilegeTreeSelectView';
import GroupTreeSelectView from '@/pages/ApiGateway/GroupTreeSelectView';
import AdapterSelectView from '@/pages/ApiGateway/AdapterSelectView';
import OrgSelectView from "../../pages/ApiGateway/OrgSelectView";
import TenantSelectView from "../../pages/UserManager/TenantSelectView";

const { Option } = Select;
const { TextArea, Password } = Input;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
let columns = [];
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
const menuOption = [['remove', 'Remove'], ['enable', 'Enable'], ['disable', 'Disable']];
const QueryCommandChildren = [];
const otherChildren = [];
const CreateForm = Form.create()(props => {
  const { selectedRow, modalVisible, form, handleAdd, handleModalVisible,getTenantId,tenantId,techChange,techType } = props;
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
      // handleAdd(fieldsValue, form);
    });
  };
  const cancelHandle = (row, flag) => {
    form.resetFields();
    handleModalVisible(row, flag);
  };
  // 租户编号修改则rang信息修改
  const addTenant = (e) =>{
    getTenantId(e);
    const rang = null;
    form.setFieldsValue({rang})
  };
  let newTenantId = '';
  if(selectedRow){
    if(tenantId){
      newTenantId = tenantId;
    }else{
      const {tenantId:tid} = selectedRow || {tenantId:''};
      if(tid){
        newTenantId = tid;
      }
    }
  }else if(tenantId){
    newTenantId = tenantId;
  }
  const renderAutoForm = (item) => {
    switch (item.tag) {
      case 'commonSelect':
        if(selectedRow || !item.addEnum){
          return (
            <Select style={{ width: '100%' }} onChange={techChange}>
              {item.enumData.map(d => (
                <Option key={`${item.javaCode}_${item.javaKey}_${d.itemCode}`} value={d.itemCode}>
                  {d.itemValue}
                </Option>
              ))}
            </Select>
          );
        }
        return (
          <Select style={{ width: '100%' }} onChange={techChange}>
            {item.addEnum.map(d => (
              <Option key={`${item.javaCode}_${item.javaKey}_${d.itemCode}`} value={d.itemCode}>
                {d.itemValue}
              </Option>
            ))}
          </Select>
        );
      case 'commonRadio':
        return (
          <RadioGroup style={{ width: '100%' }}>
            {item.enumData.map(d => (
              <Radio key={`${item.javaCode}_${item.javaKey}_${d.itemCode}`} value={d.itemCode}>
                {d.itemValue}
              </Radio>
            ))}
          </RadioGroup>
        );
      case 'groupTreeSelect':
        return <GroupTreeSelectView style={{ width: '100%' }} />;
      case 'privilegeTreeSelect':
        return <PrivilegeTreeSelectView style={{ width: '100%' }} />;
      case 'AdapterSelectView':
        return <AdapterSelectView style={{ width: '100%' }} showSearch optionFilterProp="children" />;
      case 'OrgSelectView':
        return <OrgSelectView style={{ width: '100%' }} userId={item.tagAttr.userId} orgType={item.tagAttr.orgType} sign="1" filterTenant={newTenantId} />;
      case 'TenantSelectView':
        return <TenantSelectView style={{ width: '100%' }} onChange={addTenant} />;
      case 'textArea':
        return <TextArea rows={item.rows} />;
      case 'inputNumber':
        return <InputNumber style={{ width: '100%' }} />;
      case 'passwordTag':
        return <Password style={{ width: '100%' }} />;
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
  let newTechType = '';
  if(selectedRow){
    const {techType:type} = selectedRow || {techType:''};
    if(type){
      newTechType = type;
    }
  }
  if(techType){
    newTechType = techType;
  }

  return (
    <Modal
      title={modalTitle}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => cancelHandle()}
    >
      {addForms.map(item =>{
        let styleStr = {margin: 0};
        // 新增信息某菜单是否隐藏
        if(!selectedRow && item.addHidden || item.editHidden){
          styleStr = {margin: 0,display:'none'};
        }
        if(newTechType === 'Plugin' && (item.name === 'reqPath' || item.name === 'code')){
          styleStr = {margin: 0,display:'none'};
        }
        if(newTechType === 'BeanShell' && (item.name === 'url'|| item.name === 'reqPath' )){
          styleStr = {margin: 0,display:'none'};
        }
        if(newTechType === 'DynaToken' && (item.name === 'code')){
          styleStr = {margin: 0,display:'none'};
        }
        return (
          <Form layout="vertical">
            <FormItem
              style={{ ...styleStr }}
              key={`addFormItem-${item.name}`}
              label={item.title}
            >
              {form.getFieldDecorator(item.name, {
                initialValue: selectedRow ? selectedRow[item.name] : item.defaultValue||'',
                rules: item.rules ? [] : [{ required: true, message: `please enter ${item.title}` }],
              })(renderAutoForm(item))}
            </FormItem>
          </Form>
        )
      })}
    </Modal>
  );
});
@Form.create()
class QueryTable extends PureComponent {
  state = {
    modalVisible: false,
    drawerVisible: false,
    expandForm: false,
    selectedRows: [],
    selectedRow: {},
    formValues: {},
    tenantId : '', // 用于查询过滤的租户号
    addTenant : '', // 用于新增过滤的租户号
    techType : '' // 用于新增时候的判断类型
  };

  componentDidMount() {
    // console.log('============sub componentDidMount========');

    const { children } = this.props;
    QueryCommandChildren.splice(0, QueryCommandChildren.length);
    console.log("QueryCommandChildren",children);
    React.Children.forEach(children, item => {
      console.log("---item",item);
      if (!item) {
        return;
      }
      // eslint-disable-next-line
      if (item.props.id === 'QueryCommand') {
        QueryCommandChildren.push(item);
      } else {
        otherChildren.push(item);
      }
    });
    console.log("querytable-----",QueryCommandChildren);
    this.handleColumn();
  }

  handleDetail=(record)=>{
    this.handleDrawerVisible(record,true);
  }

  onDrawerClose=()=>{
    this.handleDrawerVisible(null,false);
  }

  handleRenderColumn = (val,record,columnDetail)=>{
    let a=val;
    if (columnDetail.enumData != null) {
      const item = columnDetail.enumData.find(d => d.itemCode === val);
      const itemValue = item ? item.itemValue : '';
      a = itemValue;
    }
    if (columnDetail.format != null) {
      a = moment(a).format(columnDetail.format);
    }

    if(columnDetail.formatMessagePrivilege&&record.type==='menu'&&record.path){
      const formatMessageId=`menu${record.path.replace(/\//g,".")}`;
      a=formatMessage({ id: formatMessageId });
    }

    if (columnDetail.showLen !== undefined) {
      a = (
        <Ellipsis length={columnDetail.showLen} tooltip>
          {a}
        </Ellipsis>
      );
    }
    if (columnDetail.showIcon !== undefined) {
      a = (<span><Icon type={record[columnDetail.showIcon]} />&nbsp;&nbsp;{a}</span>);
    }
    if(columnDetail.detailFlag){
      a=<a onClick={() => this.handleDetail(record)}>{a}</a>;
    }
    return a;
  }

  // get columns
  handleColumn = () => {
    columns = [];
    const {
      columnSchemas,
    } = this.props;
    const { columnDetails, actions } = columnSchemas;
    // const {commands} = columnDetails;
    columnDetails.map(columnDetail => {
      const obj = {};
      if (columnDetail && columnDetail.columnHidden) {
        return obj;
      }
      obj.title = columnDetail.title;
      obj.width = columnDetail.width || undefined;
      obj.dataIndex = columnDetail.name;
      obj.showLen = columnDetail.showLen || undefined;
      if (columnDetail.sorter != null) {
        obj.sorter = columnDetail.sorter;
      }
      obj.render = (val,record) => (this.handleRenderColumn(val,record,columnDetail));
      // if(columnDetail.detailFlag){
      //   obj.render = (val,record) => (<a onClick={() => this.handleDetail(record)}>{columnDetail.showIcon?(<span><Icon type={record[columnDetail.showIcon]} />&nbsp;&nbsp;{val}</span>):val}</a>);
      // }
      // else if (columnDetail.format != null) {
      //   obj.render = val => <span>{moment(val).format(columnDetail.format)}</span>;
      // } else if (columnDetail.showIcon !== undefined) {
      //   obj.render = (val,record) => (
      //     <span>
      //       <Icon type={record[columnDetail.showIcon]} />
      //       {val}
      //     </span>
      //   );
      // } else if (columnDetail.showLen !== undefined) {
      //   obj.render = val => (
      //     <Ellipsis length={columnDetail.showLen} tooltip>
      //       {val}
      //     </Ellipsis>
      //   );
      // } else if (columnDetail.enumData != null) {
      //   obj.render = val => {
      //     const item = columnDetail.enumData.find(d => d.itemCode === val);
      //     const itemValue = item ? item.itemValue : '';
      //     return <span>{itemValue}</span>;
      //   };
      // }
      columns.push(obj);
      return obj;
    });
    console.log( "QueryCommandChildren-----",actions);
    if (actions) {
      if (actions.havePermissions) {
        const authQueryCommands = actions.commandAct ? QueryCommandChildren : [];
        columns.push({
          title: actions.title || 'action',
          width: actions.width || 130,
          render: (text, row) => (
            <Fragment>
              <a onClick={() => this.handleModify(row, true)}>{actions.saveAct}</a>
              {authQueryCommands}
            </Fragment>
          ),
        });
      }
    } else {
      columns.push({
        title: '操作',
        width: 130,
        render: (text, row) => (
          <Fragment>
            <a onClick={() => this.handleModify(row, true)}>Modify</a>
            {QueryCommandChildren}
          </Fragment>
        ),
      });
    }
    return columns;
  };

  // handleStandardTableChange = (pagination, filtersArg, sorter) => {
  //   const {
  //     dispatch,
  //     columnSchemas: { tableName },
  //   } = this.props;
  //   const { formValues } = this.state;
  //
  //   const filters = Object.keys(filtersArg).reduce((obj, key) => {
  //     const newObj = { ...obj };
  //     newObj[key] = getValue(filtersArg[key]);
  //     return newObj;
  //   }, {});
  //
  //   const params = {
  //     tableName,
  //     pageNo: pagination.current,
  //     pageSize: pagination.pageSize,
  //     ...formValues,
  //     ...filters,
  //   };
  //   if (sorter.field) {
  //     params.sorter = `${sorter.field}_${sorter.order}`;
  //   }
  //
  //   dispatch({
  //     type: 'uniComp/list',
  //     payload: params,
  //   });
  // };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(rows);
    }
  };

  handleSearch = e => {
    // console.log('ddd---------2');
    const { onSearch, form } = this.props;
    if (e) e.preventDefault();

    const {
      columnSchemas: { tableName },
    } = this.props;
    form.validateFields((err, fieldsValue) => {
      // console.log('---fieldsValue:', fieldsValue);
      if (err) return;
      const { searchForm } = fieldsValue;
      const values = {
        tableName,
        ...searchForm,
      };
      this.setState({
        formValues: values,
      });
      if (onSearch) {
        onSearch(values);
      }
    });
  };

  handleTableChange = (pagination, filtersArg, sorter) => {
    const {
      columnSchemas: { tableName },
    } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      tableName,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    // console.log('---params:', params);
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(params);
    }
  };

  handleCallback = addForm => {
    // console.log('resp=======', resp);
    addForm.resetFields();
    this.setState({
      modalVisible: false,
      selectedRow: null,
    });
    // console.log('ddd---------1');
    this.handleSearch();
  };

  handleAdd = (fields, addForm) => {
    // console.log('handleAdd:',fields);
    const {
      columnSchemas: { tableName, key },
    } = this.props;

    const { selectedRow } = this.state;
    const option = selectedRow ? 2 : 1;
    const keyValue = selectedRow ? selectedRow[key] : null;
    const payload = { option, tableName, data:{info:{...fields}} };
    payload[key] = keyValue;

    const { onAdd } = this.props;
    if (onAdd) {
      onAdd(payload, addForm, this.handleCallback);
    }
  };

  handleMenuClick = e => {
    const value = new Map(menuOption).get(e.key);
    Modal.confirm({
      title: '',
      content: `Do you confirm ${value}？`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => this.subHandleMenuClick(e),
    });
  };

  subHandleMenuClick = e => {
    const {
      onMenuClick,
      columnSchemas: { tableName, key },
    } = this.props;
    // console.log(tableName);
    const { selectedRows } = this.state;
    // console.log('-----:', selectedRows);
    if (!selectedRows) return;
    const payload = {
      tableName,
      ids: selectedRows.map(row => row[key]), // .join(','),
    };
    switch (e.key) {
      case 'remove':
        payload.option = 3;
        break;
      case 'enable':
        payload.option = 4;
        break;
      case 'disable':
        payload.option = 5;
        break;
      default:
        break;
    }
    if (onMenuClick) {
      onMenuClick(payload, () => {
        this.setState({
          selectedRows: [],
        });
        this.handleSearch();
      });
    }
  };

  handleFormReset = () => {
    const { form, onSearch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
      modalVisible: false,
    });

    const {
      columnSchemas: { tableName },
    } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { searchForm } = fieldsValue;
      const values = {
        tableName,
        ...searchForm,
      };
      this.setState({
        formValues: values,
      });
      if (onSearch) {
        onSearch(values);
      }
    });
  };

  handleModify = (row, flag) => {
    // console.log('modify===:', flag, this.props, form.getFieldsValue());
    // form.setFieldsValue({orgId: "f", orgCode: "f", name: "f"});
    this.handleModalVisible(row, flag);
  };

  handleModalVisible = (row, flag) => {
    this.setState({
      modalVisible: !!flag,
      selectedRow: row,
      techType:null,
      addTenant:null
    });
  };

  handleDrawerVisible = (row, flag) => {
    this.setState({
      selectedRow: row,
      drawerVisible: !!flag,
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  getTenantId = e => {
    this.setState({tenantId:e});
    const {form} = this.props;
    const rang = null;
    form.setFieldsValue({ "searchForm.rang" : rang }); // rang搜索框修改
  }

  addTenantId = e => {
    this.setState({addTenant:e});
    const {form} = this.props;
    const rang = null;
    form.setFieldsValue({rang});
  }

  techChange = e =>{
    console.log("xxx",e);
    this.setState({techType:e});
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  renderSimpleForm() {
    const { form } = this.props;
    // console.log(tableName, key, name);
    const { getFieldDecorator } = form;
    const queryForms = getFormItemArray(this.props, 'query');
    const simpleQueryForms = queryForms.splice(
      0,
      queryForms && queryForms.length > 1 ? 2 : queryForms.length
    );
    const {tenantId} = this.state;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {simpleQueryForms.map(item => (
            <Col key={`col-${item.name}`} md={8} sm={24}>
              <FormItem key={`form-item-${item.name}`} label={item.title}>
                {getFieldDecorator(`searchForm.${item.name}`)(
                  item.tag === 'commonSelect' ? (
                    <Select key={`ele-${item.name}`} style={{ width: 100 }}>
                      {item.enumData.map(d => (
                        <Option key={`${item.name}_${d.itemCode}`} value={d.itemCode}>
                          {d.itemValue}
                        </Option>
                      ))}
                    </Select>
                  ) : item.tag === 'date' ? (
                    <DatePicker
                      key={`ele-${item.name}`}
                      style={{ width: '100%' }}
                      placeholder="please enter"
                    />
                  ) : item.tag === 'OrgSelectView' ?(
                    <OrgSelectView userId={item.tagAttr.userId} orgType={item.tagAttr.orgType} sign="1" filterTenant={tenantId} />
                  ) : item.tag === 'TenantSelectView' ?(
                    <TenantSelectView onChange={this.getTenantId}  />
                  ) : (
                    <Input key={`ele-${item.name}`} placeholder="please enter" />
                  )
                )}
              </FormItem>
            </Col>
          ))}
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                Query
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                Reset
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                Unfold <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderTForm = (queryForms, currentForm) => {
    const {tenantId} = this.state;
    const { getFieldDecorator } = currentForm;
    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        {queryForms.splice(0, 3).map(item => (
          <Col key={`col-${item.name}`} md={8} sm={24}>
            <FormItem key={`form-item-${item.name}`} label={item.title}>
              {getFieldDecorator(`searchForm.${item.name}`)(
                item.tag === 'commonSelect' ? (
                  <Select key={`ele-${item.name}`} style={{ width: 100 }}>
                    {item.enumData.map(d => (
                      <Option key={`${item.name}_${d.itemCode}`} value={d.itemCode}>
                        {d.itemValue}
                      </Option>
                    ))}
                  </Select>
                ) : item.tag === 'date' ? (
                  <DatePicker
                    key={`ele-${item.name}`}
                    style={{ width: '100%' }}
                    placeholder="please enter"
                  />
                ) : item.tag === 'OrgSelectView' ?(
                  <OrgSelectView userId={item.tagAttr.userId} orgType={item.tagAttr.orgType} sign="1" filterTenant={tenantId} />
                ) : item.tag === 'TenantSelectView' ?(
                  <TenantSelectView onChange={this.getTenantId}  />
                ) : (
                  <Input key={`ele-${item.name}`} placeholder="please enter" />
                )
              )}
            </FormItem>
          </Col>
        ))}
      </Row>
    );
  };

  renderAdvancedForm() {
    // const { getFieldDecorator } = this.props.form;
    const { form } = this.props;
    const queryForms = getFormItemArray(this.props, 'query');
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        {this.renderTForm(queryForms, form)}
        {this.renderTForm(queryForms, form)}
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              Query
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              Reset
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              Fold <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  render() {
    const { data, loading, columnSchemas, onRow, size } = this.props;
    const { key,actions } = columnSchemas;
    const { selectedRow, selectedRows, modalVisible,drawerVisible,addTenant,techType } = this.state;
    // console.log("-----:",actions,actions&&!actions.haveAddPermissions);
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        {menuOption.map(item => (
          <Menu.Item key={item[0]}>{item[1]}</Menu.Item>
        ))}
      </Menu>
    );
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator} style={actions&&!actions.haveAddPermissions?{display:'none'}:{}}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(null, true)}>
              New
            </Button>
            {selectedRows.length > 0 && (
              <span>
                <Dropdown overlay={menu}>
                  <Button>
                    More <Icon type="down" />
                  </Button>
                </Dropdown>
              </span>
            )}
          </div>
          <StandardTable
            selectedRows={selectedRows}
            rowKey={key}
            loading={loading}
            data={data}
            columns={columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleTableChange}
            onRow={onRow}
            size={size}
          />
        </div>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          selectedRow={selectedRow}
          columnSchemas={columnSchemas}
          getTenantId={this.addTenantId}
          tenantId={addTenant}
          techChange={this.techChange}
          techType={techType}
        />
        <Drawer
          width={640}
          placement="right"
          closable
          onClose={this.onDrawerClose}
          visible={drawerVisible}
        >
          <Detail
            selectedRow={selectedRow}
            columnSchemas={columnSchemas}
          />
        </Drawer>
      </Card>
    );
  }
}
export default QueryTable;
