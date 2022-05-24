import {PATH, getRequest, postRequest} from './api_chung'

export function dangNhap (email, matkhau, hanhdong) {
    return postRequest(PATH, hanhdong, {
        email: email,
        password: matkhau,
    })
}

export function APILayTatCa (hanhdong) {
    return getRequest(`${PATH}/local/getall`, hanhdong)
}

export function Download (data, hanhdong) {
    return postRequest(`${PATH}/local/download`, hanhdong, {
        data: data
    })
}

export function Using (list_id, hanhdong) {
    return getRequest(`${PATH}/local/uselist?list_id=${list_id}`, hanhdong)
}

export function Cancel (list_id, hanhdong) {
    return getRequest(`${PATH}/local/cancel?list_id=${list_id}`, hanhdong)
}