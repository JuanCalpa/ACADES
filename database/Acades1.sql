DROP DATABASE IF EXISTS ACADES;
CREATE DATABASE ACADES;
USE ACADES;


CREATE TABLE procedimientos (
    id_procedimiento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);


CREATE TABLE administrador (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL
);


CREATE TABLE especialista (
    id_especialista INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    telefono VARCHAR(15),
	correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL
);


CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    cedula VARCHAR(20),
    fecha_nacimiento VARCHAR(100),
    telefono VARCHAR(15),
    contrasena VARCHAR(100) NOT NULL,
    id_admin INT,
    FOREIGN KEY (id_admin) REFERENCES administrador(id_admin)
);

-- Tabla intermedia
CREATE TABLE especialista_procedimiento (
    id_especialista INT,
    id_procedimiento INT,
    PRIMARY KEY (id_especialista, id_procedimiento),
    FOREIGN KEY (id_especialista) REFERENCES especialista(id_especialista) ON DELETE CASCADE,
    FOREIGN KEY (id_procedimiento) REFERENCES procedimientos(id_procedimiento)
);


CREATE TABLE horarios_especialista (
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    id_especialista INT,
    id_dia_semana INT, -- 1 = Lunes, ..., 5 = Viernes
    hora TIME NOT NULL,
    estado ENUM('Disponible', 'Ocupada') DEFAULT 'Disponible',
    FOREIGN KEY (id_especialista) REFERENCES especialista(id_especialista)
);

CREATE TABLE citas (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_especialista INT NOT NULL,
    id_procedimiento INT,
    notas TEXT,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado ENUM('Pendiente', 'Finalizada', 'Cancelada','Confirmada') DEFAULT 'Pendiente',
    estado_hora ENUM('Disponible', 'Ocupada') DEFAULT 'Ocupada',
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_procedimiento) REFERENCES procedimientos(id_procedimiento),
    FOREIGN KEY (id_especialista) REFERENCES especialista(id_especialista) 	ON DELETE CASCADE
);

-- Insertar datos

-- Administradores
INSERT INTO administrador (nombre, correo, contrasena) VALUES
('Sofia Burbano', 'sofi.blu@acades.com', 'admin1'),
('Juan Calpa', 'nadaplete@acades.com', 'admin2'),
('Cristhian Padilla', 'hentai.lopez@acades.com', 'admin3'),
('Stiven Burbano', 'barca@acades.com', 'admin4');

-- Especialistas
INSERT INTO especialista (nombre, especialidad, telefono, correo, contrasena) VALUES
('Sofía Mendoza', 'Uñas acrílicas', '5551234567', 'sofia.mendoza@example.com', 'contrasena123'),
('Javier Peña', 'Cortes de cabello', '5559876543', 'javier.pena@example.com', 'contrasena123'),
('Lucía Herrera', 'Masajes terapéuticos', '5554567890', 'lucia.herrera@example.com', 'contrasena123'),
('Pedro Ramírez', 'Maquillaje profesional', '5552223344', 'pedro.ramirez@example.com', 'contrasena123'),
('Carla Gómez', 'Peinados de gala', '5556781234', 'carla.gomez@example.com', 'contrasena123'),
('Andrea Morales', 'Depilación con cera', '5558887766', 'andrea.morales@example.com', 'contrasena123'),
('Diego Fernández', 'Barbería y afeitado', '5553344556', 'diego.fernandez@example.com', 'contrasena123'),
('Laura Niño', 'Tratamientos faciales', '5551122334', 'laura.nino@example.com', 'contrasena123'),
('Esteban Paredes', 'Tintes de cabello', '5559988776', 'esteban.paredes@example.com', 'contrasena123'),
('Mónica Vélez', 'Extensiones de pestañas', '5554455667', 'monica.velez@example.com', 'contrasena123');


