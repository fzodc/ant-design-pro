import React,{PureComponent} from "react";
import { formatMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getUserId} from "../../utils/authority";
import ResourceDataQueryTable from "../AuthDtaQueryTable/resourceIndex";
import {getItems} from "../../utils/masterData";

class Configuration extends PureComponent {

  state = {
    selectedRow: {},
    columnSchemas: {}
  }

  // render之前调用接口得到响应结果存在state的list中
  componentWillMount() {
    const userId = getUserId();
    const statusList = getItems('common', 'status');// 状态
    const columnSchemas = {
      tableName: 'oauth_resource',
      key: 'id',
      name: 'id',
      userId,
      columnDetails: [
        {name: 'resourceId', title: formatMessage({'id':'app.configuration.env.resourceId'}), add: true,query: true},
        {name: 'groupName', title: formatMessage({'id':'app.configuration.env.groupName'}), add: true, rules:[] },
        {name: 'remark', title: formatMessage({'id':'app.configuration.env.remark'}), add: true },
        {name: 'createTime', title: formatMessage({'id':'app.configuration.env.createTime'})},
        {
          name: 'status',
          title: formatMessage({'id':'app.configuration.env.status'}) ,
          tag:'commonSelect',
          enumData: statusList,
          add:true,
          addHidden:true,
          query:true,
          rules:[]
        }
      ]
    };
    this.setState({columnSchemas});
  }

  handleRef = (ref) => {
    this.child = ref
  }

  handleRefreshData = () => {
    this.child.handleSearchDefault();
  };

  render() {
    const {selectedRow,columnSchemas} = this.state;
    console.log(selectedRow);
    return (
      <PageHeaderWrapper showBreadcrumb style={{height: '50px'}}>
        <ResourceDataQueryTable
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

