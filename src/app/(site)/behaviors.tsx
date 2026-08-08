"use client";

import { useEffect } from "react";

export function SiteBehaviors({ whatsapp }: { whatsapp: string }) {
  const wa = whatsapp || "56986618409";

  useEffect(() => {
    // Navbar toggle
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navbarNav");
    if (navToggle && navMenu) {
      const onToggle = () => {
        navMenu.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(navMenu.classList.contains("open")));
      };
      navToggle.addEventListener("click", onToggle);
      navMenu.querySelectorAll<HTMLAnchorElement>(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      });
      return () => navToggle.removeEventListener("click", onToggle);
    }
  }, [whatsapp]);

  useEffect(() => {
    // Header shadow on scroll
    const header = document.querySelector<HTMLElement>(".navbar");
    if (header) {
      const onScroll = () => {
        if (window.scrollY > 50) {
          header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.08)";
          header.style.borderBottomColor = "rgba(0,0,0,0.06)";
        } else {
          header.style.boxShadow = "none";
          header.style.borderBottomColor = "var(--gray-200)";
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  useEffect(() => {
    // Scroll reveal
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    // Counter animation
    function animateCounter(el: HTMLElement) {
      const target = parseInt(el.dataset.target || "0", 10);
      const duration = 1500;
      const start = performance.now();
      function update(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = String(target);
      }
      requestAnimationFrame(update);
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll(".counter").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    // 3D tilt
    const cards = document.querySelectorAll<HTMLElement>(".tilt");
    const handlers: { el: HTMLElement; fn: (e: MouseEvent) => void; leave: () => void }[] = [];
    cards.forEach((card) => {
      const move = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--rx", `${((y - rect.height / 2) / rect.height) * -8}deg`);
        card.style.setProperty("--ry", `${((x - rect.width / 2) / rect.width) * 8}deg`);
      };
      const leave = () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      };
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      handlers.push({ el: card, fn: move, leave });
    });
    return () => {
      handlers.forEach(({ el, fn, leave }) => {
        el.removeEventListener("mousemove", fn);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  useEffect(() => {
    // Form validation & WhatsApp
    const sendBtn = document.getElementById("sendQuoteBtn");
    const newQuoteBtn = document.getElementById("newQuoteBtn");
    const toast = document.getElementById("thankyouToast");

    const getVal = (id: string) =>
      ((document.getElementById(id) as HTMLInputElement) || {}).value || "";
    const showError = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.classList.add("show");
    };
    const hideError = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.classList.remove("show");
    };
    const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

    const sendWhatsApp = () => {
      const name = getVal("qname").trim();
      const email = getVal("qemail").trim();
      const phone = getVal("qphone").trim();
      const location = getVal("qlocation").trim();
      const company = getVal("qcompany").trim();
      const when = getVal("qwhen");
      const message = getVal("qmessage").trim();

      let valid = true;
      hideError("nameError");
      hideError("emailError");
      hideError("phoneError");
      hideError("locationError");

      if (name.split(" ").length < 2) {
        showError("nameError");
        valid = false;
      }
      if (!validateEmail(email)) {
        showError("emailError");
        valid = false;
      }
      if (!phone || phone.length !== 8 || !/^\d+$/.test(phone)) {
        showError("phoneError");
        valid = false;
      }
      if (!location) {
        showError("locationError");
        valid = false;
      }
      if (!valid) return;

      let msg = "Hola Rizoma Space, quiero cotizar:\n\n";
      msg += "━━ DATOS DEL CLIENTE ━━\n";
      msg += `*Nombre:* ${name}\n`;
      if (company) msg += `*Empresa:* ${company}\n`;
      msg += `*Email:* ${email}\n`;
      msg += `*Teléfono:* +56 9 ${phone}\n`;
      msg += "━━ DETALLE DEL SERVICIO ━━\n";
      if (location) msg += `*Dirección:* ${location}\n`;
      if (when) msg += `*Fecha solicitada:* ${when}\n`;
      if (message) msg += `*Detalles:* ${message}\n`;

      const url =
        `https://wa.me/${wa}?text=` +
        encodeURIComponent(msg.replace(/\*\*/g, "\u200b").replace(/\*/g, ""));
      window.open(url, "_blank");
      if (toast) toast.classList.add("show");
    };

    if (sendBtn) sendBtn.addEventListener("click", sendWhatsApp);
    if (newQuoteBtn && toast) {
      const onNew = () => {
        toast.classList.remove("show");
        ["qname", "qcompany", "qemail", "qphone", "qlocation", "qwhen", "qmessage"].forEach(
          (id) => {
            const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement;
            if (el) el.value = "";
          }
        );
        ["nameError", "emailError", "phoneError", "locationError"].forEach(hideError);
        const first = document.getElementById("qname") as HTMLElement | null;
        if (first) first.focus();
      };
      newQuoteBtn.addEventListener("click", onNew);
      return () => {
        if (sendBtn) sendBtn.removeEventListener("click", sendWhatsApp);
        newQuoteBtn.removeEventListener("click", onNew);
      };
    }
    return undefined;
  }, [wa]);

  useEffect(() => {
    // Back to top
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    const onScroll = () => btn.classList.toggle("visible", window.scrollY > 400);
    const onClick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      btn.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}