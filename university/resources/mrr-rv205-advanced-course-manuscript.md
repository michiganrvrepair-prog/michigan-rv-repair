# MRR-RV205 | Advanced RV Systems Analysis, Diagnostics and Quality Assurance


Proposed 5-credit, 15-week instructional model | 45 lecture h + 30 supervised laboratory h + 150 independent study h.


Academic status: independent MRR curriculum proposal; not accredited, state-approved, GRCC credit-bearing, RVTI-authored or RVTI certification preparation authorized.


Academic prerequisite expectation: college algebra, basic physics, technical documentation and safe supervised laboratory practice.


Safety: no unqualified work on energized 120 V installations, LP-gas fittings, operating generators, trailer supports or elevated roofs. All experiments must use properly supervised and current-limited low-voltage trainers, inert mockups, or datasets.



## WEEK 01 — Technical epistemology, risk assessment, and defensible service records

### Learning outcomes

- Build a traceable evidence chain from complaint to disposition.

- Use a qualitative FMEA to prioritize risk without overstating numerical certainty.

- Defend inspection scope, referral decisions and communication with source evidence.

### Analytical lecture

A repair diagnosis is a claim about causation. It is not established by how convincingly a technician describes a symptom. Distinguish the owner's reported history, direct observation, measured data, inference, and a confirmed defect. A strong service record names the measuring instrument, operating state, unit of measurement, relevant conditions, component identification and uncertainty. For example, 'battery low' is weak; '12.1 V measured at battery terminals after 30 minutes disconnected from shore power, ambient 20°C, state of charge not independently verified' is auditable. It is still not a battery-health test.

Use a structured risk model before technical testing. In failure mode and effects analysis (FMEA), severity, occurrence and detectability can each be assigned ordinal categories, but multiplying them into a risk-priority number does not make the result a physical probability. Document the rationale for ratings and prioritize high-severity hazards even when they are uncommon. Distinguish an unsafe condition from an inconvenience and specify whether work is suspended, deferred to a specialist, or continued within a limited authorization.

A causal argument must survive alternative explanations. An inoperative receptacle after rain is consistent with moisture intrusion, loss of supply, protective-device operation, an open conductor, or equipment failure. Replacing a converter without testing the relevant DC charging path is a category error. A professional communicates hypotheses as hypotheses; a written estimate should separate confirmed work from provisional diagnosis and indicate dependencies before quoting repairs.

### Worked problem — FMEA exercise

A simulated service case rates water near a shore-power inlet as severity 5/5, occurrence 2/5, detectability 4/5. The descriptive priority index is 5×2×4 = 40. A cosmetic latch issue rated 2×5×4 = 40 has the SAME index but a very different hazard. Explain why severity-first escalation overrides a tie in the aggregate score.

### Diagnostic case

A customer reports intermittent 120 V power after heavy rain. A previous repair ticket says “bad converter” and offers no voltage data. Prepare a one-page evidence map distinguishing observations, hypotheses, contraindicated tests, and qualified referral. No attempt to energize the affected system is permitted.

### Supervised lab

Using photographs, de-energized mockups, and fictional tickets, teams perform hazard triage, identify missing test conditions, and peer-review service notes. Deliver a signed observation log and a justified stop-work decision. No live-power exposure.

### Problem set

Distinguish correlation from causation in a repair history. Provide one falsifiable test for each hypothesis that is safe within course scope.

### OEM and scholarly research

Locate an actual OEM service notice or manual for a chosen RV component. Extract its revision date, applicability, limitations, and diagnostic prerequisites.

### Graded submission

Prepare a 1,000–1,200-word technical memorandum: three competing hypotheses, a fault-tree sketch, FMEA with rating rationale, evidence hierarchy, customer-facing disclosure, and at least two appropriately cited technical references.

Rubric: technical reasoning 30; quantitative accuracy 25; source traceability 20; safety and limitations 15; communication 10. Critical safety failures require remediation.


## WEEK 02 — RV construction, load paths, moisture, and systems interfaces

### Learning outcomes

- Construct a subsystem-interface map and trace probable failure propagation.

- Compare structural and nonstructural observations using load-path reasoning.

- Estimate deformation or moisture exposure with explicitly stated assumptions.

### Analytical lecture

An RV is a mobile, coupled system—not a house installed on a trailer. Road-induced vibration and torsion, thermal cycling, water exposure, and differing material expansion rates challenge joints, penetrations, sealants, and fasteners. A local defect can travel across interfaces: a roof penetration admits moisture; substrate stiffness decreases; attachment loads redistribute; subsequent vibration increases joint movement. Diagnosis should trace the failure chain rather than isolate the most visible stain.

Load-path reasoning starts with where force enters, which components transmit it, and where reactions are supported. In an idealized axial member, deformation scales as δ = FL/(AE), where F is force, L length, A cross-sectional area, and E elastic modulus. The expression is useful conceptually but not a license to certify RV structural components; real joints are anisotropic, fastener-dependent, and subject to combined loading. Explain why adhesives and composite laminates cannot be assessed solely from surface appearance.

Inspection sequences should maximize information while minimizing disturbance. Map body, chassis, electrical, LP, and water interfaces; distinguish a manufacturing identifier from a model designation; document attachments with dated, labeled photographs. A moisture meter reading can support a comparative survey but cannot independently establish trapped water quantity, source, or structural adequacy. Record baseline conditions, likely confounders, and what invasive work would require authorization.

