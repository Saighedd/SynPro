// ==UserScript==
// @name                SynPro
// @namespace           https://github.com/Saighedd/SynPro
// @icon                https://raw.githubusercontent.com/Saighedd/SynPro/main/SynProLogo.png
// @updateURL           github.com/Saighedd/SynPro/raw/main/SynPro.user.js
// @downloadURL         github.com/Saighedd/SynPro/raw/main/SynPro.user.js
// @supportURL          https://github.com/Saighedd/SynPro/issues
// @match               https://www.syntax.eco/*
// @version             1.6.1
// @author              Saighed
// @grant               GM_xmlhttpRequest
// @description         This is a Userscript for all users adding cool and useful code for some and some not. Created by @Saighed
// @description:russian Это пользовательский скрипт для всех пользователей, добавляющий классный и полезный код для некоторых, а для некоторых нет. Создано @Saighed
// ==/UserScript==

(function() {
    'use strict';

    function addBootstrapIcon(container, className) {
        var icon = document.createElement("i");
        icon.className = className;
        icon.classList.add("me-2");
        container.insertBefore(icon, container.firstChild);
    }

    function setBCCode(spanElement, url) {
        if (spanElement) {
            spanElement.style.backgroundImage = `url(${url})`;
            spanElement.style.width = '28px';
            spanElement.style.height = '28px';
        }
    }

    setBCCode(document.querySelector('span.rbx-icon-negative-obc'), 'https://svgur.com/i/z5K.svg');
    setBCCode(document.querySelector('span.rbx-icon-tbc'), 'https://svgur.com/i/z5K.svg');
    setBCCode(document.querySelector('span.rbx-icon-bc'), 'https://svgur.com/i/z5K.svg');

    function makeAPIRequest() {
        const urlParts = window.location.pathname.split('/');
        const userId = urlParts[urlParts.length - 2];

        if (window.location.pathname === `/users/${userId}/profile`) {
            const apiUrl = `https://www.syntax.eco/Game/LuaWebService/HandleSocialRequest.ashx?playerid=${userId}&groupid=15&method=IsInGroup`;

            GM_xmlhttpRequest({
                method: 'GET',
                url: apiUrl,
                onload: function(response) {
                    if (response.status !== 200) return;

                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(response.responseText, 'text/xml');
                    const isUserInGroup = xmlDoc.querySelector('Value').textContent === 'true';

                    if (isUserInGroup) {
                        const styleElement = document.createElement('style');
                        styleElement.textContent = '.ms-2 { margin-left: 0.2!important; }';
                        document.head.appendChild(styleElement);

                        const dFlexElement = document.querySelector('div.d-flex.align-items-center');

                        if (dFlexElement) {
                            const iconElement = document.createElement('i');
                            iconElement.className = 'bi bi-hammer text-white';
                            iconElement.style.cssText = 'font-size: 28px; margin-left: 0.5rem!important';

                            dFlexElement.insertBefore(iconElement, dFlexElement.firstElementChild.nextSibling);
                        }
                    }
                }
            });
        }
    }

    var subnavBar = document.querySelector(".subnav-bar");
    var navbarUl = document.querySelector(".navbar-nav");
    var containerDiv = document.querySelector(".row.text-center.ms-auto.p-2.rounded-2.me-2");

    if (subnavBar) {
        var bcElementsToRemove = subnavBar.querySelectorAll('a[href="/users/1469/profile"], a[href="https://discord.gg/cBMp3Z52UM"]');
        bcElementsToRemove.forEach(function(element) {
            element.remove();
        });
    }

    var style = document.createElement('style');
    style.innerHTML = `
    .admin-box {
        border-radius: 8px;
    }
    `;
    document.head.appendChild(style);

    if (containerDiv) {
        addBootstrapIcon(containerDiv.querySelector(":scope > p:nth-child(1)"), "bi bi-people-fill");
        addBootstrapIcon(containerDiv.querySelector(":scope > p:nth-child(2)"), "bi bi-controller");
        addBootstrapIcon(containerDiv.querySelector(":scope > p:nth-child(3)"), "bi bi-database-check");
        addBootstrapIcon(containerDiv.querySelector(":scope > p:nth-child(4)"), "bi bi-person-plus");
        addBootstrapIcon(containerDiv.querySelector(":scope > p:nth-child(5)"), "bi bi-hourglass-split");

        containerDiv.style.width = "800px";
        containerDiv.style.height = "106.39px";
    }

    makeAPIRequest();
})();

(function() {
    'use strict';

    function addBootstrapIcon(container, className) {
        var icon = document.createElement("i");
        icon.className = className;
        icon.classList.add("me-2");
        container.insertBefore(icon, container.firstChild);
    }
})();
(function() {
    'use strict';

    const buttons = document.querySelectorAll('form button.btn');
    const currentURL = window.location.href;

    if (currentURL.includes("*://www.syntax.eco/pending-assets")) {
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const form = button.closest('form');

            if (form) {
                const formData = new FormData(form);

                const assetId = findAssetId(form);

                fetch(form.action, {
                    method: form.method,
                    body: formData
                }).then(response => {
                    const elementsToRemove = form.closest('.border.p-2.mb-1');
                    elementsToRemove.remove();
                    if (document.querySelectorAll('.border.p-2.mb-1').length === 0) {
                        location.reload();
                    }
                }).catch(error => {
                    console.error('Error:', error);
                });
            }
        });
    });
    function findAssetId(form) {
        const assetIdElement = form.querySelector('.text-white');
        if (assetIdElement) {
            return assetIdElement.textContent;
        }
        return null;
    }
}})();
