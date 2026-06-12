/**
 * ============================================================
 *  YOUR CV DATA — edit only this file to update everything
 * ============================================================
 *  The website and the downloadable PDF both read from here.
 *  Save the file, refresh the browser — done.
 * ============================================================
 */

const DATA = {

  // ── Personal ────────────────────────────────────────────
  name:         "Al-Amin Hossain",
  title:        "Design Verification Engineer",
  tagline:      "Design Verification Engineer with 2+ years of industry experience in UVM-based IP verification. Strong expertise in SystemVerilog, UVM, coverage-driven verification, and Python automation. Currently pursuing an M.Sc. in Nanoelectronic Systems at TU Dresden.",
  address:      "Wundtstr. 7, 01217 Dresden, Germany",
  phone:        "+49 15510110425",
  email:        "alaminhossain01615@gmail.com",
  linkedin:     "https://www.linkedin.com/in/alaminhossain01615/",
  github:       "https://github.com/alaminhossain01615",
  website:      "https://alaminhossain01615.github.io",

  // Shown in the availability badge on the website
  availability: "Immediate · Flexible · On-site / Hybrid / Remote",

  // Shown in CV footer / languages section
  languages: [
    { lang: "English", level: "Fluent" },
    { lang: "Bengali", level: "Native" },
    { lang: "German",  level: "A1 – progressing to A2" }
  ],

  workAuth: "German student visa · 20 hrs/week",


  // ── About paragraphs (website only) ─────────────────────
  about: [
    "Design Verification Engineer with 2+ years of industry experience building UVM-based verification environments for complex IP blocks — timers, bus protocols, and communication interfaces. Currently working as a Working Student in Digital Functional Verification at Infineon Technologies AG, Dresden.",
    "Pursuing an M.Sc. in Nanoelectronic Systems at TU Dresden, with focus on hardware modelling, neural network accelerators, and memristive systems.",
    "I combine rigorous verification discipline from industry with a research mindset in AI hardware — positioned at the intersection of traditional RTL verification and next-generation accelerator design."
  ],


  // ── Research interests (chips on the website) ───────────
  interests: [
    "Hardware Verification",
    "Neuromorphic Hardware",
    "AI Accelerators",
    "Formal Verification",
    "UVM / SystemVerilog",
    "Coverage-Driven Verification"
  ],


  // ── Work experience ─────────────────────────────────────
  experience: [
    {
      title:    "Working Student – Digital Functional Verification",
      company:  "Infineon Technologies AG",
      location: "Dresden, Germany",
      type:     "Working Student",
      period:   "Apr 2026 – Present",
      bullets: []
    },
    {
      title:    "Assistant Engineer – RTL Design Verification",
      company:  "Ulkasemi Pvt. Ltd.",
      location: "Bangladesh",
      type:     "Full-time",
      period:   "Nov 2022 – Nov 2024",
      bullets: [
        "Developed and maintained 5+ UVM verification environments for IPs including AHB-UART, GPTM, I2C, and AMBA interfaces.",
        "Built Python-based regression and coverage automation, reducing manual effort by 80%.",
        "Implemented UVM RAL models for 100+ registers with callbacks and backdoor access.",
        "Achieved full code and maximum functional coverage via structured test planning.",
        "Conducted 50+ debug sessions with RTL teams using waveform analysis."
      ]
    },
    {
      title:    "Intern – Spectrum & Technical Regulation",
      company:  "Robi Axiata Ltd.",
      location: "Bangladesh",
      type:     "Internship",
      period:   "May 2022 – Aug 2022",
      bullets: [
        "Supported spectrum analysis and interference mitigation.",
        "Reviewed regulatory compliance reports."
      ]
    }
  ],


  // ── Skills ──────────────────────────────────────────────
  skills: [
    { cat: "Verification & HDL",        items: "SystemVerilog (UVM), Verilog, SystemVerilog Assertions (SVA), Coverage-Driven Verification, Constrained Random Testing, UVM RAL" },
    { cat: "Protocols",                 items: "AMBA (AHB, APB), UART, I2C" },
    { cat: "EDA Tools",                 items: "Cadence (IUS/Xcelium, SimVision, IMC), ModelSim, DSim" },
    { cat: "Automation & Development",  items: "Python, Bash, Git (GitHub/GitLab), Linux/Unix, VS Code, Vim" }
  ],


  // ── Projects ────────────────────────────────────────────
  projects: [
    {
      name:   "UVM Verification of General-Purpose Timer (GPTM)",
      period: "Dec 2023 – Mar 2024",
      type:   "Verification",
      bullets: [
        "Designed a complete UVM testbench including driver, monitor, sequencer, and scoreboard for a multi-mode timer IP supporting periodic, one-shot, and PWM operating modes.",
        "Implemented UVM RAL model for all timer control and status registers, with register callbacks for reset validation and mirror/desired value cross-checking.",
        "Developed 45+ directed and constrained-random sequences targeting corner cases including timer overflow, interrupt masking, and prescaler boundary conditions.",
        "Wrote SVA checkers to formally verify interrupt generation, counter overflow behaviour, and reload accuracy across all operating modes."
      ],
      tags:   ["UVM", "SystemVerilog", "RAL", "SVA"]
    },
    {
      name:   "AHB-UART Verification",
      period: "Jul 2023 – Dec 2023",
      type:   "Verification",
      bullets: [
        "Architected a 3-agent UVM environment (AHB master, UART, DMA) to verify an IP where the UART is fully configured via AHB — register writes and FIFO data transfers are performed exclusively over the AHB protocol.",
        "Developed custom UVM RAL register callbacks for 10+ interrupt fields, implementing automatic mirroring between raw and masked status registers and tracking FIFO fill-level state.",
        "Built constrained-random AHB burst sequences covering back-to-back FIFO writes, read-after-write register checks, and interrupt clear/set cycles.",
        "Verified protocol-level compliance of AHB transactions against the AMBA specification using SVA-based protocol checkers."
      ],
      tags:   ["AMBA AHB", "UART", "UVM", "RAL", "SVA"]
    },
    {
      name:   "Multi-Protocol Slave Interface (I2C / AHB / APB)",
      period: "Jan 2023 – Jun 2023",
      type:   "Verification",
      bullets: [
        "Developed reusable UVM agent components (driver, monitor, sequencer) for I2C, AHB, and APB protocols, enabling a modular multi-protocol verification environment.",
        "Built a detailed verification plan covering functional, protocol, and boundary-condition scenarios for all three interfaces.",
        "Implemented functional coverage groups capturing protocol states, arbitration outcomes, address phases, and error conditions across all three bus interfaces.",
        "Achieved 100% functional coverage closure and identified 6+ RTL bugs through constrained-random stimulus and directed corner-case tests."
      ],
      tags:   ["I2C", "AHB", "APB", "Functional Coverage"]
    },
    {
      name:   "CNN–BiLSTM Hybrid Model for Load Forecasting",
      period: "Bachelor Thesis",
      type:   "Research",
      bullets: [
        "Designed a parallel CNN–BiLSTM hybrid deep learning architecture that jointly extracts spatial features (CNN) and captures bidirectional temporal dependencies (BiLSTM) from historical load data.",
        "Trained and evaluated the model on real-world power consumption datasets, outperforming LSTM, GRU, and CNN-LSTM baselines on RMSE and MAE metrics.",
        "Published results in AIP Conference Proceedings, 2024 (DOI: 10.1063/5.0231967)."
      ],
      tags:   ["Deep Learning", "CNN", "BiLSTM", "Python"]
    },
    {
      name:   "4-bit ALU with FSM Control (Verilog)",
      period: "2021",
      type:   "Hardware Design",
      bullets: [
        "Designed a resource-optimised 4-bit ALU supporting addition, subtraction, AND, OR, XOR, and shift operations using a single shared adder circuit to minimise gate count.",
        "Implemented an FSM-based control unit to sequence operations and manage carry/borrow propagation, and validated the design through directed Verilog simulation."
      ],
      tags:   ["Verilog", "FSM", "Hardware Design"]
    }
  ],


  // ── Education ───────────────────────────────────────────
  education: [
    {
      degree:  "M.Sc. Nanoelectronic Systems",
      school:  "Technische Universität Dresden, Germany",
      period:  "Oct 2025 – Continuing",
      details: "Focus: Hardware Modeling and Simulation, Neural Networks, Memristive Hardware Accelerators."
    },
    {
      degree:  "M.Sc. Electronic Design and Technology",
      school:  "University of Siegen, Germany",
      period:  "Nov 2024 – Sep 2025",
      details: "Transferred to TU Dresden to specialise in nanoelectronic systems."
    },
    {
      degree:  "B.Sc. Electrical & Electronic Engineering",
      school:  "Islamic University of Technology, Bangladesh",
      period:  "Jan 2018 – May 2022",
      details: "GPA: 3.83 / 4.00"
    }
  ],


  // ── Publications ────────────────────────────────────────
  publications: [
    {
      title:   "An efficient short term load demand forecasting using a novel parallel CNN-BiLSTM hybrid neural network for Bangladesh perspective",
      authors: "Al-Amin, M. T., Hossain, A. A., Jawad, T., & Rahman, M. A.",
      venue:   "AIP Conference Proceedings, 3245, 020009 (2024) · DOI: 10.1063/5.0231967"
    }
  ]

};
