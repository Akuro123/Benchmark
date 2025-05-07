import AsyncStorage from "@react-native-async-storage/async-storage";

export const setLoggedInUser = async (user:any) =>{
    await AsyncStorage.setItem('loggedInUser',JSON.stringify(user));

};
export const getLoggedInUser = async () =>{
    const userData = await AsyncStorage.getItem('loggedInUser');
    return userData ? JSON.parse(userData) : null
};

export const logoutUser = async () =>{
    await AsyncStorage.removeItem('loggedInUser');
};