### Worked problem — Idealized stiffness comparison

Two axial members are the same length and material, but one has 50% more cross-sectional area. Under equal axial load, δ₂/δ₁ = A₁/A₂ = 1/1.5 ≈ 0.667. Discuss why an RV frame-to-body attachment cannot be validated from this simplified relationship alone.

### Diagnostic case

A travel trailer shows staining at a ceiling seam and a cabinet door that intermittently binds after towing. Construct a potential causal pathway linking water, structural deformation, and thermal movement. State which findings require structural referral.

### Supervised lab

On an inert RV cutaway or diagram, map force paths, identify different material interfaces, and prepare a nondestructive inspection protocol. Compare two moisture-indicator readings without making unsupported claims about water content.

### Problem set

Explain the limitations of δ = FL/(AE) for laminated walls and bolted attachments. List at least four assumptions violated in field conditions.

### OEM and scholarly research

Select two manufacturer body-care or sealant documents and compare inspection interval language without generalizing one OEM’s guidance to all RVs.

### Graded submission

Develop an annotated system-interface map with ≥20 components and eight interdependencies, a 900-word mechanical justification, and a prioritized noninvasive inspection sequence.

Rubric: technical reasoning 30; quantitative accuracy 25; source traceability 20; safety and limitations 15; communication 10. Critical safety failures require remediation.


## WEEK 03 — DC circuit modeling, conductors, and protection coordination

### Learning outcomes

- Solve series/parallel DC networks and interpret voltage drop under load.

- Compare conductor losses with nameplate performance using units and tolerances.

- Explain fault-current protection without substituting a classroom calculation for code review.

### Analytical lecture

A 12 V nominal RV distribution network is a collection of sources, impedances, loads, switches, connectors and protective devices. Kirchhoff’s current law conserves current at nodes; Kirchhoff’s voltage law sums potential changes around a loop. Under steady DC conditions, V = IR and P = VI provide first-order estimates. A successful analysis distinguishes source voltage, voltage across the load, and losses in the round-trip path. Nominal system voltage is not a guarantee that the bus remains exactly at 12.0 V under all conditions.

Conductor resistance depends on material resistivity, length, cross-sectional area and temperature. Both outbound and return conductors contribute to circuit voltage drop. If a connector is corroded, a high-resistance joint may dominate loss even with an adequately sized cable. Measure voltage drop across each section under an appropriately controlled load, rather than inferring continuity from an unloaded meter reading. A circuit can show full voltage at zero load and still be incapable of supplying operating current.

A fuse or circuit breaker protects wiring and mitigates faults within the protection scheme; its rating is not merely selected to match the appliance’s normal operating current. Correct selection depends on conductor ampacity, installation conditions, manufacturer instructions, available fault current, protective-device characteristics and applicable rules. Do not infer compliance from a quick Ohm’s law calculation. Field selection and modifications are outside the scope of this classroom trainer.

### Worked problem — Voltage-drop analysis

An isolated 12.6 V trainer supplies 12 A through a total round-trip conductor length of 8.0 m at assumed resistance 0.0063 Ω/m. R = 0.0504 Ω; ΔV = IR = 0.6048 V; load-terminal voltage ≈ 12.00 V; resistive loss = I²R ≈ 7.26 W. The drop is 4.80% of 12.6 V. Repeat for twice the current and discuss heat scaling.

### Diagnostic case

A slide-control trainer shows 12.7 V unloaded at its input but falls below 11.7 V when a 10 A simulated load engages. Model the likely series resistance; design an instrumented low-voltage test that localizes rather than guesses at the fault.

### Supervised lab

On an instructor-inspected, fused, current-limited trainer ≤12 V, measure node voltage, source current and conductor drop with two load conditions. Compare predicted and observed values; include uncertainty and a circuit schematic.

### Problem set

Compute what happens to conductor dissipation if current increases from 12 A to 18 A with constant resistance. Explain why the ratio is (18/12)² = 2.25 rather than 1.5.

### OEM and scholarly research

Use a component manufacturer’s electrical diagram to distinguish normal current draw, overcurrent protection, and permissible voltage range.

### Graded submission

Submit a quantitative lab report (1,200 words max), circuit schematic, raw data table, uncertainty budget, voltage-drop plot, and diagnosis justified against at least two fault hypotheses.

Rubric: technical reasoning 30; quantitative accuracy 25; source traceability 20; safety and limitations 15; communication 10. Critical safety failures require remediation.


## WEEK 04 — Measurement uncertainty and hypothesis-driven low-voltage diagnostics

### Learning outcomes

- Design a discriminatory test matrix for competing DC failure hypotheses.

- Separate instrument accuracy, repeatability, and circuit-state effects.

- Estimate equivalent series resistance while identifying confounding variables.

### Analytical lecture

Troubleshooting is an experimental-design problem. Select the next test for the information it can provide, not because it is easy or familiar. When several hypotheses predict the same reading, that reading is weak evidence. Compare predicted voltage signatures for a degraded supply, intermittent ground return, faulty switch, and variable load. For each experiment define controlled variables, measuring location, operating state, and stop-work conditions before touching the trainer.

A digital multimeter’s reading is not identical to the true quantity. Accuracy specifications often combine a percentage of reading and a number of display counts. Contact resistance, lead placement, temperature and transient load behavior may produce effects larger than nominal meter error. Estimate measurement uncertainty from the stated instrument specification and repeated readings. Use significant figures honestly: a display showing 12.345 V does not guarantee 1 mV accuracy.

