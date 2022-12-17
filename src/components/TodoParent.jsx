import React, { useReducer, useState } from "react";
import TodoList from "./TodoList/TodoList";
import "../styles/todoParent.css";


export default function TodoParent(){
    const[todo,setTodo] = useState("");

    function updateTodo(value){
        setTodo(value);
    }

    const reducer = (state,action)=>{
      switch(action.type){
        case "ADD":
            updateTodo("");
            return([...state,{
                id: new Date().getTime().toString(),
                data: action.payload,
                isEdit: false
            }])
        case "EDIT":{
            let temp = [...state];
            temp.some(list=>{
                if(list.id === action.payload.id){
                    // console.log(list);
                    list.isEdit = action.payload.isEdit
                }
            })
            // console.log(action.payload.id);
            return temp;
        }
        case "SAVE":{
            let temp =[...state];
            temp.some(list=>{
                if(list.id === action.payload.id){
                    list.data = action.payload.data;
                    list.isEdit = action.payload.isEdit;
                }
            })
            return temp;
        }
        case "DELETE":{
            let temp = [...state];
            return temp.filter(list=>{
               return list.id !== action.payload.id;
            })
            
        }
            
        default :
            return state;
      }  
    }

   
    const initialState = [];
    /* [{id : "",
         data : "",
         isEdit : false
    }] */ 

    const[todoList,dispatcher] = useReducer(reducer,initialState);

    // console.log(todoList);

    return(<>
        <h1>Todo-List</h1>
        <div id="textInput">
            <textarea 
            id="task"
            value={todo}
            onChange={e=>{
                updateTodo(e.target.value);
            }} 
            ></textarea>

            <button 
            id="btn"
            onClick={()=>{
                if(todo.trim().length !== 0){
                dispatcher({type:"ADD",payload:todo});
                }
                
            }}
            >Add-Todo</button>
        </div>
        {todoList.map(list=>{
            return(
                <TodoList 
                key={list.id}
                list={list}
                updateTodo={updateTodo}
                dispatcher={dispatcher}
                />
            )
        })}
        </>
    )
}