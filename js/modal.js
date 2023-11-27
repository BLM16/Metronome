const btn_info = document.getElementById('btn-info');
const btn_info_close = document.getElementById('btn-info-close');
const btn_info_close_top = document.getElementById('btn-info-close-top');
const info_modal = document.getElementById('info-modal');

btn_info.addEventListener('click', showModal);
btn_info_close.addEventListener('click', hideModal);
btn_info_close_top.addEventListener('click', hideModal);

function showModal() {
    info_modal.showModal();
}

function hideModal() {
    info_modal.close();
}
