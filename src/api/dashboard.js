import request from '@/utils/axios'
import ar from "element-ui/src/locale/lang/ar";

export function dashboardGet() {
    return request({
        url: '/dashboard',
        method: 'get'
    })
}

export function autoScanPost(args) {
    return request({
        url: '/auto/scan',
        method: 'post',
        data: args
    })
}

export function customScanPost(args) {
    return request({
        url: '/custom/scan',
        method: 'post',
        data: args
    })
}

export function cancelScanGet() {
    return request({
        url: '/cancel/scan',
        method: 'get'
    })
}

export function commandPost(args) {
    return request({
        url: '/command',
        method: 'post',
        data: args
    })
}

export function hostUpdatePost(args) {
    return request({
        url: '/host/config',
        method: 'post',
        data: args
    })
}

export function hostPingGet() {
    return request({
        url: '/host/ping',
        method: 'get'
    })
}

export function hostInfoGet() {
    return request({
        url: '/host/info',
        method: 'get'
    })
}