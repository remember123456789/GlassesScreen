import request from '@/utils/server.js'

export const UserLogin = (data) => request.post('/users/login', data)

export const UserRegister = (data) => request.post('/users/register', data)


