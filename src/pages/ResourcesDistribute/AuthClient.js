import React,{PureComponent} from "react";
import { formatMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getItems} from '@/utils/masterData';
import {getUserId} from "../../utils/authority";
import AuthDataQueryTable from "../AuthDtaQueryTable";


class Configuration extends PureComponent {
  state = {
    columnSchemas: {}
  }

  // render之前调用接口得到响应结果存在state的list中
  componentWillMount() {
    const selectList = getItems('configuration', 'authorized_grant_types');// 选择
    const scopeList = getItems('configuration', 'scope');// 选择

    const userId = getUserId();
    const tagAttr ={ userId };

    const columnSchemas = {
      tableName: 'oauth_client_details',
      key: 'id',
      name: 'id',
      userId,
      columnDetails: [
        {name: 'clientId', title: formatMessage({'id':'app.configuration.env.clientId'}), add: true},
        {name: 'resourceIds', title: formatMessage({'id':'app.configuration.env.resourceIds'}), add: true, query: true, tag:'resourceSelect', tagAttr, rules:[]},
        {name: 'clientSecret', title: formatMessage({'id':'app.configuration.env.clientSecret'}), add: true, detailFlag: 1},
        {name: 'scope', title: formatMessage({'id':'app.configuration.env.scope'}), add: true,query:true,tag:'commonSelect',enumData: scopeList},
        {name: 'authorizedGrantTypes', title: formatMessage({'id':'app.configuration.env.authorizedGrantTypes'}), add: true,tag:'commonSelect',enumData: selectList},
        {name: 'accessTokenValidity', title: formatMessage({'id':'app.configuration.env.accessTokenValidity'}) ,add: true},
        {name: 'webServerRedirectUri', title: formatMessage({'id':'app.configuration.env.webServerRedirectUri'}), columnHidden: true,  add: true, rules:[]},
        {name: 'authorities', title: formatMessage({'id':'app.configuration.env.authorities'}), add: true, rules:[]},
        {name: 'refreshTokenValidity', title: formatMessage({'id':'app.configuration.env.refreshTokenValidity'}) , columnHidden: true,add: true, rules:[]},
        {name: 'additionalInformation', title: formatMessage({'id':'app.configuration.env.additionalInformation'}),  columnHidden: true, add: true, rules:[]},
        {name: 'autoapprove', title: formatMessage({'id':'app.configuration.env.autoapprove'}) ,columnHidden: true, rules:[]},
        {name: 'createTime', title: formatMessage({'id':'app.configuration.env.createTime'}),format: 'YYYY-MM-DD HH:mm:ss' }
      ]
    };

    this.setState({columnSchemas});

  }

  handleRef = (ref) => {
    this.child = ref
  }

  render() {

    const { selectedRow , columnSchemas} = this.state;
    console.log(selectedRow);
    return (
      <PageHeaderWrapper showBreadcrumb style={{height: '50px'}}>
        <AuthDataQueryTable
          columnSchemas={columnSchemas}
          onRef={this.handleRef}
          size='middle'
          onRow={(record) => {
            return {
              // onClick: (event) => {message.success("1")},       // 点击行
              // onDoubleClick: (event) => {},
              // onContextMenu: (event) => {},
              onMouseEnter: () => {
                this.setState({selectedRow: record});
              },  // 鼠标移入行
              // onMouseLeave: (event) => {console.log(12)}
            };
          }}
        />
      </PageHeaderWrapper>
    )
  }
}

export default Configuration;

