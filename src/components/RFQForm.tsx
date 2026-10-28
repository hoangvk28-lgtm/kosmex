"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, getCategory, getProduct } from "@/content/products";
import { documents } from "@/content/documents";
import { markets } from "@/content/markets";
import { site } from "@/content/site";
import { Icon } from "./Icon";

/**
 * RFQ form delivered by Netlify Forms (detected at deploy time from the
 * static HTML: data-netlify + name). Success is shown only after a real 2xx
 * response. If the backend is unreachable (local preview, other host), the
 * user sees an error with the sales email instead of a fake confirmation.
 *
 * On hosts without Netlify Forms (e.g. Vercel), set NEXT_PUBLIC_WEB3FORMS_KEY
 * and submissions go to Web3Forms instead, which emails the sales inbox.
 *
 * NEXT_PUBLIC_RFQ_LIVE=true is set once Kosmex confirms that submission
 * notifications reach the sales inbox; until then a preview notice is shown.
 */
const LIVE = process.env.NEXT_PUBLIC_RFQ_LIVE === "true";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

async function deliver(fd: FormData) {
  if (WEB3FORMS_KEY) {
    // Web3Forms' free plan does not accept file uploads; mention it in the email instead.
    const file = fd.get("attachment");
    fd.delete("attachment");
    if (file instanceof File && file.size) fd.set("attachment-note", `Buyer attached "${file.name}" (not delivered by form; ask the buyer to email it).`);
    fd.delete("form-name");
    fd.delete("bot-field");
    fd.set("access_key", WEB3FORMS_KEY);
    fd.set("subject", `RFQ — ${fd.get("company") ?? ""} (${fd.get("country") ?? ""})`);
    fd.set("from_name", "Kosmex Plywood website");
    fd.set("replyto", String(fd.get("email") ?? ""));
    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd, headers: { Accept: "application/json" } });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) throw new Error(json.message || String(res.status));
    return;
  }
  // Netlify Forms accepts multipart posts to any static path of the site.
  const res = await fetch("/__forms.html", { method: "POST", body: fd });
  if (!res.ok) throw new Error(String(res.status));
}
const FORM_NAME = "rfq";

const EU = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"];
const OTHER = ["Norway", "Switzerland", "United Kingdom", "Other (outside Europe)"];
const DOC_OPTIONS = ["Technical Data Sheet", "Laboratory test reports", "Batch QC report", "FSC-claimed product / certificate", "Declaration of Performance (CE)", "Sourcing / traceability documents", "Product catalogue"];
const DOC_MAP: Record<string, string> = {
  tds: "Technical Data Sheet", specification: "Technical Data Sheet", "lab-test": "Laboratory test reports", "qc-report": "Batch QC report",
  certification: "FSC-claimed product / certificate", dop: "Declaration of Performance (CE)", traceability: "Sourcing / traceability documents", catalogue: "Product catalogue",
};

type Errors = Record<string, string>;

const REQUIRED: [string, string][] = [
  ["name", "Please enter your full name."],
  ["company", "Please enter your company name."],
  ["email", "Please enter a valid business email."],
  ["country", "Please select your country."],
  ["category", "Please select a product category."],
  ["product", "Please select a specific product."],
  ["quantity", "Please enter the required quantity."],
  ["unit", "Please select a unit."],
  ["port", "Please enter the destination port."],
  ["requirements", "Please describe your requirements."],
  ["consent", "Please confirm the privacy notice."],
];

