---
brand: 乾径科技 MetaRadio
product: MetaRadio · Autonomous Driving Solution
type: vertical
vertical: autonomous-driving
slug: v4-autonomous-driving
title: Autonomous Driving · An EM Twin for V2X and Vehicle-Road-Cloud Communication
audience: technical-decision-maker
language: en
version: 2026.04
contact_email: sales@metaradio.tech
keywords: [autonomous driving, V2X, C-V2X, PC5, T-Box, vehicle-road-cloud, ADAS, high-precision positioning]
design_hint: 主色 navy/blue + amber 强调"路-车-云"三方
---

# Hero

- **Badge:** Vertical Datasheet · Autonomous Driving
- **Eyebrow:** Industry Vertical Market Solution
- **Headline:** Make Autonomous Driving "Get Communication Right"
- **Headline-em:** An EM Twin for V2X and Vehicle-Road-Cloud
- **Sub:** High-level autonomous driving depends on the coordination of V2X, cellular, satellite, and Wi-Fi multipath links. Yet in complex scenarios such as urban canyons, tunnels, overpasses, and underground garages, the communication link is the most easily overlooked weak point in the ADAS/AD safety closed loop. MetaRadio's three-layer product portfolio delivers V2X channel simulation, HIL testing for T-Box/OBU/RSU, and road-network-scale EM twin capabilities within the vehicle-road-cloud system.

## Hero Metrics

| Value | Label |
| --- | --- |
| C-V2X / NR V2X | Uu + PC5 dual link |
| Urban / Tunnel / Overpass | Full-scenario simulation |
| Road-Vehicle-Cloud | End-to-end EM twin |

# Challenge · Communication Challenges for Intelligent Connected Vehicles

**Title:** A Substantial Share of Autonomous Driving's "Long-Tail Scenarios" Hide in Communication
**Description:** The functional-safety evolution of intelligent driving has already extended from perception and decision-making to communication. A single handover failure or one hidden blind spot can disable remote driving, cooperative lane change, and vehicle-road cooperative perception.

## Challenge Cards

| Icon | Title | Text |
| --- | --- | --- |
| 🌉 | Overpasses and Tunnels | Multipath and handover issues at overpasses and tunnel entrances cannot be precisely characterized by traditional statistical models. |
| 🏙 | Urban Canyons | GNSS and cellular multipath problems arise simultaneously among high-rise blocks, affecting positioning and communication. |
| 🅿 | Garages and Campuses | Coverage and handover in indoor parking lots and low-rise campuses are a hidden threshold for high-level AVP automated valet parking. |

# Solution · Deploying the Three-Layer Portfolio in Autonomous Driving

**Title:** Run "That Road" Ten Thousand Times in Simulation First
**Description:** Lauraycs provides high-fidelity channels that jointly model the road network, vehicles, and RSUs. L2 reproduces real road tests with HIL, and L3 links with vehicle-road cooperative platforms to form a road-network-scale EM twin. The whole stack supports everything from single-vehicle terminal testing to intersection-, segment-, and city-scale road-network validation.

## Stack Layers

| Layer | Layer Name | Description |
| --- | --- | --- |
| L1 | Ray Tracing / Lauraycs | Joint modeling of road network/tunnel/overpass/campus 3D + vehicle trajectories + multiple RSUs/base stations, outputting V2X Uu/PC5 channels. |
| L2 | Virtual Road Test / HIL | Drives T-Box/OBU/RSU HIL with real road-network channels, regressing handover, remote driving, and positioning KPIs. |
| L3 | EM Twin / EM-Twin | Intersection- and segment-scale EM twin, linked with vehicle-road cooperative platforms and ETC/MEC. |

# Architecture · End-to-End Workflow

## Workflow

| Step | Title | Desc |
| --- | --- | --- |
| 01 | Road Network and Vehicle Modeling | High-precision map + traffic-flow trajectories + live base station/RSU configuration. |
| 02 | V2X Channel Simulation | Joint time-varying multipath and handover across Uu (cellular) + PC5 (sidelink) dual links. |
| 03 | Vehicle-Side / Roadside HIL | The channel simulator drives T-Box/OBU/RSU, regressing handover/packet loss/positioning. |
| 04 | Road-Network Twin | EM-situation twin of intersections and segments, interfacing with vehicle-road cooperative platforms. |

# Specifications · Industry-Specific Specs

## Specs Table

| Item | Spec |
| --- | --- |
| Standards Alignment | 3GPP C-V2X (Rel-14/15), NR V2X (Rel-16/17/18), IEEE 802.11p/bd, CCSA YD/T |
| Frequency Bands | Cellular FR1/FR2, 5.9 GHz sidelink, millimeter wave (long term), satellite-assisted |
| Scenario Library | Urban canyon, overpass, tunnel, bridge, campus, garage, highway, rural expressway |
| Mobility | Arbitrary programmable vehicle/UAV/RSU trajectories; supports multi-vehicle cooperation and platooning |
| HIL Targets | T-Box, OBU, RSU, 4D radar, millimeter-wave modules |
| KPI | PER, TPUT, RSRP/SINR, PC5 link stability, remote-driving RTT, AVP handover |
| ADAS Integration | Supports interfacing with SiL/HiL autonomous-driving simulation platforms (CARLA/Prescan/VTD) |
| Deployment | Lab + intersection/segment pilots; integrated with OEM automated test platforms |

# Differentiators · Core Differentiation

## Bullets

- **Road-network-scale RT:** Brings an entire intersection/segment into the simulation at once, avoiding single-base-station approximations.
- **Uu + PC5 dual link:** A single simulation outputs both cellular and sidelink channels simultaneously.
- **ADAS-simulation ready:** "Plugs" the communication side into existing autonomous-driving SiL/HiL workflows.
- **Rich scenario library:** ADAS long-tail scenarios such as overpasses, tunnels, and garages are ready-built and reusable.
- **Repeatable road tests:** Converts a field "near-miss" event into a repeatable script.
- **Domestically controllable:** Forms a fully domestic V2X HIL solution together with domestic instrument and RSU vendors.

# Applications · Typical Scenarios

| Icon | Title | Text |
| --- | --- | --- |
| 🚗 | T-Box / OBU Testing | Reproduces real road conditions and runs regression tests on terminal remote driving and cooperative lane change. |
| 📡 | RSU Intersection Deployment | Simulates intersection coverage and handover performance for different RSU positions/antenna schemes. |
| 🛣 | Highway V2X | Evaluates link stability for high-speed mobility + handover/platooning in highway scenarios. |
| 🅿 | AVP Automated Valet Parking | Joint evaluation of EM coverage and positioning accuracy in garages + campuses. |
| 🚛 | Commercial Fleets | Remote-driving/platooning link assurance for logistics + mining + ports. |
| 🌐 | Vehicle-Road-Cloud Cooperation | End-to-end KPI simulation across MEC + intersection + vehicle side. |

# Proof · Customers and Ecosystem

## Proof Stats

| Value | Label |
| --- | --- |
| Leading OEMs | Joint virtual road test / V2X HIL cases |
| Roadside RSU | Integrated with multiple RSU equipment vendors |
| Automated Testing | Interfaced with automotive-grade automated test platforms |

# CTA · Contact

- **Primary CTA:** Request the V2X / Vehicle-Road-Cloud Solution
- **Email:** sales@metaradio.tech
- **Tagline:** Run autonomous driving's "communication long tail" through the EM twin first.
- **Sub:** 乾径科技 MetaRadio · Autonomous Driving Vertical Solution
