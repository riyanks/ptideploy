import SensorDataStatus from '@/components/data/SensorDataStatus'

export default function AccelerographPage() {
  return <SensorDataStatus sensorType="Accelerograph" endpoint="http://localhost:3001/sensor/status_acc" />
}
