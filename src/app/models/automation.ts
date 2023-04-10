export interface Automation {
    id: string;
    name: string;
    enabled: boolean;
}

export interface AutomationResponse {
    automations: Automation[];
}