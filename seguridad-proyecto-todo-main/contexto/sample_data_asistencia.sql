-- SQL commands to insert sample data into the registros_asistencia table.

-- Insert a sample check-in record
-- Please make sure that a user with id_usuario = 1 and a shift with id_turno = 1 exist in your database.
INSERT INTO public.registros_asistencia (id_turno, id_usuario, check_in_time) VALUES
(1, 1, '2025-11-28 08:00:00');
