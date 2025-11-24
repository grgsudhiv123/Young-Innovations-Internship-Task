import { BASE_URL } from "./constants.js"


export const FetchApi = async (url, filter) => {
    try {
        const response = await fetch(`${BASE_URL}/${url}?${filter}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const FetchApiById = async (url, id) => {
    try {
        const response = await fetch(`${BASE_URL}/${url}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}






export const FetchCartProducts = async ()=>{
    try {
        const response = await fetch(`${BASE_URL}/cartProducts`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const AddProducts = async (data)=>{
    try {
        const response = await fetch(`${BASE_URL}/cartProducts`,{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json"
            },
            responseType:"json"
        })
        console.log("Product added successfully");
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}



export const updateCartProducts = async (data,id)=>{
    try {
        const response = await fetch(`${BASE_URL}/cartProducts/${id}`,{
            method:"PATCH",
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json"
            },
            responseType:"json"
        })
        console.log("Product updated successfully");
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const DeleteCartProduct = async (id)=>{
    try {
        const response = await fetch(`${BASE_URL}/cartProducts/${id}`,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json"
            },
            responseType:"json"
        })
        console.log("Product deleted successfully");
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}