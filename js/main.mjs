import { doTick, setTicks } from './Ticker.mjs';
import { Frame } from './Frame.mjs';

const btn_play = document.getElementById("btn-play");
btn_play.addEventListener('click', togglePlay);
window.addEventListener('keypress', (e) => {
    // Spacebar toggle play
    if (e.key == " ") togglePlay();
});

window.addEventListener('resize', fixFramesWidth);

let tick_interval_id = undefined;
export let state = {
    play: false,
    frame: 0,
    bar: 0,
    beat: 0,
};

export let frames = [ new Frame(1) ];

window.onload = () => setTicks(frames[state.frame].time_signature_num);

const c_frames = document.getElementById("frames");

window.addFrame = function() {
    frames.push(new Frame(frames.length + 1));
    fixFramesWidth();
}

function fixFramesWidth() {
    const mframes = document.querySelector("#frames");
    if (mframes.clientWidth > window.innerWidth) {
        frames_wrapper.classList.add('small-screen');
        return;
    }

    mframes.classList.remove('small-screen');
}

export function togglePlay() {
    if (state.play) {
        pause();
        return;
    }

    play();
}

export function play() {
    state.play = true;
    btn_play.innerText = "STOP";
    setTicks(frames[state.frame].time_signature_num);
    setTickInterval();
}

export function pause() {
    window.clearInterval(tick_interval_id);
    btn_play.innerText = "START";

    // Reset state
    state.play = false;
    state.bar = 0;
    state.beat = 0;
    state.frame = 0;

    clearActiveTick();
    setActiveFrame(0);
}

function clearActiveTick() {
    let ticks = document.getElementById("ticker")
                    .getElementsByClassName('tick');

    for (let tick of ticks) {
        tick.classList.remove('active');
    }
}

export function setActiveFrame(frame_num) {
    // Remove current active frame
    let mframes = c_frames.getElementsByTagName('metronome-frame');
    for (let frame of mframes) {
        frame.classList.remove('active');
    }

    // Set new active frame
    const elem = c_frames.getElementsByTagName('metronome-frame')[frame_num];
    elem.classList.add('active');
}

export function setTickInterval() {
    if (tick_interval_id !== undefined) {
        window.clearInterval(tick_interval_id);
    }

    const frame = frames[state.frame];

    let beat_len = 60 / frame.tempo;
    let note_len = beat_len * (4 / frame.time_signature_den);
    let timeout  = note_len * 1000;

    tick_interval_id = window.setInterval(doTick, timeout);
}
