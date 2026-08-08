-- ============================================================================
-- Rizoma Space — Esquema inicial del panel (migración 00001)
-- Tablas administrables + RLS (solo usuarios autenticados) + Storage
-- ============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Helper: actualiza updated_at automáticamente
-- ---------------------------------------------------------------------------
create or replace function public_exists_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ---------------------------------------------------------------------------
-- HOME / HERO  (una sola fila)
-- ---------------------------------------------------------------------------
create table if not exists public.home_hero (
  id                    bigint generated always as identity primary key,
  badge_1               text not null default 'Residuos No Peligrosos',
  badge_2               text not null default 'Certificado de Disposición Final',
  titulo                text not null default 'Retiro de Escombros en',
  titulo_accento        text default 'Temuco',          -- palabra resaltada (shimmer)
  titulo_after         text default 'Certificado',
  subtitulo             text not null default '',
  boton_primario_texto  text default 'Calcular Cotización',
  boton_primario_enlace text default '#cotizacion',
  boton_secundario_texto  text default 'Nuestros Servicios',
  boton_secundario_enlace text default '#servicios',
  imagen_escritorio       text,  -- path o URL de Supabase Storage
  imagen_movil            text,
  updated_at              timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Barra de métricas (hero stats)
-- ---------------------------------------------------------------------------
create table if not exists public.estadisticas (
  id          bigint generated always as identity primary key,
  icono       text,                -- clave de icono (ej. 'shield-check')
  numero      bigint,              -- valor contador (null si es solo icono/texto)
  texto_fijo  text,                -- ej '24/7' cuando no es contador
  prefijo     text default '',
  sufijo      text default '',
  etiqueta    text not null,
  orden       int not null default 0,
  activo      boolean not null default true,
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Servicios
-- ---------------------------------------------------------------------------
create table if not exists public.servicios (
  id          bigint generated always as identity primary key,
  icono        text,                -- clave de icono (truck, trash, …)
  titulo       text not null,
  descripcion  text not null,
  boton_texto  text,
  boton_enlace text,
  orden        int not null default 0,
  activo       boolean not null default true,
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Materiales "Residuos que retiramos" (aceptados / no_aceptados)
-- ---------------------------------------------------------------------------
create table if not exists public.materiales (
  id         bigint generated always as identity primary key,
  tipo       text not null check (tipo in ('aceptados','no_aceptados')),
  texto      text not null,
  orden      int not null default 0,
  activo     boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Certificación  (una sola fila)
-- ---------------------------------------------------------------------------
create table if not exists public.certificacion (
  id                 bigint generated always as identity primary key,
  titulo             text not null,
  descripcion        text not null,
  tarjeta_titulo     text not null,
  tarjeta_parrafo    text not null,
  badge_1            text not null,
  badge_2            text not null,
  badge_3            text not null,
  extra_titulo       text,
  extra_parrafo      text,
  boton_texto        text,
  boton_enlace       text,
  updated_at         timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Pasos "Cómo Funciona" (3 por defecto, extensible)
-- ---------------------------------------------------------------------------
create table if not exists public.pasos (
  id          bigint generated always as identity primary key,
  numero      int not null,
  titulo      text not null,
  descripcion text,
  orden       int not null default 0,
  activo      boolean not null default true,
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Galería (CRUD de imágenes)
-- ---------------------------------------------------------------------------
create table if not exists public.galeria (
  id          bigint generated always as identity primary key,
  file_url    text not null,        -- referencia a Supabase Storage o path
  titulo      text,
  descripcion text,
  orden       int not null default 0,
  activo      boolean not null default true,
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Títulos/descripciones por sección (servicios, galería, cotiza, contacto…)
-- ---------------------------------------------------------------------------
create table if not exists public.secciones (
  id          bigint generated always as identity primary key,
  slug        text unique not null,   -- 'servicios','galeria','cotiza','cobertura','contacto','como-funciona',…
  titulo      text,
  descripcion text,
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Cobertura de La Araucanía (zonas + tarjeta CTA)
-- ---------------------------------------------------------------------------
create table if not exists public.cobertura_zonas (
  id          bigint generated always as identity primary key,
  tipo        text not null default 'zona' check (tipo in ('zona','cta')),
  titulo      text not null,
  icono       text,                -- clave de icono
  descripcion text,                -- para el CTA
  boton_texto text,                -- para el CTA
  boton_enlace text,               -- para el CTA
  sectores    text[] ,             -- lista de comunas/sectores de una zona
  orden       int not null default 0,
  activo      boolean not null default true,
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Contacto (una sola fila)
-- ---------------------------------------------------------------------------
create table if not exists public.contacto (
  id            bigint generated always as identity primary key,
  telefono_1    text,
  telefono_2    text,
  whatsapp_1    text,              -- solo número, ej '56986618409'
  whatsapp_2    text,
  email         text,
  direccion     text,              -- campo opcional
  horario       text,              -- campo opcional
  updated_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Redes sociales (DOI)                     (nombre columna cada URL)
-- ---------------------------------------------------------------------------
create table if not exists public.redes (
  id         bigint generated always as identity primary key,
  nombre     text not null,       -- 'instagram','facebook','whatsapp_1',…
  url        text not null,
  icono      text,                -- clave de icono para mostrar
  activo     boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Configuración del sitio (SEO + cotización + footer) — una fila
-- ---------------------------------------------------------------------------
create table if not exists public.config_sitio (
  id                  bigint generated always as identity primary key,
  nombre_sitio        text not null default 'Rizoma Space',
  meta_titulo         text,
  meta_descripcion    text,
  og_titulo           text,
  og_descripcion      text,
  footer_texto        text,
  cotizacion_whatsapp text,     -- número que recibe las cotizaciones
  updated_at          timestamptz not null default now()
);

-- ===========================================================================
-- Triggers updated_at
-- ===========================================================================
do $$
declare t record;
begin
  for t in select table_name from information_schema.tables
           where table_schema='public' and table_type='BASE TABLE'
           and table_name in ('home_hero','estadisticas','servicios','materiales',
                              'certificacion','pasos','galeria','secciones',
                              'cobertura_zonas','contacto','redes','config_sitio')
  loop
    execute format('create trigger tg_%I_updated_at before update on public.%I
                    for each row execute function public_exists_updated_at()', t.table_name, t.table_name);
  end loop;
end $$;

-- ===========================================================================
-- Row Level Security: solo usuarios autenticados pueden leer/escribir
-- (RSL sin acceso anónimo: el frontend público no lee de Supabase en la Opción B;
--  en la Opción A se añadirá política de lectura pública select solo si hace falta)
-- ===========================================================================
alter table public.home_hero        enable row level security;
alter table public.estadisticas     enable row level security;
alter table public.servicios        enable row level security;
alter table public.materiales       enable row level security;
alter table public.certificacion    enable row level security;
alter table public.pasos            enable row level security;
alter table public.galeria          enable row level security;
alter table public.secciones        enable row level security;
alter table public.cobertura_zonas  enable row level security;
alter table public.contacto         enable row level security;
alter table public.redes            enable row level security;
alter table public.config_sitio     enable row level security;

-- política: el Cliente (admin autenticado) tiene control total
do $$
declare t record;
begin
  for t in select tablename from pg_tables where schemaname='public'
           and tablename in ('home_hero','estadisticas','servicios','materiales',
                             'certificacion','pasos','galeria','secciones',
                             'cobertura_zonas','contacto','redes','config_sitio')
  loop
    execute format('create policy "admin_all_%s" on public.%I for all to authenticated using (true) with check (true)', t.tablename, t.tablename);
  end loop;
end $$;

-- ===========================================================================
-- Storage: bucket público "images" para el administrador
-- Nota: en Supabase el acceso a storage.objects se gestiona con RLS.
-- Crear el bucket desde el Dashboard (Storage → New bucket → "images", Public).
-- Si se prefiere vía SQL, habilitar RLS y crear políticas sobre storage.objects:
-- ---------------------------------------------------------------------------
-- alter table storage.objects enable row level security;
-- create policy "admin upload images" on storage.objects
--   for insert to authenticated with check (bucket_id = 'images');
-- create policy "admin update images" on storage.objects
--   for update to authenticated using (bucket_id = 'images');
-- create policy "admin delete images" on storage.objects
--   for delete to authenticated using (bucket_id = 'images');
-- create policy "public read images" on storage.objects
--   for select using (bucket_id = 'images');
-- ---------------------------------------------------------------------------