-- Clientes
INSERT INTO cliente (nombre, correo, cedula, fecha_nacimiento, telefono, contrasena, id_admin) VALUES
('Valeria Sánchez', 'valeria.s@gmail.com', '12345', '1995-06-12', '5551230001', 'valeria123', 1),
('Bruno Díaz', 'bruno.d@gmail.com', '5678', '1992-03-08', '5551230002', 'bruno123', 2),
('Camila Torres', 'camila.t@gmail.com', '911911', '1998-11-20', '5551230003', 'camila123', 3),
('Miguel Ángel', 'miguel.a@gmail.com', '0029901', '1990-09-05', '5551230004', 'miguel123', 4),
('Neider Burbano','nsbcpro@gmail.com',1086132085,'2003-12-01','3113925873','Neider123','1');


-- Procedimientos
INSERT INTO procedimientos (nombre) VALUES
('Tratamientos Faciales'),
('Tratamientos Corporales'),
('Yesoterapia Lipolítica'),
('Limpieza Facial'),
('Facial con Dermapen'),
('Curso de Capacitación');

-- Relación especialista - procedimiento (corregida y ampliada)
INSERT INTO especialista_procedimiento (id_especialista, id_procedimiento) VALUES
(1, 1), -- Sofía Mendoza → Uñas acrílicas
(2, 2), -- Javier Peña → Corte de cabello
(3, 3), -- Lucía Herrera → Masaje relajante
(4, 4), -- Pedro Ramírez → Maquillaje de evento
(5, 1), -- Carla Gómez también hace Uñas acrílicas
(5, 4), -- Carla Gómez también hace Maquillaje de evento
(6, 5),  -- Andrea Morales → Depilación con cera
(7, 3),  -- Diego Fernández → Barbería clásica
(8, 4),  -- Laura Niño → Limpieza facial
(9, 5),  -- Esteban Paredes → Tinte de cabello
(10, 2); -- Mónica Vélez → Extensiones de pestañas

-- Horarios para cada especialista
INSERT INTO horarios_especialista (id_especialista, id_dia_semana, hora, estado) VALUES
-- Especialista 1
(1, 1, '09:00:00', 'Disponible'), (1, 1, '10:00:00', 'Disponible'), (1, 1, '11:00:00', 'Disponible'), (1, 1, '12:00:00', 'Disponible'),
(1, 1, '13:00:00', 'Disponible'), (1, 1, '14:00:00', 'Disponible'), (1, 1, '15:00:00', 'Disponible'), (1, 1, '16:00:00', 'Disponible'),
(1, 2, '09:00:00', 'Disponible'), (1, 2, '10:00:00', 'Disponible'), (1, 2, '11:00:00', 'Disponible'), (1, 2, '12:00:00', 'Disponible'),
(1, 2, '13:00:00', 'Disponible'), (1, 2, '14:00:00', 'Disponible'), (1, 2, '15:00:00', 'Disponible'), (1, 2, '16:00:00', 'Disponible'),
(1, 3, '09:00:00', 'Disponible'), (1, 3, '10:00:00', 'Disponible'), (1, 3, '11:00:00', 'Disponible'), (1, 3, '12:00:00', 'Disponible'),
(1, 3, '13:00:00', 'Disponible'), (1, 3, '14:00:00', 'Disponible'), (1, 3, '15:00:00', 'Disponible'), (1, 3, '16:00:00', 'Disponible'),
(1, 4, '09:00:00', 'Disponible'), (1, 4, '10:00:00', 'Disponible'), (1, 4, '11:00:00', 'Disponible'), (1, 4, '12:00:00', 'Disponible'),
(1, 4, '13:00:00', 'Disponible'), (1, 4, '14:00:00', 'Disponible'), (1, 4, '15:00:00', 'Disponible'), (1, 4, '16:00:00', 'Disponible'),
(1, 5, '09:00:00', 'Disponible'), (1, 5, '10:00:00', 'Disponible'), (1, 5, '11:00:00', 'Disponible'), (1, 5, '12:00:00', 'Disponible'),
(1, 5, '13:00:00', 'Disponible'), (1, 5, '14:00:00', 'Disponible'), (1, 5, '15:00:00', 'Disponible'), (1, 5, '16:00:00', 'Disponible'),

