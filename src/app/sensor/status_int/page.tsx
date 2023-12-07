import SensorData from '@/components/data/SensorData'

export default function IntensitymeterPage() {
  return <SensorData sensorType="Intensitymeter" endpoint="http://103.82.93.77:3003/sensor/status_int" />
}
