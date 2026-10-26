import { useState } from "react";
import { track } from "@/lib/track";

// Web3Forms access keys are designed to be public: they only allow sending
// to the inbox registered with the key. Get one at https://web3forms.com.
const WEB3FORMS_ACCESS_KEY = "c517e8d4-d132-4dc0-bb51-52c84b944915";

const REASONS = [
  "I need a course built",
  "I need an app or site designed",
  "I'm hiring for a role",
  "Something else",
];

const labelStyle = {
  display: "block",
  fontFamily: "Archivo, sans-serif",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "#5F5A50",
  marginBottom: 6,
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  fontFamily: "Newsreader, Georgia, serif",
  fontSize: 17,
  color: "#14120F",
  background: "#FBF9F4",
  border: "1px solid #14120F",
  borderRadius: 0,
  padding: "11px 12px",
  outline: "none",
};

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [reason, setReason] = useState(REASONS[0]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;

    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("subject", `Portfolio enquiry: ${reason}`);
    data.append("from_name", "kazeemsalau.com");

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("sent");
      form.reset();
      track("contact_form_submit", { reason });
    } catch {
      setStatus("error");
      track("contact_form_error", { reason });
    }
  }

  if (status === "sent") {
    return (
      <div role="status" style={{ padding: "8px 0" }}>
        <div
          style={{
            fontFamily: "Archivo, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(24px, 3vw, 34px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginBottom: 10,
          }}
        >
          Thanks, it&rsquo;s with me.
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: "#3A362F", margin: 0 }}>
          I usually reply the same day. Keep an eye on your inbox, and your spam folder just in case.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div role="radiogroup" aria-label="What brings you here?" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {REASONS.map((r) => {
          const active = r === reason;
          return (
            <button
              key={r}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setReason(r)}
              style={{
                fontFamily: "Archivo, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                padding: "9px 12px",
                cursor: "pointer",
                border: "1px solid #14120F",
                background: active ? "#14120F" : "transparent",
                color: active ? "#F4F1EA" : "#14120F",
              }}
            >
              {r}
            </button>
          );
        })}
      </div>
      <input type="hidden" name="reason" value={reason} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        <label>
          <span style={labelStyle}>Your name</span>
          <input name="name" required autoComplete="name" style={inputStyle} />
        </label>
        <label>
          <span style={labelStyle}>Your email</span>
          <input name="email" type="email" required autoComplete="email" style={inputStyle} />
        </label>
      </div>
      <label>
        <span style={labelStyle}>Company or organisation (optional)</span>
        <input name="company" autoComplete="organization" style={inputStyle} />
      </label>
      <label>
        <span style={labelStyle}>
          {reason === "I'm hiring for a role" ? "About the role" : "Who is it for, and what is going wrong?"}
        </span>
        <textarea name="message" required rows={5} style={{ ...inputStyle, resize: "vertical" }} />
      </label>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14 }}>
        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            fontFamily: "Archivo, sans-serif",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase" as const,
            padding: "14px 26px",
            background: "#C0281B",
            color: "#F4F1EA",
            border: "none",
            boxShadow: "4px 4px 0 #14120F",
            cursor: status === "sending" ? "wait" : "pointer",
            opacity: status === "sending" ? 0.7 : 1,
          }}
        >
          {status === "sending" ? "Sending…" : "Send message →"}
        </button>
        <span style={{ fontSize: 14, fontStyle: "italic", color: "#5F5A50" }}>Usually answered the same day.</span>
      </div>

      {status === "error" && (
        <p role="alert" style={{ fontSize: 15, color: "#C0281B", margin: 0 }}>
          That didn&rsquo;t send. Please email me directly at{" "}
          <a href={`mailto:${fallbackEmail}`} style={{ color: "#C0281B" }}>
            {fallbackEmail}
          </a>
          .
        </p>
      )}
    </form>
  );
}
