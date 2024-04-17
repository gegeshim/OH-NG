import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Progress } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../Explorer/Explorer.module.css';
import { requestApi } from 'services/axios';
import DragDropZone from 'container/components/DragDropFile/DragDropZone';
import UploadModal from 'container/components/UploadModal/UploadModal';
import ExplorerItemList2 from 'container/components/ExplorerItemList/ExplorerItemList2';
import {
  getFilesInfo,
  getFileName,
  getFileExtension,
  getFileHash,
} from 'utils/upload';
import {
  setViewMode,
  setOptionPanelOpen,
  setCheckedAllItems,
  setClearCheckedItems,
} from '../../../redux/slices/explorerSlice';
import SelectBox from 'container/components/Selectbox/Selectbox';
import OptionPanel from 'container/components/OptionPanel/OptionPanel';
import BreadCrumb from 'container/components/BreadCrumb/BreadCrumb';

export default function Explorer() {
  const { t, i18n } = useTranslation();
  // const language = useSelector((state) => state.language);

  const fileRef = useRef(null);
  const folderRef = useRef(null);
  const uploadButtonRef = useRef(null);
  const [clickUploader, setClickUploader] = useState(false);
  const dispatch = useDispatch();

  // 탐색기 보기 모드 (현재 상태)
  const viewMode = useSelector((state) => state.explorer.viewMode);

  // 우측 패널 열기/닫기 선택
  const optionPanelOpen = useSelector(
    (state) => state.explorer.optionPanelOpen
  );
  const handleOptionPanel = () => {
    dispatch(setOptionPanelOpen(!optionPanelOpen));
  };

  useEffect(() => {
    // upload button 영역 벗어나면 닫기
    const clickOutside = (e) => {
      if (
        uploadButtonRef.current &&
        !uploadButtonRef.current.contains(e.target)
      ) {
        setClickUploader(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);
  const handleTrigger = (inputRef) => {
    inputRef.current.click();
  };

  // 업로드 파일 리스트 정보 저장
  const [fileList, setFileList] = useState([]);

  // 사용자가 파일을 선택하여 input[type="file"]에 데이터가 추가됐을 때의 동작
  const readFileList = (e) => {
    const files = getFilesInfo(e);
    console.log('file :::: ', files);
    const fileDatasets = [];
    for (const file of files) {
      const fileDataset = {
        // user_name: 'jiran',
        file_name: getFileName(file.name),
        size: file.size,
        type: getFileExtension(file.name),
        current_path: '/', // 현재 작업 디렉토리
        // file_path: file.webkitRelativePath, // 파일의 실제 경로
        file_path: '/', // 파일의 실제 경로
        status: 'pending', // 진행전: pending, 진행중: processing, 완료: finished
        progress: {
          currentChunk: 0,
          totalChunk: 0,
        },
        realFile: file,
      };
      fileDatasets.push(fileDataset);
    }
    setFileList((prevFile) => [...prevFile, ...fileDatasets]);
  };

  // 사용자가 <업로드>버튼을 클릭하여 서버로 데이터를 전송할 때의 동작
  const startFileUpload = async () => {
    /*
    ☆파일 하나씩 실행☆
    1. hash 생성 -> hash 추가되고 status: processing으로 변경됨
    2. api로 meta data 보내기
    3. success 응답 받기
    4. chunk 갯수 계산
    5. api 업로드 요청
    6. 완료시 다음 파일 1~3 반복!
     */
    for (const item of fileList) {
      if (item.status === 'pending') {
        console.log(`${item.file_name} start!`);
        // 1. file마다 hash값 생성하고 status 변경하기
        const hash = await getFileHash(item.realFile);
        const readyToUploadData = {
          file_name: item.file_name,
          type: item.type,
          current_path: item.current_path,
          file_path: item.file_path,
          size: item.size,
          hash: hash,
        };

        // chunk시 필요한 변수 모음
        let fileSize = item.size; // 파일의 크기
        let start = 0; // 청크의 시작 지점 (0~)
        let end = 0; // 청크의 끝 지점 (~1000)
        let total = 0; // 청크의 끝과 시작 지점의 사이
        let CHUNK_SIZE = 0; // /api/upload/ready에서 응답받은 결과에 따라 달라짐.
        let offset = 0;
        // const chunks = [];

        // chunk processbar에 필요한 값 모음
        let currentChunk = 0;
        let totalChunk = 0;

        // header에 보내야 하는 값 모음
        let X_Content_Id = ''; // 업로드 할 파일 id (file_id)
        let X_Content_Range = ''; //bytes {start}-{start+end-1}/{total} 형식
        let X_Content_Complete = false; // 마지막 upload 체크: True

        await requestApi('post', '/api/upload/ready', readyToUploadData)
          .then(async (ready_res) => {
            console.log('/api/upload/ready res : ', ready_res);

            setFileList((prevFileList) => {
              // hash가 생성되면 status를 processing으로 바꿈
              return prevFileList.map((obj) => {
                if (obj.file_name === item.file_name) {
                  return {
                    ...obj,
                    status: 'processing',
                    hash: hash,
                  };
                }
                return obj;
              });
            });

            X_Content_Id = ready_res.file_id;
            CHUNK_SIZE = ready_res.chunk_size;
            offset = ready_res.offset;
            totalChunk = Math.ceil(fileSize / CHUNK_SIZE);

            while (offset < fileSize) {
              end = Math.min(offset + CHUNK_SIZE, fileSize);
              const chunk = item.realFile.slice(offset, end);
              start = offset;
              total = end - start;
              X_Content_Range = `bytes ${start}-${start + total - 1}/${total}`;

              const headerData = {
                'X-Content-Id': X_Content_Id,
                'X-Content-Range': X_Content_Range,
              };

              try {
                await requestApi(
                  'post',
                  '/api/upload/chunk',
                  chunk,
                  headerData
                );
                currentChunk++;
                // eslint-disable-next-line no-loop-func
                setFileList((prevFileList) => {
                  return prevFileList.map((obj) => {
                    if (obj.file_name === item.file_name) {
                      return {
                        ...obj,
                        status: 'processing',
                        progress: {
                          currentChunk: currentChunk,
                          totalChunk: totalChunk,
                        },
                      };
                    }
                    return obj;
                  });
                });
              } catch (error) {
                console.log(
                  '/api/upload/chunk occured Error :: ',
                  error.response.data.message
                );
                break;
              }
              offset = end;
            }
            setFileList((prevFileList) => {
              return prevFileList.map((obj) => {
                if (obj.file_name === item.file_name) {
                  return {
                    ...obj,
                    status: 'finished',
                  };
                }
                return obj;
              });
            });
          })
          .catch((error) => {
            console.log(
              '/api/upload/ready occured Error :: ',
              error.response.data.message
            );
          });
        console.log(`${item.file_name} is finished!`);
      }
    }
  };

  // 업로드 대기 모달에 있는 item 삭제
  const deleteUploaderFile = (itemName) => {
    const newFileList = fileList.filter((item) => item.file_name !== itemName);
    setFileList(newFileList);
  };

  // 정렬
  const options = [
    { selected_text: 'create', selected_value: '최신순' },
    { value: 'name', label: '이름순' },
    { value: 'size', label: '크기순' },
  ];
  const handleSorting = () => {
    console.log('여기에 sort 코드 작성하면 됨.');
  };

  const itemList = useSelector((state) => state.explorer.currentFolderDataList);
  const [isCheckedAllItems, setIsCheckedAllItems] = useState(false);
  const checkedItems = useSelector((state) => state.explorer.checkedItems);
  // 모든 checkbox 클릭
  const handleCheckAllItems = () => {
    setIsCheckedAllItems(!isCheckedAllItems);
    const allItems = itemList.map((it) => it.id);
    if (!isCheckedAllItems) {
      dispatch(setCheckedAllItems(allItems));
    } else {
      dispatch(setClearCheckedItems());
    }
  };

  useEffect(() => {
    console.log('checkedItem :: ', checkedItems);
    setIsCheckedAllItems(checkedItems.length === itemList.length);
  }, [checkedItems, itemList]);
  return (
    <div className={styles.explorer}>
      <div className={`${styles.explorerHeader} contentsHeader`}>
        <BreadCrumb></BreadCrumb>
        <input
          type="file"
          ref={fileRef}
          hidden
          multiple
          onChange={(e) => readFileList(e)}
        />
        <input
          type="file"
          ref={folderRef}
          hidden
          multiple
          webkitdirectory="webkitdirectory"
          directory="directory"
          onChange={(e) => readFileList(e)}
        />
        <div className={styles.buttonWrap}>
          <div className={styles.leftButtons}>
            <div className="checkbox large">
              <input
                type="checkbox"
                id="CheckedAll"
                checked={isCheckedAllItems}
                onChange={handleCheckAllItems}
              />
              <label htmlFor="CheckedAll"></label>
            </div>
            <div className={styles.uploadButtons}>
              <div className={styles.buttonHover}>
                <button
                  className={styles.upload}
                  type="button"
                  onClick={() => setClickUploader(!clickUploader)}
                >
                  {t('업로드')}
                </button>
              </div>

              {clickUploader && (
                <div ref={uploadButtonRef}>
                  <button type="button" onClick={() => handleTrigger(fileRef)}>
                    {t('파일')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTrigger(folderRef)}
                  >
                    {t('폴더')}
                  </button>
                </div>
              )}
            </div>
            <div className={styles.buttonHover}>
              <button type="button" className={styles.download}>
                다운로드
              </button>
            </div>
            <div className={styles.buttonHover}>
              <button type="button" className={styles.newFolder}>
                새 폴더
              </button>
            </div>
            <div className={styles.buttonHover}>
              <button type="button" className={styles.trash}>
                휴지통
              </button>
            </div>
            <div className={styles.buttonHover}>
              <button type="button" className={styles.more}>
                더보기
              </button>
            </div>
          </div>
          <div className={styles.rightButtons}>
            <div className={styles.selectWrap}>
              <SelectBox
                defaultText="이름"
                optionEvent={() => console.log('옵션 이벤트~')}
                dataset={[
                  { selected_text: '이름', selected_value: 'name' },
                  { selected_text: '크기', selected_value: 'size' },
                ]}
              />
              {/* <SelectBox
                defaultText="오름차순"
                optionEvent={() => console.log('옵션 이벤트~')}
                dataset={[
                  { selected_text: '오름차순', selected_value: 'ascending' },
                  { selected_text: '내림차순', selected_value: 'descending' },
                ]}
              /> */}
            </div>
            <div className={styles.viewModeButtons}>
              <div className={styles.buttonHover}>
                <button
                  className={`${styles.iconView} ${
                    viewMode === 'icon' ? styles['active'] : ''
                  }`}
                  type="button"
                  onClick={() => dispatch(setViewMode('icon'))}
                >
                  icon
                </button>
              </div>
              <div className={styles.buttonHover}>
                <button
                  className={`${styles.listView} ${
                    viewMode === 'list' ? styles['active'] : ''
                  }`}
                  type="button"
                  onClick={() => dispatch(setViewMode('list'))}
                >
                  list
                </button>
              </div>
            </div>
            <div className={styles.buttonHover}>
              <button
                type="button"
                className={`${styles.infoButton} ${
                  optionPanelOpen ? styles['active'] : ''
                }`}
                onClick={handleOptionPanel}
              >
                info
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.explorerContent}>
        <div
          className={`${styles.dropzoneWrap} ${
            !optionPanelOpen ? styles['fullSize'] : ''
          }`}
        >
          <div className={styles.dropzone}>
            <DragDropZone setFileData={setFileList}>
              <ExplorerItemList2 />
            </DragDropZone>
          </div>
        </div>
        {optionPanelOpen && (
          <div className={styles.panelWrap}>
            <OptionPanel handleClose={handleOptionPanel} />
          </div>
        )}
      </div>
      {fileList.length > 0 && (
        <UploadModal uploadHandler={() => startFileUpload()}>
          <ul>
            {fileList.map((item, idx) => {
              if (!item) return null;
              return (
                <li key={`${item}_${idx}`}>
                  <div className={styles.modal_item_top}>
                    <p>{item.file_name}</p>
                    <button
                      type="button"
                      onClick={() => deleteUploaderFile(item.file_name)}
                    >
                      x
                    </button>
                  </div>
                  <Progress
                    percent={
                      (item.progress.currentChunk / item.progress.totalChunk) *
                      100
                    }
                    strokeColor="rgb(73 144 255)"
                    trailColor="#ddd"
                    showInfo={false}
                  />
                </li>
              );
            })}
          </ul>
        </UploadModal>
      )}
    </div>
  );
}
