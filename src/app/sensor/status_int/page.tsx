import SensorData from '@/components/data/SensorData'

export default function IntensitymeterPage() {
  return <SensorData sensorType="Intensitymeter" endpoint="http://localhost:3003/sensor/status_int" />
}
