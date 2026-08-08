-- ============================================================================
-- Rizoma Space — Lectura pública (migración 00002)
-- Permite que la página principal (/) lea el contenido de Supabase con la clave
-- "anon". El contenido es marketing público (no sensible): se habilita solo
-- SELECT para anon. Las escrituras/borrados siguen siendo solo del admin.
-- ============================================================================

-- Quitamos las políticas "admin_all" a roles (ver abajo) y en su lugar:
-- 1) SELECT para anon (público) sobre cada tabla de contenido.
-- 2) Enforce: las escrituras quedan a authenticated (ya existen por 00001).

do $$
declare t record;
begin
  for t in select tablename from pg_tables where schemaname='public'
           and tablename in ('home_hero','estadisticas','servicios','materiales',
                             'certificacion','pasos','galeria','secciones',
                             'cobertura_zonas','contacto','redes','config_sitio')
  loop
    execute format(
      'create policy "public_read_%s" on public.%I for select to anon using (true)',
      t.tablename, t.tablename);
  end loop;
end $$;