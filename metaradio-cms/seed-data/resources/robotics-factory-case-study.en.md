---
slug: robotics-factory-case-study
title: Factory-Grade Wireless Reliability for AGV/Cobots
type: Case Study
publicationDate: 2025-12-12
language: en
---

While deploying AGVs (automated guided vehicles) and collaborative robots, a smart factory hit wireless control-link jitter and intermittent packet loss in specific areas, disrupting AGV dispatch and robot coordination. A metal-dense production line is "hell mode" for wireless. This case study records how MetaRadio used a production-line EM twin to assess coverage, tame metal reflection, and keep AGV control links low-latency and highly reliable.

## Background: wireless in a metal jungle

Factory lines are full of metal racks, conveyors and robotic arms — a dense, time-varying reflector field. AGVs move through it while the channel changes in real time with position and line state. Once the control link jitters, at best the AGV slows to wait; at worst it triggers a safety stop — directly affecting output. The traditional "walk around and spot-measure coverage" approach is neither comprehensive nor predictive of changes after a line retrofit.

## Method: a production-line EM twin

1. **Line modeling**: rebuild the line's electromagnetic environment in Lauraycs from the factory 3D model plus metal-material electromagnetic parameters;
2. **Coverage and blind-spot assessment**: output coverage, SINR and multipath along the AGV path, locating jitter hotspots caused by metal reflection;
3. **HIL regression**: drive the real AGV communication module with the simulated channel to reproduce and validate the stability of the low-latency control link;
4. **Layout optimization**: recommend AP/antenna placement and frequency bands to tame metal reflection and fill blind spots.

## Results

- **Predicted** three weak-coverage zones before the retrofit, avoiding rework after go-live;
- AGV control-link latency and packet loss converged significantly after optimization, reaching production-grade standards;
- Produced a reusable "production-line EM twin" assessment template, so future line retrofits can be re-evaluated quickly.

## Value

The hard part of factory wireless is not coverage at any single point, but the time-varying, unpredictable nature of a metal environment. Putting the line into an EM twin moves coverage planning and reliability validation from "firefighting after the fact" to "design before the fact."

For a production-line wireless-reliability assessment, contact sales@metaradio.tech.
