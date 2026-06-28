const FORM_PROVIDER = import.meta.env.VITE_FORM_PROVIDER || 'web3forms';

export async function submitForm(formRef, { formName, subject }) {
  const fd = new FormData(formRef.current);

  if (FORM_PROVIDER === 'netlify') {
    fd.append('form-name', formName);
    const res = await fetch('/', { method: 'POST', body: fd });
    return res.json();
  }

  fd.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);
  fd.append('subject', subject);
  const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
  return res.json();
}
