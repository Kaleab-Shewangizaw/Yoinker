/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

declare const chrome: any;

type ScanResponse = {
  success: boolean;
  jobTitle?: string;
  error?: string;
};

export default function App() {
  const [status, setStatus] = useState<string>("Ready");

  const handleScanPage = () => {
    setStatus("Scanning current page...");

    chrome.runtime.sendMessage(
      { type: "SCAN_CURRENT_PAGE" },
      (response: ScanResponse | undefined) => {
        if (chrome.runtime.lastError) {
          setStatus(
            "Failed: This page is not supported. Open a job page first.",
          );
          return;
        }

        if (response?.success) {
          setStatus("Yoinked! " + (response.jobTitle || "Job saved"));
        } else {
          setStatus("Failed: " + (response?.error || "No job detected"));
        }
      },
    );
  };

  return (
    <div className="w-95 p-6 bg-background min-h-100">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Yoinker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">{status}</p>

          <Button onClick={handleScanPage} className="w-full" size="lg">
            Scan Current Page
          </Button>

          <Button variant="outline" className="w-full">
            View All Yoinked Jobs
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
