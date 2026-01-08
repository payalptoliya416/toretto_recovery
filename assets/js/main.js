jQuery(document).ready(function ($) {

  /* HERO SLIDER */
  $('.hero-slider').owlCarousel({
      loop: true,
      items: 1,           // 🔥 hero hamesha single
      margin: 0,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      navText: [
        '<i class="fa-solid fa-long-arrow-left"></i>',
        '<i class="fa-solid fa-long-arrow-right"></i>'
      ]
  });

  /* TESTIMONIAL SLIDER */
  $('.testimonial-wrapper').owlCarousel({
      loop: true,
      items: 2,
      margin: 30,
      stagePadding: 120,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      smartSpeed: 700,
      responsive: {
          0: { items: 1, stagePadding: 0 },
          768: { items: 2, stagePadding: 100 },
          1200:{ items: 2, stagePadding: 150 }
      }
  });

});


$(document).ready(function () {

    const $scrollTop = $('#scroll-top');

    $(window).on('scroll', function () {
        const scroll = $(this).scrollTop();

        // Show / Hide Scroll To Top Button
        if (scroll > 100) {
            $scrollTop.addClass('active');
        } else {
            $scrollTop.removeClass('active');
        }
    });

    // Scroll To Top Click
    $scrollTop.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

});


$('.hero-slider').on('changed.owl.carousel', function () {
  new WOW().init();
});



// sticky header 
 $("#scroll-top").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 1500);
        return false;
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $(".navbar").addClass("fixed-top");
        } else {
            $(".navbar").removeClass("fixed-top");
        }
    });

    // booking page css 
   
document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});


// map script

let map = L.map('map').setView([52.52, 13.405], 12); // Berlin default
let pickupMarker, dropMarker, routeLine;

// Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Click to set pickup & drop
let clickCount = 0;

map.on('click', function (e) {
    clickCount++;

    if (clickCount === 1) {
        if (pickupMarker) map.removeLayer(pickupMarker);
        pickupMarker = L.marker(e.latlng).addTo(map).bindPopup("Pickup Location").openPopup();
    } else if (clickCount === 2) {
        if (dropMarker) map.removeLayer(dropMarker);
        dropMarker = L.marker(e.latlng).addTo(map).bindPopup("Drop Location").openPopup();

        drawRoute();
        clickCount = 0;
    }
});

// Draw route + calculate distance
function drawRoute() {
    if (routeLine) map.removeLayer(routeLine);

    const latlngs = [
        pickupMarker.getLatLng(),
        dropMarker.getLatLng()
    ];

    routeLine = L.polyline(latlngs, {
        color: 'red',
        weight: 4
    }).addTo(map);

    map.fitBounds(routeLine.getBounds());

    calculateDistance(latlngs[0], latlngs[1]);
}

// Distance + price
function calculateDistance(p1, p2) {
    const distanceKm = p1.distanceTo(p2) / 1000;
    document.getElementById('distance').innerText = distanceKm.toFixed(2) + " km";

    // Pricing logic (₹50 base + ₹12 per km)
    const price = 50 + (distanceKm * 12);
    document.getElementById('price').innerText = price.toFixed(0);
}

