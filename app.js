// Features of this application
/* 
1)Generate hex color by clicking a button.
2)Can be copied the hex color.
3)User can enter a hex code and generate the corresponding color.
*/

// global variable
let div = null;

//random hex color generator function
function generateHexColor() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

// generate toast message
function generateToastMessage(msg) {
    div = document.createElement("div");
    div.innerText = msg;
    div.className = "toast-message toast-message-slide-in";
    document.body.appendChild(div);

    div.addEventListener("click", function () {
        div.classList.remove("toast-message-slide-in");
        div.classList.add("toast-message-slide-out");

        div.addEventListener("animationend", function () {
            div.remove();
            div = null;
        });
    });
}

// Check valid hex color
function isValidHex(color) {
    if (color.length !== 7) return false;
    if (color[0] !== '#') return false;

    color = color.substring(1);
    return /^[0-9A-Fa-f]{6}$/i.test(color);
}

// change the background color;
function chageTheBackgroundColor() {
    const root = document.getElementById("root");
    const changeBtn = document.getElementById("change-btn");
    const copyBtn = document.getElementById("copy-btn");
    const output = document.getElementById("output");

    changeBtn.addEventListener("click", function () {
        const bgColor = generateHexColor();
        root.style.backgroundColor = bgColor;
        output.value = bgColor;
    })

    copyBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(output.value);
        if (div != null) {
            div.remove();
            div = null;
        }
        if (isValidHex(output.value)) {
            generateToastMessage(`${output.value} copied`);
        }
        else {
            alert("Invalid Hex Color Code");
        }
    })

    output.addEventListener("keyup", function (e) {
        const color = e.target.value;
        if (color && isValidHex(color)) {
            root.style.backgroundColor = color;
        }
    })
}

chageTheBackgroundColor();


