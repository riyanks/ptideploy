import SensorData from '@/components/data/SensorData'

export default function AccelerographPage() {
  return <SensorData sensorType="Accelerograph" endpoint="http://103.82.93.77:3001/sensor/status_acc" />
}
