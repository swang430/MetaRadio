---
brand: 乾径科技 MetaRadio
product: MetaRadio · ISAC Solution
type: vertical
vertical: isac
slug: v3-isac
title: ISAC · Letting Sensing and Communication Work Within the Same Electromagnetic Map
audience: technical-decision-maker
language: en
version: 2026.04
contact_email: sales@metaradio.tech
keywords: [ISAC, integrated sensing and communication, JCAS, sensing, radar, communication, multi-base-station coordination, 6G]
design_hint: 主色 navy/blue + emerald；强调"双输出"信道
---

# Hero

- **Badge:** Vertical Datasheet · ISAC / Integrated Sensing and Communication
- **Eyebrow:** Industry Vertical Market Solution
- **Headline:** Letting Sensing and Communication Work Within the Same Electromagnetic Map
- **Headline-em:** The EM Twin of ISAC Integrated Sensing and Communication
- **Sub:** ISAC is one of the most imaginative directions of 5G-A/6G, but it also poses new challenges to channel modeling and testing: the same beam of signal simultaneously carries communication and sensing, where echoes, images, specular reflections, and multipath are no longer interference but "signal." MetaRadio uses three product layers to simultaneously output sensing radar echoes and communication multipath, enabling ISAC algorithms, terminals, and networks to be developed and validated within the same high-fidelity EM twin.

## Hero Metrics

| Value | Label |
| --- | --- |
| Dual Output | Sensing Echo + Communication Multipath |
| Bistatic / Multistatic | Multi-Base-Station Sensing Coordination |
| 5G-A / 6G | Standards Alignment |

# Challenge · The Modeling and Testing Difficulties of ISAC

**Title:** The "Symbiotic Channel" of Communication and Sensing — Traditional Models Cannot Provide Answers
**Description:** Traditional channel simulation only cares about the communication-side PDP/CDL, and radar simulation only cares about RCS and echoes; ISAC requires the physical consistency of both at once. Multi-base-station coordinated (Bistatic/Multistatic) sensing further makes "whether the echo of the same object is consistent across different links" a critical question.

## Challenge Cards

| Icon | Title | Text |
| --- | --- | --- |
| 🎯 | Dual-Output Consistency | The communication multipath and sensing echo of the same target at the same moment must be physically consistent, which traditional tools struggle to deliver simultaneously. |
| 🛰 | Multi-Station Coordinated Sensing | The geometry and multipath under Bistatic/Multistatic configurations are interdependent, requiring full-field simultaneous simulation. |
| 🤖 | Algorithm and Hardware Iteration | Sensing algorithms, waveforms, and hardware require rapid regression testing, yet a repeatable high-fidelity ISAC channel is lacking. |

# Solution · Deployment of the Three Product Layers in ISAC

**Title:** One Ray Tracing, Simultaneously Outputting "Communication Channel + Sensing Echo"
**Description:** Within a single simulation, Lauraycs simultaneously outputs the communication-side CIR/PDP and the target echo on the sensing side (including RCS, multipath, Doppler), forming a unified channel source for ISAC algorithms and hardware. L2 provides ISAC terminal HIL, and L3 turns the ISAC network into a subscribable twin service.

## Stack Layers

| Layer | Layer Name | Description |
| --- | --- | --- |
| L1 | Ray Tracing / Lauraycs | Simultaneously outputs sensing echo and communication multipath; supports target RCS, moving-target trajectories, and multi-base-station coordination. |
| L2 | Virtual Drive Test / HIL | Uses the ISAC channel to drive the channel emulator and radar test bench, performing joint HIL on ISAC modules/terminals. |
| L3 | EM Twin / EM-Twin | An electromagnetic-situation twin of the multi-base-station ISAC network, serving as the runtime infrastructure for sensing services. |

# Architecture · End-to-End Workflow

## Workflow

