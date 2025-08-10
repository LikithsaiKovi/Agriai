// ======================= Loading Screen =========================
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  setTimeout(() => {
    loading.classList.add('hidden');
    setTimeout(() => {
      loading.style.display = 'none';
    }, 500);
  }, 1000);
});

// ======================= Responsive Navbar =========================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

// Close mobile menu when clicking on a link and smooth scroll
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    navLinks?.classList.remove('open');
    
    // Smooth scroll for internal links
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Active navigation highlighting
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ======================== Dark/Light Mode ===========================
const modeToggle = document.getElementById('mode-toggle');
const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  modeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
};

modeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'light' ? 'dark' : 'light');
});

(function initTheme() {
  const saved = localStorage.getItem('theme');
  setTheme(saved === 'dark' ? 'dark' : 'light');
})();

// ======================= IoT Data Simulation ========================
function randomIoT() {
  return {
    soil: (Math.random() * 40 + 30).toFixed(1),
    temp: (Math.random() * 15 + 15).toFixed(1),
    hum: (Math.random() * 30 + 40).toFixed(1)
  };
}
function updateIoT() {
  const { soil, temp, hum } = randomIoT();
  const soilEl = document.getElementById('soil-moisture');
  const tempEl = document.getElementById('temperature');
  const humEl = document.getElementById('humidity');

  if (!soilEl || !tempEl || !humEl) return; // ✅ Prevent crash

  const currentSoil = parseFloat(soilEl.textContent) || 0;
  const currentTemp = parseFloat(tempEl.textContent) || 0;
  const currentHum = parseFloat(humEl.textContent) || 0;

  animateCounter(soilEl, currentSoil, soil, 1000);
  animateCounter(tempEl, currentTemp, temp, 1000);
  animateCounter(humEl, currentHum, hum, 1000);
}


document.getElementById('refresh-iot')?.addEventListener('click', updateIoT);
updateIoT();



// ======================= Back to Top Button ========================
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    topBtn.classList.add('visible');
  } else {
    topBtn.classList.remove('visible');
  }
});

topBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ======================= Success Stories Carousel ========================
document.addEventListener('DOMContentLoaded', function() {
  const storyContainer = document.querySelector('.success-stories-container');
  const stories = document.querySelectorAll('.success-story');
  const navDots = document.querySelectorAll('.story-nav-dot');
  let currentStory = 0;
  
  // Function to show a specific story
  function showStory(index) {
    if (!storyContainer || stories.length === 0) return;
    
    // Validate index
    if (index < 0) index = stories.length - 1;
    if (index >= stories.length) index = 0;
    
    currentStory = index;
    
    // Scroll to the story
    storyContainer.scrollTo({
      left: stories[index].offsetLeft,
      behavior: 'smooth'
    });
    
    // Update nav dots
    navDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  // Add click event to nav dots
  navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showStory(index);
    });
  });
  
  // Auto-rotate stories every 8 seconds
  let storyInterval = setInterval(() => {
    showStory(currentStory + 1);
  }, 8000);
  
  // Pause rotation when hovering over stories
  storyContainer.addEventListener('mouseenter', () => {
    clearInterval(storyInterval);
  });
  
  // Resume rotation when mouse leaves
  storyContainer.addEventListener('mouseleave', () => {
    storyInterval = setInterval(() => {
      showStory(currentStory + 1);
    }, 8000);
  });
  
  // Initialize the first story
  showStory(0);
});

// ==================== Fade-In Animation on Scroll ==================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});
// ===================== Smart AI Tip Rotator =====================
const tips = [
  "💧 Check soil moisture daily during summer to avoid stress.",
  "🌧️ It's monsoon — optimize drainage to prevent root rot.",
  "🌱 Loamy soil is ideal for wheat, pulses, and oilseeds.",
  "🌡️ Extreme temperatures affect germination — consider shade nets.",
  "🚜 Practice crop rotation to maintain soil health.",
  "🛰️ Use satellite data for better land-use decisions.",
  "🔍 Early disease detection can save up to 40% yield.",
  "🧠 AI can predict ideal sowing time — use weather data wisely.",
  "📉 Reduce fertilizer use with AI-optimized nutrient planning.",
  "🌾 Smart irrigation cuts water use by 30–50% in many farms."
];

