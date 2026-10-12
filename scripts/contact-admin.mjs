import { adminConfig } from '../src/lib/contact-config.ts';
import { flushNotifications, maintainContacts, readContact } from '../src/lib/contact.mjs';

const config = adminConfig();
if (!config) throw new Error('Configure um banco privado e as chaves antes de operar o contato.');
const [command, id] = process.argv.slice(2);
if (command === 'list' || command === 'prune') console.log(JSON.stringify(maintainContacts(config), null, 2));
else if (command === 'get' && /^[0-9a-f-]{36}$/.test(id || '')) {
  console.log(JSON.stringify(readContact(config, id, keyId => Buffer.from(process.env[`CONTACT_KEY_${keyId.toUpperCase()}`] || '', 'base64')), null, 2));
} else if (command === 'delete' && /^[0-9a-f-]{36}$/.test(id || '')) console.log(JSON.stringify(maintainContacts(config, id)));
else if (command === 'notify') console.log(JSON.stringify(await flushNotifications(config, process.env.CONTACT_NOTIFY_URL, process.env.CONTACT_NOTIFY_TOKEN)));
else throw new Error('Uso: contact-admin.mjs list|prune|get ID|delete ID|notify');
