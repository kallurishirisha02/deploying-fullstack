import {Component} from 'react'

import TaskItem from '../TaskItem'
import './index.css'

class TaskForm extends Component{
    state={todoList:[],userInput:''}
    componentDidMount(){
        this.getTodosList()
    }

    getTodosList=async ()=>{
        const url="https://backend-todo-7-7ae7.onrender.com/"
        const options={method:"GET",}
        const response= await fetch(url,options)
        if (response.ok){
            const jsonData= await response.json()
            this.setState({todoList:jsonData}) 
        }else{
            console.log("Failed to fetch")
        }
        
        
    } 

    onDeleteTodoFun= async (id) =>{
        
        
        const url=`https://backend-todo-7-7ae7.onrender.com/todos/${id}/`
        const options={method:"DELETE",}
        const response= await fetch(url,options)
        if (response.ok){
            const {todoList}=this.state
        let onDeleteUpdatedList=todoList.filter(eachTodo=>(
            eachTodo.id!==id

        ))
        
        this.setState({todoList:onDeleteUpdatedList})

        }else{
            console.log("Failed to delete")
        }

        
    }

    onChangeUserValue=event=>{
        this.setState({userInput:event.target.value})  
    }

    onAddTodoButton= async ()=>{
        
        const {userInput}=this.state 
        const url="https://backend-todo-7-7ae7.onrender.com/todos/"
        const options={method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                taskname:userInput,
                status:false
            }),
        }
        const response = await fetch(url,options)
        if (response.ok){
            this.setState({userInput:''})
        
        this.getTodosList()

        }else{
            console.log("Failed to delete")
        }
        
        //const jsonData =await data.json()
        
        
    }

    onClickCheckBox=async (id)=>{
        const {todoList}=this.state 
        const todo=todoList.find(each=>each.id===id)

//converting status as boolean value and updating backend
        let value=todo.status
        let bool=value==="true" ? true :false

        const updatedStatus=!bool
        
        const url=`https://backend-todo-7-7ae7.onrender.com/todos/${id}/` 
        const options={method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                status:updatedStatus
            })
        }
        const response=await fetch(url,options)
        if (response.ok){
            this.getTodosList()

        }else{
            console.log("Failed to uptade checkbox")
        }
        

    }

    render(){
        const { todoList ,userInput} = this.state
        
        return (
            <div className='bg-container'>
            <div className='todos-bg-container'>
                <h1 className='todos-heading'> TODOS</h1>
                <h1 className="create-task-heading">Create <span className='create-task-heading-subpart'>Task</span></h1>
                <input type="text" className='todo-user-input' placeholder="What needs to be done?" value={userInput} onChange={this.onChangeUserValue}/>
                <button className="button"onClick={this.onAddTodoButton}>Add</button>
                <h1 className='todo-items-heading'>My  <span className="todo-items-heading-subpart">Tasks</span></h1>
                <ul className="todo-items-container" >
                    {
                        todoList.map(eachTodo=>(
                            <TaskItem  key={eachTodo.id}  eachTodo={eachTodo} id={eachTodo.id} onClickCheckBox={this.onClickCheckBox} onDeleteTodoFun={this.onDeleteTodoFun}/>
                        ))
                    }
                </ul>
            </div>
            </div>
        )
    }

}

export default TaskForm