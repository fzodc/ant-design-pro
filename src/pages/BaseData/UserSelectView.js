import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;
@connect(({ uniComp, loading }) => ({
  userList: uniComp.userList,
  loading: loading.models.userList,
}))
class UserSelectView extends PureComponent {

  componentDidMount = () => {
    const { dispatch, userId } = this.props;
    const tableName = "sys_user";
    const pageSize = 9999;
    const payload = {userId, tableName, pageSize};
    dispatch({
      type: 'uniComp/allUserList',
      payload
    });
  };

  getOption() {
    const { userList,field } = this.props;
    return this.getOptionWhithList(userList,field);
  }

  getOptionWhithList = (list,field) => {

    if(!list || list.length < 1){
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }

    return list.map(item => (
      <Option key={item.id} value={item[field]}>
        {item.username}
      </Option>
    ));
  };

  selectChangeItem = item => {
    const { onChange } = this.props;
    onChange(item);
  };

  render() {
    const { value } = this.props;
    return (
      <Select style={{ width: '100%' }} value={value} onSelect={this.selectChangeItem}>
        {this.getOption()}
      </Select>
    );
  }
}

export default UserSelectView;
