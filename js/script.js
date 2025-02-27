// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close navigation when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Active navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Add Expense Button
    const addExpenseBtn = document.getElementById('add-expense-btn');
    if (addExpenseBtn) {
        addExpenseBtn.addEventListener('click', addExpense);
    }
    
    // Add Activity Button
    const addActivityBtn = document.getElementById('add-activity-btn');
    if (addActivityBtn) {
        addActivityBtn.addEventListener('click', addActivity);
    }
});

// Function to add expense
function addExpense() {
    const expensesContainer = document.getElementById('expenses-list');
    const newExpenseDiv = document.createElement('div');
    newExpenseDiv.classList.add('expense-item');

    // Create expense name input
    const expenseLabel = document.createElement('label');
    expenseLabel.innerText = 'Expense';
    const expenseInput = document.createElement('input');
    expenseInput.type = 'text';
    expenseInput.name = 'expense';
    expenseInput.placeholder = 'e.g. Groceries, Rent';

    // Create cost input
    const costLabel = document.createElement('label');
    costLabel.innerText = 'Cost';
    const costInput = document.createElement('input');
    costInput.type = 'number';
    costInput.classList.add('expense-input');
    costInput.placeholder = 'Enter amount in ₹';
    costInput.onchange = calculateTotalExpenses;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
    removeBtn.type = 'button';
    removeBtn.title = 'Remove expense';
    removeBtn.onclick = function() {
        newExpenseDiv.remove();
        calculateTotalExpenses();
    };

    // Append elements to the expense div
    newExpenseDiv.appendChild(expenseLabel);
    newExpenseDiv.appendChild(expenseInput);
    newExpenseDiv.appendChild(costLabel);
    newExpenseDiv.appendChild(costInput);
    newExpenseDiv.appendChild(removeBtn);
    
    // Add to the expense list
    expensesContainer.appendChild(newExpenseDiv);
    
    // Focus on the new input
    expenseInput.focus();
}

// Function to calculate total expenses
function calculateTotalExpenses() {
    const expenseCosts = document.querySelectorAll('.expense-input');
    let total = 0;

    expenseCosts.forEach(function(expense) {
        let value = parseFloat(expense.value);
        if (!isNaN(value)) {
            total += value;
        }
    });

    const totalElement = document.getElementById('total-expenses');
    if (totalElement) {
        totalElement.innerText = 'Total Expenses: ₹' + total.toFixed(2);
        
        // Add animation effect
        totalElement.classList.add('highlight');
        setTimeout(() => {
            totalElement.classList.remove('highlight');
        }, 500);
    }
}

// Function to add an activity to the weekend planner
function addActivity() {
    const activitiesContainer = document.getElementById('activities');
    
    const newActivityDiv = document.createElement('div');
    newActivityDiv.classList.add('activity-item');
    
    // Create activity name input
    const activityLabel = document.createElement('label');
    activityLabel.innerText = 'Activity';
    const activityInput = document.createElement('input');
    activityInput.type = 'text';
    activityInput.name = 'activity';
    activityInput.placeholder = 'e.g. Movie, Dinner';

    // Create cost input
    const costLabel = document.createElement('label');
    costLabel.innerText = 'Estimated Cost';
    const costInput = document.createElement('input');
    costInput.type = 'number';
    costInput.classList.add('cost-input');
    costInput.placeholder = 'Enter amount in ₹';
    costInput.onchange = calculateTotalBudget;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
    removeBtn.type = 'button';
    removeBtn.title = 'Remove activity';
    removeBtn.onclick = function() {
        newActivityDiv.remove();
        calculateTotalBudget();
    };

    // Append elements to the activity div
    newActivityDiv.appendChild(activityLabel);
    newActivityDiv.appendChild(activityInput);
    newActivityDiv.appendChild(costLabel);
    newActivityDiv.appendChild(costInput);
    newActivityDiv.appendChild(removeBtn);

    // Add to the activities list
    activitiesContainer.appendChild(newActivityDiv);
    
    // Focus on the new input
    activityInput.focus();
}

// Function to calculate total budget for activities
function calculateTotalBudget() {
    const costs = document.querySelectorAll('.cost-input');
    let total = 0;

    costs.forEach(function(cost) {
        let value = parseFloat(cost.value);
        if (!isNaN(value)) {
            total += value;
        }
    });
    
    const totalElement = document.getElementById('total-budget');
    if (totalElement) {
        totalElement.innerText = 'Total Estimated Budget: ₹' + total.toFixed(2);
        
        // Add animation effect
        totalElement.classList.add('highlight');
        setTimeout(() => {
            totalElement.classList.remove('highlight');
        }, 500);
    }
}

// Add highlight style
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .highlight {
            animation: highlight-effect 0.5s ease-in-out;
        }
        
        @keyframes highlight-effect {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); color: var(--secondary-color); }
            100% { transform: scale(1); }
        }
    </style>
`);