let myCanvas = document.getElementById("canvas");
let myCanvasTx = myCanvas.getContext("2d");
let radius = myCanvas.width / 2;
myCanvasTx.translate(radius, radius);
radius = radius * 0.9;
let mainColor = "#4B56D2";
setInterval(() => {
  drawClock();
}, 1000);

function drawClock() {
  drawClockFace();
  numbers();
  hands();

  function drawClockFace() {
    let grad;
    myCanvasTx.beginPath();
    myCanvasTx.arc(0, 0, radius, 0, 2 * Math.PI);
    myCanvasTx.fillStyle = "white";
    myCanvasTx.fill();
    grad = myCanvasTx.createRadialGradient(
      0,
      0,
      radius * 0.95,
      0,
      0,
      radius * 1.05
    );
    grad.addColorStop(0, mainColor);
    grad.addColorStop(0.5, "white");
    grad.addColorStop(1, mainColor);
    myCanvasTx.strokeStyle = grad;
    myCanvasTx.lineWidth = radius * 0.05;
    myCanvasTx.stroke();
    myCanvasTx.beginPath();
    myCanvasTx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    myCanvasTx.fillStyle = mainColor;
    myCanvasTx.fill();
  }
  function numbers() {
    let angle = -90 / 3 - 90 / 3;
    myCanvasTx.font = "30px Arial";
    myCanvasTx.textBaseline = "middle";
    myCanvasTx.textAlign = "center";
    for (let i = 1; i <= 12; i++) {
      myCanvasTx.fillText(
        i,
        radius * 0.85 * Math.cos((angle * Math.PI) / 180),
        radius * 0.85 * Math.sin((angle * Math.PI) / 180)
      );
      angle += 90 / 3;
    }
  }
  function hands() {
    let theDate = new Date();
    let sec = theDate.getSeconds();
    let min = theDate.getMinutes();
    let hr = theDate.getHours() % 12;
    let secDeg = sec * 6 - 90;
    let minDeg = min * 6 - 90;
    let hrDeg = (hr + min / 60) * 30 - 90;
    secondHand();
    minuteHand();
    hrHand();
    function secondHand() {
      myCanvasTx.beginPath();
      myCanvasTx.moveTo(0, 0);
      myCanvasTx.lineTo(
        radius * 0.9 * Math.cos((secDeg * Math.PI) / 180),
        radius * 0.9 * Math.sin((secDeg * Math.PI) / 180)
      );
      myCanvasTx.lineWidth = 2;
      myCanvasTx.lineCap = "round";
      myCanvasTx.stroke();
    }
    function minuteHand() {
      myCanvasTx.beginPath();
      myCanvasTx.moveTo(0, 0);
      myCanvasTx.lineTo(
        radius * 0.7 * Math.cos((minDeg * Math.PI) / 180),
        radius * 0.7 * Math.sin((minDeg * Math.PI) / 180)
      );
      myCanvasTx.lineWidth = 4;
      myCanvasTx.stroke();
    }
    function hrHand() {
      myCanvasTx.beginPath();
      myCanvasTx.moveTo(0, 0);
      myCanvasTx.lineTo(
        radius * 0.5 * Math.cos((hrDeg * Math.PI) / 180),
        radius * 0.5 * Math.sin((hrDeg * Math.PI) / 180)
      );
      myCanvasTx.lineWidth = 8;
      myCanvasTx.stroke();
    }
    let btn = document.getElementById("btn");
    var msg = new SpeechSynthesisUtterance();
    msg.text = `It is ${hr} and ${min} minutes.`;
    msg.lang = 'en';
    if ("speechSynthesis" in window) {
      // Speech Synthesis supported 🎉
      btn.onclick = function () {
        window.speechSynthesis.speak(msg);
      };
    } else {
      // Speech Synthesis Not Supported 😣
      alert("Sorry, your browser doesn't support text to speech!");
    }
  }
}
