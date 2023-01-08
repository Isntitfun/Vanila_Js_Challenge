const time = document.getElementById("time");
const date = document.getElementById("date");

const ticktock = () => {
  const now = new Date(Date.now());
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const nowDate = now.toLocaleDateString("ko-KR", options);
  const nowTime = now.toTimeString().substring(0, 8);

  time.innerText = nowTime;
  date.innerText = nowDate;
};

setInterval(ticktock, 1000);
