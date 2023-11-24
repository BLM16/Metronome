import { clearActiveTick, frames, pause, setActiveFrame, setTickInterval, state } from './main.mjs';
import { setTicks } from './Ticker.mjs';

const c_frames = document.getElementById('frames');

export class Frame {
    #tempo;
    #time_signature_num;
    #time_signature_den;
    #duration_bars;

    constructor(frame_number) {
        this.frame_number = frame_number;

        this.#tempo = 100;
        this.#time_signature_num = 4;
        this.#time_signature_den = 4;
        this.#duration_bars = undefined;

        // Create a new frame in the DOM
        const elem = document.createElement('metronome-frame');
        elem.setAttribute('data-frame-number', frame_number);
        elem.setAttribute('onclick', `frameClicked(${frame_number})`);
        elem.setAttribute('tempo', this.#tempo || '');
        elem.setAttribute('time_signature_num', this.#time_signature_num || '');
        elem.setAttribute('time_signature_den', this.#time_signature_den || '');
        elem.setAttribute('duration_bars', this.#duration_bars || '');

        if (state.frame + 1 == frame_number)
            elem.setAttribute('class', 'active');

        c_frames.appendChild(elem);
    }

    get tempo() {
        return this.#tempo;
    }
    
    set tempo(val) {
        this.#tempo = val;
        pause();

        const elem = c_frames.getElementsByTagName('metronome-frame')[this.frame_number - 1];
        elem.setAttribute('tempo', this.#tempo);
    }

    get time_signature_num() {
        return this.#time_signature_num;
    }

    set time_signature_num(val) {
        this.#time_signature_num = val;
        pause();
    }

    get time_signature_den() {
        return this.#time_signature_den;
    }

    set time_signature_den(val) {
        this.#time_signature_den = val;
        pause();
    }

    get duration_bars() {
        return this.#duration_bars;
    }

    set duration_bars(val) {
        this.#duration_bars = val;
        pause();
    }
}

function getFrameFor(elem) {
    const shadowRoot = elem.getRootNode();
    const metronome_frame = shadowRoot.host;

    const frame_number = metronome_frame.getAttribute('data-frame-number');
    return frames[frame_number - 1];
}

window.setFrameValue = function(elem, target) {
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
    const frame = getFrameFor(elem);
    frame.tempo++;
}

window.decTempo = function(elem) {
    const frame = getFrameFor(elem);
    frame.tempo--;
}

window.frameClicked = function(frame_num) {
    state.frame = frame_num - 1;
    state.bar = 0;
    state.beat = 0;

    clearActiveTick();
    setActiveFrame(state.frame);
    setTicks(frames[state.frame].time_signature_num);
    
    if (state.play)
        setTickInterval();
}
