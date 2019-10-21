import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';

export default function Gsix({
  data = [],
  onDetail
}) {
  const ref = React.useRef(null);
  let graph = null;

  useEffect(() => {
    if(!graph) {
      graph = new G6.Graph({
        container: ReactDOM.findDOMNode(ref.current),
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: 2,
        linkCenter: true,
        modes: {
          default: ['drag-canvas']
        },
        layout: {
          type: 'circular',            // 设置布局算法为 force
          linkDistance:5,
          preventOverlap: true,     // 设置防止重叠
          radius: 300 // 半径长度
        },
        defaultNode: {// 设置圆形的样式
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 15// 字体大小
            },
            position: 'center',
          },
          style: {
            stroke: '#72CC4A',
            width: 50
          }
        },
        defaultEdge: {
          color: 'blue',// 线条颜色
          // style: {
          //   endArrow: true // 是否显示箭头
          // }
        }
      })
    }
    graph.data(data);// 加载数据
    graph.on('node:click', ev=>{
      // console.log(ev);
      if(ev.item._cfg){
        const {id} = ev.item._cfg|| {};
        onDetail(id);// 跳转显示详细数据
        // console.log(id);
      }
    });
    graph.render();// 渲染
  }, [])

  return (
    <div ref={ref}> </div>
  );
}
