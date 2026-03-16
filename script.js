const terminalOutput = document.getElementById("output");
const commandInput = document.getElementById("command-input");
const headerChips = document.querySelectorAll(".header-chip");

const RESUME_URL =
  "https://drive.google.com/file/d/1XjjeBgTPv9oztbfaDmInByYkAnLv9cG9/view?usp=sharing";
const LINKEDIN_URL = "https://www.linkedin.com/in/sukhman-shergill";
const GITHUB_URL = "https://github.com/sukhi10";

const commands = {
  help: `
    <div class="output-block">
      <div class="section-title">Available commands</div>
      <div class="muted">Click one below or type it manually.</div>
      <div class="command-grid">
        <span class="command-option" onclick="processCommand('about')">about</span>
        <span class="command-option" onclick="processCommand('experience')">experience</span>
        <span class="command-option" onclick="processCommand('resume')">resume</span>
        <span class="command-option" onclick="processCommand('projects')">projects</span>
        <span class="command-option" onclick="processCommand('skills')">skills</span>
        <span class="command-option" onclick="processCommand('education')">education</span>
        <span class="command-option" onclick="processCommand('contact')">contact</span>
        <span class="command-option" onclick="processCommand('download')">download</span>
        <span class="command-option" onclick="processCommand('linkedin')">linkedin</span>
        <span class="command-option" onclick="processCommand('github')">github</span>
        <span class="command-option" onclick="processCommand('clear')">clear</span>
      </div>
    </div>
  `,

  about: `
    <div class="output-block">
      <div class="section-title">About me</div>
      <div>Hi, I'm <strong>Sukhman Shergill</strong>.</div>
      <div>I’m a Computer Science student at York University focused on software engineering, full-stack development, and IT systems.</div>
      <ul class="item-list">
        <li>Hands-on experience across software development, internal tooling, automation, and infrastructure support</li>
        <li>Interested in building polished products that are useful, reliable, and easy to use</li>
        <li>Enjoy working with web apps, backend systems, dashboards, and practical AI/computer vision projects</li>
      </ul>
    </div>
  `,

  experience: `
    <div class="output-block">
      <div class="section-title">Experience</div>
      <div><strong>IT Analyst Intern</strong> — Arrow Machine and Fabrication Group <span class="muted">(May 2025 – Mar 2026)</span></div>
      <ul class="item-list">
        <li>Deployed and configured Jira to centralize IT ticketing, improving incident tracking and response workflows by 40%</li>
        <li>Supported Cisco firewall, DNS, DHCP, and patching workflows to maintain reliable internal infrastructure</li>
        <li>Built PowerShell and batch automation for software deployment and endpoint setup</li>
      </ul>
      <div><strong>Software Development Intern</strong> — EZSave / Venture for Canada <span class="muted">(Sep 2025 – Nov 2025)</span></div>
      <ul class="item-list">
        <li>Automated social media posting workflows with Python for coupon campaigns</li>
        <li>Fixed front-end issues and added user-facing improvements like loading indicators</li>
        <li>Tested feature updates and supported ongoing product improvements in an existing codebase</li>
      </ul>
      <div><strong>Software Development Intern</strong> — Blue Eclipse Inc. / Venture for Canada <span class="muted">(Sep 2023 – Nov 2023)</span></div>
      <ul class="item-list">
        <li>Customized client-facing web templates for multiple industries</li>
        <li>Built responsive templates using React, Vue, and Next.js</li>
        <li>Developed Node.js REST APIs that improved template rendering load times by 30%</li>
      </ul>
    </div>
  `,

  resume: `
    <div class="output-block">
      <div class="section-title">Resume summary</div>
      <div><strong>Education:</strong> Honours BSc in Computer Science, York University <span class="muted">(Expected Apr 2027)</span></div>
      <br />
      <div><strong>Recent experience:</strong></div>
      <ul class="item-list">
        <li>IT Analyst Intern — Arrow Machine and Fabrication Group</li>
        <li>Software Development Intern — EZSave</li>
        <li>Software Development Intern — Blue Eclipse Inc.</li>
      </ul>
      <div><strong>Standout projects:</strong> TicketFlow, Facial Recognition Algorithm, terminal.sukhi</div>
      <div><strong>Core stack:</strong> Python, JavaScript, SQL, Flask, Node.js, React, Vue, Next.js, SQLite, Docker, Linux, PowerShell</div>
    </div>
  `,

  projects: `
    <div class="output-block">
      <div class="section-title">Projects</div>
      <ul class="item-list">
        <li><strong>TicketFlow</strong> — full-stack help desk dashboard built with Python, Flask, SQLite, JavaScript, and HTML/CSS with ticket assignment, status tracking, notes, and analytics</li>
        <li><strong>Facial Recognition Algorithm</strong> — real-time face detection and recognition system using Python and OpenCV with live labels and improved preprocessing accuracy</li>
        <li><strong>terminal.sukhi</strong> — terminal-style portfolio experience built with JavaScript, HTML, and CSS to showcase projects interactively</li>
      </ul>
    </div>
  `,

  skills: `
    <div class="output-block">
      <div class="section-title">Technical skills</div>
      <div><strong>Languages:</strong> Python, JavaScript, SQL, Java, C, HTML/CSS, PowerShell</div>
      <div><strong>Frameworks & technologies:</strong> Flask, Node.js, React, Vue, Next.js, SQLite, Docker, Linux, JUnit</div>
      <div><strong>Tools:</strong> Git, Jira, VS Code, IntelliJ, WebStorm, Eclipse</div>
    </div>
  `,

  education: `
    <div class="output-block">
      <div class="section-title">Education</div>
      <div><strong>York University</strong> — Honours Bachelor of Science in Computer Science</div>
      <div class="muted">Toronto, Ontario · Expected Apr 2027</div>
    </div>
  `,

  contact: `
    <div class="output-block">
      <div class="section-title">Contact</div>
      <div><strong>Email:</strong> <a href="mailto:sshergill0102@gmail.com" class="command-link">sshergill0102@gmail.com</a></div>
      <div><strong>Phone:</strong> <a href="tel:+16478644168" class="command-link">647-864-4168</a></div>
      <div><strong>LinkedIn:</strong> <a href="${LINKEDIN_URL}" class="command-link" target="_blank" rel="noopener noreferrer">linkedin.com/in/sukhman-shergill</a></div>
      <div><strong>GitHub:</strong> <a href="${GITHUB_URL}" class="command-link" target="_blank" rel="noopener noreferrer">github.com/sukhi10</a></div>
    </div>
  `,

  download: `
    <div class="output-block">
      <div class="section-title">Resume</div>
      <div>Opening resume...</div>
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

  github: `
    <div class="output-block">
      <div class="section-title">GitHub</div>
      <div>Opening GitHub profile...</div>
      <div class="muted">
        If nothing opens,
        <a href="${GITHUB_URL}" class="command-link" target="_blank" rel="noopener noreferrer">click here</a>.
      </div>
    </div>
  `,

  clear: ""
};

function scrollToBottom() {
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function typeOutput(html, delay = 6) {
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

    if (["download", "linkedin", "github"].includes(trimmedCommand)) {
      const urlMap = {
        download: RESUME_URL,
        linkedin: LINKEDIN_URL,
        github: GITHUB_URL
      };
      window.open(urlMap[trimmedCommand], "_blank", "noopener,noreferrer");
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
      <div class="muted">Try <span class="command-option" onclick="processCommand('help')">help</span>, <span class="command-option" onclick="processCommand('experience')">experience</span>, <span class="command-option" onclick="processCommand('projects')">projects</span>, or <span class="command-option" onclick="processCommand('contact')">contact</span>.</div>
    </div>
  `);

  commandInput.focus();
});

window.processCommand = processCommand;