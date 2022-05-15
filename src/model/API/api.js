import {PATH, getRequest, postRequest} from './api_chung'

export function dangNhap (email, matkhau, hanhdong) {
    return postRequest(PATH, hanhdong, {
        email: email,
        password: matkhau,
    })
}

export function APILayBanGhi (list_id, hanhdong) {
    return getRequest(`${PATH}/list/get_list?id=${list_id}`, hanhdong)
}

export function APILayBuoc (list_id, hanhdong) {
    return getRequest(`${PATH}/list/get_step?list_id=${list_id}`, hanhdong)
}

export function APILayBuocCon (step_id, sothutu, hanhdong) {
    return getRequest(`${PATH}/list/get_substep?step_id=${step_id}`, hanhdong)
}