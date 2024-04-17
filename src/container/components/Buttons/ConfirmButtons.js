import styles from './ConfirmButtons.module.css';

export default function ConfirmButtons({ setClose, setConfirm }) {
  return (
    <div className={styles.ConfirmButtonsWrap}>
      <button type="button" onClick={setClose}>
        취소
      </button>
      <button type="button" onClick={setConfirm}>
        확인
      </button>
    </div>
  );
}