-- Especialista 2
(2, 1, '09:00:00', 'Disponible'), (2, 1, '10:00:00', 'Disponible'), (2, 1, '11:00:00', 'Disponible'), (2, 1, '12:00:00', 'Disponible'),
(2, 1, '13:00:00', 'Disponible'), (2, 1, '14:00:00', 'Disponible'), (2, 1, '15:00:00', 'Disponible'), (2, 1, '16:00:00', 'Disponible'),
(2, 2, '09:00:00', 'Disponible'), (2, 2, '10:00:00', 'Disponible'), (2, 2, '11:00:00', 'Disponible'), (2, 2, '12:00:00', 'Disponible'),
(2, 2, '13:00:00', 'Disponible'), (2, 2, '14:00:00', 'Disponible'), (2, 2, '15:00:00', 'Disponible'), (2, 2, '16:00:00', 'Disponible'),
(2, 3, '09:00:00', 'Disponible'), (2, 3, '10:00:00', 'Disponible'), (2, 3, '11:00:00', 'Disponible'), (2, 3, '12:00:00', 'Disponible'),
(2, 3, '13:00:00', 'Disponible'), (2, 3, '14:00:00', 'Disponible'), (2, 3, '15:00:00', 'Disponible'), (2, 3, '16:00:00', 'Disponible'),
(2, 4, '09:00:00', 'Disponible'), (2, 4, '10:00:00', 'Disponible'), (2, 4, '11:00:00', 'Disponible'), (2, 4, '12:00:00', 'Disponible'),
(2, 4, '13:00:00', 'Disponible'), (2, 4, '14:00:00', 'Disponible'), (2, 4, '15:00:00', 'Disponible'), (2, 4, '16:00:00', 'Disponible'),
(2, 5, '09:00:00', 'Disponible'), (2, 5, '10:00:00', 'Disponible'), (2, 5, '11:00:00', 'Disponible'), (2, 5, '12:00:00', 'Disponible'),
(2, 5, '13:00:00', 'Disponible'), (2, 5, '14:00:00', 'Disponible'), (2, 5, '15:00:00', 'Disponible'), (2, 5, '16:00:00', 'Disponible'),

