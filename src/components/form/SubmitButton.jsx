import styles from './SubmitButton.module.css'
import { useState } from 'react'

function SubmitButton({ text }) {

    return <button className={styles.btn}>{text}</button>
}

export default SubmitButton