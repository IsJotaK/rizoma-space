# Rizoma Space — Panel de Administración + Supabase

Esta carpeta contiene el **esquema y plan** para construir el panel de administración
de Rizoma Space con Supabase (PostgreSQL + Auth + Storage).

> Estado actual: **PLAN + SCHEMA SQL listo para revisión.**
> Todavía NO se implementa el panel Next.js (según inclut el objetivo "deja plan + sql listo").

---

## 1. Decisiones de arquitectura

El proyecto actual es un **sitio estático de una sola página** (`index.html` + el resto de
archivos) alojado en Vercel y GitHub Pages. No es Next.js todavía.

Objetivo: que el cliente pueda editar el contenido desde `/admin` sin tocar código.

Hay **dos formas** de lograrlo (y dan URL/resultados distintos):

### Opción A (RECOMENDADA) — Un solo despliegue Next.js
- Se crea una app Next.js (App Router) que sirve:
  - `/` → la página pública **visualmente idéntica** a la actual
  - `/admin` (+ `/admin/login`) → el panel
- La página pública **lee el contenido desde Supabase** → cuando editas guardas, y el frontend refleja el cambio.
- Todo queda en `https://rizoma-space.vercel.app` y `https://rizoma-space.vercel.app/admin`.
- Requiere re-crear el diseño actual dentro de componentes de Next.js (no cambiar el diseño, solo trasladarlo).

### Opción B — Página pública estática "como está" + panel aparte en subdominio
- Se deja `index.html` tal cual (no cambia).
- El panel es una app Next.js aparte con Supabase.
- PERO: el público **no leería de Supabase**, así que lo que edite el cliente **no se ve** en la página estática.
  Solo tendría sentido como *preview del contenido*, no como CMS funcional.
- Además /admin no puede convivir en el mismo `rizoma-space.vercel.app` que un archivo estático raíz,
  habría que usar `admin.rizoma-space.vercel.app`.

**Conclusión:** si el objetivo real es la experiencia "entro → modifico → la página cambia", la **Opción A** es la correcta. Este SQL está diseñado para ambas, pero la Opción A es la que cumple el objetivo final. De este modo se sirve la página pública con datos de Supabase y se conserva pixel-perfect el diseño actual al trasladarlo.

---

## 2. Tablas propuestas (esquema de contenido por sección)

| Tabla | Concepto |
|---|---|
| `home_hero` | Textos, botones y sido extra del hero (una fila) |
| `estadisticas` | Barra de métricas (contadores) |
| `servicios` | Tarjetas de servicios (CRUD, orden, activo) |
| `materiales` | Lista "Residuos que retiramos" (aceptados / no aceptados) |
| `certificacion` | Bloque de Resolución Sanitaria (una fila) |
| `pasos` | Los 3 pasos de "Cómo Funciona" |
| `galeria` | Imágenes de galería (CRUD, orden, activo) |
| `secciones` | Títulos/subtítulos por sección (servicios, galería, cotiza, contacto…) |
| `cobertura_zonas` | Zonas y sectores de La Araucanía + tarjeta CTA |
| `contacto` | Teléfonos, WhatsApp, email, dirección, horario |
| `redes` | ¿0 más redes sociales (URL, icono) |
| `config_sitio` | SEO (title, description, OG, footer) y número de cotización |

## 3. Autenticación y seguridad
- **Supabase Auth** gestiona administradores (es oficial, no casnero).
- **Row Level Security (RLS)**: solo usuarios **autenticados** pueden leer/escribir tablas.
- Como en este esquema la página estática no lee de Supabase (solo el panel), NO se habilita acceso anónimo.
- Nunca se guarda la service role key en el frontend. Solo variables públicas con prefijo `NEXT_PUBLIC_`.

## 4. Variables de entorno (Vercel)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- (opcional, solo si se ejecutan migraciones desde CLI con `supabase db push` → variables de la CLI, nunca en el cliente)

> Copiar de `.env.example` (no incluir credenciales reales).

---

## 5. Guía paso a paso: crear el proyecto Supabase

1. Crear cuenta en https://supabase.com (botón "Start your project" / login).
2. En el Dashboard: **New project** → nombre p.ej. `rizoma-space`, región cerca (US East / `us-east-1` o similar) y contraseña de la base. Crear.
3. En **Project Settings → Data API**: copiar `Project URL` (= `NEXT_PUBLIC_SUPABASE_URL`) y el `anon public` key (= `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Panel → **SQL Editor → New query**: pegar el contenido de `migrations/00001_init.sql` y ejecutar (`Run`).
5. Panel → **SQL Editor**: pegar el contenido de `seed/00001_seed.sql` y ejecutar. (Carga el contenido actual de la web.)
6. **Authentication → Providers**: mantener habilitado Email (para el login del administrador).
7. En CSV **Authentication → Users → Add user** creas el usuario administrador (correo + contraseña).
8. **Storage → New bucket** → nombre `images`, y marcar **Public**. Añadir las políticas para admin (las políticas vienen en el SQL).
9. Aplicar `migrate` RLS y el rol admin en la bodega.

Luego se integran esas claves en Vercel (Env variables of the admin app) y se conecte el panel Next.js.

---

## 6. Estructura de archivos prevista para el panel (Next.js App Router)

```
rizoma-plane (repo del panel, Opción A)
├── app/
│   ├── layout.tsx
│   ├── page.tsx          # página pública (se traslada el diseño actual, idéntico)
│   ├── admin/
│   │   ├── layout.tsx    # shell del panel protegido
│   │   ├── login/page.tsx
│   │   ├── page.tsx      # dashboard
│   │   ├── home/page.tsx
│   │   ├── nosotros/page.tsx
│   │   ├── servicios/page.tsx
│   │   ├── galeria/page.tsx
│   │   ├── contacto/page.tsx
│   │   └── ... rutas de secciones
│   └── ...
├── components/admin/...   # formularios, layout del panel
├── lib/supabase/          # crearCliente admin (browser/server) y helpers
├── services/              # consultas CRUD por tabla
├── types/                 # tipos TS de cada tabla
├── .env.example
├── supabase/migrations/   # schema SQL
└── supabase/seed/         # contenido actual
```