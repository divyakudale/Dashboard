
"use strict";

/*
  3M CAR CARE STUDIO - DEMO DASHBOARD

  IMPORTANT:
  The records below are fictional examples.
  Replace them with real Google Sheets data when
  the secure connection is configured.
*/

const DEMO_MODE = true;

const records = [
  {date:"2025-10-03",customer:"Customer A",vehicle:"Hyundai Creta",treatment:"PPF",amount:85000,status:"Paid"},
  {date:"2025-10-08",customer:"Customer B",vehicle:"Mahindra XUV700",treatment:"Graphene",amount:18000,status:"Paid"},
  {date:"2025-10-12",customer:"Customer C",vehicle:"Kia Seltos",treatment:"Ceramic",amount:22000,status:"Paid"},
  {date:"2025-10-18",customer:"Customer D",vehicle:"Honda City",treatment:"Interior Premium",amount:6500,status:"Pending"},
  {date:"2025-11-04",customer:"Customer E",vehicle:"Toyota Fortuner",treatment:"PPF",amount:110000,status:"Paid"},
  {date:"2025-11-09",customer:"Customer F",vehicle:"Tata Nexon",treatment:"Graphene",amount:16000,status:"Paid"},
  {date:"2025-11-16",customer:"Customer G",vehicle:"Maruti Baleno",treatment:"Ceramic",amount:19000,status:"Paid"},
  {date:"2025-11-23",customer:"Customer H",vehicle:"Hyundai i20",treatment:"Sunfilm CR70",amount:12000,status:"Pending"},
  {date:"2025-12-02",customer:"Customer I",vehicle:"BMW X1",treatment:"PPF",amount:125000,status:"Paid"},
  {date:"2025-12-07",customer:"Customer J",vehicle:"Kia Sonet",treatment:"Graphene",amount:21000,status:"Paid"},
  {date:"2025-12-15",customer:"Customer K",vehicle:"Honda Elevate",treatment:"Ceramic",amount:24000,status:"Paid"},
  {date:"2025-12-22",customer:"Customer L",vehicle:"Tata Harrier",treatment:"Interior Premium",amount:8000,status:"Paid"},
  {date:"2026-01-05",customer:"Customer M",vehicle:"Mahindra Scorpio",treatment:"PPF",amount:95000,status:"Paid"},
  {date:"2026-01-11",customer:"Customer N",vehicle:"Hyundai Verna",treatment:"Graphene",amount:17500,status:"Paid"},
  {date:"2026-01-19",customer:"Customer O",vehicle:"Kia Carens",treatment:"Ceramic",amount:21000,status:"Pending"},
  {date:"2026-02-03",customer:"Customer P",vehicle:"Toyota Innova",treatment:"PPF",amount:105000,status:"Paid"},
  {date:"2026-02-10",customer:"Customer Q",vehicle:"Maruti Swift",treatment:"Graphene",amount:15000,status:"Paid"},
  {date:"2026-02-21",customer:"Customer R",vehicle:"Honda Amaze",treatment:"Sunfilm CR70",amount:13000,status:"Paid"},
  {date:"2026-03-02",customer:"Customer S",vehicle:"BMW 3 Series",treatment:"PPF",amount:135000,status:"Paid"},
  {date:"2026-03-12",customer:"Customer T",vehicle:"Hyundai Creta",treatment:"Ceramic",amount:25000,status:"Paid"},
  {date:"2026-03-20",customer:"Customer U",vehicle:"Tata Nexon",treatment:"Graphene",amount:19000,status:"Paid"},
  {date:"2026-04-04",customer:"Customer V",vehicle:"Mahindra XUV700",treatment:"PPF",amount:115000,status:"Paid"},
  {date:"2026-04-14",customer:"Customer W",vehicle:"Kia Seltos",treatment:"Ceramic",amount:23000,status:"Paid"},
  {date:"2026-04-24",customer:"Customer X",vehicle:"Honda City",treatment:"Interior Premium",amount:7000,status:"Paid"},
  {date:"2026-05-03",customer:"Customer Y",vehicle:"Mercedes GLA",treatment:"PPF",amount:145000,status:"Paid"},
  {date:"2026-05-11",customer:"Customer Z",vehicle:"Toyota Fortuner",treatment:"Graphene",amount:22000,status:"Paid"},
  {date:"2026-05-19",customer:"Customer AA",vehicle:"Hyundai i20",treatment:"Ceramic",amount:18000,status:"Pending"},
  {date:"2026-06-06",customer:"Customer AB",vehicle:"Kia Carnival",treatment:"PPF",amount:155000,status:"Paid"},
  {date:"2026-06-14",customer:"Customer AC",vehicle:"Tata Harrier",treatment:"Graphene",amount:20000,status:"Paid"},
  {date:"2026-06-25",customer:"Customer AD",vehicle:"Maruti Baleno",treatment:"Sunfilm CR70",amount:14000,status:"Paid"},
  {date:"2026-07-02",customer:"Customer AE",vehicle:"BMW X5",treatment:"PPF",amount:165000,status:"Paid"},
  {date:"2026-07-10",customer:"Customer AF",vehicle:"Hyundai Verna",treatment:"Graphene",amount:24000,status:"Paid"},
  {date:"2026-07-20",customer:"Customer AG",vehicle:"Honda Elevate",treatment:"Ceramic",amount:26000,status:"Paid"},
  {date:"2026-08-04",customer:"Customer AH",vehicle:"Toyota Fortuner",treatment:"PPF",amount:150000,status:"Paid"},
  {date:"2026-08-13",customer:"Customer AI",vehicle:"Mahindra Scorpio",treatment:"Graphene",amount:23000,status:"Paid"},
  {date:"2026-08-22",customer:"Customer AJ",vehicle:"Kia Sonet",treatment:"Ceramic",amount:20000,status:"Pending"},
  {date:"2026-09-03",customer:"Customer AK",vehicle:"Mahindra XUV700",treatment:"PPF",amount:140000,status:"Paid"},
  {date:"2026-09-08",customer:"Customer AL",vehicle:"Hyundai Creta",treatment:"Graphene",amount:22000,status:"Paid"},
  {date:"2026-09-14",customer:"Customer AM",vehicle:"Kia Seltos",treatment:"Ceramic",amount:24000,status:"Paid"},
  {date:"2026-09-19",customer:"Customer AN",vehicle:"Honda City",treatment:"Interior Premium",amount:7500,status:"Paid"},
  {date:"2026-09-26",customer:"Customer AO",vehicle:"Tata Nexon",treatment:"Sunfilm CR70",amount:13500,status:"Pending"},
  {date:"2026-10-02",customer:"Customer AP",vehicle:"BMW X3",treatment:"PPF",amount:125000,status:"Paid"},
  {date:"2026-10-05",customer:"Customer AQ",vehicle:"Kia Seltos",treatment:"Graphene",amount:21000,status:"Paid"},
  {date:"2026-10-08",customer:"Customer AR",vehicle:"Honda City",treatment:"Ceramic",amount:22500,status:"Paid"},
  {date:"2026-10-11",customer:"Customer AS",vehicle:"Tata Nexon",treatment:"Interior Premium",amount:6800,status:"Pending"}
];

