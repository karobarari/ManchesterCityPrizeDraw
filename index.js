(function () {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth() + 1, 0, 20, 0, 0);
  if (target < now) target.setMonth(target.getMonth() + 1);
  const dateEl = document.getElementById("draw-date");
  if (dateEl)
    dateEl.textContent =
      target.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) + ", 8pm";
  function pad(n) {
    return String(n).padStart(2, "0");
  }
  function tick() {
    const diff = target - new Date();
    if (diff <= 0) {
      ["cd-days", "cd-hours", "cd-mins", "cd-secs"].forEach(
        (id) => (document.getElementById(id).textContent = "00"),
      );
      return;
    }
    document.getElementById("cd-days").textContent = pad(
      Math.floor(diff / (1000 * 60 * 60 * 24)),
    );
    document.getElementById("cd-hours").textContent = pad(
      Math.floor((diff / (1000 * 60 * 60)) % 24),
    );
    document.getElementById("cd-mins").textContent = pad(
      Math.floor((diff / (1000 * 60)) % 60),
    );
    document.getElementById("cd-secs").textContent = pad(
      Math.floor((diff / 1000) % 60),
    );
  }
  tick();
  setInterval(tick, 1000);
})();

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}
