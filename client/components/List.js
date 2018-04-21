import React from 'react'
const {
  Component
}= React;
class List extends Component{
  constructor(props){
    super(props);
    debugger;
    this.state={
      isSelected:false
    }
  }
  editTask= (task) => {
    this.props.editRow(task);
  }
  deleteTask = (taskId) => {
    //console.log(taskId);
    this.props.deleteRow(taskId);
  }
  columnSort=(columnId) => {
    this.props.sortData(columnId);
  }
  rowSelected=(data) => {
    if(!this.state.isSelected){
      this.setState({isSelected:true});
    }else{
      this.setState({isSelected:false});
    }
    console.log(data)
  }

  render(){
    return(
      <div>
      {this.props.data?
        <div>
      <table className="table">
        <thead>
          <tr>
          <th><input type="checkbox" name="select" value={this.state.isSelected} onChange={(e) => this.rowSelected(e)} /></th>
          {this.props.data.header.map((header,i) => <th key={header.columnId} onClick={() => this.columnsort(header.columnId)}>{header.columnName}</th>)}
            <th></th>
          </tr>
        </thead>
        <tbody>
        {this.props.data.listData.map((task, i) =>
          <tr key={i}>
          {this.props.options.isDelete? <td ><input type="checkbox" name="select" value={this.state.isSelected} onChange={() => this.rowSelected(task.payload)} /></td>:null}
          {task.rowData.map((rowData,i) => <td key={rowData.columnId}>{rowData.columnContent}</td>)}
          {this.props.options.isEdit? <td onClick={() => this.editTask(task.payload)}>Edit</td>:null}
          {this.props.options.isDelete? <td onClick={() => this.deleteTask(task.payload._id)}>X</td>:null}
          </tr>
        )}
        </tbody>
      </table>

      </div>
      :''
    }
    </div>
    )
  }
}

export default List;
