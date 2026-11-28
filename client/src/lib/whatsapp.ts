export const CAMPUSNEST_AGENT_WHATSAPP_NUMBER = '918258262695';

export interface AgentWhatsAppParams {
  propertyName: string;
  distanceKm?: number;
  roomName?: string;
  studentName?: string;
  moveInDate?: string;
  referenceCode?: string;
  monthlyEstimateInr?: number;
}

/**
 * Generates an official wa.me deep link pre-filled with structured Moodbidri
 * student-housing lead details for immediate WhatsApp coordination.
 */
export function buildAgentWhatsAppUrl(params: AgentWhatsAppParams): string {
  const lines: string[] = [
    'Hi CampusNest Moodbidri Agent Desk,',
    `I am looking for student accommodation at *${params.propertyName}*` +
      (typeof params.distanceKm === 'number' ? ` (${params.distanceKm} km from MITE).` : '.')
  ];

  if (params.roomName) {
    lines.push(`• Room Preference: ${params.roomName}`);
  }
  if (typeof params.monthlyEstimateInr === 'number') {
    lines.push(`• Estimated Budget: ₹${params.monthlyEstimateInr.toLocaleString('en-IN')}/mo`);
  }
  if (params.studentName) {
    lines.push(`• Student Name: ${params.studentName}`);
  }
  if (params.moveInDate) {
    lines.push(`• Planned Move-in: ${params.moveInDate}`);
  }
  if (params.referenceCode) {
    lines.push(`• Inquiry Reference: ${params.referenceCode}`);
  }

  lines.push('Please share live bed availability and arrange an owner/agent visit.');

  return `https://wa.me/${CAMPUSNEST_AGENT_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function buildGoogleMapsUrl(name: string, address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`;
}
