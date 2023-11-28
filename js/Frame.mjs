import { clearActiveTick, frames, pause, setActiveFrame, setTickInterval, state } from './main.mjs';
import { setTicks } from './Ticker.mjs';

const c_frames = document.getElementById('frames');

export class Frame {
    #tempo;
    #time_signature_num;
    #time_signature_den;
    #duration_bars;
    elem;

    constructor() {
        this.#tempo = 100;
        this.#time_signature_num = 4;
        this.#time_signature_den = 4;
        this.#duration_bars = undefined;

        // Create a new frame in the DOM
        this.elem = document.createElement('metronome-frame');
        this.elem.setAttribute('onclick', `frameClicked(this)`);
        this.elem.setAttribute('tempo', this.#tempo || '');
        this.elem.setAttribute('time_signature_num', this.#time_signature_num || '');
        this.elem.setAttribute('time_signature_den', this.#time_signature_den || '');
        this.elem.setAttribute('duration_bars', this.#duration_bars || '');

        if (state.frame == frames.length)
            this.elem.setAttribute('class', 'active');

        c_frames.appendChild(this.elem);
    }

    toObject() {
        return {
            ['tempo']: this.tempo,
            ['time_signature_num']: this.time_signature_num,
            ['time_signature_den']: this.time_signature_den,
            ['duration_bars']: this.duration_bars
        };
    }

    static fromObject(json) {
        let f = new Frame();
        f.tempo = json.tempo;
        f.time_signature_num = json.time_signature_num;
        f.time_signature_den = json.time_signature_den;
        f.duration_bars = json.duration_bars;

        return f;
    }

    get tempo() {
        return this.#tempo;
    }
    
    set tempo(val) {
        this.#tempo = val;
        pause();

        this.elem.setAttribute('tempo', this.#tempo);
    }

    get time_signature_num() {
        return this.#time_signature_num;
    }

    set time_signature_num(val) {
        this.#time_signature_num = val;
        pause();

        this.elem.setAttribute('time_signature_num', this.#time_signature_num);
    }
    
    get time_signature_den() {
        return this.#time_signature_den;
    }
    
    set time_signature_den(val) {
        this.#time_signature_den = val;
        pause();

        this.elem.setAttribute('time_signature_den', this.#time_signature_den);
    }
    
    get duration_bars() {
        return this.#duration_bars;
    }
    
    set duration_bars(val) {
        this.#duration_bars = val;
        pause();

        this.elem.setAttribute('duration_bars', this.#duration_bars);
    }
}

function getFrameFor(elem) {
    const shadowRoot = elem.getRootNode();
    const metronome_frame = shadowRoot.host;
    
    let frame_number = getFrameNumber(metronome_frame);
    
    return frames[frame_number];
}

function getFrameNumber(elem) {
    const elem_add_frame = document.querySelector('.add-frame-wrapper');
    
    let frame_number = 0;
    while (elem.previousElementSibling !== elem_add_frame) {
        frame_number++;
        elem = elem.previousElementSibling;
    }
    return frame_number;
}

function isDisabled(elem) {
    const shadowRoot = elem.getRootNode();
    const metronome_frame = shadowRoot.host;
    return metronome_frame.hasAttribute('disabled');
}

window.setFrameValue = function(elem, target) {
    if (isDisabled(elem)) return;

    const frame = getFrameFor(elem);

    switch (target) {
        case 'tempo':
            frame.tempo = elem.value;
            break;
        case 'tsNum':
            frame.time_signature_num = elem.value;
            break;
        case 'tsDen':
            frame.time_signature_den = elem.value;
            break;
        case 'durationBars':
            frame.duration_bars = elem.value;
            break;
        case 'durationBeats':
            frame.duration_beats = elem.value;
            break;
        default:
            console.error(`Unrecognized target \'${target}\'.`);
            break;
    }
}

window.incTempo = function(elem) {
    if (isDisabled(elem)) return;

    const frame = getFrameFor(elem);
    frame.tempo++;
}

window.decTempo = function(elem) {
    if (isDisabled(elem)) return;

    const frame = getFrameFor(elem);
    frame.tempo--;
}

window.frameClicked = function(elem) {
    const frame_num = getFrameNumber(elem);

    state.frame = frame_num;
    state.bar = 0;
    state.beat = 0;

    clearActiveTick();
    setActiveFrame(state.frame);
    setTicks(frames[state.frame].time_signature_num);
    
    if (state.play)
        setTickInterval();
}
