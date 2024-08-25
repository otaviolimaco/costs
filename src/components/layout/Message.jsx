import { useState, useEffect } from "react"
import styles from "./Message.module.css"
import { MdOutlinePrecisionManufacturing } from "react-icons/md"

function Message({type, msg, setMsg}) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(!msg){
            setVisible(false)
            setMsg('');
            return
        }
        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
            setMsg('')
        }, 3000)

        return () => clearTimeout(timer)

    }, [msg])

    return (
        <>
        {visible && (
            <div className={`${styles.message} ${styles[type]}`}>
                <p>{msg}</p>
            </div>
        )}
        </>
    )
}

export default Message