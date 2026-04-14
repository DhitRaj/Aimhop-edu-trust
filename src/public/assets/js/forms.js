/* ============================================
   FORM HANDLING & VALIDATION
   ============================================ */

const API_BASE = (typeof window !== 'undefined' && window.location.hostname === 'localhost') 
  ? 'http://localhost:3000/api/v1'
  : `${window.location.origin}/api/v1`;

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
      name: form.querySelector('[name="name"]')?.value?.trim(),
      email: form.querySelector('[name="email"]')?.value?.trim(),
      phone: form.querySelector('[name="phone"]')?.value?.trim(),
      father: form.querySelector('[name="father"]')?.value?.trim(),
      dob: form.querySelector('[name="dob"]')?.value,
      gender: form.querySelector('[name="gender"]')?.value,
      state: form.querySelector('[name="state"]')?.value,
      district: form.querySelector('[name="district"]')?.value?.trim(),
      qualification: form.querySelector('[name="qualification"]')?.value,
      course: form.querySelector('[name="course"]')?.value,
      address: form.querySelector('[name="address"]')?.value?.trim(),
      query: form.querySelector('[name="query"]')?.value?.trim()
    };

    // Frontend Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.father || !formData.state || !formData.district || !formData.qualification || !formData.course) {
      showAlert('कृपया सभी आवश्यक फील्ड भरें', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    if (!validators.name(formData.name)) {
      showAlert('नाम 2-100 अक्षरों का होना चाहिए', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    if (!validators.email(formData.email)) {
      showAlert('कृपया सही ईमेल दर्ज करें', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    if (!validators.phone(formData.phone)) {
      showAlert('कृपया 10 अंकों का फोन नंबर दर्ज करें', 'error');
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
      name: form.querySelector('[name="name"]')?.value?.trim(),
      email: form.querySelector('[name="email"]')?.value?.trim(),
      subject: form.querySelector('[name="subject"]')?.value?.trim(),
      message: form.querySelector('[name="message"]')?.value?.trim()
    };

    // Frontend Validation
    if (!formData.name || !formData.email || !formData.message) {
      showAlert('कृपया सभी आवश्यक फील्ड भरें', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    if (!validators.name(formData.name)) {
      showAlert('नाम 2-100 अक्षरों का होना चाहिए', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    if (!validators.email(formData.email)) {
      showAlert('कृपया सही ईमेल दर्ज करें', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    if (formData.message.length > 5000) {
      showAlert('संदेश 5000 अक्षरों से कम होना चाहिए', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

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
      name: form.querySelector('[name="name"]')?.value?.trim(),
      email: form.querySelector('[name="email"]')?.value?.trim(),
      phone: form.querySelector('[name="phone"]')?.value?.trim(),
      college: form.querySelector('[name="college"]')?.value?.trim(),
      university: form.querySelector('[name="university"]')?.value?.trim(),
      principal: form.querySelector('[name="principal"]')?.value?.trim()
    };

    // Frontend Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.college || !formData.university) {
      showAlert('कृपया सभी आवश्यक फील्ड भरें', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    if (!validators.name(formData.name)) {
      showAlert('नाम 2-100 अक्षरों का होना चाहिए', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    if (!validators.email(formData.email)) {
      showAlert('कृपया सही ईमेल दर्ज करें', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    if (!validators.phone(formData.phone)) {
      showAlert('कृपया 10 अंकों का फोन नंबर दर्ज करें', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

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
      name: form.querySelector('[name="name"]')?.value?.trim(),
      email: form.querySelector('[name="email"]')?.value?.trim(),
      phone: form.querySelector('[name="phone"]')?.value?.trim(),
      experience: form.querySelector('[name="experience"]')?.value?.trim(),
      qualification: form.querySelector('[name="qualification"]')?.value?.trim(),
      state: form.querySelector('[name="state"]')?.value,
      district: form.querySelector('[name="district"]')?.value?.trim(),
      address: form.querySelector('[name="address"]')?.value?.trim(),
      message: form.querySelector('[name="message"]')?.value?.trim()
    };

    // Frontend Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.state || !formData.district) {
      showAlert('कृपया सभी आवश्यक फील्ड भरें', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    if (!validators.name(formData.name)) {
      showAlert('नाम 2-100 अक्षरों का होना चाहिए', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    if (!validators.email(formData.email)) {
      showAlert('कृपया सही ईमेल दर्ज करें', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    if (!validators.phone(formData.phone)) {
      showAlert('कृपया 10 अंकों का फोन नंबर दर्ज करें', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    const response = await fetch(`${API_BASE}/associate-register`, {
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
      name: form.querySelector('[name="name"]')?.value?.trim(),
      email: form.querySelector('[name="email"]')?.value?.trim(),
      phone: form.querySelector('[name="phone"]')?.value?.trim(),
      experience: form.querySelector('[name="experience"]')?.value?.trim(),
      qualification: form.querySelector('[name="qualification"]')?.value?.trim(),
      state: form.querySelector('[name="state"]')?.value,
      district: form.querySelector('[name="district"]')?.value?.trim(),
      address: form.querySelector('[name="address"]')?.value?.trim(),
      message: form.querySelector('[name="message"]')?.value?.trim()
    };

    // Frontend Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.state || !formData.district) {
      showAlert('कृपया सभी आवश्यक फील्ड भरें', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    if (!validators.name(formData.name)) {
      showAlert('नाम 2-100 अक्षरों का होना चाहिए', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    if (!validators.email(formData.email)) {
      showAlert('कृपया सही ईमेल दर्ज करें', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    if (!validators.phone(formData.phone)) {
      showAlert('कृपया 10 अंकों का फोन नंबर दर्ज करें', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      return;
    }

    const response = await fetch(`${API_BASE}/coordinator-register`, {
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

// ===== VALIDATION HELPERS =====
const validators = {
  email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  phone: (phone) => /^[0-9]{10}$/.test(phone.replace(/\D/g, '')),
  name: (name) => name && name.length >= 2 && name.length <= 100,
  required: (value) => value && value.trim().length > 0
};

// Form input validation
document.addEventListener('DOMContentLoaded', () => {
  // Phone number validation
  const phoneInputs = document.querySelectorAll('input[name="phone"], input[name="whatsapp"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    });
    input.addEventListener('blur', (e) => {
      if (e.target.value && !validators.phone(e.target.value)) {
        e.target.style.borderColor = '#ef4444';
      } else {
        e.target.style.borderColor = '';
      }
    });
  });

  // Email validation
  const emailInputs = document.querySelectorAll('input[type="email"]');
  emailInputs.forEach(input => {
    input.addEventListener('blur', (e) => {
      const isValid = validators.email(e.target.value);
      if (!isValid && e.target.value) {
        e.target.style.borderColor = '#ef4444';
      } else {
        e.target.style.borderColor = '';
      }
    });
  });

  // Name validation
  const nameInputs = document.querySelectorAll('input[name="name"], input[name="father"]');
  nameInputs.forEach(input => {
    input.addEventListener('blur', (e) => {
      if (e.target.value && !validators.name(e.target.value)) {
        e.target.style.borderColor = '#ef4444';
      } else {
        e.target.style.borderColor = '';
      }
    });
  });
});
