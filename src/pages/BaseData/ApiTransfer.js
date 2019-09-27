import React, { PureComponent } from 'react';
import { Transfer, Modal, message } from 'antd';
import { connect } from 'dva';

@connect(({ appkeyModel, loading }) => ({
  appkeyModel,
  loading: loading.models.appkeyModel,
}))
class ApiTransfer extends PureComponent {
  state = {
    targetKeys: [],
    selectedKeys: [],
    modalVisible: false,
    oriSelectedArray:[]
  };

  componentDidMount = () => {
    const { modalVisible } = this.props;
    this.setState({ modalVisible });
  };

  componentWillReceiveProps(nextProps) {
    const { modalVisible, selectedRow } = this.props;
    const { modalVisible: nextModalVisible } = nextProps;
    const { selectedRow: nextSelectedRow } = nextProps;
    // console.log('modalVisible444:', modalVisible, 'selectedRow11231:', selectedRow);
    if (nextModalVisible !== modalVisible) {
      this.setState({ modalVisible: nextModalVisible });
    }
    if (nextModalVisible && !modalVisible && nextSelectedRow) {

      const { relationName } = this.props;
      const oriSelectedArray =
        nextSelectedRow && nextSelectedRow[relationName] ? nextSelectedRow[relationName] : [];
      const oriTargetKeys = oriSelectedArray.map(item => item.apiId);
      // console.log('oriSelectedArray123:', oriSelectedArray);
      this.setState({ targetKeys: oriTargetKeys, oriSelectedArray });
    }
  }

  okHandle = () => {

    const {
      dispatch,
      selectedRow,
      keyName
    } = this.props;
    // console.log('okHandle-props', this.props);
    const relationKeyName = 'apiIds';
    const key = 'appkey';
    const { oriSelectedArray,targetKeys } = this.state;
    const willUpdateArray = [];
    oriSelectedArray.forEach(item => {
      const targetKey = targetKeys.find(value => value === item[keyName]);
      if (targetKey) {
        willUpdateArray.push(item.apiId);
      }
    });
    targetKeys.forEach(value => {
      const role = oriSelectedArray.find(item => item[keyName] === value);
      if (!role) {
        willUpdateArray.push(value);
      }
    });
    const info = {
      data: {
        info: {
          [key]: selectedRow[key],
          [relationKeyName]: willUpdateArray
        },
      },
    };
    // // console.log("request submitRelation:",info);
    dispatch({
      type: 'appkeyModel/access',
      payload: info,
      callback: response => {
        if (response.code === '200') {
          const msg = response.msg || 'success.';
          const { onVisible, onRefreshData } = this.props;
          onVisible(false);
          // console.log('----0000000');
          onRefreshData();
          message.success(msg);
        } else {
          const msg = response.msg || '服务器内部错误。';
          message.error(msg);
        }
      },
    });
  };

  cancelHandle = () => {
    const { onVisible } = this.props;
    onVisible(false);
  };

  handleChange = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
  };

  // handleScroll = (direction, e) => {
  //   // console.log('direction:', direction);
  //   // console.log('target:', e.target);
  // }

  setKey = record => {
    const { keyName } = this.props;
    return record[keyName];
  };

  render() {
    const { apiServices } = this.props;
    const { targetKeys, selectedKeys, modalVisible } = this.state;
    return (
      <Modal
        title="授权"
        visible={modalVisible}
        onOk={() => this.okHandle()}
        onCancel={() => this.cancelHandle()}
      >
        <Transfer
          showSearch
          rowKey={this.setKey}
          dataSource={apiServices}
          titles={['未选择', '已选择']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={this.handleChange}
          onSelectChange={this.handleSelectChange}
          onScroll={this.handleScroll}
          render={item => `${item.apiId}-${item.name}`}
          listStyle={{
            width: 200,
            height: 300,
          }}
        />
      </Modal>
    );
  }
}

export default ApiTransfer;
