/* eslint-disable @typescript-eslint/no-explicit-any */
// src/content.ts
console.log("Yoinker content script injected successfully!");

function createYoinkButton() {
  if (document.getElementById("yoinker-float-btn")) return;

  const btn = document.createElement("button");
  btn.id = "yoinker-float-btn";
  btn.innerHTML = "Yoink this job ✨";

  Object.assign(btn.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: "999999999",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
    color: "white",
    border: "none",
    borderRadius: "9999px",
    fontSize: "16px",
    fontWeight: "600",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
    cursor: "pointer",
    pointerEvents: "auto",
    userSelect: "none",
    minWidth: "180px",
    transition: "all 0.2s ease",
  });

  btn.onmouseover = () => {
    btn.style.transform = "scale(1.08)";
    btn.style.boxShadow = "0 15px 35px rgba(0,0,0,0.5)";
  };
  btn.onmouseleave = () => {
    btn.style.transform = "scale(1)";
    btn.style.boxShadow = "0 10px 25px rgba(0,0,0,0.4)";
  };

  btn.onclick = () => {
    alert("Job yoinked! Current URL: " + window.location.href);
  };

  (document.body || document.documentElement).appendChild(btn);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createYoinkButton);
} else {
  createYoinkButton();
}

chrome.runtime.onMessage.addListener(
  (
    message: any,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void,
  ) => {
    if (message.type === "REQUEST_SCAN") {
      const jobData = {
        title: document.querySelector("h1")?.textContent?.trim() || null,
        company:
          document
            .querySelector(".job-details-jobs-unified-top-card__company-name a")
            ?.textContent?.trim() || null,
        location:
          document
            .querySelector(
              ".job-details-jobs-unified-top-card__primary-description",
            )
            ?.textContent?.trim() || null,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      };

      sendResponse({
        success: !!jobData.title,
        jobTitle: jobData.title || "Unknown",
        data: jobData,
      });
    }
    return true;
  },
);
