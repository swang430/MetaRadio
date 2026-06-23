---
brand: 乾径科技 MetaRadio
product: MetaRadio · Satellite NTN Solution
type: vertical
vertical: satellite-ntn
slug: v2-satellite-ntn
title: Satellite NTN · Space-Ground Integrated EM Twin
audience: technical-decision-maker
language: en
version: 2026.04
contact_email: sales@metaradio.tech
keywords: [NTN, Non-Terrestrial Network, LEO, GEO, satellite, direct-to-cell, NB-IoT NTN, NR NTN]
design_hint: 主色 navy/cyan + 深空蓝；强调"星-地"双侧
---

# Hero

- **Badge:** Vertical Datasheet · Satellite NTN / Satellite Non-Terrestrial Network
- **Eyebrow:** Industry Vertical Market Solution
- **Headline:** Space-Ground Integrated EM Twin
- **Headline-em:** Stop leaving satellite signals "at the mercy of the sky" amid urban high-rises
- **Sub:** Large-scale LEO constellations, direct-to-cell, NB-IoT NTN, and NR NTN are pushing the "satellite-to-ground" link into the 3GPP mainstream. But urban building blockage, low-elevation-angle shadowing, and multi-beam / multi-satellite handover make link assurance for NTN terminals a new challenge. With three product layers, MetaRadio delivers a complete toolchain spanning simulation, HIL, and EM twin for space-ground integrated scenarios.

## Hero Metrics

| Value | Label |
| --- | --- |
| LEO / MEO / GEO | Multi-orbit collaborative modeling |
| NB-IoT NTN / NR NTN | 3GPP standard alignment |
| Direct-to-cell | Urban penetration and multi-beam simulation |

# Challenge · The Real Dilemma from Satellite to Ground

**Title:** "Satellite-to-ground" looks simple, but that last kilometer on the ground is the hardest
**Description:** NTN link budgets are often approximated as "free space + shadow margin," yet in real deployments across cities, mountains, and indoors, multipath, penetration, shadowing, and multi-beam / multi-satellite handover make the link far more complex than the model.

## Challenge Cards

| Icon | Title | Text |
| --- | --- | --- |
| 🌆 | Urban Building Shadowing | High-density buildings cause frequent shadow fading and multipath at low elevation angles, determining whether true "direct-to-cell" is possible. |
| 🔄 | Multi-Satellite / Multi-Beam Handover | Under LEO constellations, beam handovers are dense and inter-satellite handover latency is sensitive, easily causing dropped links and reconnection delays. |
| 🏠 | Indoor Penetration | Penetration loss models for terminals indoors, in vehicles, and aboard mass transit are highly empirical and lack deterministic prediction. |

# Solution · Deploying the Three Product Layers in NTN

**Title:** Use ray tracing to precisely reconstruct "that last kilometer," then close the loop with HIL and twin validation
**Description:** The three-layer solution covers the three stages of channel generation, terminal testing, and operations-grade EM situational awareness, making NTN business-level KPIs simulatable, testable, and continuously monitorable.

## Stack Layers

| Layer | Layer Name | Description |
| --- | --- | --- |
| L1 | Ray Tracing / Lauraycs | Satellite trajectories + urban/mountain 3D + indoor penetration; outputs time-varying multipath and shadowing sequences for the space-ground link. |
| L2 | Virtual Drive Test / HIL | Real space-ground channels drive HIL testing and regression of NB-IoT NTN / NR NTN terminal modules. |
| L3 | EM Twin / EM-Twin | Integrates with NTN network management/scheduling to render constellation coverage, beam landing points, and terminal reachability in real time. |

# Architecture · End-to-End Workflow

## Workflow

| Step | Title | Desc |
| --- | --- | --- |
| 01 | Constellation + Ground Modeling | TLE ephemeris + multi-beam radiation patterns + urban/mountain/indoor 3D models. |
| 02 | Space-Ground Channel Generation | Generate time-varying CIR/PDP, Doppler, shadowing, and beam handover sequences along the trajectory. |
| 03 | NTN Terminal HIL | Channel emulator drives NB-IoT/NR NTN modules, regressing TTFF, handover, and packet loss. |
| 04 | Network Management Closed Loop | The EM twin outputs business-level coverage and reachability metrics, feeding back into scheduling strategy. |

# Specifications · Industry-Specific Specs

## Specs Table

| Item | Spec |
| --- | --- |
| Orbit Types | LEO / MEO / GEO; supports custom ephemeris and constellation configurations |
| Standard Alignment | 3GPP NB-IoT NTN (Rel-17/18), NR NTN (Rel-17/18/19), ITU-R P.681 |
| Frequency Bands | L/S/C/Ku/Ka/Q/V; supports direct-to-cell (D2D) and broadband NTN |
| Multi-Beam | Configurable from tens to hundreds of beams; includes beam landing trajectories and power spectra |
| Terminal Types | Handheld terminals, IoT terminals, vehicular terminals, fixed VSAT, low-altitude/maritime terminals |
| Urban/Indoor | Includes building penetration, vehicle penetration, and indoor multipath models; calibratable against field measurements |
| Simulation Output | Link margin, reachability probability, handover risk, inter-satellite handover strategy evaluation |
| HIL Integration | Satellite channel emulator, 5G NTN gNB, terminal OTA chamber |
| Deployment | Private cloud, edge; supports integration with constellation operator network management |

# Differentiators · Core Differentiation

## Bullets

- **Truly "end-to-end" NTN:** Models both satellite trajectories and the urban/indoor ground side simultaneously, avoiding the traditional "write formulas in the sky, rely on experience on the ground."
- **Multi-satellite handover determinism:** Repeatable evaluation and regression of beam/inter-satellite handover under LEO constellations.
- **Direct-to-cell simulation:** Delivers deterministic conclusions on direct-to-cell link reachability under urban building shadowing.
- **Domestic and controllable:** Forms joint HIL solutions with domestic NTN gNB and terminal module vendors.
- **Business-level KPIs:** Beyond link margin, outputs business-level metrics such as TTFF, packet loss, and handover success rate.
- **Twin integration:** Overlays NTN coverage onto urban/campus EM twins to form a space-ground integrated view.

# Applications · Typical Scenarios

| Icon | Title | Text |
| --- | --- | --- |
| 📱 | Direct-to-Cell | Coverage reachability and handover performance prediction for urban/suburban direct-to-cell. |
| 🌐 | NB-IoT NTN | Coverage and uplink reachability assessment for massive low-rate IoT terminals. |
| 🚗 | Vehicular NTN | Space-ground link stability and blind-spot assessment in high-speed mobility scenarios. |
| 🚢 | Maritime/Aviation | Reachability assessment and backup link design for deep-sea and low-altitude routes. |
| 🏙 | Emergency Communications | Temporary NTN coverage in disaster zones and service planning for urban re-entry. |
| 🛰 | Constellation Planning | Comparative end-to-end service capability simulation under different constellation configurations. |

# Proof · Customers and Ecosystem

## Proof Stats

| Value | Label |
| --- | --- |
| Leading | Collaboration with domestic LEO constellation institutes / satellite operators |
| Standards | Synchronized tracking of 3GPP NTN standards |
| End-to-End | Joint HIL case studies across satellite + gNB + terminal |

# CTA · Contact

- **Primary CTA:** Request the NTN End-to-End Solution
- **Email:** sales@metaradio.tech
- **Tagline:** Turn satellite signals amid urban high-rises from empirical estimation into deterministic engineering.
- **Sub:** 乾径科技 MetaRadio · Satellite NTN Vertical Solution
