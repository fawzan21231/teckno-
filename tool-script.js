// Web Development Tool JavaScript

// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const editorPanels = document.querySelectorAll('.editor-panel');
const htmlEditor = document.getElementById('htmlEditor');
const cssEditor = document.getElementById('cssEditor');
const jsEditor = document.getElementById('jsEditor');
const previewFrame = document.getElementById('previewFrame');
const consoleOutput = document.getElementById('consoleOutput');
const themeSelect = document.getElementById('themeSelect');
const fontSizeRange = document.getElementById('fontSize');
const saveBtn = document.getElementById('saveBtn');
const previewBtn = document.getElementById('previewBtn');
const exportBtn = document.getElementById('exportBtn');
const formatHtmlBtn = document.getElementById('formatHtml');
const formatCssBtn = document.getElementById('formatCss');
const formatJsBtn = document.getElementById('formatJs');
const refreshPreviewBtn = document.getElementById('refreshPreview');
const clearConsoleBtn = document.getElementById('clearConsole');

// Tab Functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and panels
        tabBtns.forEach(b => b.classList.remove('active'));
        editorPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        this.classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        // Update preview if preview tab is clicked
        if (tabName === 'preview') {
            updatePreview();
        }
    });
});

// Live Preview Functionality
function updatePreview() {
    const html = htmlEditor.value;
    const css = cssEditor.value;
    const js = jsEditor.value;
    
    const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Preview</title>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}</script>
        </body>
        </html>
    `;
    
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    previewFrame.src = url;
}

// Auto-update preview when code changes
htmlEditor.addEventListener('input', updatePreview);
cssEditor.addEventListener('input', updatePreview);
jsEditor.addEventListener('input', updatePreview);

// Code Formatting Functions
function formatHTML(code) {
    // Simple HTML formatting
    return code
        .replace(/>\s*</g, '>\n<')
        .replace(/\n\s*\n/g, '\n')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');
}

function formatCSS(code) {
    // Simple CSS formatting
    return code
        .replace(/\s*{\s*/g, ' {\n    ')
        .replace(/\s*}\s*/g, '\n}\n')
        .replace(/;\s*/g, ';\n    ')
        .replace(/\n\s*\n/g, '\n')
        .trim();
}

function formatJS(code) {
    // Simple JavaScript formatting
    return code
        .replace(/\s*{\s*/g, ' {\n    ')
        .replace(/\s*}\s*/g, '\n}\n')
        .replace(/;\s*/g, ';\n    ')
        .replace(/\n\s*\n/g, '\n')
        .trim();
}

// Format buttons
formatHtmlBtn.addEventListener('click', () => {
    htmlEditor.value = formatHTML(htmlEditor.value);
    updatePreview();
    addConsoleMessage('HTML code formatted successfully', 'success');
});

formatCssBtn.addEventListener('click', () => {
    cssEditor.value = formatCSS(cssEditor.value);
    updatePreview();
    addConsoleMessage('CSS code formatted successfully', 'success');
});

formatJsBtn.addEventListener('click', () => {
    jsEditor.value = formatJS(jsEditor.value);
    updatePreview();
    addConsoleMessage('JavaScript code formatted successfully', 'success');
});

// Console Functionality
function addConsoleMessage(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'console-message';
    
    const timestampSpan = document.createElement('span');
    timestampSpan.className = 'timestamp';
    timestampSpan.textContent = `[${timestamp}]`;
    
    const messageSpan = document.createElement('span');
    messageSpan.className = 'message';
    messageSpan.textContent = message;
    
    if (type === 'error') {
        messageSpan.style.color = '#e74c3c';
    } else if (type === 'success') {
        messageSpan.style.color = '#27ae60';
    } else if (type === 'warning') {
        messageSpan.style.color = '#f39c12';
    }
    
    messageDiv.appendChild(timestampSpan);
    messageDiv.appendChild(messageSpan);
    consoleOutput.appendChild(messageDiv);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Clear console
clearConsoleBtn.addEventListener('click', () => {
    consoleOutput.innerHTML = '';
    addConsoleMessage('Console cleared', 'info');
});

// Theme Functionality
themeSelect.addEventListener('change', function() {
    const theme = this.value;
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
    addConsoleMessage(`Theme changed to ${theme}`, 'info');
});

// Font Size Functionality
fontSizeRange.addEventListener('input', function() {
    const size = this.value;
    document.documentElement.style.fontSize = size + 'px';
    addConsoleMessage(`Font size changed to ${size}px`, 'info');
});

// Save Functionality
saveBtn.addEventListener('click', () => {
    const projectData = {
        html: htmlEditor.value,
        css: cssEditor.value,
        js: jsEditor.value,
        timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'web-project.json';
    a.click();
    URL.revokeObjectURL(url);
    
    addConsoleMessage('Project saved successfully', 'success');
});

// Preview Button
previewBtn.addEventListener('click', () => {
    // Switch to preview tab
    tabBtns.forEach(btn => btn.classList.remove('active'));
    editorPanels.forEach(panel => panel.classList.remove('active'));
    
    document.querySelector('[data-tab="preview"]').classList.add('active');
    document.getElementById('preview').classList.add('active');
    
    updatePreview();
    addConsoleMessage('Preview updated', 'info');
});

// Export Functionality
exportBtn.addEventListener('click', () => {
    const html = htmlEditor.value;
    const css = cssEditor.value;
    const js = jsEditor.value;
    
    const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Exported Website</title>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}</script>
        </body>
        </html>
    `;
    
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website.html';
    a.click();
    URL.revokeObjectURL(url);
    
    addConsoleMessage('Website exported successfully', 'success');
});

