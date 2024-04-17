import { createSlice } from '@reduxjs/toolkit';
// 웹탐색기 상태 관리 리듀서

const initialState = {
  treeList: [],
  viewMode: 'icon',
  optionPanelOpen: true,
  folderOptions: {
    newfolder: true,
    download: true,
    upload: true,
    property: true,
  },
  currentFolderPath: '/',
  currentFolderDataList: [],
  checkedItems: [],
  selectedFile: '',
};

const explorerSlice = createSlice({
  name: 'explorer',
  initialState,
  reducers: {
    setTreeList(state, action) {
      // 탐색기 좌측 tree 메뉴
      state.treeList = action.payload;
    },
    setViewMode(state, action) {
      // 탐색기 모드 (리스트/아이콘)
      state.viewMode = action.payload;
    },
    setOptionPanelOpen(state, action) {
      // 아이템의 정보를 보여주는 우측 패널 열기/닫기
      state.optionPanelOpen = action.payload;
    },
    setFolderOptions(state, action) {
      // 사용자 권한에 따라 보여지는 폴더 옵션
      const { option, value } = action.payload;
      state.folderOptions[option] = value;
    },
    setCurrentFolderPath(state, action) {
      // 현재 사용자가 있는 폴더 경로
      state.currentFolderPath = action.payload;
    },
    /* 데이터 목록 관리 */
    setCurrentFolderDataList(state, action) {
      // 현재 사용자가 있는 폴더의 데이터 목록
      state.currentFolderDataList = action.payload;
    },
    setAddNewForder(state, action) {
      // 새폴더 추가하기
      const newFolder = action.payload;
      state.currentFolderDataList.push(newFolder);
    },
    setRemoveItem(state, action) {
      // 폴더 내 아이템 삭제하기
      const itemId = action.payload;
      state.currentFolderDataList = state.currentFolderDataList.filter(
        (item) => item.id !== itemId
      );
    },
    setUpdateName(state, action) {
      // 이름 변경하기
    },
    /* checkbox 관리*/
    setAddCheckedItem(state, action) {
      // checked된 아이템 추가
      const newItemId = action.payload;
      if (!state.checkedItems.includes(newItemId)) {
        state.checkedItems.push(newItemId);
      }
    },
    setCheckedAllItems(state, action) {
      // 모든 아이템 checked
      const allItemIds = action.payload;
      state.checkedItems = [...allItemIds];
    },
    setRemoveCheckedItem(state, action) {
      // checked된 아이템 해제
      const removedItem = action.payload;
      state.checkedItems = state.checkedItems.filter(
        (id) => id !== removedItem
      );
    },
    setClearCheckedItems(state) {
      // 모든 아이템 checked 해제
      state.checkedItems = [];
    },
    setSelectedFile(state, action) {
      // 현재 선택된 파일의 속성
      state.selectedFile = action.payload;
    },
  },
});

export const {
  setTreeList,
  setViewMode,
  setOptionPanelOpen,
  setFolderOptions,
  setCurrentFolderPath,
  setCurrentFolderDataList,
  setAddNewForder,
  setRemoveItem,
  setAddCheckedItem,
  setCheckedAllItems,
  setRemoveCheckedItem,
  setClearCheckedItems,
} = explorerSlice.actions;

export default explorerSlice.reducer;