function rotateTip() {
  const tipEl = document.getElementById('ai-tip-banner');
  if (!tipEl) return;

  let lastIndex = -1;
  function showNewTip() {
    let index;
    do {
      index = Math.floor(Math.random() * tips.length);
    } while (index === lastIndex);
    lastIndex = index;
    tipEl.textContent = tips[index];
  }

  showNewTip();
  setInterval(showNewTip, 10000); // Change every 10 seconds
}
rotateTip();






function toggleDevice(id) {
  const el = document.getElementById(`${id}-status`);
  if (el) {
    el.textContent = el.textContent === "Active" || el.textContent === "Online" ? "Offline" : "Active";
  }
}

function simulateSpray() {
  const el = document.getElementById('drone-time');
  const now = new Date();
  el.textContent = `Just now (${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')})`;
}

function toggleIrrigation() {
  const el = document.getElementById('irrigation-mode');
  el.textContent = el.textContent === "Auto" ? "Manual" : "Auto";
}
document.getElementById('newsletter-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const emailInput = document.getElementById('newsletter-email');
  const messageEl = document.getElementById('newsletter-message');
  const email = emailInput.value.trim();

  if (!email) return;

  try {
    const res = await fetch('http://localhost:5000/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (res.ok) {
      messageEl.textContent = '✅ Subscribed!';
      messageEl.style.color = 'green';
      emailInput.value = '';
    } else {
      messageEl.textContent = `❌ ${data.error || 'Subscription failed.'}`;
      messageEl.style.color = 'red';
    }
  } catch (err) {
    messageEl.textContent = '❌ Server error.';
    messageEl.style.color = 'red';
  }
});
document.getElementById('recommend-btn')?.addEventListener('click', async () => {
  const soil = document.getElementById('soil-type').value;
  const climate = document.getElementById('climate').value;
  const resultEl = document.getElementById('recommend-result');

  resultEl.textContent = "🔄 Getting recommendations...";

  try {
    const response = await fetch('http://localhost:5000/api/recommend-crop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ soil, climate })
    });

    const data = await response.json();

    if (response.ok) {
      resultEl.textContent = `✅ Recommended Crops: ${data.recommended}`;
      resultEl.style.color = "green";
    } else {
      resultEl.textContent = `❌ ${data.error || "Something went wrong."}`;
      resultEl.style.color = "red";
    }
  } catch (err) {
    resultEl.textContent = "❌ Server error. Try again later.";
    resultEl.style.color = "red";
  }
});
async function fetchSensorData() {
  try {
    const res = await fetch('http://localhost:5000/api/iot-data');
    const data = await res.json();

    document.getElementById('temperature').textContent = data.temperature?.toFixed(1) ?? '--';
    document.getElementById('humidity').textContent = data.humidity?.toFixed(1) ?? '--';
    document.getElementById('soilMoisture').textContent = data.soilMoisture?.toFixed(1) ?? '--';
  } catch (err) {
    console.error("Failed to fetch IoT data:", err);
  }
}
document.getElementById('yield-form')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const crop = document.getElementById('crop-type').value.trim();
  const areaValue = document.getElementById('land-area').value.trim();
  const rateValue = document.getElementById('yield-rate').value.trim();

  const area = parseFloat(areaValue);
  const rate = parseFloat(rateValue);
  const resultEl = document.getElementById('yield-result');

  if (!crop || isNaN(area) || isNaN(rate)) {
    resultEl.textContent = '❌ Please fill in all fields correctly.';
    resultEl.style.color = 'red';
    return;
  }

  const estimated = area * rate;
  const inTons = estimated / 1000;

  resultEl.textContent = `✅ Estimated Yield for ${crop}: ${inTons.toFixed(2)} tons (${estimated.toFixed(0)} kg)`;
  resultEl.style.color = 'green';
});
document.getElementById('chat-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const input = document.getElementById('chat-input');
  const output = document.getElementById('chat-response');
  const message = input.value.trim();

  if (!message) return;

  output.textContent = "🧠 Thinking...";

  try {
    const res = await fetch('http://localhost:5050/api/chatbot', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message }) // ✅ "message" must match
});


    const data = await res.json();

    if (res.ok) {
      output.textContent = `🤖 ${data.reply}`;
    } else {
      output.textContent = `❌ ${data.error || "Error from AI"}`;
    }
  } catch (err) {
    output.textContent = "❌ Unable to load. Check console.";
    console.error("Chat error:", err);
  }

  input.value = '';
});
document.addEventListener("DOMContentLoaded", () => {
const modal = document.getElementById('concept-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modal.classList.add('hidden');
});


const cardData = {
  facial: {
    title: "Facial Recognition",
    description: "A new video-based system uses real-time facial recognition to identify dairy cows based only on their faces. This system, installed on a farm, uses deep learning models (YOLOv5 for detection and ViT with ArcFace loss for recognition). It can detect and classify multiple cows simultaneously in less than 20 milliseconds per frame, achieving high accuracy. This allows for automatic, non-contact individual monitoring of cows, supporting improved farm management and animal well-being.",
    video: "videos/Facial.mp4" // Replace with your actual video
  },
    health: {
      title: "Health Monitoring",
      description: "This paper explores new ways to monitor plant health in vertical farms using modified versions of the Normalized Difference Vegetation Index (NDVI). While traditional and Single-Image NDVI (SI-NDVI) have limitations with artificial lighting, this study proposes UV-NDVI, which uses UV light to induce chlorophyll fluorescence as a more sensitive indicator of plant stress. The research developed a system with a custom LED light and an IoT device to calculate both SI-NDVI and UV-NDVI simultaneously, demonstrating through a lettuce experiment that UV-NDVI could detect water stress earlier than visual inspection",
      video: "videos/health.mp4" // Replace with your actual video
    },
    cattle: {
      title: "Feeding Optimization",
      description: "There are lots of exciting new tools and capabilities for implementing AI on-farm. Animals can be fitted for sensors. Sensors can be in the form of eartags, nose bands, tail bands, ankle monitors and even sensors in their reticulorumen. Some of the data these sensors are collecting include body temperature, activity level, drinking time, rumination time, time spent grazing or at the feedbunk – and of course location. Additionally, cameras in housed livestock facilities can be used to evaluate body temperature, body condition and other behaviors as well. Cameras can also be mounted to all-terrain vehicles to monitor animals out on pasture, evaluate available forages and provide more information to improve land management....",
      video: "videos/Cattle.mp4"
    },
    field: {
      title: "Agricultural Drone scanning a field",
      description: "Drones using ‘regular’ cameras are also used to monitor crop health. Many farmers already use satellite imagery to monitor crop growth, density, and colouration, but accessing satellite data is costly and not as effective in many cases as closer drone imaging. Because drones fly close to fields, cloud cover and poor light conditions matter less than when using satellite imaging. Satellite imaging may offer to the meter accuracy, but drone imaging is capable of producing accurate image location to the millimetre. This means that after planting, areas with stand gaps can be spotted and replanted as needed, and disease or pest problems can be detected and treated for right away....",
      video: "videos/Drones.mp4"
    },
    soil: {
      title: "Soil & Crop Sensors (IoT)",
      description: "To address world food and agricultural sustainability, the UN's Sustainable Development Goals (SDGs) place strong emphasis on a transformative agricultural sector. By 2050, there will be about 10 billion people on the planet, making it imperative to increase about 60 percent in food production efficiency and security in order to meet the growing population's demands. In this critical situation, IoT-based smart farming offers a promising solution that can achieve 12 SDGs out of 17. This study unveils a groundbreaking Internet of Things (IoT) system designed to revolutionize agricultural practices by providing real-time monitoring of soil parameters, including temperature, moisture, salinity, EC, pH, nitrogen, potassium, and phosphorus levels. Field testing conducted with rice crops in Rahim Yar Khan, Pakistan, demonstrated the system's remarkable ability to accurately measure all eight critical parameters. The soil analysis showed a temperature between 30.5 °C and 33.2 °C, a moisture content between 60.6 % and 94.1 % and a pH value between 7.13 and 8.33. Nutrient content varied with nitrogen (71–103 mg/kg), phosphorus (15–19 mg/kg), and potassium (101–141 mg/kg). Leveraging this data, an AI-driven mobile application was used to deliver best recommendations for optimizing crop management, particularly in fertilization, irrigation and disease diagnoses practices. By integrating advanced IoT technologies, cloud computing, predictive algorithms, and a smart soil sensor, this system revolutionizes agriculture by enabling real-time monitoring of critical factors influencing rice crops metabolism. It empowers farmers with data-driven insights to enhance productivity, optimize resource use, and improve sustainability. This scalable solution addresses modern agricultural challenges by reducing environmental impact and strengthening crop resilience. Focused on unlocking the potential of data-driven decision-making, this research paves the way for sustainable, smart farming practices to meet the growing demands of a rapidly increasing global population....",
      video: "videos/Soil.mp4"
    },
    robotics: {
      title: "Robotics & Automation",
      description: "Since the industrial revolution in the 1800s, automation got more advanced to efficiently handle sophisticated tasks and increase production. With increasing demands and shortage of labor across the globe, agriculture robots or commonly known as Agribots are starting to gain attention among farmers. Crop production decreased by an estimated 213 crores approx ($3.1 billion) a year due to labor shortages in the USA alone. Recent advancements in sensors and AI technology that lets machines train on their surroundings have made agrobots more notable. We are still in the early stages of an ag-robotics revolution, harnessing the full potential of the Internet of Things in agriculture, with most of the products still in early trial phases and R&D mode....",
      video: "videos/Robotics.mp4"
    },
  analysis: {
      title: "Predictive Analyticss",
      description: "In the ever-evolving landscape of agriculture, the integration of artiﬁcial intelligence (AI) and predictiveanalytics has emerged as a transformative force, oﬀering innovative solutions to optimize crop yields and ensure the sustainability of farming practices.e AI-powered predictive analytics for crop yield optimization, unveiling its pivotal role in modern agriculture is discussed here. We begin with an introduction to the core concepts, emphasizing the critical importance of data-driven decision-makingin farming. With a spotlight on the multifaceted role of AI in agriculture, we explore the manifold beneﬁts of harnessing predictive analytics for crop management. Data collection and analysis, the bedrock of this technology, are examined, along with insights into the machine learning algorithms that underpin AI’s predictive prowess. Real-time monitoring and decision support are also addressed,illustrating how AI’s predictive capabilities empower farmers to make timely and informed choices.Precision agriculture, a driving force for sustainability, ﬁnds its place in this narrative, as we investigatehow predictive analytics optimizes resource utilization and minimizes environmental impact.e chapterunveils the profound beneﬁts of AI-powered predictive analytics in agriculture, from bolstering crop yields and resource eﬃciency to fostering sustainability and mitigating environmental consequences.However, with innovation comes responsibility, and we delve into the challenges and considerations associated with data privacy, technology adoption, and ethical ramiﬁcations.",
      video: "videos/Analytics.mp4"
    },
  
  vision: {
      title: "Computer Vision",
      description: "Recently, the fields of computer vision and machine learning have been gaining traction in agriculture. Computer Vision (CV) technology is changing the way agriculture operates by allowing for non-contact and scalable sensing solutions. The use of computer vision techniques in conjunction with image acquisition through remote cameras has opened up a range of new applications in the agricultural sector, from saving production costs with intelligent automation to boosting productivity....",
      video: "videos/vision.mp4"
    },
    optimization: {
      title: "Resource Optimization",
      description: "Resource optimization in farming on YouTube videos involves demonstrating how to efficiently manage resources like land, water, labor, energy, and inputs to maximize crop yields and minimize waste. These videos showcase various modern farming methods like precision farming, hydroponics, aquaponics, and vertical farming, highlighting their ability to increase efficiency and reduce waste. They also feature integrated farming systems, which combine different farming activities to create diverse income streams and resilience...",
      video: "videos/Optimizing.mp4"
    },
    ai: {
      title: "AI-Driven Robotics",
      description: "AI-driven technologies address different challenges faced by the agriculture industry, such as soil health, crop yield, and herbicide resistance. These technologies are emerging to improve the efficiency of agriculture. In this study, we will discuss the role of artificial intelligence in agriculture. These days agricultural robots are a highly valued application of Artificial Intelligence. It is predicted that agricultural robots will be designed and developed to complete different tasks such as spraying herbicides and harvesting crops in the next three to five years. Farmers nowadays are equipped with up-to-date machinery and technology. This will ensure more productivity and profitability. It will help to prove the value of these tools over the long haul. As compared to other industries, the risk is easier to model and predict. The case is different in agriculture as it is impacted by environmental factors. Due to this, the extensive testing and validation of emerging AI applications in agriculture are critical. The agriculture industry will continue to adopt emerging AI in future....",
      video: "videos/shorts.mp4"
    },
  };


  document.querySelectorAll('.card.card-animated').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const info = cardData[id];
      if (!info) return;

      modalBody.innerHTML = `
        <h2>${info.title}</h2>
        <p>${info.description}</p>
        <video controls width="100%" style="margin-top: 1rem;">
          <source src="${info.video}" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      `;
      modal.classList.remove('hidden');
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
});
