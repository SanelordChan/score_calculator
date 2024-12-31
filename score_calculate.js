/***********************************************************************************************************************************************
Filename:	score_calculate.js
Created by:	Sanelord Chan
Revision:	v1.2
History:
v1.2 - Added the actual total pins and the total sum pins are shown in the form.
v1.1 - Fixed the two calculation errors that were show in the box of Handicap and Gross total when the player who get over 300 points in a certain game.
v1.0 - The first complete version
************************************************************************************************************************************************/
let ptA, ptB;

function addLog(string, newLine) {
	document.getElementById("log").innerHTML += string;
	if(newLine) {
		document.getElementById("log").innerHTML += "<br>";
	};
}

function clearLog() {
    document.getElementById("log").innerHTML = "";
}

function resetAll() {
	document.getElementById("Tpins_A1G1").innerHTML = "--";
	document.getElementById("Tpins_A1G2").innerHTML = "--";
	document.getElementById("Tpins_A1G3").innerHTML = "--";
	document.getElementById("Tpins_A1G4").innerHTML = "--";
	
	document.getElementById("Tpins_B1G1").innerHTML = "--";
	document.getElementById("Tpins_B1G2").innerHTML = "--";
	document.getElementById("Tpins_B1G3").innerHTML = "--";
	document.getElementById("Tpins_B1G4").innerHTML = "--";
	
	document.getElementById("Ppoint_A1G1").innerHTML = "--";
	document.getElementById("Ppoint_A1G2").innerHTML = "--";
	document.getElementById("Ppoint_A1G3").innerHTML = "--";
	document.getElementById("Ppoint_A1G4").innerHTML = "--";
	
	document.getElementById("Ppoint_B1G1").innerHTML = "--";
	document.getElementById("Ppoint_B1G2").innerHTML = "--";
	document.getElementById("Ppoint_B1G3").innerHTML = "--";
	document.getElementById("Ppoint_B1G4").innerHTML = "--";
	
	document.getElementById("Tpins_A2G1").innerHTML = "--";
	document.getElementById("Tpins_A2G2").innerHTML = "--";
	document.getElementById("Tpins_A2G3").innerHTML = "--";
	document.getElementById("Tpins_A2G4").innerHTML = "--";
	
	document.getElementById("Tpins_B2G1").innerHTML = "--";
	document.getElementById("Tpins_B2G2").innerHTML = "--";
	document.getElementById("Tpins_B2G3").innerHTML = "--";
	document.getElementById("Tpins_B2G4").innerHTML = "--";
	
	document.getElementById("Ppoint_A2G1").innerHTML = "--";
	document.getElementById("Ppoint_A2G2").innerHTML = "--";
	document.getElementById("Ppoint_A2G3").innerHTML = "--";
	document.getElementById("Ppoint_A2G4").innerHTML = "--";
	
	document.getElementById("Ppoint_B2G1").innerHTML = "--";
	document.getElementById("Ppoint_B2G2").innerHTML = "--";
	document.getElementById("Ppoint_B2G3").innerHTML = "--";
	document.getElementById("Ppoint_B2G4").innerHTML = "--";
}


function pageInit() {
	// addLog("<font color='green'>Page loaded</font>", true);
	resetAll();	
}

function getInput(id, max) {
	let value = -1;
	if(document.getElementById(id).value.length != 0) {
		value = document.getElementById(id).value;
		if(isNaN(value)) {
			value = -1;
		}
		else if(value > max) {
			value = -1;
		}
	}
	return value;
}

function sumPin300(pin1, pin2) {
	let result = -1;
	if((pin1 != -1) & (pin2 != -1)) {
		result = Number(pin1) + Number(pin2);
		// addLog("sumPin300() result = " + result.toString(10), true);
		if(result > 300) {
			result = 300;
		}
	}
	return result;
}

