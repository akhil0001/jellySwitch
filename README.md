# jelly-switch
A simple, customizable and jellified switch built as web component using ES6 javascript 
![jelly-switch-demo](https://raw.githubusercontent.com/akhil0001/jellySwitch/master/demo-1.gif)

This micro web component(~1.7kB) can be used for any framework

# Try Now
Play with the component
[![Edit jelly-switch component demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ryl1qzxn0m)
<!---
```
<custom-element-demo>
  <template>
    <link rel="import" href="../demo/index.html">
    <div style="height: 200px">
      <next-code-block></next-code-block>
    </div
  </template>
</custom-element-demo>
```
-->
```html
<jelly-switch></jelly-switch>
```
# Install
### 1. via npm
```
npm i jelly-switch
```
(or)
### 2.via script tag

```html
<script src ="https://unpkg.com/jelly-switch@0.1.4/lib/index.js"></script>
```

# Usage

### 1.Import into module script(required only for npm install):

```javascript
import { jellySwitch } from "jelly-switch"
```
### 2.Use it in your web page like any other HTML element
```html
<label for="js1">Did you like it?</label>   
<jelly-switch id="js1"></jelly-switch>
```
```css
/* This code is to vertically align the label and switch */
#js1
{
    vertical-align:middle;
}
label,#js1
{
  display: inline-block;
}

```
# API

## Attributes

- `toggled`

 Add this attribute to set the switch to toggled / checked mode i.e., equivalent to 'checked' attribute of input type 
 ```html
  <jelly-switch id="js1" toggled></jellyswitch>
  ```
  (or)
 ```javascript
js1.toggled = true
``` 
- `disabled`

Add this attribute to disable the switch and the opacity will be decreased to half and user can not interact with the switch and cursor will be changed to 'not-allowed'
```html
<jelly-switch id ="js1" disabled></jellyswitch>
(or)
```

```javascript
js1.disabled = true;
```
## Styling

The switch component can be styled as a normal and regular HTML element in CSS. There are list of CSS properties below with the default values

| CSS variables | default value | description |
|---------------|---------------|-------------|
|`--off-color ` | #FF4651       | background color of switch when the switch is off or its value is set to false. Can assign any color to rgba, hex values |
|`--on-color ` | #11C75D       | background color of switch when the switch is on or its value is set to true. Can assign any color to rgba, hex values |
|`--onHandle-color ` | #FFFFFF      | background color of switch Handle when the switch is on or its value is set to true. Can assign any color to rgba, hex values |
|`--offHandle-color ` | #FFFFFF     | background color of switch Handle when the switch is off or its value is set to false. Can assign any color to rgba, hex values |

The CSS variables can be set dynamically. For example, refer the following snippet
```javascript
document.documentElement.style.setProperty('--off-color', 'rgba(25,89,79,0.7');
```
## Events

- `toggle`

    - The toggle event is triggered when the user toggles the switches either by
       -  clicking on the switch (or)
       -  pressing `space` on the keyboard when the switch is focused
    - The present value can be accessed from `event.detail.value` as shown in the below example


```javascript
document.documentElement.addEventListener('toggle',handleToggle(e));
```
or

```html
<jelly-switch onToggle="return handleToggle(e)"></jelly-switch>
```
and value can be obtained as follows

```javascript
function handleToggle(e)
{
    //The value after the user toggles the switch can be accessed from the below code
    console.log('The present value of switch is '+e.detail.value);
    //here e is the event object 
}
```

# Accessibility
- ARIA has been handled


# ToDos
 - [x] Handle keyboard `space` event
 - [x] Add box-shadow to focus 
 - [x] Accessibility check
 - [x] Basic Unit testing 
 - [x] Lazy property handling
 - [x] Documentation
 - [x] npm publish
 - [ ] Adding unit test cases
 - [ ] handling drag event

# License
[MIT License](https://github.com/akhil0001/jellySwitch/blob/master/LICENSE) (c) [Akhil Sai](https://codepen.io/akhil_001/)

Made with ❤️ by Akhil 