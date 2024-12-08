import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
    border-redius:10px;
    padding:8px;
    color:#000;
    margin-bottom:8px;
    min-height:90px;
    margin
`;


const TextContent = styled.div``;

const Icons = styled.div`
    display:flex;
    justify-content:end;
    padding:2px;
`;

function bgColorChange(props){
    return props.isDragging 
    ? "lightgreen" 
    : props.isDraggable
    ? props.isBacklog
        ? "#F2D7D5"
        : "#DCDCDC"
    : props.isBacklog
    ? "#F2D7D5"
    : "#fffada";
}

const Task = ({task,index}) => {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>

        {(provided,snapshot)=>(
            <Container 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDraggable={snapshot.isDragging}
            >
                <div style={{display:"flex",justifyContent:"start",padding:2}}>
                    <span>
                        <small>
                            #{task.id}
                            {" "}
                        </small>
                    </span>
                </div>

                <div
                    style={{display:"flex",justifyContent:"center",padding:2}}
                >
                    <TextContent>{task.title}</TextContent>

                </div>

                <Icons>
                    <div>
                        <Avatar 
                            onClick={()=>console.log(task)}
                            src={"https://joesch.moe/api/v1/random?key=" + task.id}
                        />
                    </div>
                </Icons>
                {provided.placeholder}
            </Container>
        )}
    </Draggable>
  )
}

export default Task