import React from 'react';
import BindDataQueryTable from '../BindDataQueryTable/index';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';

const statusList = getItems('common', 'status');

export default (props) => {
  const { location } = props;
  const { state } = location;
  // console.log("location state:",state);
  const { record } = state ||{};
  const name=record?record.name:'info';
  const {techType} = record || {techType:''};
  const tag = techType === 'DynaToken'? 'commonSelect':null;
  const attrCodeList = getItems('adapterSpec', 'attr_spec_code');
  const columnSchemas = {
    tableName: 'adapter_attr_spec',
    key: 'attrSpecId',
    name: 'attrSpecCode',
    relationKeyForMasterTable:'adapterSpecId',
    masterTableKey:'id',
    columnDetails: [
      { name: 'attrSpecId', title: 'ID', add: true, disabledAct:'true' },
      { name: 'attrSpecCode',
        title: 'Attr Code',
        sorter: false,
        query: true,
        add: true,
        detailFlag:true,
        tag,
        enumData: attrCodeList,
      },
      { name: 'attrSpecName', title: 'Attr Name', sorter: false, query: true, add: true },
      {
        name: 'defaultValue',
        title: 'Default Value',
        sorter: false,
        add: true ,
        rules:[],
        tag:'textArea',
        showLen:22,
        rows: 5,
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
      }, // 需要作为查询条件，新增时需要采集，需要使用绑定的下拉标签
    ]
  };
  return (
    <PageHeaderWrapper
      onBack={() => window.history.back()}
      style={{ height: '50px' }}
      title={`Attr Spec Management for Adapter:${name}`}
    >
      <BindDataQueryTable columnSchemas={columnSchemas} masterRecord={record} />
    </PageHeaderWrapper>
  );
};
