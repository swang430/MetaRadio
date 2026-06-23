---
brand: 乾径科技 MetaRadio
product: MetaRadio EM-Twin Platform
type: horizontal
layer: L3
slug: l3-em-twin
title: EM Twin · The Electromagnetic Layer of the Digital Twin
audience: technical-decision-maker
language: en
version: 2026.04
contact_email: sales@metaradio.tech
keywords: [EM Twin, EM Twin, Digital Twin, Digital Twin, End-to-End Testing, Electromagnetic Environment, Communication Infrastructure]
design_hint: 主色 navy/cyan；强调"闭环"与"端到端"；2 页 A4
---

# Hero

- **Badge:** Datasheet · L3 / EM Digital Twin
- **Eyebrow:** Three-Tier Product Strategy · Tier Three
- **Headline:** EM Twin
- **Headline-em:** The Invisible Pillar of the Digital Twin
- **Sub:** Backed by the dual foundation of Lauraycs ray tracing channel and hardware-in-the-loop (HIL), it builds a real-time, evolvable EM twin of the electromagnetic environment. It is both the infrastructure for end-to-end testing and the key link that feeds electromagnetic data back into city/factory/low-altitude digital twins—closing the RT loop with reality so it becomes new environmental data once again.

## Hero Metrics

| Value | Label |
| --- | --- |
| Real-time | Millisecond-level EM field refresh |
| End-to-end | Full-stack testing from environment to DUT |
| Closed loop | Reality ↔ simulation ↔ reality data feed back |

# Challenge · The Missing Link in the Digital Twin

**Title:** Why the Digital Twin Lacks an "Electromagnetic Layer"
**Description:** City, campus, factory, and low-altitude digital twin projects are emerging in droves, but the vast majority stop at the geometry and IoT-sensing layers. The moment wireless network planning, ISAC, low-altitude C2, satellite coordination, or intelligent-driving communication is involved, a missing "electromagnetic layer" means the twin cannot support end-to-end communication testing or strategic decision-making.

## Challenge Cards

| Icon | Title | Text |
| --- | --- | --- |
| 🧱 | Geometry ≠ Electromagnetics | Existing digital twins only describe what is "visible," and are virtually blind to the reflection, diffraction, penetration, and time-varying multipath of electromagnetic waves. |
| 🔁 | Broken Reality Feedback | Coverage, interference, and packet-loss data from real networks cannot be fed back into simulation, leaving reverse calibration and optimization out of reach. |
| 🏗 | No Foundation for End-to-End | Without a continuously online electromagnetic environment that devices can access, end-to-end testing for autonomous driving / low-altitude / industrial use can only be fragmentary. |

# Solution · Solution

**Title:** Turn the Electromagnetic World into a "Continuously Online" Twin Platform
**Description:** The EM-Twin platform uses Lauraycs ray tracing as its electromagnetic kernel, overlays real-time data from live networks/factories/low-altitude/satellite-ground, and remains continuously visible to real terminals through its HIL subsystem. It is not a one-off simulation, but an electromagnetic environment service that can be subscribed to, queried, and driven.

## Solution Cards

| Icon | Title | Text |
| --- | --- | --- |
| 🌐 | Continuously Online | 7×24 real-time EM field service; geographic scope, frequency band, and time are all subscribable; supports event-triggered replay. |
| 🔌 | Drivable | Directly drives hardware such as channel simulators, UAV C2 test benches, and satellite simulators via API/Streaming. |
| 🔄 | Data Closed Loop | Live-network/drive-test/factory operational data is fed back; measured calibration continuously improves twin fidelity, forming a bidirectional closed loop. |

# Architecture · Platform Architecture

**Title:** The Four-Layer Architecture of the EM Twin
**Description:** From low-level environment data acquisition, to electromagnetic kernel computation, to outward-facing service interfaces, and on to integration with the upper-layer digital twin, it forms a complete EM twin platform. Every layer provides standard APIs.

## Workflow

| Step | Title | Desc |
| --- | --- | --- |
| 01 | Multi-Source Environment Data | OSM / BIM / oblique photography / laser point cloud / real-time IoT; aligned with city/factory digital twin base maps. |
| 02 | RT Electromagnetic Kernel | Lauraycs ray tracing continuously computes time-varying multipath and coverage; GPU clusters scale elastically. |
| 03 | Service-Oriented API | gRPC / REST / Streaming; subscribe to the electromagnetic state of a specified geographic box or time window. |
| 04 | Upper-Layer Applications and Feed Back | Network planning, ISAC, low-altitude, autonomous driving, HIL, AI training; real-world data is fed back for continuous calibration. |