Compare open-circuit voltage and loaded voltage to infer an apparent series resistance using R_app = (V_oc – V_load)/I, while noting that source state, dynamic behavior, wiring and connector losses are combined. R_app is not automatically the battery’s internal resistance. A systematic fault tree identifies what additional measurement would separate internal source degradation from an external connector problem.

### Worked problem — Equivalent resistance and limits

A training supply reads 12.70 V with no load and 11.95 V at 10.0 A. Apparent series resistance is (12.70–11.95)/10.0 = 0.075 Ω. If current varies by ±0.3 A and the readings drift ±0.05 V, identify why a single estimate should not be treated as an exact component value.

### Diagnostic case

A simulator exhibits intermittent loss of voltage during a “motor-start” load. There are three candidates: shared return, supply droop or corroded simulated terminal. Design a three-measurement sequence that distinguishes them.

### Supervised lab

Students collect replicated current/voltage observations on an isolated DC fault-insertion panel. Plot measurements and calculate mean, range and apparent series resistance; document any inconclusive results.

### Problem set

Given a meter specification ±(0.5% of reading + 2 counts) at 0.01 V resolution, estimate maximum stated error at 12.00 V: ±(0.060 + 0.020) V = ±0.080 V. Explain how that affects a claimed 0.05 V difference.

### OEM and scholarly research

Read a meter manual for input category limits and accuracy. Describe why a current-limited training source still does not authorize energized AC measurements.

### Graded submission

Produce a test-plan matrix with four hypotheses, predictions, safety gates, measured outcomes, uncertainty discussion and a conclusion that explicitly states what remains unknown.

Rubric: technical reasoning 30; quantitative accuracy 25; source traceability 20; safety and limitations 15; communication 10. Critical safety failures require remediation.


## WEEK 05 — Shore-power architecture, protective devices, and AC risk

### Learning outcomes

- Interpret single-line AC distribution diagrams without performing energized work.

- Quantify apparent circuit loading and distinguish watts, volts and amperes.

- Evaluate protective-device functions and unsafe fault assumptions.

### Analytical lecture

RV AC power introduces distinct conductors and functions: ungrounded (hot) conductors carry supply potential, neutral provides a designed current return where applicable, and equipment grounding conductors facilitate fault clearing. They are not interchangeable. Protective components such as overcurrent breakers, GFCI protection, and transfer equipment address different failure modes. A breaker is not a substitute for personnel shock protection, and a GFCI does not prove the absence of every hazard.

Nominal appliance loading begins with P ≈ VI for resistive or near-unity-power-factor cases. For loads with reactive components, apparent power S = VI is measured in volt-amperes and real power P = VI cosφ. Starting inrush, duty cycles, branch-circuit configuration and nameplate requirements complicate simplistic addition of rated watts. Shore connection and bonding arrangements require application of the relevant currently adopted standards and qualified review; this course does not provide installation authorization.

Diagnostic reasoning must be bounded by exposure control. Students should interpret isolated schematics, review photographs and evaluate outcomes provided by an instructor—not probe live shore-power receptacles or bypass GFCI, bonding or transfer equipment. A recurring trip may indicate leakage, overload, damaged wiring, equipment defects or an inappropriate circuit arrangement. Responsible analysis records symptom timing, load conditions and device identification before escalation.

### Worked problem — Real and apparent power

An illustrative AC load operates at 120 V and draws 10 A at power factor 0.85. Apparent power is 1,200 VA; real power is 1,020 W. Treating it as a 1,200 W resistive load misrepresents consumption. Explain why this does not by itself determine circuit compliance.

### Diagnostic case

A customer reports a GFCI trip whenever an RV is connected to shore power. Given an instructor-provided one-line diagram and hypothetical test data, categorize plausible leakage/connection hypotheses without proposing a bypass.

### Supervised lab

With no live AC: annotate one-line diagrams, identify protective boundaries using component mockups, and develop a lockout/referral checklist. The instructor demonstrates safe isolation concepts without student energized work.

### Problem set

Compute S and P for 120 V, 14 A, power factor 0.92: S = 1,680 VA and P ≈ 1,546 W. Explain why generator selection must also consider starting loads.

### OEM and scholarly research

Identify the applicable manufacturer and code-reference documents for a specific installed AC component; do not cite a general electrical blog as a substitute.

### Graded submission

Write a technical hazard review comparing branch overcurrent protection, GFCI function and grounding. Include a power-budget calculation and a decision tree for professional escalation.

Rubric: technical reasoning 30; quantitative accuracy 25; source traceability 20; safety and limitations 15; communication 10. Critical safety failures require remediation.


## WEEK 06 — Electrochemical storage, conversion losses, and off-grid energy budgets

### Learning outcomes

- Model a DC energy budget with depth-of-discharge and efficiency constraints.

- Compare energy (Wh), charge (Ah), and power (W) correctly.

- Identify limits of simplified battery and solar calculations.

### Analytical lecture

Ampere-hours measure charge delivered at a defined test regime, not energy independently of voltage. An energy approximation is E_nom ≈ V_nom × capacity_Ah. Battery chemistry, discharge rate, temperature, cell balancing, state of health and BMS operating limits affect usable capacity. A system design should separate nameplate energy, permitted usable energy, conversion losses, and reserve margin. Do not assume that voltage alone determines lithium battery state of charge.

