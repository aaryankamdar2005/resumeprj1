// import { createContext, useState } from "react";
// import Cookies from 'js-cookie';

// export const  Formcontext = createContext();

// export const FormProvider= (props)=>{

// const[formData,setFormData]=useState({
//     name:'',
//     contact:'',
//     school:'',
//     degree:'',
//     location:'',
//     date:'',
//     title:'',
//     company:'',
//     location:'',
//     date:'',
//     detail:'',
//     language:'',
//     framework:'',
//     tools:'',
//     clocation:'',
//     cdate:'',
// });

// const updateFormData = (name,value)=>{
// setFormData((prev)=>({
//     ...prev,
//     [name]:value,

// }))
// }
// const [cookieToken,setCookieToken]=useState(Cookies.get('token'))

// return (
//     <Formcontext.Provider value={{formData,updateFormData,cookieToken,setCookieToken}}>
//         {props.children}
//     </Formcontext.Provider>
// )

// }