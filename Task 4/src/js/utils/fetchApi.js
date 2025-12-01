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
        const response = await fetch(`${BASE_URL}/${url}?id=${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}




export const FetchAllProducts = async (filter) =>{
    try {
        const response = await fetch(`${BASE_URL}/products?${filter}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error occured while fetching the data",error);
        return error;
    }
}


export const FetchProductsById = async (id)=>{
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}















// cart products
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
            responseType:"json",
            response : FetchCartProducts()
        })
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
            responseType:"json",
            response : FetchCartProducts()
        })
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

















// wishlist 
export const getAllWishListProduct = async () =>{
    try {
        const response = await fetch(`${BASE_URL}/wishlist`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
} 

export const AddWishlist = async (data)=>{
    try {
        const response = await fetch(`${BASE_URL}/wishlist`,{
            method : "POST",
            body : JSON.stringify(data),
            headers : {
                "content-type" : "application/json",
            },
            responseType : "json",
        });
        return data;
    } catch (error) {
         console.log(error);
        return error;
    }
}


export const UpdateWishlistByID = async (data,id)=>{
    try {
        const response = await fetch(`${BASE_URL}/wishlist/${id}`,{
            method : "PATCH",
            body : JSON.stringify(data),
            headers : {
                "content-type" : "application/json",
            },
            responseType : "json",
        });
        const data = await response.json();
        return data; 
    } catch (error) {
        console.log(error);
        return error;
    }
}




export const DeleteWishlistByID = async (id)=>{
    try {
        const response = await fetch(`${BASE_URL}/wishlist/${id}`,{
            method : "DELETE",
            headers : {
                "content-type" : "application/json",
            },
            responseType : "json",
            response : getAllWishListProduct()
        });
        const data  = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}