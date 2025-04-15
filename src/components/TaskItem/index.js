
import { MdDeleteOutline } from "react-icons/md";
import './index.css'

const TaskItem = props =>{
    const {eachTodo,onDeleteTodoFun,onClickCheckBox}=props 
    const {taskName,status,id}=eachTodo 
  

   let isClicked =status==="true" ? true :false

    
    return(
        <li className="todo-item-container">
            <input type="checkbox" className="checkbox-input" checked ={isClicked} onChange={()=>onClickCheckBox(id)} id={id} />
            <div className="label-container">
            <label className={isClicked ? "checkbox-label ischecked":"checkbox-label"} htmlFor="id">{taskName} </label>
            <div className="delete-icon-container">
            <button className="delete-button" type="button" onClick={()=>onDeleteTodoFun(id)}>
            <MdDeleteOutline  className="delete-icon"/>
            </button>
            </div>
            </div>
        </li>
    )

}

export default TaskItem