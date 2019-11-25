import React, { PureComponent } from 'react';
import { Card, Button, Form, Icon, Col, Row, Input, Popover, Radio, Tabs, BackTop,message } from 'antd';
import router from 'umi/router';
import Prompt from 'umi/prompt';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableForm from './TableForm';
import styles from './style.less';
import SelectView from './SelectView';
import GroupTreeSelectView from './GroupTreeSelectView';
import { getPayloadForUpdate, conversionAttr, getApiFlowData } from './ApiCreate/util';
import RadioView from './RadioView';
import OrgSelectView from './OrgSelectView';
import { getUserId } from '@/utils/authority';
import constants from '@/utils/constUtil';

const {CALL_POINT} = constants;

const { TabPane } = Tabs;
const forms = ['front', 'back', 'backAttr'];

const fieldLabels = {
  front: {
    groupId: 'group',
    name: 'name',
    serviceType: 'service type',
    requestUrl: 'request url',
    // protocol: '协议 ',
    reqMethod: 'request method',
    apiType: 'api range',
    actionName:'action name'
  },
  back: {
    serviceType: 'service type',
    url: 'url',
    reqPath: 'path',
    // protocol: '协议 ',
    reqMethod: 'request method',
    connectTimeout: 'connect timeout（ms）',
    socketTimeout: 'socket timeout（ms）',
    orgId: 'provider',
    authType: 'secret',
    callType: 'call type',
  },
  backAttr: {
    userName: 'user Name',
    userPassword: 'user Password',
    tokenKey: 'token Key',
    tokenStr: 'token String',
    tokenUser: 'token User',
    tokenPassword: 'token Password',
    tokenUrl: 'token Url',
    trustStore: 'trustStore path',
    trustStorePassword: 'trustStore Password',
    keyStore: 'keyStore path',
    keyStorePassword: 'keyStore Password',
    ssl: 'SSL',
    isNotValidCert: 'Ignore Cert（TrustStore）',
    privateKeyName: 'Private Key Name（KeyStore）',
    isFormEncoded: 'Is Form Encoded',
  },
};

@connect(({ apiCreateModel, loading }) => ({
  apiService: apiCreateModel.apiService,
  submitting: loading.effects['apiCreateModel/submitStepForm'],
}))
@Form.create()
class ApiUpdate extends PureComponent {
  state = {
    width: '100%',
    apiFlowData: {},
  };

