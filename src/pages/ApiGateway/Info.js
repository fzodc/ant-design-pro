import React, {Component} from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import {FormattedMessage} from 'umi-plugin-react/locale';
import {Menu} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Info.less';

const {Item} = Menu;

@connect(({user}) => ({
  currentUser: user.currentUser
}))
class Info extends Component {
  constructor(props) {
    super(props);
    const {match, location} = props;
    const menuMap = {
      list: <FormattedMessage id="app.settings.menuMap.apiList" defaultMessage="Own API List" />,
      callList: (
        <FormattedMessage id="app.settings.menuMap.callList" defaultMessage="Call API List" />
      )
    };
    const key = location.pathname.replace(`${match.path}/`, '');
    this.state = {
      menuMap,
      selectKey: menuMap[key] ? key : 'list',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {match, location} = props;
    let selectKey = location.pathname.replace(`${match.path}/`, '');
    selectKey = state.menuMap[selectKey] ? selectKey : 'base';
    if (selectKey !== state.selectKey) {
      return {selectKey};
    }
    return null;
  }

  getmenu = () => {
    const {menuMap} = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const {selectKey, menuMap} = this.state;
    return menuMap[selectKey];
  };

  selectKey = ({key}) => {
    router.push(`/apiGateway/apiList/${key}`);
    this.setState({
      selectKey: key,
    });
  };

  render() {
    const {children, currentUser} = this.props;
    if (!currentUser.userid) {
      return '';
    }
    const {selectKey} = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={ref => {
            this.main = ref;
          }}
        >
          <div className={styles.right}>
            <Menu mode="horizontal" selectedKeys={[selectKey]} onClick={this.selectKey} style={{width: '100%'}}>
              {this.getmenu()}
            </Menu>
            {children}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default Info;