-- Especialista 3
(3, 1, '09:00:00', 'Disponible'), (3, 1, '10:00:00', 'Disponible'), (3, 1, '11:00:00', 'Disponible'), (3, 1, '12:00:00', 'Disponible'),
(3, 1, '13:00:00', 'Disponible'), (3, 1, '14:00:00', 'Disponible'), (3, 1, '15:00:00', 'Disponible'), (3, 1, '16:00:00', 'Disponible'),
(3, 2, '09:00:00', 'Disponible'), (3, 2, '10:00:00', 'Disponible'), (3, 2, '11:00:00', 'Disponible'), (3, 2, '12:00:00', 'Disponible'),
(3, 2, '13:00:00', 'Disponible'), (3, 2, '14:00:00', 'Disponible'), (3, 2, '15:00:00', 'Disponible'), (3, 2, '16:00:00', 'Disponible'),
(3, 3, '09:00:00', 'Disponible'), (3, 3, '10:00:00', 'Disponible'), (3, 3, '11:00:00', 'Disponible'), (3, 3, '12:00:00', 'Disponible'),
(3, 3, '13:00:00', 'Disponible'), (3, 3, '14:00:00', 'Disponible'), (3, 3, '15:00:00', 'Disponible'), (3, 3, '16:00:00', 'Disponible'),
(3, 4, '09:00:00', 'Disponible'), (3, 4, '10:00:00', 'Disponible'), (3, 4, '11:00:00', 'Disponible'), (3, 4, '12:00:00', 'Disponible'),
(3, 4, '13:00:00', 'Disponible'), (3, 4, '14:00:00', 'Disponible'), (3, 4, '15:00:00', 'Disponible'), (3, 4, '16:00:00', 'Disponible'),
(3, 5, '09:00:00', 'Disponible'), (3, 5, '10:00:00', 'Disponible'), (3, 5, '11:00:00', 'Disponible'), (3, 5, '12:00:00', 'Disponible'),
(3, 5, '13:00:00', 'Disponible'), (3, 5, '14:00:00', 'Disponible'), (3, 5, '15:00:00', 'Disponible'), (3, 5, '16:00:00', 'Disponible'),
-- Especialista 4
(4, 1, '09:00:00', 'Disponible'), (4, 1, '10:00:00', 'Disponible'), (4, 1, '11:00:00', 'Disponible'), (4, 1, '12:00:00', 'Disponible'),
(4, 1, '13:00:00', 'Disponible'), (4, 1, '14:00:00', 'Disponible'), (4, 1, '15:00:00', 'Disponible'), (4, 1, '16:00:00', 'Disponible'),
(4, 2, '09:00:00', 'Disponible'), (4, 2, '10:00:00', 'Disponible'), (4, 2, '11:00:00', 'Disponible'), (4, 2, '12:00:00', 'Disponible'),
(4, 2, '13:00:00', 'Disponible'), (4, 2, '14:00:00', 'Disponible'), (4, 2, '15:00:00', 'Disponible'), (4, 2, '16:00:00', 'Disponible'),
(4, 3, '09:00:00', 'Disponible'), (4, 3, '10:00:00', 'Disponible'), (4, 3, '11:00:00', 'Disponible'), (4, 3, '12:00:00', 'Disponible'),
(4, 3, '13:00:00', 'Disponible'), (4, 3, '14:00:00', 'Disponible'), (4, 3, '15:00:00', 'Disponible'), (4, 3, '16:00:00', 'Disponible'),
(4, 4, '09:00:00', 'Disponible'), (4, 4, '10:00:00', 'Disponible'), (4, 4, '11:00:00', 'Disponible'), (4, 4, '12:00:00', 'Disponible'),
(4, 4, '13:00:00', 'Disponible'), (4, 4, '14:00:00', 'Disponible'), (4, 4, '15:00:00', 'Disponible'), (4, 4, '16:00:00', 'Disponible'),
(4, 5, '09:00:00', 'Disponible'), (4, 5, '10:00:00', 'Disponible'), (4, 5, '11:00:00', 'Disponible'), (4, 5, '12:00:00', 'Disponible'),
(4, 5, '13:00:00', 'Disponible'), (4, 5, '14:00:00', 'Disponible'), (4, 5, '15:00:00', 'Disponible'), (4, 5, '16:00:00', 'Disponible'),

-- Especialista 5
(5, 1, '09:00:00', 'Disponible'), (5, 1, '10:00:00', 'Disponible'), (5, 1, '11:00:00', 'Disponible'), (5, 1, '12:00:00', 'Disponible'),
(5, 1, '13:00:00', 'Disponible'), (5, 1, '14:00:00', 'Disponible'), (5, 1, '15:00:00', 'Disponible'), (5, 1, '16:00:00', 'Disponible'),
(5, 2, '09:00:00', 'Disponible'), (5, 2, '10:00:00', 'Disponible'), (5, 2, '11:00:00', 'Disponible'), (5, 2, '12:00:00', 'Disponible'),
(5, 2, '13:00:00', 'Disponible'), (5, 2, '14:00:00', 'Disponible'), (5, 2, '15:00:00', 'Disponible'), (5, 2, '16:00:00', 'Disponible'),
(5, 3, '09:00:00', 'Disponible'), (5, 3, '10:00:00', 'Disponible'), (5, 3, '11:00:00', 'Disponible'), (5, 3, '12:00:00', 'Disponible'),
(5, 3, '13:00:00', 'Disponible'), (5, 3, '14:00:00', 'Disponible'), (5, 3, '15:00:00', 'Disponible'), (5, 3, '16:00:00', 'Disponible'),
(5, 4, '09:00:00', 'Disponible'), (5, 4, '10:00:00', 'Disponible'), (5, 4, '11:00:00', 'Disponible'), (5, 4, '12:00:00', 'Disponible'),
(5, 4, '13:00:00', 'Disponible'), (5, 4, '14:00:00', 'Disponible'), (5, 4, '15:00:00', 'Disponible'), (5, 4, '16:00:00', 'Disponible'),
(5, 5, '09:00:00', 'Disponible'), (5, 5, '10:00:00', 'Disponible'), (5, 5, '11:00:00', 'Disponible'), (5, 5, '12:00:00', 'Disponible'),
(5, 5, '13:00:00', 'Disponible'), (5, 5, '14:00:00', 'Disponible'), (5, 5, '15:00:00', 'Disponible'), (5, 5, '16:00:00', 'Disponible'),