A converter, charger, inverter and solar charge controller have different directional roles in the energy chain. The inverter’s AC output power requires greater DC input power because conversion efficiency is less than unity; standby consumption continues even when the primary load is off. Solar array nameplate watts are test-condition ratings, not daily guaranteed production. A daily yield model combines array size, equivalent sun-hours, orientation/temperature losses, controller losses and shading uncertainty. The model must be stress-tested over poor-weather days, not just averaged sunshine.

Thermal and protective constraints matter. Power dissipated as heat is P_loss = P_in – P_out. High battery discharge currents can trigger a BMS, overcurrent protection or inverter shutdown even when an advertised watt-hour capacity appears sufficient. System troubleshooting should consider transient starting loads and conductor voltage drop, never rely on bypassing protective devices.

### Worked problem — Energy chain and runtime

A nominal 12.8 V, 100 Ah battery stores about 1,280 Wh. At an assumed 80% usable fraction and 90% inverter efficiency, AC-deliverable energy ≈ 921.6 Wh. An 80 W continuous load would run about 11.5 h in this idealized model, excluding inverter idle draw and other loads.

### Diagnostic case

A camper reports that a 2,000 W inverter shuts down during hair-dryer startup despite a fully charged 300 Ah battery. Propose evidence distinguishing surge/current limit, voltage sag, BMS cutoff and wiring loss; do not recommend bypassing the BMS.

### Supervised lab

Build a spreadsheet energy model from instructor-provided nameplates and weather scenarios. Change assumed sun-hours and inverter efficiency; quantify sensitivity and document uncertainty.

### Problem set

A 300 W array produces during 3.5 equivalent sun-hours/day with combined yield factor 0.70. Estimated daily energy is 300×3.5×0.70 = 735 Wh. Compare with a 1,200 Wh/day demand and quantify deficit.

### OEM and scholarly research

Review actual battery/BMS and inverter documentation for continuous output, surge rating, temperature restrictions and protection behavior.

### Graded submission

Submit a seven-day energy audit and design memo showing daily Wh consumption, discharge reserve, converter losses, peak-W vs energy distinctions, and at least two adverse-weather scenarios.

Rubric: technical reasoning 30; quantitative accuracy 25; source traceability 20; safety and limitations 15; communication 10. Critical safety failures require remediation.


## WEEK 07 — Hydraulic network behavior and RV fresh-water fault isolation

### Learning outcomes

- Differentiate static pressure, dynamic pressure, flow rate, and pump cycling.

- Estimate demand, pressure losses and operating time using a stated model.

- Develop a noninvasive troubleshooting protocol mindful of sanitation.

### Analytical lecture

Water delivery in an RV is a small hydraulic network with storage, a pump or shore supply, check valves, distribution piping, fixtures and controls. Pressure is a potential for flow, not a measure of how many gallons actually move. A gauge can show substantial static pressure even when a clogged strainer or kinked line severely restricts flow. Distinguish a supply-side restriction from a downstream valve fault by proposing observations that change differently under each hypothesis.

Use Q = V/t for volumetric flow and the continuity relationship Q = Av for steady incompressible flow at a point, while acknowledging that pumps cycle and transient demand is not steady. Pressure losses depend on tubing diameter, length, bends and fittings. For laminar idealized flow, Poiseuille’s relation predicts strong radius sensitivity, but RV piping commonly operates outside those simplifying assumptions. Avoid inventing a pressure-loss number without the necessary piping geometry and fluid conditions.

Health and contamination concerns are part of technical competence. Evidence of a backflow event, unknown chemical exposure or cross-connection requires appropriate escalation. Students may work with clean water and isolated transparent trainers but not introduce chemicals or open contaminated wastewater components. Record the boundary between a plumbing diagnostic concept and a manufacturer-approved sanitization procedure.

### Worked problem — Flow-demand estimate

A faucet provides 3.5 gal/min for 2.0 min: V = Qt = 7.0 gal. A 30-gal freshwater tank would contain 23 gal afterward only if initially full, the flow is constant, there are no other uses and the pump draws solely from that tank.

### Diagnostic case

Two fixtures exhibit reduced flow only when operated together; the pump cycles rapidly at a single fixture. Compare hypotheses involving pump performance, aerator restrictions, trapped air and tank draw.

### Supervised lab

Use a clear-tube low-pressure water demonstrator with no chemicals or utility interconnection. Measure tank draw, simulated pressure indication and fixture flow at two controlled settings.

### Problem set

If a trainer supplies 4.0 L/min for 75 s, determine liters delivered: 4.0×(75/60) = 5.0 L. Express assumptions for a continuously varying pump.

### OEM and scholarly research

Use an OEM pump performance curve and compare rated free-flow to operation under a specified pressure.

### Graded submission

Create a hydraulic system block diagram, calculate three timed-flow scenarios, interpret a diagnostic data sheet, and write a customer-facing noninvasive assessment memo.

Rubric: technical reasoning 30; quantitative accuracy 25; source traceability 20; safety and limitations 15; communication 10. Critical safety failures require remediation.


## WEEK 08 — Wastewater mass balance, biohazard controls, and winterization planning

### Learning outcomes

- Quantify liquid volume and vehicle mass effects while stating uncertainty.

- Create a process map that separates clean-water and waste-water exposure.

- Audit a winterization plan against OEM-specific component vulnerabilities.