  isBlock=true;

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
    // message.config({
    //   top: 400,
    //   duration: 6,
    //   maxCount: 2,
    // });
    const { location } = this.props;
    const { state } = location;
    // console.log("location state:",state);
    const { apiId } = state || { apiId: 105 };
    this.getApi(apiId);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
    // message.destroy();
  }

  getApi = apiId => {
    const { dispatch } = this.props;
    if (apiId !== -1) {
      const payload = {};
      payload.option = 4;
      payload.data = {};
      payload.data.info = {};
      payload.data.info.apiId = apiId;
      dispatch({
        type: 'apiCreateModel/apiInfo',
        payload,
        callback: resp => {
          this.setBaseInfo(resp, dispatch);
        },
      });
    } else {
      // dispatch({
      //   type: 'apiCreateModel/initForAdd',
      // });
      // this.setBaseInfo({data:{}},dispatch);
      router.push('/exception/403');
    }
  };

  setBaseInfo = resp => {
    const { form } = this.props;
    const { data } = resp;
    const apiServiceBackend = data.apiServiceBackends.find(obj => obj.backendType === CALL_POINT);
    const { apiServiceBackendAttrs } = apiServiceBackend;
    const conversionAttrObj = conversionAttr(apiServiceBackendAttrs);
    const apiServiceBackendMembers = data.apiServiceBackends.filter(
      obj => obj.backendType !== CALL_POINT
    );

    // console.log("====:",conversionAttrObj);
    // // console.log('setBaseInfo data:', data,form.getFieldValue("front"));
    Object.keys(form.getFieldsValue()).forEach(key => {
      // // console.log('key:', key);
      if (key !== 'members') {
        if (key === 'front' || key === 'back' || key === 'backAttr') {
          const innerObj = {};
          Object.keys(form.getFieldValue(key)).forEach(innerKey => {
            if (key === 'front') {
              innerObj[innerKey] = data[innerKey] || null;
            } else if (key === 'backAttr') {
              innerObj[innerKey] = conversionAttrObj[innerKey] || null;
            } else {
              innerObj[innerKey] = apiServiceBackend[innerKey] || null;
            }
            // // console.log('innerKey:', innerKey, );
          });
          const obj = {};
          obj[key] = innerObj;
          // console.log("init Data in ApiUpdate2:",obj);
          form.setFieldsValue(obj);
        }
      } else {
        const obj = {};
        obj[key] = apiServiceBackendMembers || [];
        // // console.log(form.getFieldValue("members"));
        // form.setFieldsValue(obj);
      }
    });
  };

  getErrorInfo = () => {
    const errorList = [];
    forms.forEach(value => {
      const subErrorList = this.getErrorInfoByPrefixList(value) || [];
      errorList.push(...subErrorList);
    });
    const errorInfo = this.getErrorInfoByPrefix(errorList);
    return errorInfo;
  };

  getErrorInfoByPrefixList = prefix => {
    const {
      form: { getFieldError },
    } = this.props;
    // const errors = getFieldsError();
    const errors = getFieldError(prefix);
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    // // console.log(errors,errorCount);
    if (!errors || errorCount === 0) {
      return null;
    }

    const scrollToField = fieldKey => {
      const realFieldKey = `${prefix}.${fieldKey}`;
      const labelNode = document.querySelector(`label[for="${realFieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    // // console.log(errors);
    const errorList =
      Object.keys(errors).map(key => {
        // // console.log(errors[key],fieldLabels.front[key]);
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels.front[key]}</div>
          </li>
        );
      }) || [];
    return errorList.filter(item => item !== null);
  };

  getErrorInfoByPrefix = errorList => {
    // console.log(errorList);
    const errorCount = errorList ? errorList.length : 0;
    if (errorCount === 0) {
      return null;
    }
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0];
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      apiService,
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      // console.log("error in ui======:",error);
      if (!error) {
        console.log("==========api update submit values:",values.members);
        const editArray=[];
        values.members.forEach(item => {
          if(item.type!==CALL_POINT&&item.editable){
            if(item.adapterAttrs){
              item.adapterAttrs.forEach(attr=>{
                if(attr.editable){
                  editArray.push(item);
                }
              });
            }
            editArray.push(item);
          }
        });
        if(editArray.length>0){
          message.warn("Before submitting, please hold or cancel the data in the table that is being modified!",6);
        }
        const userId = getUserId();
        const apiInfo = getPayloadForUpdate(apiService, values,userId);
        // console.log("api update submit apiInfo:",apiInfo);
        // submit the values
        dispatch({
          type: 'apiCreateModel/submitStepForm',
          payload: apiInfo,
          callback: resp => {
            // this.getApi(resp.data.apiId);
            message.success("Submit finished!",6,)
            this.setBaseInfo(resp, dispatch);
            this.isBlock=false;
          },
        });
      }
    });
  };

  changeTab = key => {
    console.log(key);
    if (key === 'flow') {
      const { form } = this.props;
      const values = form.getFieldsValue();
      const apiFlowData = getApiFlowData(values);
      this.setState({ apiFlowData });
    }
  };

  tableChange = (techType,backendType) =>{
    const { form } = this.props;
    const backAuthType = form.getFieldValue('backAttr.authType');
    console.log("tableChange",techType,backendType);
    // 如果选择的是动态token把落地方的类型修改下
    if(techType === 'DynaToken' && backendType === 'in'){
      form.setFieldsValue({'backAttr.authType':'dyncToken'});
    }else if(backAuthType === 'dyncToken'){
        form.setFieldsValue({'backAttr.authType':''});
    }
  }

  render() {
    const {
      form,
      form: { getFieldDecorator, getFieldValue },
      submitting,
      apiService,
    } = this.props;
    const { width, apiFlowData } = this.state;
    const userId = getUserId();
    // const apiServiceBackendMembers1  = apiService.apiServiceBackends.filter((obj)=>obj.backendType!==CALL_POINT);
    const apiServiceBackendMembers =
      apiService && apiService.apiServiceBackends
        ? apiService.apiServiceBackends.map(item => ({ ...item, key: item.key||item.backendId }))
        : [];
    const apiServiceBackendObj = (apiServiceBackendMembers && apiServiceBackendMembers[0])||{};
    const {callType} = apiServiceBackendObj || {callType:'1'};
    console.log("xxxoo",apiServiceBackendObj,callType);
    const serviceType = form.getFieldValue("front.serviceType");
    const display = serviceType !== '2' ? {display: 'none'} : null;
    return (
      <PageHeaderWrapper
        onBack={() => window.history.back()}
        style={{ height: '50px' }}
        title="Api Update"
      >
        <Prompt when={this.isBlock} message='You do not commit data, are you sure you want to leave?' />
        <Card title="定义请求信息" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={2}>
              <Col lg={6} md={12} sm={24} style={{ height: 80 }}>
                <Form.Item label={fieldLabels.front.groupId}>
                  {getFieldDecorator('front.groupId', {
                    rules: [{ required: true, message: 'please choose分组' }],
                  })(<GroupTreeSelectView hideRoot treeDefaultExpandAll isDisabled={1} />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.front.name}>
                  {getFieldDecorator('front.name', {
                    rules: [{ required: true, message: 'please enter api name' }],
                  })(<Input placeholder="please enter api name" />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.front.requestUrl}>
                  {getFieldDecorator('front.requestUrl', {
                    rules: [{ required: true, message: 'please choose' }],
                  })(<Input style={{ width: '100%' }} placeholder="please enter" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={2}>
              <Col
                lg={6}
                md={12}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.front.serviceType}>
                  {getFieldDecorator('front.serviceType', {
                    rules: [{ required: true, message: 'please chooseserviceType' }],
                  })(<SelectView javaCode="apiService" javaKey="service_type" />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.front.reqMethod}>
                  {getFieldDecorator('front.reqMethod', {
                    rules: [{ required: true, message: 'please chooseHTTP Method' }],
                  })(<SelectView javaCode="common" javaKey="req_method" />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
                style={display}
              >
                <Form.Item label={fieldLabels.front.actionName}>
                  {getFieldDecorator('front.actionName', {
                    rules: [{ required: getFieldValue('front.serviceType') === '2', message: 'please enter action name' }],
                  })(<Input placeholder="please enter action name" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={2}>
              <Col lg={6} md={12} sm={24} style={{ height: 50 }}>
                <Form.Item label={fieldLabels.front.apiType}>
                  {getFieldDecorator('front.apiType', {
                    initialValue: apiService.apiType,
                    rules: [{ required: true, message: 'please choose服务类型' }],
                  })(<RadioView javaCode="apiService" javaKey="api_type" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <span />
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <span />
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="落地方服务信息" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24} style={{ height: 80 }}>
                <Form.Item label={fieldLabels.back.callType}>
                  {getFieldDecorator('back.callType', {
                    rules: [{ required: true, message: `please choose ${fieldLabels.back.callType}` }],
                  })(
                    <Radio.Group>
                      <Radio value={2}>External Service</Radio>
                      <Radio value={1}>Internal MicroService</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.back.serviceType}>
                  {getFieldDecorator('back.serviceType', {
                    rules: [{ required: true, message: 'please choose后端服务类型' }],
                  })(<SelectView javaCode="apiServiceBackend" javaKey="service_type" />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 8, offset: 2 }}
                lg={{ span: 10 }}
                md={{ span: 24 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.back.reqMethod}>
                  {getFieldDecorator('back.reqMethod', {
                    rules: [{ required: true, message: 'please chooseHTTP Method' }],
                  })(<SelectView javaCode="common" javaKey="req_method" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24} style={{ height: 80 }}>
                <Form.Item label={fieldLabels.back.url}>
                  {getFieldDecorator('back.url', {
                    rules: [{ required: true, message: 'please enter后端请求地址' }],
                  })(<Input placeholder="please enter后端请求地址" />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.back.reqPath}>
                  {getFieldDecorator('back.reqPath', {
                    rules: [],
                  })(<Input placeholder="please enter后端请求路径" />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 8, offset: 2 }}
                lg={{ span: 10 }}
                md={{ span: 24 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.back.orgId}>
                  {getFieldDecorator('back.orgId', {
                    rules: [{ required: true, message: `please choose${fieldLabels.back.orgId}` }],
                  })(<OrgSelectView orgType="0,1" userId={userId} />)}
                </Form.Item>
              </Col>
              <Col lg={6} md={12} sm={24} style={{ height: 80 }}>
                <Form.Item label={fieldLabels.back.connectTimeout}>
                  {getFieldDecorator('back.connectTimeout', {
                    rules: [{ required: true, message: '后端服务连接超时' }],
                  })(<Input placeholder="please enter timeout（ms）" />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 10 }}
                md={{ span: 24 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.back.socketTimeout}>
                  {getFieldDecorator('back.socketTimeout', {
                    rules: [{ required: true, message: '后端服务请求超时' }],
                  })(<Input placeholder="please enter后端服务请求超时（ms）" />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 10 }}
                md={{ span: 24 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.backAttr.isFormEncoded}>
                  {getFieldDecorator('backAttr.isFormEncoded', {
                    rules: [
                      {
                        required: true,
                        message: `please choose${fieldLabels.backAttr.isFormEncoded}`,
                      },
                    ],
                  })(
                    <Radio.Group defaultValue="N">
                      <Radio value="Y">Yes</Radio>
                      <Radio value="N">No</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col
                xl={{ span: 16 }}
                lg={{ span: 18 }}
                md={{ span: 24 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.back.authType}>
                  {getFieldDecorator('backAttr.authType', {
                    rules: [{ required: true, message: `please choose ${fieldLabels.back.authType}` }],
                  })(
                    <Radio.Group>
                      <Radio value="noneAuth">No authentication</Radio>
                      <Radio value="basicAuth">Basic authentication</Radio>
                      <Radio value="fixedToken">fixed token authentication</Radio>
                      <Radio value="dyncToken">dynamic token authentication</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row
              gutter={16}
              style={{
                background: '#fff7e6',
                display: getFieldValue('backAttr.authType') === 'basicAuth' ? 'block' : 'none',
              }}
            >
              <Col lg={6} md={12} sm={24} style={{ height: 80 }}>
                <Form.Item label={fieldLabels.backAttr.userName}>
                  {getFieldDecorator('backAttr.userName', {
                    rules: [
                      {
                        required: getFieldValue('backAttr.authType') === 'basicAuth',
                        message: `please choose${fieldLabels.backAttr.userName}`,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 16, offset: 2 }}
                lg={{ span: 18 }}
                md={{ span: 12 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.backAttr.userPassword}>
                  {getFieldDecorator('backAttr.userPassword', {
                    rules: [
                      {
                        required: getFieldValue('backAttr.authType') === 'basicAuth',
                        message: `please choose${fieldLabels.backAttr.userPassword}`,
                      },
                    ],
                  })(<Input.Password />)}
                </Form.Item>
              </Col>
            </Row>
            <Row
              gutter={16}
              style={{
                background: '#fff7e6',
                display: getFieldValue('backAttr.authType') === 'fixedToken' ? 'block' : 'none',
              }}
            >
              <Col lg={8} md={12} sm={24} style={{ height: 80 }}>
                <Form.Item label={fieldLabels.backAttr.tokenKey}>
                  {getFieldDecorator('backAttr.tokenKey', {
                    rules: [
                      {
                        required: getFieldValue('backAttr.authType') === 'fixedToken',
                        message: `please choose${fieldLabels.backAttr.tokenKey}`,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col lg={16} md={12} sm={24} style={{ height: 80 }}>
                <Form.Item label={fieldLabels.backAttr.tokenStr}>
                  {getFieldDecorator('backAttr.tokenStr', {
                    rules: [
                      {
                        required: getFieldValue('backAttr.authType') === 'fixedToken',
                        message: `please choose${fieldLabels.backAttr.tokenStr}`,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            {/*<Row
              gutter={16}
              style={{
                background: '#fff7e6',
                display: getFieldValue('backAttr.authType') === 'dyncToken' ? 'none' : 'none',
              }}
            >
              <Col lg={6} md={12} sm={24} style={{ height: 80 }}>
                <Form.Item label={fieldLabels.backAttr.tokenUser}>
                  {getFieldDecorator('backAttr.tokenUser', {
                    rules: [
                      {
                        required: getFieldValue('backAttr.authType') === 'dyncToken',
                        message: `please choose${fieldLabels.backAttr.tokenUser}`,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 6, offset: 2 }}
                lg={{ span: 8 }}
                md={{ span: 12 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.backAttr.tokenPassword}>
                  {getFieldDecorator('backAttr.tokenPassword', {
                    rules: [
                      {
                        required: getFieldValue('backAttr.authType') === 'dyncToken',
                        message: `please choose${fieldLabels.backAttr.tokenPassword}`,
                      },
                    ],
                  })(<Input.Password />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 8, offset: 2 }}
                lg={{ span: 10 }}
                md={{ span: 12 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.backAttr.tokenUrl}>
                  {getFieldDecorator('backAttr.tokenUrl', {
                    rules: [
                      {
                        required: getFieldValue('backAttr.authType') === 'dyncToken',
                        message: `please choose${fieldLabels.backAttr.tokenUrl}`,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>*/}
            <Row gutter={16}>
              {/*
              <Col lg={6} md={12} sm={24} style={{ height: 80 }}>
                <Form.Item label={fieldLabels.back.protocol}>
                  {getFieldDecorator('back.protocol', {
                    rules: [{ required: true, message: 'please choose后端协议' }],
                  })(<SelectView javaCode="apiService" javaKey="protocol" />)}
                </Form.Item>
              </Col>
              */}
              <Col lg={6} md={12} sm={24} style={{ height: 80 }}>
                <Form.Item label={fieldLabels.backAttr.ssl}>
                  {getFieldDecorator('backAttr.ssl', {
                    rules: [{ required: true, message: `please choose${fieldLabels.backAttr.ssl}` }],
                  })(
                    <Radio.Group>
                      <Radio value="open">开</Radio>
                      <Radio value="close">关</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row
              gutter={16}
              style={{
                background: '#fff7e6',
                display: getFieldValue('backAttr.ssl') === 'open' ? 'block' : 'none',
              }}
            >
              <Col
                xl={{ span: 12 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.backAttr.keyStore}>
                  {getFieldDecorator('backAttr.keyStore', {
                    rules: [
                      {
                        required: getFieldValue('backAttr.ssl') === 'open',
                        message: `please choose${fieldLabels.backAttr.keyStore}`,
                      },
                    ],
                  })(<Input.Password />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 12 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.backAttr.keyStorePassword}>
                  {getFieldDecorator('backAttr.keyStorePassword', {
                    rules: [
                      {
                        required: getFieldValue('backAttr.ssl') === 'open',
                        message: `please choose${fieldLabels.backAttr.keyStorePassword}`,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row
              gutter={16}
              style={{
                background: '#fff7e6',
                display: getFieldValue('backAttr.ssl') === 'open' ? 'block' : 'none',
              }}
            >
              <Col
                xl={{ span: 12 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.backAttr.trustStore}>
                  {getFieldDecorator('backAttr.trustStore', {
                    rules: [
                      {
                        required: getFieldValue('backAttr.ssl') === 'open',
                        message: `please choose${fieldLabels.backAttr.trustStore}`,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 12 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.backAttr.trustStorePassword}>
                  {getFieldDecorator('backAttr.trustStorePassword', {
                    rules: [
                      {
                        required: getFieldValue('backAttr.ssl') === 'open',
                        message: `please choose${fieldLabels.backAttr.trustStorePassword}`,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row
              gutter={16}
              style={{
                background: '#fff7e6',
                display: getFieldValue('backAttr.ssl') === 'open' ? 'block' : 'none',
              }}
            >
              <Col
                xl={{ span: 12 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.backAttr.isNotValidCert}>
                  {getFieldDecorator('backAttr.isNotValidCert', {
                    rules: [
                      {
                        required: getFieldValue('backAttr.ssl') === 'open',
                        message: `please choose${fieldLabels.backAttr.isNotValidCert}`,
                      },
                    ],
                  })(
                    <Radio.Group defaultValue="N">
                      <Radio value="Y">Yes</Radio>
                      <Radio value="N">No</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              <Col
                xl={{ span: 12 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={24}
                style={{ height: 80 }}
              >
                <Form.Item label={fieldLabels.backAttr.privateKeyName}>
                  {getFieldDecorator('backAttr.privateKeyName', {
                    rules: [],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Tabs defaultActiveKey="1" onChange={this.changeTab}>
          <TabPane tab="高级配置" key="table">
            <Card bordered={false}>
              {getFieldDecorator('members', {
                initialValue: apiServiceBackendMembers,
              })(<TableForm tableChange={this.tableChange} />)}
            </Card>
          </TabPane>
        </Tabs>

        <BackTop />
        <FooterToolbar style={{ width }} extra={this.getErrorInfo()} extra2=''>
          <Button style={{width:220}} type="primary" onClick={this.validate} loading={submitting}>
            提交
          </Button>
          <Button style={{width:220}} onClick={() => window.history.back()}>
            返回
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default ApiUpdate;
