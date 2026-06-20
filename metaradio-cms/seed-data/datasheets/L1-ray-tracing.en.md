---
brand: 乾径科技 MetaRadio
product: Lauraycs
type: horizontal
layer: L1
slug: l1-ray-tracing
title: Lauraycs · Deterministic Ray Tracing Simulation Engine
audience: technical-decision-maker
language: en
version: 2026.04
contact_email: sales@metaradio.tech
keywords: [ray tracing, ray tracing, channel simulation, MIMO, 5G, 6G, digital twin, MetaRadio]
design_hint: 主色 navy/blue；封面深色；可使用堆栈/数据卡/规格表组件；2 页 A4
---

# Hero

- **Badge:** Datasheet · L1 / Ray Tracing Simulation
- **Eyebrow:** Three-Layer Product Strategy · Layer One
- **Headline:** See Into the Electromagnetic World
- **Headline-em:** Deterministic Ray Tracing Simulation Engine
- **Sub:** Grounded in the first principles of physics, Lauraycs precisely reproduces the reflection, diffraction, and penetration of electromagnetic waves in real three-dimensional environments. It turns invisible electromagnetic signals into engineering objects that can be known, measured, and predicted, delivering high-fidelity channel and coverage data for next-generation R&D in communication, sensing, and positioning.

## Hero Metrics

| Value | Label |
| --- | --- |
| L3-class | Dynamic simulation capability, industry-leading |
| ≤ 325 GHz | Frequency coverage, including sub-THz |
| All platforms | Windows / Linux / macOS / Kylin |

# Challenge · Challenges of Our Era

**Title:** Why Is Wireless Prediction Still So Hard?
**Description:** From autonomous driving to smart factories, from the low-altitude economy to 6G, wireless connectivity has become critical infrastructure. Yet the complexity of the physical world causes traditional prediction methods that rely on statistical models to fail comprehensively in fidelity, repeatability, and coverage of extreme scenarios.

## Challenge Cards

| Icon | Title | Text |
| --- | --- | --- |
| 📈 | Dynamic Complexity of Scenarios | Moving vehicles, robots, and crowds alter signal propagation paths in real time; traditional static, statistical models cannot capture time-varying multipath and Doppler. |
| 🏢 | Uniqueness of Environments | Every factory, every street, and every low-altitude corridor in flight is one of a kind, and "average" statistical models cannot reflect the performance bottlenecks of a specific scenario. |
| 💰 | Limits of Physical Testing | Real-world drive tests / field tests are costly, time-consuming, and non-reproducible, and have become a serious bottleneck for product R&D and network deployment. |

# Solution · Our Approach

**Title:** Building a Digital Twin of Electromagnetic Space with Deterministic Ray Tracing
**Description:** Rather than relying on "guesswork," we take physics as the first principle to precisely reproduce every reflection, diffraction, and penetration of electromagnetic waves in real three-dimensional environments, mapping the physical world 1:1 into digital space. Lauraycs provides end-to-end capability from 3D scene input and channel generation to engineering-ready output.

## Solution Cards

| Icon | Title | Text |
| --- | --- | --- |
| 🎯 | Deterministic Prediction | Based on precise 3D scenes and physical laws, it outputs "what you see is what you get" multipath, coverage, and time-varying results, instead of vague statistical probabilities. |
| 🔬 | High-Fidelity Reproduction | It precisely computes the strength, delay, AoA/AoD/ZoA/ZoD, and Doppler of every multipath component, and can further converge errors through measurement-based calibration. |
| ♻️ | Infinitely Repeatable | Reproduce any hazardous / extreme scenario at zero cost in the digital world, accelerating product iteration, algorithm validation, and network planning. |

# Architecture · Workflow

**Title:** From 3D Scene to Engineering-Ready Channel, a Four-Step Closed Loop
**Description:** Lauraycs is compatible with mainstream industry 3D data sources, antenna models, and material libraries, and its output formats interface directly with channel emulators, link simulators, and system-level simulation platforms.

## Workflow

| Step | Title | Desc |
| --- | --- | --- |
| 01 | Scene and Asset Input | OSM / IFC / CityGML / OBJ / FBX 3D models, with support for electromagnetic material libraries and frequency-dependent parameters. |
| 02 | Configure Tx / Rx / Trajectories | Arbitrary antenna patterns, array geometries, UE/BS/satellite/airborne links, and motion trajectories. |
| 03 | RT Engine Computation | GPU-accelerated hybrid SBR/Image/UTD algorithms, with on-demand selection of accuracy and speed tiers. |
| 04 | Engineering-Ready Output | CIR / PDP / RSRP / SINR coverage maps, 3GPP TR 38.901-compatible multipath clusters. |