const $ = id => document.getElementById(id);

let salesChart = null;
let treatmentChart = null;
let filteredRecords = [];
let toastTimer;

const money = value =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);

const number = value =>
  new Intl.NumberFormat("en-IN").format(value);

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function formatDate(value) {
  const date = new Date(value + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function monthLabel(key) {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1)
    .toLocaleDateString("en-IN", {
      month: "short",
      year: "2-digit"
    });
}

function monthKey(date) {
  return date.slice(0, 7);
}

function sumAmount(list) {
  return list.reduce((total, item) => total + Number(item.amount || 0), 0);
}

function getDateRange() {
  return {
    from: $("fromDate").value,
    to: $("toDate").value
  };
}

function getDateFilteredRecords() {
  const {from, to} = getDateRange();

  if (from && to && from > to) {
    return null;
  }

  return records.filter(item =>
    (!from || item.date >= from) &&
    (!to || item.date <= to)
  );
}

function getMonthlyTotals(list) {
  const totals = {};

  list.forEach(item => {
    const key = monthKey(item.date);
    totals[key] = (totals[key] || 0) + Number(item.amount || 0);
  });

  return Object.entries(totals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, revenue]) => ({
      key,
      label: monthLabel(key),
      revenue
    }));
}

function getTreatmentTotals(list) {
  const totals = {};

  list.forEach(item => {
    if (!totals[item.treatment]) {
      totals[item.treatment] = {
        treatment: item.treatment,
        jobs: 0,
        revenue: 0
      };
    }

    totals[item.treatment].jobs++;
    totals[item.treatment].revenue += Number(item.amount || 0);
  });

  return Object.values(totals)
    .sort((a, b) => b.revenue - a.revenue);
}

