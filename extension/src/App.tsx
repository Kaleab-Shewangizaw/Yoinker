import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function App() {
  return (
    <div className="w-[360px] bg-[#12151b] text-[#E5E7EB] p-4 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg  flex items-center justify-center text-cyan-400 font-bold">
            <img src="logo.png" />
          </div>
          <div>
            <h1 className="text-sm font-semibold">Yoink</h1>
            <p className="text-xs text-gray-400">Your Job Brain</p>
          </div>
        </div>
        <Badge className="bg-amber-400/15 text-amber-400 border-amber-400/30">
          v0.1
        </Badge>
      </div>

      {/* Stats Card */}
      <Card className="mb-4 bg-[#111827] border border-[#1F2937]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Yoinked jobs</span>
            <span className="text-2xl font-bold text-cyan-400">0</span>
          </div>

          <Button
            size="sm"
            className="w-full mt-3 bg-cyan-500 hover:bg-cyan-400 text-black"
          >
            View Jobs
          </Button>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-20 border-[#1F2937] bg-[#0F172A] hover:bg-cyan-500/10 text-cyan-400"
        >
          🔍 Scan Page
        </Button>

        <Button
          variant="outline"
          className="h-20 border-[#1F2937] bg-[#0F172A] hover:bg-amber-400/10 text-amber-400"
        >
          ⚙️ Settings
        </Button>
      </div>

      <Separator className="my-4 bg-[#1F2937]" />

      {/* Footer */}
      <p className="text-[11px] text-center text-gray-500">
        Made with ❤️ by Kal_X
      </p>
    </div>
  );
}
