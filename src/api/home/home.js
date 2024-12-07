import request from "@/utils/server.js";

export const getEventList = () => request.get('/login/getEvaluate')