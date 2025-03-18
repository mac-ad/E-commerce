import InputField from "@/app/components/InputField";
import { CreateOrderParams, useCreateOrderMutation } from "@/features/api/orderApiSlice";
import { useGetProfileQuery } from "@/features/api/userApiSlice";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";


const formSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.number().min(10, "Phone number must be at least 10 digits"),
    street: z.string().min(1, "street is required"),
    city: z.string().min(1, "City is required"),
    pincode: z.number().min(1, "Pin code is required"),
    state: z.string().min(1, "State is required"),
});

type FormValues = z.infer<typeof formSchema>;

const CheckoutForm = ({
    profile,
    afterOrderCreated,
    isLoading
}: {
    profile: any,
    afterOrderCreated: () => void,
    isLoading: boolean
}) => {
    const cartProducts = useSelector((store: RootState) => store.cart);

    const [createOrder, {isLoading:creatingOrder}] = useCreateOrderMutation();

    const {register, handleSubmit,formState:{errors}} = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          fullName: profile?.data?.fullName || "",
          email: profile?.data?.email || "",
          phone: undefined,
          street: "",
          city: "",
          pincode: undefined,
          state: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        console.log(data);
        const orderData:CreateOrderParams = {
            data: {
                items: cartProducts.items.map((item) => ({
                    productId: item.productId._id,
                    quantity: Number(item.qty),
                })),
                shippingAddress: {
                    street: data.street,
                    city: data.city,
                    state: data.state,
                    pincode: String(data.pincode),
                },
                phone: data.phone,
            }
        }
        console.log(orderData);

        try{
            const response = await createOrder(orderData).unwrap();
            console.log(response);
            toast.success("Order created successfully");
            afterOrderCreated();
        }catch(error){
            console.log(error);
            toast.error("Order creation failed");
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            
            <div className="space-y-4">
              <InputField
                label="Full Name"
                placeholder="Enter your full name"
                register={register}
                name="fullName"
                errors={errors}    
              />

              <InputField
                label="Email"
                type="email"
                placeholder="Enter your email"
                register={register}
                name="email"
                errors={errors}    

              />

              <InputField
                label="Phone"
                type="number"
                placeholder="Enter your phone number"
                register={register}
                name="phone"
                errors={errors}    
              />

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="City"
                        placeholder="Enter your city"
                        register={register}
                        name="city" 
                        errors={errors}    
                    />
                    <InputField
                        label="Street Address"
                        placeholder="Enter your street address"
                        register={register}
                        name="street"
                        errors={errors}    
                    />

                    <InputField
                        label="Pin Code"
                        placeholder="Enter your pin code" 
                        register={register}
                        name="pincode"
                        type="number"
                        errors={errors}    
                    />

                    <InputField
                        label="State"
                        placeholder="Enter your state"
                        register={register}
                        name="state"
                        errors={errors}    
                    />
             </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#0171b6] text-white py-3 px-4 rounded-md hover:bg-[#015da1] transition-colors"
              disabled={isLoading || creatingOrder}
            >
              {isLoading || creatingOrder ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Placing Order...
                </div>
              ) : "Place Order"}
            </button>
          </form>
  )
}

export default CheckoutForm