function sumPin(pin1, pin2) {
	let result = -1;
	if((pin1 != -1) & (pin2 != -1)) {
		result = Number(pin1) + Number(pin2);
		// addLog("sumPin() result = " + result.toString(10), true);
	}
	return result;
}

function sumHandicap(hcap1, hcap2, pin1, pin2) {
	let result = -1;
	let h1, h2;
	
	if((hcap1 != -1) & (hcap2 != -1) & (pin1 != -1) & (pin2 != -1))
	{
		h1 = Number(hcap1);
		h2 = Number(hcap2);
		
		if((Number(hcap1) + Number(pin1)) > 300) {
			h1 = (300 - Number(pin1));
		}
		else {
		}
		if((Number(hcap2) + Number(pin2)) > 300) {
			h2 = (300 - Number(pin2));
		}
		result = h1 + h2;
	}
	return result;
}

function setPinValue(id, pin) {
	if(pin != -1) {
		if((id == "Tpins_A1G1") | (id == "Tpins_A1G2") | (id == "Tpins_A1G3") | (id == "Tpins_A1G4") |
		   (id == "Tpins_A2G1") | (id == "Tpins_A2G2") | (id == "Tpins_A2G3") | (id == "Tpins_A2G4") |
		   (id == "Tpins_B1G1") | (id == "Tpins_B1G2") | (id == "Tpins_B1G3") | (id == "Tpins_B1G4") |
		   (id == "Tpins_B2G1") | (id == "Tpins_B2G2") | (id == "Tpins_B2G3") | (id == "Tpins_B2G4")) {

			if(pin < 155) {
				document.getElementById(id).innerHTML = "<font color='red'>" + pin.toString(10) + "</font>";
			}
			else if(pin >= 250) {
				document.getElementById(id).innerHTML = "<font color='blue'>" + pin.toString(10) + "</font>";
			}
			else {
				document.getElementById(id).innerHTML = pin.toString(10);
			}
		}
		else {
			document.getElementById(id).innerHTML = pin.toString(10);
		}
	}
	else {
		document.getElementById(id).innerHTML = "<font color='brown'>N/A</font>";
	}
}

function setTotalPinValue(id1, id2, actual_pins1, actual_pins2, total_pins1, total_pins2) {
	let str_1 = "--";
	let str_2 = "--";
	
	if((id1 != -1) & (actual_pins1 != -1) & (total_pins1 != -1) &
	   (id2 != -1) & (actual_pins2 != -1) & (total_pins2 != -1)) {
		
		if(actual_pins1 == actual_pins2) {
			str_1 = actual_pins1.toString(10) + " / ";
			str_2 = actual_pins2.toString(10) + " / ";
		}
		else if(actual_pins1 > actual_pins2) {
			str_1 = "<font color='blue'>" + actual_pins1.toString(10) + "</font>" + " / ";
			str_2 = actual_pins2.toString(10) + " / ";
		}
		else {
			str_1 = actual_pins1.toString(10) + " / ";
			str_2 = "<font color='blue'>" + actual_pins2.toString(10) + "</font>" + " / ";
		}	
		str_1 = str_1.fontsize(5);
		str_2 = str_2.fontsize(5);
		
		if(total_pins1 == total_pins2) {
			str_1 += total_pins1.toString(10);
			str_2 += total_pins2.toString(10);
		}
		else if(total_pins1 > total_pins2) {
			str_1 += "<font color='blue'>" + total_pins1.toString(10) + "</font>";
			str_2 += total_pins2.toString(10);
		}
		else {
			str_1 += total_pins1.toString(10);
			str_2 += "<font color='blue'>" + total_pins2.toString(10) + "</font>";
		}		
		str_1 = str_1.fontsize(5);
		str_2 = str_2.fontsize(5);
	}
	document.getElementById(id1).innerHTML = str_1;
	document.getElementById(id2).innerHTML = str_2;
	document.getElementById(id1).style.fontWeight = "700";
	document.getElementById(id2).style.fontWeight = "700";
}

