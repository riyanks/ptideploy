import SensorData from '@/components/data/SensorData'

export default function IntensitymeterPage() {
  return <SensorData sensorType="Intensitymeter" endpoint="http://localhost:3000/sensor/status_int" />
}
