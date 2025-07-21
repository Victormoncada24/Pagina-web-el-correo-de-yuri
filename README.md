# Pagina-web-el-correo-de-yuri

Descripción
Este proyecto es un sistema de gestión de correos electrónicos para empresas desarrollado en Python. Permite enviar, recibir y gestionar correos electrónicos con funcionalidades específicas para entornos empresariales.

Características principales
Interfaz de línea de comandos para gestión de correos

Funcionalidad para enviar y recibir mensajes

Posible integración con servidores de correo (basado en el nombre del proyecto)

Diseñado para uso empresarial

Requisitos del sistema
Python 3.x

Dependencias (si las hay - deberías listarlas aquí cuando las conozcas)

Instalación

Clona el repositorio:
git clone https://github.com/Victormoncada24/Proyecto-Empresa-correo-Yuri.git


Manual de Usuario para "Listado de trabajadores de una empresa"
1. Introducción



Este manual proporciona instrucciones para usar el "Sistema de Listado de Trabajadores" para "El correo de Yury". Este sistema está diseñado para digitalizar y gestionar la información de los empleados, reemplazando el sistema anterior basado en Excel.


2. Acceso al Sistema



Para acceder al sistema, necesitará un nombre de usuario y una contraseña válidos.

Ingrese su Nombre de Usuario en el campo designado.

Ingrese su Contraseña en el campo designado.

Haga clic en el botón Iniciar Sesión.
El sistema detectará automáticamente su perfil de usuario (ej. Jefe de RR.HH., Trabajador) y mostrará las opciones correspondientes. Tenga en cuenta que los usuarios no pueden tener más de un perfil.


3. Perfiles de Usuario y Permisos



Personal de RR.HH.:

Llenar registros de empleados.

Acceder al formulario de registro de empleados.

Ingresar datos personales, laborales, de contacto de emergencia y cargas familiares de los empleados.




Jefe de RR.HH.:

Obtener un listado de trabajadores filtrado por sexo, cargo, área y departamento al que pertenece.

Empleado (Trabajador):

Modificar sus datos personales.



Agregar o eliminar cargas familiares.

Agregar o eliminar contactos de emergencia.



No puede modificar: El RUT o datos laborales.


4. Funcionalidades Principales

4.1. Listado de Trabajadores




El sistema proporciona una tabla resumen de todos los trabajadores de la empresa, que incluye:

RUT del trabajador 

Nombre del trabajador 

Sexo del trabajador 

Cargo del trabajador 

4.2. Registro de un Nuevo Empleado (Solo Personal de RR.HH.)



Navegue al formulario de "Registro de Nuevo Empleado".

Complete los datos personales requeridos:

Nombre completo 

RUT 

Sexo 

Dirección y teléfono 

Complete los datos laborales requeridos:

Cargo 

Fecha de ingreso a la compañía 

Área y departamento 

Agregue los contactos de emergencia:

Nombre de la persona a quien contactar en caso de emergencia 

Relación con el trabajador 

Número de teléfono del contacto 

Agregue las cargas familiares (si corresponde):

Nombre de la carga familiar 

Parentesco 

Sexo 

RUT 

Haga clic en Guardar para registrar el nuevo empleado.

4.3. Filtrado de Lista de Empleados (Solo Jefe de RR.HH.)




El Jefe de RR.HH. puede filtrar la lista de trabajadores utilizando los siguientes criterios:

Por Sexo 

Por Cargo 

Por Área y Departamento al que pertenece 

Navegue a la sección "Listado de Empleados".

Seleccione los criterios de filtro deseados de las opciones disponibles.

Haga clic en Aplicar Filtro para ver la lista filtrada de empleados.

4.4. Modificación de Datos Personales (Solo Empleado)



Inicie sesión como Empleado.

Navegue a su perfil personal.

Puede modificar:

Datos personales (excluyendo el RUT) 


Agregar o eliminar cargas familiares 

Agregar o eliminar contactos de emergencia 

Realice los cambios necesarios.

Haga clic en Guardar Cambios para actualizar su información.

Navega al directorio del proyecto:
cd Proyecto-Empresa-correo-Yuri

Instala las dependencias (si es necesario):
pip install -r requirements.txt

Uso

Ejecuta el programa principal:
python main.py

Estructura del proyecto
Proyecto-Empresa-correo-Yuri/
│
├── src/                       # Carpeta principal del código fuente
│   ├── main.py                # Punto de entrada principal del programa
│   ├── correo/                # Módulo principal para funcionalidades de correo
│   │   ├── __init__.py
│   │   ├── enviar_correo.py   # Lógica para enviar correos
│   │   ├── recibir_correo.py  # Lógica para recibir correos
│   │   └── config.py          # Configuración del servidor de correo
│   │
│   ├── empresa/               # Módulo para funcionalidades empresariales
│   │   ├── __init__.py
│   │   └── gestion_usuarios.py
│   │
│   └── utils/                 # Utilidades auxiliares
│       ├── __init__.py
│       ├── logger.py          # Manejo de logs
│       └── helpers.py         # Funciones helper
│
├── tests/                     # Pruebas unitarias/integración
│   ├── __init__.py
│   ├── test_correo.py
│   └── test_empresa.py
│
├── data/                      # Datos/archivos de configuración
│   ├── plantillas/            # Plantillas de correo
│   └── config.json            # Archivo de configuración
│
├── docs/                      # Documentación
│   └── manual_usuario.md
│
├── requirements.txt           # Dependencias del proyecto
├── .gitignore                 # Archivos ignorados por git
└── README.md                  # Documentación principal
