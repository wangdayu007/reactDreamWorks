import React,{useState,useEffect,useRef,useContext} from 'react'
import {Table,Button,Modal,Form,Input} from "antd"
import {
  DeleteOutlined,ExclamationCircleOutlined
} from '@ant-design/icons';
import axios from 'axios'
const {confirm} =Modal

export default function NewsCategory() {
  const [dataSource,setdataSource] = useState([])

  useEffect(()=>{
    axios.get('/categories').then(res=>{
      setdataSource(res.data)
    })
  },[])
  const handleSave = (record)=>{
    console.log(record)
    setdataSource(dataSource.map(item=>{
      if(item.id===record.id){
        return{
          id:item.id,
          label:record.label,
          value:record.label
        }
      }
      return item
    }))
    axios.patch(`/categories/${record.id}`,{
        label:record.label,
        value:record.label
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=> {
       return <b>{id}</b>
      },
    },{
      title: 'Channel Name',
      dataIndex: 'label',
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: 'label',
        title: 'Channel Name',
        handleSave:handleSave,
      }),
    },{
      title: 'Operation',
      render:(item)=> {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined/>} 
          onClick={()=>confirmMethod(item)}></Button>
        </div>
       },
    }
  ];
  const confirmMethod=(item)=>{
    confirm({
      title: 'Do you Want to delete this items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        // console.log('OK');
        deleteMethod(item)
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }

  const deleteMethod = (item)=>{
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.delete(`/categories/${item.id}`)
  }
  const EditableContext = React.createContext(null);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
  
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} 
      pagination={{pageSize:5}} rowKey={item=>item.id}
      components={{
        body:{
          row:EditableRow,
          cell:EditableCell
        }
      }}/>;
    </div>
  )
}
