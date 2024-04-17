import CryptoJS from 'crypto-js';

// 파일명 추출
export function getFileName(fileFullName) {
  // const parts = fileFullName.split('.');
  // const fileName = parts[0];
  return fileFullName;
}

// 파일 확장자 추출
export function getFileExtension(fileType) {
  const parts = fileType.split('.');
  const fileExtension = parts[1];
  return '.' + fileExtension;
}

// 파일 해시 생성하기
export function getFileHash(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;
      const hash = CryptoJS.SHA256(fileContent).toString(CryptoJS.enc.Hex);

      resolve(hash);
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsBinaryString(file);
  });
}

// 선택한 폴더의 하위 파일 정보 가져오기 & 다중 파일 정보 가져오기
export function getFilesInfo(e) {
  const files = e.target.files;
  const folders = [];
  const filesInFolders = [];

  for (const file of files) {
    if (file.webkitRelativePath) {
      const parts = file.webkitRelativePath.split('/');
      if (parts.length > 1) {
        const folderName = parts[0];
        if (!folders.includes(folderName)) {
          folders.push(folderName);
        }
        filesInFolders.push('1. file ::: ', file);
      }
    }
  }
  return files;
}
