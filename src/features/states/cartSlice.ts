import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../api/productApiSlice";
import { toast } from "sonner";
import { CartItem } from "../api/cartApiSlice";


interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  isLoading: boolean;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isLoading: false
};

export const cartInitialState = initialState;

// const initialState: CartState = {
//     items: [
//         {
//             "_id": "67d485b49921162e6751e690",
//             "name": "Phone (3a) - 8GB RAM & 128GB Storage | Black Color",
//             "brand": {
//                 "_id": "67d046f44d10b0cfb66da28f",
//                 "name": "Nothing"
//             },
//             "discount": 40,
//             "price": 55000,
//             "quantity": 501,
//             "description": "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Nothing Phone 3a – A Seamless Blend of Innovation & Minimalism\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"The \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Nothing Phone 3a\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\" redefines smartphone design with its signature transparent aesthetics and cutting-edge technology. Featuring a \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"vivid OLED display\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\", a \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"powerful Snapdragon processor\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\", and an \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"ultra-smooth 120Hz refresh rate\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\", this device delivers a premium user experience. The \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Glyph Interface\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\" adds a unique touch, offering customizable LED notifications for seamless interactions. With an advanced \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"dual-camera system\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\", long-lasting \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"fast-charging battery\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\", and a clean, bloat-free \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Nothing OS\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\", the \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Phone 3a\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\" is built for those who appreciate simplicity without compromise. Experience the future of smartphones—designed to stand out.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"},{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"},{\"children\":[{\"children\":[{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":3,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Specification\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":1,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Body\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"163.5 x 77.5 x 8.4 mm (6.44 x 3.05 x 0.33 in), 201 g (7.09 oz), Nano-SIM + Nano-SIM, IP64 dust and water resistant, 3 LED light strips\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Display\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"AMOLED, 1B colors, 120Hz, HDR10+, 800 nits (typ), 1300 nits (HBM), 3000 nits (peak), 6.77 inches, 1080 x 2392 pixels, Panda Glass\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Platform\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Android 15, Nothing OS 3.1, Snapdragon 7s Gen 3 (4 nm), Octa-core CPU, Adreno 710 GPU\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Memory\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"No card slot, 128GB 8GB RAM / 256GB 8GB RAM / 256GB 12GB RAM\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Main Camera\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Triple: 50 MP (wide), 50 MP (telephoto), 8 MP (ultrawide), LED flash, panorama, HDR, 4K@30fps, 1080p@30/60/120fps, gyro-EIS, OIS\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Selfie Camera\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"32 MP (wide), 1080p@30fps\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Sound\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Stereo speakers, No 3.5mm jack\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Comms\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Wi-Fi 6, Bluetooth 5.4, GPS, NFC, USB Type-C 2.0, OTG\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"table\",\"version\":1,\"colWidths\":[92,92]},{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}",
//             "images": [
//                 "/uploads/1741981108636-pomy0w9fdl-nothing_3a_white.jpg",
//                 "/uploads/1741981108636-p9mngzdc8x-nothing_3a_black.jpg"
//             ],
//             "category": {
//                 "_id": "67d048b54d10b0cfb66da2bf",
//                 "name": "Mobile & accessories"
//             },
//             "isActive": true,
//             "qty": 3
//         },
//         {
//             "_id": "67d25583bbbb34dc111c9d51",
//             "name": "CG 35 inch 4k TV",
//             "brand": {
//                 "_id": "67cc16783aef6ffa5917c066",
//                 "name": "cg - life"
//             },
//             "discount": 0,
//             "price": 20000,
//             "quantity": 499,
//             "description": "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"CG 35-Inch 4K TV – Stunning Clarity, Ultimate Entertainment\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Experience breathtaking visuals with the \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"CG 35-Inch 4K TV\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\", designed to bring your favorite movies, shows, and games to life. With its \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"ultra-HD 4K resolution\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\", every detail appears crisp and vibrant, while the \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"HDR technology\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\" enhances colors and contrast for a true-to-life viewing experience. Enjoy seamless streaming with \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"built-in smart features\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\", giving you access to YouTube, Netflix, and more. Its \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"sleek, bezel-less design\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\" complements any space, while powerful \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Dolby Audio\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\" ensures immersive sound quality. Upgrade your home entertainment with the \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"CG 35-Inch 4K TV\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"—where stunning visuals meet smart technology!\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"},{\"children\":[],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"},{\"children\":[{\"children\":[{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":3,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Specification\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":1,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Body\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"163.5 x 77.5 x 8.4 mm (6.44 x 3.05 x 0.33 in), 201 g (7.09 oz), Nano-SIM + Nano-SIM, IP64 dust and water resistant, 3 LED light strips\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Display\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"AMOLED, 1B colors, 120Hz, HDR10+, 800 nits (typ), 1300 nits (HBM), 3000 nits (peak), 6.77 inches, 1080 x 2392 pixels, Panda Glass\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Platform\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Android 15, Nothing OS 3.1, Snapdragon 7s Gen 3 (4 nm), Octa-core CPU, Adreno 710 GPU\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Memory\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"No card slot, 128GB 8GB RAM / 256GB 8GB RAM / 256GB 12GB RAM\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Main Camera\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Triple: 50 MP (wide), 50 MP (telephoto), 8 MP (ultrawide), LED flash, panorama, HDR, 4K@30fps, 1080p@30/60/120fps, gyro-EIS, OIS\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Selfie Camera\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"32 MP (wide), 1080p@30fps\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Sound\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Stereo speakers, No 3.5mm jack\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Comms\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":1,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"textFormat\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":2,\"rowSpan\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Wi-Fi 6, Bluetooth 5.4, GPS, NFC, USB Type-C 2.0, OTG\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"backgroundColor\":null,\"colSpan\":1,\"headerState\":0,\"rowSpan\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"table\",\"version\":1,\"colWidths\":[92,92]},{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1,\"textFormat\":0,\"textStyle\":\"\"}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1,\"textFormat\":1}}",
//             "images": [
//                 "/uploads/1741837699830-oqd7f4d8e7k-tv2.jpg"
//             ],
//             "category": {
//                 "_id": "67d0123747711e022b00894d",
//                 "name": "TV & accessories"
//             },
//             "isActive": true,
//             "qty": 2
//         }
//     ],
//     totalQuantity: 5,
//     totalAmount: 139000
// }

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart: (state, action: PayloadAction<CartItem>) => {
    //   const newItem = action.payload;
    //   const existingItem = state.items.find(item => item._id === newItem._id);

    //   const canAdd = existingItem && existingItem.qty ? existingItem.qty + 1 <= newItem.quantity : newItem.quantity > 0;

    //   if(!canAdd){
    //     console.log("You cannot add more than the available stock");
    //     toast.error("You cannot add more than the available stock");
    //     return;
    //   }

    //   if (!existingItem) {
    //     state.items.push({
    //       ...newItem,
    //       qty: 1
    //     });
    //   } else {
    //     existingItem.qty = existingItem.qty ? existingItem.qty + 1 : 1;
    //   }

    //   state.totalQuantity++;
    //   state.totalAmount = state.items.reduce((total, item) => {
    //     const discountedPrice = item.price - (item.price * item.discount / 100);
    //     return total + (discountedPrice * (item.qty || 0));
    //   }, 0);
    // },

    // removeFromCart: (state, action: PayloadAction<string>) => {
    //   const id = action.payload;
    //   const existingItem = state.items.find(item => item._id === id);

    //   if (existingItem) {
    //     state.totalQuantity -= existingItem.quantity;
    //     state.items = state.items.filter(item => item._id !== id);
    //     state.totalAmount = state.items.reduce((total, item) => {
    //       const discountedPrice = item.price - (item.price * item.discount / 100);
    //       return total + (discountedPrice * item.quantity);
    //     }, 0);
    //   }
    // },

    // increaseItem: (state, action: PayloadAction<CartItem>) => {
    //   const item = state.items.find(item => item._id === action.payload._id);
    //   if (item && item.qty && item.qty < item.quantity) {
    //     item.qty++;
    //     state.totalQuantity++;
    //     state.totalAmount = state.items.reduce((total, item) => {
    //       const discountedPrice = item.price - (item.price * item.discount / 100);
    //       return total + (discountedPrice * item.quantity);
    //     }, 0);
    //     toast.success("Item quantity increased to cart");
    //   }else{
    //     toast.error("You cannot add more than the available stock");
    //     return;
    //   }
    // },

    // decreaseItem: (state, action: PayloadAction<CartItem>) => {
    //   const item = state.items.find(item => item._id === action.payload._id);
    //   if (item && item.qty && item.qty >= 1) {
    //     item.qty--;
    //     state.totalQuantity--;
    //     state.totalAmount = state.items.reduce((total, item) => {
    //       const discountedPrice = item.price - (item.price * item.discount / 100);
    //       return total + (discountedPrice * item.quantity);
    //     }, 0);
    //     if(item.qty === 0){
    //         state.items = state.items.filter(item => item._id !== action.payload._id);
    //     }
    //   }
    // },

    // clearCart: (state) => {
    //   state.items = [];
    //   state.totalQuantity = 0;
    //   state.totalAmount = 0;
    // },
    setCart: (state, action: PayloadAction<{items: CartItem[], totalQuantity: number, totalAmount: number}>) => {
      const { items, totalQuantity, totalAmount } = action.payload;
      return {
        ...state,
        items,
        totalQuantity,
        totalAmount,
        isLoading: false
      };
    },
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.isLoading = false;
    }
  }
});

export const {setCart, setCartLoading, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
