// Variabel untuk menyimpan state kalkulator
let currentValue = '0';
let previousValue = '';
let operator = null;
let shouldResetScreen = false;

// Ambil elemen display
const currentDisplay = document.getElementById('current');
const previousDisplay = document.getElementById('previous');
const displayContainer = document.querySelector('.display');

/**
 * Update tampilan display dengan animasi
 */
function updateDisplay() {
    // Trigger animasi
    currentDisplay.classList.remove('result-animation');
    void currentDisplay.offsetWidth; // Force reflow
    
    currentDisplay.textContent = currentValue;
    if (operator) {
        previousDisplay.textContent = `${previousValue} ${operator}`;
    } else {
        previousDisplay.textContent = previousValue;
    }
}

/**
 * Tambahkan angka ke display
 * @param {string} num - Angka atau titik desimal yang akan ditambahkan
 */
function appendNumber(num) {
    if (shouldResetScreen) {
        currentValue = '0';
        shouldResetScreen = false;
    }
    
    // Cegah input titik ganda
    if (num === '.' && currentValue.includes('.')) {
        shakeDisplay();
        return;
    }
    
    // Batasi panjang input
    if (currentValue.length >= 15 && currentValue !== '0') {
        shakeDisplay();
        return;
    }
    
    // Ganti '0' dengan angka baru, kecuali jika input adalah titik
    if (currentValue === '0' && num !== '.') {
        currentValue = num;
    } else {
        currentValue += num;
    }
    
    updateDisplay();
    addButtonAnimation(event.target);
}

/**
 * Set operator untuk operasi matematika
 * @param {string} op - Operator (+, -, ×, ÷, %)
 */
function setOperator(op) {
    // Jika sudah ada operator dan belum reset, hitung dulu
    if (operator !== null && !shouldResetScreen) {
        calculate();
    }
    
    operator = op;
    previousValue = currentValue;
    shouldResetScreen = true;
    updateDisplay();
    addButtonAnimation(event.target);
    
    // Flash effect pada display
    displayContainer.classList.add('flash');
    setTimeout(() => {
        displayContainer.classList.remove('flash');
    }, 500);
}

/**
 * Hitung hasil operasi matematika
 */
