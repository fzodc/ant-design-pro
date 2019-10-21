import React, {PureComponent} from 'react';
import router from 'umi/router';
import {Card} from 'antd';
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getUserId} from "../../utils/authority";
import Gsix from './Gsix';

@connect(({uniComp, loading}) => ({
  uniComp,
  loading: loading.models.uniComp,
}))
class TenantGsix extends PureComponent {

  state = {
    tenantList :[]
  }

  componentWillMount() {
    const userId = getUserId();
    const {dispatch} = this.props;
    const payload = {userId};
    dispatch({
      type: 'uniComp/tenantView',
      payload,
      callback: resp => {
        const {data} = resp;
        this.setState({
          tenantList:data
        });
      }
    })
  }

  onDetail = (id) =>{
    // 跳转到org视图
    router.push({
      pathname: `/baseData/orgGsix`, // 通过url参数传递
      state: {
        id // 选中的org标签
      },
    });
  }

  getPayloadGix = () =>{
    const {tenantList} = this.state;
    const nodes = [];//  size是图形的大小
    const edges = [];
    if(tenantList) {
      tenantList.forEach(item => {
        const node = {id: `${item.id}`, shape: 'circle', label: item.orgName};
        if(nodes){
          const sameNode = nodes.filter(val => val.id === node.id);
          // 相同的节点就不插入
          if(sameNode.length === 0){
            nodes.push(node);
          }
        }else{
          nodes.push(node);
        }
        const {relatedSystems} = item;
        if (relatedSystems) {
          relatedSystems.forEach(related => {
            const edge = {source: `${item.id}`, target: `${related.appkey}`};
            const edgeNode = {id: `${related.appkey}`, shape: 'circle', label: related.systemName};
            const sameNode = nodes.filter(val => val.id === related.id);
            if(sameNode.length === 0){
              nodes.push(edgeNode);
            }
            edges.push(edge);
          });
        }
      });
    }
    const data = {
      nodes,
      edges
    };
    if(nodes.length === 0){
      return "";
    }
    return (
      <Gsix
        data={data}
        onDetail={this.onDetail}
      />
    );
  }

  render() {

    const data = this.getPayloadGix();
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          {data}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TenantGsix;
