import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Divider } from 'antd';
import router from 'umi/router';
import styles from './style.less';
import GroupTreeSelectView from '../GroupTreeSelectView';
import RadioView from '../RadioView';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ apiCreateModel,loading }) => ({
  apiService: apiCreateModel.apiService,
  detailLoading: loading.effects['apiGatewayModel/apiInfo'],
}))
@Form.create()
class Step1 extends React.PureComponent {

  componentDidMount() {
    const { dispatch,apiService} = this.props;
    console.log("step1 componentDidMount:",apiService,apiService.apiId);
    if(apiService.apiId!==undefined||apiService.name===undefined){
      console.log("step1 componentDidMount2:",apiService.apiId,apiService.apiId!==undefined);
      dispatch({
        type: 'apiCreateModel/initDataForAdd',
      });
    }

  }

  render() {
    const { form, dispatch, apiService } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'apiCreateModel/saveStepFormData',
            payload: {...values},
            stepType:1,
          });
          router.push('/apiGateway/apiCreate/consumer');
        }
      });
    };
    console.log("step1 data in render:",apiService);
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="分组">
            {getFieldDecorator('groupId', {
              initialValue: apiService.groupId,
              rules: [{ required: true, message: 'please choose分组' }],
            })(<GroupTreeSelectView hideRoot isDisabled={1} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Api名称">
            {getFieldDecorator('name', {
              initialValue: apiService.name,
              rules: [{ required: true, message: 'please enterApi名称' }],
            })(<Input placeholder="please enterApi名称" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Api Range">
            {getFieldDecorator('apiType', {
              initialValue: apiService.apiType,
              rules: [{ required: true, message: 'please choose Api Range' }],
            })(<RadioView javaCode="apiService" javaKey="api_type" />)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>配置说明</h4>
          <p>第一步配置基础信息，第二步配置请求信息，第三步配置后端服务信息。</p>
        </div>
      </Fragment>
    );
  }
}

export default Step1;
