import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const NavSkeleton = ({className}: {className?: string}) => {
  return (
      <div className = "w-[90%] mx-auto h-[40px] flex flex-nowrap overflow-x-auto items-center justify-start gap-2 no-scrollbar">
          {
            Array.from({length: 10}).map((_, index) => (
              <Skeleton key={index} className = {cn("min-w-[70px] h-[30px] rounded-none", className)} />
            ))
          }
      </div>
  )
}

export default NavSkeleton
