const audio_ctx = new AudioContext();
const tick_noise = new Audio('./assets/tick.mp3');

const track = audio_ctx.createMediaElementSource(tick_noise);
const iir = new IIRFilterNode(audio_ctx, {
    feedforward: [6.4],
    feedback: [1]
});
const hp = new BiquadFilterNode(audio_ctx, {
    type: 'highpass',
    gain: -3,
    frequency: 1800
});

export function resumeAudioContext() {
    audio_ctx.resume();
}

export function playTick(emphasized) {
    iir.disconnect();
    hp.disconnect();

    if (emphasized) {
        track
            .connect(iir)
            .connect(hp)
            .connect(audio_ctx.destination);
    }
    else {
        track.connect(audio_ctx.destination);
    }

    tick_noise.play();
}