function calculate() {
    if (operator === null || shouldResetScreen) return;
    
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;
    
    // Lakukan operasi berdasarkan operator
    switch(operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                showError();
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    
    // Format hasil jika terlalu panjang
    if (result.toString().length > 12) {
        if (Math.abs(result) < 0.000001 || Math.abs(result) > 999999999999) {
            currentValue = result.toExponential(6);
        } else {
            currentValue = parseFloat(result.toFixed(10)).toString();
        }
    } else {
        currentValue = result.toString();
    }
    
    operator = null;
    previousValue = '';
    shouldResetScreen = true;
    updateDisplay();
    
    // Animasi hasil
    currentDisplay.classList.add('result-animation');
    addButtonAnimation(event.target);
}

/**
 * Hapus semua nilai dan reset kalkulator
 */
function clearAll() {
    currentValue = '0';
    previousValue = '';
    operator = null;
    shouldResetScreen = false;
    updateDisplay();
    addButtonAnimation(event.target);
    
    // Hapus class error jika ada
    displayContainer.classList.remove('error');
    currentDisplay.classList.remove('error-text');
}

/**
 * Hapus angka terakhir yang diinput
 */
function deleteNum() {
    if (currentValue === 'Error') {
        clearAll();
        return;
    }
    
    if (currentValue.length === 1 || currentValue === '0') {
        currentValue = '0';
    } else {
        currentValue = currentValue.slice(0, -1);
    }
    updateDisplay();
    addButtonAnimation(event.target);
}

/**
 * Hitung akar kuadrat
 */
function calculateSquareRoot() {
    const current = parseFloat(currentValue);
    
    // Cek jika angka negatif
    if (current < 0) {
        showError();
        return;
    }
    
    if (currentValue === '0' || currentValue === 'Error') return;
    
    const result = Math.sqrt(current);
    
    // Simpan operasi di previous display
    previousValue = `√${currentValue}`;
    
    // Format hasil
    if (result.toString().length > 12) {
        currentValue = parseFloat(result.toFixed(10)).toString();
    } else {
        currentValue = result.toString();
    }
    
    operator = null;
    shouldResetScreen = true;
    updateDisplay();
    
    // Animasi hasil
    currentDisplay.classList.add('result-animation');
    addButtonAnimation(event.target);
}

/**
 * Toggle dark/light theme
 */
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeIcon = document.getElementById('themeIcon');
    
    if (document.body.classList.contains('dark-theme')) {
        themeIcon.src = 'sun-icon.png';
        themeIcon.alt = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.src = 'moon-icon.png';
        themeIcon.alt = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

/**
 * Tampilkan error dengan animasi
 */
function showError() {
    currentValue = 'Error';
    operator = null;
    previousValue = '';
    shouldResetScreen = true;
    
    displayContainer.classList.add('error');
    currentDisplay.classList.add('error-text');
    
    updateDisplay();
    
    setTimeout(() => {
        displayContainer.classList.remove('error');
    }, 500);
}

/**
 * Shake display untuk feedback visual
 */
function shakeDisplay() {
    displayContainer.classList.add('error');
    setTimeout(() => {
        displayContainer.classList.remove('error');
    }, 500);
}

/**
 * Tambahkan animasi pada tombol yang ditekan
 */
function addButtonAnimation(button) {
    if (!button) return;
    
    button.classList.add('pressed');
    setTimeout(() => {
        button.classList.remove('pressed');
    }, 200);
}

/**
 * Event listener untuk input keyboard
 */
document.addEventListener('keydown', (e) => {
    // Cari tombol yang sesuai
    let targetButton = null;
    
    // Angka 0-9
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
        targetButton = Array.from(document.querySelectorAll('.number')).find(
            btn => btn.textContent.trim() === e.key
        );
    }
    
    // Titik desimal
    if (e.key === '.') {
        appendNumber('.');
        targetButton = Array.from(document.querySelectorAll('.number')).find(
            btn => btn.textContent.trim() === '.'
        );
    }
    
    // Operator +, -
    if (e.key === '+' || e.key === '-') {
        setOperator(e.key);
        targetButton = Array.from(document.querySelectorAll('.operator')).find(
            btn => btn.textContent.trim() === e.key
        );
    }
    
    // Operator perkalian
    if (e.key === '*') {
        setOperator('×');
        targetButton = Array.from(document.querySelectorAll('.operator')).find(
            btn => btn.textContent.trim() === '×'
        );
    }
    
    // Operator pembagian
    if (e.key === '/') {
        e.preventDefault();
        setOperator('÷');
        targetButton = Array.from(document.querySelectorAll('.operator')).find(
            btn => btn.textContent.trim() === '÷'
        );
    }
    
    // Modulo
    if (e.key === '%') {
        setOperator('%');
        targetButton = Array.from(document.querySelectorAll('.operator')).find(
            btn => btn.textContent.trim() === '%'
        );
    }
    
    // Hitung hasil
    if (e.key === 'Enter' || e.key === '=') {
        calculate();
        targetButton = document.querySelector('.equals');
    }
    
    // Clear semua
    if (e.key === 'Escape') {
        clearAll();
        targetButton = document.querySelector('.clear');
    }
    
    // Delete angka terakhir
    if (e.key === 'Backspace') {
        deleteNum();
        targetButton = document.querySelector('.delete');
    }
    
    // Animasi tombol
    if (targetButton) {
        addButtonAnimation(targetButton);
    }
});

/**
 * Load tema yang tersimpan saat halaman dimuat
 */
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('themeIcon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.src = 'sun-icon.png';
        themeIcon.alt = 'Light Mode';
    } else {
        themeIcon.src = 'moon-icon.png';
        themeIcon.alt = 'Dark Mode';
    }
    
    // Load saved background image
    const savedBgImage = localStorage.getItem('bgImage');
    if (savedBgImage) {
        setBackgroundImage(savedBgImage);
    } else {
        // Set default background image jika belum ada yang tersimpan
        setBackgroundImage('background.jpg');
    }
    
    // Animasi fade in saat halaman dimuat
    document.querySelector('.calculator').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.calculator').style.transition = 'opacity 0.5s ease';
        document.querySelector('.calculator').style.opacity = '1';
    }, 100);
});

/**
 * Set background image
 * @param {string} imageUrl - URL gambar atau path ke file gambar
 */
function setBackgroundImage(imageUrl) {
    if (imageUrl && imageUrl.trim() !== '') {
        document.documentElement.style.setProperty('--bg-image', `url('${imageUrl}')`);
        localStorage.setItem('bgImage', imageUrl);
    } else {
        removeBackgroundImage();
    }
}

/**
 * Remove background image
 */
function removeBackgroundImage() {
    document.documentElement.style.setProperty('--bg-image', 'none');
    localStorage.removeItem('bgImage');
}

/**
 * Upload custom background image
 */
function uploadBackgroundImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setBackgroundImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

/**
 * Tambahkan efek hover pada semua tombol
 */
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

/**
 * Cegah zoom pada double-tap di mobile
 */
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

/**
 * Tambahkan ripple effect pada tombol
 */
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});