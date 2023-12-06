import SensorDataStatus from '@/components/data/SensorDataStatus'

export default function IntensitymeterPage() {
  return <SensorDataStatus sensorType="Intensitymeter" endpoint="http://localhost:3003/sensor/status_int" />
}
