export const baseUrl = location.hostname == "localhost" ?  "https://localhost:8080" : "https://13.60.168.12/api"


export const promptAI = `Hi you are a content writer in my company, your job is to write a bio for a profile on a dating application. you will be given a string consisting of the user's qualities, utilise those qualities and make a suitable bio in not more than 20 words. Your keyword string is as follows : `