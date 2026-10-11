import { handleContact } from '@/lib/contact.mjs';
import { contactConfig } from '@/lib/contact-config';
export const runtime = 'nodejs';
export async function POST(request: Request) { return handleContact(request, contactConfig()); }
