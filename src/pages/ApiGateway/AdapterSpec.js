import React, {PureComponent} from 'react';
import {Divider} from 'antd';
import {connect} from 'dva';
import router from 'umi/router';
import BindDataQueryTable from '../BindDataQueryTable/index';
import QueryCommand from '@/components/QueryTable/QueryCommand';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';

import Authorized from '@/utils/Authorized';
import { getAuth, getUserId } from '@/utils/authority';

const { check } = Authorized;

@connect(({ uniComp, loading }) => ({
  uniComp,
  loading: loading.models.uniComp,
}))
class Adapter extends PureComponent {

  state={
    selectedRow:undefined,
    columnSchemas:{},
  }

  componentWillMount() {

    const statusList = getItems('common', 'status');// 状态
    const pointTypeList = getItems('adapterSpec', 'point_type');
    const techTypeList = getItems('adapterSpec', 'tech_type');
    const auth=getAuth("adapter_spec_save"); // 获取某个功能权的角色
    const saveAct = check(auth,'Modify'); // 检查某个功能权的权限，如果有权限，返回第二个参数的值作为展现内容
    // 获取userId
    const userId = getUserId();
    const orgType = "0,1";
    const tagAttr ={ userId,orgType };
    let queryHidden = false;
    if( userId === 4 || userId === 22){
      queryHidden = true;
    }

    const commandAct = check(auth,'Properties');
// 动作对象
    const actions=saveAct||commandAct?{
      title:'action',
      width:130,
      saveAct,
      commandAct,
      havePermissions:true,
      haveAddPermissions:true,
    }:{havePermissions:false,
      haveAddPermissions:false,};


    const columnSchemas = {
      tableName: 'adapter_spec',
      key: 'id',
      name: 'name',
      relationKey: 'adapterSpecId',
      columnDetails: [
        { name: 'id', title: 'Adapter ID', columnHidden: true, add: true, disabledAct:'true' },
        {
          name: 'tenantId',
          title: 'Tenant Name',
          columnHidden: true,
          query: queryHidden,
          editHidden:!queryHidden,
          add: true,
          tag: 'TenantSelectView',
        },
        {
          name: 'rang',
          title: 'Rang',
          columnHidden: true,
          query: true,
          add: true,
          tag: 'OrgSelectView',
          tagAttr
        },
        { name: 'name', title: 'Adapter Name', sorter: true, query: true, add: true, detailFlag:true },
        {
          name: 'pointType',
          title: 'Point Type',
          columnHidden: false,
          query: true,
          add: true,
          tag: 'commonSelect',
          enumData: pointTypeList,
        },
        {
          name: 'techType',
          title: 'Tech Type',
          columnHidden: false,
          query: true,
          add: true,
          tag: 'commonSelect',
          enumData: techTypeList
        },
        {
          name: 'orgName',
          title: 'Rang',
          columnHidden: false,
          query: false,
          add: false
        },
        { name: 'url', title: 'Adapter URL', showLen:15,query: false, add: true ,rules:[]},
        { name: 'reqPath', title: 'Adapter Path', showLen:15,query: false, add: true ,rules:[]},
        { name: 'code',
          title: 'Adapter Java Code',
          showLen:15,
          tag:'textArea',
          rows:5,
          query: false,
          add: true ,
          rules:[]
        },
        {
          name: 'status',
          title: 'Status',
          columnHidden: false,
          query: false,
          add: true,
          tag: 'commonSelect',
          enumData: statusList,
          addHidden:true,
          rules:[]
        },
        { name: 'remark', title: 'remark',tag:'textArea',columnHidden: true, add: true,rows:3,rules:[] },
      ],
      relations:[{
        name:'attrSpecs',
        key: 'attrSpecId',
        title:'Attr Spec List',
        columnDetails:[
          {name: 'attrSpecId',title:'Attr Spec Id'},
          {name: 'attrSpecCode',title:'Code'},
          {name: 'attrSpecName',title:'Name'},
          {name: 'defaultValue',title:'Default Value'},
        ]
      }],
      actions,
    };
    columnSchemas.userId = userId;
    this.setState({columnSchemas});
  }

  handleAttr = () => {
    const {selectedRow}=this.state;
    const { id } = selectedRow;
    // router.push(`/apiGateway/apiCreate/${apiId}`);
    router.push({
      pathname: `/apiGateway/adapterAttrSpec`, // 通过url参数传递
      state: {
        // 通过对象传递
        adapterSpecId:id,
        record:selectedRow, // 表格某行的对象数据
      },
    });
  };

  render() {
    const {columnSchemas}=this.state;
    return (
      <PageHeaderWrapper title="Adapter Management">
        <BindDataQueryTable
          columnSchemas={columnSchemas}
          onRef={this.handleRef}
          size='middle'
          onRow={(record) => {
            return {
              // onClick: (event) => {message.success("1")},       // 点击行
              // onDoubleClick: (event) => {},
              // onContextMenu: (event) => {},
              onMouseEnter: () => {this.setState({selectedRow:record});},  // 鼠标移入行
              // onMouseLeave: (event) => {console.log(12)}
            };
          }}
        >
          <span id="QueryCommand">
            <QueryCommand>
              <Divider type="vertical" />
              <a onClick={() => this.handleAttr()}>Attr</a>
            </QueryCommand>
          </span>
        </BindDataQueryTable>
      </PageHeaderWrapper>
    );
  }
}
export default Adapter;
