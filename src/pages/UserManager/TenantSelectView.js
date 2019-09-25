import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;
@connect(({ uniComp, loading }) => ({
  tenantList:uniComp.data.list,
  loading: loading.models.tenantList,
}))
class TenantSelectView extends PureComponent {

  componentDidMount = () => {
    const { dispatch, userId } = this.props;
    const tableName = "tenant";
    const pageSize = 9999;
    const params = {userId, tableName, pageSize};
    dispatch({
      type: 'uniComp/list',
      payload: params
    });
  };

  getOption() {
    console.log(this.props);
    const { tenantList } = this.props;
    return this.getOptionWhithList(tenantList);
  }

  getOptionWhithList = (list) => {

    if(!list || list.length < 1){
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }

    return list.map(item => (
      <Option key={item.id} value={item.code}>
        {item.name}
      </Option>
    ));
  };

  selectChangeItem = item => {
    const { onChange } = this.props;
    onChange(item);
  };

  render() {
    // const value = this.conversionObject();
    const { value } = this.props;
    return (
      <Select style={{ width: '100%' }} value={value} onSelect={this.selectChangeItem}>
        {this.getOption()}
      </Select>
    );
  }
}

export default TenantSelectView;
