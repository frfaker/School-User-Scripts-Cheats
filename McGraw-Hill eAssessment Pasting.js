// ==UserScript==
// @name         Mcgraw hill pasting
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Allows pasting on mrs cayce's bum ass online check
// @author       frfaker
// @match        *://*.mhedu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const pasteButton = document.createElement('button');
    pasteButton.textContent = '📋';
    pasteButton.style.position = 'fixed';
    pasteButton.style.top = '12px';
    pasteButton.style.right = '12px';
    pasteButton.style.padding = '6px 10px';
    pasteButton.style.border = 'none';
    pasteButton.style.borderRadius = '6px';
    pasteButton.style.background = 'linear-gradient(to right, #001f3f, #003366)';
    pasteButton.style.color = 'white';
    pasteButton.style.fontWeight = 'bold';
    pasteButton.style.fontSize = '12px';
    pasteButton.style.cursor = 'pointer';
    pasteButton.style.zIndex = 9999;
    pasteButton.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
    pasteButton.style.transition = 'transform 0.1s ease';

    pasteButton.onmouseenter = () => pasteButton.style.transform = 'scale(1.05)';
    pasteButton.onmouseleave = () => pasteButton.style.transform = 'scale(1)';

    document.body.appendChild(pasteButton);

    pasteButton.addEventListener('click', async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            const answerBox = document.querySelector('textarea, input[type="text"]');
            if (answerBox) {
                answerBox.value = clipboardText;
                answerBox.dispatchEvent(new Event('input', { bubbles: true }));
                answerBox.dispatchEvent(new Event('change', { bubbles: true }));
            } else {
                alert('Answer box not found.');
            }
        } catch (err) {
            alert('Failed to read clipboard. Make sure you gave permission.');
            console.error(err);
        }
    });
})();
