// Updated admin profile page - optimized for modal display with specific CSS classes
import { capitalizeWords, getInitials, getRandomColor, formatDate } from "../../scripts/utils/dashboardUtils.js";
import View from "../../components/core/view.js";
import { sessionStore } from "../../scripts/utils/storage.js";
import { localStore } from "../../scripts/utils/storage.js";
import Toast from "../../components/ui/toast.js";

export class AdminProfile extends View {
    template() {
        const currentUser = sessionStore.read("currentUser");
        
        //error handling for missing user
        if (!currentUser) {
            return `
                <div class="alert alert-danger m-3" role="alert">
                    Unable to load profile information. Please log in again.
                </div>
            `;
        }

        return `
        <!--  Profile  Modal -->
        <div id="admin-profile-container" class="admin-profile-container p-4">
            <!-- Profile Picture Section -->
            <div class="text-center mb-4 admin-profile-header">
                <div class="admin-profile-avatar"
                     style="width: 100px; height: 100px; font-size: 2rem;">
                    ${getInitials(currentUser.name)}
                </div>
                <h4 class="admin-profile-name mb-3 mt-3">${currentUser.name}</h4>
                <span class="badge admin-profile-role-badge px-3 py-2">
                    <i class="fas fa-crown me-2"></i>
                    ${capitalizeWords(currentUser.role || 'Admin')}
                </span>
            </div>

            <!-- Profile Information Grid -->
            <div class="row g-3 admin-profile-grid">
                <!-- Name -->
                <div class="col-6">
                    <div class="admin-profile-info-card admin-profile-fade-in p-3">
                        <div class="admin-profile-info-label mb-2">NAME</div>
                        <div class="admin-profile-info-value">${currentUser.name}</div>
                    </div>
                </div>
                
                <!-- User ID -->
                <div class="col-6">
                    <div class="admin-profile-info-card admin-profile-fade-in p-3">
                        <div class="admin-profile-info-label mb-2">USER ID</div>
                        <div class="admin-profile-info-value">#${currentUser.id}</div>
                    </div>
                </div>
                
                <!-- Role -->
                <div class="col-6">
                    <div class="admin-profile-info-card admin-profile-fade-in p-3">
                        <div class="admin-profile-info-label mb-2">ROLE</div>
                        <div class="admin-profile-info-value">${capitalizeWords(currentUser.role || 'Admin')}</div>
                    </div>
                </div>
                
                <!-- Join Date -->
                <div class="col-6">
                    <div class="admin-profile-info-card admin-profile-fade-in p-3">
                        <div class="admin-profile-info-label mb-2">MEMBER SINCE</div>
                        <div class="admin-profile-info-value">${formatDate(currentUser.joinDate)}</div>
                    </div>
                </div>
                
                <!-- Phone -->
                <div class="col-6">
                    <div class="admin-profile-info-card admin-profile-fade-in p-3">
                        <div class="admin-profile-info-label mb-2 d-flex justify-content-between align-items-center">
                            PHONE
                            <button class="admin-profile-edit-btn" onclick="editPhone()">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                        <div id="admin-phone-display" class="admin-profile-info-value">${currentUser.phone || "Not provided"}</div>
                        <div id="admin-phone-edit" class="d-none">
                            <input type="tel" id="admin-phone-input" class="form-control form-control-sm admin-profile-input mb-2" value="${currentUser.phone || ""}" placeholder="Enter phone number">
                            <div class="d-flex gap-2">
                                <button class="btn btn-sm admin-profile-btn-save flex-fill" onclick="savePhone()">
                                    <i class="fas fa-check me-1"></i> Save
                                </button>
                                <button class="btn btn-sm admin-profile-btn-cancel flex-fill" onclick="cancelPhoneEdit()">
                                    <i class="fas fa-times me-1"></i> Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Password -->
                <div class="col-6">
                    <div class="admin-profile-info-card admin-profile-fade-in p-3">
                        <div class="admin-profile-info-label mb-2 d-flex justify-content-between align-items-center">
                            PASSWORD
                            <div class="d-flex gap-1">
                                <button class="admin-profile-password-toggle-btn" onclick="togglePassword()">
                                    <i id="admin-password-icon" class="fas fa-eye"></i>
                                </button>
                                <button class="admin-profile-edit-btn" onclick="editPassword()">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </div>
                        <div id="admin-password-display" class="admin-profile-info-value">
                            <span id="admin-password-text" class="text-muted">••••••••••</span>
                        </div>
                        <div id="admin-password-edit" class="d-none">
                            <input type="password" id="admin-password-input" class="form-control form-control-sm admin-profile-input mb-2" placeholder="Enter new password">
                            <div class="d-flex gap-2">
                                <button class="btn btn-sm admin-profile-btn-save flex-fill" onclick="savePassword()">
                                    <i class="fas fa-check me-1"></i> Save
                                </button>
                                <button class="btn btn-sm admin-profile-btn-cancel flex-fill" onclick="cancelPasswordEdit()">
                                    <i class="fas fa-times me-1"></i> Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    
    script() {
        // Add password toggle functionality
        window.togglePassword = function() {
            const currentUser = sessionStore.read("currentUser");
            const passwordText = document.getElementById('admin-password-text');
            const passwordIcon = document.getElementById('admin-password-icon');
            
            if (passwordIcon.classList.contains('fa-eye')) {
                passwordText.textContent = currentUser.password || 'No password set';
                passwordText.className = '';
                passwordIcon.className = 'fas fa-eye-slash';
            } else {
                passwordText.textContent = '••••••••••';
                passwordText.className = 'text-muted';
                passwordIcon.className = 'fas fa-eye';
            }
        };

        // Phone editing functions
        window.editPhone = function() {
            document.getElementById('admin-phone-display').classList.add('d-none');
            document.getElementById('admin-phone-edit').classList.remove('d-none');
            document.getElementById('admin-phone-input').focus();
        };

        window.savePhone = function() {
            const newPhone = document.getElementById('admin-phone-input').value.trim();
            const currentUser = sessionStore.read("currentUser");
            const users = localStore.read("users") || [];
            
            // Update current user object
            currentUser.phone = newPhone;
            
            // Update in users array (local storage)
            const userIndex = users.findIndex(user => user.id === currentUser.id);
            if (userIndex !== -1) {
                users[userIndex].phone = newPhone;
            }
            
            // Save to both storages
            sessionStore.write("currentUser", currentUser);
            localStore.write("users", users);
            
            // Update display
            document.getElementById('admin-phone-display').textContent = newPhone || "Not provided";
            document.getElementById('admin-phone-display').classList.remove('d-none');
            document.getElementById('admin-phone-edit').classList.add('d-none');
            
            // Show success toast
            Toast.notify("Phone number updated successfully!", "success");
        };

        window.cancelPhoneEdit = function() {
            const currentUser = sessionStore.read("currentUser");
            document.getElementById('admin-phone-input').value = currentUser.phone || "";
            document.getElementById('admin-phone-display').classList.remove('d-none');
            document.getElementById('admin-phone-edit').classList.add('d-none');
        };

        // Password editing functions
        window.editPassword = function() {
            document.getElementById('admin-password-display').classList.add('d-none');
            document.getElementById('admin-password-edit').classList.remove('d-none');
            document.getElementById('admin-password-input').focus();
        };

        window.savePassword = function() {
            const newPassword = document.getElementById('admin-password-input').value.trim();
            
            if (!newPassword) {
                Toast.notify("Password cannot be empty!", "error");
                return;
            }
            
            const currentUser = sessionStore.read("currentUser");
            const users = localStore.read("users") || [];
            
            // Update current user object
            currentUser.password = newPassword;
            
            // Update in users array (local storage)
            const userIndex = users.findIndex(user => user.id === currentUser.id);
            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
            }
            
            // Save to both storages
            sessionStore.write("currentUser", currentUser);
            localStore.write("users", users);
            
            // Reset password display and hide edit mode
            document.getElementById('admin-password-text').textContent = '••••••••••';
            document.getElementById('admin-password-text').className = 'text-muted';
            document.getElementById('admin-password-icon').className = 'fas fa-eye';
            document.getElementById('admin-password-input').value = '';
            document.getElementById('admin-password-display').classList.remove('d-none');
            document.getElementById('admin-password-edit').classList.add('d-none');
            
            // Show success toast
            Toast.notify("Password updated successfully!", "success");
        };

        window.cancelPasswordEdit = function() {
            document.getElementById('admin-password-input').value = '';
            document.getElementById('admin-password-display').classList.remove('d-none');
            document.getElementById('admin-password-edit').classList.add('d-none');
        };
    }
}