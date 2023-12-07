import SensorDataStatus from '@/components/data/SensorDataStatus'

export default function AccelerographPage() {
  return <SensorDataStatus sensorType="Accelerograph" endpoint="http://103.82.93.77:3001/sensor/status_acc" />
}
