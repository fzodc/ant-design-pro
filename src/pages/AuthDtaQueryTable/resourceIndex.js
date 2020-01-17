/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { message } from 'antd';

import QueryTable from '@/components/QueryTable';

@connect(({ resourceModel, loading }) => ({
  resourceModel,
  loading: loading.models.resourceModel,
}))
class ResourceDataQueryTable extends PureComponent {
  state = {
    selectedRows: [],
  };

  componentWillMount() {
    console.log('============1componentWillMount========', this.props);
    const {
      resourceModel: { data },
    } = this.props;
    if (data && data.list) {
      data.list = [];
    }
  }

  componentDidMount() {
    // console.log('============2componentDidMount========');
    this.handleSearchDefault();
    const { onRef } = this.props;
    if (onRef) {
      onRef(this);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const { refreshData } = this.props;
  //   if (nextProps.refreshData&&refreshData !== nextProps.refreshData) {
  //     const {columnSchemas: { tableName, },} = this.props;
  //     this.handleSearch({tableName});
  //   }
  // }

  handleSelectRows = rows => {
    // console.log("----:",rows);
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearchDefault = () => {
    console.log('-------------------222222222');
    const {
      columnSchemas: { tableName },
    } = this.props;
    this.handleSearch({ tableName });
  };

  handleSearch = params => {
    const {
      dispatch,
      onConversionData,
      pageSize,
      columnSchemas: { userName, userId,relationKeyForMasterTable,masterTableKey },
      masterRecord,
    } = this.props;
    const newParams={ ...params, userName, userId };
    if(pageSize){
      newParams.pageSize=pageSize;
    }
    if(masterRecord&&relationKeyForMasterTable&&masterTableKey){
      newParams[relationKeyForMasterTable]=masterRecord[masterTableKey];
    }
    console.log('binddata', newParams);
    dispatch({
      type: 'resourceModel/resourceList',
      payload: newParams,
      onConversionData,
    });
  };

  handleAdd = (payload, addForm, callback2) => {
    // console.log('handleAdd:',fields);
    const {
      dispatch,
      columnSchemas: { relationKeyForMasterTable,masterTableKey,userId },
      masterRecord,
    } = this.props;
    const newPayload={...payload,userId};
    if(masterRecord&&relationKeyForMasterTable&&masterTableKey){
      newPayload.data.info[relationKeyForMasterTable]=masterRecord[masterTableKey];
    }

    dispatch({
      type: 'resourceModel/saveResource',
      payload:newPayload,
      callback: resp => {
        // console.log('resp=======', resp);
        const {code,msg} = resp;
        if (code === '200') {
          message.success('提交成功');
          callback2(addForm);
        } else {
          message.error(`${msg}`);
        }
      },
    });
  };

  handleMenuClick = (payload, callback2) => {
    const { dispatch } = this.props;

    // console.log("========resourceModel/statusBatch1====");
    dispatch({
      type: 'resourceModel/statusBatchResource',
      payload,
      callback: () => {
        callback2();
      },
    });
  };

  render() {
    const {
      resourceModel: { data },
      loading,
      columnSchemas,
      onRow,
      children,
      size,
      masterRecord,
    } = this.props;
    const { key } = columnSchemas;
    const { selectedRows } = this.state;
    return (
      <QueryTable
        selectedRows={selectedRows}
        rowKey={key}
        loading={loading}
        data={data}
        onSelectRow={this.handleSelectRows}
        onMenuClick={this.handleMenuClick}
        onAdd={this.handleAdd}
        columnSchemas={columnSchemas}
        onSearch={this.handleSearch}
        onRow={onRow}
        size={size}
        masterRecord={masterRecord}
      >
        {children}
      </QueryTable>
    );
  }
}

export default ResourceDataQueryTable;
