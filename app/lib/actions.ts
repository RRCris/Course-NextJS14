'use server';

import { z } from 'zod';
import { Invoice } from './definitions';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

//☝ todas las funciones que se exportan aqui se ejecutan en el servidor

const CreateInvoiceSheme = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoiceFormSheme = CreateInvoiceSheme.omit({
  id: true,
  date: true,
});
export async function createInvoice(formData: FormData) {
  const { amount, customerId, status } = CreateInvoiceFormSheme.parse(
    Object.fromEntries(formData.entries()),
  );
  const amountInCents = amount * 100;
  const [date] = new Date().toISOString().split('T');

  console.log(date);

  await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