# Specifications · Platform Specifications

## Specs Table

| Item | Spec |
| --- | --- |
| Electromagnetic Kernel | Lauraycs cluster deployment; multi-GPU/multi-node parallelism; compute units partitioned by geographic box |
| Real-time Performance | Static coverage: second-level; dynamic multipath: ≤ 100 ms local refresh; triggerable millisecond-by-millisecond replay |
| Frequency Band | 600 MHz – 100 GHz (optional sub-THz extension) |
| Service Interfaces | gRPC, REST, WebSocket Streaming, Kafka data streams |
| Base Map Data | OSM / CityGML / IFC (BIM) / LAS point cloud / oblique photography; custom integration |
| Real-time Data Feed Back | Live-network KPIs (RSRP, SINR, RSRQ, CQI), drive-test PCAP, IoT sensing, vehicle/UAV trajectories |
| Digital Twin Integration | Already supports city-level, campus-level, factory-level, and low-altitude management (UTM) digital twin platforms |
| Visualization | 3D EM field visualization (coverage, shadowing, beams, multipath); timeline replay; event timeline |
| AI Training Data | Automatically produces labeled multipath/sensing/positioning datasets, usable for ISAC/AI-native algorithm training |
| Deployment | Private cloud / edge / self-controllable cluster (including ARM); supports tenant isolation and compute billing |
| Security | Data classification, access control, audit logs; supports MLPS and industry compliance |
| Self-Controllable | Kylin / domestic GPU adaptation; the self-controllable stack runs end-to-end |

# Differentiators · Core Differentiation

## Bullets

- **Filling the electromagnetic gap:** Truly "completes" the electromagnetic dimension of the digital twin, rather than statically pasting coverage maps as textures.
- **Drivable:** Not just for viewing—it can serve as a channel source to drive HIL/OTA real-hardware testing.
- **Real-world closed loop:** Measured data is continuously fed back, so twin fidelity converges over time rather than decaying.
- **Subscribable electromagnetic service:** Allows third-party applications to subscribe to the electromagnetic state via API, with the twin serving as public infrastructure.
- **Cross-domain base maps:** City, campus, factory, low-altitude, and satellite-ground twin systems can all be unified on a single electromagnetic kernel.
- **AI data factory:** Outputs large-scale labeled datasets to support ISAC / 6G AI-native channel and positioning model training.

# Applications · Typical Applications

| Icon | Title | Text |
| --- | --- | --- |
| 🏙 | Smart City | Coordinated planning of 5G private/public networks, electromagnetic situational rehearsal for major events, and emergency communication simulation. |
| 🏭 | Factory Digital Twin | Industrial 5G LAN / Wi-Fi 7 deployment optimization, communication link assurance for AGVs and collaborative robots. |
| 🛩 | Low-Altitude Management | UTM platform integration with EM-Twin, situational awareness for urban low-altitude C2/video links and route planning. |
| 🛰 | Integrated Satellite-Ground Network | Joint planning of LEO constellation coverage and ground shadowing, NTN service-level KPI prediction. |
| 🚗 | Intelligent Driving Road Network | End-to-end electromagnetic testing and strategy validation for roadside RSU/MEC and vehicle-side coordination. |
| 🤖 | AI / 6G Training | Large-scale, high-fidelity channel and sensing data for AI-native channel models and algorithm training. |

# Proof · Customers and Ecosystem

## Proof Stats

| Value | Label |
| --- | --- |
| Multiple | City-level/campus-level EM twin projects in deployment |
| End-to-end | Joint validation with operators, equipment vendors, automakers, and low-altitude operators |
| Growable | Continuously onboarding more base maps and data sources |

# CTA · Contact

- **Primary CTA:** Request an EM Twin solution consultation
- **Email:** sales@metaradio.tech
- **Tagline:** Let the digital twin see electromagnetics, and keep reality and simulation in a continuous closed loop.
- **Sub:** 乾径科技 MetaRadio · EM Twin Platform (EM-Twin)