function setPoint(idA, pinA, idB, pinB) {
	let pp_a = "--";
	let pp_b = "--";

	if((pinA != -1) & (pinB != -1)) {
		if(pinA > pinB) {
			ptA += 1;
			pp_a = "<font color='blue'>1</font>";
			pp_b = "0";
		}
		else if(pinA < pinB) {
			ptB += 1;
			pp_a = "0";
			pp_b = "<font color='blue'>1</font>";
		}
		else {
			ptA += 0.5;
			ptB += 0.5;
			pp_a = "0.5";
			pp_b = "0.5";
		}
	}
	document.getElementById(idA).innerHTML = pp_a;
	document.getElementById(idB).innerHTML = pp_b;
	document.getElementById(idA).style.fontWeight = "700";
	document.getElementById(idB).style.fontWeight = "700";
}

function setTotalPoint(idA, pinA, idB, pinB) {
	let pp_a = "--";
	let pp_b = "--";

	if((pinA != -1) & (pinB != -1)) {
		if(pinA > pinB) {
			ptA += 2;
			pp_a = "<font color='blue'>2</font>";
			pp_b = "0";
		}
		else if(pinA < pinB) {
			ptB += 2;
			pp_a = "0";
			pp_b = "<font color='blue'>2</font>";
		}
		else {
			ptA += 1;
			ptB += 1;
			pp_a = "1";
			pp_b = "1";
		}
	}
	document.getElementById(idA).innerHTML = pp_a;
	document.getElementById(idB).innerHTML = pp_b;
	document.getElementById(idA).style.fontWeight = "700";
	document.getElementById(idB).style.fontWeight = "700";
}

function setResultPoint(idA, idB) {
	let pp_a = "--";
	let pp_b = "--";

	if((ptA + ptB) == 16) {
		if(ptA > ptB) {
			pp_a = "<font color='blue'>" + ptA.toString(10) + "</font>";
			pp_b = ptB.toString(10);
		}
		else if(ptA < ptB) {
			pp_a = ptA.toString(10);
			pp_b = "<font color='blue'>" + ptB.toString(10) + "</font>";
		}
		else {
			pp_a = ptA.toString(10);
			pp_b = ptB.toString(10);
		}
	}
	pp_a = pp_a.fontsize(10);
	pp_b = pp_b.fontsize(10);
	document.getElementById(idA).innerHTML = pp_a;
	document.getElementById(idB).innerHTML = pp_b;
}

