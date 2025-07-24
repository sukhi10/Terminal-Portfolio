const terminalOutput = document.getElementById('output');
const commandInput = document.getElementById('command-input');

// Replace with your actual Google Drive resume link
const RESUME_URL = "https://drive.google.com/file/d/1pJI2lht-dkRzWxq8a9Cu4cwQmKg5DYoH/view?usp=drive_link";
const LINKEDIN_URL = "https://www.linkedin.com/in/sukhman-shergill";

// All terminal commands
const commands = {
    help: `
Type one of the following:<br>
- <span class="command-option" onclick="processCommand('about')">about</span><br>
- <span class="command-option" onclick="processCommand('resume')">resume</span><br>
- <span class="command-option" onclick="processCommand('projects')">projects</span><br>
- <span class="command-option" onclick="processCommand('goals')">goals</span><br>
- <span class="command-option" onclick="processCommand('download')">download</span><br>
- <span class="command-option" onclick="processCommand('linkedin')">linkedin</span><br>
- <span class="command-option" onclick="processCommand('clear')">clear</span>
    `,

    about: `
Hi, I'm Sukhman Shergill!<br>
I'm a Computer Science student at York University passionate about full-stack development, AI, and product design.<br><br>
Course Projects:<br>
- Facial Recognition with OpenCV and Python<br>
- Password Generator with dynamic strength feedback<br>
- Web horror game using JavaScript & Node.js<br><br>
Welcome to my terminal portfolio — type "help" to explore more!
    `,

    resume: `
<b>Resume Summary:</b><br>
<b>Education:</b> BSc in Computer Science, York University (Expected 2026)<br>
<b>Experience:</b><br>
- Product Management Intern, Black Business Alberta — Boosted engagement by 25%<br>
- Research Assistant, SEIZE — Conducted research on student co-ops<br>
- Software Engineer Intern, Blue Eclipse — Built full-stack projects with React, Node.js, and Vue<br><br>
<b>Skills:</b><br>
Languages: Python, JavaScript, Java, C, Go<br>
Tools: GitHub, OpenCV, Node.js, React, Linux
    `,

    projects: `
<b>Projects:</b><br>
1. <b>Facial Recognition App</b> — Real-time face detection and labeling using OpenCV<br>
2. <b>Password Generator</b> — Neon-styled password generator with real-time strength feedback<br>
3. <b>Point-and-Click Horror Game</b> — Web game built with Node.js, HTML/CSS, and JavaScript
    `,

    goals: `
<b>My Goals:</b><br>
1. <b>Build Meaningful Products:</b> Create tools that improve life through automation and design.<br><br>
2. <b>Master Full-Stack Development:</b> Grow backend expertise while building sleek, modern frontends.<br><br>
3. <b>Explore AI + Computer Vision:</b> Apply machine learning to creative and ethical use cases.<br><br>
4. <b>Become a Tech Leader:</b> Keep mentoring, collaborating, and guiding others through project-based learning.<br><br>
5. <b>Work with Impactful Teams:</b> Join a mission-driven company where I can build and grow at scale.
    `,

    download: `
<b>Downloading resume...</b><br>
If nothing happens, <a href="${RESUME_URL}" class="command-link" target="_blank" download>click here</a> to manually download.
    `,

    linkedin: `
<b>Opening LinkedIn profile...</b><br>
<a href="${LINKEDIN_URL}" target="_blank" class="command-link">Click here if it didn’t open automatically</a>.
    `,

    clear: ''
};

// Typing animation that respects HTML tags
function typeOutput(html, delay = 10) {
    const div = document.createElement("div");
    terminalOutput.appendChild(div);

    let i = 0;
    let isTag = false;
    let tagBuffer = '';

    function typeChar() {
        if (i >= html.length) {
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            return;
        }

        const char = html[i++];
        if (char === '<') {
            isTag = true;
        }

        if (isTag) {
            tagBuffer += char;
            if (char === '>') {
                div.innerHTML += tagBuffer;
                tagBuffer = '';
                isTag = false;
            }
        } else {
            div.innerHTML += char;
        }

        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        setTimeout(typeChar, delay);
    }

    typeChar();
}

// 🔥 Instant HTML output (for working links)
function showImmediateOutput(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Command processor
function processCommand(command) {
    const trimmedCommand = command.trim().toLowerCase();
    const response = commands[trimmedCommand];

    if (response !== undefined) {
        if (trimmedCommand === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        }

        // Auto-download for 'download'
        if (trimmedCommand === 'download') {
            const link = document.createElement("a");
            link.href = RESUME_URL;
            link.download = "SukhmanShergill_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showImmediateOutput(response);
            return;
        }

        // Auto-open for 'linkedin'
        if (trimmedCommand === 'linkedin') {
            window.open(LINKEDIN_URL, '_blank');
            showImmediateOutput(response);
            return;
        }

        // Typing for all others
        typeOutput(response);
    } else {
        typeOutput(`Command not found: ${command}. Type "help" to see available options.`);
    }

    commandInput.value = '';
}

// Echo command and execute
commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = commandInput.value;
        terminalOutput.innerHTML += `<div>user$ ${command}</div>`;
        processCommand(command);
    }
});
