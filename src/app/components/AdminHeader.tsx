import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"

const AdminHeader = ({title,description,buttonText,buttonAction,canAdd = true}:{title:string,description:string,buttonText?:string,buttonAction?:() => void,canAdd?:boolean}) => {
  return (
    <div className = "flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
        </div>
        <div>
            {canAdd && (
                <Button variant="default" onClick={buttonAction}>
                    <Icon icon="mdi:plus" className="w-4 h-4" />
                    <span>Add {buttonText}</span>
                </Button>
            )}
        </div>
    </div>
  )
}

export default AdminHeader
