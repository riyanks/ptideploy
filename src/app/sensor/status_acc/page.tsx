import SensorData from '@/components/data/SensorData'

export default function AccelerographPage() {
  return <SensorData sensorType="Accelerograph" endpoint="http://localhost:3001/sensor/status_acc" />
}
