document.addEventListener('DOMContentLoaded', () => {
      // 1. CITIES & REALISTIC DISTANCE MATRIX (KM)
      const cities = [
        'Bakı',
        'Sumqayıt',
        'Gəncə',
        'Naxçıvan MR',
        'Lənkəran',
        'Şəki',
        'Mingəçevir',
        'Türkiyə - İstanbul',
        'Gürcüstan - Tbilisi',
        'Rusiya - Moskva'
      ];

      const distanceFromBaku = {
        'Bakı': 18,
        'Sumqayıt': 38,
        'Gəncə': 365,
        'Naxçıvan MR': 560,
        'Lənkəran': 268,
        'Şəki': 305,
        'Mingəçevir': 285,
        'Türkiyə - İstanbul': 2180,
        'Gürcüstan - Tbilisi': 580,
        'Rusiya - Moskva': 2240
      };

      function getRouteDistance(origin, dest) {
        if (origin === dest) return 18;
        if (origin === 'Bakı') return distanceFromBaku[dest] || 250;
        if (dest === 'Bakı') return distanceFromBaku[origin] || 250;
        // Realistic intercity calculation
        const d1 = distanceFromBaku[origin] || 200;
        const d2 = distanceFromBaku[dest] || 200;
        return Math.max(45, Math.round(Math.abs(d1 - d2) + Math.min(d1, d2) * 0.65));
      }

      // 2. VEHICLES & FLEET DATA
      const vehicles = [
        {
          id: 'pikap',
          name: 'Mini Pikap 1.5t',
          category: 'city',
          categoryLabel: 'Şəhərdaxili',
          basePrice: 25,
          perKm: 0.55,
          capacity: '1,500 kq',
          volume: '6.5 m³',
          dimensions: '2.6m × 1.6m × 1.5m',
          img: 'https://images.unsplash.com/photo-1559297436-fa2e8c147a6f?auto=format&fit=crop&w=800&q=80',
          desc: 'Şəhərdaxili sürətli yük taksisi, məişət texnikası və kiçik ofis daşımaları üçün.'
        },
        {
          id: 'transit',
          name: 'Ford Transit 3t',
          category: 'city',
          categoryLabel: 'Şəhərdaxili & Bölgə',
          basePrice: 45,
          perKm: 0.75,
          capacity: '3,000 kq',
          volume: '14 m³',
          dimensions: '4.1m × 1.9m × 2.0m',
          img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
          desc: '2-3 otaqlı mənzil köçürülməsi və kommersiya malları üçün ən populyar seçim.'
        },
        {
          id: 'atego',
          name: 'Mercedes Atego 10t',
          category: 'intercity',
          categoryLabel: 'Regionlararası',
          basePrice: 95,
          perKm: 1.15,
          capacity: '10,000 kq',
          volume: '42 m³',
          dimensions: '7.4m × 2.45m × 2.45m',
          img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
          desc: 'Hidravlik liftli kuzov ilə rayonlararası irihəcmli sənaye və korporativ yüklər.'
        },
        {
          id: 'refrijerator',
          name: 'Refrijerator 5t',
          category: 'international',
          categoryLabel: 'Soyuduculu (-25°C)',
          basePrice: 85,
          perKm: 1.05,
          capacity: '5,000 kq',
          volume: '24 m³',
          dimensions: '5.4m × 2.2m × 2.1m',
          img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
          desc: 'Rəqəmsal temperatur nəzarətli kamera ilə qida və tibbi preparatların daşınması.'
        },
        {
          id: 'tir22',
          name: 'Beynəlxalq TIR 22t',
          category: 'international',
          categoryLabel: 'Beynəlxalq CMR',
          basePrice: 180,
          perKm: 1.55,
          capacity: '22,000 kq',
          volume: '86 m³',
          dimensions: '13.6m × 2.48m × 2.7m',
          img: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&q=80',
          desc: 'Türkiyə, Gürcüstan və Rusiya xətləri üzrə tam tentli beynəlxalq avtoqatar.'
        }
      ];

      // 3. LIVE TELEMETRY & TRACKING DATABASE
      const shipments = {
        'KV-9428-AZ': {
          code: 'KV-9428-AZ',
          origin: 'Bakı (Babək Terminal)',
          dest: 'Gəncə (Qərb Logistika Mərkəzi)',
          vehicle: 'Mercedes Atego 10t • 77-KV-412',
          driver: 'Elşən Quliyev',
          initials: 'EQ',
          phone: '+994 50 412-88-10',
          status: 'Yoldadır • Magistral Hərəkət',
          coords: '40.3381° N, 48.1524° E',
          speed: '84 km/saat',
          temp: '+18.5°C (Normal)',
          eta: 'Bu gün, 18:20',
          progress: 68,
          steps: [
            { time: '09:10', title: 'Sifariş rəsmiləşdirildi və sığortalandı', desc: 'Bakı mərkəzi anbarında elektron qaimə açıldı', done: true },
            { time: '10:35', title: 'Yükləmə və plomblanma tamamlandı', desc: '12 palet elektronika avadanlığı bərkidildi', done: true },
            { time: '14:15', title: 'Kürdəmir GPS nəzarət məntəqəsi', desc: 'Bakı-Qazax avtomagistralı ilə stabil hərəkət', done: true, current: true },
            { time: '18:20', title: 'Gəncə təyinat ünvanına təhvil', desc: 'Alıcıya SMS təsdiq kodu göndəriləcək', done: false }
          ]
        },
        'KV-3810-TR': {
          code: 'KV-3810-TR',
          origin: 'Türkiyə - İstanbul (Hadımköy)',
          dest: 'Bakı (Meyvəli Karqo Terminalı)',
          vehicle: 'Beynəlxalq TIR 22t • 99-TR-809',
          driver: 'Murad Vəliyev',
          initials: 'MV',
          phone: '+994 55 809-33-21',
          status: 'Gömrük Terminalında',
          coords: '40.3214° N, 49.7612° E',
          speed: '0 km/saat (Terminal)',
          temp: '+16.0°C (Optimal)',
          eta: 'Sabah, 10:30',
          progress: 86,
          steps: [
            { time: '4 gün əvvəl', title: 'İstanbul anbarından çıxış', desc: 'Beynəlxalq CMR və TIR Carnet rəsmiləşdi', done: true },
            { time: 'Dünən, 17:40', title: 'Qırmızı Körpü sərhəd keçidi', desc: 'Azərbaycan gömrük zonasına daxil oldu', done: true },
            { time: 'Bu gün, 12:10', title: 'Bakı Baş Gömrük İdarəsi', desc: 'Elektron bəyannamə təsdiqlənir', done: true, current: true },
            { time: 'Sabah, 10:30', title: 'Müştəri ünvanına çatdırılma', desc: 'Boşaltma briqadası təyin edilib', done: false }
          ]
        }
      };

      // 4. THEME TOGGLE & MOBILE MENU
      const htmlEl = document.documentElement;
      const iconSun = document.getElementById('icon-sun');
      const iconMoon = document.getElementById('icon-moon');

      function setTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        iconSun.classList.toggle('hidden', theme === 'light');
        iconMoon.classList.toggle('hidden', theme === 'dark');
        localStorage.setItem('azerkargo-ui-theme', theme);
      }

      const savedTheme = localStorage.getItem('azerkargo-ui-theme') || 'dark';
      setTheme(savedTheme);

      document.getElementById('theme-toggle').addEventListener('click', () => {
        const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(next);
      });

      const mobileDrawer = document.getElementById('mobile-drawer');
      document.getElementById('mobile-toggle').addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
      });
      document.querySelectorAll('.drawer-link').forEach(a => {
        a.addEventListener('click', () => mobileDrawer.classList.remove('open'));
      });

      function showToast(text) {
        const stack = document.getElementById('toast-stack');
        const toast = document.createElement('div');
        toast.className = 'toast-item';
        toast.innerHTML = `<span style="color: var(--amber);">●</span><span>${text}</span>`;
        stack.appendChild(toast);
        setTimeout(() => {
          toast.style.opacity = '0';
          toast.style.transition = 'opacity 0.25s';
          setTimeout(() => toast.remove(), 250);
        }, 3200);
      }

      // 5. SMART CALCULATOR INITIALIZATION & ENGINE
      const originSelect = document.getElementById('calc-origin');
      const destSelect = document.getElementById('calc-dest');
      const vehicleGrid = document.getElementById('vehicle-selector-grid');
      const porterCountEl = document.getElementById('porter-count');
      const floorInput = document.getElementById('floor-input');
      const floorValLabel = document.getElementById('floor-val-label');
      const elevatorToggle = document.getElementById('elevator-toggle');
      const elevatorLbl = document.getElementById('elevator-status-lbl');
      const chkPackaging = document.getElementById('chk-packaging');
      const chkAssembly = document.getElementById('chk-assembly');

      let selectedVehicleId = 'transit';
      let porters = 2;

      cities.forEach(city => {
        originSelect.add(new Option(city, city));
        destSelect.add(new Option(city, city));
      });
      originSelect.value = 'Bakı';
      destSelect.value = 'Gəncə';

      function renderCalcVehicles() {
        vehicleGrid.innerHTML = vehicles.map(v => `
          <button type="button" class="v-card ${v.id === selectedVehicleId ? 'selected' : ''}" data-vid="${v.id}">
            <div class="v-card-head">
              <div class="v-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
              <span class="v-card-rate">${v.basePrice} AZN+</span>
            </div>
            <div>
              <span class="v-card-name">${v.name}</span>
              <span class="v-card-spec">${v.capacity} • ${v.volume}</span>
            </div>
          </button>
        `).join('');

        document.querySelectorAll('.v-card').forEach(btn => {
          btn.addEventListener('click', () => {
            selectedVehicleId = btn.dataset.vid;
            renderCalcVehicles();
            calculateTariff();
          });
        });
      }

      function computeQuote() {
        const origin = originSelect.value;
        const dest = destSelect.value;
        const km = getRouteDistance(origin, dest);
        const vehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[1];

        const baseAndDistance = Math.round(vehicle.basePrice + (origin === dest ? 0 : km * vehicle.perKm));
        const porterCost = porters * 15;
        const floor = Math.max(1, Math.min(25, parseInt(floorInput.value, 10) || 1));
        const hasElevator = elevatorToggle.checked;
        const floorCost = (!hasElevator && floor > 1 && porters > 0) ? (floor - 1) * 4 * porters : 0;

        let addonsCost = 0;
        if (chkPackaging.checked) addonsCost += 25;
        if (chkAssembly.checked) addonsCost += 30;

        const total = baseAndDistance + porterCost + floorCost + addonsCost;

        let eta = '~45 dəq';
        if (km > 1500) eta = '3-4 gün (TIR)';
        else if (km > 400) eta = '7-9 saat';
        else if (km > 100) eta = '3.5 - 5 saat';
        else if (km > 25) eta = '~1.5 saat';

        return { origin, dest, km, vehicle, baseAndDistance, porters, porterCost, floor, hasElevator, floorCost, addonsCost, total, eta };
      }

      function calculateTariff() {
        const q = computeQuote();
        floorValLabel.textContent = `${q.floor}-cü`;
        elevatorLbl.textContent = q.hasElevator ? 'Lift var' : 'Lift yoxdur';

        document.getElementById('pill-packaging').classList.toggle('active', chkPackaging.checked);
        document.getElementById('pill-assembly').classList.toggle('active', chkAssembly.checked);

        document.getElementById('route-telemetry-pill').textContent =
          `Məsafə: ~${q.km} km • ${q.origin === q.dest ? 'Şəhərdaxili' : 'Şəhərlərarası / Beynəlxalq'}`;

        document.getElementById('sum-eta').textContent = q.eta;
        document.getElementById('sum-route').textContent = `${q.origin} → ${q.dest}`;
        document.getElementById('sum-km').textContent = `${q.km} km`;
        document.getElementById('sum-vehicle').textContent = q.vehicle.name;
        document.getElementById('sum-base').textContent = `${q.baseAndDistance} AZN`;
        document.getElementById('sum-porters-num').textContent = q.porters;
        document.getElementById('sum-porters').textContent = `${q.porterCost} AZN`;
        document.getElementById('sum-floor').textContent = `${q.floorCost} AZN`;
        document.getElementById('sum-addons').textContent = `${q.addonsCost} AZN`;
        document.getElementById('sum-total').textContent = q.total;
      }

      document.getElementById('swap-cities-btn').addEventListener('click', () => {
        const tmp = originSelect.value;
        originSelect.value = destSelect.value;
        destSelect.value = tmp;
        calculateTariff();
      });

      document.getElementById('porter-dec').addEventListener('click', () => {
        if (porters > 0) {
          porters--;
          porterCountEl.textContent = porters;
          calculateTariff();
        }
      });

      document.getElementById('porter-inc').addEventListener('click', () => {
        if (porters < 10) {
          porters++;
          porterCountEl.textContent = porters;
          calculateTariff();
        }
      });

      [originSelect, destSelect, floorInput, elevatorToggle, chkPackaging, chkAssembly].forEach(el => {
        el.addEventListener('change', calculateTariff);
        el.addEventListener('input', calculateTariff);
      });

      renderCalcVehicles();
      calculateTariff();

      // 6. LIVE TELEMETRY & TRACKING ENGINE
      const telemetryOutput = document.getElementById('telemetry-output');
      const heroTrackInput = document.getElementById('hero-track-input');
      const portalTrackInput = document.getElementById('portal-track-input');

      function renderTelemetry(rawCode) {
        const code = (rawCode || '').trim().toUpperCase();
        heroTrackInput.value = code;
        portalTrackInput.value = code;
        const data = shipments[code];

        if (!data) {
          telemetryOutput.innerHTML = `
            <div style="text-align: center; padding: 2.5rem 1rem; border-radius: var(--radius-lg); background: var(--bg-surface-2);">
              <strong style="font-family: var(--font-mono); color: var(--danger); font-size: 1.1rem;">[404] "${code}" üzrə telemetriya tapılmadı</strong>
              <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.4rem;">
                Zəhmət olmasa kodu yoxlayın və ya aktiv nümunə kodlardan birinə klikləyin.
              </p>
            </div>
          `;
          return;
        }

        const timelineHtml = data.steps.map((s, idx) => `
          <div class="v-step ${s.done ? 'done' : ''} ${s.current ? 'current' : ''}">
            ${idx < data.steps.length - 1 ? '<div class="v-step-line"></div>' : ''}
            <div class="v-step-dot">${s.done ? '✓' : '•'}</div>
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.4rem;">
              <strong style="font-size: 0.92rem;">${s.title}</strong>
              <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--amber-bright);">${s.time}</span>
            </div>
            <p style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 0.15rem;">${s.desc}</p>
          </div>
        `).join('');

        telemetryOutput.innerHTML = `
          <div class="telemetry-dashboard">
            <div class="telemetry-main">
              <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.75rem;">
                <div>
                  <span style="font-family: var(--font-mono); font-size: 1.45rem; font-weight: 800;">${data.code}</span>
                  <p style="font-size: 0.88rem; color: var(--text-secondary); font-weight: 600;">${data.origin} → ${data.dest}</p>
                </div>
                <span class="eyebrow" style="margin-bottom: 0;">${data.status}</span>
              </div>

              <!-- Animated Route Progress Bar -->
              <div class="route-visual-bar">
                <div class="route-track-bg">
                  <div class="route-track-fill" style="width: ${data.progress}%;">
                    <div class="moving-truck-marker" title="Canlı GPS Mövqeyi">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    </div>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.74rem; color: var(--text-muted); margin-top: 0.65rem;">
                  <span>ÇIXIŞ MƏNTƏQƏSİ</span>
                  <span style="color: var(--emerald); font-weight: 700;">TAMAMLANMA: ${data.progress}%</span>
                  <span>TƏYİNAT</span>
                </div>
              </div>

              <!-- Live GPS Telemetry Sensors -->
              <div class="telemetry-sensors">
                <div class="sensor-box">
                  <span class="sensor-lbl">GPS Koordinatlar</span>
                  <span class="sensor-val">${data.coords}</span>
                </div>
                <div class="sensor-box">
                  <span class="sensor-lbl">Cari Sürət</span>
                  <span class="sensor-val" style="color: var(--cyan);">${data.speed}</span>
                </div>
                <div class="sensor-box">
                  <span class="sensor-lbl">Kuzov Temperaturu</span>
                  <span class="sensor-val" style="color: var(--emerald);">${data.temp}</span>
                </div>
              </div>

              <div class="v-timeline">${timelineHtml}</div>
            </div>

            <!-- Driver & Vehicle Telemetry Card -->
            <div class="driver-side-card">
              <div>
                <span class="sensor-lbl" style="margin-bottom: 0.85rem;">Təyin Edilmiş Ekipaj</span>
                <div class="driver-profile">
                  <div class="driver-avatar">${data.initials}</div>
                  <div>
                    <strong style="display: block; font-size: 1.05rem;">${data.driver}</strong>
                    <span style="font-size: 0.8rem; color: var(--emerald);">★ 4.98 • Sertifikatlı Sürücü</span>
                  </div>
                </div>

                <div style="margin-top: 1.35rem; padding: 1rem; border-radius: 12px; background: var(--bg-surface); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.85rem;">
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--text-muted);">Nəqliyyat / Nömrə:</span>
                    <strong style="font-family: var(--font-mono);">${data.vehicle}</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--text-muted);">Təxmini Çatma:</span>
                    <strong style="color: var(--amber-bright);">${data.eta}</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--text-muted);">Sığorta Statusu:</span>
                    <strong style="color: var(--emerald);">100% Aktiv</strong>
                  </div>
                </div>
              </div>

              <a href="tel:${data.phone.replace(/[^+\d]/g, '')}" class="btn-primary" style="width: 100%;">
                Sürücüyə Zəng Et (${data.phone})
              </a>
            </div>
          </div>
        `;
      }

      renderTelemetry('KV-9428-AZ');

      document.getElementById('hero-track-form').addEventListener('submit', e => {
        e.preventDefault();
        renderTelemetry(heroTrackInput.value);
        document.getElementById('izleme').scrollIntoView({ behavior: 'smooth' });
      });

      document.getElementById('portal-track-form').addEventListener('submit', e => {
        e.preventDefault();
        renderTelemetry(portalTrackInput.value);
      });

      function bindQuickTriggers() {
        document.querySelectorAll('.quick-track-trigger').forEach(btn => {
          btn.onclick = () => {
            renderTelemetry(btn.dataset.code);
            document.getElementById('izleme').scrollIntoView({ behavior: 'smooth' });
          };
        });
      }
      bindQuickTriggers();

      // 7. FILTERABLE FLEET SHOWCASE
      const fleetCardsGrid = document.getElementById('fleet-cards-grid');

      function renderFleetCards(filter = 'all') {
        const list = filter === 'all' ? vehicles : vehicles.filter(v => v.category === filter);
        fleetCardsGrid.innerHTML = list.map(v => `
          <article class="fleet-item">
            <div class="fleet-img-wrap">
              <img src="${v.img}" alt="${v.name}" onerror="this.src='https://placehold.co/600x360/0c1222/f59e0b?text=${encodeURIComponent(v.name)}'" />
              <span class="fleet-tag">${v.categoryLabel}</span>
            </div>
            <div class="fleet-body">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem;">
                  <h3 style="font-size: 1.15rem;">${v.name}</h3>
                  <span style="font-family: var(--font-mono); font-weight: 800; color: var(--amber-bright);">${v.basePrice} AZN-dən</span>
                </div>
                <p style="font-size: 0.84rem; color: var(--text-secondary); margin-top: 0.35rem;">${v.desc}</p>

                <div class="specs-box">
                  <div>
                    <span>Yük Tutumu</span>
                    <strong>${v.capacity}</strong>
                  </div>
                  <div>
                    <span>Daxili Həcm</span>
                    <strong>${v.volume}</strong>
                  </div>
                  <div class="specs-full">
                    <span>Kuzov Ölçüləri (U × E × H)</span>
                    <strong>${v.dimensions}</strong>
                  </div>
                </div>
              </div>

              <button type="button" class="select-fleet-btn" data-vid="${v.id}">
                Bu maşını seç →
              </button>
            </div>
          </article>
        `).join('');

        document.querySelectorAll('.select-fleet-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            selectedVehicleId = btn.dataset.vid;
            renderCalcVehicles();
            calculateTariff();
            document.getElementById('kalkulyator').scrollIntoView({ behavior: 'smooth' });
            showToast('Nəqliyyat vasitəsi kalkulyatorda aktivləşdirildi');
          });
        });
      }

      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderFleetCards(btn.dataset.filter);
        });
      });

      renderFleetCards('all');

      // 8. ORDER MODAL & INSTANT CODE GENERATOR
      const orderModal = document.getElementById('order-modal');
      const stepForm = document.getElementById('modal-step-form');
      const stepSuccess = document.getElementById('modal-step-success');
      let latestGeneratedCode = '';

      document.getElementById('open-order-modal').addEventListener('click', () => {
        const q = computeQuote();
        document.getElementById('m-route').textContent = `${q.origin} → ${q.dest} (${q.km} km)`;
        document.getElementById('m-details').textContent = `${q.vehicle.name} • ${q.porters} fəhlə`;
        document.getElementById('m-price').textContent = `${q.total} AZN`;

        stepForm.classList.remove('hidden');
        stepSuccess.classList.add('hidden');
        orderModal.classList.add('open');
      });

      function closeOrderModal() {
        orderModal.classList.remove('open');
      }

      document.getElementById('close-modal-x').addEventListener('click', closeOrderModal);
      orderModal.addEventListener('click', e => {
        if (e.target === orderModal) closeOrderModal();
      });

      document.getElementById('confirm-booking-form').addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('cust-name').value.trim();
        const phone = document.getElementById('cust-phone').value.trim();
        const q = computeQuote();

        const rnd = Math.floor(1000 + Math.random() * 9000);
        latestGeneratedCode = `KV-${rnd}-AZ`;

        const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'AZ';

        shipments[latestGeneratedCode] = {
          code: latestGeneratedCode,
          origin: q.origin,
          dest: q.dest,
          vehicle: `${q.vehicle.name} • Dispetçer Təyinatı`,
          driver: `Təyin olunur (${name})`,
          initials,
          phone,
          status: 'Yeni Sifariş • GPS Aktivləşdi',
          coords: '40.4093° N, 49.8671° E',
          speed: 'Hazırlıq mərhələsi',
          temp: '+19.0°C (Normal)',
          eta: q.eta,
          progress: 22,
          steps: [
            { time: 'İndicə', title: 'Onlayn sifariş təsdiqləndi', desc: `${name} (${phone}) — Yekun tarif: ${q.total} AZN`, done: true, current: true },
            { time: '+5 dəq', title: 'Ən yaxın nəqliyyatın təyini', desc: `${q.vehicle.name} və ${q.porters} işçi yönləndirilir`, done: false },
            { time: 'Yükləmə', title: '100% sığorta və canlı GPS marşrut', desc: `${q.origin} → ${q.dest} (${q.km} km)`, done: false }
          ]
        };

        const samplesBar = document.getElementById('tracking-samples-bar');
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip-btn quick-track-trigger';
        chip.dataset.code = latestGeneratedCode;
        chip.textContent = `${latestGeneratedCode} (Sizin Sifariş)`;
        samplesBar.appendChild(chip);
        bindQuickTriggers();

        document.getElementById('generated-code-label').textContent = latestGeneratedCode;
        stepForm.classList.add('hidden');
        stepSuccess.classList.remove('hidden');
        showToast(`Sifariş rəsmiləşdi! Kod: ${latestGeneratedCode}`);
      });

      document.getElementById('copy-and-track-btn').addEventListener('click', () => {
        const tempInput = document.createElement('input');
        tempInput.value = latestGeneratedCode;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        closeOrderModal();
        renderTelemetry(latestGeneratedCode);
        document.getElementById('izleme').scrollIntoView({ behavior: 'smooth' });
        showToast(`${latestGeneratedCode} kopyalandı və radarda açıldı!`);
      });

      // 9. FAQ ACCORDION & CALLBACK FORM
      document.querySelectorAll('.faq-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
          const card = btn.closest('.faq-card');
          const isOpen = card.classList.contains('open');
          document.querySelectorAll('.faq-card').forEach(c => c.classList.remove('open'));
          if (!isOpen) card.classList.add('open');
        });
      });

      document.getElementById('callback-form').addEventListener('submit', e => {
        e.preventDefault();
        const input = document.getElementById('callback-input');
        if (input.value.trim()) {
          showToast('Müraciətiniz qəbul edildi! Operatorumuz 5 dəqiqə ərzində zəng edəcək.');
          input.value = '';
        }
      });

      // 10. INTERSECTION OBSERVER FOR SCROLL REVEALS
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    });
