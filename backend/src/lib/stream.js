import {StreamChat} from 'stream-chat';
import { ENV } from './env';

const apiKey=ENV.STREAM_API_KEY
const apiSecret=ENV.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    throw new Error("Stream API key and secret must be defined in environment variables");
}

export const chatClient=StreamChat.getInstance(apiKey,apiSecret);
export const upsertStreamUser=async (userData)=>{
    try{
        await chatClient.upsertUser(userData);
        console.log('stream user upserted:',userData);
    }catch(error){
console.error("Error upserting Stream user:",error);
    }
}

export const deleteStreamUser=async (userId)=>{
    try{
        await chatClient.deleteUser(userId);
        console.log('stream user deleted:',userId);
        
    }catch(error){
console.error("Error deleting Stream user:",error);
    }
}

//todo: add another method to generate token