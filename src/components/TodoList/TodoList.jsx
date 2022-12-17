import React, { useState } from "react";
import "./todoList.css";

export default function TodoList({list,dispatcher}){

    const[todoElm,setTodoElm]= useState(list.data);


     function updateTodoElm(value){
        setTodoElm(value);
    }

    return <div className="cardBackground">
     <div className="list">
        {list.isEdit ?
        <>
        <textarea 
        value={todoElm}
        className="editTask"
        onChange={e=>{
            updateTodoElm(e.target.value);
        }}
        ></textarea>

        <button 
        className="saveTask"
        disabled={todoElm.trim().length === 0 ? true:false}
        onClick={()=>{if(todoElm.trim().length !== 0){
            dispatcher({type:"SAVE",payload:{id:list.id,data:todoElm,isEdit:false}})
        } }}
        >Save</button>
        </> 
        :
        <ul>
            <li>{todoElm}</li>
            <div className="btn-container">
            <button 
            className="edit"
            onClick={()=>dispatcher({type:"EDIT",payload:{id:list.id,isEdit:true}})}
            >Edit</button>

            <button
            className="delete"
            onClick={()=>dispatcher({type:"DELETE",payload:{id:list.id}})}
            >Delete</button>

            </div>
        </ul>}

    </div>
    </div>
}