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
    const { orgList,field } = this.props;
    return this.getOptionWhithList(orgList,sign,field);
  }

  getOptionWhithList = (list,sign,field) => {

    let newList = list;

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
    const { value,sign,isDisable, } = this.props;
    const disable = isDisable?'disabled':'';
    // console.log("xxoo",newValue);
    return (
      <Select style={{ width: '100%' }} value={value} onSelect={this.selectChangeItem} disabled={disable}>
        {this.getOption(sign)}
      </Select>
    );
  }
}

export default OrgSelectView;
