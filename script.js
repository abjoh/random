// Edit the clue text here to match where you hide each note.
const steps = [
  { eyebrow: 'Clue one', title: 'Go to the kitchen and find the note.', detail: 'Take your time, my love. The next part is waiting right here.', button: 'Found it' },
  { eyebrow: 'Clue two', title: 'Search the bathrooms for the second note.', detail: 'A little closer now… go find your next clue.', button: 'Found it' },
  { eyebrow: 'Clue three', title: 'Look beneath your pillow for one last note.', detail: 'You’re almost at the sweetest part. Bring your note back with you.', button: 'I found it' },
  { eyebrow: 'Just for you', title: 'For the girl who makes everything brighter.', detail: 'A few little words for my favorite person.', poems: true }
];

const eyebrow = document.querySelector('#eyebrow');
const message = document.querySelector('#message');
const subtext = document.querySelector('#subtext');
const actions = document.querySelector('#actions');
const progress = document.querySelector('#progress');
const stepLabel = document.querySelector('#step-label');
let current = -1;

function show(index) {
  current = index;
  const step = steps[index];
  const card = document.querySelector('.card');
  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = '';
  eyebrow.textContent = step.eyebrow;
  message.textContent = step.title;
  subtext.textContent = step.detail;
  actions.replaceChildren();
  progress.hidden = index === 3;
  stepLabel.hidden = index === 3;
  if (index < 3) {
    progress.querySelectorAll('span').forEach((dot, i) => dot.classList.toggle('active', i <= index));
    stepLabel.textContent = `STEP ${index + 1} OF 3`;
    addButton(step.button, 'primary', () => show(index + 1));
  } else {
    addPoems();
    addButton('Read them again ♥', 'secondary', () => document.querySelector('#poems').scrollIntoView({ behavior: 'smooth', block: 'center' }));
  }
  if (index > 0) addButton('← Back', 'secondary', () => show(index - 1));
}

function addButton(label, style, action) {
  const button = document.createElement('button');
  button.className = style;
  button.textContent = label;
  button.addEventListener('click', action);
  actions.append(button);
}

function addPoems() {
  const poems = document.createElement('div');
  poems.id = 'poems';
  poems.className = 'poems';
  poems.innerHTML = '<p>You make the ordinary glow,<br>the quiet moments softly sing.<br>Wherever life may lead us, love,<br>you are my favorite everything.</p><p>If every star could spell your name,<br>the night would never be the same.<br>And if my heart could make one wish,<br>it would be a lifetime more of this.</p><p class="signature">All my love, always <span>♥</span></p>';
  actions.before(poems);
}

document.querySelector('#start').addEventListener('click', () => show(0));
