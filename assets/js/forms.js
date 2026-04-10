/* ============================================
   FORM HANDLING & VALIDATION
   ============================================ */

const API_BASE = 'http://localhost:3000/api';

// Student Registration Form
async function submitStudentForm(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'भेज रहे हैं...';

    const formData = {
      name: form.querySelector('[name="name"]')?.value,
      email: form.querySelector('[name="email"]')?.value,
      phone: form.querySelector('[name="phone"]')?.value,
      father: form.querySelector('[name="father"]')?.value,
      dob: form.querySelector('[name="dob"]')?.value,
      gender: form.querySelector('[name="gender"]')?.value,
      state: form.querySelector('[name="state"]')?.value,
      district: form.querySelector('[name="district"]')?.value,
      qualification: form.querySelector('[name="qualification"]')?.value,
      course: form.querySelector('[name="course"]')?.value,
      address: form.querySelector('[name="address"]')?.value,
      query: form.querySelector('[name="query"]')?.value
    };

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      showAlert('कृपया सभी आवश्यक फील्ड भरें', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    const response = await fetch(`${API_BASE}/student-register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      showAlert(data.message, 'success');
      form.reset();
    } else {
      showAlert(data.error || 'कोई त्रुटि हुई', 'error');
    }
  } catch (error) {
    console.error(error);
    showAlert('नेटवर्क त्रुटि। कृपया बाद में कोशिश करें।', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

// Contact Form
async function submitContactForm(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'भेज रहे हैं...';

    const formData = {
      name: form.querySelector('[name="name"]')?.value,
      email: form.querySelector('[name="email"]')?.value,
      subject: form.querySelector('[name="subject"]')?.value,
      message: form.querySelector('[name="message"]')?.value
    };

    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      showAlert(data.message, 'success');
      form.reset();
    } else {
      showAlert(data.error || 'कोई त्रुटि हुई', 'error');
    }
  } catch (error) {
    console.error(error);
    showAlert('नेटवर्क त्रुटि। कृपया बाद में कोशिश करें।', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

// College Registration Form
async function submitCollegeForm(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'भेज रहे हैं...';

    const formData = {
      name: form.querySelector('[name="name"]')?.value,
      email: form.querySelector('[name="email"]')?.value,
      phone: form.querySelector('[name="phone"]')?.value,
      college: form.querySelector('[name="college"]')?.value,
      university: form.querySelector('[name="university"]')?.value,
      principal: form.querySelector('[name="principal"]')?.value
    };

    const response = await fetch(`${API_BASE}/college-register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      showAlert(data.message, 'success');
      form.reset();
    } else {
      showAlert(data.error || 'कोई त्रुटि हुई', 'error');
    }
  } catch (error) {
    console.error(error);
    showAlert('नेटवर्क त्रुटि। कृपया बाद में कोशिश करें।', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

// Associate Registration Form
async function submitAssociateForm(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'भेज रहे हैं...';

    const formData = {
      name: form.querySelector('[name="name"]')?.value,
      email: form.querySelector('[name="email"]')?.value,
      phone: form.querySelector('[name="phone"]')?.value,
      experience: form.querySelector('[name="experience"]')?.value,
      qualification: form.querySelector('[name="qualification"]')?.value,
      state: form.querySelector('[name="state"]')?.value,
      district: form.querySelector('[name="district"]')?.value,
      address: form.querySelector('[name="address"]')?.value,
      message: form.querySelector('[name="message"]')?.value
    };

    const response = await fetch(`${API_BASE}/v1/associate-register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      showAlert(data.message, 'success');
      form.reset();
    } else {
      showAlert(data.error || 'कोई त्रुटि हुई', 'error');
    }
  } catch (error) {
    console.error(error);
    showAlert('नेटवर्क त्रुटि। कृपया बाद में कोशिश करें।', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

// Coordinator Registration Form
async function submitCoordinatorForm(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'भेज रहे हैं...';

    const formData = {
      name: form.querySelector('[name="name"]')?.value,
      email: form.querySelector('[name="email"]')?.value,
      phone: form.querySelector('[name="phone"]')?.value,
      experience: form.querySelector('[name="experience"]')?.value,
      qualification: form.querySelector('[name="qualification"]')?.value,
      state: form.querySelector('[name="state"]')?.value,
      district: form.querySelector('[name="district"]')?.value,
      address: form.querySelector('[name="address"]')?.value,
      message: form.querySelector('[name="message"]')?.value
    };

    const response = await fetch(`${API_BASE}/v1/coordinator-register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      showAlert(data.message, 'success');
      form.reset();
    } else {
      showAlert(data.error || 'कोई त्रुटि हुई', 'error');
    }
  } catch (error) {
    console.error(error);
    showAlert('नेटवर्क त्रुटि। कृपया बाद में कोशिश करें।', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

// Alert notification
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
    <div style="position: fixed; top: 20px; right: 20px; z-index: 10000; 
                background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
                color: white; padding: 16px 24px; border-radius: 8px; 
                box-shadow: 0 4px 12px rgba(0,0,0,0.15); max-width: 400px;">
      ${message}
    </div>
  `;
  document.body.appendChild(alertDiv);
  
  setTimeout(() => alertDiv.remove(), 4000);
}

// Form input validation
document.addEventListener('DOMContentLoaded', () => {
  // Phone number validation
  const phoneInputs = document.querySelectorAll('input[name="phone"], input[name="whatsapp"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    });
  });

  // Email validation
  const emailInputs = document.querySelectorAll('input[type="email"]');
  emailInputs.forEach(input => {
    input.addEventListener('blur', (e) => {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
      if (!isValid && e.target.value) {
        e.target.style.borderColor = '#ef4444';
      } else {
        e.target.style.borderColor = '';
      }
    });
  });
});
