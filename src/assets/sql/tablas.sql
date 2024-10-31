-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS TB_USUARIOS (
    USR_ID INTEGER PRIMARY KEY AUTOINCREMENT,  -- Clave primaria
    USR_RUT VARCHAR(15) NOT NULL UNIQUE,       -- RUT 
    USR_USER VARCHAR(15) NOT NULL,             -- Nombre de usuario 
    USR_PSW VARCHAR(30) NOT NULL               -- Contraseña 
);

-- Tabla de Asignaturas
CREATE TABLE IF NOT EXISTS TB_ASIGNATURAS (
    ASG_ID INTEGER PRIMARY KEY AUTOINCREMENT,  -- Clave primaria
    ASG_NOMBRE VARCHAR(50) NOT NULL UNIQUE     -- Nombre de asignatura 
);

-- Tabla de Asistencia
CREATE TABLE IF NOT EXISTS TB_ASISTENCIA (
    AST_ID INTEGER PRIMARY KEY AUTOINCREMENT,  -- Clave primaria
    USR_ID INTEGER NOT NULL,                   -- ID de usuario 
    ASG_ID INTEGER NOT NULL,                   -- ID de asignatura
    AST_FECHA DATE NOT NULL,                   -- Fecha asistencia
    AST_ESTADO VARCHAR(10) NOT NULL,           -- Estado de la asistencia ('Presente', 'Ausente', etc.)
    FOREIGN KEY (USR_ID) REFERENCES TB_USUARIOS(USR_ID) ON DELETE CASCADE,  
    FOREIGN KEY (ASG_ID) REFERENCES TB_ASIGNATURAS(ASG_ID) ON DELETE CASCADE 
);


CREATE INDEX IF NOT EXISTS IDX_USUARIOS_RUT ON TB_USUARIOS(USR_RUT);
