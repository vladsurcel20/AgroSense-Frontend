import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useDashboard } from "../contexts/DashboardContext";
import { EspSensorReadings } from "../types/espSensorReading";


export function useSocket() {
  const { currentGreenhouse, setCurrentSensorReading } = useDashboard();
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!currentGreenhouse) return;
    const ghId = currentGreenhouse.id;

    const socket = io(import.meta.env.VITE_WS_URL);
    console.log("Attempting socket connect…");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("⚡ WS connected:", socket.id);
      socket.emit("authenticate", { greenhouseId: ghId });
    });

    socket.on("sensor_data", (data: EspSensorReadings) => {
      setCurrentSensorReading(data)
    });

    socket.on("command_response", (resp) => {
      console.log("⚡ command_response:", resp);
      // handle if needed
    });

    socket.on("command_sent", (resp) => {
      console.log("✅ Command sent:", resp);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendCommand = (command: any) => {
    socketRef.current?.emit("control_device", command);
  };

  return { sendCommand };
}