| Step | Title | Desc |
| --- | --- | --- |
| 01 | Scene and Target Modeling | City/campus/factory 3D + moving-target (people, vehicles, objects) trajectories + target RCS models. |
| 02 | ISAC Dual-Output Simulation | A single simulation simultaneously outputs the communication CIR and the sensing echo (including target multipath decomposition). |
| 03 | ISAC HIL | Joint drive by channel emulator + radar test bench, regressing sensing and communication KPIs. |
| 04 | Network Twin Service | A multi-base-station sensing-situation twin, providing target-level APIs and visualization. |

# Specifications · Industry-Specific Specs

## Specs Table

| Item | Spec |
| --- | --- |
| Operating Modes | Communication, sensing, ISAC mono-static, ISAC bistatic mode, Bistatic, Multistatic |
| Frequency Bands | FR1 / FR2 / FR3 / sub-THz; typical ISAC bands 26/28/60/77/140 GHz |
| Sensing Output | Target RCS, range-Doppler, AoA/AoD, echo multipath clusters, target-level annotation |
| Communication Output | CIR/PDP, AoA/AoD/ZoA/ZoD, Doppler, 3GPP TR 38.901 compatible |
| Moving Targets | Arbitrary programmable trajectories; supports people, vehicles, robots, drones; micro-Doppler optional |
| Standards Alignment | 3GPP ISAC progress (Rel-19/20), IEEE 802.11bf, ITU-R 6G framework |
| HIL Integration | Communication channel emulator + radar test bench + ISAC terminal OTA |
| Training Data | Automatically produces annotated target-channel dual-perspective datasets, usable for ISAC algorithm training |
| Deployment | Private cloud, GPU clusters; supports factory/campus-level deployment |

# Differentiators · Core Differentiation

## Bullets

- **Physically consistent dual output:** Communication multipath and sensing echo come from the same ray tracing, avoiding inconsistencies from manual stitching.
- **Native support for multi-station coordination:** Full-field simultaneous refresh under Bistatic/Multistatic geometry, conforming to real ISAC networks.
- **Annotatable training data:** Directly produces the target-level + channel-level annotated datasets that ISAC algorithms require.
- **Multi-band coverage:** From FR1 all the way to sub-THz, a single engine spans the 5G-A/6G ISAC research path.
- **HIL and twin linkage:** After algorithms are regressed on HIL, they can be directly connected to the EM twin for live-network situation assessment.
- **Explainable:** Every echo/multipath can be traced to its physical origin, facilitating algorithm debugging and paper reproduction.

# Applications · Typical Scenarios

| Icon | Title | Text |
| --- | --- | --- |
| 👥 | Human Motion Sensing | Indoor/campus personnel presence and posture sensing based on 5G-A signals. |
| 🚗 | Vehicle-Road Sensing | Coordinated sensing of vehicles/pedestrians/non-motorized vehicles by roadside ISAC stations. |
| 🏭 | Factory Safety | Personnel intrusion detection in heavy-equipment zones, AGV path sensing. |
| 🛩 | Low-Altitude Sensing | Detection and tracking of small-target drones in urban low-altitude airspace. |
| 🌳 | Urban Situation | Density of people and vehicle flow and abnormal-behavior sensing in key areas. |
| 🤖 | 6G AI Training | Large-scale high-fidelity ISAC data used for AI-native algorithm training. |

# Proof · Customers and Ecosystem

## Proof Stats

| Value | Label |
| --- | --- |
| Leading | Joint validation with domestic ISAC research institutes and equipment vendors |
| Papers | Backed by publicly published ISAC simulation cases |
| 6G | Entering the mainstream toolchain of 6G integrated sensing and communication research |

# CTA · Contact

- **Primary CTA:** Request an ISAC Joint Simulation Solution
- **Email:** sales@metaradio.tech
- **Tagline:** Let sensing and communication be born within the same electromagnetic map.
- **Sub:** MetaRadio · ISAC Vertical Solution
