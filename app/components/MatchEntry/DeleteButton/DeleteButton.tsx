"use client";
import { deleteMatch } from "@/app/lib/actions";
import styles from "./DeleteButton.module.css";
import { useState } from "react";

const DeleteButton = ({ matchId }: { matchId: number }) => {
  const [confirming, setConfirming] = useState(false);

  const handleConfirmClick = () => {
    deleteMatch(matchId);
    setConfirming(false);
  };

  return (
    <div className={styles.container}>
      {confirming && (
        <div className={styles.confirmationDiv}>
          <p> Are you sure you want to delete this match?</p>
          <button className={styles.deleteButton} onClick={handleConfirmClick}>
            Yes
          </button>
          {/* <button className={styles.cancelButton} onClick={() => setConfirming(false)}>No</button> */}
        </div>
      )}
      <button
        className={styles.deleteButton}
        onClick={() => setConfirming(!confirming)}
      >
        {confirming ? "No" : "DEL"}
      </button>
    </div>
  );
};

export default DeleteButton;

