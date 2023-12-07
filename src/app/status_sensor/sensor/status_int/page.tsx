import SensorDataStatus from '@/components/data/SensorDataStatus'

export default function IntensitymeterPage() {
  return <SensorDataStatus sensorType="Intensitymeter" endpoint="http://103.82.93.77:3003/sensor/status_int" />
}
