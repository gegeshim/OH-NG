// 리스트 순서 dnd

import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styles from '../OrderDnd/OrderDnd.module.css';

const orderData = [
  { id: 'data1', content: '이것은 1번 데이터', order: 0 },
  { id: 'data2', content: '이것은 2번 데이터', order: 0 },
  { id: 'data3', content: '이것은 3번 데이터', order: 0 },
  { id: 'data4', content: '이것은 4번 데이터', order: 0 },
];
export default function OrderDnd() {
  const [dataState, setDataState] = useState(orderData);
  const [draggingItemId, setDraggingItemId] = useState(null);

  //  Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    // 얕은 복사 (-> 깊은 복사로 바꿔야할지도..)
    const newOrder = [...dataState];
    // 기존 아이템 뽑아내기
    const [targetItem] = newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, targetItem);

    // 아이템 순서 업데이트
    newOrder.forEach((item, index) => {
      item.order = index;
    });

    setDataState(newOrder);
    setDraggingItemId(null);
  };
  useEffect(() => {
    // console.log(dataState);
  }, [dataState]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
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
            <h2 style={{ margin: '0 0 10px 0' }}>순서 변경 고</h2>
            {dataState.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
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
                      // border: snapshot.isDragging ? '2px solid blue' : 'none',
                      ...provided.draggableProps.style,
                    }}
                  >
                    <span>{index + 1}</span> <span>{item.content}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
