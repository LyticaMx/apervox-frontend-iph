import { useCase } from "@/context/Case"
import { IconFolder, IconInfoCircle } from "@tabler/icons-react"


const CaseDescription = () => {
	const { case: data } = useCase()

	return (<div className="space-y-3">
		<div className="flex items-center text-sm gap-3">
				<IconInfoCircle className="w-5 h-5"/>
				<span>{data?.notification.title}</span>
			</div>
			<div className="flex items-center text-sm gap-3">
				<IconFolder className="w-5 h-5" />
				<span>{data?.folio}</span>
			</div>
    </div>)
}

export default CaseDescription