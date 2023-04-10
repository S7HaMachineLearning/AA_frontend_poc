export interface Sensor {
    id: string;
    name: string;
    type: string;
    enabled: boolean;
}

export interface SensorResponse {
    sensors: Sensor[];
}