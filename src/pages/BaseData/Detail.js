import React, {PureComponent} from 'react';
import {Card, Table, Row, Col} from 'antd';
import Ellipsis from '@/components/Ellipsis';

const fieldLabels = {
  appKey: 'AppKey：',
  authorizedApi: 'Authorized Api',
  unathorizedApi: 'Unauthorized Api',
}

class Detail extends PureComponent {

  render() {
    const {selectedRow, targetServices} = this.props;
    const {appkey,callerName,apiServices,targetSystemName} = selectedRow || {appkey: '',callerName:'',targetSystemName:'',apiServices:[]};
    const name = callerName||targetSystemName;
    console.log(appkey,name);
    const keyName = 'apiId';
    const arr = [];
    const newApiServices = apiServices||[];
    // 获取未授权的Api列表
    if(targetServices){
      targetServices.forEach(value => {
        const isIn = newApiServices.find(item => item[keyName] === value[keyName]);
        if (!isIn) {
          arr.push(value);
        }
      });
    }
    const apiColumns = [
      {
        title: 'Api Id',
        dataIndex: 'apiId'
      },
      {
        title: 'Api Name',
        dataIndex: 'name'
      },
      {
        title: 'Request Url',
        dataIndex: 'requestUrl',
        render(val) {
          return <Ellipsis length={20} tooltip>{val}</Ellipsis>;
        },
      },
    ];
    const paginationProps = {
      pageSize: 5,
    };
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Card title={fieldLabels.authorizedApi} bordered={false}>
            <Table
              size="small"
              columns={apiColumns}
              dataSource={apiServices}
              pagination={paginationProps}
            />
          </Card>
        </Col>
        <Col span={12} style={{display:targetSystemName?'none':''}}>
          <Card title={fieldLabels.unathorizedApi} bordered={false}>
            <Table
              size="small"
              columns={apiColumns}
              dataSource={arr}
              pagination={paginationProps}
            />
          </Card>
        </Col>
      </Row>
      /*<Card title={`${fieldLabels.appKey}${name}-${appkey}`} bordered={false}>
      </Card>*/
    );
  }
}

export default Detail;
