import { IconArrowLeft } from "@tabler/icons-react"
import { useCallback } from "react"
import { useHistory } from "react-router"

interface Props {
    to?: string
}
const BackButton = ({ to }: Props) => {
    const history = useHistory()

    const handleClick = useCallback(() => {
        if(to) history.push(to)
        else history.goBack()
    }, [to, history])

    return <button onClick={handleClick}>
        <IconArrowLeft className='h-7 w-7'/>
    </button>
}

export default BackButton