### Analytical lecture

Fresh, grey and black tanks have distinct functions and hazards. Tank sensors may report unreliable levels when fouled, so a displayed percentage should not be treated as precise inventory. Wastewater introduces biological exposure risks; open drains, tank vents and sewage connections are not appropriate for introductory student handling. An evidence-based training exercise can use isolated diagrams and clean-water demonstration units to teach mass balance without exposing students to contaminated media.

Mass balance can be written as accumulation = inflow – outflow over the analysis interval. When a trailer carries additional water, its total weight increases and remaining cargo capacity decreases. For water, a common approximation is 8.34 lb/US gal at ordinary conditions. Distribution among tanks matters because it shifts axle and tongue reactions. A tank-level change also has dynamic consequences during travel, including slosh and transient loads, even when the total mass remains constant.

Winterization is a system-level design problem: identify every water-holding component, bypass and low point; consult the specific manufacturer instructions; define inspection verification and records. A generic checklist can overlook an icemaker, tankless water-heater path, washer or external shower. Do not prescribe a single antifreeze or chemical routine across all models. Course work emphasizes document traceability and planning, not unapproved chemical operations.

### Worked problem — Water-to-payload calculation

A 35-gallon tank of water adds approximately 35×8.34 = 291.9 lb. If a trailer has only 500 lb of remaining payload capacity before filling, the theoretical remainder falls to about 208 lb, assuming no other cargo changes.

### Diagnostic case

A customer reports freeze damage after a prior winterization; the invoice lists “winterized” with no appliance inventory or verification details. Analyze how incomplete system mapping prevents a defensible warranty conclusion.

### Supervised lab

Trace a mock RV water system from diagrams and flag hidden branch lines, pump bypasses, heaters and low points. Estimate mass effects for alternative fill states. No wastewater handling.

### Problem set

Translate a 22-gal grey tank rise into estimated water weight (22×8.34 ≈ 183.5 lb). Explain why tank-monitor readings alone may not support that precision.

### OEM and scholarly research

Compare two manufacturer winterization instructions for different water-heater configurations; identify non-transferable steps.

### Graded submission

Prepare a model-specific winterization risk register with ≥12 checkpoints, evidence type for each, uncertainty notes, and a post-procedure verification plan tied to actual OEM sources.

Rubric: technical reasoning 30; quantitative accuracy 25; source traceability 20; safety and limitations 15; communication 10. Critical safety failures require remediation.


## WEEK 09 — Liquefied-petroleum gas: thermodynamics, combustion, and risk boundaries

### Learning outcomes

- Explain LP-system energy flow and combustion hazards at a conceptual level.

- Estimate idealized fuel consumption with explicit conversion assumptions.

- Recognize when all practical work must be referred to qualified personnel.

### Analytical lecture

An RV LP-gas installation includes a fuel container, vaporization process, pressure regulation, distribution, appliance controls and exhaust pathways. Pressure and phase behavior depend on temperature and mixture; a cylinder is not simply a constant-pressure gas reservoir. A device that burns fuel indoors introduces risks associated with incomplete combustion, inadequate ventilation, faulty venting and carbon monoxide. A general-purpose electronic detector is not a substitute for correct installation and professional evaluation.

Energy analysis can estimate theoretical fuel-use duration from the chemical energy content of fuel divided by burner input, but it does not establish appliance efficiency or safe operating time. For an illustrative 20 lb propane quantity, multiplying by roughly 21,500 Btu/lb yields approximately 430,000 Btu of chemical energy. At an input rating of 24,000 Btu/h, simple arithmetic yields about 17.9 hours of burner-on time; actual performance depends on duty cycle, available vaporization, load, regulation and other consumers.

Students must not manipulate LP regulators, leak-test pressurized fuel systems, defeat flame controls, light burners, adjust combustion or conduct live appliance servicing. In this course, hazard recognition is taught through simulated schematics, incident narratives and inert parts. The right response to suspected leakage, damaged venting or CO symptoms is immediate appropriate safety action and qualified referral under a documented emergency plan.

### Worked problem — Idealized input-energy budget

20 lb × 21,500 Btu/lb = 430,000 Btu. 430,000 Btu ÷ 24,000 Btu/h ≈ 17.9 h at continuously rated input. This is a simplified capacity estimate, not a performance or safety certification.

### Diagnostic case

An occupant reports headache and a CO alarm while a furnace is operating. Build an incident-response communication and referral memo; do not propose a technician experiment involving operation of the appliance.

### Supervised lab

Compare inert regulators, shutoff images and venting schematics; identify hazardous assumptions in a mock service ticket. Grade risk recognition, not system adjustment.

### Problem set

If two appliances have rated inputs of 24,000 and 8,000 Btu/h, calculate combined input and the idealized runtime for 430,000 Btu: 32,000 Btu/h, ≈13.4 h. State three reasons this is not a field prediction.

### OEM and scholarly research

Find current OEM operating limitations for an actual LP appliance; specify its model and the provenance of each instruction.

### Graded submission

Compose a combustion hazard briefing that distinguishes CO, oxygen depletion, ventilation and pressure regulation; include an energy calculation and an emergency escalation decision tree.

Rubric: technical reasoning 30; quantitative accuracy 25; source traceability 20; safety and limitations 15; communication 10. Critical safety failures require remediation.


## WEEK 10 — RV thermal systems, refrigeration, and appliance diagnostics

### Learning outcomes

