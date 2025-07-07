// main.js - Funciones comunes

// Cargar información del perfil
function loadProfile() {
    const employeeId = parseInt(localStorage.getItem('employeeId'));
    const employee = employees.find(e => e.id === employeeId);
    
    if (!employee) return;
    
    // Vista de perfil
    document.getElementById('viewFirstName').textContent = employee.firstName;
    document.getElementById('viewLastName').textContent = employee.lastName;
    document.getElementById('viewRut').textContent = employee.rut;
    document.getElementById('viewEmail').textContent = employee.email;
    document.getElementById('viewPhone').textContent = employee.phone;
    
    document.getElementById('viewEmergencyName').textContent = employee.emergencyContact.name;
    document.getElementById('viewEmergencyPhone').textContent = employee.emergencyContact.phone;
    document.getElementById('viewEmergencyRelationship').textContent = employee.emergencyContact.relationship;
    
    const familyList = document.getElementById('familyMembersList');
    if (familyList) {
        familyList.innerHTML = '';
        employee.familyMembers.forEach(member => {
            const div = document.createElement('div');
            div.className = 'family-member';
            div.innerHTML = `
                <div class="member-info">
                    <span>${member.name} (${member.relationship})</span>
                    <span>Nacimiento: ${member.birthDate}</span>
                </div>
            `;
            familyList.appendChild(div);
        });
    }
    
    // Formulario de edición
    document.getElementById('editFirstName').value = employee.firstName;
    document.getElementById('editLastName').value = employee.lastName;
    document.getElementById('editRut').value = employee.rut;
    document.getElementById('editEmail').value = employee.email;
    document.getElementById('editPhone').value = employee.phone;
    
    document.getElementById('editEmergencyName').value = employee.emergencyContact.name;
    document.getElementById('editEmergencyPhone').value = employee.emergencyContact.phone;
    document.getElementById('editEmergencyRelationship').value = employee.emergencyContact.relationship;
    
    const editFamilyList = document.getElementById('editFamilyMembers');
    if (editFamilyList) {
        editFamilyList.innerHTML = '';
        employee.familyMembers.forEach((member, index) => {
            const div = document.createElement('div');
            div.className = 'family-member';
            div.innerHTML = `
                <div class="member-info">
                    <span>${member.name} (${member.relationship})</span>
                    <span>Nacimiento: ${member.birthDate}</span>
                </div>
                <button type="button" class="btn-danger remove-family" data-index="${index}">Eliminar</button>
            `;
            editFamilyList.appendChild(div);
        });
        
        // Asignar eventos a los botones de eliminar
        document.querySelectorAll('.remove-family').forEach(btn => {
            btn.addEventListener('click', function() {
                removeFamilyMember(parseInt(this.getAttribute('data-index')));
            });
        });
    }
}

// Alternar entre vista y edición de perfil
function toggleProfileEdit() {
    const view = document.getElementById('profileView');
    const edit = document.getElementById('profileEditForm');
    
    if (view.style.display === 'none') {
        view.style.display = 'block';
        edit.style.display = 'none';
    } else {
        view.style.display = 'none';
        edit.style.display = 'block';
    }
}

// Agregar familiar
function addFamilyMember() {
    const name = document.getElementById('newFamilyName').value;
    const relationship = document.getElementById('newFamilyRelationship').value;
    const birthDate = document.getElementById('newFamilyBirthDate').value;
    
    if (!name || !relationship) {
        alert('Por favor complete nombre y relación');
        return;
    }
    
    const employeeId = parseInt(localStorage.getItem('employeeId'));
    const employee = employees.find(e => e.id === employeeId);
    
    if (employee) {
        employee.familyMembers.push({
            name,
            relationship,
            birthDate
        });
        
        // Limpiar campos
        document.getElementById('newFamilyName').value = '';
        document.getElementById('newFamilyRelationship').value = '';
        document.getElementById('newFamilyBirthDate').value = '';
        
        // Recargar perfil
        loadProfile();
    }
}

