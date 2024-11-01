export function digitizeNumber(input, digits = 2) {
	const length_difference = digits - String(input).length;
  if(length_difference < 0) {
  	throw `digitize(${input}, ${digits}) error\ninput longer than target digits`
  } else if(length_difference === 0) {
    return input;
  } else {
  	let output = String(input);
  	for(let i = 0; i < length_difference; i++) {
    	output = "0" + output;
    }
    return output;
  }
}

export const getHHMM = (input = "now") => {
  const currentTime = input ==="now" ? new Date() : new Date(input);
  return `${digitizeNumber(currentTime.getHours())}:${digitizeNumber(currentTime.getMinutes())}`;
}

export const ordinal = (input) => {
	const inputString = String(input);
	const lastnum = inputString.slice(inputString.length - 1, inputString.length);
  const secondlastnum = inputString.slice(inputString.length - 2, inputString.length - 1);
  return secondlastnum === "1" ? String(input) + "th"
  : lastnum === "1" ? String(input) + "st"
	: lastnum === "2" ? String(input) + "nd"
  : lastnum === "3" ? String(input) + "rd"
  : String(input) + "th"
}

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getDDMMMYYYY = (input) => {
	const inputDate = new Date(input);
  return `${ordinal(inputDate.getDate())}/${month[inputDate.getMonth()]}/${inputDate.getFullYear()}`
}
