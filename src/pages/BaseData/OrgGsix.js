import React, {PureComponent} from 'react';
import {Card} from 'antd';
import {connect} from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {getUserId} from "../../utils/authority";
import GsixOrg from "./GsixOrg";

@connect(({uniComp, loading}) => ({
  uniComp,
  loading: loading.models.uniComp,
}))
class OrgGsix extends PureComponent {

  state = {
    org : {}
  }

  componentWillMount() {

    const {location} = this.props;
    const {state} = location;
    const {id} = state || {id: -1};
    const userId = getUserId();
    const {dispatch} = this.props;
    const payload = {userId,id};
    dispatch({
      type: 'uniComp/orgView',
      payload,
      callback: resp => {
        const {data} = resp;
        this.setState({
          org:data
        });
      }
    })
  }

  getPayloadGix = () =>{
    const {org} = this.state;
    const nodes = [];//  size是图形的大小
    const edges = [];
    if(org && org.id) {
      nodes.push({id: `${org.id}`, shape: 'circle', label: org.orgName,x:600,y:300});// 中心点
      const {callSystems, targetSystems} = org;// 内部端点、外部端点
      if(callSystems){
        callSystems.forEach((item,index) => {
          const y = (index + 1) * 80 + 50;
          const position = {x:250,y};
          const node = {id: `${item.appkey}`, shape: 'circle', label: item.systemName,...position};
          if(nodes){
            const sameNode = nodes.filter(val => val.id === node.id);
            // 相同的节点就不插入
            if(sameNode.length === 0){
              nodes.push(node);
            }
          }else{
            nodes.push(node);
          }
          // 添加连线
          const edge = {target: `${org.id}`, source: `${item.appkey}`};
          edges.push(edge);
        });
      }
      if(targetSystems){
        targetSystems.forEach((item,index) => {
          const y = (index + 1) * 100 + 50;
          const position = {x:950,y};
          const node = {id: `${item.appkey}`, shape: 'circle', label: item.systemName,...position};
          if(nodes){
            const sameNode = nodes.filter(val => val.id === node.id);
            // 相同的节点就不插入
            if(sameNode.length === 0){
              nodes.push(node);
            }
          }else{
            nodes.push(node);
          }
          const edge = {source: `${org.id}`, target: `${item.appkey}`};
          edges.push(edge);
        });
      }
      const data = {
        nodes,
        edges
      };
      return (
        <GsixOrg
          data={data}
        />
      );
    }
    return "";
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

export default OrgGsix;
