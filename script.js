// Your script here.
// Fetch and populate voices into the dropdown
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = '';
  if (!voices.length) {
    voicesDropdown.innerHTML = `<option value="">No voices available</option>`;
    voicesDropdown.disabled = true;
  } else {
    voicesDropdown.disabled = false;
    voices.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.name;
      option.textContent = `${voice.name} (${voice.lang})`;
      option.selected = (voice.name === msg.voice?.name);
      voicesDropdown.appendChild(option);
    });
  }
}

// Set voice based on selection
function setVoice() {
  const selectedVoice = voices.find(v => v.name === voicesDropdown.value);
  msg.voice = selectedVoice;
  restart();
}

// Start speaking
function speak() {
  if (!document.querySelector('[name="text"]').value.trim()) return;
  speechSynthesis.cancel(); // Always stop previous speech before speaking new text
  speechSynthesis.speak(msg);
}

// Stop speaking
function stop() {
  speechSynthesis.cancel();
}

// Update rate/pitch/text settings
function setOption() {
  msg[this.name] = this.value;
  if (speechSynthesis.speaking) restart();
}

function restart() {
  stop();
  speak();
}

// Event listeners
speechSynthesis.onvoiceschanged = populateVoices;
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);

// Initialize
populateVoices();
msg.text = document.querySelector('[name="text"]').value;
msg.rate = document.querySelector('[name="rate"]').value;
msg.pitch = document.querySelector('[name="pitch"]').value;

