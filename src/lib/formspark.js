export async function submitFormSpark(formId, payload) {
  const url = `https://submit-form.com/${formId}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  // Formspark returns JSON on success/failure, but keep it robust.
  let data = null;
  try {
    data = await res.json();
  } catch {
    // ignore
  }

  if (!res.ok) {
    const message = data?.message || `Formspark submission failed (${res.status})`;
    throw new Error(message);
  }

  return data || { success: true };
}