-- Especialista 6
(6, 1, '09:00:00', 'Disponible'), (6, 1, '10:00:00', 'Disponible'), (6, 1, '11:00:00', 'Disponible'), (6, 1, '12:00:00', 'Disponible'),
(6, 1, '13:00:00', 'Disponible'), (6, 1, '14:00:00', 'Disponible'), (6, 1, '15:00:00', 'Disponible'), (6, 1, '16:00:00', 'Disponible'),
(6, 2, '09:00:00', 'Disponible'), (6, 2, '10:00:00', 'Disponible'), (6, 2, '11:00:00', 'Disponible'), (6, 2, '12:00:00', 'Disponible'),
(6, 2, '13:00:00', 'Disponible'), (6, 2, '14:00:00', 'Disponible'), (6, 2, '15:00:00', 'Disponible'), (6, 2, '16:00:00', 'Disponible'),
(6, 3, '09:00:00', 'Disponible'), (6, 3, '10:00:00', 'Disponible'), (6, 3, '11:00:00', 'Disponible'), (6, 3, '12:00:00', 'Disponible'),
(6, 3, '13:00:00', 'Disponible'), (6, 3, '14:00:00', 'Disponible'), (6, 3, '15:00:00', 'Disponible'), (6, 3, '16:00:00', 'Disponible'),
(6, 4, '09:00:00', 'Disponible'), (6, 4, '10:00:00', 'Disponible'), (6, 4, '11:00:00', 'Disponible'), (6, 4, '12:00:00', 'Disponible'),
(6, 4, '13:00:00', 'Disponible'), (6, 4, '14:00:00', 'Disponible'), (6, 4, '15:00:00', 'Disponible'), (6, 4, '16:00:00', 'Disponible'),
(6, 5, '09:00:00', 'Disponible'), (6, 5, '10:00:00', 'Disponible'), (6, 5, '11:00:00', 'Disponible'), (6, 5, '12:00:00', 'Disponible'),
(6, 5, '13:00:00', 'Disponible'), (6, 5, '14:00:00', 'Disponible'), (6, 5, '15:00:00', 'Disponible'), (6, 5, '16:00:00', 'Disponible');

-- Citas (vinculadas con horarios ocupados)
INSERT INTO citas (id_cliente, id_especialista, id_procedimiento, notas, fecha, hora, estado, estado_hora) VALUES
(1,  1, 2, 'Aplicación de uñas acrílicas',     '2025-05-20', '11:00:00', 'Pendiente',  'Ocupada'),
(2,  2, 2, 'Corte de cabello moderno',         '2025-05-21', '09:00:00', 'Finalizada', 'Ocupada'),
(3,  3, 2, 'Masaje relajante de espalda',      '2025-05-22', '15:00:00', 'Pendiente',  'Ocupada'),
(4,  4, 6, 'Maquillaje para evento',           '2025-05-22', '17:00:00', 'Confirmada',  'Disponible'),
(1,  5, 6, 'Evento especial - maquillaje',     '2025-05-25', '10:00:00', 'Pendiente',  'Ocupada'),
(2,  6, 2, 'Depilación de piernas',            '2025-05-23', '10:00:00', 'Confirmada',  'Ocupada'),
(3,  7, 2, 'Barba clásica',                    '2025-05-23', '12:00:00', 'Finalizada', 'Ocupada'),
(4,  8, 4, 'Limpieza facial completa',         '2025-05-23', '14:00:00', 'Pendiente',  'Ocupada'),
(1,  9, 3, 'Tinte de cabello rubio',           '2025-05-24', '16:00:00', 'Pendiente',  'Ocupada'),
(2, 10, 1, 'Extensiones naturales',            '2025-05-24', '18:00:00', 'Confirmada',  'Ocupada'),
(5,  2, 2,'Corte aleta pa las bbs',             '2025-05-23','10:00:00', 'Pendiente', 'Ocupada');