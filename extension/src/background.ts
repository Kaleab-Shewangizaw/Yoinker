/* eslint-disable @typescript-eslint/no-explicit-any */
// src/background.ts
console.log("Yoinker background active");

chrome.runtime.onMessage.addListener(
  (
    message: any,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void,
  ) => {
    if (message.type === "SCAN_CURRENT_PAGE") {
      chrome.tabs.query(
        { active: true, currentWindow: true },
        (tabs: chrome.tabs.Tab[]) => {
          const tab = tabs[0];
          if (!tab?.id) {
            sendResponse({ success: false, error: "No active tab" });
            return;
          }

          chrome.tabs.sendMessage(
            tab.id,
            { type: "REQUEST_SCAN" },
            (response: any) => {
              if (chrome.runtime.lastError) {
                sendResponse({
                  success: false,
                  error: "This page is not supported. Open a job page first.",
                });
                return;
              }
              console.log("Scan response:", response);
              sendResponse(response);
            },
          );
        },
      );

      return true; // Required for async response
    }
  },
);