// Eliminar familiar
function removeFamilyMember(index) {
    const employeeId = parseInt(localStorage.getItem('employeeId'));
    const employee = employees.find(e => e.id === employeeId);
    
    if (employee && employee.familyMembers[index]) {
        employee.familyMembers.splice(index, 1);
        loadProfile();
    }
}

// Guardar perfil
function saveProfile(event) {
    event.preventDefault();
    
    const employeeId = parseInt(localStorage.getItem('employeeId'));
    const employee = employees.find(e => e.id === employeeId);
    
    if (employee) {
        employee.firstName = document.getElementById('editFirstName').value;
        employee.lastName = document.getElementById('editLastName').value;
        employee.email = document.getElementById('editEmail').value;
        employee.phone = document.getElementById('editPhone').value;
        
        employee.emergencyContact.name = document.getElementById('editEmergencyName').value;
        employee.emergencyContact.phone = document.getElementById('editEmergencyPhone').value;
        employee.emergencyContact.relationship = document.getElementById('editEmergencyRelationship').value;
        
        toggleProfileEdit();
        loadProfile();
        
        alert('Perfil actualizado correctamente');
    }
}

// Generar reportes
function generateReport(type) {
    let reportContent = '';
    let reportTitle = '';
    
    switch (type) {
        case 'monthly':
            reportTitle = 'Reporte Mensual de Empleados';
            reportContent = '<h3>Resumen por departamento</h3>';
            
            const deptCount = {};
            employees.forEach(emp => {
                deptCount[emp.department] = (deptCount[emp.department] || 0) + 1;
            });
            
            reportContent += '<ul>';
            for (const dept in deptCount) {
                reportContent += `<li>${dept}: ${deptCount[dept]} empleados</li>`;
            }
            reportContent += '</ul>';
            break;
            
        case 'updates':
            reportTitle = 'Reporte de Actualizaciones Pendientes';
            reportContent = '<h3>Empleados con datos desactualizados</h3><ul>';
            
            // Simulando datos desactualizados (los primeros 3 empleados)
            employees.slice(0, 3).forEach(emp => {
                reportContent += `<li>${emp.firstName} ${emp.lastName} (${emp.department})</li>`;
            });
            
            reportContent += '</ul>';
            break;
            
        case 'family':
            reportTitle = 'Reporte de Cargas Familiares';
            reportContent = '<h3>Resumen de cargas familiares</h3>';
            
            let totalFamily = 0;
            employees.forEach(emp => {
                totalFamily += emp.familyMembers.length;
            });
            
            reportContent += `<p>Total de cargas familiares registradas: ${totalFamily}</p>`;
            break;
    }
    
    const modal = document.getElementById('reportModal');
    document.getElementById('reportModalTitle').textContent = reportTitle;
    document.getElementById('reportContent').innerHTML = reportContent;
    
    modal.style.display = 'block';
    
    document.querySelector('#reportModal .close').addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Perfil
    if (document.getElementById('profileView')) {
        loadProfile();
        
        document.getElementById('editProfileBtn').addEventListener('click', toggleProfileEdit);
        document.getElementById('cancelEditProfile').addEventListener('click', toggleProfileEdit);
        document.getElementById('profileEditForm').addEventListener('submit', saveProfile);
        document.getElementById('addFamilyMemberBtn').addEventListener('click', addFamilyMember);
    }
    
    // Reportes
    if (document.getElementById('generateMonthlyReport')) {
        document.getElementById('generateMonthlyReport').addEventListener('click', function() {
            generateReport('monthly');
        });
        
        document.getElementById('generateUpdatesReport').addEventListener('click', function() {
            generateReport('updates');
        });
        
        document.getElementById('generateFamilyReport').addEventListener('click', function() {
            generateReport('family');
        });
        
        document.querySelector('#reportModal .close').addEventListener('click', function() {
            document.getElementById('reportModal').style.display = 'none';
        });
    }
    
    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', function(event) {
        const employeeModal = document.getElementById('employeeModal');
        if (employeeModal && event.target === employeeModal) {
            employeeModal.style.display = 'none';
        }
        
        const reportModal = document.getElementById('reportModal');
        if (reportModal && event.target === reportModal) {
            reportModal.style.display = 'none';
        }
    });
});