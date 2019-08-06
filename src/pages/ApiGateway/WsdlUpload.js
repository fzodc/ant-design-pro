import React, {PureComponent} from 'react';
import { Upload, Button, Icon, message, Modal } from 'antd';

import { connect } from 'dva';

@connect(({ wsdlModel, loading }) => ({
  wsdlModel,
  loading: loading.models.wsdlModel,
}))
class WsdlUpload extends PureComponent {

  state = {
    fileList: []
  };

  componentDidMount() {

    const {dispatch,selectedRow} = this.props;

    if( selectedRow ){
      const {wsdlPath} = selectedRow;
      const payload = {folder:wsdlPath};
      dispatch({
        type: 'wsdlModel/fileWsdl',
        payload,
        callback:resp=>{
          if(resp.code === '200'){
            const {data} = resp;
            const fileList = data.map((item,index)=>({
              name:item,
              uid:index,
              old:1
            }));
            this.setState({fileList});
          }else{
            this.setState({fileList:[]});
          }
        }
      });
    }

  }


  componentWillReceiveProps(nextProps) {

    const { selectedRow,dispatch } = this.props;

    if (selectedRow !== nextProps.selectedRow) {
      const nextSelectedRow = nextProps.selectedRow;
      if( nextSelectedRow ){
        const {wsdlPath} = nextSelectedRow;
        const payload = {folder:wsdlPath};
        dispatch({
          type: 'wsdlModel/fileWsdl',
          payload,
          callback:resp=>{
            if(resp.code === '200'){
              const {data} = resp;
              const fileList = data.map((item,index)=>({
                name:item,
                uid:index,
                old:1
              }));
              this.setState({fileList});
            }else{
              this.setState({fileList:[]});
            }
          }
        });
      }else{
        this.setState({fileList:[]});
      }
    }
  }

  handleChange = ({ fileList }) => {

    console.log("handleChange",fileList);
    // const newFileList = fileList.slice(-6);
    if(fileList.length > 2){
      message.error('upload file size must less than 9.');
    }else{
      const {handleFile} = this.props;
      this.setState({fileList});
      handleFile(fileList);
    }


  };

  deleteFile = (file) =>{

    const { name,old } = file;
    const { selectedRow,dispatch } = this.props;

    // 旧文件删除
    if( old ){

      const {wsdlPath} = selectedRow;
      const payload = {folder:wsdlPath,fileName:name};

      let result = false;
      dispatch({
        type: 'wsdlModel/removeFile',
        payload,
        callback: resp => {
          if(resp.code === '200'){
            result = true;
            this.setState(state => {
              const index = state.fileList.indexOf(file);
              const newFileList = state.fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
              };
            });
          }
        }
      });
      return result;

    }else{
      this.setState(state => {
        const index = state.fileList.indexOf(file);
        const newFileList = state.fileList.slice();
        newFileList.splice(index, 1);
        return {
          fileList: newFileList,
        };
      });
      return true;
    }

  }

  render() {

    const { fileList } = this.state;

    const propsUpload = {
      onRemove: file => {
        console.log("onRemove",file);
        return this.deleteFile(file);
        // Modal.confirm({
        //   title: 'Delete this file',
        //   content: 'Are you sure delete this file？',
        //   okText: 'Yes',
        //   cancelText: 'No',
        //   onOk: () => this.deleteFile(file),
        //   onCancel:() => {return false;}
        // });

      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      accept: ".xsd,.wsdl",
      multiple:true,
      fileList,
    };

    return (
      <div>
        <Upload {...propsUpload}
          onChange={this.handleChange}
        >
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
      </div>
    );
  }
}

export default WsdlUpload;
