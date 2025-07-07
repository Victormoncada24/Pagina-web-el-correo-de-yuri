// employees.js - Gestión de empleados

// Cargar empleados en la tabla
function loadEmployees() {
    const tbody = document.getElementById('employeesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    employees.forEach(employee => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${employee.firstName} ${employee.lastName}</td>
            <td>${employee.rut}</td>
            <td>${employee.department}</td>
            <td>${employee.position}</td>
            <td>${employee.email}</td>
            <td>
                <button class="btn-action view-employee" data-id="${employee.id}">Ver</button>
                <button class="btn-action edit-employee" data-id="${employee.id}">Editar</button>
                <button class="btn-action delete-employee" data-id="${employee.id}">Eliminar</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Asignar eventos a los botones
    document.querySelectorAll('.view-employee').forEach(btn => {
        btn.addEventListener('click', function() {
            viewEmployee(parseInt(this.getAttribute('data-id')));
        });
    });
    
    document.querySelectorAll('.edit-employee').forEach(btn => {
        btn.addEventListener('click', function() {
            editEmployee(parseInt(this.getAttribute('data-id')));
        });
    });
    
    document.querySelectorAll('.delete-employee').forEach(btn => {
        btn.addEventListener('click', function() {
            deleteEmployee(parseInt(this.getAttribute('data-id')));
        });
    });
}

// Ver empleado
function viewEmployee(id) {
    const employee = employees.find(e => e.id === id);
    if (!employee) return;
    
    // Aquí podrías abrir un modal o redirigir a una página de detalles
    alert(`Viendo empleado: ${employee.firstName} ${employee.lastName}`);
}

// Editar empleado
function editEmployee(id) {
    const employee = employees.find(e => e.id === id);
    if (!employee) return;
    
    const modal = document.getElementById('employeeModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('employeeForm');
    
    modalTitle.textContent = `Editar Empleado: ${employee.firstName} ${employee.lastName}`;
    
    // Llenar el formulario con los datos del empleado
    document.getElementById('employeeId').value = employee.id;
    document.getElementById('firstName').value = employee.firstName;
    document.getElementById('lastName').value = employee.lastName;
    document.getElementById('rut').value = employee.rut;
    document.getElementById('gender').value = employee.gender;
    document.getElementById('department').value = employee.department;
    document.getElementById('position').value = employee.position;
    document.getElementById('email').value = employee.email;
    document.getElementById('phone').value = employee.phone;
    
    // Mostrar modal
    modal.style.display = 'block';
    
    // Asignar evento de cierre
    document.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    document.getElementById('cancelEmployee').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Asignar evento de envío del formulario
    form.onsubmit = function(e) {
        e.preventDefault();
        saveEmployee();
    };
}

// Guardar empleado (crear o actualizar)
function saveEmployee() {
    const id = parseInt(document.getElementById('employeeId').value);
    const isNew = isNaN(id);
    
    const employee = {
        id: isNew ? employees.length + 1 : id,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        rut: document.getElementById('rut').value,
        gender: document.getElementById('gender').value,
        department: document.getElementById('department').value,
        position: document.getElementById('position').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        emergencyContact: {
            name: '',
            phone: '',
            relationship: ''
        },
        familyMembers: []
    };
    
    if (isNew) {
        employees.push(employee);
    } else {
        const index = employees.findIndex(e => e.id === id);
        if (index !== -1) {
            // Mantener datos existentes que no se editan en este formulario
            employee.emergencyContact = employees[index].emergencyContact;
            employee.familyMembers = employees[index].familyMembers;
            employees[index] = employee;
        }
    }
    
    // Cerrar modal y recargar tabla
    document.getElementById('employeeModal').style.display = 'none';
    loadEmployees();
}

// Eliminar empleado
function deleteEmployee(id) {
    if (confirm('¿Está seguro que desea eliminar este empleado?')) {
        const index = employees.findIndex(e => e.id === id);
        if (index !== -1) {
            employees.splice(index, 1);
            loadEmployees();
        }
    }
}

// Filtrar empleados
function filterEmployees() {
    const department = document.getElementById('filterDepartment').value;
    const position = document.getElementById('filterPosition').value;
    const gender = document.getElementById('filterGender').value;
    
    const tbody = document.getElementById('employeesTableBody');
    if (!tbody) return;
    
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const rowDept = row.cells[2].textContent;
        const rowPos = row.cells[3].textContent;
        const rowGender = row.cells[4] ? row.cells[4].textContent : '';
        
        const showRow = 
            (department === '' || rowDept === department) &&
            (position === '' || rowPos === position) &&
            (gender === '' || rowGender === gender);
        
        row.style.display = showRow ? '' : 'none';
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('employeesTableBody')) {
        loadEmployees();
        
        // Asignar eventos de filtrado
        document.getElementById('applyFilters').addEventListener('click', filterEmployees);
        document.getElementById('resetFilters').addEventListener('click', function() {
            document.getElementById('filterDepartment').value = '';
            document.getElementById('filterPosition').value = '';
            document.getElementById('filterGender').value = '';
            filterEmployees();
        });
        
        // Asignar evento para nuevo empleado
        document.getElementById('newEmployeeBtn').addEventListener('click', function() {
            const modal = document.getElementById('employeeModal');
            const modalTitle = document.getElementById('modalTitle');
            const form = document.getElementById('employeeForm');
            
            modalTitle.textContent = 'Nuevo Empleado';
            form.reset();
            document.getElementById('employeeId').value = '';
            
            modal.style.display = 'block';
            
            document.querySelector('.close').addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            document.getElementById('cancelEmployee').addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            form.onsubmit = function(e) {
                e.preventDefault();
                saveEmployee();
            };
        });
    }
});