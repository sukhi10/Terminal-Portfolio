const terminalOutput = document.getElementById("output");
const commandInput = document.getElementById("command-input");
const headerChips = document.querySelectorAll(".header-chip");

const RESUME_URL =
  "https://drive.google.com/file/d/1JX1ZnR1LDC-FAMkckHyrwOIZkAGXYwU-/view?usp=sharing";
const LINKEDIN_URL = "https://www.linkedin.com/in/sukhman-shergill";

const commands = {
  help: `
    <div class="output-block">
      <div class="section-title">Available commands</div>
      <div class="muted">Click one below or type it manually.</div>
      <div class="command-grid">
        <span class="command-option" onclick="processCommand('about')">about</span>
        <span class="command-option" onclick="processCommand('resume')">resume</span>
        <span class="command-option" onclick="processCommand('projects')">projects</span>
        <span class="command-option" onclick="processCommand('goals')">goals</span>
        <span class="command-option" onclick="processCommand('download')">download</span>
        <span class="command-option" onclick="processCommand('linkedin')">linkedin</span>
        <span class="command-option" onclick="processCommand('clear')">clear</span>
      </div>
    </div>
  `,

  about: `
    <div class="output-block">
      <div class="section-title">About me</div>
      <div>Hi, I'm <strong>Sukhman Shergill</strong>.</div>
      <div>I’m a Computer Science student at York University interested in full-stack development, AI, and product design.</div>
      <ul class="item-list">
        <li>Building projects that feel polished, useful, and interactive</li>
        <li>Interested in software engineering, frontend experiences, and practical AI</li>
        <li>Always trying to improve both design and code quality</li>
      </ul>
    </div>
  `,

  resume: `
    <div class="output-block">
      <div class="section-title">Resume summary</div>
      <div><strong>Education:</strong> BSc in Computer Science, York University (Expected August 2027)</div>
      <br />
      <div><strong>Experience:</strong></div>
      <ul class="item-list">
        <li>Software Dev / IT Analyst Intern, Arrow Machine and Fabrication Group</li>
        <li>Software Development Intern, EZSave</li>
        <li>Software Engineer Intern, Blue Eclipse</li>
      </ul>
      <div><strong>Skills:</strong> Python, JavaScript, Java, C, Go, GitHub, Node.js, React, Linux, OpenCV, PowerShell</div>
    </div>
  `,

  projects: `
    <div class="output-block">
      <div class="section-title">Projects</div>
      <ul class="item-list">
        <li><strong>Facial Recognition App</strong> — real-time face detection and labeling with OpenCV</li>
        <li><strong>Password Generator</strong> — neon-style generator with dynamic strength feedback</li>
        <li><strong>Point-and-Click Horror Game</strong> — browser-based game built with JavaScript, HTML/CSS, and Node.js</li>
      </ul>
    </div>
  `,

  goals: `
    <div class="output-block">
      <div class="section-title">Goals</div>
      <ul class="item-list">
        <li>Build meaningful products that solve real problems</li>
        <li>Keep growing as a full-stack developer</li>
        <li>Explore AI and computer vision in thoughtful ways</li>
        <li>Work with strong teams and keep learning fast</li>
      </ul>
    </div>
  `,

  download: `
    <div class="output-block">
      <div class="section-title">Resume</div>
      <div>Downloading resume...</div>
      <div class="muted">
        If the file does not start, 
        <a href="${RESUME_URL}" class="command-link" target="_blank" rel="noopener noreferrer">open it here</a>.
      </div>
    </div>
  `,

  linkedin: `
    <div class="output-block">
      <div class="section-title">LinkedIn</div>
      <div>Opening LinkedIn profile...</div>
      <div class="muted">
        If nothing opens,
        <a href="${LINKEDIN_URL}" class="command-link" target="_blank" rel="noopener noreferrer">click here</a>.
      </div>
    </div>
  `,

  clear: ""
};

function scrollToBottom() {
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function typeOutput(html, delay = 8) {
  const div = document.createElement("div");
  div.className = "output-block";
  terminalOutput.appendChild(div);

  let i = 0;
  let isTag = false;
  let tagBuffer = "";

  function typeChar() {
    if (i >= html.length) {
      scrollToBottom();
      return;
    }

    const char = html[i++];

    if (char === "<") {
      isTag = true;
    }

    if (isTag) {
      tagBuffer += char;

      if (char === ">") {
        div.innerHTML += tagBuffer;
        tagBuffer = "";
        isTag = false;
      }
    } else {
      div.innerHTML += char;
    }

    scrollToBottom();
    setTimeout(typeChar, delay);
  }

  typeChar();
}

function showImmediateOutput(html) {
  const div = document.createElement("div");
  div.className = "output-block";
  div.innerHTML = html;
  terminalOutput.appendChild(div);
  scrollToBottom();
}

function echoCommand(command) {
  const line = document.createElement("div");
  line.className = "command-echo";
  line.textContent = `user$ ${command}`;
  terminalOutput.appendChild(line);
  scrollToBottom();
}

function processCommand(command) {
  const trimmedCommand = command.trim().toLowerCase();

  if (!trimmedCommand) {
    commandInput.value = "";
    return;
  }

  const response = commands[trimmedCommand];

  if (response !== undefined) {
    if (trimmedCommand === "clear") {
      terminalOutput.innerHTML = "";
      commandInput.value = "";
      return;
    }

    if (trimmedCommand === "download") {
      window.open(RESUME_URL, "_blank", "noopener,noreferrer");
      showImmediateOutput(response);
      commandInput.value = "";
      return;
    }

    if (trimmedCommand === "linkedin") {
      window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
      showImmediateOutput(response);
      commandInput.value = "";
      return;
    }

    typeOutput(response);
  } else {
    typeOutput(`
      <div class="output-block">
        <div>Command not found: <strong>${trimmedCommand}</strong></div>
        <div class="muted">Type <span class="command-option" onclick="processCommand('help')">help</span> to see available options.</div>
      </div>
    `);
  }

  commandInput.value = "";
}

commandInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const command = commandInput.value.trim();

    if (!command) return;

    echoCommand(command);
    processCommand(command);
  }
});

headerChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const command = chip.dataset.command;
    echoCommand(command);
    processCommand(command);
    commandInput.focus();
  });
});

window.addEventListener("load", () => {
  showImmediateOutput(`
    <div class="output-block">
      <div class="section-title">Welcome</div>
      <div>Welcome to Sukhman Shergill’s portfolio terminal.</div>
      <div class="muted">Use the quick commands above or type <span class="command-option" onclick="processCommand('help')">help</span> to get started.</div>
    </div>
  `);

  commandInput.focus();
});

window.processCommand = processCommand;