- Relate thermal loads, electrical input and coefficient of performance.

- Differentiate refrigeration, ventilation and combustion-related failure modes.

- Interpret duty-cycle and temperature trends without unsupported component replacement.

### Analytical lecture

Air-conditioning capacity and electrical input are not interchangeable. A rooftop unit may remove heat at a rate expressed in Btu/h while consuming electrical power in watts. The coefficient of performance (COP) is useful when cooling heat transfer and input power use consistent energy/time units. In a simplified vapor-compression cycle, the compressor raises refrigerant pressure, the condenser rejects heat, the expansion device reduces pressure, and the evaporator absorbs indoor heat. Real COP varies with outdoor temperature, airflow, load, condition and equipment design.

Thermal diagnosis requires appropriate boundary conditions. An interior air temperature is not enough to identify low refrigerant, dirty coils, undersized equipment, recirculation, poor electrical supply or excessive envelope heat gain. A proper analytic record includes ambient dry-bulb conditions, return and supply temperatures, fan state, load history and the OEM's approved measurement method. Do not diagnose a sealed refrigeration circuit from a single temperature difference.

RV absorption refrigerators and gas appliances follow fundamentally different energy-conversion and safety processes than compressor-driven refrigeration. A technician must identify the appliance type before applying a mental model. Because these devices may involve LP gas, AC power, sealed refrigerant systems and combustion venting, this course restricts direct student work to diagrams, inert demonstrations and manufacturer-supplied datasets.

### Worked problem — Thermal capacity conversion

13,500 Btu/h ÷ 3.412 ≈ 3,956 W of cooling. If illustrative COP = 2.5, required electric input ≈ 1,582 W. The result is a model estimate; actual starting current, fan load, test conditions and equipment data control field decisions.

### Diagnostic case

An RV AC runs but does not cool adequately on a hot afternoon. The owner suspects refrigerant loss. Given temperature, shading, fan and power data, rank at least four hypotheses and identify noninvasive tests.

### Supervised lab

Analyze time-series thermal measurements from instructor-provided data; graph indoor temperature response and explain why correlation with compressor cycling does not prove a refrigerant defect.

### Problem set

An idealized unit removes 9,000 Btu/h while consuming 1,100 W. Cooling rate ≈2,638 W; COP ≈2.40. Explain how ambient temperature and airflow affect interpretation.

### OEM and scholarly research

Locate OEM performance and installation documents for a specific RV rooftop AC; distinguish performance tables from marketing capacity ratings.

### Graded submission

Prepare a comparative engineering report on compressor refrigeration, absorption refrigeration and forced-air heating, with energy-flow diagrams and a climate/load sensitivity analysis.

Rubric: technical reasoning 30; quantitative accuracy 25; source traceability 20; safety and limitations 15; communication 10. Critical safety failures require remediation.


## WEEK 11 — Generator power quality, load allocation, and interconnection safeguards

### Learning outcomes

- Develop a generator load schedule including starting and continuous loads.

- Identify the consequences of unsafe source interconnection.

- Apply a fault-tree model to a power-availability complaint.

### Analytical lecture

A generator provides electrical power by converting fuel energy into shaft work and then into electrical output; the system involves prime mover control, voltage/frequency regulation, cooling, exhaust and protection. Rated output depends on conditions, and appliance starting currents can exceed steady-state demands. A list of nameplate watts may miss motor starting peaks, battery charging loads, simultaneous-operation patterns and duty cycle.

Power source selection involves a transfer mechanism and the prevention of unintended backfeed. Incorrect interconnection can expose users and utility personnel to severe hazards. This course therefore teaches source-selection diagrams only: no generator starting, fuel handling, exhaust work, source-paralleling, or electrical modification. Evaluate proposed configurations against the specific equipment instructions and appropriate professional review.

Effective fault isolation distinguishes a generator that does not start from one that starts but fails to deliver usable power, and from a case where load-side distribution does not receive power. Each failure class implies different evidence. A good report identifies preconditions, nameplate data, historical patterns, fault indications and whether protective devices have operated; it does not promote indiscriminate resetting.

### Worked problem — Load fraction and reserve

A nominal 3,600 W generator supplies simulated concurrent loads of 1,600 W and 900 W: 2,500 W total, about 69.4% of rating. The arithmetic leaves 1,100 W nominal headroom before considering starting surge, altitude, temperature, power factor and equipment restrictions.

### Diagnostic case

Shore power works, the generator starts, but several AC loads remain inactive. Interpret an instructor-provided distribution one-line diagram and identify what qualified diagnostic data would discriminate transfer-device versus downstream faults.

### Supervised lab

Design a load-scheduling spreadsheet and annotate a de-energized source-selection diagram. Evaluate a simulated overload event using data only; no live generator operation.

### Problem set

A 3,600 W rating is compared to a 2,500 W load: 69.4% utilization. Add a 1,500 W motor starting event and explain why transient capability cannot be inferred from continuous rating alone.

### OEM and scholarly research

Use a genuine generator nameplate/manual to distinguish rated, surge, derated and altitude-related constraints.

### Graded submission

Submit a generator systems analysis with capacity scenarios, expected transfer states, hazard register and evidence-based explanation of three alternate causes of power loss.

Rubric: technical reasoning 30; quantitative accuracy 25; source traceability 20; safety and limitations 15; communication 10. Critical safety failures require remediation.


