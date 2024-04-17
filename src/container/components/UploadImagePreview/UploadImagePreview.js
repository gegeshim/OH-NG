import React, { useState, useRef } from 'react';
import styles from './UploadImagePreview.module.css';

export default function UploadImagePreview() {
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();

  const saveImageFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    if (imgRef.current.files.length > 0) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  return (
    <form className={styles.UploadImagePreview}>
      <label htmlFor="uploadImage">
        <div className={styles.previewImage_area}>
          {imgFile && <img src={imgFile} alt="이미지" />}
        </div>
        <p className={styles.preview_txt}>이미지 추가</p>
      </label>
      <input
        ref={imgRef}
        type="file"
        accept="image/*"
        id="uploadImage"
        style={{ display: 'none' }}
        onChange={saveImageFile}
      />
    </form>
  );
}
