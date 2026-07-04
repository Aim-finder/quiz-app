document.getElementById('start').onclick = function () {
  const count = document.getElementById('count').value;
  const timer = document.querySelector('input[name="timer"]:checked').value;

  localStorage.setItem('count', count);
  localStorage.setItem('timer', timer);

  window.location.href = "quiz.html";
};
