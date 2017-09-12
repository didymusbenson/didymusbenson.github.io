var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function encrypt(message, key) {

    var secretMessage = '',
        keychar = ' ',
        charToChange = ' ',
        keyIndex = 0,
        charIndex = 0,
        k = 0,
        shift;

    for (i = 0; i < message.Length; i++) {

        if (alphabet - notcontains message[i]) {
            secretMessage += message[i];
        } else {
            if (k == key.Length) {
                k = 0;
            }
            charToChange = message[i];
            keychar = key[k];

            for (j = 0; j < alphabet.Length; j++) {
                if (charToChange == alphabet[j]) {
                    charIndex = j;
                }
                if (keychar == alphabet[j]) {
                    keyIndex = j;
                }
            }

            shift = charIndex + keyIndex;
            if (shift >= 26) {
                shift = shift - 26;
            }

            secretMessage += alphabet[shift];
            k += 1;
        }


    }
    return secretMessage
}

function decrypt(message, key) {

    var secretMessage = '',
        keychar = ' ',
        charToChange = ' ',
        keyIndex = 0,
        charIndex = 0,
        k = 0,
        shift;

    for (i = 0; i < message.Length; i++) {

        if (alphabet - notcontains message[i]) {
            secretMessage += message[i];
        } else {
            if (k == key.Length) {
                k = 0;
            }
            charToChange = message[i];
            keychar = key[k];

            for (j = 0; j < alphabet.Length; j++) {
                if (charToChange == alphabet[j]) {
                    charIndex = j;
                }
                if (keychar == alphabet[j]) {
                    keyIndex = j;
                }
            }

            shift = charIndex - keyIndex;
            if (shift < 0) {
                shift = shift + 26;
            }
            secretMessage += alphabet[shift];
            k += 1;
        }


    }
    return secretMessage;
}
