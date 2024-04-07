'use client';
import { deleteMatch } from '@/app/lib/actions';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ matchId }: { matchId: number }) => {

  return (
    <button className={styles.deleteButton} onClick={() => deleteMatch(matchId)}>DEL</button>
  )
}

export default DeleteButton;