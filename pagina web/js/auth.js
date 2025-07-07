// auth.js - Manejo de autenticación

// Datos de prueba (simulando una base de datos)
const users = [
    {
        email: 'hr@correodeyury.cl',
        password: '123456',
        role: 'hr',
        employeeId: 1
    },
    {
        email: 'empleado@correodeyury.cl',
        password: '123456',
        role: 'employee',
        employeeId: 2
    }
];

// Datos de empleados de prueba
const employees = [
    {
        id: 1,
        firstName: 'Admin',
        lastName: 'RRHH',
        rut: '11.111.111-1',
        department: 'RRHH',
        position: 'Gerente',
        gender: 'Masculino',
        email: 'hr@correodeyury.cl',
        phone: '+56 9 9999 9999',
        emergencyContact: {
            name: 'Contacto Emergencia',
            phone: '+56 9 8888 8888',
            relationship: 'Familiar'
        },
        familyMembers: []
    },
    {
        id: 2,
        firstName: 'Juan',
        lastName: 'Pérez',
        rut: '12.345.678-9',
        department: 'Logística',
        position: 'Operario',
        gender: 'Masculino',
        email: 'empleado@correodeyury.cl',
        phone: '+56 9 8765 4321',
        emergencyContact: {
            name: 'María Pérez',
            phone: '+56 9 1234 5678',
            relationship: 'Esposa'
        },
        familyMembers: [
            { name: 'Ana Pérez', relationship: 'Hija', birthDate: '2010-05-15' },
            { name: 'Carlos Pérez', relationship: 'Hijo', birthDate: '2012-08-20' }
        ]
    }
];

// Función para manejar el login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Validar campos
    if (!email || !password) {
        errorMessage.textContent = 'Por favor complete todos los campos';
        return;
    }
    
    // Buscar usuario
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Guardar en localStorage (simulando sesión)
        localStorage.setItem('token', 'simulated-token');
        localStorage.setItem('role', user.role);
        localStorage.setItem('employeeId', user.employeeId);
        
        // Redirigir al dashboard
        window.location.href = 'dashboard.html';
    } else {
        errorMessage.textContent = 'Credenciales incorrectas';
    }
}

// Función para cerrar sesión
function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('employeeId');
    window.location.href = 'index.html';
}

// Función para verificar autenticación
function checkAuth() {
    const token = localStorage.getItem('token');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Si no está autenticado y no está en la página de login, redirigir
    if (!token && currentPage !== 'index.html') {
        window.location.href = 'index.html';
        return false;
    }
    
    // Si está autenticado y está en la página de login, redirigir al dashboard
    if (token && currentPage === 'index.html') {
        window.location.href = 'dashboard.html';
        return false;
    }
    
    return true;
}

// Función para cargar información del usuario
function loadUserInfo() {
    const role = localStorage.getItem('role');
    const employeeId = parseInt(localStorage.getItem('employeeId'));
    const employee = employees.find(e => e.id === employeeId);
    
    // Mostrar/ocultar elementos según el rol
    if (role === 'employee') {
        document.querySelectorAll('[id^="nav"], [id^="side"]').forEach(el => {
            if (el.id.includes('Employees') || el.id.includes('Reports')) {
                el.style.display = 'none';
            }
        });
    }
    
    // Cargar nombre de bienvenida
    if (employee) {
        const welcomeTitle = document.getElementById('welcomeTitle');
        if (welcomeTitle) {
            welcomeTitle.textContent = `Bienvenido, ${role === 'hr' ? 'Jefe de RRHH' : employee.firstName}`;
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (!checkAuth()) return;
    
    // Cargar información del usuario
    loadUserInfo();
    
    // Asignar eventos
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});