function updateKPIs(list) {
  const revenue = sumAmount(list);
  const treatmentTotals = getTreatmentTotals(list);
  const top = treatmentTotals[0];

  $("totalRevenue").textContent = money(revenue);
  $("totalJobs").textContent = number(list.length);
  $("averageBill").textContent =
    money(list.length ? revenue / list.length : 0);

  $("topTreatment").textContent = top ? top.treatment : "—";
  $("revenueCaption").textContent =
    list.length + " demo records in selected period";
}

function renderSalesChart(list) {
  if (typeof Chart === "undefined") {
    showToast("Chart.js could not load. Check your internet connection.");
    return;
  }

  const monthly = getMonthlyTotals(list);
  const chartType = $("salesChartType").value;

  if (salesChart) salesChart.destroy();

  salesChart = new Chart($("salesChart"), {
    type: chartType,
    data: {
      labels: monthly.map(item => item.label),
      datasets: [{
        label: "Revenue",
        data: monthly.map(item => item.revenue),
        backgroundColor: chartType === "bar"
          ? "rgba(229, 57, 69, 0.78)"
          : "rgba(229, 57, 69, 0.12)",
        borderColor: "#e53945",
        borderWidth: 2,
        borderRadius: chartType === "bar" ? 5 : 0,
        fill: chartType === "line",
        tension: 0.35,
        pointRadius: chartType === "line" ? 3 : 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {intersect: false, mode: "index"},
      plugins: {
        legend: {display: false},
        tooltip: {
          callbacks: {
            label: context => "Revenue: " + money(context.parsed.y)
          }
        }
      },
      scales: {
        x: {
          grid: {display: false},
          ticks: {color: "#a2a3ae", maxRotation: 45}
        },
        y: {
          beginAtZero: true,
          grid: {color: "rgba(255,255,255,0.07)"},
          ticks: {
            color: "#a2a3ae",
            callback: value => {
              if (value >= 100000) {
                return "₹" + (value / 100000).toFixed(1) + "L";
              }
              if (value >= 1000) {
                return "₹" + (value / 1000).toFixed(0) + "K";
              }
              return "₹" + value;
            }
          }
        }
      }
    }
  });
}

function renderTreatmentChart(list) {
  if (typeof Chart === "undefined") return;

  const totals = getTreatmentTotals(list);
  const colors = [
    "#e53945", "#568df5", "#a58bf5",
    "#4bc59a", "#edb653", "#43c1ce",
    "#eb7db2", "#8f99a9"
  ];

  if (treatmentChart) treatmentChart.destroy();

  treatmentChart = new Chart($("treatmentChart"), {
    type: "doughnut",
    data: {
      labels: totals.map(item => item.treatment),
      datasets: [{
        data: totals.map(item => item.revenue),
        backgroundColor: totals.map((_, i) => colors[i % colors.length]),
        borderColor: "#1a1b20",
        borderWidth: 3,
        hoverOffset: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "67%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#c2c3cc",
            padding: 14,
            usePointStyle: true,
            pointStyle: "circle",
            font: {size: 10}
          }
        },
        tooltip: {
          callbacks: {
            label: context =>
              context.label + ": " + money(context.raw)
          }
        }
      }
    }
  });
}

function renderTreatmentTable(list) {
  const totals = getTreatmentTotals(list);
  const totalRevenue = sumAmount(list);

  $("treatmentTable").innerHTML = totals.map(item => {
    const share = totalRevenue
      ? item.revenue / totalRevenue * 100
      : 0;

    return `
      <tr>
        <td class="treatment-name">${escapeHTML(item.treatment)}</td>
        <td>${number(item.jobs)}</td>
        <td class="amount">${money(item.revenue)}</td>
        <td>${money(item.jobs ? item.revenue / item.jobs : 0)}</td>
        <td class="share-cell">
          <div class="progress-track">
            <div class="progress-fill" style="width:${share.toFixed(2)}%"></div>
          </div>
          <span class="progress-label">${share.toFixed(1)}%</span>
        </td>
      </tr>`;
  }).join("");

  if (!totals.length) {
    $("treatmentTable").innerHTML =
      '<tr><td colspan="5">No records for this period.</td></tr>';
  }
}

function populateTreatmentFilter() {
  const select = $("treatmentFilter");
  const previous = select.value;
  const names = [...new Set(records.map(item => item.treatment))]
    .sort();

  select.innerHTML =
    '<option value="">All Treatments</option>' +
    names.map(name =>
      `<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`
    ).join("");

  if (names.includes(previous)) select.value = previous;
}

function getVisibleRecords() {
  const dateRecords = getDateFilteredRecords();
  if (dateRecords === null) return null;

  const search = $("searchInput").value.trim().toLowerCase();
  const treatment = $("treatmentFilter").value;

  let list = dateRecords.filter(item => {
    const searchable = [
      item.customer,
      item.vehicle,
      item.treatment,
      item.status,
      item.date
    ].join(" ").toLowerCase();

    return (!search || searchable.includes(search)) &&
      (!treatment || item.treatment === treatment);
  });

  const sort = $("sortFilter").value;

  if (sort === "newest") {
    list.sort((a, b) => b.date.localeCompare(a.date));
  } else if (sort === "oldest") {
    list.sort((a, b) => a.date.localeCompare(b.date));
  } else if (sort === "high") {
    list.sort((a, b) => b.amount - a.amount);
  } else if (sort === "low") {
    list.sort((a, b) => a.amount - b.amount);
  }

  return list;
}

function renderRecords(list) {
  filteredRecords = list;

  $("recordCount").textContent =
    number(list.length) + " records found";

  $("recordsTable").innerHTML = list.map(item => `
    <tr>
      <td>${formatDate(item.date)}</td>
      <td>${escapeHTML(item.customer)}</td>
      <td>${escapeHTML(item.vehicle)}</td>
      <td class="treatment-name">${escapeHTML(item.treatment)}</td>
      <td class="amount">${money(item.amount)}</td>
      <td>
        <span class="status-pill ${item.status === "Paid" ? "paid" : "pending"}">
          ${escapeHTML(item.status)}
        </span>
      </td>
    </tr>
  `).join("");

  $("emptyState").hidden = list.length !== 0;
}

function updateDashboard() {
  const list = getDateFilteredRecords();

  if (list === null) {
    showToast("The start date must be before the end date.");
    return;
  }

  updateKPIs(list);
  renderSalesChart(list);
  renderTreatmentChart(list);
  renderTreatmentTable(list);
  renderRecords(getVisibleRecords());
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function exportCSV(list, filename) {
  if (!list.length) {
    showToast("There are no records to export.");
    return;
  }

  const headers = [
    "Date", "Customer", "Vehicle",
    "Treatment", "Amount", "Status"
  ];

  const rows = list.map(item => [
    item.date,
    item.customer,
    item.vehicle,
    item.treatment,
    item.amount,
    item.status
  ]);

  // Escape CSV fields and guard against spreadsheet formula injection.
  function csvCell(value) {
    let text = String(value ?? "");

    if (/^[\s]*[=+\-@]/.test(text)) {
      text = "'" + text;
    }

    return '"' + text.replace(/"/g, '""') + '"';
  }

  const csv = [headers, ...rows]
    .map(row => row.map(csvCell).join(","))
    .join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  showToast("CSV report downloaded.");
}

function parseMonth(text) {
  const match = text.match(
    /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s*(\d{2}|\d{4})\b/i
  );

  if (!match) return null;

  const months = [
    "january", "february", "march", "april",
    "may", "june", "july", "august",
    "september", "october", "november", "december"
  ];

  let year = Number(match[2]);
  if (year < 100) year += 2000;

  return {
    key: year + "-" + String(months.indexOf(match[1].toLowerCase()) + 1).padStart(2, "0"),
    label: match[1][0].toUpperCase() + match[1].slice(1) + " " + year
  };
}

function answerQuestion(question) {
  const q = question.toLowerCase().trim();
  const dateRecords = getDateFilteredRecords();

  if (dateRecords === null) {
    return {title: "Invalid date range", lines: ["Correct the date filters first."]};
  }

  const treatmentNames = [...new Set(records.map(item => item.treatment))];
  const requestedTreatment = treatmentNames.find(name =>
    q.includes(name.toLowerCase())
  );

  // Specific month and year: e.g. "PPF in September 2026".
  const month = parseMonth(q);

  if (month && (requestedTreatment || /\b(show|list|entries|records|jobs|all)\b/.test(q))) {
    const list = records.filter(item =>
      monthKey(item.date) === month.key &&
      (!requestedTreatment || item.treatment === requestedTreatment)
    );

    return {
      title: `${requestedTreatment || "All treatments"} — ${month.label}`,
      lines: [
        `${list.length} matching demo records.`,
        `Total billed amount: ${money(sumAmount(list))}.`,
        ...list.slice(0, 15).map(item =>
          `${item.date} · ${item.customer} · ${item.vehicle} · ${item.treatment} · ${money(item.amount)}`
        ),
        ...(list.length > 15 ? ["Showing the first 15 records. Use the table to see all matching records."] : [])
      ],
      records: list
    };
  }

  if (q.includes("compare")) {
    const monthMatches = [...q.matchAll(
      /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s*(\d{2}|\d{4})\b/gi
    )];

    if (monthMatches.length >= 2) {
      const a = parseMonth(monthMatches[0][0]);
      const b = parseMonth(monthMatches[1][0]);

      const totalA = sumAmount(records.filter(item => monthKey(item.date) === a.key));
      const totalB = sumAmount(records.filter(item => monthKey(item.date) === b.key));
      const difference = totalB - totalA;
      const change = totalA ? difference / totalA * 100 : null;

      return {
        title: "Monthly Sales Comparison",
        lines: [
          `${a.label}: ${money(totalA)}.`,
          `${b.label}: ${money(totalB)}.`,
          `Difference: ${difference >= 0 ? "+" : "−"}${money(Math.abs(difference))}.`,
          `Change: ${change === null ? "Not available because the first month has no revenue." : (change >= 0 ? "+" : "") + change.toFixed(1) + "%"} .`,
          "Comparison uses demo records for the full months."
        ]
      };
    }

    return {
      title: "Monthly comparison",
      lines: ["Include both months and years, for example: Compare October 2025 with October 2026."]
    };
  }

  if (requestedTreatment && /\b(show|list|entries|records|jobs|all)\b/.test(q)) {
    const list = dateRecords.filter(item =>
      item.treatment === requestedTreatment
    );

    return {
      title: requestedTreatment + " records",
      lines: [
        `${list.length} records within the selected date range.`,
        `Revenue: ${money(sumAmount(list))}.`,
        ...list.slice(0, 15).map(item =>
          `${item.date} · ${item.customer} · ${item.vehicle} · ${money(item.amount)}`
        )
      ],
      records: list
    };
  }

  if (/highest|top|best/.test(q) && /treatment|revenue|sales|earning/.test(q)) {
    const totals = getTreatmentTotals(dateRecords);
    const top = totals[0];

    return {
      title: "Highest-revenue treatment",
      lines: top
        ? [
            `${top.treatment} generated the highest demo revenue.`,
            `Revenue: ${money(top.revenue)}.`,
            `Jobs: ${top.jobs}.`,
            `Average bill: ${money(top.revenue / top.jobs)}.`
          ]
        : ["No records exist in the selected date range."]
    };
  }

  if (/total sales|total revenue|revenue|sales/.test(q)) {
    return {
      title: "Sales summary",
      lines: [
        `Total revenue: ${money(sumAmount(dateRecords))}.`,
        `Job records: ${dateRecords.length}.`,
        `Average bill: ${money(dateRecords.length ? sumAmount(dateRecords) / dateRecords.length : 0)}.`,
        "These figures use the selected date range and demo records."
      ]
    };
  }

  if (/average bill|average amount/.test(q)) {
    return {
      title: "Average bill value",
      lines: [
        money(dateRecords.length ? sumAmount(dateRecords) / dateRecords.length : 0),
        `Calculated across ${dateRecords.length} demo records in the selected period.`
      ]
    };
  }

  if (/this year|yearly|annual/.test(q)) {
    const yearMatch = q.match(/\b(20\d{2})\b/);
    const year = yearMatch ? yearMatch[1] : String(new Date().getFullYear());

    const list = records.filter(item => item.date.startsWith(year));

    return {
      title: `Sales in ${year}`,
      lines: [
        `Revenue: ${money(sumAmount(list))}.`,
        `Job records: ${list.length}.`,
        "This result uses the full calendar year of demo records."
      ]
    };
  }

  if (/pending|unpaid/.test(q)) {
    const list = dateRecords.filter(item => item.status === "Pending");

    return {
      title: "Pending demo bills",
      lines: [
        `${list.length} pending records.`,
        `Total amount marked pending: ${money(sumAmount(list))}.`,
        ...list.slice(0, 15).map(item =>
          `${item.date} · ${item.customer} · ${money(item.amount)}`
        )
      ]
    };
  }

  if (/monthly|month-wise|month wise/.test(q)) {
    return {
      title: "Monthly revenue",
      lines: getMonthlyTotals(dateRecords).map(item =>
        `${item.label}: ${money(item.revenue)}`
      )
    };
  }

  if (/help|what can you|examples/.test(q)) {
    return {
      title: "Questions you can ask",
      lines: [
        "Which treatment generated the highest revenue?",
        "Show all PPF entries in September 2026.",
        "Compare October 2025 with October 2026.",
        "Show total sales this year.",
        "Show pending bills.",
        "Show monthly revenue."
      ]
    };
  }

  return {
    title: "I couldn't identify that question",
    lines: [
      "Try asking about sales, revenue, a treatment, a month and year, or pending bills.",
      "This first version uses JavaScript rules, not an AI model. Flexible AI questions can be added later through a secure API integration."
    ]
  };
}

function showAnswer(result) {
  const box = $("answerBox");
  const title = document.createElement("h4");
  title.textContent = result.title;

  const content = document.createElement("div");

  result.lines.forEach(line => {
    const p = document.createElement("p");
    p.textContent = line;
    content.appendChild(p);
  });

  box.replaceChildren(title, content);
  box.classList.add("visible");

  if (result.records) {
    $("searchInput").value = "";
    $("treatmentFilter").value = result.records.length &&
      result.records.every(item => item.treatment === result.records[0].treatment)
      ? result.records[0].treatment
      : "";

    const dates = result.records.map(item => item.date).sort();

    if (dates.length) {
      $("fromDate").value = dates[0];
      $("toDate").value = dates[dates.length - 1];
      updateDashboard();
    }

    $("records").scrollIntoView({behavior: "smooth"});
  }
}

function setupNavigation() {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-link").forEach(item =>
        item.classList.remove("active")
      );

      link.classList.add("active");
      $("pageTitle").textContent = {
        overview: "Business Overview",
        analytics: "Sales Analytics",
        treatments: "Treatment Reports",
        records: "All Records",
        assistant: "Ask Your Data"
      }[link.dataset.section] || "Business Overview";

      $("sidebar").classList.remove("open");
    });
  });

  $("menuToggle").addEventListener("click", () =>
    $("sidebar").classList.add("open")
  );

  $("closeSidebar").addEventListener("click", () =>
    $("sidebar").classList.remove("open")
  );

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      $("sidebar").classList.remove("open");
    }
  });
}

