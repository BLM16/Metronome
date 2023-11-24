class FrameElement extends HTMLElement {
    tempo;
    time_signature_num;
    time_signature_den;
    duration_bars;

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        const tempo = document.createElement("div");
        tempo.setAttribute("class", "tempo");

            const btn_tempo_down = document.createElement("button");
            btn_tempo_down.setAttribute("type", "button");
            btn_tempo_down.setAttribute("class", "btn-tempo");
            btn_tempo_down.setAttribute("onclick", "decTempo(this)");
            btn_tempo_down.innerText = '-';

            const txt_tempo = document.createElement("input");
            txt_tempo.setAttribute("type", "text");
            txt_tempo.setAttribute("name", "tempo");
            txt_tempo.setAttribute("class", "txt-tempo");
            txt_tempo.setAttribute("placeholder", "100");
            txt_tempo.setAttribute("value", this.getAttribute('tempo'));
            txt_tempo.setAttribute("onchange", "setFrameValue(this, 'tempo')");
            
            const btn_tempo_up = document.createElement("button");
            btn_tempo_up.setAttribute("type", "button");
            btn_tempo_up.setAttribute("class", "btn-tempo");
            btn_tempo_up.setAttribute("onclick", "incTempo(this)");
            btn_tempo_up.innerText = '+';

            tempo.appendChild(btn_tempo_down);
            tempo.appendChild(txt_tempo);
            tempo.appendChild(btn_tempo_up);

        const time_signature = document.createElement("div");
        time_signature.setAttribute("class", "time-signature");

            const time_signature_num = document.createElement("input");
            time_signature_num.setAttribute("type", "text");
            time_signature_num.setAttribute("name", "time-signature-num");
            time_signature_num.setAttribute("class", "time-signature-input");
            time_signature_num.setAttribute("placeholder", "4");
            time_signature_num.setAttribute("value", this.getAttribute("time_signature_num"));
            time_signature_num.setAttribute("onchange", "setFrameValue(this, 'tsNum')");
            
            const time_signature_separator = document.createElement("p");
            time_signature_separator.setAttribute("class", "time-signature-separator");
            time_signature_separator.innerText = ':';
            
            const time_signature_den = document.createElement("input");
            time_signature_den.setAttribute("type", "text");
            time_signature_den.setAttribute("name", "time-signature-den");
            time_signature_den.setAttribute("class", "time-signature-input");
            time_signature_den.setAttribute("placeholder", "4");
            time_signature_den.setAttribute("value", this.getAttribute("time_signature_den"));
            time_signature_den.setAttribute("onchange", "setFrameValue(this, 'tsDen')");

            time_signature.appendChild(time_signature_num);
            time_signature.appendChild(time_signature_separator);
            time_signature.appendChild(time_signature_den);

        const duration = document.createElement("div");
        duration.setAttribute("class", "duration");

            const duration_bars = document.createElement("input");
            duration_bars.setAttribute("type", "text");
            duration_bars.setAttribute("name", "duration-bars");
            duration_bars.setAttribute("class", "duration-input");
            duration_bars.setAttribute("placeholder", "bars");
            duration_bars.setAttribute("value", this.getAttribute("duration_bars"));
            duration_bars.setAttribute("onchange", "setFrameValue(this, 'durationBars')");

            duration.appendChild(duration_bars);

        shadow.append(tempo);
        shadow.appendChild(time_signature);
        shadow.appendChild(duration);

        const extern_styles = document.createElement("link");
        extern_styles.setAttribute("rel", "stylesheet");
        extern_styles.setAttribute("href", "css/frame.css");
        shadow.appendChild(extern_styles);
    }

    static get observedAttributes() {
        return ['tempo'];
    }

    attributeChangedCallback(name, _, newVal) {
        if (!this.shadowRoot) return;

        if (name == 'tempo') {
            this.shadowRoot.querySelector('.txt-tempo').value = newVal;
        }
    }
}

customElements.define("metronome-frame", FrameElement);
