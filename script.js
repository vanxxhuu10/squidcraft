window.onload = () => {
  const speakBtn = document.getElementById("speakBtn");
  const message = "Hello, Player. Welcome to the Game. Follow the instructions carefully to survive.";
  const speechText = document.getElementById("speechText");
  const countdownElem = document.getElementById("countdownTimer");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const yesPopup = document.getElementById("yesPopup");
  const noPopup = document.getElementById("noPopup");
  const registerFurtherContainer = document.getElementById("registerFurtherContainer");
    const registerFurtherBtn = document.getElementById("registerFurtherBtn");
  const bgMusic = document.getElementById("bgMusic");

  function typeText(text, callback) {
    speechText.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      speechText.textContent += text.charAt(i);
      i++;
      if (i > text.length - 1) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 50);
  }

  function speakNow() {
    typeText(message, () => {
      document.getElementById("registerSection").style.display = "block";
    });

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.pitch = 0.9;
    utterance.rate = 1;
    utterance.volume = 1;

    const duration = 600;
    let timeLeft = duration;
    countdownElem.textContent = `Time left: ${timeLeft}s`;

    const countdownInterval = setInterval(() => {
      timeLeft--;
      countdownElem.textContent = `Time left: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        countdownElem.textContent = "";
      }
    }, 1000);

    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith("en"));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    speechSynthesis.speak(utterance);
  }

  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.addEventListener("voiceschanged", () => speakBtn.addEventListener("click", speakNow));
  } else {
    speakBtn.addEventListener("click", speakNow);
  }

  yesBtn.addEventListener("click", () => {
      yesPopup.style.display = "block";
      document.body.classList.add("blur-background");

      // Hide popup and show button after 5 seconds
      setTimeout(() => {
        yesPopup.style.display = "none";
        document.body.classList.remove("blur-background");
        registerFurtherContainer.style.display = "block";
      }, 5000);
    });

    // No button click
    noBtn.addEventListener("click", () => {
      noPopup.style.display = "block";
      document.body.classList.add("blur-background");
    });

  bgMusic.volume = 0.1;
  bgMusic.play().catch(() => {
    speakBtn.addEventListener("click", () => bgMusic.play());
  });

  function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }
  const shapes = document.querySelectorAll('.shape');

  shapes.forEach(shape => {
    shape.style.animationDuration = `${randomFloat(1, 7)}s`;
    shape.style.animationDelay = `${randomFloat(0, 5)}s`;

    let xPos = 0;
    setInterval(() => {
      xPos = randomFloat(-40, 20);
      shape.style.transform = `translate(${xPos}px, 0)`;
    }, randomFloat(3000, 7000));
  });
};
document.getElementById("yesBtn").addEventListener("click", () => {
  const yesPopup = document.getElementById("yesPopup");
  yesPopup.style.display = "block";
  document.body.classList.add("blur-background");

  // Remove red blink in case user clicked "No" earlier
  document.body.classList.remove("red-blink");

  // Repeat voice message 5 times
  let count = 0;
  const repeatMessage = () => {
    if (count < 2) {
      const msg = new SpeechSynthesisUtterance("You have survived. Now you can register further.");
      const voices = speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith("en"));
      if (englishVoice) msg.voice = englishVoice;
      speechSynthesis.speak(msg);
      count++;
    } else {
      clearInterval(intervalId);
    }
  };

  repeatMessage(); // first call immediately
  const intervalId = setInterval(repeatMessage, 3000);

  // Ensure the Register Further button stays active
  const registerBtn = document.getElementById("registerFurtherBtn");
  registerBtn.style.display = "block"; // make sure it's shown
  registerBtn.onclick = () => {
    clearInterval(intervalId); // stop speaking
    alert("Proceeding to next step...");
    yesPopup.style.display = "none";
    document.body.classList.remove("blur-background");
  };
});



document.getElementById("noBtn").addEventListener("click", () => {
  const noPopup = document.getElementById("noPopup");
  noPopup.style.display = "block";
  document.body.classList.add("blur-background");
  document.body.classList.add("red-blink");

  // Speak message
  const msg = new SpeechSynthesisUtterance("You have been eliminated");
  const voices = speechSynthesis.getVoices();
  const englishVoice = voices.find(v => v.lang.startsWith("en"));
  if (englishVoice) msg.voice = englishVoice;
  speechSynthesis.speak(msg);

  // No auto hide, user stays on the page to see blinking effects
});


const registerBtn = document.getElementById("registerFurtherBtn");
const successMessage = document.getElementById("registerSuccessMessage");

registerBtn.addEventListener("click", () => {
  // Change button text
  registerBtn.textContent = "Registration Started ✅";

  // Show success message
  successMessage.style.display = "block";

  // Speak the message
  const utterance = new SpeechSynthesisUtterance("Registration started, go ahead!");
  speechSynthesis.speak(utterance);
});

function markComplete(fieldId) {
  const input = document.getElementById(fieldId);
  const tick = document.getElementById(`tick-${fieldId}`);
  const imageUrl = "yes.png"; // Replace with your desired tick image link

  if (input.value.trim() !== "") {
    tick.src = imageUrl;
    tick.style.display = "inline-block";
  } else {
    tick.style.display = "none";
  }
}