# Specifications · Technical Specifications

## Specs Table

| Item | Spec |
| --- | --- |
| Algorithms | SBR shooting-and-bouncing rays + Image method + UTD uniform diffraction + transmission + scattering; configurable maximum reflection/diffraction/penetration orders |
| Frequency Bands | 200 MHz – 325 GHz (including FR1 / FR2 / FR3 / sub-THz) |
| Bandwidth | Arbitrary; typically supports 100 MHz / 400 MHz / 2 GHz wideband snapshots |
| Antennas | Omnidirectional, directional, array (URA/ULA/spherical), custom patterns (CST/HFSS/MAT import) |
| Multipath Output | Complex CIR, PDP, AoA/AoD/ZoA/ZoD, Doppler, cluster/sub-path grouping |
| Coverage Output | RSRP / RSRQ / SINR / path loss / delay spread, 2D/3D grids |
| Dynamic Simulation | L3-class time-series simulation, supporting arbitrary programmable time-varying scenarios and joint multi-Tx/Rx trajectories |
| Standards Alignment | 3GPP TR 38.901 / 38.873, ITU-R P.2040 series, IEEE 802.11 channel models |
| Operating Systems | Windows 10/11, Ubuntu/CentOS/Debian, macOS (including Apple Silicon), Galaxy Kylin |
| Acceleration | GPU CUDA / OptiX; multi-GPU parallelism; typically 10–100× speedup over CPU |
| Interfaces | Python API, command-line batch processing, HTTP/REST, MATLAB Toolbox |
| Deployment | Desktop / workstation / private cloud / self-controllable cluster (including ARM)|

# Differentiators · Core Differentiators

## Bullets

- **L3-class dynamic simulation, industry-leading:** True time-series-level simulation that refreshes multipath, Doppler, and coverage moment by moment, supporting arbitrary programmable complex dynamic interactions.
- **Frequency coverage up to 325 GHz:** A single engine covers 5G FR1/FR2/FR3 and 6G sub-THz simulation needs, avoiding switching between multiple tools.
- **Full-stack self-controllable and cross-platform:** The only commercial RT engine with native support for Kylin and Apple Silicon, meeting the self-controllable requirements of critical industries.
- **Provable 3GPP consistency:** Supports direct comparison against 3GPP TR 38.901 PDP/cluster statistics, facilitating mutual recognition with existing standard link simulators.
- **Toolchain ecosystem:** Existing integration cases with mainstream channel emulators, link/system simulation platforms, and digital twin engines.
- **Calibratable and explainable:** Outputs the physical origin of every multipath component (which wall/edge/penetration), supporting closed-loop optimization through comparison with measurements.

# Applications · Typical Applications

| Icon | Title | Text |
| --- | --- | --- |
| 📡 | 5G/6G Channel Modeling | Provides high-fidelity multipath data for Massive MIMO, beamforming, RIS, and ISAC, supporting algorithm validation and performance evaluation. |
| 🚗 | V2X / Connected Vehicles | Reproduces complex vehicle-road scenarios in urban canyons, tunnels, and interchanges, validating in-vehicle antenna and T-Box communication links. |
| 🛩 | Drones and Low-Altitude | Simulates complex low-altitude channels among urban buildings, planning drone logistics/inspection routes and ensuring C2 link continuity. |
| 🛰 | Satellite NTN | Models the coverage and penetration of LEO/GEO signals within ground building clusters, evaluating the performance of space-ground collaborative terminals. |
| 🏭 | Industry and Robotics | Evaluates signal coverage across complex production lines, ensuring low-latency, high-reliability communication for AGVs/collaborative robots. |
| 📍 | High-Precision Positioning | Corrects ToA/AoA positioning errors by simulating multipath effects, achieving centimeter-level positioning in complex indoor environments. |

# Proof · Customers and Ecosystem

**Description:** Lauraycs has been deployed in the R&D and testing workflows of leading automakers, satellite companies, operator research institutes, and industrial robotics enterprises. It also maintains deep integration with mainstream channel emulators and system simulation platforms.

## Proof Stats

| Value | Label |
| --- | --- |
| 30+ | Enterprise and research institution customers |
| 15+ | Integrated channel simulation/link simulation toolchains |
| 100% | Independent intellectual property and self-controllable |

# CTA · Contact

- **Primary CTA:** Request a Lauraycs Trial
- **Email:** sales@metaradio.tech
- **Tagline:** Making invisible signals knowable, measurable, and predictable.
- **Sub:** 乾径科技 MetaRadio · Experts in Electromagnetic Space Digital Twins