function initializeDashboard() {
  if (!DEMO_MODE) return;

  populateTreatmentFilter();
  setupNavigation();
  updateDashboard();

  $("applyFilters").addEventListener("click", updateDashboard);

  $("refreshBtn").addEventListener("click", () => {
    updateDashboard();
    showToast("Demo dashboard refreshed.");
  });

  $("salesChartType").addEventListener("change", () => {
    renderSalesChart(getDateFilteredRecords() || []);
  });

  $("searchInput").addEventListener("input", () => {
    renderRecords(getVisibleRecords() || []);
  });

  $("treatmentFilter").addEventListener("change", () => {
    renderRecords(getVisibleRecords() || []);
  });

  $("sortFilter").addEventListener("change", () => {
    renderRecords(getVisibleRecords() || []);
  });

  $("exportBtn").addEventListener("click", () =>
    exportCSV(filteredRecords, "3M-treatment-records.csv")
  );

  $("treatmentExport").addEventListener("click", () => {
    const list = getDateFilteredRecords();
    if (list !== null) {
      const totals = getTreatmentTotals(list);
      const exportRows = totals.map(item => ({
        date: "",
        customer: "",
        vehicle: "",
        treatment: item.treatment,
        amount: item.revenue,
        status: `Jobs: ${item.jobs}; Average bill: ${Math.round(item.revenue / item.jobs)}`
      }));

      exportCSV(exportRows, "3M-treatment-summary.csv");
    }
  });

  $("questionForm").addEventListener("submit", event => {
    event.preventDefault();

    const question = $("questionInput").value.trim();
    if (!question) return;

    showAnswer(answerQuestion(question));
  });

  document.querySelectorAll(".suggestion").forEach(button => {
    button.addEventListener("click", () => {
      $("questionInput").value = button.dataset.question;
      showAnswer(answerQuestion(button.dataset.question));
    });
  });
}

document.addEventListener("DOMContentLoaded", initializeDashboard);
