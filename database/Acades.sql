drop database if exists ACADES;
create database ACADES;
use ACADES;


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
    telefono VARCHAR(15)
);


CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    telefono VARCHAR(15),
    id_admin INT,
    FOREIGN KEY (id_admin) REFERENCES administrador(id_admin)
);


CREATE TABLE citas (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_especialista INT NOT NULL,
    id_admin INT,
    descripcion TEXT,
    fecha DATETIME NOT NULL,
    estado ENUM('Pendiente', 'Finalizada', 'Cancelada') DEFAULT 'Pendiente',
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_especialista) REFERENCES especialista(id_especialista),
    FOREIGN KEY (id_admin) REFERENCES administrador(id_admin)
);


INSERT INTO administrador (nombre, correo, contrasena) VALUES
('Sofia Burbano', 'sofi.blu@acades.com', 'admin1'),
('Juan Calpa', 'nadaplete@acades.com', 'admin2'),
('Cristhian Padilla', 'hentai.lopez@acades.com', 'admin3'),
('Stiven Burbano', 'barca@acades.com', 'admin4');

-- Insertar Especialistas
INSERT INTO especialista (nombre, especialidad, telefono) VALUES
('Sofía Mendoza', 'Uñas acrílicas', '5551234567'),
('Javier Peña', 'Cortes de cabello', '5559876543'),
('Lucía Herrera', 'Masajes terapéuticos', '5554567890'),
('Pedro Ramírez', 'Maquillaje profesional', '5552223344'),
('Carla Gómez', 'Peinados de gala', '5556781234');

-- Insertar Clientes
INSERT INTO cliente (nombre, correo, telefono, id_admin) VALUES
('Valeria Sánchez', 'valeria.s@gmail.com', '5551230001', 1),
('Bruno Díaz', 'bruno.d@gmail.com', '5551230002', 2),
('Camila Torres', 'camila.t@gmail.com', '5551230003', 3),
('Miguel Ángel', 'miguel.a@gmail.com', '5551230004', 4);

-- Insertar Citas
INSERT INTO citas (id_cliente, id_especialista, id_admin, descripcion, fecha, estado) VALUES
(1, 1, 1, 'Aplicación de uñas acrílicas', '2025-04-25 10:00:00', 'Pendiente'),
(2, 2, 2, 'Corte de cabello moderno', '2025-04-26 12:00:00', 'Finalizada'),
(3, 3, 3, 'Masaje relajante de espalda', '2025-04-27 15:30:00', 'Pendiente'),
(4, 4, 4, 'Maquillaje para evento', '2025-04-28 09:00:00', 'Cancelada');