export function RFQForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [country, setCountry] = useState("");
  const [docs, setDocs] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  // Preselect from query string: ?product=, ?country=, ?doc=
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const p = q.get("product");
    if (p) {
      const cat = getCategory(p);
      const prod = getProduct(p);
      if (cat) setCategory(cat.slug);
      if (prod) {
        setCategory(prod.parent);
        setProduct(prod.slug);
      }
    }
    const c = q.get("country");
    const m = markets.find((x) => x.code === c?.toUpperCase());
    if (m) setCountry(m.name);
    const d = documents.find((x) => x.slug === q.get("doc"));
    if (d) setDocs([DOC_MAP[d.docClass]]);
  }, []);

  const products = useMemo(() => getCategory(category)?.children ?? [], [category]);

  function validate(fd: FormData): Errors {
    const e: Errors = {};
    for (const [k, msg] of REQUIRED) {
      const v = fd.get(k);
      if (!v || (typeof v === "string" && !v.trim())) e[k] = msg;
    }
    const email = String(fd.get("email") || "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = "Please enter a valid email address.";
    const qty = String(fd.get("quantity") || "");
    if (qty && !(Number(qty) > 0)) e.quantity = "Quantity must be a number greater than zero.";
    const file = fd.get("attachment");
    if (file instanceof File && file.size > 8 * 1024 * 1024) e.attachment = "Attachment must be smaller than 8 MB.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    if (fd.get("bot-field")) return; // honeypot
    fd.set("product-label", getProduct(String(fd.get("product")))?.name ?? String(fd.get("product")));
    setState("sending");
    try {
      await deliver(fd);
      setState("sent");
      form.reset();
      window.scrollTo({ top: (formRef.current?.offsetTop ?? 0) - 140, behavior: "smooth" });
    } catch {
      setState("failed");
    }
  }

  if (state === "sent")
    return (
      <div role="status" className="border border-forest/25 bg-white p-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center bg-forest text-white"><Icon name="check" className="h-7 w-7" strokeWidth={2.4} /></span>
        <h2 className="mt-6 text-[length:var(--text-h3)]">Thank you. Your request has been received.</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted">The Kosmex sales team will review your requirements and reply by email. For urgent requests, contact <a className="font-semibold text-forest underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
        <button type="button" onClick={() => setState("idle")} className="btn btn-outline btn-sm mt-8">Submit another request</button>
      </div>
    );

  const err = (k: string) => (errors[k] ? <p id={`${k}-err`} className="field-error">{errors[k]}</p> : null);
  const aria = (k: string) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });
  const req = <span className="text-[#b3261e]" aria-hidden> *</span>;

  return (
    <form
      ref={formRef}
      name={FORM_NAME}
      method="POST"
      action="/__forms.html"
      encType="multipart/form-data"
      noValidate
      onSubmit={onSubmit}
      className="border border-line bg-white p-6 md:p-10"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hidden"><label>Leave empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>

      {!LIVE && (
        <div role="note" className="mb-8 border-l-2 border-amber bg-amber-bg px-5 py-4 text-[.88rem] text-[#6b4a14]">
          <strong>Preview notice:</strong> delivery of form submissions to the Kosmex sales inbox is still being configured. To make sure your request arrives, please also email <a className="font-semibold underline" href={`mailto:${site.email}`}>{site.email}</a>.
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <div role="alert" className="mb-8 border-l-2 border-[#b3261e] bg-[#fdf0ef] px-5 py-4 text-[.9rem] text-[#8c1d18]">
          Please correct the {Object.keys(errors).length} highlighted field{Object.keys(errors).length > 1 ? "s" : ""}.
        </div>
      )}

      <Fieldset legend="Your company">
        <Field id="name" label={<>Full name{req}</>}>{<input id="name" name="name" autoComplete="name" className="field-input" {...aria("name")} />}{err("name")}</Field>
        <Field id="company" label={<>Company name{req}</>}><input id="company" name="company" autoComplete="organization" className="field-input" {...aria("company")} />{err("company")}</Field>
        <Field id="email" label={<>Business email{req}</>}><input id="email" name="email" type="email" autoComplete="email" className="field-input" {...aria("email")} />{err("email")}</Field>
        <Field id="phone" label="Phone / WhatsApp"><input id="phone" name="phone" type="tel" autoComplete="tel" className="field-input" /></Field>
        <Field id="country" label={<>Country{req}</>}>
          <select id="country" name="country" className="field-input" value={country} onChange={(e) => setCountry(e.target.value)} {...aria("country")}>
            <option value="">Select country</option>
            <optgroup label="Priority markets">{markets.map((m) => <option key={m.slug} value={m.name}>{m.name}</option>)}</optgroup>
            <optgroup label="Other EU">{EU.filter((c) => !markets.some((m) => m.name === c)).map((c) => <option key={c}>{c}</option>)}</optgroup>
            <optgroup label="Other">{OTHER.map((c) => <option key={c}>{c}</option>)}</optgroup>
          </select>
          {err("country")}
        </Field>
        <Field id="port" label={<>Destination port{req}</>}><input id="port" name="port" placeholder="e.g. Hamburg, Gdańsk, Valencia" className="field-input" {...aria("port")} />{err("port")}</Field>
      </Fieldset>

      <Fieldset legend="Product">
        <Field id="category" label={<>Product category{req}</>}>
          <select id="category" name="category" className="field-input" value={category} onChange={(e) => { setCategory(e.target.value); setProduct(""); }} {...aria("category")}>
            <option value="">Select category</option>
            {categories.map((c) => <option key={c.slug} value={c.slug}>{c.order}. {c.name}</option>)}
          </select>
          {err("category")}
        </Field>
        <Field id="product" label={<>Specific product{req}</>}>
          <select id="product" name="product" className="field-input" value={product} onChange={(e) => setProduct(e.target.value)} disabled={!category} {...aria("product")}>
            <option value="">{category ? "Select product" : "Select a category first"}</option>
            {products.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
            {category && <option value={`${category}:multiple`}>Several / not sure yet</option>}
          </select>
          {err("product")}
        </Field>
        <Field id="thickness" label="Thickness"><input id="thickness" name="thickness" placeholder="e.g. 18 mm" className="field-input" /></Field>
        <Field id="dimensions" label="Dimensions"><input id="dimensions" name="dimensions" placeholder="e.g. 1250 × 2500 mm" className="field-input" /></Field>
        <Field id="film" label="Film weight (film faced only)">
          <select id="film" name="film" className="field-input" defaultValue="">
            <option value="">Not applicable / not sure</option>
            <option>120 g/m²</option><option>180 g/m²</option><option>220 g/m² (anti-slip)</option><option>Other</option>
          </select>
        </Field>
        <Field id="delivery" label="Expected delivery window">
          <select id="delivery" name="delivery" className="field-input" defaultValue="">
            <option value="">Select</option>
            <option>Within 1 month</option><option>1–3 months</option><option>3–6 months</option><option>Recurring supply</option><option>Planning / budget only</option>
          </select>
        </Field>
        <div className="grid grid-cols-[1fr_9rem] gap-3 md:col-span-2">
          <Field id="quantity" label={<>Required quantity{req}</>}><input id="quantity" name="quantity" type="number" min="0" step="any" inputMode="decimal" className="field-input" {...aria("quantity")} />{err("quantity")}</Field>
          <Field id="unit" label={<>Unit{req}</>}>
            <select id="unit" name="unit" className="field-input" defaultValue="m³" {...aria("unit")}>
              <option value="m³">m³</option>
              <option value="Containers">Containers</option>
            </select>
          </Field>
        </div>
      </Fieldset>

      <Fieldset legend="Documentation & details">
        <fieldset className="md:col-span-2">
          <legend className="field-label">Required documentation</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {DOC_OPTIONS.map((d) => (
              <label key={d} className="flex cursor-pointer items-center gap-3 border border-line px-4 py-3 text-[.92rem] has-[:checked]:border-forest has-[:checked]:bg-ivory">
                <input type="checkbox" name="documents" value={d} checked={docs.includes(d)} onChange={(e) => setDocs(e.target.checked ? [...docs, d] : docs.filter((x) => x !== d))} className="h-4 w-4 accent-[var(--color-forest)]" />
                {d}
              </label>
            ))}
          </div>
        </fieldset>
        <Field id="requirements" label={<>Additional requirements{req}</>} wide>
          <textarea id="requirements" name="requirements" rows={5} placeholder="Application, grade, glue, logo printing, packing, Incoterm, target price basis…" className="field-input" {...aria("requirements")} />
          {err("requirements")}
        </Field>
        <Field id="attachment" label="File attachment (drawing, specification; PDF/JPG/PNG/XLSX, max 8 MB)" wide>
          <input id="attachment" name="attachment" type="file" accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx" className="field-input file:mr-4 file:border-0 file:bg-ivory-2 file:px-3 file:py-1.5 file:font-semibold" {...aria("attachment")} />
          {err("attachment")}
        </Field>
      </Fieldset>

      <div className="mt-2 border-t border-line pt-6">
        <label className="flex cursor-pointer gap-3 text-[.9rem] leading-relaxed">
          <input type="checkbox" name="consent" value="yes" className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-forest)]" {...aria("consent")} />
          <span>I agree that Kosmex may process the information in this form to respond to my enquiry, as described in the <Link href="/privacy-policy/" className="font-semibold text-forest underline">Privacy Policy</Link>.{req}</span>
        </label>
        {err("consent")}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[.8rem] text-muted"><span className="text-[#b3261e]">*</span> Required fields</p>
        <button type="submit" disabled={state === "sending"} className="btn btn-primary min-w-[220px] disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Submit request"} <Icon name="arrow" />
        </button>
      </div>

      {state === "failed" && (
        <div role="alert" className="mt-6 border-l-2 border-[#b3261e] bg-[#fdf0ef] px-5 py-4 text-[.9rem] text-[#8c1d18]">
          Your request could not be sent from this page. Nothing was submitted. Please email <a className="font-semibold underline" href={`mailto:${site.email}?subject=RFQ`}>{site.email}</a> or call {site.phoneDisplay}.
        </div>
      )}
    </form>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="mb-10">
      <legend className="mb-6 w-full border-b border-line pb-3 font-display text-[1.1rem] font-bold text-forest">{legend}</legend>
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({ id, label, children, wide = false }: { id: string; label: React.ReactNode; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "md:col-span-2" : ""}>
      <label htmlFor={id} className="field-label">{label}</label>
      {children}
    </div>
  );
}
