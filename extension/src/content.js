console.log("Yoinker content script loaded on this page!");

if (window.location.href.includes("jobs")) {
  alert("Yoinker detected a job page! (this is just a test)");
}
