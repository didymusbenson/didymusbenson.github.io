var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function encrypt() {
    var message = document.getElementById("message").value.toUpperCase();
    var key = document.getElementById("key").value.toUpperCase();
    var secretMessage = '',
        keychar = ' ',
        charToChange = ' ',
        keyIndex = 0,
        charIndex = 0,
        k = 0,
        shift;

    for (i = 0; i < message.length; i++) {
        if (!alphabet.includes(message[i])) {
            // Most likely spaces, but also any non-alphabetical characters like " and ?
            secretMessage += message[i];
        } else {
            if (k == key.length) {
                k = 0;
            }
            charToChange = message[i];
            keychar = key[k];

            for (j = 0; j < alphabet.length; j++) {
                if (charToChange == alphabet[j]) {
                    charIndex = j;
                }
                if (keychar == alphabet[j]) {
                    keyIndex = j;
                }
            }
            shift = charIndex + keyIndex;
            if (shift >= 26) {
                shift -= 26;
            }
            secretMessage += alphabet[shift];
            k += 1;
        }
    }
    document.getElementById("output").innerHTML = secretMessage;

}

function decrypt() {
    var message = document.getElementById("message").value.toUpperCase();
    var key = document.getElementById("key").value.toUpperCase();
    var secretMessage = '',
        keychar = ' ',
        charToChange = ' ',
        keyIndex = 0,
        charIndex = 0,
        k = 0,
        shift;

    for (i = 0; i < message.length; i++) {
        if (!alphabet.includes(message[i])) {
            secretMessage += message[i];
        } else {
            if (k == key.length) {
                k = 0;
            }
            charToChange = message[i];
            keychar = key[k];
            for (j = 0; j < alphabet.length; j++) {
                if (charToChange == alphabet[j]) {
                    charIndex = j;
                }
                if (keychar == alphabet[j]) {
                    keyIndex = j;
                }
            }
            shift = charIndex - keyIndex;
            if (shift < 0) {
                shift += 26;
            }
            secretMessage += alphabet[shift];
            k += 1;
        }
    }
    document.getElementById("output").innerHTML = secretMessage;
}
