/* ============================================
   FORM HANDLING & VALIDATION
   ============================================ */

const API_BASE = `${window.location.origin}/api/v1`;

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
      firstName: form.querySelector('[name="firstName"]')?.value?.trim(),
      lastName: form.querySelector('[name="lastName"]')?.value?.trim(),
      email: form.querySelector('[name="email"]')?.value?.trim(),
      phone: form.querySelector('[name="phone"]')?.value?.trim(),
      gender: form.querySelector('[name="gender"]')?.value,
      qualification: form.querySelector('[name="qualification"]')?.value,
      category: form.querySelector('[name="category"]')?.value,
      nationality: form.querySelector('[name="nationality"]')?.value?.trim(),
      dob: form.querySelector('[name="dob"]')?.value,
      fatherName: form.querySelector('[name="fatherName"]')?.value?.trim(),
      motherName: form.querySelector('[name="motherName"]')?.value?.trim(),
      fatherNumber: form.querySelector('[name="fatherNumber"]')?.value?.trim(),
      motherNumber: form.querySelector('[name="motherNumber"]')?.value?.trim(),
      parentsOccupation: form.querySelector('[name="parentsOccupation"]')?.value?.trim(),
      annualIncome: form.querySelector('[name="annualIncome"]')?.value?.trim(),
      program: form.querySelector('[name="program"]')?.value,
      course: form.querySelector('[name="course"]')?.value?.trim(),
      referenceNo: form.querySelector('[name="referenceNo"]')?.value?.trim(),
      associateName: form.querySelector('[name="associateName"]')?.value?.trim(),
      address: form.querySelector('[name="address"]')?.value?.trim(),
      locations: Array.from(form.querySelectorAll('[name="locations"]:checked')).map(cb => cb.value),
      otherState: form.querySelector('[name="otherState"]')?.value?.trim(),
      agreed: form.querySelector('[name="agreed"]')?.checked
    };

    // Minimal Frontend Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.course) {
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
      showAlert(data.message || 'रजिस्ट्रेशन सफल रहा', 'success');
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

    // Note: We use FormData for potential file uploads, 
    // but the current backend endpoint expects JSON.
    // For now, we'll collect text fields.
    const formData = {
      collegeName: form.querySelector('[name="collegeName"]')?.value?.trim(),
      principleName: form.querySelector('[name="principleName"]')?.value?.trim(),
      email: form.querySelector('[name="email"]')?.value?.trim(),
      phone: form.querySelector('[name="phone"]')?.value?.trim(),
      country: form.querySelector('[name="country"]')?.value?.trim(),
      state: form.querySelector('[name="state"]')?.value?.trim(),
      city: form.querySelector('[name="city"]')?.value?.trim(),
      zipCode: form.querySelector('[name="zipCode"]')?.value?.trim(),
      address: form.querySelector('[name="address"]')?.value?.trim()
    };

    // Frontend Validation
    if (!formData.collegeName || !formData.principleName || !formData.email || !formData.phone) {
      showAlert('कृपया सभी आवश्यक फील्ड भरें', 'error');
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
      showAlert(data.message || 'रजिस्ट्रेशन सफल रहा', 'success');
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
      firstName: form.querySelector('[name="firstName"]')?.value?.trim(),
      lastName: form.querySelector('[name="lastName"]')?.value?.trim(),
      email: form.querySelector('[name="email"]')?.value?.trim(),
      phone: form.querySelector('[name="phone"]')?.value?.trim(),
      address: form.querySelector('[name="address"]')?.value?.trim(),
      country: form.querySelector('[name="country"]')?.value?.trim(),
      state: form.querySelector('[name="state"]')?.value?.trim(),
      city: form.querySelector('[name="city"]')?.value?.trim(),
      zipCode: form.querySelector('[name="zipCode"]')?.value?.trim()
    };

    // Frontend Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      showAlert('कृपया सभी आवश्यक फील्ड भरें', 'error');
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
      showAlert(data.message || 'रजिस्ट्रेशन सफल रहा', 'success');
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
      firstName: form.querySelector('[name="firstName"]')?.value?.trim(),
      lastName: form.querySelector('[name="lastName"]')?.value?.trim(),
      email: form.querySelector('[name="email"]')?.value?.trim(),
      phone: form.querySelector('[name="phone"]')?.value?.trim(),
      address: form.querySelector('[name="address"]')?.value?.trim(),
      country: form.querySelector('[name="country"]')?.value?.trim(),
      state: form.querySelector('[name="state"]')?.value?.trim(),
      city: form.querySelector('[name="city"]')?.value?.trim(),
      zipCode: form.querySelector('[name="zipCode"]')?.value?.trim()
    };

    // Frontend Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      showAlert('कृपया सभी आवश्यक फील्ड भरें', 'error');
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
      showAlert(data.message || 'रजिस्ट्रेशन सफल रहा', 'success');
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