## WEEK 12 — Envelope durability, rainfall exposure, and evidence-based moisture diagnosis

### Learning outcomes

- Explain moisture ingress as a multi-path transport process.

- Calculate exposure volumes while distinguishing rain contact from leak volume.

- Design a traceable roof and sidewall inspection evidence package.

### Analytical lecture

An RV enclosure faces wind-driven rain, capillary action, pressure differences, thermal movement, vapor diffusion and mechanical vibration. A roof stain is not a uniquely identifying signature of the entry point. Water can travel along framing or wiring before appearing at a ceiling seam. Diagnostic reasoning therefore separates entry, transport path, accumulation and visible manifestation. Replacing all sealant without identifying the governing failure mechanism may conceal rather than resolve a problem.

Materials have different thermal expansion, stiffness, adhesion and moisture behavior. Sealant selection depends on compatibility with the actual roof membrane, substrate and manufacturer maintenance instructions. Adhesive bond performance is affected by contamination, surface energy, cure conditions and joint geometry. A generic statement that a product is 'RV safe' cannot substitute for the OEM’s approved material specification.

Quantitative exposure estimates are useful for appreciating scale but should never be mislabeled as actual water intrusion. Rainfall depth multiplied by exposed area gives incident water volume; it does not say what fraction crosses a breach. Photographs must be labeled with location and scale, moisture instrument readings must identify conditions, and inspection reports should state which regions were inaccessible and which conclusions remain provisional.

### Worked problem — Incident rainfall volume

For an idealized horizontal 100 ft² roof receiving 0.50 in rain: V = 100 ft² × (0.5/12) ft × 7.4805 gal/ft³ ≈ 31.2 gal incident rain. This is NOT 31.2 gallons leaked into the RV; runoff and infiltration fraction are unknown.

### Diagnostic case

A customer sees dampness at a rear closet only during highway travel after rain. Compare wind-driven ingress, roof penetration failure, sidewall interface and condensation hypotheses.

### Supervised lab

Inspect calibrated photographs and benign mock joints; assemble a defect matrix documenting orientation, suspected pathway, confidence and OEM document needs. No climbing or roof access.

### Problem set

Double the assumed rainfall depth in the worked example: incident volume doubles to ~62.3 gal. Explain why the relationship between rain depth and interior damage need not be linear.

### OEM and scholarly research

Compare two actual OEM roof-maintenance bulletins for inspection interval and sealant compatibility; cite model applicability.

### Graded submission

Prepare a roof-system forensic memo with a scaled leak-path diagram, compatibility decision chart, evidence quality analysis and staged inspection plan.

Rubric: technical reasoning 30; quantitative accuracy 25; source traceability 20; safety and limitations 15; communication 10. Critical safety failures require remediation.


## WEEK 13 — Trailer dynamics, load distribution, tires, brakes, and weight compliance

### Learning outcomes

- Perform static load reconciliation using scale-ticket style data.

- Explain why combined axle capacity does not prove per-axle compliance.

- Prioritize critical unknowns in a towing readiness assessment.

### Analytical lecture

A trailer’s rated limits operate at several levels: gross vehicle weight rating (GVWR), gross axle weight ratings (GAWR), component ratings and tow-vehicle limitations. Weight distribution is not captured by a single 'dry weight' advertisement. Static force equilibrium requires the sum of support reactions to equal total weight, but individual axle and tongue reactions depend on cargo location and geometry. A combined axle scale measurement cannot reveal whether one axle is overloaded.

For a simplified static beam, moments about a support location relate load magnitudes and distances. Cargo moved behind the axle group can reduce tongue reaction while raising or redistributing axle forces; this does not imply safe handling. Dynamic factors such as braking, road input and sway are not resolved by a static worksheet. Document the origin and date of every rating and scale reading before drawing a compliance conclusion.

Brakes, bearings, tires and suspension components are safety critical. Proper inspection requires manufacturer procedures, appropriate lifting and support, calibrated tools, and trained personnel. The course does not authorize lifting a trailer or servicing brakes/bearings. Case studies use photographs, component data and simulated tickets to practice identifying when a vehicle must be removed from service or professionally inspected.

### Worked problem — Scale-ticket reconciliation

Illustrative trailer: GVWR 7,600 lb; measured combined axle reaction 6,500 lb; measured tongue reaction 800 lb. Estimated gross trailer weight = 7,300 lb, leaving 300 lb below GVWR. This does NOT prove compliance with any individual GAWR, tire rating, hitch rating or tow-vehicle limit.

### Diagnostic case

A loaded trailer has an acceptable total scale weight but abnormal tire heating on one side. Explain why aggregate GVWR compliance is insufficient and describe qualified next steps.

### Supervised lab

Interpret synthetic individual-axle and tongue scale tickets; reconcile totals, identify missing ratings and annotate a free-body diagram. No jacking, towing or mechanical work.

### Problem set

Using the illustrative 7,300 lb total and 7,600 lb GVWR, calculate 3.95% nominal remaining GVWR margin. Discuss why a margin near zero must be interpreted cautiously.

### OEM and scholarly research

Identify vehicle manufacturer labels and OEM documentation needed to verify GAWR, GVWR, tire loading and hitch limitations.

### Graded submission

Complete a towing-readiness analysis with rating-source table, payload scenarios, two support-reaction calculations and a risk communication letter.

Rubric: technical reasoning 30; quantitative accuracy 25; source traceability 20; safety and limitations 15; communication 10. Critical safety failures require remediation.


