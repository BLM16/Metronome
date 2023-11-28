import { clearAllFrames, frames, resetState, setActiveFrame, setFrames, state } from "./main.mjs";
import { Frame } from "./Frame.mjs";
import { setTicks } from "./Ticker.mjs";

const config_list_key = 'config-list';

const btn_save_config = document.getElementById('btn-save-config');
const save_modal = document.getElementById('save-config-modal');
const txt_config_name = document.getElementById('txt-config-name');

const btn_load_config = document.getElementById('btn-load-config');
const load_modal = document.getElementById('load-config-modal');
export const load_config_selector = document.getElementById('load-config-selector');

const btn_delete_config = document.getElementById('btn-delete-config');
const delete_modal = document.getElementById('delete-config-modal');
export const delete_config_selector = document.getElementById('delete-config-selector');

btn_save_config.addEventListener('click', saveConfig);
btn_load_config.addEventListener('click', loadConfig);
btn_delete_config.addEventListener('click', deleteConfig);

export function showSaveModal() {
    save_modal.showModal();
}

export function hideSaveModal() {
    save_modal.close();
}

export function showLoadModal() {
    load_modal.showModal();
}

export function hideLoadModal() {
    load_modal.close();
}

export function showDeleteModal() {
    delete_modal.showModal();
}

export function hideDeleteModal() {
    delete_modal.close();
}

function saveConfig() {
    const config_name = txt_config_name.value;
    const config_json = JSON.stringify(frames.map(f => f.toObject()));

    localStorage.setItem(config_name, config_json);

    let config_list = localStorage.getItem(config_list_key) || '';
    if (config_list !== '')
        config_list += ';';
    config_list += config_name;
    localStorage.setItem(config_list_key, config_list);
}

function loadConfig() {
    const config_name = load_config_selector.value;
    if (config_name === '') return;

    let config_json = localStorage.getItem(config_name);
    if (config_json === null) return;

    clearAllFrames();
    setFrames(JSON.parse(config_json).map(o => Frame.fromObject(o)));
    resetState();
    setActiveFrame(state.frame);
    setTicks(frames[state.frame].time_signature_num);
}

function deleteConfig() {
    const config_name = delete_config_selector.value;
    if (config_name === '') return;

    localStorage.removeItem(config_name);

    let config_list = localStorage.getItem(config_list_key);
    config_list = config_list.replace(config_name + ';', '');
    config_list = config_list.replace(config_name, '');
    localStorage.setItem(config_list_key, config_list);
}

export function renderConfigList(selector) {
    let num_options = selector.childElementCount;
    for (let i = 0; i < num_options; i++) {
        selector.firstChild.remove();
    }

    let defaultOpt = document.createElement('option');
    defaultOpt.setAttribute('value', '');
    defaultOpt.setAttribute('selected', 'true');
    defaultOpt.innerText = '-- Select Configuration --';
    selector.appendChild(defaultOpt);

    const config_list = localStorage.getItem(config_list_key);
    if (config_list === null || config_list === '') return;

    const config_names = config_list.split(';');
    for (let name of config_names) {
        let o = document.createElement('option');
        o.setAttribute('value', name);
        o.innerText = name;
        selector.appendChild(o);
    }
}
