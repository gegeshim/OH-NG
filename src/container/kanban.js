import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const initialTasks = {
  todo: [
    { id: 'task-1', content: 'Task 1' },
    { id: 'task-2', content: 'Task 2' },
    { id: 'task-3', content: 'Task 3' },
  ],
  inProgress: [
    { id: 'task-4', content: 'Task 4' },
    { id: 'task-5', content: 'Task 5' },
  ],
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // 드롭이 취소된 경우
    }

    const { source, destination } = result;

    // 같은 열에서 이동한 경우
    if (source.droppableId === destination.droppableId) {
      const newTasks = { ...tasks };
      const column = [...newTasks[source.droppableId]];
      const [removed] = column.splice(source.index, 1);
      column.splice(destination.index, 0, removed);
      newTasks[source.droppableId] = column;
      setTasks(newTasks);
    } else {
      // 다른 열로 이동한 경우
      const sourceColumn = [...tasks[source.droppableId]];
      const destinationColumn = [...tasks[destination.droppableId]];
      const [removed] = sourceColumn.splice(source.index, 1);
      destinationColumn.splice(destination.index, 0, removed);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destinationColumn,
      });
    }
  };

  useEffect(() => {
    console.log('tasks :: ', tasks);

    Object.keys(tasks).map((columnId) =>
      console.log('tasks[columnId] ', tasks[columnId])
    );
  }, [tasks]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex' }}>
        {Object.keys(tasks).map((columnId) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  flex: 1,
                  padding: 16,
                  margin: 8,
                  minHeight: 200,
                  backgroundColor: 'lightgrey',
                }}
              >
                <h2>{columnId}</h2>
                {tasks[columnId].map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: 16,
                          margin: '0 0 8px 0',
                          backgroundColor: 'white',
                          borderRadius: 4,
                          ...provided.draggableProps.style,
                        }}
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
