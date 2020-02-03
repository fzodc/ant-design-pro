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

  state = {
    selectValue:null
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    const userId = getUserId();
    const payload = {condition:{userId,pageNo:1,pageSize:999},data:{}};
    dispatch({
      type: 'resourceModel/allList',
      payload
    });
  };

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    console.log("componentWillReceiveProps",value,":::",nextProps.value);
    if (value !== nextProps.value) {
      this.setState({selectValue:nextProps.value});
    }
  }

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
    const { style, ...restProps} = this.props;
    const {selectValue} = this.state;
    // defaultValue 格式  [{'a1','a2'}]
    if(selectValue === '' || selectValue === null || selectValue === undefined){
      console.log("resourceS-1",selectValue);
      return (
        <Select mode="multiple" onSelect={this.selectChangeItem} style={style} {...restProps}>
          {this.getOption()}
        </Select>
      );
    }
    console.log("resourceS-2",selectValue);
    const isArray = Array.isArray(selectValue);
    let multValues = null;
    if(!isArray){
      multValues = selectValue.split(',');
    }else{
      multValues = selectValue;
    }
    return (
      <Select mode="multiple" value={multValues} onSelect={this.selectChangeItem} style={style} {...restProps}>
        {this.getOption()}
      </Select>
    );
  }
}

export default ResourceSelectView;