// Refresh Preview Button
refreshPreviewBtn.addEventListener('click', () => {
    updatePreview();
    addConsoleMessage('Preview refreshed', 'info');
});

// File Tree Functionality
const fileItems = document.querySelectorAll('.file');
fileItems.forEach(file => {
    file.addEventListener('click', function() {
        fileItems.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        
        const fileName = this.getAttribute('data-file');
        addConsoleMessage(`Switched to ${fileName}`, 'info');
    });
});

// Component Drag and Drop
const components = document.querySelectorAll('.component');
components.forEach(component => {
    component.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', this.getAttribute('data-component'));
    });
});

// Add drag and drop to editors
[htmlEditor, cssEditor, jsEditor].forEach(editor => {
    editor.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    
    editor.addEventListener('drop', function(e) {
        e.preventDefault();
        const component = e.dataTransfer.getData('text/plain');
        insertComponent(component, this);
    });
});

function insertComponent(component, editor) {
    const componentCode = getComponentCode(component);
    const cursorPos = editor.selectionStart;
    const textBefore = editor.value.substring(0, cursorPos);
    const textAfter = editor.value.substring(cursorPos);
    
    editor.value = textBefore + componentCode + textAfter;
    editor.focus();
    
    // Set cursor position after inserted component
    const newPos = cursorPos + componentCode.length;
    editor.setSelectionRange(newPos, newPos);
    
    updatePreview();
    addConsoleMessage(`${component} component inserted`, 'success');
}

function getComponentCode(component) {
    const components = {
        button: '<button class="btn">Click me</button>',
        card: `<div class="card">
    <div class="card-header">
        <h3>Card Title</h3>
    </div>
    <div class="card-body">
        <p>Card content goes here.</p>
    </div>
</div>`,
        form: `<form>
    <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
    </div>
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
    </div>
    <button type="submit" class="btn">Submit</button>
</form>`,
        navbar: `<nav class="navbar">
    <div class="nav-brand">Brand</div>
    <ul class="nav-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</nav>`
    };
    
    return components[component] || '';
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveBtn.click();
    }
    
    // Ctrl/Cmd + Enter to preview
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        previewBtn.click();
    }
    
    // Ctrl/Cmd + Shift + E to export
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        exportBtn.click();
    }
});

// Auto-save functionality
let autoSaveInterval;
const autoSaveCheckbox = document.querySelector('input[type="checkbox"]');
autoSaveCheckbox.addEventListener('change', function() {
    if (this.checked) {
        autoSaveInterval = setInterval(() => {
            addConsoleMessage('Auto-saved', 'info');
        }, 30000); // Auto-save every 30 seconds
    } else {
        clearInterval(autoSaveInterval);
    }
});

// Initialize tool
document.addEventListener('DOMContentLoaded', function() {
    addConsoleMessage('Web Development Tool initialized successfully', 'success');
    updatePreview();
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    themeSelect.value = savedTheme;
    if (savedTheme === 'dark') {
        document.body.className = 'dark-theme';
    }
    
    // Set initial font size
    const savedFontSize = localStorage.getItem('fontSize') || '14';
    fontSizeRange.value = savedFontSize;
    document.documentElement.style.fontSize = savedFontSize + 'px';
});

// Save settings to localStorage
themeSelect.addEventListener('change', function() {
    localStorage.setItem('theme', this.value);
});

fontSizeRange.addEventListener('input', function() {
    localStorage.setItem('fontSize', this.value);
});

// Error handling for preview
previewFrame.addEventListener('error', function() {
    addConsoleMessage('Error loading preview', 'error');
});

// Add some sample console messages on load
setTimeout(() => {
    addConsoleMessage('Ready to code! Start building your website.', 'info');
}, 1000);
