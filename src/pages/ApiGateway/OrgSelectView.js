import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;
@connect(({ orgModel, loading }) => ({
  orgList: orgModel.orgList,
  loading: loading.models.orgList,
}))
class OrgSelectView extends PureComponent {
  componentDidMount = () => {
    const { dispatch, orgType, userId } = this.props;
    // console.log("userId",userId);
    dispatch({
      type: 'orgModel/allOrgList',
      payload: { orgType, userId },
    });
  };

  getOption(sign) {
    const { orgList,field,filterTenant } = this.props;
    return this.getOptionWhithList(orgList,sign,field,filterTenant);
  }

  getOptionWhithList = (list,sign,field,filterTenant) => {

    let newList = list;
    // 是否需要common
    if(sign){
      const comItem ={
        id : 0,
        orgName : "Common"
      };
      newList = newList.filter(item=>item.id !== 0);
      newList.unshift(comItem);
    }
    else if(!list || list.length < 1){
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    let newField = 'id'
    if(field){
      newField = field;
    }
    // 是否过滤租户下的org信息
    if(filterTenant){
      newList = newList.filter(item=>item.tenantId === filterTenant || item.id === 0);
    }
    return newList.map(item => (
      <Option key={item.id} value={item[newField]}>
        {item.orgName}-{item.orgCode}
      </Option>
    ));
  };

  selectChangeItem = item => {
    const { onChange } = this.props;
    onChange(item);
  };

  render() {
    // const value = this.conversionObject();
    const { value,sign,isDisable } = this.props;
    const disable = isDisable?'disabled':'';
    // console.log("xxoo",filterTenant);
    return (
      <Select style={{ width: '100%' }} value={value} onSelect={this.selectChangeItem} disabled={disable}>
        {this.getOption(sign)}
      </Select>
    );
  }
}

export default OrgSelectView;
