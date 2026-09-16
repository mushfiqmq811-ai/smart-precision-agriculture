import { useEffect, useMemo, useState } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const round = (value, digits = 1) => Number(value.toFixed(digits));

const initial = {
  soilMoisture: 56.8,
  nitrogen: 72,
  phosphorus: 41,
  potassium: 126,
  soilPH: 6.6,
  temperature: 28.4,
  humidity: 68,
};

function drift(value, amount, min, max, digits = 1) {
  return round(clamp(value + (Math.random() - 0.5) * amount, min, max), digits);
}

function makeHistory() {
  const data = [];
  const now = Date.now();

  for (let i = 23; i >= 0; i -= 1) {
    const hour = new Date(now - i * 60 * 60 * 1000);
    data.push({
      time: hour.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      soilMoisture: round(clamp(52 + Math.sin(i / 3) * 5 + (Math.random() - .5) * 2, 42, 66)),
      temperature: round(clamp(27 + Math.sin(i / 4) * 2.8 + (Math.random() - .5), 22, 34)),
      humidity: round(clamp(67 - Math.sin(i / 4) * 7 + (Math.random() - .5) * 2, 48, 84)),
    });
  }
  return data;
}

export function useMockSensors(isPaused = false) {
  const [sensors, setSensors] = useState(initial);
  const [history, setHistory] = useState(makeHistory);

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = setInterval(() => {
      setSensors((current) => ({
        soilMoisture: drift(current.soilMoisture, 1.2, 35, 78),
        nitrogen: drift(current.nitrogen, 2.4, 35, 110, 0),
        phosphorus: drift(current.phosphorus, 1.5, 20, 70, 0),
        potassium: drift(current.potassium, 4, 70, 190, 0),
        soilPH: drift(current.soilPH, 0.08, 5.5, 7.8),
        temperature: drift(current.temperature, 0.8, 20, 36),
        humidity: drift(current.humidity, 1.8, 42, 92),
      }));
    }, 2200);

    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = setInterval(() => {
      setHistory((current) => [
        ...current.slice(-23),
        {
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          soilMoisture: sensors.soilMoisture,
          temperature: sensors.temperature,
          humidity: sensors.humidity,
        },
      ]);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, sensors.soilMoisture, sensors.temperature, sensors.humidity]);

  const lastSync = useMemo(
    () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    [sensors]
  );

  return { sensors, history, lastSync };
}
