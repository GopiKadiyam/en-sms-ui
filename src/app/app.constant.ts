import { environment } from "../environments/environment";

export const BACKEND_HOST = {
    sendSmsServiceHostname: environment.sendSmsServiceHostname,
}


const authURLs = {
    signUp: "/api/auth/sign-up",
    signIn: "/api/auth/sign-in",
    checkAuth: "/api/auth/check-auth"
}
const userURLs = {
    createUser: "/user",
    updateUser: "/user/{id}",
    deleteUser: "/user/{id}",
    getUser: "/user/{id}",
    getUserList: "/user/all",
    checkUsername: "/user/check-username/{username}",
    verifyPassword: "/user/verify-password",
}
const apiKeyURLs = {
    createApiKey: "/user/{id}/api-key",
    getApiKey: "/user/{id}/api-key/{keyId}",
    getAllApiKeys: "/user/all/api-key",
    updateApiKey: "/user/{id}/api-key/{keyId}",
    deleteApiKey: "/user/{id}/api-key/{keyId}"
}
const providerURLs = {
    createProvier: "/provider",
    updateProvider: "/provider/{providerId}",
    deleteProvider: "/provider/{providerId}",
    getProvider: "/provider/{providerId}",
    getProviderList: "/provider/all",
}
const senderURLs = {
    createSender: "/sender",
    updateSender: "/sender/{senderId}",
    deleteSender: "/sender/{senderId}",
    getSender: "/sender/{senderId}",
    getSenderList: "/sender/all",
}
const commonUrls = {
    getServiceTypes: '/service-types'
}
const templateURLs = {
    createTemplate: "/api/template/create",
    templateList: "/api/template/all",
    getTemplateById: "/api/template/{templateId}",
    getAllTemplateIdsBySenderId: "/api/template/id/all/{senderId}",
    getAllTemplateIds: "/api/template/id/all"
}

export const API_URL = {
    authURLs,
    userURLs,
    apiKeyURLs,
    senderURLs,
    templateURLs,
    commonUrls,
    providerURLs
}