## WEEK 14 — Pre-delivery inspection quality systems and customer-facing evidence

### Learning outcomes

- Design a repeatable inspection protocol with disposition and verification logic.

- Evaluate false positives, false negatives and limits of observational tests.

- Prepare a professional customer briefing and defensible unresolved-item list.

### Analytical lecture

Pre-delivery inspection is a quality-assurance process designed to establish the observable condition of an RV at a defined moment, not a promise that every component is defect-free. A useful procedure specifies prerequisites, test method, measurement, acceptance criterion, evidence to retain and disposition when criteria are not met. An unobserved test cannot be reported as 'passed'. Distinguish 'not tested', 'not applicable', 'inconclusive' and 'failed'.

Inspection quality can be assessed with the logic of diagnostic tests. A false negative occurs when the process fails to detect a condition that exists; a false positive occurs when it flags a problem incorrectly. Increasing inspection coverage often improves detection but requires time, skills and access. A worksheet should prioritize life-safety hazards, document component-specific instructions and include reinspection after corrective work. The institution must determine which checks require certified staff.

The final customer document translates technical evidence into an informed decision. It should name confirmed findings, reasons for referral, unresolved risk, test exclusions, recommended next steps and authorization required. Ethical language avoids claims like 'everything tested good' when only a partial systems survey occurred. Customer education must preserve the distinction between normal operation, observed anomaly, and unverified expectation.

### Worked problem — Inspection classification

In a simulated set of 100 known inspection cases, an inspection flags 18 of 20 actual defects and flags 8 of 80 acceptable cases. Sensitivity = 18/20 = 90%; specificity = 72/80 = 90%. Explain why simulated performance does not establish actual field accuracy.

### Diagnostic case

A PDI form lists all items “passed,” yet there is no record of the water system operating and shore power was unavailable. Rewrite the report with valid status language and a customer follow-up plan.

### Supervised lab

Perform a non-invasive PDI on an inert lab rig or simulated dataset. Peer-review evidence attachments and classify each observation using a standardized disposition code.

### Problem set

Given 18 true positives, 2 false negatives, 8 false positives, and 72 true negatives, compute sensitivity, specificity and positive predictive value (18/26 ≈ 69.2%). Interpret the base-rate effect.

### OEM and scholarly research

Compare a manufacturer PDI checklist with a generic template and justify additional model-specific checks.

### Graded submission

Submit a model-specific inspection plan, completed simulated inspection, evidence index, defect-priority log and a two-minute oral customer briefing scored against a communication rubric.

Rubric: technical reasoning 30; quantitative accuracy 25; source traceability 20; safety and limitations 15; communication 10. Critical safety failures require remediation.


## WEEK 15 — Integrated diagnostic capstone, oral defense, and technical portfolio

### Learning outcomes

- Integrate seven RV systems in a coherent, evidence-based fault analysis.

- Defend a sequence of safe discriminating tests and evaluate alternative causal models.

- Present a reproducible portfolio with calculations, references, limitations and corrective actions.

### Analytical lecture

Advanced technical practice integrates evidence across subsystem boundaries. A low-voltage event may affect a slide controller, water pump, thermostat and power transfer diagnostics; visible correlation across components may point to a shared supply, common return, protective device or operating condition. A capstone should avoid assuming a single root cause merely because the symptoms began together. Each proposed test must specify what distinct results would mean for competing hypotheses.

A strong capstone report is reproducible. Include the complaint history, system architecture, measured and assumed quantities, instrument condition, calculation work, source limitations, fault-tree revision history and final disposition. Distinguish a confirmed root cause from a most-likely explanation when the approved lab cannot reproduce a field failure. Where evidence is insufficient, a qualified referral with a focused test plan is a legitimate and professionally responsible outcome.

The oral defense is not a memory contest. Students must explain why their chosen test came before a different test, quantify the significance of a finding, evaluate safety boundaries, and respond to a challenge involving alternative interpretations. Technical competence includes the willingness to revise a conclusion when new evidence contradicts it.

### Worked problem — Cross-system synthesis

An isolated DC trainer reads 12.6 V unloaded and 11.8 V with an 8 A simulated motor load. Apparent series resistance = (12.6–11.8)/8 = 0.10 Ω. If the 12 V pump and control panel share the same return, propose a discriminating voltage-drop test before condemning either load.

### Diagnostic case

Simulated RV: the pump stops intermittently when a slide is commanded, the charging system reports normal status, and a customer reports prior rain exposure. Investigate shared ground, protective device, supply sag, harness damage and observational bias using a provided evidence packet.

### Supervised lab

Teams defend an instrumented low-voltage diagnostic demonstration on a fused, current-limited trainer. The instructor evaluates safe setup, measurement repeatability, hypothesis testing, interpretation and documentation.

### Problem set

A final answer must present at least one hypothesis disproved by test evidence and one unresolved issue with an ethical customer communication recommendation.

### OEM and scholarly research

Cite at least four manufacturer/standards-level documents and identify which guidance is model-specific rather than universally applicable.

### Graded submission

Submit a capstone technical dossier (2,000–2,500 words plus appendices), complete raw data, model diagrams, three computed analyses, a defensible fault tree, risk disposition, and a ten-minute oral defense.

Rubric: technical reasoning 30; quantitative accuracy 25; source traceability 20; safety and limitations 15; communication 10. Critical safety failures require remediation.