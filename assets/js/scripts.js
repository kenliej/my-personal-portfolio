function toggleMobileMenu() {
    var overlay = document.getElementById('mobileOverlay');
    var menu = document.getElementById('mobileMenu');
    
    overlay.classList.add('open');
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    var overlay = document.getElementById('mobileOverlay');
    var menu = document.getElementById('mobileMenu');
    
    overlay.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
}

function setupSmoothScrolling() {
    var links = document.querySelectorAll('a[href^="#"]');
    
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

function showError(fieldId, message) {
    var field = document.getElementById(fieldId);
    var errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(fieldId) {
    var field = document.getElementById(fieldId);
    var errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.remove('error');
    errorElement.style.display = 'none';
}

function validateForm() {
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();
    var isValid = true;

    hideError('name');
    hideError('email');
    hideError('message');

    if (!name) {
        showError('name', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    }

    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
    }

    if (!message) {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

function setupInputValidation() {
    var fields = ['name', 'email', 'message'];
    
    for (var i = 0; i < fields.length; i++) {
        var field = document.getElementById(fields[i]);
        field.addEventListener('input', function() {
            var fieldId = this.id;
            var errorElement = document.getElementById(fieldId + 'Error');
            
            if (errorElement.style.display === 'block') {
                hideError(fieldId);
            }
        });
    }
}

function setupOutsideClick() {
    document.addEventListener('click', function(e) {
        var mobileMenu = document.getElementById('mobileMenu');
        var mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            if (mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        }
    });
}

function setupWindowResize() {
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    });
}

function init() {
    setupSmoothScrolling();
    handleFormSubmission();
    setupInputValidation();
    setupOutsideClick();
    setupWindowResize();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}