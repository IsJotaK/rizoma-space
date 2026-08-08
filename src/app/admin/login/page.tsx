"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="login">
      <form className="login__card" onSubmit={handleSubmit}>
        <div className="login__brand">
          <img className="login__brand-logo" src="/img/logo.png" alt="Rizoma Space" width="44" height="44" />
          <div>
            <h1 className="login__title">Rizoma Space</h1>
          </div>
        </div>
        <p className="login__sub">Panel de administración</p>
        <a href="https://rizoma-space.vercel.app" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--green-700)", marginBottom: 18, display: "inline-block" }}>
          ← Volver a la página
        </a>

        {error && <div className="login__error">{error}</div>}

        <label className="label" htmlFor="email">Correo</label>
        <input
          className="input"
          id="email"
          type="email"
          required
          autoComplete="username"
          placeholder="admin@rizomaspace.cl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 14 }}
        />

        <label className="label" htmlFor="password">Contraseña</label>
        <input
          className="input"
          id="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 20 }}
        />

        <button className="btn btn--primary" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
          {loading ? (
            <span className="saving"><span className="spinner" /> Ingresando…</span>
          ) : (
            "Ingresar"
          )}
        </button>

        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 16, textAlign: "center" }}>
          Acceso restringido al equipo de Rizoma Space
        </p>
      </form>
    </div>
  );
}