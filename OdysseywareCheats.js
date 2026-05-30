// ==UserScript==
// @name         Odysseyware Helper
// @namespace    http://tampermonkey.net/
// @version      7.3
// @match        https://robco.owschools.com/owsoo/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        @keyframes pulseGlow {
            0% { box-shadow: 0 0 5px #ff003c, 0 0 10px #ff003c, 0 0 20px #ff003c; }
            50% { box-shadow: 0 0 10px #ff6600, 0 0 25px #ff6600, 0 0 50px #ff6600; }
            100% { box-shadow: 0 0 5px #ff003c, 0 0 10px #ff003c, 0 0 20px #ff003c; }
        }
        @keyframes copyGlow {
            0% { box-shadow: 0 0 5px #00ff88, 0 0 10px #00ff88, 0 0 20px #00ff88; }
            50% { box-shadow: 0 0 10px #00ffcc, 0 0 25px #00ffcc, 0 0 50px #00ffcc; }
            100% { box-shadow: 0 0 5px #00ff88, 0 0 10px #00ff88, 0 0 20px #00ff88; }
        }
        @keyframes answerGlow {
            0% { box-shadow: 0 0 5px #aa00ff, 0 0 10px #aa00ff, 0 0 20px #aa00ff; }
            50% { box-shadow: 0 0 10px #ff00ff, 0 0 25px #ff00ff, 0 0 50px #ff00ff; }
            100% { box-shadow: 0 0 5px #aa00ff, 0 0 10px #aa00ff, 0 0 20px #aa00ff; }
        }
        @keyframes menuGlow {
            0% { box-shadow: 0 0 5px #00aaff, 0 0 10px #00aaff, 0 0 20px #00aaff; }
            50% { box-shadow: 0 0 10px #0055ff, 0 0 25px #0055ff, 0 0 50px #0055ff; }
            100% { box-shadow: 0 0 5px #00aaff, 0 0 10px #00aaff, 0 0 20px #00aaff; }
        }
        @keyframes questionsGlow {
            0% { box-shadow: 0 0 5px #ff9900, 0 0 10px #ff9900, 0 0 20px #ff9900; }
            50% { box-shadow: 0 0 10px #ffcc00, 0 0 25px #ffcc00, 0 0 50px #ffcc00; }
            100% { box-shadow: 0 0 5px #ff9900, 0 0 10px #ff9900, 0 0 20px #ff9900; }
        }
        @keyframes borderSpin {
            0% { border-color: #ff003c #ff6600 #ffff00 #ff003c; }
            25% { border-color: #ff6600 #ffff00 #ff003c #ff6600; }
            50% { border-color: #ffff00 #ff003c #ff6600 #ffff00; }
            75% { border-color: #ff003c #ff6600 #ffff00 #ff003c; }
            100% { border-color: #ff6600 #ffff00 #ff003c #ff6600; }
        }
        @keyframes copyBorderSpin {
            0% { border-color: #00ff88 #00ffcc #00aaff #00ff88; }
            25% { border-color: #00ffcc #00aaff #00ff88 #00ffcc; }
            50% { border-color: #00aaff #00ff88 #00ffcc #00aaff; }
            75% { border-color: #00ff88 #00ffcc #00aaff #00ff88; }
            100% { border-color: #00ffcc #00aaff #00ff88 #00ffcc; }
        }
        @keyframes answerBorderSpin {
            0% { border-color: #aa00ff #ff00ff #ff00aa #aa00ff; }
            25% { border-color: #ff00ff #ff00aa #aa00ff #ff00ff; }
            50% { border-color: #ff00aa #aa00ff #ff00ff #ff00aa; }
            75% { border-color: #aa00ff #ff00ff #ff00aa #aa00ff; }
            100% { border-color: #ff00ff #ff00aa #aa00ff #ff00ff; }
        }
        @keyframes menuBorderSpin {
            0% { border-color: #00aaff #0055ff #00ffff #00aaff; }
            25% { border-color: #0055ff #00ffff #00aaff #0055ff; }
            50% { border-color: #00ffff #00aaff #0055ff #00ffff; }
            75% { border-color: #00aaff #0055ff #00ffff #00aaff; }
            100% { border-color: #0055ff #00ffff #00aaff #0055ff; }
        }
        @keyframes questionsBorderSpin {
            0% { border-color: #ff9900 #ffcc00 #ffff00 #ff9900; }
            25% { border-color: #ffcc00 #ffff00 #ff9900 #ffcc00; }
            50% { border-color: #ffff00 #ff9900 #ffcc00 #ffff00; }
            75% { border-color: #ff9900 #ffcc00 #ffff00 #ff9900; }
            100% { border-color: #ffcc00 #ffff00 #ff9900 #ffcc00; }
        }
        @keyframes textFlicker {
            0%, 100% { opacity: 1; }
            92% { opacity: 1; }
            93% { opacity: 0.4; }
            94% { opacity: 1; }
            96% { opacity: 0.4; }
            97% { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateX(120px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInLeft {
            from { transform: translateX(-120px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(500%); }
        }
        @keyframes panelPopOut {
            0% { transform: scale(0.7) translateY(30px); opacity: 0; }
            60% { transform: scale(1.03) translateY(-4px); opacity: 1; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes panelPopIn {
            0% { transform: scale(1) translateY(0); opacity: 1; }
            100% { transform: scale(0.7) translateY(30px); opacity: 0; }
        }
        @keyframes scanlinePanel {
            0% { top: -10%; }
            100% { top: 110%; }
        }
        #ow-answer-btn {
            position: fixed; bottom: 230px; right: 20px; z-index: 99999;
            padding: 11px 18px; border-radius: 10px; font-size: 13px; font-weight: 900;
            font-family: 'Courier New', monospace; cursor: pointer; letter-spacing: 1.5px;
            text-transform: uppercase; color: #fff; border: 2px solid #aa00ff;
            background: linear-gradient(270deg, #0d001a, #2a003d, #0d001a, #aa00ff, #0d001a);
            background-size: 400% 400%;
            animation: gradientShift 3s ease infinite, answerGlow 2s ease-in-out infinite, answerBorderSpin 2s linear infinite, slideIn 0.3s ease-out;
            overflow: hidden; text-shadow: 0 0 8px #aa00ff, 0 0 16px #ff00ff; transition: transform 0.1s;
        }
        #ow-answer-btn:hover { transform: scale(1.07); filter: brightness(1.3); }
        #ow-answer-btn:active { transform: scale(0.95); }
        #ow-answer-btn .scanline {
            position: absolute; top: 0; left: 0; width: 100%; height: 20%;
            background: linear-gradient(transparent, rgba(170,0,255,0.2), transparent);
            animation: scanline 2s linear infinite; pointer-events: none;
        }
        #ow-questions-btn {
            position: fixed; bottom: 160px; right: 20px; z-index: 99999;
            padding: 11px 18px; border-radius: 10px; font-size: 13px; font-weight: 900;
            font-family: 'Courier New', monospace; cursor: pointer; letter-spacing: 1.5px;
            text-transform: uppercase; color: #fff; border: 2px solid #ff9900;
            background: linear-gradient(270deg, #1a0900, #3d1f00, #1a0900, #ff9900, #1a0900);
            background-size: 400% 400%;
            animation: gradientShift 3s ease infinite, questionsGlow 2s ease-in-out infinite, questionsBorderSpin 2s linear infinite, slideIn 0.35s ease-out;
            overflow: hidden; text-shadow: 0 0 8px #ff9900, 0 0 16px #ffcc00; transition: transform 0.1s;
        }
        #ow-questions-btn:hover { transform: scale(1.07); filter: brightness(1.3); }
        #ow-questions-btn:active { transform: scale(0.95); }
        #ow-questions-btn .scanline {
            position: absolute; top: 0; left: 0; width: 100%; height: 20%;
            background: linear-gradient(transparent, rgba(255,153,0,0.2), transparent);
            animation: scanline 2s linear infinite; pointer-events: none;
        }
        #ow-copy-btn {
            position: fixed; bottom: 90px; right: 20px; z-index: 99999;
            padding: 11px 18px; border-radius: 10px; font-size: 13px; font-weight: 900;
            font-family: 'Courier New', monospace; cursor: pointer; letter-spacing: 1.5px;
            text-transform: uppercase; color: #fff; border: 2px solid #00ff88;
            background: linear-gradient(270deg, #001a0e, #003d1f, #001a0e, #00ff88, #001a0e);
            background-size: 400% 400%;
            animation: gradientShift 3s ease infinite, copyGlow 2s ease-in-out infinite, copyBorderSpin 2s linear infinite, slideIn 0.5s ease-out;
            overflow: hidden; text-shadow: 0 0 8px #00ff88, 0 0 16px #00ffcc; transition: transform 0.1s;
        }
        #ow-copy-btn:hover { transform: scale(1.07); filter: brightness(1.3); }
        #ow-copy-btn:active { transform: scale(0.95); }
        #ow-copy-btn .scanline {
            position: absolute; top: 0; left: 0; width: 100%; height: 20%;
            background: linear-gradient(transparent, rgba(0,255,136,0.15), transparent);
            animation: scanline 2s linear infinite; pointer-events: none;
        }
        #ow-verify-btn {
            position: fixed; bottom: 20px; right: 20px; z-index: 99999;
            padding: 11px 18px; border-radius: 10px; font-size: 13px; font-weight: 900;
            font-family: 'Courier New', monospace; cursor: pointer; letter-spacing: 1.5px;
            text-transform: uppercase; color: #fff; border: 2px solid #ff003c;
            background: linear-gradient(270deg, #1a0000, #3d0000, #1a0000, #ff003c, #1a0000);
            background-size: 400% 400%;
            animation: gradientShift 3s ease infinite, pulseGlow 2s ease-in-out infinite, borderSpin 2s linear infinite, textFlicker 5s infinite, slideIn 0.4s ease-out;
            overflow: hidden; text-shadow: 0 0 8px #ff003c, 0 0 16px #ff6600; transition: transform 0.1s;
        }
        #ow-verify-btn:hover { transform: scale(1.07); filter: brightness(1.3); }
        #ow-verify-btn:active { transform: scale(0.95); }
        #ow-verify-btn .scanline {
            position: absolute; top: 0; left: 0; width: 100%; height: 20%;
            background: linear-gradient(transparent, rgba(255,80,0,0.15), transparent);
            animation: scanline 2s linear infinite; pointer-events: none;
        }
        #ow-menu-btn {
            position: fixed; bottom: 20px; left: 20px; z-index: 99999;
            padding: 11px 18px; border-radius: 10px; font-size: 13px; font-weight: 900;
            font-family: 'Courier New', monospace; cursor: pointer; letter-spacing: 1.5px;
            text-transform: uppercase; color: #fff; border: 2px solid #00aaff;
            background: linear-gradient(270deg, #00091a, #00183d, #00091a, #00aaff, #00091a);
            background-size: 400% 400%;
            animation: gradientShift 3s ease infinite, menuGlow 2s ease-in-out infinite, menuBorderSpin 2s linear infinite, slideInLeft 0.4s ease-out;
            overflow: hidden; text-shadow: 0 0 8px #00aaff, 0 0 16px #00ffff; transition: transform 0.1s;
        }
        #ow-menu-btn:hover { transform: scale(1.07); filter: brightness(1.3); }
        #ow-menu-btn:active { transform: scale(0.95); }
        #ow-menu-btn .scanline {
            position: absolute; top: 0; left: 0; width: 100%; height: 20%;
            background: linear-gradient(transparent, rgba(0,170,255,0.2), transparent);
            animation: scanline 2s linear infinite; pointer-events: none;
        }
        #ow-toast {
            position: fixed; bottom: 310px; right: 20px; z-index: 99999;
            padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 900;
            font-family: 'Courier New', monospace; letter-spacing: 1px; text-transform: uppercase;
            color: #fff; background: rgba(0,0,0,0.85); border: 1px solid #aa00ff;
            text-shadow: 0 0 6px #aa00ff; box-shadow: 0 0 10px #aa00ff;
            opacity: 0; transition: opacity 0.3s; pointer-events: none;
        }
        #ow-toast.show { opacity: 1; }
        #ow-panel {
            position: fixed; bottom: 80px; left: 20px; z-index: 99998;
            width: 540px; max-height: 70vh;
            background: linear-gradient(135deg, #020818 0%, #050f2e 40%, #080820 100%);
            border: 1px solid #00aaff;
            box-shadow: 0 0 30px rgba(0,170,255,0.3), 0 0 60px rgba(0,170,255,0.1), inset 0 0 30px rgba(0,0,0,0.5);
            border-radius: 14px; overflow: hidden; display: none; flex-direction: column;
            font-family: 'Courier New', monospace;
        }
        #ow-panel.open {
            display: flex;
            animation: panelPopOut 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        #ow-panel.closing {
            display: flex;
            animation: panelPopIn 0.2s ease-in forwards;
        }
        #ow-panel-scanline {
            position: absolute; left: 0; width: 100%; height: 6%;
            background: linear-gradient(transparent, rgba(0,170,255,0.06), transparent);
            animation: scanlinePanel 4s linear infinite; pointer-events: none; z-index: 1;
        }
        #ow-panel-header {
            display: flex; align-items: center; justify-content: space-between;
            padding: 14px 18px 10px; border-bottom: 1px solid rgba(0,170,255,0.3);
            background: rgba(0,170,255,0.05);
        }
        #ow-panel-title {
            font-size: 14px; font-weight: 900; letter-spacing: 2px;
            color: #00aaff; text-shadow: 0 0 10px #00aaff, 0 0 20px #00ffff; text-transform: uppercase;
        }
        #ow-panel-close {
            background: none; border: none; color: #00aaff; font-size: 18px;
            cursor: pointer; font-family: 'Courier New', monospace; font-weight: 900;
            text-shadow: 0 0 8px #00aaff; transition: transform 0.1s; padding: 0 4px;
        }
        #ow-panel-close:hover { transform: scale(1.3); color: #ff003c; text-shadow: 0 0 8px #ff003c; }
        #ow-tab-bar { display: flex; border-bottom: 1px solid rgba(0,170,255,0.2); background: rgba(0,0,0,0.3); }
        .ow-tab {
            flex: 1; padding: 10px 6px; text-align: center; font-size: 10px;
            font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase;
            color: rgba(0,170,255,0.5); cursor: pointer; border: none; background: none;
            font-family: 'Courier New', monospace; transition: all 0.2s; border-bottom: 2px solid transparent;
        }
        .ow-tab:hover { color: #00aaff; background: rgba(0,170,255,0.05); }
        .ow-tab.active { color: #00ffff; border-bottom: 2px solid #00aaff; text-shadow: 0 0 8px #00ffff; background: rgba(0,170,255,0.08); }
        #ow-panel-body { flex: 1; overflow-y: auto; padding: 18px; position: relative; z-index: 2; }
        #ow-panel-body::-webkit-scrollbar { width: 4px; }
        #ow-panel-body::-webkit-scrollbar-track { background: transparent; }
        #ow-panel-body::-webkit-scrollbar-thumb { background: #00aaff; border-radius: 2px; }
        .ow-tab-content { display: none; }
        .ow-tab-content.active { display: block; }
        .ow-section-label {
            font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
            color: #00aaff; text-shadow: 0 0 6px #00aaff; margin-bottom: 8px; margin-top: 16px;
            border-left: 2px solid #00aaff; padding-left: 8px;
        }
        .ow-section-label:first-child { margin-top: 0; }
        .ow-prompt-box {
            background: rgba(0,0,0,0.5); border: 1px solid rgba(0,170,255,0.25);
            border-radius: 8px; padding: 12px; font-size: 11px; color: #aad4ff;
            line-height: 1.6; white-space: pre-wrap; word-break: break-word; margin-bottom: 8px;
        }
        .ow-copy-prompt-btn {
            display: block; width: 100%; margin-top: 8px;
            background: rgba(0,170,255,0.1); border: 1px solid rgba(0,170,255,0.4);
            border-radius: 6px; color: #00aaff; font-family: 'Courier New', monospace;
            font-size: 10px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase;
            padding: 6px; cursor: pointer; transition: all 0.2s;
        }
        .ow-copy-prompt-btn:hover { background: rgba(0,170,255,0.25); color: #00ffff; }
        .ow-how-step { display: flex; gap: 12px; margin-bottom: 14px; align-items: flex-start; }
        .ow-step-num {
            min-width: 26px; height: 26px; border-radius: 50%;
            background: linear-gradient(135deg, #00aaff, #0055ff);
            display: flex; align-items: center; justify-content: center;
            font-size: 11px; font-weight: 900; color: #fff; box-shadow: 0 0 8px #00aaff; flex-shrink: 0;
        }
        .ow-step-text { font-size: 11px; color: #aad4ff; line-height: 1.6; padding-top: 3px; }
        .ow-step-text b { color: #00ffff; text-shadow: 0 0 4px #00ffff; }
        .ow-hotkey-row {
            display: flex; justify-content: space-between; align-items: center;
            padding: 8px 10px; border-radius: 6px; margin-bottom: 6px;
            background: rgba(0,0,0,0.3); border: 1px solid rgba(0,170,255,0.15);
        }
        .ow-hotkey-name { font-size: 11px; color: #aad4ff; }
        .ow-hotkey-badge { font-size: 10px; font-weight: 900; padding: 3px 8px; border-radius: 4px; letter-spacing: 1px; }
        .badge-purple { background: rgba(170,0,255,0.2); color: #ff00ff; border: 1px solid #aa00ff; text-shadow: 0 0 4px #ff00ff; }
        .badge-green { background: rgba(0,255,136,0.1); color: #00ff88; border: 1px solid #00ff88; text-shadow: 0 0 4px #00ff88; }
        .badge-red { background: rgba(255,0,60,0.15); color: #ff6666; border: 1px solid #ff003c; text-shadow: 0 0 4px #ff003c; }
        .badge-blue { background: rgba(0,170,255,0.15); color: #00aaff; border: 1px solid #00aaff; text-shadow: 0 0 4px #00aaff; }
        .badge-orange { background: rgba(255,153,0,0.15); color: #ffcc00; border: 1px solid #ff9900; text-shadow: 0 0 4px #ffcc00; }
        .ow-tip-box {
            background: rgba(255,200,0,0.05); border: 1px solid rgba(255,200,0,0.2);
            border-radius: 8px; padding: 10px 12px; font-size: 11px; color: #ffe88a; line-height: 1.6; margin-bottom: 8px;
        }
        .ow-tip-box b { color: #ffcc00; }
        .ow-cheat-row {
            display: flex; justify-content: space-between; padding: 7px 10px;
            border-radius: 6px; margin-bottom: 5px; font-size: 11px;
            background: rgba(0,0,0,0.3); border: 1px solid rgba(0,170,255,0.1);
        }
        .ow-cheat-key { color: #00ffff; font-weight: 900; }
        .ow-cheat-val { color: #aad4ff; }
        .ow-divider { height: 1px; background: linear-gradient(to right, transparent, rgba(0,170,255,0.3), transparent); margin: 14px 0; }
    `;
    document.head.appendChild(style);

    const toast = document.createElement('div');
    toast.id = 'ow-toast';
    document.body.appendChild(toast);

    function showToast(msg, color) {
        toast.textContent = msg;
        toast.style.borderColor = color || '#aa00ff';
        toast.style.textShadow = `0 0 6px ${color || '#aa00ff'}`;
        toast.style.boxShadow = `0 0 10px ${color || '#aa00ff'}`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    function scrapeQuestions() {
        const result = [];
        document.querySelectorAll('div[id^="problemMain_"]').forEach(prob => {
            const qid = prob.id.replace('problemMain_', '');
            const typeEl = prob.querySelector('.pType');
            const rawType = typeEl ? typeEl.textContent.trim() : 'Unknown';
            const promptEl = prob.querySelector('[data-type="prompt"]');
            const prompt = promptEl
                ? promptEl.innerText.trim().replace(/\s+/g, ' ')
                : (prob.querySelector('.problemBody')?.innerText?.trim().replace(/\s+/g, ' ').substring(0, 500) || '');
            const obj = { id: qid, type: rawType, prompt };

            if(rawType === 'MultipleChoice') {
                obj.options = [];
                prob.querySelectorAll('.option-choice').forEach(opt => {
                    const radio = opt.querySelector('input[type="radio"]');
                    const label = opt.querySelector('label');
                    if(radio && label) obj.options.push({
                        id: radio.id,
                        text: label.innerText.trim().replace(/\s+/g, ' ')
                    });
                });
            } else if(rawType === 'TextMultipleChoice') {
                obj.selects = [];
                obj.fullContext = prob.querySelector('.problemBody')?.innerText?.trim().replace(/\s+/g, ' ') || '';
                prob.querySelectorAll('select[id*="TextMultipleChoice"]').forEach(sel => {
                    const opts = [];
                    sel.querySelectorAll('option').forEach(o => {
                        if(o.value) opts.push({ value: o.value, text: o.innerText.trim() });
                    });
                    obj.selects.push({ id: sel.id, options: opts });
                });
            } else if(rawType === 'CheckboxMultipleChoice' || rawType === 'Checkbox' || rawType === 'MultipleSelect') {
                obj.options = [];
                prob.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                    const label = prob.querySelector(`label[for="${cb.id}"]`);
                    obj.options.push({ id: cb.id, text: label ? label.innerText.trim() : '' });
                });
            } else if(rawType === 'Matching') {
                obj.fullContext = prob.querySelector('.problemBody')?.innerText?.trim().replace(/\s+/g, ' ') || '';
                obj.inputs = [];
                prob.querySelectorAll('input[name^="Matching."]').forEach(inp => {
                    obj.inputs.push({ id: inp.id, name: inp.name });
                });
                obj.selects = [];
                prob.querySelectorAll('select').forEach(sel => {
                    const opts = [];
                    sel.querySelectorAll('option').forEach(o => {
                        if(o.value) opts.push({ value: o.value, text: o.innerText.trim() });
                    });
                    obj.selects.push({ id: sel.id, name: sel.name, options: opts });
                });
            } else if(rawType === 'Paragraph' || rawType === 'Essay') {
                obj.skip = true;
            } else {
                obj.fullContext = prob.querySelector('.problemBody')?.innerText?.trim().replace(/\s+/g, ' ').substring(0, 500) || '';
                obj.inputs = [];
                prob.querySelectorAll('input[type="text"], input[type="number"]').forEach(inp => {
                    obj.inputs.push({ id: inp.id, name: inp.name, placeholder: inp.placeholder || '' });
                });
                if(obj.inputs.length === 0) delete obj.inputs;
            }

            result.push(obj);
        });
        return result;
    }

    function waitForQuestionVisible(qid, timeout) {
        return new Promise(resolve => {
            const check = () => {
                const el = document.getElementById(`problemMain_${qid}`);
                if(el && el.style.display !== 'none' && el.offsetParent !== null) {
                    resolve(true);
                    return true;
                }
                return false;
            };
            if(check()) return;
            let elapsed = 0;
            const interval = setInterval(() => {
                if(check()) { clearInterval(interval); return; }
                elapsed += 50;
                if(elapsed >= timeout) { clearInterval(interval); resolve(false); }
            }, 50);
        });
    }

    function navigateToQuestion(qid) {
        const navBtn = document.getElementById(`button_problemMain_${qid}`);
        if(navBtn) navBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }

    function clickNextQuestion() {
        const nextBtn = document.querySelector('.submitAnswerButton');
        if(nextBtn) {
            nextBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            nextBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            nextBtn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        }
    }

    function dismissAnyDialog() {
        const noBtn = document.querySelector('#turnItIn .noButton, #verify .noButton');
        if(noBtn && noBtn.offsetParent !== null) {
            noBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            return true;
        }
        return false;
    }

    function pick(id) {
        const el = document.getElementById(id);
        if(!el){ console.warn("Missing radio:", id); return false; }
        el.checked = true;
        ["mousedown","click","change","input","blur"].forEach(ev =>
            el.dispatchEvent(new Event(ev, { bubbles: true })));
        return true;
    }

    function setSelect(id, value) {
        const el = document.getElementById(id);
        if(!el){ console.warn("Missing select:", id); return false; }
        el.value = value;
        try { submitAnswer(id); } catch(e) {}
        ["change","input"].forEach(ev =>
            el.dispatchEvent(new Event(ev, { bubbles: true })));
        return true;
    }

    function checkBox(id) {
        const el = document.getElementById(id);
        if(!el){ console.warn("Missing checkbox:", id); return false; }
        el.checked = true;
        ["change","input"].forEach(ev =>
            el.dispatchEvent(new Event(ev, { bubbles: true })));
        return true;
    }

    function setInput(id, value) {
        let el = document.getElementById(id);
        if(!el) el = document.querySelector(`input[name="${id}"]`);
        if(!el){ console.warn("Missing input:", id); return false; }
        el.value = value;
        el.focus();
        ["input","change","blur","keyup"].forEach(ev =>
            el.dispatchEvent(new Event(ev, { bubbles: true })));
        return true;
    }

    function setMatchingInput(name, value) {
        let el = document.querySelector(`input[name="Matching.${name}"]`);
        if(!el) el = document.querySelector(`input[name="${name}"]`);
        if(!el){ console.warn("Missing matching input:", name); return false; }
        el.value = value;
        ["input","change","blur"].forEach(ev =>
            el.dispatchEvent(new Event(ev, { bubbles: true })));
        return true;
    }

    async function runFromJSON(json) {
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        const entries = Object.entries(json);

        for(let i = 0; i < entries.length; i++) {
            const [qid, q] = entries[i];

            if(q.type === 'skip' || !q.answer) continue;

            navigateToQuestion(qid);
            await sleep(400);
            await waitForQuestionVisible(qid, 2000);
            await sleep(200);

            dismissAnyDialog();
            await sleep(100);

            let answered = false;

            if(q.type === 'radio') {
                answered = pick(q.answer);
                await sleep(200);

            } else if(q.type === 'select') {
                const prob = document.getElementById(`problemMain_${qid}`);
                let selId = null;
                if(prob) {
                    const sel = prob.querySelector('select[id*="TextMultipleChoice"]');
                    if(sel) selId = sel.id;
                }
                if(!selId) {
                    selId = document.querySelector(`select[id^="tc1_${qid}"]`)?.id
                        || document.querySelector(`select[id*="${qid}_TextMultipleChoice"]`)?.id
                        || document.querySelector(`select[id*="${qid}"]`)?.id;
                }
                if(selId) {
                    answered = setSelect(selId, q.answer);
                    await sleep(250);
                } else {
                    console.warn("Could not find select for question", qid);
                }

            } else if(q.type === 'select_multi') {
                const prob = document.getElementById(`problemMain_${qid}`);
                const selects = prob ? prob.querySelectorAll('select[id*="TextMultipleChoice"]') : [];
                if(selects.length > 0) {
                    for(const [key, val] of Object.entries(q.answer)) {
                        const selId = `${key}_${qid}_TextMultipleChoice`;
                        setSelect(selId, val);
                        await sleep(200);
                    }
                    answered = true;
                } else {
                    console.warn("Could not find selects for question", qid);
                }

            } else if(q.type === 'checkbox') {
                const ids = Array.isArray(q.answer) ? q.answer : [q.answer];
                for(const cbid of ids) {
                    checkBox(cbid);
                    await sleep(100);
                }
                answered = ids.length > 0;
                await sleep(150);

            } else if(q.type === 'input') {
                if(typeof q.answer === 'string' || typeof q.answer === 'number') {
                    const prob = document.getElementById(`problemMain_${qid}`);
                    const inp = prob ? prob.querySelector(
                        'input[type="text"], input[type="number"], input:not([type="radio"]):not([type="checkbox"]):not([type="hidden"])'
                    ) : null;
                    if(inp) {
                        answered = setInput(inp.id || inp.name, String(q.answer));
                        await sleep(150);
                    }
                } else if(typeof q.answer === 'object') {
                    for(const [inputId, inputVal] of Object.entries(q.answer)) {
                        setInput(inputId, String(inputVal));
                        await sleep(150);
                    }
                    answered = true;
                }

            } else if(q.type === 'matching') {
                for(const [name, val] of Object.entries(q.answer)) {
                    setMatchingInput(name, val);
                    await sleep(150);
                }
                answered = true;
            }

            if(answered) {
                await sleep(300);
                dismissAnyDialog();
                await sleep(100);
                clickNextQuestion();
                await sleep(700);
                dismissAnyDialog();
                await sleep(200);
            }
        }

        console.log("Done ✓");
        showToast('✅ All answers submitted', '#aa00ff');
    }

    const CLAUDE_PROMPT = `You are helping autofill an Odysseyware assignment. I will give you a JSON array of question objects scraped directly from the page DOM. Each object contains the question ID, type, prompt text, and all available answer options with their exact element IDs and values.

Respond with ONLY a raw JSON object. No explanation, no markdown, no code blocks. Just raw JSON starting with { and ending with }.

Each key is the question ID string. Each value has "type" and "answer":

MultipleChoice → type "radio", answer is the full radio element ID e.g. "V2_3558547"
TextMultipleChoice with one select → type "select", answer is the exact value attribute string from the options list
TextMultipleChoice with multiple selects → type "select_multi", answer is an object like {"tc1":"value1","tc2":"value2","tc3":"value3"} using the prefix before the underscore and question ID
FillInTheBlank / ShortAnswer / text input → type "input", answer is either a string for single input or an object {"inputId":"value"} for multiple inputs
Matching → type "matching", answer is an object {"matchingName":"value"} where matchingName is the name attribute after "Matching."
CheckboxMultipleChoice → type "checkbox", answer is array of element IDs for all correct options
Paragraph / Essay → type "skip", answer is null
MultipleSelect (checkboxes, select all that apply) → type "checkbox", answer is array of element IDs for ALL correct options

Important:
- For select values use the EXACT value attribute from the options array including URL encoding like %2B2 for +2
- Coefficient of 1 in balancing equations uses value "blank"
- Work out all chemistry math and balancing yourself before answering
- Every single question must have an entry in the JSON even skipped ones
- Do not guess — derive the correct answer from the question text and options provided

Here is the question data:`;

    const CHATGPT_PROMPT = `You are helping autofill an Odysseyware assignment. I will give you a JSON array of question objects scraped directly from the page DOM. Each object contains the question ID, type, prompt text, and all available answer options with their exact element IDs and values.

Respond with ONLY a raw JSON object. No explanation, no markdown, no code blocks. Just raw JSON starting with { and ending with }.

Each key is the question ID string. Each value has "type" and "answer":

MultipleChoice → type "radio", answer is the full radio element ID e.g. "V2_3558547"
TextMultipleChoice with one select → type "select", answer is the exact value attribute string
TextMultipleChoice with multiple selects → type "select_multi", answer is {"tc1":"value1","tc2":"value2"}
FillInTheBlank / text input → type "input", answer is a string for single input or {"inputId":"value"} for multiple
Matching → type "matching", answer is {"matchingName":"value"}
CheckboxMultipleChoice → type "checkbox", answer is array of element IDs
Paragraph / Essay → type "skip", answer is null
MultipleSelect (checkboxes, select all that apply) → type "checkbox", answer is array of element IDs for ALL correct options

Use the EXACT value attribute strings from the options. URL encoded values: +1="%2B1", +2="%2B2", +3="%2B3", -1="-1", -2="-2", coefficient of 1="blank". Work out all chemistry and math yourself. Every question must have an entry.

Here is the question data:`;

    const panel = document.createElement('div');
    panel.id = 'ow-panel';
    panel.innerHTML = `
        <div id="ow-panel-scanline"></div>
        <div id="ow-panel-header">
            <div id="ow-panel-title">⚡ OW Helper v7.3</div>
            <button id="ow-panel-close">✕</button>
        </div>
        <div id="ow-tab-bar">
            <button class="ow-tab active" data-tab="prompts">🤖 AI Prompts</button>
            <button class="ow-tab" data-tab="howto">📖 How To</button>
            <button class="ow-tab" data-tab="cheatsheet">⚡ Cheat Sheet</button>
        </div>
        <div id="ow-panel-body">

            <div class="ow-tab-content active" id="tab-prompts">
                <div class="ow-section-label">Claude (claude.ai)</div>
                <div class="ow-prompt-box" id="claude-prompt-preview"></div>
                <button class="ow-copy-prompt-btn" data-prompt="claude">📋 Copy Claude Prompt</button>
                <div class="ow-divider"></div>
                <div class="ow-section-label">ChatGPT (chat.openai.com)</div>
                <div class="ow-prompt-box" id="chatgpt-prompt-preview"></div>
                <button class="ow-copy-prompt-btn" data-prompt="chatgpt">📋 Copy ChatGPT Prompt</button>
                <div style="margin-top:8px; padding:8px 10px; border-radius:6px; background:rgba(255,60,0,0.08); border:1px solid rgba(255,100,0,0.35); font-size:10px; color:#ffaa55; letter-spacing:0.5px; line-height:1.6;">
                   ⚠️ <b style="color:#ffcc77;">ChatGPT Warning:</b> You must be in <b style="color:#ffcc77;">Developer Mode</b> and have <b style="color:#ffcc77;">Instant Answering</b> enabled for this to work correctly.
                </div>
                <div class="ow-tip-box" style="margin-top:14px;">
                    <b>💡 Workflow:</b> Click <b>📊 Copy Questions</b> → paste the AI prompt into a new chat → paste the question JSON right after it → send. Copy the returned JSON and hit <b>▶ Answer</b>.<br><br>
                    <b>💡 Size:</b> Question JSON is ~2-5% the size of full HTML. Much faster and far fewer tokens.<br><br>
                    <b>💡 All types covered:</b> Radio, dropdowns, text inputs, matching, checkboxes — all handled automatically including Next Question confirmation per answer.
                </div>
            </div>

            <div class="ow-tab-content" id="tab-howto">
                <div class="ow-section-label">Workflow</div>
                <div class="ow-how-step">
                    <div class="ow-step-num">1</div>
                    <div class="ow-step-text">Open the assignment and go to the <b>Questions tab</b> so all questions are loaded on the page.</div>
                </div>
                <div class="ow-how-step">
                    <div class="ow-step-num">2</div>
                    <div class="ow-step-text">Click <b>📊 Copy Questions</b>. This scrapes every question's ID, type, prompt, and all answer option IDs and values.</div>
                </div>
                <div class="ow-how-step">
                    <div class="ow-step-num">3</div>
                    <div class="ow-step-text">Open <b>Claude</b> or <b>ChatGPT</b>. Go to the AI Prompts tab and copy the right prompt. Paste it into a new chat.</div>
                </div>
                <div class="ow-how-step">
                    <div class="ow-step-num">4</div>
                    <div class="ow-step-text">Paste the question JSON right after the prompt in the same message and send it.</div>
                </div>
                <div class="ow-how-step">
                    <div class="ow-step-num">5</div>
                    <div class="ow-step-text">The AI returns a compact <b>JSON answer map</b>. Copy the entire thing.</div>
                </div>
                <div class="ow-how-step">
                    <div class="ow-step-num">6</div>
                    <div class="ow-step-text">Back on Odysseyware, click <b>▶ Answer</b>. It navigates to each question, fills the answer, waits for it to register, then clicks <b>Next Question</b> to confirm — just like a real student would.</div>
                </div>
                <div class="ow-how-step">
                    <div class="ow-step-num">7</div>
                    <div class="ow-step-text">If anything looks wrong, click <b>⚡ Emergency Verify</b> to re-fire all answer events.</div>
                </div>
                <div class="ow-divider"></div>
                <div class="ow-section-label">Button Guide</div>
                <div class="ow-hotkey-row"><span class="ow-hotkey-name">▶ Answer</span><span class="ow-hotkey-badge badge-purple">Fills + confirms each answer via Next Question</span></div>
                <div class="ow-hotkey-row"><span class="ow-hotkey-name">📊 Copy Questions</span><span class="ow-hotkey-badge badge-orange">Scrapes all question data</span></div>
                <div class="ow-hotkey-row"><span class="ow-hotkey-name">📋 Copy HTML</span><span class="ow-hotkey-badge badge-green">Full page HTML fallback</span></div>
                <div class="ow-hotkey-row"><span class="ow-hotkey-name">⚡ Emergency Verify</span><span class="ow-hotkey-badge badge-red">Re-fires all answer events</span></div>
                <div class="ow-hotkey-row"><span class="ow-hotkey-name">☰ Menu</span><span class="ow-hotkey-badge badge-blue">Opens this panel</span></div>
                <div class="ow-tip-box" style="margin-top:14px;">
                    <b>⚠️ Note:</b> If clipboard is denied, click the lock icon in your address bar and allow clipboard for this site.<br><br>
                    <b>⚠️ Note:</b> <b>📋 Copy HTML</b> is still available as a fallback if an AI needs more context, but <b>📊 Copy Questions</b> is always preferred.
                </div>
            </div>

            <div class="ow-tab-content" id="tab-cheatsheet">
                <div class="ow-section-label">URL Encoded Answer Values</div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">+1</span><span class="ow-cheat-val">%2B1</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">+2</span><span class="ow-cheat-val">%2B2</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">+3</span><span class="ow-cheat-val">%2B3</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">+6</span><span class="ow-cheat-val">%2B6</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">+7</span><span class="ow-cheat-val">%2B7</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">-1</span><span class="ow-cheat-val">-1</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">-2</span><span class="ow-cheat-val">-2</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">Coefficient of 1</span><span class="ow-cheat-val">blank</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">Any number</span><span class="ow-cheat-val">as-is e.g. "3", "32.00"</span></div>
                <div class="ow-divider"></div>
                <div class="ow-section-label">Answer JSON Types</div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">radio</span><span class="ow-cheat-val">MultipleChoice → full element ID</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">select</span><span class="ow-cheat-val">Single dropdown → value string</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">select_multi</span><span class="ow-cheat-val">Multi dropdown → {"tc1":"v1","tc2":"v2"}</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">input</span><span class="ow-cheat-val">Text/number → string or {"id":"val"}</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">matching</span><span class="ow-cheat-val">Matching → {"name":"value"}</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">checkbox</span><span class="ow-cheat-val">Checkboxes → ["id1","id2"]</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">skip</span><span class="ow-cheat-val">Essay/Graphic → null</span></div>
                <div class="ow-divider"></div>
                <div class="ow-section-label">Unit 5 Progress</div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">1. Stoichiometry</span><span class="ow-cheat-val" style="color:#00ff88;">✅ Complete</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">2. Valence Structure</span><span class="ow-cheat-val" style="color:#00ff88;">✅ Complete</span></div>
                <div class="ow-cheat-row"><span class="ow-cheat-key">3. Quiz 1</span><span class="ow-cheat-val" style="color:#00ff88;">✅ Complete</span></div>
            </div>

        </div>
    `;
    document.body.appendChild(panel);

    panel.querySelector('#claude-prompt-preview').textContent = CLAUDE_PROMPT;
    panel.querySelector('#chatgpt-prompt-preview').textContent = CHATGPT_PROMPT;

    panel.querySelectorAll('.ow-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            panel.querySelectorAll('.ow-tab').forEach(t => t.classList.remove('active'));
            panel.querySelectorAll('.ow-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
        });
    });

    panel.querySelector('#ow-panel-close').addEventListener('click', () => {
        panel.classList.remove('open');
        panel.classList.add('closing');
        setTimeout(() => { panel.classList.remove('closing'); panel.style.display = 'none'; }, 200);
    });

    panel.querySelectorAll('.ow-copy-prompt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.dataset.prompt === 'claude' ? CLAUDE_PROMPT : CHATGPT_PROMPT;
            navigator.clipboard.writeText(text).then(() => {
                btn.textContent = '✅ Copied!';
                showToast('📋 Prompt copied', '#00aaff');
                setTimeout(() => {
                    btn.textContent = btn.dataset.prompt === 'claude' ? '📋 Copy Claude Prompt' : '📋 Copy ChatGPT Prompt';
                }, 2000);
            });
        });
    });

    function togglePanel() {
        if(panel.classList.contains('open')) {
            panel.classList.remove('open');
            panel.classList.add('closing');
            setTimeout(() => { panel.classList.remove('closing'); panel.style.display = 'none'; }, 200);
        } else {
            panel.style.display = 'flex';
            panel.classList.remove('closing');
            void panel.offsetWidth;
            panel.classList.add('open');
        }
    }

    const menuBtn = document.createElement('button');
    menuBtn.id = 'ow-menu-btn';
    menuBtn.innerHTML = '<span class="scanline"></span>☰ Menu';
    menuBtn.addEventListener('click', togglePanel);

    const answerBtn = document.createElement('button');
    answerBtn.id = 'ow-answer-btn';
    answerBtn.innerHTML = '<span class="scanline"></span>▶ Answer';
    answerBtn.addEventListener('click', () => {
        navigator.clipboard.readText().then(text => {
            if(!text.trim()) { showToast('⚠️ Clipboard empty', '#ff6600'); return; }
            const trimmed = text.trim();
            if(trimmed.startsWith('{')) {
                try {
                    const json = JSON.parse(trimmed);
                    runFromJSON(json);
                    answerBtn.innerHTML = '<span class="scanline"></span>⏳ Running...';
                    showToast('⚡ Executing answers', '#aa00ff');
                    setTimeout(() => { answerBtn.innerHTML = '<span class="scanline"></span>▶ Answer'; }, 8000);
                } catch(e) {
                    showToast('❌ Invalid JSON', '#ff003c');
                    console.error('JSON parse error:', e);
                    answerBtn.innerHTML = '<span class="scanline"></span>▶ Answer';
                }
            } else {
                try {
                    new Function(trimmed)();
                    answerBtn.innerHTML = '<span class="scanline"></span>✅ Executed!';
                    showToast('⚡ Script injected', '#aa00ff');
                    setTimeout(() => { answerBtn.innerHTML = '<span class="scanline"></span>▶ Answer'; }, 2000);
                } catch(e) {
                    showToast('❌ Script error', '#ff003c');
                    console.error('Answer button error:', e);
                    answerBtn.innerHTML = '<span class="scanline"></span>▶ Answer';
                }
            }
        }).catch(() => showToast('⚠️ Clipboard denied', '#ff6600'));
    });

    const questionsBtn = document.createElement('button');
    questionsBtn.id = 'ow-questions-btn';
    questionsBtn.innerHTML = '<span class="scanline"></span>📊 Copy Questions';
    questionsBtn.addEventListener('click', () => {
        const data = scrapeQuestions();
        if(data.length === 0) { showToast('⚠️ No questions found', '#ff6600'); return; }
        navigator.clipboard.writeText(JSON.stringify(data)).then(() => {
            questionsBtn.innerHTML = `<span class="scanline"></span>✅ ${data.length} Questions!`;
            showToast(`📊 ${data.length} questions copied`, '#ff9900');
            setTimeout(() => { questionsBtn.innerHTML = '<span class="scanline"></span>📊 Copy Questions'; }, 2000);
        });
    });

    const copyBtn = document.createElement('button');
    copyBtn.id = 'ow-copy-btn';
    copyBtn.innerHTML = '<span class="scanline"></span>📋 Copy HTML';
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(document.documentElement.outerHTML).then(() => {
            copyBtn.innerHTML = '<span class="scanline"></span>✅ Copied!';
            showToast('📡 HTML transmitted', '#00ff88');
            setTimeout(() => { copyBtn.innerHTML = '<span class="scanline"></span>📋 Copy HTML'; }, 2000);
        });
    });

    const verifyBtn = document.createElement('button');
    verifyBtn.id = 'ow-verify-btn';
    verifyBtn.innerHTML = '<span class="scanline"></span>⚡ Emergency Verify';
    verifyBtn.addEventListener('click', () => {
        let count = 0;
        document.querySelectorAll('input[type="radio"]:checked').forEach(el => {
            count++;
            el.checked = false;
            ["mousedown","click","change","input","blur"].forEach(ev => el.dispatchEvent(new Event(ev, {bubbles:true})));
            setTimeout(() => {
                el.checked = true;
                ["mousedown","click","change","input","blur"].forEach(ev => el.dispatchEvent(new Event(ev, {bubbles:true})));
            }, 150);
        });
        document.querySelectorAll('select[id*="TextMultipleChoice"]').forEach(el => {
            const val = el.value; if(!val) return; count++;
            el.value = '';
            ["change","input"].forEach(ev => el.dispatchEvent(new Event(ev, {bubbles:true})));
            setTimeout(() => {
                el.value = val;
                try { submitAnswer(el.id); } catch(e) {}
                ["change","input"].forEach(ev => el.dispatchEvent(new Event(ev, {bubbles:true})));
            }, 150);
        });
        document.querySelectorAll('input[type="text"], input[type="number"]').forEach(el => {
            const val = el.value; if(!val) return; count++;
            ["input","change","blur"].forEach(ev => el.dispatchEvent(new Event(ev, {bubbles:true})));
        });
        showToast(count > 0 ? `✅ Verified ${count} answer${count > 1 ? 's' : ''}` : '⚠️ Nothing to verify', '#ff003c');
    });

    document.body.appendChild(answerBtn);
    document.body.appendChild(questionsBtn);
    document.body.appendChild(copyBtn);
    document.body.appendChild(verifyBtn);
    document.body.appendChild(menuBtn);
})();
