import { frames, setActiveFrame, setTickInterval, state } from "./main.mjs";

const c_ticks = document.getElementById("ticker");
const tick_noise = new Audio('./assets/tick.mp3');

let updateActive = false;

export function setTicks(qty) {
    if (qty === null) return;

    let num_children = c_ticks.childElementCount;
    for (let i = 0; i < num_children; i++) {
        c_ticks.firstChild.remove();
    }

    for (let i = 0; i < qty; i++) {
        const tick = document.createElement("div");
        tick.setAttribute("class", "tick");

        c_ticks.appendChild(tick);
    }
}

export function doTick() {
    if (updateActive) {
        setActiveFrame(state.frame);
        setTicks(frames[state.frame].time_signature_num);
        setTickInterval();
        updateActive = false;
    }

    let old_index = state.beat - 1;
    if (old_index < 0)
        old_index = frames[state.frame].time_signature_num - 1;

    const ticks = c_ticks.getElementsByClassName('tick');
    ticks[old_index].classList.remove('active');
    ticks[state.beat].classList.add('active');

    tick_noise.play();

    state.beat++;
    if (state.beat > frames[state.frame].time_signature_num - 1) {
        state.beat = 0;
        state.bar++;

        // undefined bar durations go infinitely as comparisons to undefined are always false
        if (state.bar == frames[state.frame].duration_bars) {
            state.frame++;
            state.bar = 0;
            updateActive = true;
        }
    }
}
