'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';

type Service = 'apps' | 'plataformas' | 'integracoes' | 'seguranca' | 'a-definir';
type Values = { name: string; contact: string; company: string; service: Service; message: string; website: string };
type Field = keyof Values;
type FieldErrors = Partial<Record<Field, string>>;

const initialValues: Values = { name: '', contact: '', company: '', service: 'a-definir', message: '', website: '' };
const serviceOptions: { value: Service; label: string }[] = [
  { value: 'a-definir', label: 'Ainda quero definir' },
  { value: 'apps', label: 'Aplicativos e PWAs' },
  { value: 'plataformas', label: 'Plataformas e sistemas web' },
  { value: 'integracoes', label: 'Integrações e automações' },
  { value: 'seguranca', label: 'Segurança na arquitetura' },
];

function validate(values: Values): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2 || values.name.length > 100) errors.name = 'Informe um nome entre 2 e 100 caracteres.';
  const contact = values.contact.trim();
  const email = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(contact);
  const phone = /^\+?[\d\s().-]+$/.test(contact) && (contact.match(/\d/g)?.length ?? 0) >= 5;
  if (contact.length < 5 || contact.length > 180 || (!email && !phone)) errors.contact = 'Informe um e-mail ou telefone válido, com até 180 caracteres.';
  if (values.company.length > 120) errors.company = 'Use até 120 caracteres.';
  if (values.message.trim().length < 20 || values.message.length > 5000) errors.message = 'Descreva o projeto em 20 a 5.000 caracteres.';
  if (!serviceOptions.some(option => option.value === values.service)) errors.service = 'Selecione uma solução.';
  return errors;
}

export function ContactForm({ available, initialService = 'a-definir' }: { available: boolean; initialService?: Service }) {
  const [values, setValues] = useState<Values>({ ...initialValues, service: initialService });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [notice, setNotice] = useState('');
  const pending = useRef(false);
  const attempt = useRef<{ payload: string; key: string } | null>(null);
  const inFlight = useRef<{ controller: AbortController; timeout: number } | null>(null);
  const mounted = useRef(true);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (inFlight.current) {
        window.clearTimeout(inFlight.current.timeout);
        inFlight.current.controller.abort();
        inFlight.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (status === 'success' || status === 'error') statusRef.current?.focus();
    else if (Object.keys(errors).length) formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [status, errors]);

  function change(field: Field, value: string) {
    setValues(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: undefined }));
    if (status === 'error') { setStatus('idle'); setNotice(''); }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!available || pending.current || status === 'success') return;
    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) return;
    const payload = JSON.stringify({ ...values, name: values.name.trim(), contact: values.contact.trim(), company: values.company.trim(), message: values.message.trim() });
    if (attempt.current?.payload !== payload) attempt.current = { payload, key: crypto.randomUUID() };
    pending.current = true;
    setStatus('sending');
    setNotice('');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    inFlight.current = { controller, timeout };
    try {
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': attempt.current.key },
        body: payload,
        signal: controller.signal,
      });
      const result: unknown = await response.json();
      if (!mounted.current) return;
      if ((response.status === 200 || response.status === 201) && result && typeof result === 'object' && 'id' in result && typeof result.id === 'string' && result.id && 'received' in result && result.received === true) {
        setStatus('success');
        setNotice(`Solicitação recebida. Protocolo: ${result.id}. Guarde este código caso precise consultar seu envio.`);
        return;
      }
      if (response.status === 422 && result && typeof result === 'object' && 'fields' in result && result.fields && typeof result.fields === 'object') {
        const serverFields = result.fields as Record<string, unknown>;
        setErrors(Object.fromEntries((Object.keys(initialValues) as Field[]).filter(field => field !== 'website' && typeof serverFields[field] === 'string').map(field => [field, serverFields[field] as string])));
      }
      setStatus('error');
      setNotice(response.status === 429 ? 'Muitas tentativas em pouco tempo. Aguarde e tente novamente.' : response.status === 503 ? 'O formulário está temporariamente indisponível. Seu texto foi preservado; tente novamente mais tarde.' : 'Não foi possível confirmar o recebimento. Seu texto foi preservado; tente novamente.');
    } catch {
      if (!mounted.current) return;
      setStatus('error');
      setNotice('Não foi possível confirmar o recebimento. Verifique a conexão e tente novamente; seu texto foi preservado.');
    } finally {
      window.clearTimeout(timeout);
      if (inFlight.current?.controller === controller) inFlight.current = null;
      pending.current = false;
    }
  }

  const disabled = !available || status === 'sending' || status === 'success';
  const field = (name: Field) => ({ id: name, name, disabled, 'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `${name}-error` : undefined });

  return <form ref={formRef} className="contact-form" onSubmit={submit} noValidate>
    {!available && <p className="unavailable" role="status">O contato por formulário ainda não está disponível. Nenhuma informação será enviada.</p>}
    <div className="form-row">
      <div className="field"><label htmlFor="name">Nome</label><input {...field('name')} autoComplete="name" required maxLength={100} value={values.name} onChange={event => change('name', event.target.value)}/>{errors.name && <span id="name-error" className="field-error">{errors.name}</span>}</div>
      <div className="field"><label htmlFor="contact">E-mail ou telefone</label><input {...field('contact')} autoComplete="email" required maxLength={180} value={values.contact} onChange={event => change('contact', event.target.value)}/>{errors.contact && <span id="contact-error" className="field-error">{errors.contact}</span>}</div>
    </div>
    <div className="form-row">
      <div className="field"><label htmlFor="company">Empresa <span>(opcional)</span></label><input {...field('company')} autoComplete="organization" maxLength={120} value={values.company} onChange={event => change('company', event.target.value)}/>{errors.company && <span id="company-error" className="field-error">{errors.company}</span>}</div>
      <div className="field"><label htmlFor="service">Solução desejada</label><select {...field('service')} value={values.service} onChange={event => change('service', event.target.value)}>{serviceOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{errors.service && <span id="service-error" className="field-error">{errors.service}</span>}</div>
    </div>
    <div className="field"><label htmlFor="message">Conte um pouco sobre o projeto</label><textarea {...field('message')} required minLength={20} maxLength={5000} value={values.message} onChange={event => change('message', event.target.value)} placeholder="Qual desafio você quer resolver?"/>{errors.message && <span id="message-error" className="field-error">{errors.message}</span>}</div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Site</label><input id="website" name="website" tabIndex={-1} autoComplete="off" disabled={disabled} value={values.website} onChange={event => change('website', event.target.value)}/></div>
    <p className="form-help">Não envie senhas, credenciais ou informações confidenciais desnecessárias. Leia como tratamos seus dados na <Link href="/privacidade">minuta de privacidade</Link>.</p>
    <button className="button" type="submit" disabled={disabled}>{status === 'sending' ? 'Enviando…' : status === 'success' ? 'Solicitação recebida' : status === 'error' ? 'Tentar novamente' : 'Enviar minha solicitação'}</button>
    {notice && <div ref={statusRef} className={`form-status${status === 'error' ? ' error' : ''}`} role={status === 'error' ? 'alert' : 'status'} tabIndex={-1}>{notice}</div>}
  </form>;
}
