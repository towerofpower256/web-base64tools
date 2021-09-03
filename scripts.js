

// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str)
        .replace(/\W/g, "")
        .split('')
        .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

// Base64 a file
function b64FileAsync(file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function getContentFromDataURL(a) {
    // Remove stuff at the front
    // data:text/xml;base64,
    return a.substring(a.indexOf(",") + 1)
}

/*
 * DIY tab functionality
 */
function changeTab(tabName) {
    var tabs = document.getElementsByClassName("tab");
    for (var i=0; i < tabs.length; i++) {
        var tabElem = tabs[i];
        var tabId = tabElem.id;
        tabElem.style.display = (tabId == "tab-"+tabName ? "block" : "none");
    }

    var tabSelectors = document.getElementsByClassName("tab-select");
    for (var i=0; i < tabSelectors.length; i++) {
        var tabSelectorElem = tabSelectors[i];
        var tabSelectorId = tabSelectorElem.id;
        if (tabSelectorId == "tab-select-"+tabName) {
            tabSelectorElem.classList.add("active");
        } else {
            tabSelectorElem.classList.remove("active");
        }
    }
}