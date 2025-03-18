import ProtectedLayout from "@/app/layout/ProtectedLayout";
import Login from "./Login";

export default function LoginPage() {
 
  return(
     <ProtectedLayout>  <Login /> </ProtectedLayout>
  )
}
