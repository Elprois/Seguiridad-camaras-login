-- SQL commands to insert sample data into the database.

-- Insert a sample zone
INSERT INTO public.zonas (nombre_zona) VALUES ('Zona de Pruebas');

-- Insert a sample shift and assign it to user with id_usuario = 1
-- Please make sure that a user with id_usuario = 1 exists in your 'usuarios' table.
-- You also might need to change the dates to be valid for your current date.
INSERT INTO public.turnos (id_usuario, id_zona, fecha_hora_inicio, fecha_hora_fin, estado) VALUES
(1, 1, '2025-11-28 08:00:00', '2025-11-28 16:00:00', 'Asignado');
