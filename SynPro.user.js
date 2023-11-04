// ==UserScript==
// @name        SynPro
// @namespace   https://github.com/Saighedd/SynPro
// @match       https://www.syntax.eco/*
// @version     1.0
// @author      Saighed
// @grant        GM_xmlhttpRequest
// @description  This is a Userscript is for all users adding cool and useful code for some and some not. Created by @Saighed
// ==/UserScript==

(function() {
    'use strict';

    function addBootstrapIcon(container, className) {
        var icon = document.createElement("i");
        icon.className = className;
        icon.classList.add("me-2");
        container.insertBefore(icon, container.firstChild);
    }

    function makeAPIRequest() {
        const urlParts = window.location.pathname.split('/');
        const userId = urlParts[urlParts.length - 2];
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
                    // Creds: S A I G H E D
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

    function setBCCode(spanElement, url) {
        if (spanElement) {
            spanElement.style.backgroundImage = `url(${url})`;
            spanElement.style.width = '28px';
            spanElement.style.height = '28px';
        }
    }

    var subnavBar = document.querySelector(".subnav-bar");
    var navbarUl = document.querySelector(".navbar-nav");
    var containerDiv = document.querySelector(".row.text-center.ms-auto.p-2.rounded-2.me-2");

    if (subnavBar) {
        var elementsToRemove = subnavBar.querySelectorAll('a[href="/users/1469/profile"], a[href="https://discord.gg/cBMp3Z52UM"]');
        elementsToRemove.forEach(function(element) {
            element.remove();
        });

        if (navbarUl) {
            var newLink = document.createElement("a");
            newLink.href = "/admin";
            newLink.textContent = "Admin";
            newLink.className = "nav-link active";
            newLink.setAttribute("aria-current", "page");

            var newLi = document.createElement("li");
            newLi.className = "nav-item";
            newLi.appendChild(newLink);

            navbarUl.appendChild(newLi);
        }
    }

    var style = document.createElement('style');
    style.innerHTML = `
    .admin-box {
        border-radius: 8px;
    }
    `;
    document.head.appendChild(style);

    setBCCode(document.querySelector('span.rbx-icon-negative-obc.ms-2'), 'https://svgur.com/i/z5K.svg');
    setBCCode(document.querySelector('span.rbx-icon-tbc.ms-2'), 'https://svgur.com/i/z5K.svg');
    setBCCode(document.querySelector('span.rbx-icon-bc.ms-2'), 'https://svgur.com/i/z5K.svg');

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
