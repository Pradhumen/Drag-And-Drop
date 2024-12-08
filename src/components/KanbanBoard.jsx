import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column';

const KanbanBoard = () => {

    const [complited,setComplited] = useState();
    const [incomplite,setIncomplite] = useState();


    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response)=> response.json())
        .then((json)=>{
            setComplited(json.filter((task)=>task.complited));
            setIncomplite(json.filter((task)=>task.incomplite));
        });
    },[]);

    const handleDragEnd = () => {
        const {destination,source,draggableId} = result;

        if(source.droppableId == destination.droppableId) return;

        // Remove item from source array
        if(source.droppableId == 2){
            setComplited(removeItemById(draggableId,complited));
        }else{
            setIncomplite(removeItemById(draggableId,incomplite));
        }

        // Get the item
        const task = findItemById(draggableId,[...incomplite,complited]);

        //Add Item
        if(destination.droppableId == 2){
            setComplited([{...task,complited:!task.complited},...complited]);
        }else{
            setIncomplite([{...task,complited:!task.complited}, ...incomplite]);
        }

    }


    function findItemById(id,array){
        return array.find((item)=>item.id == id);
    }

    function removeItemById(){
        return array.filter((item)=>item.id != id);
    }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
        <h2 style={{textAlign:'center'}}>Progress Board</h2>

        <div 
            style={{
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center',
                flexDirection:'row'
            }}
        >
            <Column title={"TO DO"} tasks={incomplite} id={"1"}></Column>
            <Column title={"DONE"} tasks={complited} id={"2"}></Column>
            <Column title={"BACKLOG"} tasks={[]} id={"3"}></Column>
        </div>
    </DragDropContext>
  )
}

export default KanbanBoard