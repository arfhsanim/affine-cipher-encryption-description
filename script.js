
function encrypt() {
    var inputText = document.getElementById("input").value;
    var keyA = parseInt(document.getElementById("keyA").value);
    var keyB = parseInt(document.getElementById("keyB").value);

    var encryptedText = affineEncrypt(inputText, keyA, keyB);
    document.getElementById("output").value = encryptedText;
}

function decrypt() {
    var inputText = document.getElementById("input").value;
    var keyA = parseInt(document.getElementById("keyA").value);
    var keyB = parseInt(document.getElementById("keyB").value);

    var decryptedText = affineDecrypt(inputText, keyA, keyB);
    document.getElementById("output").value = decryptedText;
}

function reset() {
    document.getElementById("input").value = "";
    document.getElementById("keyA").value = "";
    document.getElementById("keyB").value = "";
    document.getElementById("output").value = "";
}

function affineEncrypt(text, keyA, keyB) {
    var encryptedText = "";
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);
        if (isUppercase(charCode)) {
            encryptedText += String.fromCharCode((keyA * (charCode - 65) + keyB) % 26 + 65);
        } else if (isLowercase(charCode)) {
            encryptedText += String.fromCharCode((keyA * (charCode - 97) + keyB) % 26 + 97);
        } else {
            encryptedText += text.charAt(i);
        }
    }
    return encryptedText;
}

function affineDecrypt(text, keyA, keyB) {
    var decryptedText = "";
    var multiplicativeInverse = 0;
    for (var i = 0; i < 26; i++) {
        if ((keyA * i) % 26 === 1) {
            multiplicativeInverse = i;
            break;
        }
    }
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);
        if (isUppercase(charCode)) {
            decryptedText += String.fromCharCode(((multiplicativeInverse * ((charCode - 65) - keyB + 26)) % 26) + 65);
        } else if (isLowercase(charCode)) {
            decryptedText += String.fromCharCode(((multiplicativeInverse * ((charCode - 97) - keyB + 26)) % 26) + 97);
        } else {
            decryptedText += text.charAt(i);
        }
    }
    return decryptedText;
}

function isUppercase(charCode) {
    return charCode >= 65 && charCode <= 90;
}

function isLowercase(charCode) {
    return charCode >= 97 && charCode <= 122;
}
