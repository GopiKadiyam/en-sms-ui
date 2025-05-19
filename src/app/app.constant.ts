import { environment } from "../environments/environment";

export const BACKEND_HOST = {
    sendSmsServiceHostname: environment.sendSmsServiceHostname,
}


const authURLs = {
    signUp: "/api/auth/sign-up",
    signIn: "/api/auth/sign-in",
    checkAuth: "/api/auth/check-auth"
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
const campaignURLs = {
    createCampaign: "/api/campaign/create",
    campaignList: "/api/campaign/all",
}
export const API_URL = {
    authURLs,
    senderURLs,
    templateURLs,
    campaignURLs,
    commonUrls
}