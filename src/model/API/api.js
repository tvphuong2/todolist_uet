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

export function APILayTatCa (hanhdong) {
    return getRequest(`${PATH}/search/getall`, hanhdong)
}

export function APITimKiem (tu_khoa, hanhdong) {
    return getRequest(`${PATH}/search?key=${tu_khoa}`, hanhdong)
}

export function APITimKiemTheLoai (type_id, hanhdong) {
    return getRequest(`${PATH}/search/bytype?type_id=${type_id}`, hanhdong)
}

export function APILayTacGia (tacgia_id, hanhdong) {
    return getRequest(`${PATH}/list/get_author?author_id=${tacgia_id}`, hanhdong)
}

export function APILayDanhGia (list_id, hanhdong) {
    return getRequest(`${PATH}/list/get_vote?list_id=${list_id}`, hanhdong)
}

export function APILayBinhLuan (list_id, hanhdong) {
    return getRequest(`${PATH}/list/get_comment?list_id=${list_id}`, hanhdong)
}

export function APITaoBinhLuan (list_id, binh_luan, hanhdong) {
    return postRequest(`${PATH}/list/make_comment/`, hanhdong, {
        list_id: list_id,
        comment: binh_luan, 
    })
}

export function APITangLuotTaiVe (list_id, hanhdong) {
    return postRequest(`${PATH}/list/download`, hanhdong, {
        list_id: list_id,
    })
}