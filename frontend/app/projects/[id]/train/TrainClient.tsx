"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";

function getStatusInfo() {
  const random = Math.random();
  if (random < 0.3) {
    return {
      icon: AlertTriangle,
      color: "text-yellow-400",
      label: "Paused"
    };
  } else if (random < 0.6) {
    return {
      icon: Clock,
      color: "text-blue-400",
      label: "Pending"
    };
  } else {
    return {
      icon: CheckCircle,
      color: "text-green-400",
      label: "Active"
    };
  }
}

export default function TrainClient() {
  const [statusInfo, setStatusInfo] = useState(getStatusInfo());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusInfo(getStatusInfo());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const Icon = statusInfo.icon;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Model Training Status</h1>

      <Card className="glass-effect border-slate-700/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-600/20 border border-blue-500/20">
                <Icon className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">Training Job</CardTitle>
                <CardDescription className="text-slate-400">
                  Monitors the current model training progress
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-slate-700 border border-slate-600 text-sm px-3 py-1">
              <Icon className={`h-3 w-3 mr-1 ${statusInfo.color}`} />
              {statusInfo.label}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="mt-4">
          <p className="text-slate-300">
            This section will soon display real-time training metrics such as:
            accuracy, loss curves, epoch counters, and GPU utilization.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
