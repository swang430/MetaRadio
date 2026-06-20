---
brand: 乾径科技 MetaRadio
product: MetaRadio · Low Altitude Solution
type: vertical
vertical: low-altitude
slug: v1-low-altitude
title: Low-Altitude Economy · The EM Twin for Urban Low-Altitude Communications
audience: technical-decision-maker
language: en
version: 2026.04
contact_email: sales@metaradio.tech
keywords: [low-altitude economy, UAV, eVTOL, UAM, UTM, C2 link, video downlink, EM twin]
design_hint: 主色 cyan/blue + sky；体现城市楼宇 + 低空航线
---

# Hero

- **Badge:** Vertical Datasheet · 低空 / Low Altitude
- **Eyebrow:** Industry Vertical Market Solution
- **Headline:** The EM Twin for Urban Low-Altitude Communications
- **Headline-em:** Let the drone's "invisible airways" prove out in simulation first
- **Sub:** The core tension of the low-altitude economy lies between the complex electromagnetic environment a few hundred meters up and the near-zero-interruption demands placed on C2, video downlink, and positioning. With a three-tier solution of ray tracing + virtual drive test + EM twin, MetaRadio turns this invisible low-altitude electromagnetic map into engineering infrastructure that can be simulated, tested, and operated across urban buildings, tower clutter, and air-ground integrated networks.

## Hero Metrics

| Value | Label |
| --- | --- |
| 0–600 m | Full coverage across urban low-altitude heights |
| C2 / video downlink / 5G-A | Joint multi-link simulation |
| UTM integration | Interworking with UAV management platforms |

# Challenge · Electromagnetic Challenges of Low-Altitude Scenarios

**Title:** Urban low altitude is the most uncertain stretch of space for wireless signals
**Description:** The low-altitude band of 50–600 m sits between the ground cellular main lobe and satellite coverage—precisely the most uncertain "interlayer" of electromagnetic coverage. UAV logistics, urban inspection, eVTOL commuting, and similar use cases demand near-aviation-grade communication continuity, yet the underlying electromagnetic environment is almost a blank slate.

## Challenge Cards

| Icon | Title | Text |
| --- | --- | --- |
| 🏙 | Building and tower-clutter reflections | Urban building clusters create dense reflections and blockage at low altitude; with ground cellular main lobes pointing downward, low-altitude coverage forms "funnel-shaped" caves. |
| 📡 | High-reliability C2 link | Control links require millisecond-level latency and ≥ 99.999% availability—conditions on which traditional statistical models cannot deliver deterministic conclusions. |
| 🛂 | UTM regulatory coordination | Low-altitude management needs "electromagnetic airway" semantics, yet current UTM systems generally lack electromagnetic-layer data. |

# Solution · Deploying the Three Tiers in Low Altitude

**Title:** Ray tracing → virtual drive test → EM twin, a closed loop serving low altitude
**Description:** The three-tier solution maps step by step onto the three stages of low-altitude R&D, testing, and operations. From simulated airways and ground station planning, to UAV C2/video-downlink HIL testing, to a real-time EM twin interworking with UTM, it forms an end-to-end low-altitude electromagnetic toolchain.

## Stack Layers

| Layer | Layer Name | Description |
| --- | --- | --- |
| L1 | Ray tracing / Lauraycs | Urban low-altitude 3D channel simulation: buildings + tower clutter + multiple base stations, outputting RSRP/SINR/multipath and Doppler along the route. |
| L2 | Virtual drive test / HIL | Simulated channels drive the channel emulator and UAV communication test bench, running HIL regression on C2, video downlink, and 5G-A modules. |
| L3 | EM twin / EM-Twin | An urban low-altitude EM twin interworking with the UTM platform, delivering real-time route recommendations and anomaly alerts. |

# Architecture · End-to-End Workflow

## Workflow

| Step | Title | Desc |
| --- | --- | --- |
| 01 | Urban low-altitude modeling | High-precision 3D city model + live-network base station configuration + planned routes/takeoff-and-landing points. |
| 02 | Airway electromagnetic simulation | The RT engine generates time-varying multipath, coverage blind spots, Doppler, and handover risk maps along the route. |
| 03 | C2/video-downlink HIL | The channel emulator drives real UAV modules/ground stations to run link-loss/jitter/handover regression. |
| 04 | UTM closed-loop operations | Real-time electromagnetic situational awareness feeds into UTM, dynamically adjusting airways and takeoff/landing time windows. |

# Specifications · Industry-Specific Specs

## Specs Table

| Item | Spec |
| --- | --- |
| Height range | 0 – 600 m (including the complex near-ground electromagnetic field zone for takeoff and landing) |
| Frequency bands | C2: cellular FR1 / FR2 / 5G-A, dedicated C2 bands, Wi-Fi 6/7; video downlink: 5.8 GHz, mmWave |
| Use-case models | Urban logistics, inspection, police, emergency response, eVTOL UAM, crop protection, surveying and mapping |
| Channel output | Along-route CIR/PDP, coverage holes, Doppler, multi-base-station joint SINR time series |
| HIL targets | UAV modules, ground stations, 5G-A high-band modules, mesh self-organizing networks |
| UTM integration | Mainstream UTM data formats already supported (USS/UAS Service Supplier) |
| Regulatory alignment | Coordinated with regional low-altitude operating procedures; can output an evidence chain for electromagnetic airway approval |
| Deployment | Public/private cloud, edge nodes; supports pilot city-scale clusters |

# Differentiators · Core Differentiation

## Bullets

- **Dedicated "low-altitude interlayer" EM modeling:** Simultaneously accounts for the downtilted ground cellular main lobe, building reflections, and tower-clutter blockage.
- **Deterministic KPIs for the C2 link:** Goes beyond coverage maps to provide millisecond-level latency, packet-loss probability, and handover paths.
- **HIL directly driving real UAV modules:** Reproduces "instant loss-of-link" scenarios rarely encountered in the field.
- **UTM data compatibility:** Outputs an "electromagnetic airway" information layer that interworks with UAV traffic management platforms.
- **Air-ground integrated planning:** A single engine supports coordinated evaluation of ground networks, low-altitude networks, and satellite NTN.
- **Visual delivery:** 3D electromagnetic airways, risk heatmaps, and beam shadows visualized in a single view.

# Applications · Typical Scenarios

| Icon | Title | Text |
| --- | --- | --- |
| 📦 | Urban UAV logistics | Route planning and C2-link SLA design for logistics companies. |
| 🛫 | eVTOL / UAM | Electromagnetic coverage of commuter routes and multi-base-station handover reliability verification. |
| 🚓 | Police and emergency response | On-demand electromagnetic airway generation and emergency backhaul for incident areas. |
| 🛠 | Urban inspection | Video-downlink link assurance for bridge, power, and gas inspection routes. |
| 🌾 | Agricultural crop protection | Cellular coverage and video-downlink reliability prediction for field operations. |
| 🛰 | Air-ground integration | Fused planning of ground + satellite + low-altitude multi-link. |

# CTA · Contact

- **Primary CTA:** Request the low-altitude EM twin solution
- **Email:** sales@metaradio.tech
- **Tagline:** Let the low-altitude economy prove out in the EM twin first.
- **Sub:** 乾径科技 MetaRadio · Low-Altitude Vertical Solution
