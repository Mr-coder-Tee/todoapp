import { Dimensions } from "react-native";
const{width,height}=Dimensions.get('window')

 
export const COLORS={
    primary:"#bc4e9c",
    secondary:"#cdcd02",
    danger:"#dc3545",
    backdrop:"#C6FFDD",
    bluelink:'#0645AD',
    black:"#000000",
    white:"#ffffff",
    purple:"#7a44cf",


    orange:'rgb(255,165,0)',
    green:'rgb(0,128,0)',
    red:'rgb(255,0,0)',
    TransparentOrange:'rgba(255,165,0,.1)',
    TransparentGreen:'rgba(0,128,0,.1)',
    TransparentRed:'rgba(255,0,0,.1)',
    

    appPrimary:'#12c2e9',
    appSecondary:'#c471ed',
    appAlt:'#f64f59',

    ligthGray:"#D3D3D3",
    ligthGray2:"#f6f6f7",
    ligthGray3:"#efeff1",
    ligthGray4:"#f8f8f9",
    transparent:"transparent",
    darkgray:"#898c95",
}

export const SIZES={
    base:0,
    font:14,
    radius:30,
    padding:10,
    padding2:12,

    largeTitle:50,
    h1:30,
    h2:22,
    h3:20,
    h4:18,
    h5:16,
    h6:14,

    body1:30,
    body2:20,
    body3:16,
    body4:14,
    body5:12,

}
export const FONTS={
    largeTitle: {fontSize:SIZES.largeTitle,lineHeight:40},
    h1:{fontSize:SIZES.h1,lineHeight:36},
    h2:{fontSize:SIZES.h2,lineHeight:30},
    h3:{fontSize:SIZES.h3,lineHeight:22},
    h4:{fontSize:SIZES.h4,lineHeight:22},
    body1:{fontSize:SIZES.body1,lineHeight:36},
    body2:{fontSize:SIZES.body2,lineHeight:30},
    body3:{fontSize:SIZES.body3,lineHeight:22},
    body4:{fontSize:SIZES.body4,lineHeight:22},
    body5:{fontSize:SIZES.body5,lineHeight:22},
 }
 
 const appTheme={COLORS,SIZES,FONTS,width,height}
 
 export default appTheme


