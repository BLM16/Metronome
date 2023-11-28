import { delete_config_selector, hideDeleteModal, hideLoadModal, hideSaveModal, load_config_selector, renderConfigList, showDeleteModal, showLoadModal, showSaveModal } from "./Save.mjs";

const btn_info = document.getElementById('btn-info');
const btn_info_close = document.getElementById('btn-info-close');
const info_modal = document.getElementById('info-modal');

const btn_export = document.getElementById('btn-export');
const btn_load = document.getElementById('btn-load');
const btn_delete = document.getElementById('btn-delete');

const btn_save_config_close = document.getElementById('btn-save-config-close');
const btn_load_config_close = document.getElementById('btn-load-config-close');
const btn_delete_config_close = document.getElementById('btn-delete-config-close');

btn_export.addEventListener('click', showSaveModal);
btn_load.addEventListener('click', () => {
    renderConfigList(load_config_selector);
    showLoadModal();
});
btn_delete.addEventListener('click', () => {
    renderConfigList(delete_config_selector)
    showDeleteModal();
});

btn_info.addEventListener('click', showInfoModal);
btn_info_close.addEventListener('click', hideInfoModal);
btn_save_config_close.addEventListener('click', hideSaveModal);
btn_load_config_close.addEventListener('click', hideLoadModal);
btn_delete_config_close.addEventListener('click', hideDeleteModal);

function showInfoModal() {
    info_modal.showModal();
}

function hideInfoModal() {
    info_modal.close();
}

