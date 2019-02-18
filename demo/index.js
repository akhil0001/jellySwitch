const KEYCODE = {
    SPACE: 32,
    TAB: 9
};
const template = document.createElement('template');

const templateHTML  = ` 
        <div class="switch">
        <label for="jelly-switch" id="content-left"></label>

        <input type="checkbox" name="jelly-switch" id="jelly-switch"></input>
        <label for="jelly-switch" id="switch">
        <p id="jelly-content"></p>
        </label>
        
        <label for="jelly-switch" id="content-right"></label>
        </div>
        <style>
        :host(:focus)
        {
            outline:none;
            --highlight-scale:12px;
        }
        :host([disabled]) label
        {
            cursor:not-allowed;
            opacity:0.5;
            --highlight-scale:2px;
        }
        input#jelly-switch[type=checkbox]{
            height: 0;
            width: 0;
            margin:0;
            visibility: hidden;
        }
        .switch 
        {
            display:inline-block;
            font-family:inherit
        }
        label
        {
            cursor: pointer;
        }
        label#switch{
            text-indent: -9999px;
            width: 50px;
            height: 25px;
            top:5px;
            display: inline-block;
            border-radius: 100px;
            position: relative;
            outline:none;
            -ms-user-select: none; 
            -webkit-touch-callout: none;
             -webkit-user-select: none;
             -khtml-user-select: none;
             -moz-user-select: none;
             -ms-user-select: none;
             user-select: none;
             -webkit-tap-highlight-color: transparent;
            background: var(--off-color,#FF4651);
            box-shadow: 0 1px var(--highlight-scale,4px) -1px var(--off-color,#FF4651);
            transition: .2s ease-in-out;
        }
        p#jelly-content {
            box-sizing:border-box;
            content: '';
            position: absolute;
            top: -14px;
            left: 2px;
            width: 21px;
            height: 21px;
            background:var(--offHandle-color,#ffffff);
            border-radius: 21px;
            transition: background  .5s ease-in;
        }
        label#content-left
        {
            position:relative;
            margin: 5px;
        }
        label#content-right
        {
            position:relative;
            margin: 5px;    
        }
        :host([aria-checked = "false"]) p#jelly-content
        {
            animation:expand-left 0.5s linear forwards;
        }
        :host([aria-checked = "true"][checked]) label#switch {
            background: var(--on-color,#11c75d);
            box-shadow: 0 2px var(--highlight-scale,4px) -1px var(--on-color,#11c75d);
        }

        :host([aria-checked = "true"]) p#jelly-content {
            background:var(--onHandle-color,#ffffff);
            
            animation:expand-right .5s linear forwards;
            transition: background  .5s ease-in;
        }

        @-webkit-keyframes expand-right
        {
            0%
            {
                left:2px;
            }
            30%,50% 
            {
                left:2px;
                width:46px;
                
            }
            60%
            {
                left:34px;
                width:14px;
            }
            80%
            {
                left:24px;
                width:24px;   
            }
            90%
            {
                left:29px;
                width:19px;  
            }
            100%
            {
                left:27px;
                width:21px;
            }
        }

        @keyframes expand-right
        {
            0%
            {
                left:2px;
            
            }
            30%,50%   
            {
                left:2px;
                width:46px;
                
            }
            
            60%
            {
                left:34px;
                width:14px;
            }
            80%
            {
                left:24px;
                width:24px;   
            }
            90%
            {
                left:29px;
                width:19px;  
            }
            100%
            {
                left:27px;
                width:21px;
            }
        }

        @-webkit-keyframes expand-left
        {
            0%
            {
                left:27px;
            }
            30%,50%
            {
                left:2px;
                width:46px;
            }
            60%
            {
                right:34px;
                width:14px;
            }
            80%
            {
                right:24px;
                width:24px;   
            }
            90%
            {
                right:29px;
                width:19px;  
            }
            100%
            {
                left:2px;
                width:21px;
            }
        }

        @keyframes expand-left
        {
            0%
            {
                left:27px;
            }
            30%,50%
            {
                left:2px;
                width:46px;
            }
            60%
            {
                right:34px;
                width:14px;
            }
            80%
            {
                right:24px;
                width:24px;   
            }
            90%
            {
                right:29px;
                width:19px;  
            }
            100%
            {
                left:2px;
                width:21px;
            }
        }
        </style>    `;

