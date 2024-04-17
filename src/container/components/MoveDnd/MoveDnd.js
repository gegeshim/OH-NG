// a섹션 -> b섹션 이동 dnd

import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styles from '../MoveDnd/MoveDnd.module.css';

export default function MoveDnd({ data }) {
  const [dataState, setDataState] = useState(data);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return; // 드롭이 취소된 경우
    }
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // 같은 열에서 이동한 경우
      const newOrder = { ...dataState };
      const column = [...newOrder[source.droppableId]];
      const [targetItem] = column.splice(source.index, 1);
      column.splice(destination.index, 0, targetItem);
      newOrder[source.droppableId] = column;

      setDataState(newOrder);
    } else {
      // 다른 열로 이동하는 경우
      const sourceColumn = [...dataState[source.droppableId]];
      const destinationColumn = [...dataState[destination.droppableId]];
      const [targetItem] = sourceColumn.splice(source.index, 1);
      destinationColumn.splice(destination.index, 0, targetItem);

      setDataState({
        ...dataState,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destinationColumn,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex' }}>
        {Object.keys(dataState).map((columnId) => (
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
                {/* <h2>{columnId}</h2> */}
                {dataState[columnId].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        className={styles.item}
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
                        <span>{index + 1}</span> {item.content}
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
}
