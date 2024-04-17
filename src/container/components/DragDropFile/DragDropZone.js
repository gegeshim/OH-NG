import React, { useEffect, useState, useRef } from 'react';

import styles from './DragDropZone.module.css';
import { getFileExtension, getFileName } from '../../../utils/upload';

export default function DragDropZone({ setFileData, children }) {
  const dropBoxRef = useRef();
  const [isDragOver, setIsDragOver] = useState(false);

  // dropBoxRef영역에 처음 드래그된 상태
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
    console.log('enter');
  };
  // dropBoxRef영역에서 벗어난 상태
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };
  // dropBoxRef영역에 드래그 중인 상태
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // label의 htmlFor 변경
  const [inputId, setInputId] = useState(null);

  // dropBoxRef영역에 드래그한 객체를 놓은 상태
  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropFiles = e.dataTransfer.files;
    const dropItems = e.dataTransfer.items;

    const filePromises = [];

    for (let i = 0; i < dropItems.length; i++) {
      const item = dropItems[i].webkitGetAsEntry();
      if (item.isFile) {
        setInputId('fileUpload');
        const filePromise = getFileData(dropFiles[i]);
        filePromises.push(filePromise);
      } else if (item.isDirectory) {
        setInputId('folderUpload');
        try {
          const fileList = await getFolderContents(item);
          fileList.map((it) => {
            const filePromise = getFileData(it.file, it.path);
            filePromises.push(filePromise);
          });
        } catch (error) {
          console.error('Error processing folder:', error);
        }
      }
    }

    try {
      const filesData = await Promise.all(filePromises);
      setFileData((prevFile) => [...prevFile, ...filesData]);
    } catch (error) {
      console.log('Error handling drop:', error);
    }
    dropBoxRef.current.style.border = '#fff';
  };

  async function getFileData(file, entry = null) {
    // const hash = await getFileHash(file);
    return {
      // user_name: 'jiran',
      file_name: getFileName(file.name),
      size: file.size,
      type: getFileExtension(file.name),
      current_path: '/', // 현재 작업 디렉토리
      // file_path: entry, // 파일의 실제 경로
      file_path: '/', // 파일의 실제 경로
      status: 'pending', // 진행전: pending, 진행중: processing, 완료: finished
      progress: {
        currentChunk: 0,
        totalChunk: 0,
      },
      realFile: file,
    };
  }

  // 폴더 내부 컨텐츠 가져오기
  // const getFolderContents = (directoryEntry) => {
  //   const directoryReader = directoryEntry.createReader();
  //   directoryReader.readEntries(function (entries) {
  //     for (let i = 0; i < entries.length; i++) {
  //       const entry = entries[i];
  //       if (entry.isFile) {
  //         const file = entry;
  //         // 업로드한 폴더안에 하위 파일
  //         // 파일 정보에 접근하기
  //         file.file(function (file) {
  //           getFileHash(file, entry.fullPath, setFileData);
  //         });
  //       } else if (entry.isDirectory) {
  //         // 폴더의 내용을 가져오기 위해 재귀적으로 함수 호출
  //         getFolderContents(entry);
  //       }
  //     }
  //   });
  // };

  //

  // 폴더 내부 컨텐츠 가져오기
  /*
    추가해야 할 기능 :
    1. 폴더 내부 컨텐츠를 꺼내서 보여주고 있는데, 업로드한 폴더만 ui로 보여줘야 함.
    2. 폴더 내부 컨텐츠를 업로드할 때, progress bar를 업로드된 파일 / 폴더 내 전체 파일의 갯수로 계산해야 함.
  */
  const getFolderContents = (directoryEntry) => {
    return new Promise((resolve, reject) => {
      const directoryReader = directoryEntry.createReader();
      directoryReader.readEntries(function (entries) {
        const fileList = [];

        const processEntry = async (entry) => {
          if (entry.isFile) {
            const file = entry;
            // 파일 정보에 접근하기
            const fileObject = await getFileObject(file);
            fileList.push({
              file: fileObject,
              path: entry.fullPath,
            });
          } else if (entry.isDirectory) {
            // 폴더의 내용을 가져오기 위해 재귀적으로 함수 호출
            const nestedFiles = await getFolderContents(entry);
            fileList.push(...nestedFiles);
          }
        };

        const processEntries = async () => {
          for (let i = 0; i < entries.length; i++) {
            await processEntry(entries[i]);
          }
        };

        processEntries()
          .then(() => resolve(fileList))
          .catch((error) => reject(error));
      });
    });
  };

  const getFileObject = (file) => {
    return new Promise((resolve, reject) => {
      file.file(
        (file) => {
          resolve(file);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  return (
    <>
      <div
        htmlFor={inputId}
        ref={dropBoxRef}
        className={styles.uploadTarget}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {children}
        {isDragOver && (
          <div className={styles.dragMessage}>이곳에 파일을 놓으세요.</div>
        )}
      </div>
      <input
        type="file"
        id="fileUpload"
        multiple
        hidden
        onChange={(e) => console.log('e.target.files :: ', e.target.files)}
      />
      <input
        type="file"
        id="folderUpload"
        multiple
        webkitdirectory="webkitdirectory"
        directory="directory"
        hidden
        onChange={(e) =>
          console.log('e.dataTransfer.files :: ', e.dataTransfer.files)
        }
      />
    </>
  );
}
