import { useGetBannersQuery } from "@/features/api/bannerApiSlice";


export const fetchBanners = async () => {
    const { data:banners, isLoading, isError } = useGetBannersQuery();
    
}