(function () {
    const KEYCODE = {
        SPACE: 32,
        TAB: 9
    };
    const template = document.createElement('template');

    function templateHTML() {
        return ` 
        <div class="switch">
        <input type="checkbox" name="jelly-switch" id="jelly-switch"></input>
        <label for="jelly-switch">Toggle</label>
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
        }
        input#jelly-switch[type=checkbox]{
            height: 0;
            width: 0;
            visibility: hidden;
        }
        .switch 
        {
            display:inline-block;
        }
        label {
            cursor: pointer;
            text-indent: -9999px;
            width: 50px;
            height: 25px;
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
        label:after {
            box-sizing:border-box;
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 21px;
            height: 21px;
            background:var(--offHandle-color,#ffffff);
            border-radius: 21px;
            animation:expand-left .5s linear forwards;
            transition: background  .5s ease-in
        }
        
        input#jelly-switch:checked+label {
            background: var(--on-color,#11c75d);
            box-shadow: 0 2px var(--highlight-scale,4px) -1px var(--on-color,#11c75d);
        }

        input#jelly-switch:checked+label:after {
            background:var(--onHandle-color,#ffffff);
            
            animation:expand-right .5s linear forwards;
            transition: background  .5s ease-in
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
    }

    class jellySwitch extends HTMLElement {

        static get observedAttributes() {
            return ["toggled", "disabled"];
        }

        constructor() {
            super();
            var shadowElement = this.attachShadow({
                mode: 'open'
            })
            template.innerHTML = templateHTML();
            shadowElement.appendChild(template.content.cloneNode(true));
            this._jellySwitchDiv = shadowElement.getElementById('jelly-switch');

        }
        connectedCallback() {
            if (!this.hasAttribute('role')) {
                this.setAttribute('role', 'switch');
            }
            if (!this.hasAttribute('tabindex'))
                this.setAttribute('tabindex', 0);
            this._upgradeProperty('toggled');
            this._upgradeProperty('disabled')
            if (this._jellySwitchDiv) {
                var self = this;
                this._jellySwitchDiv.addEventListener("click", this._handleClickAndToggle.bind(self));
                this.addEventListener('keyup', this._handleKeyPress);
            }
        }
        disconnectedCallback() {
            this._jellySwitchDiv.removeEventListener("click");
            this.removeEventListener('keyup');
        }
        get toggle() {
            return this._jellySwitchDiv.checked;
        }

        set toggle(isToggled) {
            if (!this.disabled) {
                if (typeof isToggled === "boolean") {
                    this._jellySwitchDiv.checked = isToggled;
                    this.setAttribute('toggled', isToggled);
                } else {
                    console.warn('toggle function of jelly-switch.js file allows only boolean value');
                }
            } else {
                return;
            }
        }

        get disabled() {
            return this._jellySwitchDiv.disabled;
        }

        set disabled(isDisabled) {
            if (typeof isDisabled === "boolean") {
                this._jellySwitchDiv.disabled = isDisabled;
                if(isDisabled)
                this.setAttribute('disabled', isDisabled);
                else
                this.removeAttribute('disabled');
            } else {
                console.warn('disabled function of jelly-switch.js file allows only boolean value');
            }
        }

        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case 'toggled':
                    if (newValue === 'true' || newValue === 'false') {
                        this.setAttribute('aria-checked', newValue);
                        this.dispatchEvent(new CustomEvent("toggle", {
                            bubbles: true,
                            detail: {
                                value: newValue
                            }
                        }));
                    }
                    break;
                case 'disabled':
                    if (newValue === 'true') {
                        this.setAttribute('aria-disabled', newValue);
                            this.removeAttribute('tabindex');
                            this.blur();
                    }
                     else
                        {
                            this.setAttribute('aria-disabled',false)
                            this.setAttribute('tabindex',0);
                        }
                    break;
            }

        }
        _handleClickAndToggle() {
            if (!this.disabled)
                this.toggle = this._jellySwitchDiv.checked;
        }
        _handleKeyPress(event) {
            if (!this.disabled) {
                if (event.altKey)
                    return;

                switch (event.keyCode) {
                    case KEYCODE.SPACE:
                        event.preventDefault();
                        this._jellySwitchDiv.checked = !this._jellySwitchDiv.checked;
                        this.toggle = this._jellySwitchDiv.checked;
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
        customElements.define('jelly-switch', jellySwitch);
    }
})();