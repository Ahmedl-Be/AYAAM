import View from "../../components/core/view.js";
import { chartCreation} from "../../components/dashboard/admin-stats.js";
import { localStore } from "../../scripts/utils/storage.js";


export default class UsersStatsPage extends View {
    template() {
    const users = localStore.read("users") || [];
    
    //counting user types
    const totalUsers = users.length-1; // MINUS MASTER
    const sellers = users.filter(user => user.role === "seller").length;
    const admins = users.filter(user => user.role === "admin").length;
    const customer = users.filter(user => user.role === "user").length;
    
    // Calculate growth trend (simplified)
    const recentUsers = users.filter(user => {
        if (user.joinDate) {
            const joinDate = new Date(user.joinDate);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return joinDate >= thirtyDaysAgo;
        }
        return false;
    }).length;
    // Calculate percentages
    const customerPercentage = totalUsers > 0 ? ((customer / totalUsers) * 100).toFixed(1) : 0;
    const sellerPercentage = totalUsers > 0 ? ((sellers / totalUsers) * 100).toFixed(1) : 0;
    const adminPercentage = totalUsers > 0 ? ((admins / totalUsers) * 100).toFixed(1) : 0;

        // Create enhanced pie chart for users
    const userLabels = ['Customers', 'Sellers', 'Admins'];
    const userData = [customer, sellers, admins];
    const userColors = ['#28a745', '#17a2b8', '#dc3545'];
        if (totalUsers > 0) {
            chartCreation('usersChart', userLabels, userData, userColors, 'pie');
        } 
            return `
        <div id="stats">    
        <div class="row">
            <div class="col-md-3 mb-3">
                <div class="card bg-primary text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-users mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${totalUsers}</h3>
                        <p class="mb-0">Total Users</p>
                        ${recentUsers > 0 ? `<small class="text-light">+${recentUsers} this month</small>` : ''}
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card bg-success text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-user mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${customer}</h3>
                        <p class="mb-0">Customers</p>
                        <small class="text-light">${customerPercentage}% of total</small>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card bg-info text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-store mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${sellers}</h3>
                        <p class="mb-0">Sellers</p>
                        <small class="text-light">${sellerPercentage}% of total</small>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card bg-danger text-white shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-user-shield mb-2" style="font-size: 2rem;"></i>
                        <h3 class="mb-1">${admins}</h3>
                        <p class="mb-0">Admins</p>
                        <small class="text-light">${adminPercentage}% of total</small>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6 mb-3">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-chart-bar me-2"></i>Users Breakdown</h5>
                    </div>
                    <div class="card-body">
                        <div class="list-group list-group-flush">
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-user text-success me-2"></i>
                                    <strong>Customers</strong>
                                </div>
                                <div>
                                    <span class="badge bg-success rounded-pill me-2">${customer}</span>
                                    <small class="text-muted">${customerPercentage}%</small>
                                </div>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-store text-info me-2"></i>
                                    <strong>Sellers</strong>
                                </div>
                                <div>
                                    <span class="badge bg-info rounded-pill me-2">${sellers}</span>
                                    <small class="text-muted">${sellerPercentage}%</small>
                                </div>
                            </div>
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="fas fa-user-shield text-danger me-2"></i>
                                    <strong>Admins</strong>
                                </div>
                                <div>
                                    <span class="badge bg-danger rounded-pill me-2">${admins}</span>
                                    <small class="text-muted">${adminPercentage}%</small>
                                </div>
                            </div>
                        </div>
                        
                        ${totalUsers === 0 ? 
                            '<div class="alert alert-warning mt-3"><i class="fas fa-exclamation-triangle me-2"></i>No users registered yet</div>' 
                            : ''
                        }
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="card shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-chart-pie me-2"></i>User Distribution</h5>
                    </div>
                    <div class="card-body">
                        <div style="position: relative; height: 250px;">
                            <canvas id="usersChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `;}

    script() {
        chartCreation();
    }

}