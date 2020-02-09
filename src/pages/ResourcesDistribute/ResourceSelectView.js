import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';
import {getUserId} from "../../utils/authority";

const { Option } = Select;
@connect(({ resourceModel, loading }) => ({
  resourceList: resourceModel.resourceList,
  loading: loading.models.resourceList,
}))
class ResourceSelectView extends PureComponent {

  componentDidMount = () => {
    const { dispatch } = this.props;
    const userId = getUserId();
    const payload = {condition:{userId,pageNo:1,pageSize:999},data:{}};
    dispatch({
      type: 'resourceModel/allList',
      payload
    });
  };

  getOption() {
    const { resourceList } = this.props;
    return this.getOptionWhithList(resourceList);
  }

  getOptionWhithList = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.id} value={item.resourceId}>
        {item.resourceId}
      </Option>
    ));
  };

  selectChangeItem = item => {
    const { onChange } = this.props;
    onChange(item);
  };

  render() {
    // const value = this.conversionObject();
    const { value,style, ...restProps} = this.props;
    // defaultValue 格式  [{'a1','a2'}]
    const isArray = Array.isArray(value);
    let multValues = null;
    if(!isArray){
      multValues = value.split(',');
    }else{
      multValues = value;
    }
    return (
      <Select mode="multiple" value={multValues} onSelect={this.selectChangeItem} style={style} {...restProps}>
        {this.getOption()}
      </Select>
    );
  }
}

export default ResourceSelectView;
