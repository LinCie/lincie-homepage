function getTimeOfDay(): "morning" | "afternoon" | "evening" | "night" {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

function applyTimeOfDay() {
  const time = getTimeOfDay();
  document.documentElement.setAttribute("data-time", time);
}

applyTimeOfDay();
setInterval(applyTimeOfDay, 60000);
