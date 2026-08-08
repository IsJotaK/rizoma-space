import { Icon } from "@/app/(site)/icons";
import type { SiteData, SeccionMeta } from "@/lib/site-assembly";

export interface EditorSelection {
  table: string;
  id?: number | null;
  slug?: string;
}

interface SitePageProps {
  data: SiteData;
  editMode?: boolean;
  selected?: EditorSelection | null;
  onSelect?: (sel: EditorSelection) => void;
}

function sectionTitle(text?: string) {
  if (!text) return null;
  const words = text.trim().split(/\s+/);
  if (words.length < 2) return <>{text}</>;
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <span>{last}</span>
    </>
  );
}

const rv = (edit: boolean) => (c: string) => (edit ? c.split(" reveal").join("") : c);

export default function SitePage({
  data: d,
  editMode = false,
  selected,
  onSelect,
}: SitePageProps) {
  const wa1 =
    d.redes.find((r) => r.nombre === "whatsapp_1")?.url ||
    `https://wa.me/${d.contacto.whatsapp_1}`;
  const wa2 =
    d.redes.find((r) => r.nombre === "whatsapp_2")?.url ||
    `https://wa.me/${d.contacto.whatsapp_2}`;
  const instagram = d.redes.find((r) => r.nombre === "instagram")?.url;
  const facebook = d.redes.find((r) => r.nombre === "facebook")?.url;
  const galleryItems = [...d.galeria, ...d.galeria];
  const cls = rv(editMode);

  function sel(table: string, id?: number | null, slug?: string, active?: boolean) {
    const match =
      selected &&
      selected.table === table &&
      (slug !== undefined ? selected.slug === slug : id != null && selected.id === id);
    return editMode
      ? {
          "data-ed-table": table,
          "data-ed-id": id ?? null,
          "data-ed-slug": slug,
          "data-ed-inactive": active === false ? "true" : undefined,
          className: match ? "editor-sel" : undefined,
          onClick: onSelect
            ? (e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                onSelect({ table, id: id ?? null, slug });
              }
            : undefined,
        }
      : {};
  }

  function Header({ slug, meta }: { slug: string; meta?: SeccionMeta }) {
    return (
      <div className="section__header text-center" {...sel("secciones", meta?.id, slug)}>
        <h2 className="section__title">{sectionTitle(meta?.titulo)}</h2>
        <p className="section__desc">{meta?.descripcion}</p>
      </div>
    );
  }

  return (
    <div className={`site-render ${editMode ? "is-edit" : ""}`}>
      <nav className="navbar fixed-top" id="header">
        <div className="container">
          <a className="navbar-brand" href="#">
            <picture>
              <source srcSet="/img/logo.webp" type="image/webp" />
              <img src="/img/logo.png" alt="Rizoma Space" className="brand-logo" width="44" height="44" />
            </picture>
            <span className="header__logo-text">
              Rizoma <span>Space</span>
            </span>
          </a>
          <button className="navbar-toggler" id="navToggle" aria-label="Menú" aria-expanded="false">
            <Icon name="hamburger" />
          </button>
          <div className="navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {[
                ["#inicio", "Inicio"],
                ["#servicios", "Servicios"],
                ["#galeria", "Galería"],
                ["#como-funciona", "Cómo Funciona"],
                ["#cotizacion", "Cotizar"],
                ["#certificacion", "Certificación"],
                ["#contacto", "Contacto"],
              ].map(([href, label]) => (
                <li key={href as string}>
                  <a className="nav-link" href={href as string}>
                    {label as string}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <a
            href={wa1}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--whatsapp-header d-none d-lg-inline-flex"
          >
            <Icon name="whatsapp" className="icon--whatsapp icon icon-sm" /> WhatsApp
          </a>
        </div>
      </nav>

      {/* Portada */}
      <section className="hero" id="inicio">
        <div className="hero__bg" style={{ backgroundImage: `url('${d.hero.imagen_escritorio}')` }} />
        <div className="hero__overlay" />
        <div className="hero__pattern" />
        <div className="container">
          <div className="row justify-content-center hero__row">
            <div className="col-lg-10 text-center">
              <div className="hero__glass" {...sel("home_hero", d.hero.id)}>
                <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
                  <span className="hero__chip">
                    <Icon name="shield" className="icon-sm" /> {d.hero.badge_1}
                  </span>
                  <span className="hero__chip">
                    <Icon name="file-text" className="icon-sm" /> {d.hero.badge_2}
                  </span>
                </div>
                <h1 className="hero__title">
                  {d.hero.titulo} <span className="word-shimmer">{d.hero.titulo_accento}</span>
                  <br />
                  {d.hero.titulo_after}
                </h1>
                <p className="hero__subtitle mx-auto">{d.hero.subtitulo}</p>
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                  <a href={d.hero.boton_primario_enlace} className="btn btn--primary">
                    <Icon name="calculator" className="icon-sm" /> {d.hero.boton_primario_texto}
                  </a>
                  <a href={d.hero.boton_secundario_enlace} className="btn btn--outline">
                    {d.hero.boton_secundario_texto}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Métricas */}
      <section className="hero-stats-bar">
        <div className="container">
          <div className="hero-stats-bar__grid">
            {d.stats.map((st, i) => (
              <div className="hero-stats-bar__item" key={i} {...sel("estadisticas", st.id, undefined, st.activo)}>
                {st.icono ? (
                  <span className="hero-stats-bar__icon">
                    <Icon name={st.icono} />
                  </span>
                ) : st.numero !== null && st.numero !== undefined ? (
                  <span className="hero-stats-bar__number">
                    {st.prefijo}
                    {editMode ? (
                      <span data-target={st.numero}>{st.numero}</span>
                    ) : (
                      <span className="counter" data-target={st.numero}>
                        0
                      </span>
                    )}
                    {st.sufijo}
                  </span>
                ) : (
                  <span className="hero-stats-bar__number">
                    {st.prefijo}
                    {st.texto_fijo}
                    {st.sufijo}
                  </span>
                )}
                <span className="hero-stats-bar__label">{st.etiqueta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="services section--alt" id="servicios">
        <div className="container">
          <Header slug="servicios" meta={d.secciones.servicios} />
          <div className="row g-4 justify-content-center">
            {d.services.map((sv, i) => (
              <div className="col-lg-6" key={i}>
                <div
                  className={cls("service-card h-100 tilt reveal")}
                  {...sel("servicios", sv.id, undefined, sv.activo)}
                >
                  <div className="service-card__icon">
                    <Icon name={sv.icono} />
                  </div>
                  <h3 className="service-card__title">{sv.titulo}</h3>
                  <p className="service-card__desc">{sv.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
          {(d.aceptados.length > 0 || d.noAceptados.length > 0) && (
            <div className="row g-4 mt-4 justify-content-center">
              <div className="col-lg-10">
                <div className="materials-info__card">
                  <h3 className="materials-info__title">
                    <Icon name="clipboard" /> Residuos que retiramos
                  </h3>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <h4 className="materials-info__subtitle">
                        <Icon name="circle-check" className="icon-sm icon-check" /> Aceptamos
                      </h4>
                      <ul className="materials-info__list">
                        {d.aceptados.map((m, i) => (
                          <li key={i} {...sel("materiales", m.id, undefined, m.activo)}>
                            {m.texto}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-sm-6">
                      <h4 className="materials-info__subtitle">
                        <Icon name="times" className="icon-sm icon-times" /> No aceptamos
                      </h4>
                      <ul className="materials-info__list materials-info__list--no">
                        {d.noAceptados.map((m, i) => (
                          <li key={i} {...sel("materiales", m.id, undefined, m.activo)}>
                            {m.texto}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="materials-info__footnote">
                    Si tienes dudas sobre algún residuo en particular, consúltanos por WhatsApp y te confirmamos.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Certificación */}
      <section className="certification" id="certificacion">
        <div className="container">
          <Header slug="certificacion" meta={d.secciones.certificacion || { titulo: d.certificacion.titulo, descripcion: d.certificacion.descripcion }} />
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className={cls("certification__card reveal")} {...sel("certificacion", d.certificacion.id)}>
                <div className="certification__icon">
                  <Icon name="shield" />
                </div>
                <h3>{d.certificacion.tarjeta_titulo}</h3>
                <p>{d.certificacion.tarjeta_parrafo}</p>
                <div className="certification__badges">
                  {[d.certificacion.badge_1, d.certificacion.badge_2, d.certificacion.badge_3].map(
                    (b, i) =>
                      b && (
                        <div className="cert-badge" key={i}>
                          <Icon name="circle-check" /> <span>{b}</span>
                        </div>
                      )
                  )}
                </div>
                {d.certificacion.extra_titulo && (
                  <div className="certification__extra">
                    <h4>
                      <Icon name="file-text" /> {d.certificacion.extra_titulo}
                    </h4>
                    <p>{d.certificacion.extra_parrafo}</p>
                  </div>
                )}
                {d.certificacion.boton_texto && (
                  <a
                    href={d.certificacion.boton_enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                  >
                    <Icon name="whatsapp" className="icon--whatsapp icon icon-sm" /> {d.certificacion.boton_texto}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="how-it-works" id="como-funciona">
        <div className="container">
          <Header slug="como-funciona" meta={d.secciones["como-funciona"]} />
          <div className="steps">
            {d.pasos.map((p, i) => (
              <div className={cls("step reveal")} key={i} {...sel("pasos", p.id, undefined, p.activo)}>
                <div className="step__number">{p.numero}</div>
                <div className="step__content">
                  <h3>{p.titulo}</h3>
                  <p>{p.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería */}
      <section className="gallery section--alt" id="galeria">
        <div className="container">
          <Header slug="galeria" meta={d.secciones.galeria} />
        </div>
        {galleryItems.length > 0 && (
          <div className="gallery__scroll-wrap">
            <div className="gallery__scroll-track" id="galleryTrack">
              {galleryItems.map((g, i) => (
                <a
                  href={instagram || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls("gallery__scroll-item reveal")}
                  key={i}
                  {...sel("galeria", g.id, undefined, g.activo)}
                >
                  <img src={g.file_url} alt={g.titulo || "Trabajo Rizoma Space"} loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Cotización */}
      <section className="quote" id="cotizacion">
        <div className="container">
          <Header slug="cotiza" meta={d.secciones.cotiza} />
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="quote__form reveal">
                <p className="text-center text-muted mb-4">Completa tus datos y te contactaremos a la brevedad</p>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="qname">
                      Nombre completo *
                    </label>
                    <input type="text" className="form-control" id="qname" required placeholder="Nombre y Apellido" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="qcompany">
                      Empresa
                    </label>
                    <input type="text" className="form-control" id="qcompany" placeholder="Nombre de tu empresa" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="qemail">
                      Email *
                    </label>
                    <input type="email" className="form-control" id="qemail" required placeholder="correo@ejemplo.cl" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="qphone">
                      Teléfono *
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">+56 9</span>
                      <input type="tel" className="form-control" id="qphone" required maxLength={8} placeholder="1234 5678" inputMode="numeric" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="qlocation">
                      Dirección del servicio *
                    </label>
                    <input type="text" className="form-control" id="qlocation" placeholder="Ej: Av. Alemania 850, Temuco" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="qwhen">
                      ¿Qué día necesitas el servicio?
                    </label>
                    <div className="date-picker-wrapper">
                      <Icon name="calendar" className="date-picker-icon" />
                      <input type="date" className="form-control date-picker-input" id="qwhen" />
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="qmessage">
                      Detalles adicionales
                    </label>
                    <textarea className="form-control" id="qmessage" rows={3} placeholder="Ej: volumen estimado, tipo de residuo, dirección exacta..." />
                  </div>
                </div>
                <button type="button" className="btn btn--primary btn--large w-100 mt-4" id="sendQuoteBtn">
                  <Icon name="whatsapp" className="icon--whatsapp icon icon-sm" /> Enviar solicitud por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cobertura */}
      <section className="coverage section--alt" id="cobertura">
        <div className="container">
          <Header slug="cobertura" meta={d.secciones.cobertura} />
          <div className="coverage__grid">
            {d.zonas.map((z, i) => (
              <div className={cls("coverage__zone reveal")} key={i} {...sel("cobertura_zonas", z.id, undefined, z.activo)}>
                <h3 className="coverage__zone-title">
                  <Icon name={z.icono} /> {z.titulo}
                </h3>
                <ul className="coverage__sectors">
                  {z.sectores.map((sx, j) => (
                    <li key={j}>{sx}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className={cls("coverage__zone coverage__zone--cta reveal")} {...sel("cobertura_zonas", d.cta.id)}>
              <Icon name="map-pin" />
              <h3>{d.cta.titulo}</h3>
              <p>{d.cta.descripcion}</p>
              <a href={d.cta.boton_enlace} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn-sm">
                <Icon name="whatsapp" className="icon--whatsapp icon icon-sm" /> {d.cta.boton_texto}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="contact" id="contacto">
        <div className="container">
          <Header slug="contacto" meta={d.secciones.contacto} />
          <div className="contact__grid" {...sel("contacto", d.contacto.id)}>
            <a href={wa1} target="_blank" rel="noopener noreferrer" className="contact__link">
              <span className="contact__link-icon">
                <Icon name="whatsapp" className="icon--whatsapp" />
              </span>
              <span className="contact__link-text">{d.contacto.telefono_1 || "WhatsApp"}</span>
            </a>
            <a href={wa2} target="_blank" rel="noopener noreferrer" className="contact__link">
              <span className="contact__link-icon">
                <Icon name="whatsapp" className="icon--whatsapp" />
              </span>
              <span className="contact__link-text">{d.contacto.telefono_2 || "WhatsApp"}</span>
            </a>
            {d.contacto.email && (
              <a href={`mailto:${d.contacto.email}`} className="contact__link">
                <span className="contact__link-icon">
                  <Icon name="email" className="icon--email" />
                </span>
                <span className="contact__link-text">{d.contacto.email}</span>
              </a>
            )}
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="contact__link">
                <span className="contact__link-icon">
                  <Icon name="instagram" className="icon--instagram" />
                </span>
                <span className="contact__link-text">@rizoma_space_temuco</span>
              </a>
            )}
            {facebook && (
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="contact__link">
                <span className="contact__link-icon">
                  <Icon name="facebook" className="icon--facebook" />
                </span>
                <span className="contact__link-text">Rizoma Space</span>
              </a>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4">
              <picture>
                <source srcSet="/img/logo.webp" type="image/webp" />
                <img src="/img/logo.png" alt="Rizoma Space" className="footer__logo-img" width="64" height="64" />
              </picture>
              <p className="footer__text">{d.config.footer_texto}</p>
            </div>
            <div className="col-lg-4">
              <div className="footer__links">
                <h4>Enlaces</h4>
                <ul>
                  {[
                    ["#inicio", "Inicio"],
                    ["#servicios", "Servicios"],
                    ["#galeria", "Galería"],
                    ["#como-funciona", "Cómo Funciona"],
                    ["#cotizacion", "Cotizar"],
                    ["#certificacion", "Certificación"],
                    ["#cobertura", "Cobertura"],
                    ["#contacto", "Contacto"],
                  ].map(([href, label]) => (
                    <li key={href as string}>
                      <a href={href as string}>{label as string}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="footer__contact">
                <h4>Contacto</h4>
                <a href={wa1} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" className="icon--whatsapp" /> {d.contacto.telefono_1}
                </a>
                <a href={wa2} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" className="icon--whatsapp" /> {d.contacto.telefono_2}
                </a>
                {d.contacto.email && (
                  <a href={`mailto:${d.contacto.email}`}>
                    <Icon name="email" className="icon--email" /> {d.contacto.email}
                  </a>
                )}
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer">
                    <Icon name="instagram" className="icon--instagram" /> @rizoma_space_temuco
                  </a>
                )}
                {facebook && (
                  <a href={facebook} target="_blank" rel="noopener noreferrer">
                    <Icon name="facebook" className="icon--facebook" /> Rizoma Space
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Rizoma Space. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <a href={wa1} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="WhatsApp">
        <Icon name="whatsapp" className="icon--whatsapp" />
      </a>
    </div>
  );
}