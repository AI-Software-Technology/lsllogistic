import { createClient } from 'npm:@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, serviceRoleKey);

function text(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function required(value: unknown): boolean {
  return value !== null && value !== undefined && String(value).trim() !== '';
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function nextOrderId(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `LSL${year}`;
  const { data, error } = await supabase
    .from('shipments')
    .select('id')
    .like('id', `${prefix}%`)
    .order('id', { ascending: false })
    .limit(1);

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Unable to allocate Order ID: ${error.message}`);
  }

  let nextSeq = 1;
  if (data && data.length > 0) {
    const lastId = data[0].id as string;
    const lastSeq = parseInt(lastId.slice(prefix.length), 10);
    if (!Number.isNaN(lastSeq)) nextSeq = lastSeq + 1;
  }

  return `${prefix}${String(nextSeq).padStart(6, '0')}`;
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ code: 'MethodNotAllowed', message: 'Only POST is allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ code: 'InvalidBody', message: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Required common fields
  const customerName = text(body.customerName);
  const email = text(body.email);
  const phone = text(body.phone);
  const origin = text(body.origin);
  const destination = text(body.destination);

  if (!required(customerName)) {
    return new Response(JSON.stringify({ code: 'InvalidParameter', message: 'Full Name is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!required(email) || !isValidEmail(email)) {
    return new Response(JSON.stringify({ code: 'InvalidParameter', message: 'A valid email address is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!required(phone)) {
    return new Response(JSON.stringify({ code: 'InvalidParameter', message: 'Phone number is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!required(origin)) {
    return new Response(JSON.stringify({ code: 'InvalidParameter', message: 'Origin / pickup location is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!required(destination)) {
    return new Response(JSON.stringify({ code: 'InvalidParameter', message: 'Destination / delivery location is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const orderId = await nextOrderId();
  const now = new Date().toISOString();
  const serviceSlug = text(body.serviceSlug);
  const serviceType = text(body.serviceType);
  const companyName = text(body.companyName);
  const cargoType = text(body.cargoType);
  const shipmentDate = text(body.shipmentDate);
  const weight = text(body.weight);

  const details: Record<string, string> = {};
  const rawDetails = body.shipmentDetails as Record<string, unknown> | undefined;
  if (rawDetails && typeof rawDetails === 'object') {
    Object.entries(rawDetails).forEach(([k, v]) => {
      if (v !== null && v !== undefined && String(v).trim() !== '') {
        details[k] = String(v).trim();
      }
    });
  }

  const { data: shipment, error: insertError } = await supabase
    .from('shipments')
    .insert({
      id: orderId,
      status: 'Order Received',
      service_slug: serviceSlug || null,
      service_type: serviceType || null,
      customer_name: customerName,
      company_name: companyName || null,
      email,
      phone,
      origin,
      destination,
      cargo_type: cargoType || null,
      shipment_date: shipmentDate || null,
      weight: weight || null,
      current_location: origin,
      estimated_delivery: null,
      last_updated: now,
      shipment_details: Object.keys(details).length ? details : null,
    })
    .select('id')
    .single();

  if (insertError || !shipment) {
    return new Response(
      JSON.stringify({ code: 'InsertFailed', message: `Failed to create shipment: ${insertError?.message ?? 'unknown'}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { error: eventError } = await supabase.from('shipment_events').insert({
    shipment_id: orderId,
    status: 'Order Received',
    note: `Shipment request registered with Order ID ${orderId}.`,
    location: origin,
    event_time: now,
  });

  if (eventError) {
    return new Response(
      JSON.stringify({ code: 'EventFailed', message: `Shipment created but event could not be recorded: ${eventError.message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(JSON.stringify({ code: 'OK', data: { orderId } }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});
