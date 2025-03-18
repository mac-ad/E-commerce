import { Icon } from "@iconify/react/dist/iconify.js"

const Loading = ({
    type="inline"
}: {
    type?: "inline" | "fullscreen"
}) => {
  return (
    <div className = "min-h-[50vh] flex justify-center items-center">
        <Icon icon="mdi:loading" className={` ${type === "inline" ? "text-4xl" : "text-7xl"} animate-spin`} />
    </div>
  )
}

export default Loading