class JellySwitch extends HTMLElement {

    static get observedAttributes() {
        return ["checked", "disabled","right-value","left-value"];
    }

    constructor() {
        super();
        var shadowElement = this.attachShadow({
            mode: 'open'
        })
        template.innerHTML = templateHTML;
        shadowElement.appendChild(template.content.cloneNode(true));
        this._jellySwitchDiv = shadowElement.getElementById('jelly-switch');
        this._jellyRightLabel = shadowElement.getElementById('content-right');
        this._jellyLeftLabel = shadowElement.getElementById('content-left');

    }
    connectedCallback() {
        this._upgradeProperty('checked');
        this._upgradeProperty('disabled');
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'switch');
        }
        if (!this.hasAttribute('tabindex'))
            this.setAttribute('tabindex', 0);
        if (this._jellySwitchDiv) {
            this._jellySwitchDiv.addEventListener("click", this._handleClickAndToggle.bind(this));
            this.addEventListener('keyup', this._handleKeyPress);
        }
    }
    disconnectedCallback() {
        this._jellySwitchDiv.removeEventListener("click", this._handleClickAndToggle);
        this.removeEventListener('keyup', this._handleKeyPress);
    }
    get checked() {
        return this._jellySwitchDiv.checked;
    }

    set checked(isChecked) {
        
            if (typeof isChecked === "boolean") {

                if (isChecked)
                    this.setAttribute('checked', "");
                else
                    this.removeAttribute('checked');
            } else {
                console.warn('checked function of jelly-switch allows only boolean value');
            }
    }

    get disabled() {
        return this._jellySwitchDiv.disabled;
    }

    set disabled(isDisabled) {
        if (typeof isDisabled === "boolean") {
            this._jellySwitchDiv.disabled = isDisabled;
            if (isDisabled)
                this.setAttribute('disabled', "");
            else
                this.removeAttribute('disabled');
        } else {
            console.warn('disabled function of jelly-switch allows only boolean value');
        }
    }
    set rightValue (text){
        this._jellyRightLabel.innerText = text;
    }
    get rightValue()
    {
        return this._jellyRightLabel.innerText;
    }

    set leftValue (text){
        this._jellyLeftLabel.innerText = text;
    }

    get leftValue()
    {
        return  this._jellyLeftLabel.innerText = newValue;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const hasValue = newValue !== null;
        switch (name) {
            case 'checked':
                this.setAttribute('aria-checked', hasValue);
                this._jellySwitchDiv.checked = hasValue;
                break;
            case 'disabled':
                this.setAttribute('aria-disabled', hasValue);
                this._jellySwitchDiv.disabled = hasValue;
                if (hasValue) {
                    this.removeAttribute('tabindex');
                    this.blur();
                } else {
                    this.setAttribute('tabindex', 0);
                }
                break;
            case 'right-value':
                this.rightValue = newValue;
                break;
            case 'left-value':
                this.leftValue = newValue;
                break;
        }

    }
    _handleClickAndToggle() {
        if (!this.disabled) {
            this.checked = this._jellySwitchDiv.checked;
            this.dispatchEvent(new CustomEvent("toggle", {
                bubbles: true,
                detail: {
                    value: this.checked
                }
            }));
        }
    }
    _handleKeyPress(event) {
        if (!this.disabled) {
            if (event.altKey)
                return;

            switch (event.keyCode) {
                case KEYCODE.SPACE:
                    event.preventDefault();
                    this._jellySwitchDiv.checked = !this._jellySwitchDiv.checked;
                    this._handleClickAndToggle();
                    break;

            }
        } else {
            return;
        }

    }
    _upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
            let value = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }

}
if (window.customElements) {
    customElements.define('jelly-switch', JellySwitch);
}
