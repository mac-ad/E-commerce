import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ColumnDef } from "@tanstack/react-table"

const TableDataSkeleton = ({dataOnly,columnCount,columns}: {dataOnly?: boolean,columnCount:number,columns:ColumnDef<any,any>[]}) => {
  return (
    <>
    {[...Array(10)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(columnCount)].map((_, j) => (
                    <TableCell key={j} >
                      <Skeleton className="h-6" />
                    </TableCell>
                  ))}
                </TableRow>
      ))}
    </>
    // <div>
    //   <div className="flex flex-col gap-2">
    //     {
    //       !dataOnly && (
    //         <div className="flex items-center gap-2">
    //           <Skeleton className="h-10 w-[300px]" />
    //           <Skeleton className="h-10 w-[100px] ml-auto" />
    //         </div>
    //       )
    //     }
    //     <div className={cn("rounded-md", !dataOnly ? "border" : "")}>
    //        <Table>
    //         <TableHeader>
    //           <TableRow>
    //             {[...Array(columnCount)].map((_, i) => (
    //               <TableHead key={i}>
    //                 <Skeleton className="h-6" />
    //               </TableHead>
    //             ))}
    //           </TableRow>
    //         </TableHeader> 
    //         <TableBody>
    //           {[...Array(10)].map((_, i) => (
    //             <TableRow key={i}>
    //               {[...Array(columnCount)].map((_, j) => (
    //                 <TableCell key={j} >
    //                   <Skeleton className="h-6" />
    //                 </TableCell>
    //               ))}
    //             </TableRow>
    //           ))}
    //         </TableBody> 
    //       </Table> 
    //     </div>
    //   </div>
    // </div>
  )
}

export default TableDataSkeleton
