/**
 * Creates a debounced version of a function that delays its execution
 * until after a specified wait time has elapsed since the last time it was invoked
 * 
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced version of the input function
 */
export const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

export const getCurrency = (value:number) => {
  return value?.toLocaleString("en-IN",{
    style: "currency",
    currency: "NPR", 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  })
}

export const getDiscountedPrice = ({
  originalPrice,
  discount
}:{
  originalPrice:number;
  discount:number;
}) => {
  const discountAmount = Number((discount / 100) * originalPrice);
  return originalPrice - discountAmount;
}

export const getDiscountAmount = ({
  originalPrice,
  discount
}:{
  originalPrice:number;
  discount:number;
}) => {
  return Number((discount / 100) * originalPrice);
}

export const getDate = (value:string) => {
  const date = new Date(value);

  const dateFormat = {
    year:'numeric',
    month : 'long',
    day : 'numeric'
  };

  return date?.toLocaleDateString('en-US',dateFormat as any)
}

export const getFullUrl = (url:string) => {
  return `${process.env.NEXT_PUBLIC_HOST_DOMAIN}/${url}`
}