function calculate() {
	let pA1_hcap, pA1_g1Pin, pA1_g2Pin, pA1_g3Pin, pA1_g4Pin;
	let pA2_hcap, pA2_g1Pin, pA2_g2Pin, pA2_g3Pin, pA2_g4Pin;
	let pB1_hcap, pB1_g1Pin, pB1_g2Pin, pB1_g3Pin, pB1_g4Pin;
	let pB2_hcap, pB2_g1Pin, pB2_g2Pin, pB2_g3Pin, pB2_g4Pin;
	let pinA, pinB;
	let tA_g1, tA_g2, tA_g3, tA_g4;
	let tB_g1, tB_g2, tB_g3, tB_g4;
	let totalA, totalB;

	// reset points counter
	ptA = 0;
	ptB = 0;

	// get all inputs
	pA1_hcap  = getInput("Hcap_A1", 35);
	pA1_g1Pin = getInput("Pins_A1G1", 300);
	pA1_g2Pin = getInput("Pins_A1G2", 300);
	pA1_g3Pin = getInput("Pins_A1G3", 300);
	pA1_g4Pin = getInput("Pins_A1G4", 300);
	
	pA2_hcap  = getInput("Hcap_A2", 35);
	pA2_g1Pin = getInput("Pins_A2G1", 300);
	pA2_g2Pin = getInput("Pins_A2G2", 300);
	pA2_g3Pin = getInput("Pins_A2G3", 300);
	pA2_g4Pin = getInput("Pins_A2G4", 300);
	
	pB1_hcap  = getInput("Hcap_B1", 35);
	pB1_g1Pin = getInput("Pins_B1G1", 300);
	pB1_g2Pin = getInput("Pins_B1G2", 300);
	pB1_g3Pin = getInput("Pins_B1G3", 300);
	pB1_g4Pin = getInput("Pins_B1G4", 300);
	
	pB2_hcap  = getInput("Hcap_B2", 35);
	pB2_g1Pin = getInput("Pins_B2G1", 300);
	pB2_g2Pin = getInput("Pins_B2G2", 300);
	pB2_g3Pin = getInput("Pins_B2G3", 300);
	pB2_g4Pin = getInput("Pins_B2G4", 300);

	// verify all inputs...
	// clearLog();
	// addLog("playerA1: " + pA1_hcap.toString(10) + ", " + pA1_g1Pin.toString(10) + ", "
	// 					+ pA1_g2Pin.toString(10) + ", " + pA1_g3Pin.toString(10) + ", "
	// 					+ pA1_g4Pin.toString(10), true);
	// addLog("playerA2: " + pA2_hcap.toString(10) + ", " + pA2_g1Pin.toString(10) + ", "
	// 					+ pA2_g2Pin.toString(10) + ", " + pA2_g3Pin.toString(10) + ", "
	// 					+ pA2_g4Pin.toString(10), true);
	// addLog("playerB1: " + pB1_hcap.toString(10) + ", " + pB1_g1Pin.toString(10) + ", "
	// 					+ pB1_g2Pin.toString(10) + ", " + pB1_g3Pin.toString(10) + ", "
	// 					+ pB1_g4Pin.toString(10), true);
	// addLog("playerB2: " + pB2_hcap.toString(10) + ", " + pB2_g1Pin.toString(10) + ", "
	// 					+ pB2_g2Pin.toString(10) + ", " + pB2_g3Pin.toString(10) + ", "
	// 					+ pB2_g4Pin.toString(10), true);

	// Reset all number on HTML page
	resetAll();

	// Team player 1 pins counting...

		// Game 1
		pinA = sumPin300(pA1_hcap, pA1_g1Pin);
		pinB = sumPin300(pB1_hcap, pB1_g1Pin);
		setPinValue("Tpins_A1G1", pinA);
		setPinValue("Tpins_B1G1", pinB);
		setPoint("Ppoint_A1G1", pinA, "Ppoint_B1G1", pinB);

		// Game 2
		pinA = sumPin300(pA1_hcap, pA1_g2Pin);
		pinB = sumPin300(pB1_hcap, pB1_g2Pin);
		setPinValue("Tpins_A1G2", pinA);
		setPinValue("Tpins_B1G2", pinB);
		setPoint("Ppoint_A1G2", pinA, "Ppoint_B1G2", pinB);

		// Game 3
		pinA = sumPin300(pA1_hcap, pA1_g3Pin);
		pinB = sumPin300(pB1_hcap, pB1_g3Pin);
		setPinValue("Tpins_A1G3", pinA);
		setPinValue("Tpins_B1G3", pinB);
		setPoint("Ppoint_A1G3", pinA, "Ppoint_B1G3", pinB);

		// Game 4
		pinA = sumPin300(pA1_hcap, pA1_g4Pin);
		pinB = sumPin300(pB1_hcap, pB1_g4Pin);
		setPinValue("Tpins_A1G4", pinA);
		setPinValue("Tpins_B1G4", pinB);
		setPoint("Ppoint_A1G4", pinA, "Ppoint_B1G4", pinB);

	// Team player 2 pins counting...

		// Game 1
		pinA = sumPin300(pA2_hcap, pA2_g1Pin);
		pinB = sumPin300(pB2_hcap, pB2_g1Pin);
		setPinValue("Tpins_A2G1", pinA);
		setPinValue("Tpins_B2G1", pinB);
		setPoint("Ppoint_A2G1", pinA, "Ppoint_B2G1", pinB);

		// Game 2
		pinA = sumPin300(pA2_hcap, pA2_g2Pin);
		pinB = sumPin300(pB2_hcap, pB2_g2Pin);
		setPinValue("Tpins_A2G2", pinA);
		setPinValue("Tpins_B2G2", pinB);
		setPoint("Ppoint_A2G2", pinA, "Ppoint_B2G2", pinB);

		// Game 3
		pinA = sumPin300(pA2_hcap, pA2_g3Pin);
		pinB = sumPin300(pB2_hcap, pB2_g3Pin);
		setPinValue("Tpins_A2G3", pinA);
		setPinValue("Tpins_B2G3", pinB);
		setPoint("Ppoint_A2G3", pinA, "Ppoint_B2G3", pinB);

		// Game 4
		pinA = sumPin300(pA2_hcap, pA2_g4Pin);
		pinB = sumPin300(pB2_hcap, pB2_g4Pin);
		setPinValue("Tpins_A2G4", pinA);
		setPinValue("Tpins_B2G4", pinB);
		setPoint("Ppoint_A2G4", pinA, "Ppoint_B2G4", pinB);

		// Team A - Net Total
		setPinValue("Nmark_AG1", sumPin(pA1_g1Pin, pA2_g1Pin));
		setPinValue("Nmark_AG2", sumPin(pA1_g2Pin, pA2_g2Pin));
		setPinValue("Nmark_AG3", sumPin(pA1_g3Pin, pA2_g3Pin));
		setPinValue("Nmark_AG4", sumPin(pA1_g4Pin, pA2_g4Pin));

		// Team B - Net Total
		setPinValue("Nmark_BG1", sumPin(pB1_g1Pin, pB2_g1Pin));
		setPinValue("Nmark_BG2", sumPin(pB1_g2Pin, pB2_g2Pin));
		setPinValue("Nmark_BG3", sumPin(pB1_g3Pin, pB2_g3Pin));
		setPinValue("Nmark_BG4", sumPin(pB1_g4Pin, pB2_g4Pin));

		// Team A - Handicap
		setPinValue("Hcap_AG1", sumHandicap(pA1_hcap, pA2_hcap, pA1_g1Pin, pA2_g1Pin));
		setPinValue("Hcap_AG2", sumHandicap(pA1_hcap, pA2_hcap, pA1_g2Pin, pA2_g2Pin));
		setPinValue("Hcap_AG3", sumHandicap(pA1_hcap, pA2_hcap, pA1_g3Pin, pA2_g3Pin));
		setPinValue("Hcap_AG4", sumHandicap(pA1_hcap, pA2_hcap, pA1_g4Pin, pA2_g4Pin));

		// Team B - Handicap
		setPinValue("Hcap_BG1", sumHandicap(pB1_hcap, pB2_hcap, pB1_g1Pin, pB2_g1Pin));
		setPinValue("Hcap_BG2", sumHandicap(pB1_hcap, pB2_hcap, pB1_g2Pin, pB2_g2Pin));
		setPinValue("Hcap_BG3", sumHandicap(pB1_hcap, pB2_hcap, pB1_g3Pin, pB2_g3Pin));
		setPinValue("Hcap_BG4", sumHandicap(pB1_hcap, pB2_hcap, pB1_g4Pin, pB2_g4Pin));

		// Total - Game 1
		pinA = sumPin300(pA1_hcap, pA1_g1Pin);
		pinB = sumPin300(pA2_hcap, pA2_g1Pin);
		tA_g1 = sumPin(pinA, pinB);
		setPinValue("GTmark_AG1", tA_g1);
		pinA = sumPin300(pB1_hcap, pB1_g1Pin);
		pinB = sumPin300(pB2_hcap, pB2_g1Pin);
		tB_g1 = sumPin(pinA, pinB);
		setPinValue("GTmark_BG1", tB_g1);
		setPoint("Gpoint_AG1", tA_g1, "Gpoint_BG1", tB_g1);

		// Total - Game 2
		pinA = sumPin300(pA1_hcap, pA1_g2Pin);
		pinB = sumPin300(pA2_hcap, pA2_g2Pin);
		tA_g2 = sumPin(pinA, pinB);
		setPinValue("GTmark_AG2", tA_g2);
		pinA = sumPin300(pB1_hcap, pB1_g2Pin);
		pinB = sumPin300(pB2_hcap, pB2_g2Pin);
		tB_g2 = sumPin(pinA, pinB);
		setPinValue("GTmark_BG2", tB_g2);
		setPoint("Gpoint_AG2", tA_g2, "Gpoint_BG2", tB_g2);

		// Total - Game 3
		pinA = sumPin300(pA1_hcap, pA1_g3Pin);
		pinB = sumPin300(pA2_hcap, pA2_g3Pin);
		tA_g3 = sumPin(pinA, pinB);
		setPinValue("GTmark_AG3", tA_g3);
		pinA = sumPin300(pB1_hcap, pB1_g3Pin);
		pinB = sumPin300(pB2_hcap, pB2_g3Pin);
		tB_g3 = sumPin(pinA, pinB);
		setPinValue("GTmark_BG3", tB_g3);
		setPoint("Gpoint_AG3", tA_g3, "Gpoint_BG3", tB_g3);

		// Total - Game 4
		pinA = sumPin300(pA1_hcap, pA1_g4Pin);
		pinB = sumPin300(pA2_hcap, pA2_g4Pin);
		tA_g4 = sumPin(pinA, pinB);
		setPinValue("GTmark_AG4", tA_g4);
		pinA = sumPin300(pB1_hcap, pB1_g4Pin);
		pinB = sumPin300(pB2_hcap, pB2_g4Pin);
		tB_g4 = sumPin(pinA, pinB);
		setPinValue("GTmark_BG4", tB_g4);
		setPoint("Gpoint_AG4", tA_g4, "Gpoint_BG4", tB_g4);

		// Total - Game 1 & 2
		pinA = sumPin(tA_g1, tA_g2);
		pinB = sumPin(tB_g1, tB_g2);
		setPoint("HMpoint_AG12", pinA,"HMpoint_BG12", pinB);

		// Total - Game 3 & 4
		pinA = sumPin(tA_g3, tA_g4);
		pinB = sumPin(tB_g3, tB_g4);
		setPoint("HMpoint_AG34", pinA,"HMpoint_BG34", pinB);

		// Total - All games
		pinA = sumPin(tA_g1, tA_g2);
		pinB = sumPin(tA_g3, tA_g4);
		totalA = sumPin(pinA, pinB);
		pinA = sumPin(tB_g1, tB_g2);
		pinB = sumPin(tB_g3, tB_g4);
		totalB = sumPin(pinA, pinB);
		setTotalPoint("FMpoint_A", totalA, "FMpoint_B", totalB);

		// Result - total points
		setResultPoint("Tpoint_A", "Tpoint_B");
		
		// Total pins for both teams
		pinA = sumPin(sumPin(sumPin(pA1_g1Pin, pA2_g1Pin), sumPin(pA1_g2Pin, pA2_g2Pin)), sumPin(sumPin(pA1_g3Pin, pA2_g3Pin), sumPin(pA1_g4Pin, pA2_g4Pin)));
		pinB = sumPin(sumPin(sumPin(pB1_g1Pin, pB2_g1Pin), sumPin(pB1_g2Pin, pB2_g2Pin)), sumPin(sumPin(pB1_g3Pin, pB2_g3Pin), sumPin(pB1_g4Pin, pB2_g4Pin)));
		totalA = sumPin(sumPin(tA_g1, tA_g2), sumPin(tA_g3, tA_g4));
		totalB = sumPin(sumPin(tB_g1, tB_g2), sumPin(tB_g3, tB_g4));
		setTotalPinValue("FMpins_A", "FMpins_B", pinA, pinB, totalA, totalB);		
	}
