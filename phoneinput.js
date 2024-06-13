document.addEventListener("DOMContentLoaded", function () {
    const phoneInputs = document.querySelectorAll('input[data-tel-input]');
    const phoneForm = document.getElementById('phoneForm');
    const checkedText = document.querySelector('.checked_text');

    // Пример ранее высланных промокодов для валидации
    const sentPromoCodes = new Set();

    const getInputNumbersValue = (input) => input.value.replace(/\D/g, '');

    const onPhonePaste = (e) => {
        const input = e.target;
        const inputNumbersValue = getInputNumbersValue(input);
        const pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            const pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
                return;
            }
        }
    };

    const onPhoneInput = (e) => {
        const input = e.target;
        let inputNumbersValue = getInputNumbersValue(input);
        const selectionStart = input.selectionStart;
        let formattedInputValue = "";

        if (!inputNumbersValue) {
            return (input.value = "");
        }

        if (input.value.length !== selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            const firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
            formattedInputValue = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    };

    const onPhoneKeyDown = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode === 8 && inputValue.length === 1) {
            e.target.value = "";
        }
    };

    const normalizePhoneNumber = (inputValue) => {
        if (inputValue.startsWith("8")) {
            return "+7" + inputValue.substr(1);
        } else if (inputValue.startsWith("7")) {
            return "+7" + inputValue.substr(1);
        } else if (inputValue.startsWith("+7")) {
            return inputValue;
        }
        return inputValue;
    };

    const validatePhoneNumber = (inputValue) => {
        const normalizedNumber = normalizePhoneNumber(inputValue);
        const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        return phoneRegex.test(normalizedNumber);
    };

    for (const phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }

    document.querySelector('.button').addEventListener('click', function (e) {
        e.preventDefault();
        const phoneInput = phoneForm.querySelector('input[data-tel-input]');
        const phoneNumber = phoneInput.value;

        if (validatePhoneNumber(phoneNumber)) {
            if (sentPromoCodes.has(phoneNumber)) {
                checkedText.textContent = "На этот номер уже выслан промокод";
                checkedText.style.color = "red";
            } else {
                sentPromoCodes.add(phoneNumber);
                checkedText.textContent = "Промокод выслан на ваш номер";
                checkedText.style.color = "green";  // Добавлено это для цвета
            }
        } else {
            checkedText.textContent = "Ошибка ввода номера телефона";
            checkedText.style.color = "red";
         

        }
    });
});
