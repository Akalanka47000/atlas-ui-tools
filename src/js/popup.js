const initVersion = () => {
  fetch('../manifest.json')
    .then(response => response.json())
    .then(manifest => {
      const version = manifest.version;
      document.getElementById('version').innerText = version;
    })
}

const toggleSpacedMode = async () => {
  const spacedMode = localStorage.getItem('spacedMode') === 'true';
  const spacedModeIcon = document.getElementById('spaced-mode-icon');
  const button = document.getElementById('btn-spaced-mode');
  if (spacedMode) {
    spacedModeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />`
    button.style.backgroundColor = '#b91c1c';
  } else {
    spacedModeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21" />`
    button.style.backgroundColor = '#1a1a1a';
  }
  localStorage.setItem('spacedMode', !spacedMode);
  await chrome.storage.local.set({
    spacedMode: !spacedMode,
  })
}

const initialize = async () => {
  initVersion()
  document.getElementById('btn-spaced-mode').addEventListener('click', toggleSpacedMode, false);
  await chrome.storage.local.set({
    spacedMode: localStorage.getItem('spacedMode') === 'true',
  })
}

if (document.readyState !== 'loading') {
  initialize()
} else {
  document.addEventListener('DOMContentLoaded', function () {
    initialize()
  })
}